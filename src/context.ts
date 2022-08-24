import { getCurrentInstance, type VueInstance, isVue2 } from './vue';
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

const WHITE_LIST: string[] = [SETUP_SETUP_DEFINE, SETUP_SETUP_DEFINE, '$vm', '$emit', '$props'];

function use(target: VueInstance, _This: any) {
    let use: Map<any, InstanceType<DefineConstructor>>;
    if (target[SETUP_USE]) {
        use = target[SETUP_USE];
    } else {
        use = new Map();
        target[SETUP_USE] = use;
    }
    let app = use.get(_This)!;
    if (app) {
        return app;
    }
    app = new _This() as InstanceType<DefineConstructor>;

    use.set(_This, app);

    const names = Object.getOwnPropertyNames(app);
    const defineProperty = createDefineProperty(target);
    const propertyDescriptor = _This[SETUP_PROPERTY_DESCRIPTOR] as Map<
        string,
        PropertyDescriptor
    >;
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
    return app;
}

export class Context {
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

        return {
            setup() {
                return {} as InstanceType<T>;
            },
            created() {
                const vm = this as any as VueInstance;
                const app = use(vm, _This);
                if (!vm.$options || isVue2) {
                    return;
                }
                const render = vm.$options.render as Function | undefined;
                if (app[SETUP_SETUP_DEFINE] && render) {
                    const proxyRender = (...args: any[]) => {
                        const props = vm.$.props;
                        for (let i = 0; i < args.length; i++) {
                            if (args[i] === props) {
                                args[i] = app;
                                break;
                            }
                        }
                        return render.apply(this, args);
                    };
                    vm.$options.render = proxyRender;

                    if (vm.$) {
                        (vm as any).$.render = proxyRender;
                    }
                }
            },
        };
    }
    public $vm: VueInstance;
    public $emit: VueInstance['$emit'];
    public constructor() {
        const vm = getCurrentInstance();
        this.$vm = vm ?? ({ $props: {}, $emit: emit } as any);
        this.$emit = this.$vm.$emit.bind(this.$vm);
        setupReference.add(this);
    }
    public get $props() {
        return this.$vm.$props ?? {};
    }
}
function emit() {}
