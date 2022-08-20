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
    const currentOptions = getCurrentOptions();
    const options = getOptions(Target);
    const temp = currentOptions;
    options.forEach((names, hook) => {
        const newNames = [...names];
        const tempName = temp.get(hook);
        if (tempName) {
            tempName.forEach((name) => {
                if (!newNames.includes(name)) {
                    newNames.push(name);
                }
            });
        }
        temp.set(hook, newNames);
    });
    resetCurrentOptions();

    return temp;
}
