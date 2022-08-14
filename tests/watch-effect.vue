<script lang="ts">
import { watchEffect, watchSyncEffect, watchPostEffect, onUpdated, onBeforeMount, onBeforeUpdate } from 'vue';
import { Setup, Hook } from 'vue-class-setup';

@Setup
class Count {
    public value = 0;
    public hooks: string[] = [];
    public add() {
        this.hooks = [];
        this.value++;
    }
    @Hook(watchEffect)
    public watchPreEffect() {
        this.hooks.push('watchPreEffect');
    }
    @Hook(watchSyncEffect)
    public watchSyncEffect() {
        this.hooks.push('watchSyncEffect');
    }
    @Hook(onBeforeMount)
    public beforeMount() {
        this.hooks.push('beforeMount');
    }
    @Hook(onBeforeUpdate)
    public beforeUpdate() {
        this.hooks.push('beforeUpdate');
    }
    @Hook(watchPostEffect)
    public watchPostEffect() {
        this.hooks.push('watchPostEffect');
    }
    @Hook(onUpdated)
    public updated() {
        this.hooks.push('updated');
    }
}

</script>
<script setup lang="ts">
const count = new Count();
defineExpose<{ count: Count }>()

</script>
<template>
    <div>
        <p class="value">{{ count.value }}</p>
        <button class="add" @click="count.add">Add</button>
    </div>
</template>