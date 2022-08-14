import {
    TargetConstructorOptions,
    PassOnToCallback,
    TargetName,
} from './types';
import { SETUP_NAME, SETUP_OPTIONS_NAME } from './config';
let currentOptions: TargetConstructorOptions = new Map();

function getCurrentOptions() {
    return currentOptions;
}

function resetCurrentOptions() {
    currentOptions = new Map();
}

export function getOptions(Target: any): TargetConstructorOptions {
    let options: TargetConstructorOptions = Target[SETUP_OPTIONS_NAME];
    if (!options) {
        options = new Map();
        Target[SETUP_OPTIONS_NAME] = options;
    }
    return options;
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
