import { assert, test } from 'vitest';
import { mount } from '@vue/test-utils';

import Watch from './watch.vue';

test('Watch', async () => {
    const wrapper = mount(Watch);
    assert.equal(wrapper.find('.value').text(), '0');
    assert.equal(wrapper.find('.immediate-value').text(), '10');

    await wrapper.find('button').trigger('click');

    assert.equal(wrapper.find('.value').text(), '1');
    assert.equal(wrapper.find('.immediate-value').text(), '11');

    wrapper.vm.count.setValue(99);
    await wrapper.vm.$nextTick();
    assert.equal(wrapper.find('.value').text(), '99');
    assert.equal(wrapper.find('.immediate-value').text(), '12');

    wrapper.vm.count.setValue(110);
    await wrapper.vm.$nextTick();
    assert.equal(wrapper.find('.value').text(), '100');
    assert.equal(wrapper.find('.immediate-value').text(), '13');
});
