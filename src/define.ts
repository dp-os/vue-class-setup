import { type VueInstance } from './vue';
import { Context } from './context';
import { createDefineProperty } from './property-descriptors';
import { type TargetConstructor } from './setup';

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
}

type DefaultEmit = (...args: any[]) => void;

export interface DefineConstructor {
    inject: typeof Context['inject'];
    setup: typeof Context['setup'];
    setupOptions: typeof Context['setupOptions'];
    setupDefine: boolean;
    setupPropertyDescriptor: Map<string, PropertyDescriptor>;
    new <T extends {} = {}, E extends DefaultEmit = DefaultEmit>(
        ...args: unknown[]
    ): DeepReadonly<T> & DefineInstance<T, E>;
}

export const Define: DefineConstructor = class Define extends Context {
    public static setupDefine = true;
} as any;

export function initDefine(target: InstanceType<TargetConstructor>) {
    const props = target['$props'];
    const definePropertyProps = createDefineProperty(props);
    const definePropertyTarget = createDefineProperty(target);

    Object.keys(props).forEach((k) => {
        if (typeof props[k] === 'undefined' && k in target) {
            definePropertyProps(k, {
                configurable: true,
                writable: true,
                value: target[k],
            });
        }
        definePropertyTarget(k, {
            get() {
                return props[k];
            },
        });
    });
}
