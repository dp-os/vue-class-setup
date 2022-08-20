<script lang="ts">
import { onMounted, onBeforeMount } from 'vue';
import { Setup, Define, PassOnTo } from 'vue-class-setup';

@Setup
class Count extends Define {
    public value = 0;
    public initBtn = false;
    public get text() {
        return String(this.value);
    }
    @PassOnTo(onBeforeMount)
    @PassOnTo(onMounted)
    public init() {
        this.value++;
    }
    @PassOnTo(onMounted)
    public init2() {
        this.initBtn = true;
    }
}
</script>
<script setup lang="ts">
const count = new Count();
</script>
<template>
    <p class="btn">{{ count.initBtn }}</p>
    <p class="text">{{ count.text }}</p>
</template>
