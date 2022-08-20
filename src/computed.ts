import { computed } from 'vue';
import { createDefineProperty } from './property-descriptors';

export function initComputed(
    target: object,
    descriptor: Map<string, PropertyDescriptor>
) {
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
                },
            });
        }
    });
}
