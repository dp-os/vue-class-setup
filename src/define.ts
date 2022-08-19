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

type DefaultEmit = (...args: any[]) => void;

export interface DefineConstructor {
    of(Target: object): void;
    new <T extends {} = {}, E extends DefaultEmit = DefaultEmit>(...args: unknown[]): DeepReadonly<T> & DefineInstance<T, E>;
}

export const Define: DefineConstructor = class Define<T extends {} = {}, E extends DefaultEmit = DefaultEmit> extends Context {
    public static of(Target: object) {
        const p = Object.getPrototypeOf(Target);
        if (p === Define) {
            return true;
        } else if (p === null) {
            return false
        }
        return Define.of(p);
    }
} as any;



export function initProps(target: object) {
    const props = target['$props'];
    if (!props) {
        return;
    }
    Object.keys(props).forEach(k => {
        let defaultValue = target[k];
        defineProperty(target, k, () => {
            return props[k] ?? defaultValue;
        });
    });
}

function defineProperty<T>(o: T, p: PropertyKey, get: () => any) {
    Object.defineProperty(o, p, {
        get
    });
}
