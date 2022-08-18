<script lang="ts">
import { watch } from 'vue';
import { Setup, Define, PassOnTo } from 'vue-class-setup';

@Setup
class Count extends Define {
    public value = 0;
    public get valueText() {
        return String(this.value);
    }
    public add() {
        this.value++;
    }
    public setValue(value: number) {
        this.value = value;
    }
    @PassOnTo()
    public setup() {
        watch(
            () => this.valueText,
            (text) => {
                if (this.value > 100) {
                    this.value = 100;
                }
            }
        );
    }
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
