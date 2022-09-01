<script lang="ts">
import { defineComponent } from 'vue';
import { Setup, Define } from 'vue-class-setup';

@Setup
class App extends Define<Props> {
    public readonly boolean1 = true;
    public readonly boolean3 = false;
    public readonly boolean6 = false;
    public readonly showIcon = false;
    public readonly age1 = 10;
}

export default defineComponent({
    ...App.inject(),
});
</script>
<script lang="ts" setup>
export interface Props {
    boolean1?: boolean;
    boolean2: boolean;
    boolean3?: boolean;
    boolean4: boolean;
    boolean5?: boolean;
    boolean6?: boolean;
    showIcon?: boolean;
    age1?: number | boolean;
    age2: number | boolean;
}
defineProps<Props>();
</script>
<template>
    <p class="boolean1">{{ boolean1 }}</p>
    <p class="boolean2">{{ boolean2 }}</p>
    <p class="boolean3">{{ boolean3 }}</p>
    <p class="boolean4">{{ boolean4 }}</p>
    <p class="boolean5">{{ boolean5 }}</p>
    <p class="boolean6">{{ boolean6 }}</p>
    <p class="show-icon">{{ showIcon }}</p>
    <p class="age1">{{ age1 }}</p>
    <p class="age2">{{ age2 }}</p>
</template>
