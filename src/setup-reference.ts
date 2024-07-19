
let count = 0;
let isOpen = false;

export function add () {
    if (isOpen) {
        count = 1;
    } else {
        isOpen = true;
        count++;
    }
}

const weakMap = new WeakMap<object, number>();

export function popTarget(target: object): boolean {
    let count = weakMap.get(target);
    if (typeof count === 'number') {
        count--;
        if (count) {
            weakMap.set(target, count)
            return false;
        } else {
            weakMap.delete(target);
            isOpen = false
            return true;
        }
    }
    return false
}

export function bindTarget(target: object) {
    if (count > 0) {
        weakMap.set(target, count);
        count = 0;
    } else {
        console.warn(`The instance did not use the '@Setup' decorator`)
    }
}
