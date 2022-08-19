<script lang="ts">
import { Setup, Watch, Define } from 'vue-class-setup';

@Setup
class Count extends Define {
    public value = 0;
    public immediateValue = 0;
    public add() {
        this.value++;
    }
    public setValue(value: number) {
        this.value = value;
    }
    @Watch('value')
    public watchValue(value: number, oldValue: number) {
        if (value > 100) {
            this.value = 100;
        }
    }
    @Watch('value', { immediate: true })
    public watchImmediateValue(value: number, oldValue: number | undefined) {
        if (typeof oldValue === 'undefined') {
            this.immediateValue = 10;
        } else {
            this.immediateValue++;
        }
    }
}
</script>
<script setup lang="ts">
const count = new Count();
defineExpose<{ count: Count }>();
</script>
<template>
    <p class="value">{{ count.value }}</p>
    <p class="immediate-value">{{ count.immediateValue }}</p>
    <button @click="count.add()">Add</button>
</template>
