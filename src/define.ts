import { type VueInstance, isVue2 } from './vue';
import { Context } from './context';
import { createDefineProperty } from './property-descriptors';

type DeepReadonly<T> = T extends object
    ? T extends Array<any>
        ? T
        : T extends Function
        ? T
        : {
              readonly [P in keyof T]: DeepReadonly<T[P]>;
          }
    : T;

interface DefineInstance<T, E> {
    readonly $props: T;
    readonly $emit: E;
    readonly $vm: VueInstance;
    readonly $defaultProps: DeepReadonly<Partial<T>>;
}

type DefaultEmit = (...args: any[]) => void;

// type RequiredBooleanAttr<T extends {}> = {
//     [K in keyof T]-?: boolean extends T[K] ? T[K] : T[K];
// };

type DefineInstanceType<
    T extends {},
    E extends DefaultEmit = DefaultEmit
> = DeepReadonly<T> & DefineInstance<T, E>;

export interface DefineConstructor {
    inject: typeof Context['inject'];
    setup: typeof Context['setup'];
    setupOptions: typeof Context['setupOptions'];
    setupDefine: boolean;
    setupPropertyDescriptor: Map<string, PropertyDescriptor>;
    new <T extends {} = {}, E extends DefaultEmit = DefaultEmit>(
        ...args: any[]
    ): DefineInstanceType<T, E>;
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
    }
} as any;

export function initDefine(target: InstanceType<DefineConstructor>) {
    const definePropertyTarget = createDefineProperty(target);
    const props = target.$props;

    Object.keys(props).forEach((k) => {
        if (k in target) {
            // @ts-ignore
            target.$defaultProps[k] = target[k];
        }
        definePropertyTarget(k, {
            get() {
                let value = props[k];

                if (typeof value === 'boolean') {
                    if (!hasDefaultValue(target.$vm, k)) {
                        value = target.$defaultProps[k];
                    }
                } else if (isNull(value)) {
                    value = target.$defaultProps[k];
                }
                return value;
            },
        });
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
        return !isNull(props[key] || props[kebabCase(key)]);
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
