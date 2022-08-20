<script lang="ts">
import { defineComponent } from 'vue';
import { Setup, Define } from 'vue-class-setup';

interface Props {
    msg: string;
}

@Setup
class App extends Define<Props> {
    public value = 0;
    public constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }
    public onClick() {
        this.value++;
    }
}

export default defineComponent({
    ...App.inject(),
});
</script>
<script setup lang="ts">
defineProps<Props>();
</script>

<template>
    <div>
        <h1>{{ msg }}</h1>

        <div class="card">
            <button type="button" @click="onClick">count is {{ value }}</button>
            <p>
                Edit
                <code>components/HelloWorld.vue</code> to test HMR
            </p>
        </div>

        <p>
            Check out
            <a
                href="https://vuejs.org/guide/quick-start.html#local"
                target="_blank"
                >create-vue</a
            >, the official Vue + Vite starter
        </p>
        <p>
            Install
            <a href="https://github.com/johnsoncodehk/volar" target="_blank"
                >Volar</a
            >
            in your IDE for a better DX
        </p>
        <p class="read-the-docs">
            Click on the Vite and Vue logos to learn more
        </p>
    </div>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
