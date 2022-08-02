import { assert, test } from 'vitest';
import { mount } from '@vue/test-utils'

import Base from './base.vue';

test('Base', async () => {
    const wrapper = mount(Base);
    assert.equal(wrapper.find('.value').text(), '0');
    assert.equal(wrapper.find('.text').text(), 'value:0');
    assert.equal(wrapper.find('.ready').text(), 'false');
    const time = wrapper.find('.time').text();
    const getTime = wrapper.find('.get-time').text();

    await wrapper.find('button').trigger('click');

    assert.equal(wrapper.find('p').text(), '1');
    assert.equal(wrapper.find('.text').text(), 'value:1');
    assert.equal(wrapper.find('.ready').text(), 'true');
    assert.equal(wrapper.find('.time').text(), time);
    assert.equal(wrapper.find('.get-time').text(), getTime);
})