import { type VueInstance } from './vue';
import { Context } from './context';

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

type DefaultEmit = (...args: any[]) => void

export interface DefineConstructor {
    inject: typeof Context['inject']
    setup: typeof Context['setup']
    setupOptions: typeof Context['setupOptions']
    setupDefine: boolean;
    new <T extends {} = {}, E extends DefaultEmit = DefaultEmit>(...args: unknown[]): DeepReadonly<T> & DefineInstance<T, E>;
}

export const Define: DefineConstructor =  class Define extends Context {
    public static setupDefine = true;
} as any;

export function initDefine(target: object) {
    const props = target['$props'];
    if (!props) {
        return;
    }
    Object.keys(props).forEach(k => {
        if (typeof props[k] === 'undefined' && k in target) {
            Object.defineProperty(props, k, {
                configurable: true,
                writable: true,
                value: target[k]
            });
        }
        defineProperty(target, k, () => {
            return props[k];
        });
    });
}

function defineProperty<T>(o: T, p: PropertyKey, get: () => any) {
    Object.defineProperty(o, p, {
        get
    });
}
