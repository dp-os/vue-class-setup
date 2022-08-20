import { assert, test } from 'vitest';
import { mount } from '@vue/test-utils';

import ExtendOptions from './extend-options.vue';

test('Base', async () => {
    const wrapper = mount(ExtendOptions);
    assert.equal(wrapper.find('p').text(), '0');
    await wrapper.vm.$nextTick();

    assert.equal(wrapper.find('p').text(), '3');
});
