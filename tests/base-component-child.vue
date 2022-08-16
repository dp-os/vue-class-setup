<script lang="ts">
import { Setup, Define } from 'vue-class-setup';

@Setup
class App extends Define<Props, Emits> {
    public get text() {
        return String(this.value);
    }
    public click(evt: MouseEvent) {
        this.$emit('click', evt);
    }
}

</script>
<script lang="ts" setup>

// Props and Emits need to be exported
export interface Props { value: number }
export interface Emits {
    (event: 'click', evt: MouseEvent): void;
}

// Variable reception must be used, otherwise Vue compilation error
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// When creating an app, pass parameters props and emit
const app = new App(props, emit);

</script>
<template>
    <button class="btn" @click="app.click($event)">
        <span class="text">{{ app.text }}</span>
    </button>
</template>
