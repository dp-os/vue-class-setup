import { getCurrentInstance, type VueInstance, isVue3 } from './vue';
import { setupReference } from './setup-reference';
import { TargetName, Target } from './types';
import {
    SETUP_NAME,
    SETUP_OPTIONS_NAME,
    SETUP_PROPERTY_DESCRIPTOR,
} from './config';
import { createDefineProperty } from './property-descriptors';
import { DefineConstructor } from './define';
import { SETUP_SETUP_DEFINE, SETUP_USE } from './config';

let currentTarget: Target | null = null;
let currentName: TargetName | null = null;

export function getCurrentHookContext(): { target: object; name: TargetName } {
    if (currentTarget === null || currentName === null) {
        throw new Error('Can only be obtained in hook functions');
    }
    return { target: currentTarget, name: currentName };
}

export function setCurrentHookTarget(target: Target | null) {
    currentTarget = target;
}
export function setCurrentHookName(name: TargetName | null) {
    currentName = name;
}

const WHITE_LIST: string[] = [SETUP_SETUP_DEFINE, '$vm', '$emit', '$props'];

function use(vm: VueInstance, _This: any) {
    let use: Map<any, InstanceType<DefineConstructor>>;
    if (vm[SETUP_USE]) {
        use = vm[SETUP_USE];
    } else {
        use = new Map();
        Object.defineProperty(vm, SETUP_USE, {
            get() {
                return use;
            },
        });
    }
    let app = use.get(_This)!;
    if (app) {
        return app;
    }
    app = new _This() as InstanceType<DefineConstructor>;

    use.set(_This, app);
    return app;
}

function proxyVue3Props(app: InstanceType<DefineConstructor>, vm: VueInstance) {
    interface Item {
        ssrRender?: Function;
        render?: Function;
    }
    if (!vm.$) {
        return;
    }
    const item = vm.$ as Item;
    const render = item.ssrRender || item.render;
    if (app[SETUP_SETUP_DEFINE] && render) {
        const keys = Object.keys(app.$defaultProps);
        if (!keys.length) return;
        const proxyRender = (...args: any[]) => {
            const props = vm.$props;
            const arr: { key: string; pd: PropertyDescriptor }[] = [];
            const dpp = createDefineProperty(props);
            // Set default Props
            keys.forEach((key) => {
                const value = app[key];
                if (props[key] !== value) {
                    const pd = Object.getOwnPropertyDescriptor(props, key);
                    if (!pd) return;
                    dpp(key, { ...pd, value });
                    arr.push({
                        key,
                        pd,
                    });
                }
            });
            const res = render.apply(vm, args);
            arr.forEach((item) => {
                dpp(item.key, item.pd);
            });
            // Resume default props
            return res;
        };

        if (item.ssrRender) {
            item.ssrRender = proxyRender;
        } else if (item.render) {
            item.render = proxyRender;
        }
    }
}

function initInject(app: InstanceType<DefineConstructor>, vm: VueInstance) {
    if (isVue3) {
        proxyVue3Props(app, vm);
    }

    const names = Object.getOwnPropertyNames(app);
    const defineProperty = createDefineProperty(vm);
    const propertyDescriptor = app.constructor[
        SETUP_PROPERTY_DESCRIPTOR
    ] as Map<string, PropertyDescriptor>;
    names.forEach((name) => {
        if (propertyDescriptor.has(name) || WHITE_LIST.includes(name)) return;
        defineProperty(name, {
            get() {
                return app[name];
            },
            set(val) {
                app[name] = val;
            },
        });
    });
    propertyDescriptor.forEach((value, name) => {
        if (WHITE_LIST.includes(name)) return;
        defineProperty(name, {
            get() {
                return app[name];
            },
            set(val) {
                app[name] = val;
            },
        });
    });
}

export type DefaultProps = Record<string, any>;
export type DefaultEmit = (...args: any[]) => void;

export class Context<T extends {} = {}, E extends DefaultEmit = DefaultEmit> {
    public static [SETUP_NAME] = false;
    public static [SETUP_OPTIONS_NAME] = new Map();
    public static [SETUP_PROPERTY_DESCRIPTOR] = new Map<
        string,
        PropertyDescriptor
    >();
    public static use<T extends new (...args: any) => any>(this: T) {
        const vm = getCurrentInstance();
        if (!vm) {
            throw Error('Please run in the setup function');
        }
        return use(vm, this) as InstanceType<T>;
    }
    public static inject<T extends new (...args: any) => any>(this: T) {
        const _This = this;

        const options: any = {
            created() {
                const vm = this as any as VueInstance;
                const app = use(vm, _This);
                initInject(app, vm);
            },
        };

        return options as {
            data: () => Omit<InstanceType<T>, `$${string}`>;
            created(): void;
        };
    }
    public $vm: VueInstance;
    public $emit: E;
    public constructor() {
        const vm = getCurrentInstance();
        this.$vm = vm ?? ({ $props: {}, $emit: emit } as any);
        this.$emit = this.$vm.$emit.bind(this.$vm) as E;
        setupReference.add(this);
    }
    public get $props() {
        return (this.$vm.$props ?? {}) as T;
    }
}
function emit() {}
