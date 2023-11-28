<script setup lang="ts">
import type { Phrase } from '@/lib/types'
import type { PropType } from 'vue'

const { phrases } = defineProps({
  phrases: {
    type: Array as PropType<Phrase[]>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'onPhraseAdd'): void
  (e: 'onPhraseDelete', id: string): void
  (e: 'onSave', newText: string): void
}>()
</script>

<template>
  <div class="phrases">
    <div v-for="(phrase, index) in phrases" :key="phrase.id" class="phrase">
      <v-text-field
        v-model="phrase.phrase"
        :label="`Phrase ${index + 1}`"
        :append-icon="'mdi-delete'"
        variant="filled"
        type="text"
        @click:append="emit('onPhraseDelete', phrase.id)"
      ></v-text-field>
    </div>

    <v-btn class="add-phrase" variant="outlined" @click="emit('onPhraseAdd')">
      <v-icon icon="mdi-plus" class="main__buttons__icon"></v-icon>
      Add Phrase
    </v-btn>
  </div>

  <!-- <button @click="$emit('onButtonClick', phrases)">TRANSLATE </button> -->
</template>

<style scoped>
.phrases {
  margin-top: 8px;
  display: grid;
  grid-template-columns: repeat(3, 250px);
  gap: 4px 16px;
}

.phrase {
  width: 100%;
  display: flex;
  align-items: center;
}

.add-phrase {
  margin-top: 8px;
  width: 60%;
}
</style>
