<script lang="ts">
import { Setup, Watch, Context } from 'vue-class-setup';

@Setup
class App extends Context {
    public value = 0;
    public immediateValue = 0;
    public onClick() {
        this.value++;
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
const app = new App();
</script>
<template>
    <p class="value">{{ app.value }}</p>
    <p class="immediate-value">{{ app.immediateValue }}</p>
    <button @click="app.onClick()">Add</button>
</template>
