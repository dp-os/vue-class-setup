import { assert, test } from 'vitest';
import { Setup, PassOnTo, getCurrentHookContext } from 'vue-class-setup';

function myFunc() {
    const { target, name } = getCurrentHookContext();
    target[name]();
}

test('Register hook', () => {
    @Setup
    class Count {
        public value = 100;
        @PassOnTo(myFunc)
        public add() {
            this.value++;
        }
    }

    const count = new Count();
    const { add } = count;
    add();
    assert.equal(count.value, 102);
});
