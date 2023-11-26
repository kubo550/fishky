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
    <v-textarea
      :model-value="text"
      @input="emit('onChange', $event.target.value)"
      label="Text"
      variant="outlined"
      rows="20"
      class="upload-text__textarea"
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
</template>

<style scoped>
.upload-text__textarea {
  width: 30vw;
}

.upload-text__button {
  min-width: 230px;
}
.upload-text__button-icon {
  display: block;
  height: auto;
  margin-right: 8px;
}
</style>
