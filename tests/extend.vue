<script lang="ts">
import { onBeforeMount, onMounted } from 'vue';
import { Setup, PassOnTo } from 'vue-class-setup';

@Setup
class Base {
    public value = 0;
    public get text () {
        return String(this.value);
    }
    @PassOnTo(onBeforeMount)
    public init() {
        this.value++;
    }
}

@Setup
class Left extends Base {
    public left = 0;
    public get text() {
        return String(`value:${this.value}`)
    }
    public init() {
        super.init();
        this.value++;
    }
    @PassOnTo(onMounted)
    public initLeft() {
        this.left++;
    }
}

@Setup
class Right extends Base {
    public right = 0;
    public init() {
        super.init();
        this.value++;
    }
    @PassOnTo(onMounted)
    public initLeft() {
        this.right++;
    }
}

</script>
<script setup lang="ts">
const left = new Left();
const right = new Right()
</script>
<template>
    <p class="left">{{ left.text }}</p>
    <p class="right">{{ right.text }}</p>
</template>