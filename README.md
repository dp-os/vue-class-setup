# vue-class-setup

[![Build Status](https://github.com/fmfe/vue-class-setup/workflows/CI/badge.svg)](https://github.com/fmfe/vue-class-setup/actions)
<a href='https://coveralls.io/github/fmfe/vue-class-setup?branch=main'><img src='https://coveralls.io/repos/github/fmfe/vue-class-setup/badge.svg?branch=main' alt='Coverage Status' /></a>
[![npm](https://img.shields.io/npm/v/vue-class-setup.svg)](https://www.npmjs.com/package/vue-class-setup)
[![npm](https://img.shields.io/npm/dm/vue-class-setup.svg)](https://www.npmjs.com/package/vue-class-setup)
[![npm](https://img.shields.io/npm/dt/vue-class-setup.svg)](https://www.npmjs.com/package/vue-class-setup)

## Why?

Using class can help you avoid `ref`, `reactive` , `computed` and `withDefaults`, and significantly reduce your mental burden and better organize your code. It supports vue2 and vue3 at the same time. After gzip compression, it is only 1KB

## VS vue-class-component
**We should deprecate [vue-class-component](https://github.com/vuejs/vue-class-component/issues/569), And use class in setup**
|  List   | vue-class-component | vue-class-setup |
| --- | --- | ----------- |
|  Vue2 | ✅ | ✅ |
|  Vue3 | ❌ | ✅ |
|  Props type check | ❌ | ✅ |
|  Emit type check | ❌ | ✅ |
|  Watch type check | ❌ | ✅ |
|  Multiple class instances | ❌ | ✅ |
|  Class attribute sets the default value of the prop | ❌ | ✅ |

## Install

```bash
npm install vue-class-setup
# or
yarn add vue-class-setup
```

## Quick start

<!-- file:./tests/demo.vue start -->
```vue
<script lang="ts">
import { onMounted } from 'vue';
import { Setup, Context, PassOnTo } from 'vue-class-setup';

@Setup
class App extends Context {
    public value = 0;
    public get text() {
        return String(this.value);
    }
    public set text(text: string) {
        this.value = Number(text);
    }
    @PassOnTo(onMounted)
    public init() {
        this.value++;
    }
}
</script>
<script setup lang="ts">
const app = new App();
</script>
<template>
    <p>{{ app.text }}</p>
</template>
```
<!-- file:./tests/demo.vue end -->
## Setup

If the component defines `props`, writing the `class` in the `setup` will cause the `setup` function to create a `class` every time as it executes, which will add costs. So we should avoid writing `class` in `setup` and use `Define` basic class to receive `props` and `emit`. 


### Best practices
<!-- file:./tests/base-component-child.vue start -->
```vue
<script lang="ts">
import { Setup, Define } from 'vue-class-setup';

// You can create multiple setup class, Only one is shown here
@Setup
class App extends Define<Props, Emit> {
    // ✨ The default value of the prop can only be initialized in the constructor,
    // ✨ and cannot be modified later. It is only read-only
    public readonly dest = '--';
    // Automatically convert to vue 'computed'
    public get text() {
        return String(this.value);
    }
    public click(evt: MouseEvent) {
        this.$emit('click', evt);
    }
}

</script>
<script lang="ts" setup>

// Props and Emits need to be exported
export interface Props { value: number, dest?: string }
export interface Emit {
    (event: 'click', evt: MouseEvent): void;
}

// Variable reception must be used, otherwise Vue compilation error
// ❌ const props = defineProps<Props>();
// ❌ const emit = defineEmits<Emit>();
defineProps<Props>(); //  ✅ 
defineEmits<Emit>();  //  ✅ 

// You should define default values directly on the class
// ❌ withDefaults(defineProps<Props>(), { dest: '--' });
// ✅ @Setup
// ✅ class App extends Define<Props, Emit> {
// ✅     public readonly dest = '--'
// ✅ }

// Automatic dependency injection and reactive
// const app = reactive(new App()); // ❌ 
const app = new App();              // ✅ 

</script>
<template>
    <button class="btn" @click="app.click($event)">
        <span class="text">{{ app.text }}</span>
        <span class="props-dest">{{ app.dest }}</span>
        <span class="props-value">{{ app.$props.value }}</span>
    </button>
</template>
```
<!-- file:./tests/base-component-child.vue end -->
### PassOnTo
This `callback` will be called back after the `Test class` instantiation is completed, and the decorated function will be passed in, and the TS can check whether the type is correct

```ts
@Setup
class App extends Define {
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
class App extends Define {
    public value = 0;
    @PassOnTo()
    private setup() {
        // You can safely watch, but it is recommended to use the Watch decorator
        watch(
            () => this.value,
            (value) => {
                // ...
            }
        );
    }
}
```

### Watch
It can correctly identify the type
<!-- file:./tests/watch.vue start -->
```vue
<script lang="ts">
import { Setup, Watch, Context } from 'vue-class-setup';

@Setup
class App extends Context {
    public value = 0;
    public immediateValue = 0;
    public onClick() {
        this.value++;
    }
    @Watch('value')
    public watchValue(value: number, oldValue: number) {
        if (value > 100) {
            this.value = 100;
        }
    }
    @Watch('value', { immediate: true })
    public watchImmediateValue(value: number, oldValue: number | undefined) {
        if (typeof oldValue === 'undefined') {
            this.immediateValue = 10;
        } else {
            this.immediateValue++;
        }
    }
}
</script>
<script setup lang="ts">
const app = new App();
</script>
<template>
    <p class="value">{{ app.value }}</p>
    <p class="immediate-value">{{ app.immediateValue }}</p>
    <button @click="app.onClick()">Add</button>
</template>
```
<!-- file:./tests/watch.vue end -->
## Vue compatible
- `getCurrentInstance` returns the proxy object by default    
- `VueInstance` It is not easy to get a Vue instance object type compatible with vue2 and vue3. We make it easy

```ts
import { isVue2, isVue3, getCurrentInstance, type VueInstance } from 'vue-class-setup';

// isVue2 -> boolean
// isVue3 -> boolean
// getCurrentInstance -> VueInstance

```
