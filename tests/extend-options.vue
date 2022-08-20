<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { Setup, Context, PassOnTo } from 'vue-class-setup';

@Setup
class Base extends Context {
    public value = 0;
    @PassOnTo(onMounted)
    public init() {
        this.value = 1;
    }
}

@Setup
class App extends Base {
    @PassOnTo(onMounted)
    public init() {
        this.value = 2;
    }
    @PassOnTo(onMounted)
    public init2() {
        this.value++;
    }
}

export default defineComponent({
    ...App.inject(),
});
</script>
<template>
    <p>{{ value }}</p>
</template>
