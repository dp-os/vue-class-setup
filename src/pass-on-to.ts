import { TargetName, PassOnToCallback } from './types';
import { setOptions } from './options';

function onSetup(cb: () => void) {
    cb();
}

function PassOnTo<T extends (...args: any[]) => any>(
    cb: PassOnToCallback<T> = onSetup
) {
    return function name(
        target: object,
        name: TargetName,
        descriptor: TypedPropertyDescriptor<T>
    ) {
        setOptions(cb as any, name);
    };
}

export { PassOnTo };
