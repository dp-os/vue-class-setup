

const whitelist: string[] = ['constructor', '$props', '$emit']

export function getPropertyDescriptors(Target: new (...args: any) => any) {
    const list: PropertyDescriptor[] = [];
    const map = new Map<string, PropertyDescriptor>()
    while (Target && Target.prototype) {
        list.unshift(Object.getOwnPropertyDescriptors(Target.prototype));
        Target = Object.getPrototypeOf(Target);
    }

    list.forEach(item => {
        Object.keys(item).forEach(key => {
            if (whitelist.includes(key)) {
                delete item[key];
                return
            }
            map.set(key, item[key]);
        })
    });

    return map;
}

export function createDefineProperty(target: object) {
    return (key: PropertyKey, value: PropertyDescriptor) => {
        Object.defineProperty(target, key, value);
    }
}