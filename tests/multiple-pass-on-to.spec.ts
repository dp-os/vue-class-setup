import { assert, test } from 'vitest';
import { mount } from '@vue/test-utils';

import Demo from './multiple-pass-on-to.vue';

test('Multiple PassOnTo', async () => {
    const wrapper = mount(Demo);
    assert.equal(wrapper.find('p').text(), '1');
    await wrapper.vm.$nextTick();
    assert.equal(wrapper.find('p').text(), '2');
});
