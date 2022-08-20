import { assert, test } from 'vitest';
import { mount } from '@vue/test-utils';

import SetValue from './set-value.vue';

test('Base', async () => {
    const wrapper = mount(SetValue);
    assert.equal(wrapper.find('p').text(), '0');
    await wrapper.find('button').trigger('click');
    assert.equal(wrapper.find('p').text(), '1');
});
