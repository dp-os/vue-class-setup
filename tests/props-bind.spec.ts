import { assert, test } from 'vitest';
import { mount } from '@vue/test-utils';

import PropsBindParent from './props-bind-parent.vue';

test('Props-bind', async () => {
    const wrapper = mount(PropsBindParent);
    assert.equal(wrapper.find('.code').text(), '0');
    assert.equal(wrapper.find('.name').text(), 'vue-class-setup');
    assert.equal(wrapper.find('.age').text(), '1');
    assert.equal(wrapper.find('.ok1').text(), 'true');
    assert.equal(wrapper.find('.ok2').text(), 'false');

    // code = 1
    await wrapper.find('button').trigger('click');

    assert.equal(wrapper.find('.code').text(), '1');
    assert.equal(wrapper.find('.name').text(), 'parent');
    assert.equal(wrapper.find('.age').text(), '2');
    assert.equal(wrapper.find('.ok1').text(), 'false');
    assert.equal(wrapper.find('.ok2').text(), 'true');

    // code = 2
    await wrapper.find('button').trigger('click');

    assert.equal(wrapper.find('.code').text(), '2');
    assert.equal(wrapper.find('.name').text(), 'vue-class-setup');
    assert.equal(wrapper.find('.age').text(), '1');
    assert.equal(wrapper.find('.ok1').text(), 'true');
    assert.equal(wrapper.find('.ok2').text(), 'false');
});
