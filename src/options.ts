import {
    TargetConstructorOptions,
    PassOnToCallback,
    TargetName,
} from './types';
import { SETUP_OPTIONS_NAME } from './config';
import { Context } from './context';
let currentOptions: TargetConstructorOptions = new Map();

function getCurrentOptions() {
    return currentOptions;
}

function resetCurrentOptions() {
    currentOptions = new Map();
}

export function getOptions(Target: typeof Context): TargetConstructorOptions {
    return Target[SETUP_OPTIONS_NAME];
}

export function setOptions(hook: PassOnToCallback, name: TargetName) {
    const currentOptions = getCurrentOptions();
    const arr = currentOptions.get(hook);
    if (!arr) {
        currentOptions.set(hook, [name]);
    } else if (!arr.includes(name)) {
        arr.push(name);
    }
}

export function getSetupOptions(Target: any) {
    const child = getCurrentOptions();
    const parent = getOptions(Target);
    parent.forEach((names, hook) => {
        const parentNames = [...names];
        const childNames = child.get(hook);
        if (childNames) {
            childNames.forEach((name) => {
                if (!parentNames.includes(name)) {
                    parentNames.push(name);
                }
            });
        }
        child.set(hook, parentNames);
    });
    resetCurrentOptions();

    return child;
}
