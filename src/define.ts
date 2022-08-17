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
interface App<T, E> { readonly $emit: E, readonly $props: T }

type DefaultEmit = (...args: any[]) => void;

type DefineConstructor = new <T extends {} = {}, E extends DefaultEmit = DefaultEmit>() => DeepReadonly<T> & App<T, E>;


export const Define: DefineConstructor = class Define<T extends {} = {}, E extends DefaultEmit = DefaultEmit> {
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
