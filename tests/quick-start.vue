<script lang="ts">
import { onMounted } from 'vue';
import { Setup, PassOnTo } from 'vue-class-setup';

@Setup
class Count {
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
const count = new Count();
</script>
<template>
    <p>{{ count.text }}</p>
    <input type="number" v-model="count.text" />
</template>
