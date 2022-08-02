<template>
    <div>
        <p class="value">{{ count.value }}</p>
        <p class="text">{{count.text}}</p>
        <p class="ready">{{count.ready}}</p>
        <time class="time">{{ count.time }}</time>
        <button class="button" @click="count.add">Add</button>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
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
    @Hook('mounted')
    public onReady() {
        this.ready = true;
    }
}

export default defineComponent({
    setup() {
        return {
            count: new Count()
        }
    }
})
</script>