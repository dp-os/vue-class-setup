let count = 0;
let isBind = false;

export function addCount() {
    // 如果还是处于绑定状态，说明上一次解绑的过程中程序执行报错了，需要重置
    if (isBind) {
        isBind = false;
        count = 1;
    } else {
        count++;
    }
}

const weakMap = new WeakMap<object, number>();

export function unBindTarget(target: object): boolean {
    let count = weakMap.get(target);
    if (typeof count === 'number') {
        count--;
        if (count) {
            weakMap.set(target, count);
            return false;
        } else {
            weakMap.delete(target);
            isBind = false;
            return true;
        }
    }
    return false;
}

export function bindTarget(target: object) {
    if (count > 0) {
        weakMap.set(target, count);
        count = 0;
        isBind = true;
    } else {
        console.warn(`The instance did not use the '@Setup' decorator`);
    }
}
