import { assert, test } from 'vitest';
import { mount } from '@vue/test-utils'

import WatchEffect from './watch-effect.vue';

test('Watch effect', async () => {
    const wrapper = mount(WatchEffect);

    assert.equal(wrapper.find('.value').text(), '0');
    assert.deepEqual(wrapper.vm.count.hooks, ['watchPreEffect', 'watchSyncEffect', 'beforeMount', 'watchPostEffect'])

    await wrapper.find('button.add').trigger('click');

    assert.equal(wrapper.find('.value').text(), '1');
    assert.deepEqual(wrapper.vm.count.hooks, [
        'watchSyncEffect',
        'watchPreEffect',
        'beforeUpdate',
        'watchPostEffect',
        'updated'
    ]);
});