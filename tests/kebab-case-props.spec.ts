import { assert, test } from 'vitest';
import { mount } from '@vue/test-utils';

import KebabCasePropsParent from './kebab-case-props-parent.vue';

test('Base', async () => {
    const wrapper = mount(KebabCasePropsParent);
    assert.equal(wrapper.find('.name').text(), 'vue-class-setup');
    assert.equal(wrapper.find('.name-and-age').text(), '100');
    assert.equal(wrapper.find('.ssss').text(), '50');
});
