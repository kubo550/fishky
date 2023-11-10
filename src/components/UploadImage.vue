<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import { createWorker } from 'tesseract.js'

const isLoading = ref(false)
const error = ref<string | null>(null)
const imageProgress = ref(0)
const imageProgressStatus = ref('')

const imageProgressText = computed(() => `${(imageProgress.value * 100).toFixed(2)}%`)
const worker = await createWorker({
  logger: (m) => {
    console.log(m)
    imageProgress.value = m.progress
    imageProgressStatus.value = m.status
  }
})

const { setText, onNext } = defineProps({
  setText: {
    type: Function as PropType<(newText: string) => void>,
    required: true
  },
  onNext: {
    type: Function as PropType<() => void>,
    required: false,
    default: () => {}
  }
})

async function extractTextFromImage(image: string) {
  await worker.loadLanguage('eng')
  await worker.initialize('eng')
  const {
    data: { text }
  } = await worker.recognize(image)

  await worker.terminate()
  return text
}

const handleUploadFile = (e: Event) => {
  // @ts-ignore
  const file = e.target?.files?.[0]
  if (!file || (file.type !== 'image/png' && file.type !== 'image/jpeg')) {
    alert('Invalid file')
    return
  }

  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = async () => {
    isLoading.value = true
    imageProgress.value = 0

    error.value = null
    try {
      setText(await extractTextFromImage(file))
      onNext()
    } catch (e) {
      error.value = 'Error while extracting text from image'
    } finally {
      isLoading.value = false
    }

    isLoading.value = false
  }
}
</script>

<template>
  <p>Here you can upload your image with text in different languages.</p>
  <p>
    We will try to extract text from it and translate it to your native language and create
    flashcards for you.
  </p>

  <p>
    Download template file to see how it should look like in order to upload it correctly
    <a href="/template-image.png" download>download</a>
  </p>

  <input type="file" accept="image/png, image/jpeg" @change="handleUploadFile" />

  <!--  TODO: -->
  <!--  <p>or</p>-->
  <!--  <button>Take a photo</button>-->

  <div v-if="isLoading">
    <p>Extracting text from image...</p>
    <progress :value="imageProgress" max="1" />
    <p>{{ imageProgressStatus }} - {{ imageProgressText }}</p>
  </div>
  <div v-if="error">Error: {{ error }}</div>
</template>

<style scoped>
p {
  margin-bottom: 1rem;
}
</style>
