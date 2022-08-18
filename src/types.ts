export type TargetConstructor = {
    of(Target: object): void;
    new(...args: any[]): any;
};
export type TargetConstructorOptions = Map<PassOnToCallback, TargetName[]>;
export type Target = object;
export type TargetName = string | symbol;
export type PassOnToCallback<T extends (...args: any[]) => any = () => void> = (
    cb: T
) => void;
