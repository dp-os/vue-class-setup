import { TargetName, PassOnToCallback } from './types';
import { setOptions } from './options';

function onSetup(cb: () => void) {
    cb();
}

export type TargetConstructor = new (...arg: any[]) => any;

function PassOnTo<T extends (...args: any[]) => any>(
    cb: PassOnToCallback<T> = onSetup
) {
    return function PassOnTo(
        Target: object,
        name: TargetName,
        descriptor: TypedPropertyDescriptor<
            (
                ...args: Parameters<T>
            ) => ReturnType<T> extends void ? any : ReturnType<T>
        >
    ) {
        setOptions(Target as any, cb as any, name);
    };
}

export { PassOnTo };
