import { getCurrentHookContext } from './context';

export function onSetup(cb: () => void) {
    const { target, name } = getCurrentHookContext();
    target[name]();
}