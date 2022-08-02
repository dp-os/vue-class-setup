<template>
    <p class="left">{{ left.text }}</p>
    <p class="right">{{ right.text }}</p>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Setup, Hook } from 'vue-class-setup';

@Setup
class Base {
    public value = 0;
    public get text () {
        return String(this.value);
    }
    @Hook('beforeMount')
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
    @Hook('mounted')
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
    @Hook('mounted')
    public initLeft() {
        this.right++;
    }
}

export default defineComponent({
    setup() {
        return {
            left: new Left(),
            right: new Right()
        }
    }
});
</script>