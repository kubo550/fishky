<script setup lang="ts">
import { ref } from 'vue'
import { isValidCSV, parseCsv } from '@/lib/utils'
import UploadCSV from '@/components/UploadCSV.vue'
import type { FlashcardType } from '@/views/InsertView.vue'
import FlashCards from '@/components/flash-cards.vue'
type UploadMethod = 'csv' | 'json' | 'image'

const flashcards = ref<FlashcardType[]>([])
const uploadMethod = ref<UploadMethod>('image')

const handleFile = (e: Event) => {
  // @ts-ignore
  const file = e.target?.files?.[0]
  if (!file || (file.type !== 'text/csv' && file.type !== 'application/json')) {
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    const parsedCSV = parseCsv(e.target?.result ?? '')

    if (isValidCSV(parsedCSV)) {
      flashcards.value = parsedCSV.map((row) => ({
        id: Math.random().toString(),
        term: row[0],
        meaning: row[1]
      }))
      console.log(flashcards.value)
    } else {
      flashcards.value = []
      console.log('Invalid CSV')
    }
  }
  reader.readAsText(file)
}
</script>

<template>
  <div class="container">
    <h1>Upload your file</h1>

    <div class="uploadMethod">
      <label>
        <input
          type="radio"
          value="csv"
          v-model="uploadMethod"
          @change="handleFile"
          name="uploadMethod"
        />
        CSV
      </label>

      <label>
        <input
          type="radio"
          value="json"
          v-model="uploadMethod"
          @change="handleFile"
          name="uploadMethod"
        />
        JSON
      </label>

      <label>
        <input
          type="radio"
          value="image"
          v-model="uploadMethod"
          @change="handleFile"
          name="uploadMethod"
        />
        Image
      </label>
    </div>

    <p>
      <span v-if="uploadMethod === 'csv'">
        <UploadCSV :handle-file="handleFile" />
      </span>
      <span v-if="uploadMethod === 'json'">JSON</span>
      <span v-if="uploadMethod === 'image'">Image</span>
    </p>
  </div>

  <FlashCards v-if="flashcards.length" :flashcards="flashcards" />
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

h1 {
  font-size: 2rem;
  font-weight: 500;
  color: #333;
}

p {
  font-size: 1.2rem;
  color: #666;
  margin-top: 1rem;
  text-align: center;
}

a {
  margin-top: 2rem;
}

.uploadMethod {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  gap: 1rem;
}
</style>
