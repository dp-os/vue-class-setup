<script lang="ts">
import { onMounted } from 'vue';
import { Setup, Context, PassOnTo } from 'vue-class-setup';

@Setup
class App extends Context {
    public value = 0;
    public get text() {
        return String(this.value);
    }
    public set text(text: string) {
        this.value = Number(text);
    }
    @PassOnTo(onMounted)
    public init() {
        this.value++;
    }
}
</script>
<script setup lang="ts">
const app = new App();
</script>
<template>
    <p>{{ app.text }}</p>
</template>
