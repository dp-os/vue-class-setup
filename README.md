[![Build Status](https://github.com/fmfe/vue-class-setup/workflows/CI/badge.svg)](https://github.com/fmfe/vue-class-setup/actions)
<a href='https://coveralls.io/github/fmfe/vue-class-setup?branch=main'><img src='https://coveralls.io/repos/github/fmfe/vue-class-setup/badge.svg?branch=main' alt='Coverage Status' /></a>
[![npm](https://img.shields.io/npm/v/vue-class-setup.svg)](https://www.npmjs.com/package/vue-class-setup) 
[![npm](https://img.shields.io/npm/dm/vue-class-setup.svg)](https://www.npmjs.com/package/vue-class-setup)
[![npm](https://img.shields.io/npm/dt/vue-class-setup.svg)](https://www.npmjs.com/package/vue-class-setup)
# vue-class-setup
Use class to write setup, and support vue2 and vue3    
Only 1.34 KiB after gzip compression

## Install
```bash
npm install vue-class-setup
# or
yarn add vue-class-setup
```

## Quick start
```vue
<script lang="ts">
import { onMounted } from 'vue';
import { Setup, Hook } from 'vue-class-setup';

@Setup
class Count {
    public value = 0;
    public get text() {
        return String(this.value);
    }
    @Hook(onMounted)
    public init() {
        this.value++;
    }
}

</script>
<script setup lang="ts">
// Use the class you write in setup
const count = new Count();
</script>
<template>
    <p>{{ count.text }}</p>
</template>
```
Through `Setup`, it will be converted into the following execution logic
```ts
const compute = computed(() => String(count.value));
Object.defineProperty(count, 'text', {
    get () {
        return compute.count;
    }
});

onMounted(() => count.init());
```