<script lang="ts">
import { defineComponent } from 'vue';
import { Setup, Context } from 'vue-class-setup';

@Setup
class Base extends Context {
    public count = 0;
    public setCount(count: number) {
        this.count = count;
    }
    public resetCount() {
        return (count: number) => {
            this.count = --count;
        };
    }
}

@Setup
class App extends Base {
    public value = 0;
}
export default defineComponent({
    ...App.inject(),
});
</script>
<script lang="ts" setup></script>
<template>
    <div>
        <p class="value">{{ value }}</p>
        <p class="count">{{ count }}</p>
        <button class="value-btn" @click="value++"></button>
        <button class="count-btn" @click="setCount(100)"></button>
        <button
            class="count-btn2"
            @click="
                setCount = resetCount();
                setCount(50);
            "
        ></button>
    </div>
</template>
