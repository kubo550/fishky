<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import type { DbSet } from '../lib/types'

const router = useRouter()
const setId = router.currentRoute.value.params.id as string

const currentSet = ref<DbSet | null>(null)

const getSet = async (setId: string) => {
  try {
    const db = getFirestore()
    const setRef = doc(db, 'sets', setId)
    const setSnap = await getDoc(setRef)
    if (setSnap.exists()) {
      console.log(setSnap.data())
      currentSet.value = setSnap.data() as DbSet
    }
  } catch (e) {
    console.error(e)
  }
}

getSet(setId)
</script>

<template>
  <v-sheet class="container">
    <h1>TODO: add the same carousel component here</h1>
  </v-sheet>
</template>
<style scoped></style>
