<script lang="ts">
import { defineComponent } from 'vue';
import { Setup, Define } from 'vue-class-setup';

@Setup
class App extends Define<Props, Emit> {
    public readonly name = 'vue-class-setup';
    public readonly age = 1;
    public readonly ok1 = true;
    public onClick() {
        this.$emit('click');
    }
}

export default defineComponent({
    ...App.inject(),
});
</script>
<script lang="ts" setup>
export interface Props {
    code: number;
    name?: string;
    age?: number;
    ok1?: boolean;
    ok2?: boolean;
}

export interface Emit {
    (event: 'click'): void;
}

defineProps<Props>();
defineEmits<Emit>();
</script>
<template>
    <div class="code">{{ code }}</div>
    <div class="name">{{ name }}</div>
    <div class="age">{{ age }}</div>
    <div class="ok1">{{ ok1 }}</div>
    <div class="ok2">{{ ok2 }}</div>
    <button class="btn" @click="onClick"></button>
</template>
