import { assert, test } from 'vitest';
import { Setup, Define, PassOnTo, getCurrentHookContext } from 'vue-class-setup';

function myFunc() {
    const { target, name } = getCurrentHookContext();
    target[name]();
}

test('Register hook', () => {
    @Setup
    class Count extends Define {
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

test('error', () => {
    assert.Throw(() => {
        return getCurrentHookContext();
    }, 'Can only be obtained in hook functions')
})
