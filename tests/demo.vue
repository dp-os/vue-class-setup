<template>
    <p>{{ count.text }}</p>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Setup, Hook } from 'vue-class-setup';

@Setup
class Count {
    public value = 0;
    public get text() {
        return String(this.value);
    }
    @Hook('mounted')
    public init() {
        this.value++;
    }
}

export default defineComponent({
    setup() {
        return {
            count: new Count()
        }
    }
})
</script>