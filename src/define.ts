import { type VueInstance, isVue2 } from './vue';
import { Context, DefaultProps, DefaultEmit } from './context';
import { createDefineProperty } from './property-descriptors';
import { SETUP_SETUP_DEFINE } from './config';

interface DefineInstance<T, E> {
    readonly $props: T;
    readonly $emit: E;
    readonly $vm: VueInstance;
    readonly $defaultProps: Readonly<Partial<T>>;
}

type DefineInstanceType<
    T extends DefaultProps,
    E extends DefaultEmit = DefaultEmit
> = Readonly<T> & DefineInstance<T, E>;

export interface DefineConstructor {
    inject: typeof Context['inject'];
    use: typeof Context['use'];
    setup: typeof Context['setup'];
    setupOptions: typeof Context['setupOptions'];
    setupDefine: boolean;
    setupPropertyDescriptor: Map<string, PropertyDescriptor>;
    new <T extends {} = {}, E extends DefaultEmit = DefaultEmit>(
        ...args: any[]
    ): DefineInstanceType<T, E>;
}
function GET_TRUE() {
    return true;
}

export const Define: DefineConstructor = class Define extends Context {
    public static setupDefine = true;
    public $defaultProps: Record<string, any> = {};
    public constructor() {
        super();
        const defineProperty = createDefineProperty(this);
        defineProperty('$defaultProps', {
            enumerable: false,
            writable: false,
        });
        defineProperty(SETUP_SETUP_DEFINE, {
            get: GET_TRUE,
        });
    }
} as any;

export function initDefine(target: InstanceType<DefineConstructor>) {
    const definePropertyTarget = createDefineProperty(target);
    const props = target.$props;

    Object.keys(props).forEach((k) => {
        if (k in target) {
            // @ts-ignore
            target.$defaultProps[k] = target[k];
            const defaultProps = target.$defaultProps;
            definePropertyTarget(k, {
                get() {
                    let value = props[k];
                    if (typeof value === 'boolean') {
                        if (!hasDefaultValue(target.$vm, k)) {
                            value = defaultProps[k];
                        }
                    } else if (isNull(value)) {
                        value = defaultProps[k];
                    }
                    return value;
                },
            });
        } else {
            definePropertyTarget(k, {
                get() {
                    return props[k];
                },
            });
        }
    });
}

function hasDefaultValue(vm: VueInstance, key: string): boolean {
    let props: Record<string, any> | null = null;
    if (isVue2) {
        props = vm.$options && vm.$options['propsData'];
    } else {
        props = vm.$ && vm.$.vnode && vm.$.vnode.props;
    }
    if (props) {
        const value = props[key];
        return !isNull(isNull(value) ? props[kebabCase(key)] : value);
    }
    return false;
}

function isNull(value: unknown) {
    return typeof value === 'undefined' || value === null;
}

const KEBAB_REGEX = /[A-Z]/g;

function kebabCase(str: string) {
    return str
        .replace(KEBAB_REGEX, (match) => {
            return '-' + match.toLowerCase();
        })
        .replace(/^-/, '');
}
