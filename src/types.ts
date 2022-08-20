export type TargetConstructorOptions = Map<PassOnToCallback, TargetName[]>;
export type Target = object;
export type TargetName = string | symbol;
export type PassOnToCallback<T extends (...args: any[]) => any = () => void> = (
    cb: T
) => void;
