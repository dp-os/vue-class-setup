import { reactive } from 'vue';
import { TargetName, TargetConstructor, HookCallback, TargetConstructorOptions } from './types';
import { setCurrentHookName, setCurrentHookTarget } from './context';
import {
    SETUP_OPTIONS_NAME, SETUP_NAME
} from './config';
import { onComputed } from './on-computed';
import { getCurrentOptions, resetCurrentOptions } from './options';



function initHook<T extends object>(target: T) {

    setCurrentHookTarget(target);
    const set = new Set<TargetName>();
    const options = getOptions(target.constructor);
    options.forEach((names, hook) => {
        names.forEach(name => {
            if (!set.has(name) && typeof target[name] === 'function') {
                target[name] = target[name].bind(target);
                set.add(name);
            }
            setCurrentHookName(name);
            hook(target[name]);
            setCurrentHookName(null);
        });
    });
    setCurrentHookTarget(null);

    return target;
}


function getOptions(Target: any): TargetConstructorOptions {
    let options: TargetConstructorOptions = Target[SETUP_OPTIONS_NAME];
    if (!options) {
        options = new Map();
        Target[SETUP_OPTIONS_NAME] = options;
    }
    return options;
}

function setOptions(hook: HookCallback, name: TargetName) {
    const currentOptions = getCurrentOptions();
    const arr = currentOptions.get(hook);
    if (!arr) {
        currentOptions.set(hook, [name]);
    } else if (!arr.includes(name)) {
        arr.push(name);
    }
}

function getSetupOptions(Target: any) {
    const currentOptions = getCurrentOptions();
    const options = getOptions(Target);
    const temp = currentOptions;
    options.forEach((names, hook) => {
        const newNames = [...names];
        const tempName = temp.get(hook);
        if (tempName) {
            tempName.forEach(name => {
                if (!newNames.includes(name)) {
                    newNames.push(name);
                }
            });
        }
        temp.set(hook, newNames);
    });
    resetCurrentOptions()

    return temp;
}


let count = 0;

function Setup<T extends TargetConstructor>(Target: T) {
    const descriptors = Object.getOwnPropertyDescriptors(Target.prototype);

    Object.keys(descriptors).filter(k => {
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

    return Setup
}

function Hook(hook: HookCallback) {
    return function (target: object, name: TargetName, descriptor: PropertyDescriptor) {
        setOptions(hook, name);
    }
}


export { Setup, Hook }