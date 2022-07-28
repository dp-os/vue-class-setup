# vue-class-setup

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
    <div>ok{{ count.text }} {{count.time}}
    <button @click="count.add()">Add</button>
    </div>
</template>

<script lang="ts" setup>
import { Setup, Hook } from './class-setup';

@Setup
class Count {
    public value = 100;
    // computed
    public get text() {
        return String(this.value);
    }
    // computed
    public  get time() {
        return Date.now()
    }
    @Hook('onMounted')
    public init() {
        
    }
    public add() {
        this.value++;
    }
}

const count = new Count();
</script>
```