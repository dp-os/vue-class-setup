<script lang="ts">
import { onMounted } from 'vue';
import { Setup, Define, PassOnTo } from 'vue-class-setup';

@Setup
class App extends Define {
    public value = 0;
    public get text() {
        return String(this.value);
    }
    public set text(text) {
        this.value = Number(text);
    }
    @PassOnTo(onMounted)
    public init() {
        this.value++;
    }
}
</script>
<script setup lang="ts">
// Use the class you write in setup
const app = new App();
</script>
<template>
    <p>{{ app.text }}</p>
    <input type="number" v-model="app.text" />
</template>
