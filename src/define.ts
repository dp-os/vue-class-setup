import { getCurrentInstance } from 'vue';
type DeepReadonly<T> = T extends object
    ? T extends Array<any>
    ? T
    : T extends Function
    ? T
    : {
        readonly [P in keyof T]: DeepReadonly<T[P]>;
    }
    : T;

type DefineConstructor = new <T extends {}, E extends Function>() => DeepReadonly<T> & { readonly $emit: E, readonly $props: T };


export const Define: DefineConstructor = class Define<T extends {}, E extends Function> {
    public constructor() {
        const vm = getCurrentInstance();
        if (vm) {
            const { props, emit } = vm;
            Object.keys(props).forEach(k => {
                Object.defineProperty(this, k, {
                    get() {
                        return props[k]
                    }
                })
            })
            Object.defineProperty(this, '$props', {
                get() {
                    return props;
                }
            });
            Object.defineProperty(this, '$emit', {
                get() {
                    return emit;
                }
            });
        }
    }
} as any
