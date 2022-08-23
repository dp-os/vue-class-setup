import { watch } from 'vue';
import { getCurrentInstance, type VueInstance, isVue2, isVue3 } from './vue';
import { setupReference } from './setup-reference';
import { TargetName, Target } from './types';
import {
    SETUP_NAME,
    SETUP_OPTIONS_NAME,
    SETUP_PROPERTY_DESCRIPTOR,
} from './config';
import { createDefineProperty } from './property-descriptors';
import { DefineConstructor } from './define';
import { SETUP_SETUP_DEFINE } from './config';

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

function initProps(target: VueInstance, app: InstanceType<DefineConstructor>) {
    const keys = Object.keys(app.$defaultProps || {});
    if (keys.length) {
        watch(
            () => {
                const props = target['$props'];
                if (!props) return {};
                const data: Record<string, any> = {};
                keys.forEach((key) => {
                    if (props[key] !== app[key]) {
                        data[key] = app[key];
                    }
                });
                return data;
            },
            (defaultProps) => {
                const props = target['$props'];
                if (!props) {
                    return;
                }
                const definePropertyProps = createDefineProperty(props);
                Object.keys(defaultProps).forEach((key) => {
                    const descriptor = Object.getOwnPropertyDescriptor(
                        props,
                        key
                    );
                    definePropertyProps(key, {
                        ...descriptor,
                        value: defaultProps[key],
                    });
                });
            },
            {
                immediate: true,
            }
        );
    }
}

export class Context {
    public static [SETUP_NAME] = false;
    public static [SETUP_OPTIONS_NAME] = new Map();
    public static [SETUP_PROPERTY_DESCRIPTOR] = new Map<
        string,
        PropertyDescriptor
    >();
    public static inject<T extends new (...args: any) => any>(this: T) {
        const _This = this;
        const map = _This[SETUP_PROPERTY_DESCRIPTOR] as Map<
            string,
            PropertyDescriptor
        >;
        function use(target: VueInstance) {
            const app = new _This() as InstanceType<DefineConstructor>;
            const names = Object.getOwnPropertyNames(app);
            const defineProperty = createDefineProperty(target);
            // Watch default props
            if (isVue3) {
                initProps(target, app);
            }

            names.forEach((name) => {
                if (map.has(name)) return;
                defineProperty(name, {
                    get() {
                        return app[name];
                    },
                    set(val) {
                        app[name] = val;
                    },
                });
            });
            map.forEach((value, name) => {
                defineProperty(name, {
                    get() {
                        return app[name];
                    },
                    set(val) {
                        app[name] = val;
                    },
                });
            });
            return app as InstanceType<T>;
        }
        const data: {
            beforeCreate?: () => void;
            created?: () => void;
            setup: () => InstanceType<T>;
        } = {
            setup() {
                return {} as InstanceType<T>;
            },
        };
        if (isVue2) {
            data.beforeCreate = function beforeCreate() {
                const vm = this as any;
                if (!vm.$options) return;
                const setup = vm.$options.setup;
                vm.$options.setup = (props: any, ctx: any) => {
                    const app = use(vm) as any;
                    if (app[SETUP_SETUP_DEFINE]) {
                        return setup(app, ctx);
                    }
                    if (setup) {
                        return setup(props, ctx);
                    }
                    return {};
                };
            };
        } else {
            data.created = function created() {
                use(this as any);
            };
        }
        return data;
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
