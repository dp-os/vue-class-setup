<script lang="ts">
import { watch } from 'vue';
import { Setup, Hook, onSetup } from 'vue-class-setup';


@Setup
class Count {
    public value = 0;
    public add() {
        this.value++;
    }
    public setValue(value: number) {
        this.value = value;
    }
    @Hook(onSetup)
    public setup() {
        watch(() => this.value, (value) => {
            if (value > 100) {
                this.value = 100
            }
        })
    }
}

</script>
<script setup lang="ts">
const count = new Count();
defineExpose<{ count: Count }>()
</script>
<template>
    <p class="value">{{ count.value }}</p>
    <button @click="count.add()">Add</button>
</template>