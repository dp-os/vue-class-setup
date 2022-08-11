import { assert, test } from 'vitest';
import { mount } from '@vue/test-utils'

import MakeUp from './make-up.vue';

test('Make up', async () => {
    const wrapper = mount(MakeUp);
    assert.equal(wrapper.find('.user-count').text(), '0');
    assert.equal(wrapper.find('.blog-count').text(), '0');
    assert.equal(wrapper.find('.total').text(), '0');
    assert.equal(wrapper.find('.user-text').text(), '0');
    assert.equal(wrapper.find('.blog-text').text(), '0');
    assert.equal(wrapper.find('.user-text2').text(), '0user');
    assert.equal(wrapper.find('.blog-text2').text(), '0blog');

    await wrapper.find('.blog-add').trigger('click');

    assert.equal(wrapper.find('.user-count').text(), '0');
    assert.equal(wrapper.find('.blog-count').text(), '1');
    assert.equal(wrapper.find('.total').text(), '1');
    assert.equal(wrapper.find('.user-text').text(), '0');
    assert.equal(wrapper.find('.blog-text').text(), '1');
    assert.equal(wrapper.find('.user-text2').text(), '0user');
    assert.equal(wrapper.find('.blog-text2').text(), '1blog');
    
    await wrapper.find('.user-add').trigger('click');

    assert.equal(wrapper.find('.user-count').text(), '1');
    assert.equal(wrapper.find('.blog-count').text(), '1');
    assert.equal(wrapper.find('.total').text(), '2');
    assert.equal(wrapper.find('.user-text').text(), '1');
    assert.equal(wrapper.find('.blog-text').text(), '1');
    assert.equal(wrapper.find('.user-text2').text(), '1user');
    assert.equal(wrapper.find('.blog-text2').text(), '1blog');

});