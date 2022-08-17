import { getCurrentInstance, type VueInstance } from './vue';
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
    readonly $props: T,
    readonly $emit: E;
    readonly $vm: VueInstance;
}

type DefaultEmit = (...args: any[]) => void;

type DefineConstructor = new <T extends {} = {}, E extends DefaultEmit = DefaultEmit>() => DeepReadonly<T> & DefineInstance<T, E>;


export const Define: DefineConstructor = class Define<T extends {} = {}, E extends DefaultEmit = DefaultEmit> {
    public constructor() {
        const vm = getCurrentInstance();
        if (vm) {
            const { $props, $emit } = vm;
            
            Object.keys($props).forEach(k => {
                defineProperty(this, k, () => $props[k]);
            });
            defineProperty(this, '$props', () => $props);
            defineProperty(this, '$emit', () => $emit);
            defineProperty(this, '$vm', () => vm);
        }
    }
} as any


function defineProperty<T>(o: T, p: PropertyKey, get: () => any) {
    Object.defineProperty(o, p, {
        get
    });
}