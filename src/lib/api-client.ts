import type { Phrase } from '@/lib/types'
import axios from 'axios'

function poorTranslatePhrases(phrases: Phrase[]) {
  return phrases.map((phrase) => ({
    ...phrase,
    meaning: phrase.meaning || phrase.phrase
  }))
}

class ApiClient {
  private readonly instance: ReturnType<typeof axios.create>

  constructor(
    private readonly baseUrl: string,
    private readonly apiKey: string
  ) {
    this.instance = axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
  }

  async getPhrases(text: string): Promise<Phrase[]> {
    const response = await this.instance.post<{ phrases: Phrase[] }>('/extract-phrases', {
      text
    })

    return response.data.phrases
  }

  async translatePhrases(phrases: Phrase[], targetLang: string = 'PL'): Promise<Phrase[]> {
    return poorTranslatePhrases(phrases)

    const response = await this.instance.post<{ response: Phrase[] }>('/translate', {
      phrases,
      targetLang
    })

    return response.data.response
  }
}

function throwError(err: string) {
  throw new Error(err)
}

export const apiClient = new ApiClient(
  import.meta.env.VITE_NEXT_PUBLIC_API_URL || throwError('NEXT_PUBLIC_API_URL is not set'),
  import.meta.env.VITE_NEXT_PUBLIC_API_KEY || throwError('NEXT_PUBLIC_API_KEY is not set')
)
