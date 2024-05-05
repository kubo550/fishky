<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
import type { DbSet } from '../lib/types'

const allSets = ref<DbSet[] | null>(null)

const getSets = async () => {
  try {
    const db = getFirestore()
    const sets = await getDocs(collection(db, 'sets'))

    allSets.value = sets.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    })) as DbSet[]
  } catch (e) {
    console.error(e)
  }
}
getSets()
</script>

<template>
  <div class="cards__container">
    <div v-for="set in allSets" :key="set.id" class="cards__card">
      <h2>{{ set.setName }}</h2>
      <h3>{{ set.creatorEmail }}</h3>
      <p>
        {{
          set.flashcards
            .map((flashcard) => flashcard.phrase)
            .join(', ')
            .substring(0, 100) + '...'
        }}
      </p>
      <a :href="`/sets/${set.id}`" class="link">
        <v-btn color="orange-accent-2">Learn</v-btn>
      </a>
    </div>
  </div>
</template>
<style scoped>
.cards__container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 16px;
  padding: 16px;
}
.link:hover {
  background-color: transparent;
}
.cards__card {
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;

  p {
    flex: 1;
    padding-bottom: 16px;
  }
}
</style>
