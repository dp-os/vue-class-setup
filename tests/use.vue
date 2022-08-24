<script lang="ts">
import { defineComponent } from 'vue';
import { Setup, Context } from 'vue-class-setup';

@Setup
class App extends Context {
    private _value = 0;
    public get text() {
        return String(this._value);
    }
    public set text(text: string) {
        this._value = Number(text);
    }
    public addValue() {
        this._value++;
    }
}
export default defineComponent({
    ...App.inject(),
});
</script>
<script lang="ts" setup>
const app = App.use();

defineExpose({
    addValue: app.addValue,
});
</script>
<template>
    <div>
        <p class="text">{{ text }}</p>
        <p class="text-eq">{{ app.text === text }}</p>
        <button @click="addValue"></button>
    </div>
</template>
