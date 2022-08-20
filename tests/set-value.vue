<script lang="ts">
import { defineComponent } from 'vue';
import { Setup, Context } from 'vue-class-setup';

@Setup
class App extends Context {
    public value = 0;
}
export default defineComponent({
    ...App.inject()
})
</script>
<template>
    <div>
        <p>{{ value }}</p>
        <button @click="value++"></button>
    </div>
</template>
