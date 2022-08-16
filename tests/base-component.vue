<script lang="ts">
import { Setup } from 'vue-class-setup'

@Setup
class App {
    public value = 0;
    public onClick() {
        this.value++;
    }
}
</script>
<script lang="ts" setup>
import BaseComponentChild from './base-component-child.vue';

const app = new App();
</script>

<template>
    <BaseComponentChild :value="app.value" @click="app.onClick()" />
</template>