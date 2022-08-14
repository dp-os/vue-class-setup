export type TargetConstructor = { new(...args: any[]): {} };
export type TargetConstructorOptions = Map<HookCallback, TargetName[]>;
export type Target = object;
export type TargetName = string | symbol;
export type HookCallback = (cb: () => void) => void;