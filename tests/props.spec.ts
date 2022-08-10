import { assert, test } from 'vitest';
import { mount } from '@vue/test-utils'

import PropsParent from './props-parent.vue';

test('Props parent', async () => {
    const wrapper = mount(PropsParent);
    assert.equal(wrapper.find('.parent-text').text(), '0');
    assert.equal(wrapper.find('.child-text').text(), '0');
    assert.equal(wrapper.find('.name').text(), 'vue-class-setup');

    await wrapper.find('.child-btn').trigger('click');
    assert.equal(wrapper.find('.parent-text').text(), '1');
    assert.equal(wrapper.find('.child-text').text(), '1');

});