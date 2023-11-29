<script setup lang="ts">
import type { PropType } from 'vue'
import type { Phrase } from '@/lib/types'

const { phrases } = defineProps({
  phrases: {
    type: Array as PropType<Phrase[]>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'onPhraseAdd'): void
  (e: 'onPhraseDelete', id: string): void
  (e: 'onSave', phrases: Phrase[]): void
}>()
</script>

<template>
  <div class="phrases">
    <div v-for="(phrase, index) in phrases" :key="phrase.id" class="phrase">
      <v-text-field
        class="phrase__phrase"
        v-model="phrase.phrase"
        :label="`Phrase ${index + 1}`"
        variant="filled"
        type="text"
      ></v-text-field>

      <v-text-field
        class="phrase__meaning"
        v-model="phrase.meaning"
        :label="`Meaning ${index + 1}`"
        variant="filled"
        type="text"
        :append-icon="'mdi-delete'"
      ></v-text-field>
    </div>

    <v-btn class="add-phrase" variant="outlined" @click="emit('onPhraseAdd')">
      <v-icon icon="mdi-plus" class="main__buttons__icon"></v-icon>
      Add Phrase
    </v-btn>
  </div>

  <v-btn @click="emit('onSave', phrases)" class="save">
    <v-icon icon="mdi-translate" class="main__buttons__icon"></v-icon>
    Save
  </v-btn>
</template>

<style scoped>
.phrases {
  margin-top: 8px;
  display: grid;
  grid-template-columns: 550px;
  gap: 4px 16px;
}

.phrase {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phrase__phrase {
  width: 100%;
}

.phrase__meaning {
  width: 100%;
  margin: 0 0 0 16px;
}

.save {
  margin-top: 20px;
}
</style>
