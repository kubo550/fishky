<script setup lang="ts">
defineProps({
  handleFile: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <p>Here you can upload your CSV file with terms and meanings.</p>

  <p>
    Download template file to see how it should look like in order to upload it correctly
    <a href="/template.csv" download>download</a>
  </p>

  <input type="file" accept="text/csv" @change="handleFile" />
</template>

<style scoped></style>
