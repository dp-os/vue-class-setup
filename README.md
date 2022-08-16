# vue-class-setup

[![Build Status](https://github.com/fmfe/vue-class-setup/workflows/CI/badge.svg)](https://github.com/fmfe/vue-class-setup/actions)
<a href='https://coveralls.io/github/fmfe/vue-class-setup?branch=main'><img src='https://coveralls.io/repos/github/fmfe/vue-class-setup/badge.svg?branch=main' alt='Coverage Status' /></a>
[![npm](https://img.shields.io/npm/v/vue-class-setup.svg)](https://www.npmjs.com/package/vue-class-setup)
[![npm](https://img.shields.io/npm/dm/vue-class-setup.svg)](https://www.npmjs.com/package/vue-class-setup)
[![npm](https://img.shields.io/npm/dt/vue-class-setup.svg)](https://www.npmjs.com/package/vue-class-setup)

## Why?

Using class can help you avoid `ref`, `reactive` and `computed`, and significantly reduce your mental burden and better organize your code. It supports vue2 and vue3 at the same time. After gzip compression, it is only 1KB

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
import { Setup, PassOnTo } from 'vue-class-setup';

@Setup
class Count {
    public value = 0;
    public get text() {
        return String(this.value);
    }
    public set text(text) {
        this.value = Number(text);
    }
    @PassOnTo(onMounted)
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
    <input type="number" v-model="count.text" />
</template>
```

## PassOnTo
This `callback` will be called back after the `Test class` instantiation is completed, and the decorated function will be passed in, and the TS can check whether the type is correct
```ts
class Test {
    @PassOnTo(myFunc)
    public init(name: string) {}
}

function myFunc (callback: (name: string) => void) {
    // ...
}
```

If `PassOnTo` does not pass in a handler, it is called after `reactive` and `computed` execution are completed, You should avoid watching in the `constructor` because it may not have `reactive`

```ts
import { Watch } from 'vue';

@Setup
class Count {
    public value = 0;
    @PassOnTo()
    private setup() {
        // Safe Watch
        watch(
            () => this.value,
            (value) => {
                // ...
            }
        );
    }
}
```

## Define
If the component defines props, writing the class in the setup will cause the setup function to create a class every time as it executes, which will add costs. So we should avoid writing classes in setup and use Define basic classes to receive props and emit. The following examples provide best practices

```vue
<script lang="ts">
import { Setup, Define } from 'vue-class-setup'

@Setup
class App extends Define<Props, Emits> {
    public get text() {
        return String(this.props.value);
    }
    public click(evt: MouseEvent) {
        this.emit('click', evt);
    }
}

</script>
<script lang="ts" setup>

export interface Props { value: number }

export interface Emits {
    (event: 'click', evt: MouseEvent): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const app = new App(props, emit);

</script>
<template>
    <button class="btn" @click="app.click($event)">
        <span class="text">{{ app.text }}</span>
    </button>
</template>

```
