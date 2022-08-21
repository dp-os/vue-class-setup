import { assert, test } from 'vitest';
import { mount } from '@vue/test-utils';

import BooleanProps from './boolean-props.vue';

test('Base', async () => {
    const wrapper = mount(BooleanProps, {
        props: {
            boolean2: false,
            boolean4: true,
            age2: 100,
        },
    });

    assert.equal(wrapper.find('.boolean1').text(), 'true');
    assert.equal(wrapper.find('.boolean2').text(), 'false');
    assert.equal(wrapper.find('.boolean3').text(), 'false');
    assert.equal(wrapper.find('.boolean4').text(), 'true');
    assert.equal(wrapper.find('.age1').text(), '10');
    assert.equal(wrapper.find('.age2').text(), '100');

    wrapper.setProps({
        boolean1: false,
        boolean3: true,
        age1: 100,
        age2: 10,
    });

    await wrapper.vm.$nextTick();

    assert.equal(wrapper.find('.boolean1').text(), 'false');
    assert.equal(wrapper.find('.boolean2').text(), 'false');
    assert.equal(wrapper.find('.boolean3').text(), 'true');
    assert.equal(wrapper.find('.boolean4').text(), 'true');
    assert.equal(wrapper.find('.age1').text(), '100');
    assert.equal(wrapper.find('.age2').text(), '10');

    wrapper.setProps({
        boolean1: true,
        boolean4: false,
        age1: null,
    });
    await wrapper.vm.$nextTick();

    assert.equal(wrapper.find('.boolean1').text(), 'true');
    assert.equal(wrapper.find('.boolean2').text(), 'false');
    assert.equal(wrapper.find('.boolean3').text(), 'true');
    assert.equal(wrapper.find('.boolean4').text(), 'false');
    assert.equal(wrapper.find('.age1').text(), '10');
});
