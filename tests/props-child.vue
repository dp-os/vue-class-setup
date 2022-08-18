<script lang="ts">
import { type Count } from './props-parent.vue';
import { Setup, Define } from 'vue-class-setup'

@Setup
class Child extends Define<Props, Emits> {
    public name = 'child';
    get text() {
        return 'child:' + this.count.value;
    }
}

@Setup
class App extends Define<Props, Emits> {
    public child = new Child();
    public name = 'app';
    public get text() {
        return 'root:' + this.count.value;
    }
    public add() {
        this.$emit('add');
    }
}

</script>
<script lang="ts" setup>

export interface Props { count: Count }

export interface Emits {
    (event: 'add'): void;
}

defineProps<Props>();
defineEmits<Emits>();

const app = new App();

</script>
<template>
    <div>
        <p class="root-text">{{ app.text }}</p>
        <p class="child-text">{{ app.child.text }}</p>
        <button class="child-btn" @click="app.add()">Add</button>
    </div>
</template>
