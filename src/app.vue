<template>
    <div>ok{{ count.text }} {{count.time}}
    <button @click="count.add()">Add</button>
    </div>
</template>

<script lang="ts" setup>
import { Setup, Hook } from './class-setup';

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
    public init() { 
        console.log('>>>> 哈哈');
    }
    public add() {
        this.value++;
    }
}

const count = new Count();
</script>