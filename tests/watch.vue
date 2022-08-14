<script lang="ts">
import { watch } from 'vue';
import { Setup, PassOnTo } from 'vue-class-setup';

@Setup
class Count {
    public value = 0;
    public add() {
        this.value++;
    }
    public setValue(value: number) {
        this.value = value;
    }
    @PassOnTo()
    public setup(age: number) {
        watch(
            () => this.value,
            (value) => {
                if (value > 100) {
                    this.value = 100;
                }
            }
        );
        return 200;
    }
}

function onTest(cb: () => number) {
    return true;
}
</script>
<script setup lang="ts">
const count = new Count();
defineExpose<{ count: Count }>();
</script>
<template>
    <p class="value">{{ count.value }}</p>
    <button @click="count.add()">Add</button>
</template>
