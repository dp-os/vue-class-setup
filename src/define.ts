type DeepReadonly<T> = T extends object
    ? T extends Array<any>
    ? T
    : T extends Function
    ? T
    : {
        readonly [P in keyof T]: DeepReadonly<T[P]>;
    }
    : T;

class InnerDefine<T extends {}, E extends Function> {
    public readonly $emit!: E;
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
}

type Define<T extends {}, E extends Function> = new (props: T, emit: E) => (DeepReadonly<T> & { readonly $emit: E });


export function Define<T extends {}, E extends Function>(): Define<T, E> {
    return InnerDefine as any;
}