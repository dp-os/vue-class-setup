type DeepReadonly<T> = T extends object
    ? T extends Array<any>
    ? T
    : T extends Function
    ? T
    : {
        readonly [P in keyof T]: DeepReadonly<T[P]>;
    }
    : T;

type DefineConstructor = new <T extends {}, E extends Function>(props: DeepReadonly<T>, emit: E) => DeepReadonly<T> & { $emit: E };


export const Define: DefineConstructor = class Define<T extends {}, E extends Function> {
    public constructor(props: T, emit: E) {
        Object.keys(props).forEach(k => {
            Object.defineProperty(this, k, {
                get() {
                    return props[k]
                }
            })
        })
        Object.defineProperty(this, '$emit', {
            get() {
                return emit;
            }
        });
    }
} as any
