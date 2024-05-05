<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import type { DbSet } from '../lib/types'
// noinspection TypeScriptCheckImport
import vueFlashcard from 'vue-flashcard'

const router = useRouter()
const setId = router.currentRoute.value.params.id as string

const currentSet = ref<DbSet | null>(null)

const getSet = async (setId: string) => {
  try {
    const db = getFirestore()
    const setRef = doc(db, 'sets', setId)
    const setSnap = await getDoc(setRef)
    if (setSnap.exists()) {
      currentSet.value = setSnap.data() as DbSet
    } else {
      await router.push('/sets')
    }
  } catch (e) {
    console.error(e)
  }
}

getSet(setId)
</script>

<template>
  <div class="learn__container">
    <v-carousel
      class="carousel"
      v-if="currentSet?.flashcards?.length"
      hide-delimiters
      show-arrows="hover"
      progress="orange-accent-2"
      height="auto"
    >
      <template v-slot:prev="{ props }">
        <div class="arrow">
          <v-icon color="grey-darken-4" @click="props.onClick">mdi-chevron-left</v-icon>
        </div>
      </template>
      <template v-slot:next="{ props }">
        <div class="arrow">
          <v-icon color="grey-darken-4" @click="props.onClick">mdi-chevron-right</v-icon>
        </div>
      </template>

      <v-carousel-item class="item" v-for="(phrase, i) in currentSet?.flashcards || []" :key="i">
        <vue-flashcard :front="phrase.phrase" :back="phrase.meaning"> </vue-flashcard>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<style scoped>
.learn__container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.item {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.arrow {
  padding: 4px;
}
</style>
