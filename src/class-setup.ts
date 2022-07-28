import { reactive, computed, onActivated, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onErrorCaptured, onMounted, onRenderTracked, onRenderTriggered, onScopeDispose, onServerPrefetch, onUnmounted, onUpdated } from 'vue-demi';



type HookType = 'onActivated' | 'onBeforeMount' | 'onBeforeUnmount' | 'onBeforeUpdate' | 'onDeactivated' | 'onErrorCaptured' | 'onMounted' | 'onRenderTracked' | 'onRenderTriggered' | 'onScopeDispose' | 'onServerPrefetch' | 'onUnmounted' | 'onUpdated'

type Target = { new(...args: any[]): {} };
type Name = string | symbol;
type HookInit = (target: any, name: Name) => any;
type Callback = (...args: any[]) => any;


const SETUP_OPTIONS_NAME = 'setupOptions';
const HOOK: Record<string, HookInit> = {
    computed(target: any, name: Name) {
        const descriptor = getDescriptor(target, name)!;
        const get = descriptor.get!.bind(target)
        const c = computed(get);
        Object.defineProperty(target, name, {
            ...descriptor,
            get() {
                return c.value;
            }
        })
    }
};

function getDescriptor(target: object, name: Name): PropertyDescriptor | null {
    if (!target) return null;
    const descriptor = Object.getOwnPropertyDescriptor(target, name);
    if (descriptor) {
        return descriptor;
    }
    const t = Object.getPrototypeOf(target);
    return getDescriptor(t, name);
}

function registerHook(name: string, fn: Callback) {
    HOOK[name] = (target: any, name: Name) => {
        fn(target[name]);
    }
}
registerHook('onActivated', onActivated)
registerHook('onBeforeMount', onBeforeMount)
registerHook('onBeforeUnmount', onBeforeUnmount)
registerHook('onBeforeUpdate', onBeforeUpdate)
registerHook('onDeactivated', onDeactivated)
registerHook('onErrorCaptured', onErrorCaptured)
registerHook('onMounted', onMounted)
registerHook('onRenderTracked', onRenderTracked)
registerHook('onRenderTriggered', onRenderTriggered)
registerHook('onScopeDispose', onScopeDispose)
registerHook('onServerPrefetch', onServerPrefetch)
registerHook('onUnmounted', onUnmounted)
registerHook('onUpdated', onUpdated)

const INIT_SETUP = '__initSetup'



function initHook(target: object) {

    const set = new Set<string>();
    const options = getOptions(target.constructor);
    Object.keys(options).forEach((hook: string) => {
        const names = options[hook];
        names.forEach((name: string) => {
            if (!set.has(name) && typeof target[name] === 'function') {
                target[name] = target[name].bind(target);
                set.add(name);
            }
            HOOK[hook](target, name);
        })
    });
    reactive(target);
}






function setOptions(Target: any, hook: string, name: Name) {
    const options = getOptions(Target);
    const arr: Name[] = options[hook] = options[hook] || [];
    if (!arr.includes(name)) {
        arr.push(name);
    }
}

function getOptions(Target: any): Record<HookType, string[]> {
    let options = Target[SETUP_OPTIONS_NAME];
    if (!options) {
        options = {};
        Target[SETUP_OPTIONS_NAME] = options;
    }
    return options;
}

function Setup<T extends Target>(Target: T) {
    const descriptors = Object.getOwnPropertyDescriptors(Target.prototype);

    class Setup extends Target {
        public static [SETUP_OPTIONS_NAME] = getOptions(Target);
        public constructor(...args: any[]) {
            super(...args);
            if (!this[INIT_SETUP]) {
                initHook(this);
                Object.defineProperty(this, INIT_SETUP, {
                    value: true,
                    writable: false,
                    enumerable: false
                })
            }
        }
    }

    Object.keys(descriptors).filter(k => {
        const descriptor = descriptors[k];
        if (descriptor.get) {
            setOptions(Target, 'computed', k);
        }
    });
    return Setup
}

function Hook(hook: HookType) {
    return function (target: object, name: Name, descriptor: PropertyDescriptor) {
        if (typeof descriptor.value === 'function') {
            setOptions(target.constructor, hook, name);
        } else {
            throw new TypeError('Hooks can only be functions')
        }
    }
}

export { Setup, Hook, registerHook }