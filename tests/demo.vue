<script lang="ts">
import { defineComponent } from 'vue';
import { Setup, Context } from 'vue-class-setup';

// Setup and Context must work together
@Setup
class App extends Context {
    public _value = 0;
    public get text() {
        return String(this._value);
    }
    public set text(text: string) {
        this._value = Number(text);
    }
    public onClick() {
        this._value++;
    }
}
export default defineComponent({
    ...App.inject()
})
</script>
<template>
    <div>
        {{ _value }}
        <p>{{ text }}</p>
        <button @click="onClick()"></button>
    </div>
</template>
