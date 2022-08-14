<script lang="ts">
import { onMounted } from 'vue';
import { Setup, Hook } from 'vue-class-setup';


@Setup
class Count {
    public value = 0;
    public ready = false;
    public get text() {
        return `value:${this.value}`;
    }
    public get time() {
        return Date.now();
    }
    public add() {
        this.value++;
    }
    @Hook(onMounted)
    public onReady() {
        this.ready = true;
    }
}

</script>
<script setup lang="ts">
const count = new Count();
</script>
<template>
    <div>
        <p class="value">{{ count.value }}</p>
        <p class="text">{{ count.text }}</p>
        <p class="ready">{{ count.ready }}</p>
        <time class="time">{{ count.time }}</time>
        <button class="button" @click="count.add">Add</button>
    </div>
</template>