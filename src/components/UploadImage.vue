<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import { createWorker } from 'tesseract.js'

const isLoading = ref(false)
const error = ref<string | null>(null)
const imageProgress = ref(0)
const imageProgressStatus = ref('')

const imageProgressPercent = computed(() => imageProgress.value * 100)
const imageProgressText = computed(() => `${imageProgressPercent.value.toFixed(2)}%`)
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

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
</script>

<template>
  <div class="upload-image__container">
    <div class="upload-image__description">
      <p>Below You can upload any picture containing text and our Artificial Inteligence will take care of everything!</p>
      <p>
       Any text will be extracted and translated accordingly. FishCards will be created.
      </p>

      <p>
        In case of uncertainty, <a href="/template-image.png" download>download</a> a template image and see for Yourself how easy is is!
      
      </p>
    </div>

    <v-file-input
      accept="image/*"
      label="Select image"
      variant="outlined"
      prepend-icon="mdi-image"
      class="file-input"
      @change="handleUploadFile"
    ></v-file-input>

    <!--  TODO: -->
    <!--  <p>or</p>-->
    <!--  <button>Take a photo</button>-->

    <div v-if="isLoading">
      <v-progress-linear
        v-if="imageProgressStatus === 'recognizing text'"
        color="blue-lighten-3"
        :model-value="imageProgressPercent"
        :height="9"
      ></v-progress-linear>
      <p>
        {{ capitalize(imageProgressStatus) }}
        <span v-if="imageProgressStatus === 'recognizing text'"> - {{ imageProgressText }}</span>
        <span v-else>...</span>
      </p>
    </div>
    <div v-if="error">Error: {{ error }}</div>
  </div>
</template>

<style scoped>
.upload-image__container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.file-input {
  margin-left: auto;
  margin-right: auto;
  width: 300px;
}
</style>
