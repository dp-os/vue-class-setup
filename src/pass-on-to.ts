import { PassOnToCallback, TargetName } from './types';
import { setOptions } from './options';

export function PassOnTo(cb: PassOnToCallback) {
    return function (target: object, name: TargetName, descriptor: PropertyDescriptor) {
        setOptions(cb, name);
    }
}
