const CHUNK_SIZE = 500
const OVERLAP = 50

export function chunkText(text: string): string[] {
  const words = text.split(/\s+/).filter(Boolean)
  const chunks: string[] = []

  let i = 0
  while (i < words.length) {
    const chunk = words.slice(i, i + CHUNK_SIZE).join(' ')
    if (chunk.trim()) chunks.push(chunk)
    i += CHUNK_SIZE - OVERLAP
  }

  return chunks
}
