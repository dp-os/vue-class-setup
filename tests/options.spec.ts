import { assert, test } from 'vitest';
import { Setup, Context, PassOnTo } from 'vue-class-setup';

test('options', () => {
    class Test extends Context {
        @PassOnTo()
        public init() {}
    }
    assert.Throw(() => {
        @Setup
        class Test2 extends Context {
            @PassOnTo()
            public init() {}
        }
    }, '@Setup is not set');
});
