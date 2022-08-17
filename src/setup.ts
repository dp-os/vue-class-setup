import { reactive } from 'vue';
import { TargetName, TargetConstructor, PassOnToCallback } from './types';
import { setCurrentHookName, setCurrentHookTarget } from './context';
import { SETUP_OPTIONS_NAME, SETUP_NAME } from './config';
import { onComputed } from './on-computed';
import { getOptions, getSetupOptions, setOptions } from './options';
import { initProps } from './define';

interface Item {
    name: TargetName;
    hook: PassOnToCallback;
}

function initHook<T extends object>(target: T) {
    setCurrentHookTarget(target);
    const set = new Set<TargetName>();
    const options = getOptions(target.constructor);
    const special: Item[] = [];
    const plainArr: Item[] = [];
    options.forEach((names, hook) => {
        if (hook !== onComputed) {
            return names.forEach((name) => {
                plainArr.push({
                    hook,
                    name,
                });
            });
        }
        names.forEach((name) => {
            special.push({
                hook,
                name,
            });
        });
    });

    // init props
    initProps(target);

    // init computed
    special.forEach((item) => {
        initName(item);
    });

    // init plain hooks
    plainArr.forEach((item) => {
        initName(item);
    });
    setCurrentHookTarget(null);

    function initName({ name, hook }: Item) {
        if (!set.has(name) && typeof target[name] === 'function') {
            target[name] = target[name].bind(target);
            set.add(name);
        }
        setCurrentHookName(name);
        hook(target[name]);
        setCurrentHookName(null);
    }
    return target;
}

let count = 0;

function Setup<T extends TargetConstructor>(Target: T) {
    const descriptors = Object.getOwnPropertyDescriptors(Target.prototype);

    Object.keys(descriptors).filter((k) => {
        const descriptor = descriptors[k];
        if (descriptor.get) {
            setOptions(onComputed, k);
        }
    });
    class Setup extends Target {
        public static [SETUP_OPTIONS_NAME] = getSetupOptions(Target);
        public static [SETUP_NAME] = true;
        public constructor(...args: any[]) {
            count++;
            super(...args);
            count--;
            if (count === 0) {
                // Vue3 needs to return, vue2 does not need to return
                return initHook(reactive(this));
            }
        }
    }

    return Setup;
}

export { Setup };
