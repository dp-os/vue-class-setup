<template>
    <p class="value">{{ count.value }}</p>
    <button @click="count.add()">Add</button>
</template>
<script lang="ts">
import { defineComponent, watch } from 'vue';
import { Setup, Hook } from 'vue-class-setup';


@Setup
class Count {
    public value = 0;
    public add() {
        this.value++;
    }
    public setValue(value: number) {
        this.value = value;
    }
    @Hook('setup')
    public setup() {
        watch(() => this.value, (value) => {
            if (value > 100) {
                this.value = 100
            }
        })
    }
}

export default defineComponent({
    setup() {
        return {
            count: new Count()
        }
    }
});
</script>