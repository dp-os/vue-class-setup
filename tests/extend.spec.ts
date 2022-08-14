import { assert, test } from 'vitest';
import { mount } from '@vue/test-utils'

import Extend from './extend.vue';

test('Extend', async () => {
    const wrapper = mount(Extend);
    // assert.equal(wrapper.find('.left').text(), 'value:2');
    assert.equal(wrapper.find('.right').text(), '2');
});