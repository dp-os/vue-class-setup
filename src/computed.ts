import { computed } from 'vue';
import { Target, TargetName } from './types';
import { getCurrentHookContext } from './context';
import { createDefineProperty } from './property-descriptors';


function compute(
    target: Target,
    name: TargetName,
    descriptor: PropertyDescriptor,
    type: 'get' | 'value'
) {
    const value = descriptor[type].bind(target);
    const compute = computed(value);
    Object.defineProperty(target, name, {
        ...descriptor,
        [type]() {
            return compute.value;
        },
    });
}

function getDescriptor(
    target: object,
    name: TargetName
): PropertyDescriptor | null {
    const descriptor = Object.getOwnPropertyDescriptor(target, name);
    if (descriptor) {
        return descriptor;
    }
    const next = Object.getPrototypeOf(target);
    return getDescriptor(next, name);
}

export function onComputed() {
    const { target, name } = getCurrentHookContext();
    const descriptor = getDescriptor(target, name)!;
    compute(target, name, descriptor, 'get');
}

export function initComputed(target: object, descriptor: Map<string, PropertyDescriptor>) {
    const defineProperty = createDefineProperty(target);
    descriptor.forEach((value, key) => {
        let get = value.get;
        if (get) {
            get = get.bind(target);
            const compute = computed(get);
            defineProperty(key, {
                ...value,
                get() {
                    return compute.value;
                }
            });
        }
    });
}