<script lang="ts">
import { defineComponent } from 'vue';
import { Setup, Context } from 'vue-class-setup';
import PropsBindChild, { Props } from './props-bind-child.vue';

@Setup
class App extends Context {
    public code = 0;
    public get props(): Props {
        const { code } = this;
        switch (code) {
            case 1:
                return {
                    code,
                    name: 'parent',
                    age: 2,
                    ok1: false,
                    ok2: true,
                };
            case 2:
                return {
                    code,
                };
        }
        return {
            code,
        };
    }
    public onClick() {
        this.code++;
    }
}

export default defineComponent({
    ...App.inject(),
});
</script>
<script lang="ts" setup>
defineProps();
</script>
<template>
    <div>
        <PropsBindChild v-bind="props" @click="onClick" />
    </div>
</template>
