<script lang="ts">
import { type Count } from './props-parent.vue';
</script>
<script lang="ts" setup>
const { count } = defineProps<{ count: Count }>();

const emit = defineEmits<{
  (event: 'add'): void
}>()

</script>
<template>
  <div>
    <p class="child-text">{{ count.value }}</p>
    <button class="child-btn" @click="emit('add')">Add</button>
  </div>
</template>