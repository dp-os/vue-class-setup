<script lang="ts">
import { Setup, Define } from 'vue-class-setup';
import Child from './props-child.vue';

const NAME = 'vue-class-setup';

@Setup
export class Count extends Define {
    public value = 0;
    public name = 'props-parent';
    public add() {
        this.value++;
    }
}
</script>
<script lang="ts" setup>
const count = new Count();
</script>
<template>
    <div>
        <p class="parent-text">{{ count.value }}</p>
        <p class="name">{{ NAME }}</p>
        <Child :count="count" @add="count.add()" />
    </div>
</template>
