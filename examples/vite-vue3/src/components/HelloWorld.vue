<script lang="ts">
import { defineComponent } from 'vue';
import { Setup, Define } from 'vue-class-setup';

export interface Props {
    msg: string;
}

@Setup
class App extends Define<Props> {
    public count = 0;
    public onClick() {
        this.count++;
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
    <h1>{{ msg }}</h1>

    <div class="card">
        <button type="button" @click="onClick()">count is {{ count }}</button>
        <p>
            Edit
            <code>components/HelloWorld.vue</code> to test HMR
        </p>
    </div>

    <p>
        Check out
        <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
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
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
