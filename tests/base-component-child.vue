<script lang="ts">
import { Setup, Define } from 'vue-class-setup';

@Setup
class App extends Define<Props, Emit> {
    // 🚀 The default value of the prop can only be initialized in the constructor,
    // 💥 and cannot be modified later. It is only read-only
    public readonly dest = '222';
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
export interface Props { value: number, dest?: string }
export interface Emit {
    (event: 'click', evt: MouseEvent): void;
}

// Variable reception must be used, otherwise Vue compilation error
defineProps<Props>();
defineEmits<Emit>();

// ❌ You should define default values directly on the class
// withDefaults()

// When creating an app, pass parameters props and emit
const app = new App();

// app.$props = defineProps<Props>()
// app.$emit = defineEmits<Emit>()
</script>
<template>
    <button class="btn" @click="app.click($event)">
        <span class="text">{{ app.text }}</span>
        <span class="props-text">{{ app.$props.value }}</span>
    </button>
</template>
