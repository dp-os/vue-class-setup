import { assert, test } from 'vitest';
import { mount } from '@vue/test-utils';

import Demo from './demo.vue';

test('Base', async () => {
    const wrapper = mount(Demo);
    assert.equal(wrapper.find('p').text(), '0');
    await wrapper.vm.$nextTick();
    assert.equal(wrapper.find('p').text(), '1');
});
