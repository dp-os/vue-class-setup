import { assert, test } from 'vitest';
import { Setup, Hook, getCurrentHookContext } from 'vue-class-setup'

function myHook() {
    const { target, name } = getCurrentHookContext();
    target[name]();
}

test('Register hook', () => {
    @Setup
    class Count {
        public value = 100;
        @Hook(myHook)
        public add() {
            this.value++;
        }
    }

    const count = new Count();
    const { add } = count;
    add();
    assert.equal(count.value, 102);
});
