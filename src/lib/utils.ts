export function parseCsv(csv: string): string[][] {
  return csv
    .split('\n')
    .map((row) => row.split(','))
    .filter((row) => row.length > 0)
    .map((row) => row.map((cell) => cell.trim().replace(/^"(.*)"$/, '$1')))
}
