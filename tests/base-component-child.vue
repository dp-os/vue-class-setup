<script lang="ts">
import { defineComponent } from 'vue';
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

/**
 * You can directly call the injection method here
 * or manually inject in the setup function
 * <script lang="ts" setup>
 *   const app = new App();
 * <\/script>
 * <template>
 *  <div>{{ app.text }}</div>
 * </template>
 */
export default defineComponent({
    ...App.inject()
})
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
// const app = new App();           // ✅ 

</script>
<template>
    <button class="btn" @click="click($event)">
        <span class="text">{{ text }}</span>
        <span class="props-dest">{{ dest }}</span>
        <span class="props-value">{{ $props.value }}</span>
    </button>
</template>
