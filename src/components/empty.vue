<script setup>
const props = defineProps({
  message: {
    type: String,
    default: 'Empty search'
  }
})
</script>

<template>
  <div class="text-center py-5">
    <div style="background-color: #1ac659;" class="alert" role="alert">
      <h4 class="alert-heading text-light">No Results Found</h4>
      <p class="text-light">{{ props.message }}.</p>
    </div>
  </div>
</template>
