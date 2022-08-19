<script lang="ts">
import { Setup, Context } from 'vue-class-setup';

@Setup
class App extends Context {
    public value = 0;
    public get text() {
        return String(this.value);
    }
    public set text(text: string) {
        this.value = Number(text);
    }
    public onClick() {
        this.value++;
    }
}
</script>
<script setup lang="ts">
const app = new App();
</script>
<template>
    <div>
        <p>{{ app.text }}</p>
        <button @click="app.onClick()"></button>
    </div>
</template>
