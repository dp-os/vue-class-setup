import { assert, test } from 'vitest';
import { mount } from '@vue/test-utils';

import Use from './use.vue';

test('Use', async () => {
    const wrapper = mount(Use);
    console.log('>>>>>.', wrapper.html());
    assert.equal(wrapper.find('.text').text(), '0');
    assert.equal(wrapper.find('.text-eq').text(), 'true');

    await wrapper.find('button').trigger('click');

    assert.equal(wrapper.find('.text').text(), '1');
    assert.equal(wrapper.find('.text-eq').text(), 'true');
});
