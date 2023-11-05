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
export function extractPhrasesFromText(text: string) {
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
