import { watch } from 'vue';
import { getCurrentInstance, type VueInstance } from './vue';
import { setupReference } from './setup-reference';
import { TargetName, Target } from './types';
import {
    SETUP_NAME,
    SETUP_OPTIONS_NAME,
    SETUP_PROPERTY_DESCRIPTOR,
} from './config';
import { createDefineProperty } from './property-descriptors';
import { DefineConstructor } from './define';

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
        function use(target: object) {
            const app = new _This() as InstanceType<DefineConstructor>;
            const names = Object.getOwnPropertyNames(app);
            const defineProperty = createDefineProperty(target);
            // Watch default props
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
            return target as InstanceType<T>;
        }
        return {
            created() {
                use(this);
            },
            setup() {
                return {} as InstanceType<T>;
            },
        };
    }
    public $vm: VueInstance;
    public constructor() {
        const vm = getCurrentInstance();
        this.$vm = vm ?? ({ $props: {}, $emit: emit } as any);
        setupReference.add(this);
    }
    public get $props() {
        return this.$vm.$props ?? {};
    }
    public get $emit() {
        return this.$vm.$emit ?? emit;
    }
}
function emit() {}
