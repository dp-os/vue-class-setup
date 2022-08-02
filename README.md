[![Build Status](https://travis-ci.com/fmfe/vue-class-setup.svg?branch=master)](https://travis-ci.com/fmfe/vue-class-setup)
[![Coverage Status](https://coveralls.io/repos/github/fmfe/vue-class-setup/badge.svg?branch=master)](https://coveralls.io/github/fmfe/vue-class-setup?branch=master)
[![npm](https://img.shields.io/npm/v/vue-class-setup.svg)](https://www.npmjs.com/package/vue-class-setup) 
[![npm](https://img.shields.io/npm/dm/vue-class-setup.svg)](https://www.npmjs.com/package/vue-class-setup)
[![npm](https://img.shields.io/npm/dt/vue-class-setup.svg)](https://www.npmjs.com/package/vue-class-setup)
# vue-class-setup
Write setup using class

## Install
```bash
npm install vue-class-setup
```
or
```bash
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
