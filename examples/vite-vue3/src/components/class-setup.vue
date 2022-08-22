<script lang="ts">
import { defineComponent } from 'vue';
import { Setup, Define } from 'vue-class-setup';

interface Props {
    title?: string;
}

@Setup
class App extends Define<Props> {
    // Define default props
    public readonly title = 'vue-class-setup';
    public list: string[] = [];
    public input = '';
    public get disabled() {
        return !this.input;
    }
    public add() {
        this.list.push(this.input);
        this.input = '';
    }
    public delIndex(index: number) {
        this.list.splice(index, 1);
    }
    public delAll() {
        this.list = [];
    }
}

export default defineComponent({
    ...App.inject(),
});
</script>
<script lang="ts" setup>
defineProps<Props>();
</script>
<template>
    <div class="content">
        <h2>{{ title }}</h2>
        <div>
            <input v-model="input" />
            <button class="btn" :disabled="disabled" @click="add">Add</button>
        </div>
        <button v-if="list.length" class="btn" @click="delAll">Del all</button>
        <ul v-if="list.length">
            <li v-for="(text, index) in list">
                {{ text }}
                <button class="btn" @click="delIndex(index)">Del</button>
            </li>
        </ul>
        <p v-else>This is empty</p>
    </div>
</template>
<style scoped>
.content {
    display: flex;
    flex-direction: column;
    padding: 100px;
    align-items: center;
}

.btn {
    margin-left: 10px;
}
</style>
