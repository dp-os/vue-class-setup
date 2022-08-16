import { assert, test } from 'vitest';
import { mount } from '@vue/test-utils';

import BaseComponent from './base-component.vue';

test('Base', async () => {
    const wrapper = mount(BaseComponent);

    assert.equal(wrapper.find('.text').text(), '0');

    await wrapper.find('.btn').trigger('click');

    assert.equal(wrapper.find('.text').text(), '1');
});
