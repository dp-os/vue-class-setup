import { reactive } from 'vue';
import { TargetName, PassOnToCallback } from './types';
import { setCurrentHookName, setCurrentHookTarget, Context } from './context';
import {
    SETUP_OPTIONS_NAME,
    SETUP_NAME,
    SETUP_PROPERTY_DESCRIPTOR,
    SETUP_SETUP_DEFINE,
} from './config';
import { initComputed } from './computed';
import { getOptions, getSetupOptions } from './options';
import { initDefine } from './define';
import { setupReference } from './setup-reference';
import { getPropertyDescriptors } from './property-descriptors';

export type TargetConstructor = {
    use: typeof Context['use'];
    inject: typeof Context['inject'];
    setup: typeof Context['setup'];
    setupOptions: typeof Context['setupOptions'];
    setupPropertyDescriptor: Map<string, PropertyDescriptor>;
    new (...args: any[]): any;
};

function initHook<T extends object>(target: T) {
    setCurrentHookTarget(target);
    const Target: TargetConstructor = target.constructor as any;
    const options = getOptions(Target);
    const propertyDescriptor = Target.setupPropertyDescriptor;

    // bind this
    propertyDescriptor.forEach(({ value, writable }, key) => {
        if (typeof value === 'function' && writable) {
            target[key] = value.bind(target);
        }
    });

    // init props
    if (target[SETUP_SETUP_DEFINE]) {
        initDefine(target as any);
    }

    // init computed
    initComputed(target, propertyDescriptor);

    // init PassOnTo
    options.forEach((names, hook) => {
        return names.forEach((name) => {
            if (name[0] !== '_') {
                initName(name, hook);
            }
        });
    });
    setCurrentHookTarget(null);

    function initName(name: TargetName, hook: PassOnToCallback) {
        setCurrentHookName(name);
        hook(target[name]);
        setCurrentHookName(null);
    }
    return target;
}

function Setup<T extends TargetConstructor>(Target: T) {
    class Setup extends Target {
        public static [SETUP_OPTIONS_NAME] = getSetupOptions(Target);
        public static [SETUP_NAME] = true;
        public static [SETUP_PROPERTY_DESCRIPTOR] =
            getPropertyDescriptors(Target);
        public constructor(...args: any[]) {
            setupReference.count();
            super(...args);
            if (setupReference.reduce(this)) {
                // Vue3 needs to return, vue2 does not need to return
                return initHook(reactive(this));
            }
        }
    }
    return Setup;
}

export { Setup };
