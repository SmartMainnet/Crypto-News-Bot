export const getChunks = (arr: any[], chunkSize: number) => {
  const chunks = []

  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize)
    chunks.push(chunk)
  }

  return chunks
}