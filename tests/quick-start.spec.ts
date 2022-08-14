import { assert, test } from 'vitest';
import { mount } from '@vue/test-utils';

import QuickStart from './quick-start.vue';

test('Base', async () => {
    const wrapper = mount(QuickStart);
    assert.equal(wrapper.find('p').text(), '0');
    assert.equal(wrapper.find('input').element.value, '0');
    await wrapper.vm.$nextTick();
    assert.equal(wrapper.find('p').text(), '1');
    assert.equal(wrapper.find('input').element.value, '1');

    await wrapper.find('input').setValue('100');
    assert.equal(wrapper.find('p').text(), '100');
    assert.equal(wrapper.find('input').element.value, '100');

    await wrapper.find('input').setValue('');
    assert.equal(wrapper.find('p').text(), '0');
    assert.equal(wrapper.find('input').element.value, '0');
});
