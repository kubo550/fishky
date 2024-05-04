export type FlashcardType = {
  id: string
  term: string
  meaning: string
}

export type Phrase = {
  id: string
  phrase?: string
  meaning?: string
}

export type DbSet = {
  id?: string
  creatorId: string
  creatorEmail: string | null
  setName: string
  flashcards: Required<Phrase>[]
}
