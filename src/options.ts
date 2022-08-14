import { TargetConstructorOptions } from './types';
let currentOptions: TargetConstructorOptions = new Map();

export function getCurrentOptions() {
    return currentOptions
}

export function resetCurrentOptions() {
    currentOptions = new Map()
}