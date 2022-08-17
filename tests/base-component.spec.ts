import { assert, test } from 'vitest';
import { mount } from '@vue/test-utils';

import BaseComponent from './base-component.vue';

test('Base', async () => {
    const wrapper = mount(BaseComponent);

    assert.equal(wrapper.find('.text').text(), '0');
    assert.equal(wrapper.find('.props-value').text(), '0');
    assert.equal(wrapper.find('.props-dest').text(), '--');

    await wrapper.find('.btn').trigger('click');

    assert.equal(wrapper.find('.text').text(), '1');
    assert.equal(wrapper.find('.props-value').text(), '1');
    assert.equal(wrapper.find('.props-dest').text(), 'clicked');
});
