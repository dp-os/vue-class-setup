<script lang="ts">
import { type Count } from './props-parent.vue';
import { Setup, Define } from 'vue-class-setup'

@Setup
class App extends Define<Props, Emits>() {
    public get value () {
        return this.count.value;
    }
    public add () {
        this.$emit('add');
    }
}

</script>
<script lang="ts" setup>

export interface Props { count: Count }

export interface Emits {
    (event: 'add'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const app = new App(props, emits);

</script>
<template>
    <div>
        <p class="child-text">{{ app.value }}</p>
        <button class="child-btn" @click="app.add()">Add</button>
    </div>
</template>
