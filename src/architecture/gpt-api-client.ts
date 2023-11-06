export class GptApiClient {
  constructor(private authToken: string) {}

  get headers() {
    return {
      Authorization: `Bearer ${this.authToken}`,
      'Content-Type': 'application/json'
    }
  }

  get baseUrl() {
    return 'https://api.openai.com/v1'
  }

  async makeRequest(method: 'GET' | 'POST', body?: Record<string, string | number | null>) {
    // const response = await axios.request({
    //   url: this.baseUrl,
    //   method,
    //   headers: this.headers,
    //   data: {
    //     max_tokens: 100,
    //     temperature: 0.1,
    //     top_p: 1,
    //     frequency_penalty: 0,
    //     presence_penalty: 0,
    //     stop: ['\n', 'Phrases:'],
    //     ...body
    //   }
    // })
    // return response.data

    return `{
"phrases": [
{"phrase": "Pattern recognition"},
{"phrase": "activity"},
{"phrase": "fundamental"},
{"phrase": "human nature"},
{"phrase": "often goes unnoticed"},
{"phrase": "daily lives"},
{"phrase": "distinguish"},
{"phrase": "faces of loved ones"},
{"phrase": "understand speech"},
{"phrase": "interpret complex information"},
{"phrase": "world around us"},
{"phrase": "human brain"},
{"phrase": "exceptionally adapted"},
{"phrase": "seeking regularities"},
{"phrase": "continuity in sensory perception"},
{"phrase": "utilizes these abilities"},
{"phrase": "navigation"},
{"phrase": "stimulus-rich environment"},
{"phrase": "enables the identification"},
{"phrase": "dangers"},
{"phrase": "discovery of opportunities"},
{"phrase": "lifelong learning"},
{"phrase": "adaptation"}
]
}`
  }
}
