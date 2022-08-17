import { assert, test } from 'vitest';
import { isVue3, isVue2 } from 'vue-class-setup';

test('vue', () => {
    assert.isFalse(isVue2);
    assert.isTrue(isVue3);
})