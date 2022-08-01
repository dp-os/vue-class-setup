<template>
    <div>ok{{ count.text }} {{count.time}}
    <button @click="count.add()">Add</button>
    </div>
</template>

<script lang="ts" setup>
import { Setup, Hook } from 'vue-class-setup';

@Setup
class Count {
    public value = 100;
    public get text() {
        return String(this.value);
    }
    public  get time() {
        return Date.now()
    }
    @Hook('onMounted')
    public init() {}
    public add() {
        this.value++;
    }
}

console.dir(Count);

const count = new Count();
</script>