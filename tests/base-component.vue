<script lang="ts">
import { Setup } from 'vue-class-setup'

@Setup
class App {
    public value = 0;
    public dest: string | undefined = undefined;
    public onClick() {
        this.value++;
        this.dest = 'clicked'
    }
}
</script>
<script lang="ts" setup>
import BaseComponentChild from './base-component-child.vue';

const app = new App();
</script>

<template>
    <BaseComponentChild :value="app.value" :dest="app.dest" @click="app.onClick()" />
</template>