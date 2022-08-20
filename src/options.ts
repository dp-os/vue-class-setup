import {
    TargetConstructorOptions,
    PassOnToCallback,
    TargetName,
} from './types';
import { SETUP_OPTIONS_NAME } from './config';
import { Context } from './context';

let currentOptions: TargetConstructorOptions = new Map();
let currentTarget: typeof Context | null = null;

function getCurrentOptions() {
    return currentOptions;
}

function resetCurrentOptions() {
    currentOptions = new Map();
}

export function getOptions(Target: typeof Context): TargetConstructorOptions {
    return Target[SETUP_OPTIONS_NAME];
}

export function setOptions(
    Target: typeof Context,
    hook: PassOnToCallback,
    name: TargetName
) {
    if (!currentTarget) {
        currentTarget = Target;
    } else if (Target !== currentTarget) {
        console.error('@Setup is not set', currentTarget);
        throw new TypeError(`@Setup is not set `);
    }
    const currentOptions = getCurrentOptions();
    const arr = currentOptions.get(hook);
    if (!arr) {
        currentOptions.set(hook, [name]);
    } else if (!arr.includes(name)) {
        arr.push(name);
    }
}

export function getSetupOptions(Target: typeof Context) {
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
    currentTarget = null;

    return child;
}
