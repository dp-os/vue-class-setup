import { getCurrentInstance, type VueInstance } from './vue';
import { setupReference } from './setup-reference';
import { TargetName, Target } from './types';

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
    public static of(Target: object) {
        const p = Object.getPrototypeOf(Target);
        if (p === this) {
            return true;
        } else if (p === null) {
            return false
        }
        return this.of(p);
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
