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
