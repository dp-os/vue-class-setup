import { watch, WatchOptions } from 'vue';

import { TargetName } from './types';
import { PassOnTo } from './pass-on-to';
import { getCurrentHookContext } from './context';

type OldValue<WatchOptions, V> = WatchOptions extends { immediate: true } ? V | undefined : V;


export function Watch<Key extends string, Opt extends WatchOptions>(watchName: Key, options?: Opt) {
    return function Watch<T extends Record<Key, any>>(
        target: T,
        name: TargetName,
        descriptor: TypedPropertyDescriptor<(value: T[Key], oldValue: OldValue<Opt, T[Key]>) => any>
    ) {
        PassOnTo(() => {
            const { target, name } = getCurrentHookContext();
            watch(() => {
                return (target as any)[watchName];
            }, target[name], options);
        })(target, name, descriptor);
    };
}
