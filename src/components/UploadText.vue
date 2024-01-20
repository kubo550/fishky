<script setup lang="ts">
const { text, getPhrasesButtonLoading } = defineProps({
  text: {
    type: String,
    required: false,
    default: ''
  },
  getPhrasesButtonLoading: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'onChange', newText: string): void
  (e: 'onGetPhrases'): void
}>()
</script>

<template>
  <div class="upload-text__container">
    <div>
      <p>Paste any foreign language text into the box below.</p>
      <p>
        This tool will intelligently break it down into smaller segments for your language learning
        flashcards.
      </p>
      <p>Let's start learning!</p>
    </div>
    <div>
      <v-textarea
        :model-value="text"
        @input="emit('onChange', $event.target.value)"
        label="Text"
        variant="outlined"
        rows="20"
        class="upload-text__textarea"
        placeholder="Paste your text here"
        :rules="[
          (newText) => !!newText || 'Please enter some text',
          (newText) => newText.length < 10000 || 'Text is too long'
        ]"
      ></v-textarea>
      <v-btn
        :disabled="getPhrasesButtonLoading"
        variant="outlined"
        class="upload-text__button"
        @click="emit('onGetPhrases')"
      >
        <template v-if="!getPhrasesButtonLoading">
          <v-icon icon="mdi-set-split" class="upload-text__button-icon"></v-icon>
          get phrases from text
        </template>
        <v-progress-circular v-else indeterminate :size="20" :width="2"></v-progress-circular>
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.upload-text__container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.upload-text__textarea {
  width: 45vw;
}

.upload-text__button {
  width: 260px;
  float: right;
}
.upload-text__button-icon {
  display: block;
  height: auto;
  margin-right: 8px;
}
</style>
