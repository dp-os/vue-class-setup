<script lang="ts">
import { defineComponent } from 'vue';
import { Setup, Define } from 'vue-class-setup';

@Setup
class App extends Define<Props, Emit> {}
</script>
<script lang="ts" setup>
export interface Props {
    NameOne: string;
    nameAndAge: number;
    sSSS: number;
}

export interface Emit {
    (event: 'click'): void;
}

defineProps<Props>();
defineEmits<Emit>();

const app = new App();
</script>
<template>
    <p class="name">{{ app.NameOne }}</p>
    <p class="name-and-age">{{ app.nameAndAge }}</p>
    <p class="ssss">{{ app.sSSS }}</p>
</template>
