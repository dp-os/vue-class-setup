[![Build Status](https://github.com/fmfe/vue-class-setup/workflows/CI/badge.svg)](https://github.com/fmfe/vue-class-setup/actions)
[![Coverage Status](https://coveralls.io/repos/github/fmfe/vue-class-setup/badge.svg?branch=main)](https://coveralls.io/github/fmfe/vue-class-setup?branch=main)
[![npm](https://img.shields.io/npm/v/vue-class-setup.svg)](https://www.npmjs.com/package/vue-class-setup) 
[![npm](https://img.shields.io/npm/dm/vue-class-setup.svg)](https://www.npmjs.com/package/vue-class-setup)
[![npm](https://img.shields.io/npm/dt/vue-class-setup.svg)](https://www.npmjs.com/package/vue-class-setup)
# vue-class-setup
Use class to write setup, and support vue2 and vue3

## Install
```bash
npm install vue-class-setup
# or
yarn add vue-class-setup
```

## Usage
```vue
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
```

## Computed
Using the get accessor and `computed` hook, it will be converted to `computed`
```ts
import { defineComponent } from 'vue';
import { Setup, Hook } from 'vue-class-setup';

@Setup
class Count {
    public get time() {
        return Date.now();
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
    public setup() {
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
