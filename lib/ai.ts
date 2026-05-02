import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const ANALYSIS_MODEL = 'llama-3.3-70b-versatile'
const CHAT_MODEL = 'llama-3.3-70b-versatile'
const VISION_MODEL = 'llama-3.2-11b-vision-preview'

async function jinaEmbed(inputs: string[]): Promise<number[][]> {
  const res = await fetch('https://api.jina.ai/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.JINA_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'jina-embeddings-v3',
      input: inputs.map(t => t.slice(0, 8000)),
    }),
  })
  if (!res.ok) throw new Error(`Jina embedding error: ${res.status}`)
  const data = await res.json()
  return data.data.map((d: { embedding: number[] }) => d.embedding)
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const [embedding] = await jinaEmbed([text])
  return embedding
}

// Batch: up to 100 texts per call, processes in groups of 20 to stay within rate limits
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const BATCH = 20
  const results: number[][] = []
  for (let i = 0; i < texts.length; i += BATCH) {
    const batch = texts.slice(i, i + BATCH)
    const embeddings = await jinaEmbed(batch)
    results.push(...embeddings)
  }
  return results
}

export async function analyzeWithLLM(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const response = await groq.chat.completions.create({
    model: ANALYSIS_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.2,
    max_tokens: 2000,
    response_format: { type: 'json_object' },
  })
  const content = response.choices[0].message.content ?? ''
  // Strip markdown code fences if model ignores the format instruction
  return content.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
}

export async function streamChat(
  systemPrompt: string,
  messages: { role: 'user' | 'assistant'; content: string }[]
) {
  return groq.chat.completions.create({
    model: CHAT_MODEL,
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
    temperature: 0.3,
    max_tokens: 600,
    stream: true,
  })
}

export async function extractTextFromImage(base64Image: string): Promise<string> {
  const response = await groq.chat.completions.create({
    model: VISION_MODEL,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: `data:image/jpeg;base64,${base64Image}` },
          },
          {
            type: 'text',
            text: 'Extraia todo o texto deste documento jurídico. Retorne apenas o texto, sem comentários.',
          },
        ],
      },
    ],
    max_tokens: 4000,
  })
  return response.choices[0].message.content ?? ''
}
