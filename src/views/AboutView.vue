<script setup lang="ts">
import { ref } from 'vue'
import UploadCSV from '@/components/UploadCSV.vue'
import type { FlashcardType } from '@/views/InsertView.vue'
import FlashCards from '@/components/flash-cards.vue'
enum UploadMethod {
  CSV = 'csv',
  JSON = 'json',
  IMAGE = 'image'
}

const flashcards = ref<FlashcardType[]>([])
const uploadMethod = ref<UploadMethod>(UploadMethod.IMAGE)

const setFlashcards = (newFlashcards: FlashcardType[]) => {
  flashcards.value = newFlashcards
}
</script>

<template>
  <div class="container">
    <h1>Upload your file</h1>

    <div class="uploadMethod">
      <label>
        <input type="radio" value="csv" v-model="uploadMethod" name="uploadMethod" />
        CSV
      </label>

      <label>
        <input type="radio" value="json" v-model="uploadMethod" name="uploadMethod" />
        JSON
      </label>

      <label>
        <input type="radio" value="image" v-model="uploadMethod" name="uploadMethod" />
        Image
      </label>
    </div>

    <p>
      <span v-if="uploadMethod === UploadMethod.CSV">
        <UploadCSV :setFlashcards="setFlashcards" />
      </span>
      <span v-if="uploadMethod === UploadMethod.JSON">JSON</span>
      <span v-if="uploadMethod === UploadMethod.IMAGE">Image</span>
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
