<script setup lang="ts">
import { isValidCSV, parseCsv } from '@/lib/utils'
import type { PropType } from 'vue'
import type { FlashcardType } from '@/views/InsertView.vue'

const { setFlashcards } = defineProps({
  setFlashcards: {
    type: Function as PropType<(newFlashcards: FlashcardType[]) => void>,
    required: true
  }
})

const handleUploadFile = (e: Event) => {
  // @ts-ignore
  const file = e.target?.files?.[0]
  if (!file || (file.type !== 'text/csv' && file.type !== 'application/json')) {
    alert('Invalid file')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    const parsedCSV = parseCsv(e.target?.result ?? '')

    if (isValidCSV(parsedCSV)) {
      const flashcards = parsedCSV.map((row) => ({
        id: Math.random().toString(),
        term: row[0],
        meaning: row[1]
      }))

      setFlashcards(flashcards)
    } else {
      setFlashcards([])
      alert('Invalid CSV file')
    }
  }
  reader.readAsText(file)
}
</script>

<template>
  <p>Here you can upload your CSV file with terms and meanings.</p>

  <p>
    Download template file to see how it should look like in order to upload it correctly
    <a href="/template.csv" download>download</a>
  </p>

  <input type="file" accept="text/csv" @change="handleUploadFile" />
</template>

<style scoped></style>
