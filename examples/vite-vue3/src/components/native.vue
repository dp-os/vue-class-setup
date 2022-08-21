<script lang="ts" setup>
import { ref, computed } from 'vue';

const list = ref<string[]>([]);
const input = ref<string>('');
const disabled = computed(() => !input.value);

function add() {
    list.value.push(input.value);
    input.value = '';
}
function delIndex(index: number) {
    list.value.splice(index, 1);
}
function delAll() {
    list.value = [];
}
</script>
<template>
    <div class="content">
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
