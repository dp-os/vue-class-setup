import { assert, test } from 'vitest';
import { mount } from '@vue/test-utils';

import Demo from './multiple-pass-on-to.vue';

test('Multiple PassOnTo', async () => {
    const wrapper = mount(Demo);
    assert.equal(wrapper.find('.text').text(), '1');
    assert.equal(wrapper.find('.btn').text(), 'false');
    await wrapper.vm.$nextTick();
    assert.equal(wrapper.find('.btn').text(), 'true');
});
