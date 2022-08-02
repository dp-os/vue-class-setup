import {
    reactive,
    computed,
    onActivated,
    onBeforeMount,
    onBeforeUnmount,
    onBeforeUpdate,
    onDeactivated,
    onErrorCaptured,
    onMounted,
    onRenderTracked,
    onRenderTriggered,
    onScopeDispose,
    onServerPrefetch,
    onUnmounted,
    onUpdated
} from 'vue';



type HookType = 'activated'
    | 'beforeMount'
    | 'beforeUnmount'
    | 'beforeUpdate'
    | 'deactivated'
    | 'errorCaptured'
    | 'mounted'
    | 'renderTracked'
    | 'renderTriggered'
    | 'scopeDispose'
    | 'serverPrefetch'
    | 'unmounted'
    | 'updated'

type Target = { new(...args: any[]): {} };
type Name = string | symbol;
type HookInit = (target: any, name: Name) => any;
type Callback = (...args: any[]) => any;


const SETUP_OPTIONS_NAME = 'setupOptions';
const SETUP_NAME = 'setup';
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
    const next = Object.getPrototypeOf(target);
    return getDescriptor(next, name);
}

function registerHook(name: string, fn: Callback) {
    HOOK[name] = (target: any, name: Name) => {
        fn(target[name]);
    }
}
registerHook('activated', onActivated)
registerHook('beforeMount', onBeforeMount)
registerHook('beforeUnmount', onBeforeUnmount)
registerHook('beforeUpdate', onBeforeUpdate)
registerHook('deactivated', onDeactivated)
registerHook('errorCaptured', onErrorCaptured)
registerHook('mounted', onMounted)
registerHook('renderTracked', onRenderTracked)
registerHook('renderTriggered', onRenderTriggered)
registerHook('scopeDispose', onScopeDispose)
registerHook('serverPrefetch', onServerPrefetch)
registerHook('unmounted', onUnmounted)
registerHook('updated', onUpdated)

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
}

let currentOptions: Partial<Record<HookType, string[]>> = {};

function getOptions(Target: any): Record<HookType, string[]> {
    let options = Target[SETUP_OPTIONS_NAME];
    if (!options) {
        options = {};
        Target[SETUP_OPTIONS_NAME] = options;
    }
    return options;
}

function setOptions(hook: string, name: Name) {
    const arr: Name[] = currentOptions[hook] = currentOptions[hook] || [];
    if (!arr.includes(name)) {
        arr.push(name);
    }
}

function getSetupOptions(Target: any) {
    const options = getOptions(Target);
    const temp = currentOptions;
    Object.keys(options).forEach(k => {
        if (Array.isArray(temp[k])) {
            temp[k] = [...options[k], ...temp[k]];
        } else {
            temp[k] = [...options[k]];
        }
    })
    currentOptions = {}

    return temp;
}



function Setup<T extends Target>(Target: T) {
    const descriptors = Object.getOwnPropertyDescriptors(Target.prototype);

    Object.keys(descriptors).filter(k => {
        const descriptor = descriptors[k];
        if (descriptor.get) {
            setOptions('computed', k);
        }
    });
    class Setup extends Target {
        public static [SETUP_OPTIONS_NAME] = getSetupOptions(Target);
        public static [SETUP_NAME] = true;
        public constructor(...args: any[]) {
            super(...args);
            if (!this[INIT_SETUP]) {
                const target = reactive(this);
                initHook(target);
                Object.defineProperty(this, INIT_SETUP, {
                    value: true,
                    writable: false,
                    enumerable: false
                })
                // Vue3 needs to return, vue2 does not need to return
                return target;
            }
        }
    }



    return Setup
}

function Hook(hook: HookType) {
    return function (target: object, name: Name, descriptor: PropertyDescriptor) {
        if (typeof descriptor.value === 'function') {
            setOptions(hook, name);
        } else {
            throw new TypeError('Hooks can only be functions')
        }
    }
}


export { Setup, Hook, registerHook }