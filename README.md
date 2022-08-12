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

## Usage
```vue
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
// Use the class you write in setup
const count = new Count();
</script>
<template>
    <p>{{ count.text }}</p>
</template>
```

## Computed
Using the get accessor or `computed` hook, it will be converted to `computed`
```ts
import { Setup, Hook } from 'vue-class-setup';

@Setup
class Count {
    public value = 0;
    // computed
    public get text() {
        return String(this.value);
    }
    @Hook('computed')
    public getTime() {
        return Date.now();
    }
}
```
## Custom setup
```ts
import { Setup, Hook } from 'vue-class-setup';

@Setup
class Count {
    @Hook('setup')
    private setup() {
        // Your code
    }
}
```
## How to use watch?
Watch parameters are complex, so decorators are not supported, but `setup` hooks are provided
```ts
import { watch } from 'vue';
import { Setup, Hook } from 'vue-class-setup';

@Setup
class Count {
    public value = 0;
    @Hook('setup')
    public setup() {
        watch(() => this.value, (value) => {
            // Your code
        })
    }
}
```
## Register hook
```ts
import { registerHook, Setup, Hook, HookCallback } from 'vue-class-setup'
registerHook('my', (target: object, name: string | symbol) => {
    // Your code
})
@Setup
class Count {
    public value = 100;
    @Hook('my')
    public add() {
        this.value++;
    }
}
declare module 'vue-class-setup' {
    interface Hooks {
        my: HookCallback;
    }
}
```