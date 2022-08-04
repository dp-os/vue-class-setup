import { assert, test } from 'vitest';
import { registerHook, Setup, Hook, HookCallback } from 'vue-class-setup'

registerHook('my', (target: object, name: string | symbol) => {})

test('Register hook', () => {
    @Setup
    class Count {
        public value = 100;
        @Hook('my')
        public add() {
            this.value++;
        }
    }

    const count = new Count();
    const { add } =count;
    add();
    assert.equal(count.value, 101);
});

declare module 'vue-class-setup' {
    interface Hooks {
        my: HookCallback;
    }
}
