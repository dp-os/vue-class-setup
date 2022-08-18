
class SetupReference {
    private _count = 0;
    public map = new Map<object, number>();
    public count() {
        this._count++;
    }
    public add(target: object) {
        this.map.set(target, this._count)
        this._count = 0;
    }
    public reduce(target: object) {
        const { map }  = this;
        let count = map.get(target)!;

        count--;
        if (count) {
            map.set(target, count);
            return false;
        }
        map.delete(target);
        return true;
    }
}

export const setupReference = new SetupReference();