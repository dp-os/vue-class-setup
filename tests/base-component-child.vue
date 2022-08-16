<script lang="ts">
import { Setup, Define } from 'vue-class-setup'

@Setup
class App extends Define<Props, Emits> {
    public get text() {
        return String(this.props.value);
    }
    public click(evt: MouseEvent) {
        this.emit('click', evt);
    }
}

</script>
<script lang="ts" setup>

export interface Props { value: number }

export interface Emits {
    (event: 'click', evt: MouseEvent): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const app = new App(props, emit);

</script>
<template>
    <button class="btn" @click="app.click($event)">
        <span class="text">{{ app.text }}</span>
    </button>
</template>
