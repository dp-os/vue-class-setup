<template>
    <div>
        <p class="value">{{ count.value }}</p>
        <button class="add" @click="count.add">Add</button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Setup, Hook, HookType } from 'vue-class-setup';

@Setup
class Count {
    public value = 0;
    public hooks: HookType[] = [];
    public add() {
        this.hooks = [];
        this.value++;
    }
    @Hook('watchPreEffect')
    public watchPreEffect() {
        this.hooks.push('watchPreEffect');
    }
    @Hook('watchSyncEffect')
    public watchSyncEffect() {
        this.hooks.push('watchSyncEffect');
    }
    @Hook('beforeMount')
    public beforeMount() {
        this.hooks.push('beforeMount');
    }
    @Hook('beforeUpdate')
    public beforeUpdate() {
        this.hooks.push('beforeUpdate');
    }
    @Hook('watchPostEffect')
    public watchPostEffect() {
        this.hooks.push('watchPostEffect');
    }
    @Hook('updated')
    public updated() {
        this.hooks.push('updated');
    }
}

</script>
<script setup lang="ts">
const count = new Count();
</script>