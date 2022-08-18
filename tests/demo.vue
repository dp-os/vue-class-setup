<script lang="ts">
import { onMounted } from 'vue';
import { Setup, Define, PassOnTo } from 'vue-class-setup';

@Setup
class Count extends Define {
    public value = 0;
    public get text() {
        return String(this.value);
    }
    @PassOnTo(onMounted)
    public init() {
        this.value++;
    }
}
</script>
<script setup lang="ts">
const count = new Count();
</script>
<template>
    <p>{{ count.text }}</p>
</template>
