<template>
    <p>{{ count.text }}</p>
</template>
<script lang="ts">
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

</script>
<script setup lang="ts">
const count = new Count();
</script>