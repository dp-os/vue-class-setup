import { getCurrentInstance, type VueInstance } from './vue';
import { setupReference } from './setup-reference';
import { TargetName, Target } from './types';
import { SETUP_NAME, SETUP_OPTIONS_NAME } from './config';

let currentTarget: Target | null = null;
let currentName: TargetName | null = null;

export function getCurrentHookContext(): { target: object; name: TargetName } {
    if (currentTarget === null || currentName === null) {
        throw new Error('Can only be obtained in hook functions');
    }
    return { target: currentTarget, name: currentName };
}

export function setCurrentHookTarget(target: Target | null) {
    currentTarget = target;
}
export function setCurrentHookName(name: TargetName | null) {
    currentName = name;
}




export class Context {
    public static [SETUP_NAME] = false;
    public static [SETUP_OPTIONS_NAME] = new Map();
    public static inject<T extends new (...args: any) => any>(this: T) {
        const _This = this;
        const set = getPropertyDescriptors(_This);
        const list = Array.from(set);
        return {
            created() {
                const app = new _This();
                const names = Object.getOwnPropertyNames(app);
                names.forEach(name => {
                    if (set.has(name)) return;
                    Object.defineProperty(this, name, {
                        get() {
                            return app[name];
                        },
                        set(val) {
                            app[name] = val;
                        }
                    })
                });
                list.forEach(name => {
                    Object.defineProperty(this, name, {
                        get() {
                            return app[name];
                        },
                        set(val) {
                            app[name] = val;
                        }
                    })
                })

                return app;
            },
            get setup() {
                return this.created;
            }
        }
    }
    public $vm: VueInstance;
    public constructor() {
        const vm = getCurrentInstance();
        this.$vm = vm || { $props: {}, $emit: emit } as any;
        setupReference.add(this)
    }
    public get $props() {
        return this.$vm.$props;
    }
    public get $emit() {
        return this.$vm.$emit;
    }
}
function emit() { }

type Descriptor = {
    [x: string]: TypedPropertyDescriptor<any>;
} & {
    [x: string]: PropertyDescriptor;
};

function getPropertyDescriptors(Target: new (...args: any) => any) {
    const list: Descriptor[] = [];
    const set = new Set<string>();
    while (!Target || Target !== Context) {
        list.unshift(Object.getOwnPropertyDescriptors(Target.prototype));
        Target = Object.getPrototypeOf(Target);
    }
    list.forEach(item => {
        Object.keys(item).forEach(key => {
            if (key[0] === '_' || key === 'constructor') return;
            set.add(key);
        })
    })

    return set;
}
