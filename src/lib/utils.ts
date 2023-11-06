import { GptApiClient } from '@/architecture/gpt-api-client'

export function parseCsv(csv: string | ArrayBuffer): string[][] {
  if (typeof csv !== 'string') {
    return []
  }
  return csv
    .split('\n')
    .map((row) => row.split(','))
    .filter((row) => row.length > 0)
    .map((row) => row.map((cell) => cell.trim().replace(/^"(.*)"$/, '$1')))
}

function hasTwoColumns(parsedCSV: string[][]) {
  return parsedCSV.every((row) => row.length === 1 || row.length === 2)
}

export function isValidCSV(parsedCSV: string[][]) {
  return hasTwoColumns(parsedCSV)
}

// TODO: use gpt to pre-generate phrases
export async function extractPhrasesFromText(text: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return text
    .split(/\s+/g)
    .filter((p) => p !== '')
    .map((p) => p.trim())
    .map((p) => p.replace(/[^a-zA-Z ]/g, ''))
    .map((p) => p.toLowerCase())
    .map((p, i, arr) => {
      if (i === arr.length - 1) return p
      return `${p} ${arr[i + 1]}`
    })
    .filter((_, i) => i % 2 === 0)
    .filter((p, i, arr) => arr.indexOf(p) === i)
    .map((p) => ({ id: Math.random().toString(), phrase: p }))
}

export async function premiumExtractPhrasesFromText(text: string) {
  const gptApiClient = new GptApiClient('TODO')
  const prompt =
    "podziel ten tekst na fragmenty o długości maksymalnie kilku słów, takie fragmenty które będą później na fiszkach do nauki języka obcego, więc możesz omijać oczywiste słowa takie jak 'and'  'so' 'the' itp jeżeli są na początku lub końcu takiej frazy, odpowiedź tylko i wyłącznie jsonem który powinien być takiego typu phrases: [{phrase: string}]. nie wolno ci dodać nic poza jsonem. tekst: "
  const response = await gptApiClient.makeRequest('POST', {
    prompt: prompt + text
  })

  return JSON.parse(response).phrases.map((p: { phrase: string }) => ({
    id: Math.random().toString(),
    phrase: p.phrase
  }))
}
