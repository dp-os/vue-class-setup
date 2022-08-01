import { assert, test } from 'vitest';
import { Setup, Hook } from 'vue-class-setup';

test('Base', () => {
    @Setup
    class Count {
        public value = 100;
        public get text () {
            return String(this.value);
        }
        @Hook('onMounted')
        public init() {}
    }

    assert.deepEqual(Count['setupOptions'], {
        onMounted: ['init'],
        computed: ['text']
    })
});
