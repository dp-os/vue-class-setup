export type TargetConstructor = { new(...args: any[]): {} };
export type TargetConstructorOptions = Map<PassOnToCallback, TargetName[]>;
export type Target = object;
export type TargetName = string | symbol;
export type PassOnToCallback = (cb: () => void) => void;