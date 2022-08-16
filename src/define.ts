type DeepReadonly<T> = T extends object
    ? T extends Array<any>
        ? T
        : T extends Function
        ? T
        : {
              readonly [P in keyof T]: DeepReadonly<T[P]>;
          }
    : T;

export class Define<T extends {}, E extends Function> {
    public readonly props!: DeepReadonly<T>;
    public readonly emit!: E;
    public constructor(props: DeepReadonly<T>, emit: E) {
        Object.defineProperty(this, 'props', {
            get() {
                return props;
            }
        });
        Object.defineProperty(this, 'emit', {
            get() {
                return emit;
            }
        });
    }
}