import { assert, test } from 'vitest';
import { mount } from '@vue/test-utils';

import SetValue from './set-value.vue';

test('Base', async () => {
    const wrapper = mount(SetValue);
    assert.equal(wrapper.find('.value').text(), '0');
    assert.equal(wrapper.find('.count').text(), '0');

    await wrapper.find('.value-btn').trigger('click');
    
    assert.equal(wrapper.find('.value').text(), '1');
    assert.equal(wrapper.find('.count').text(), '0');

    await wrapper.find('.count-btn').trigger('click');
    assert.equal(wrapper.find('.value').text(), '1');
    assert.equal(wrapper.find('.count').text(), '100');

    await wrapper.find('.count-btn2').trigger('click');
    assert.equal(wrapper.find('.value').text(), '1');
    assert.equal(wrapper.find('.count').text(), '49');


});
