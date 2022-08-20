import { test, assert } from 'vitest';
import { Setup, Context } from 'vue-class-setup';

test('Context', () => {
    @Setup
    class Base extends Context {
        public age = 100;
        public get ageText() {
            return String(this.age);
        }
        public addAge() {
            this.age++;
        }
    }

    @Setup
    class Base2 extends Base {
        public ok = true;
        public num = 100;
        public setNum(num: number) {
            this.num = num;
        }
    }
    const base2 = {} as Base2;
    Base2.inject().created.call(base2);
    assert.equal(base2.age, 100);
    assert.equal(base2.ageText, '100');
    assert.isTrue(base2.ok);
    assert.equal(base2.num, 100);

    assert.isFunction(base2.addAge);
    assert.isFunction(base2.setNum);

    base2.addAge();
    assert.equal(base2.age, 101);

    base2.setNum(200);
    assert.equal(base2.num, 200);
});
