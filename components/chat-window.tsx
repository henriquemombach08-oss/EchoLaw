'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ChatMessage } from '@/types'

const QUICK_QUESTIONS = [
  'Posso contestar isso?',
  'Quais são meus prazos?',
  'Isso é legal?',
]

export function ChatWindow({ analysisId }: { analysisId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return

    const userMsg: ChatMessage = { role: 'user', content: text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    const assistantMsg: ChatMessage = { role: 'assistant', content: '' }
    setMessages([...newMessages, assistantMsg])

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ analysisId, message: text, history: messages }),
    })

    if (!res.ok || !res.body) {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1].content = 'Erro ao obter resposta. Tente novamente.'
        return updated
      })
      setLoading(false)
      return
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const chunk = decoder.decode(value)
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: updated[updated.length - 1].content + chunk,
        }
        return updated
      })
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col h-[500px] border rounded-xl overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 && (
          <p className="text-sm text-gray-400 text-center mt-8">
            Faça uma pergunta sobre o documento.
          </p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white border text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.content || (loading && i === messages.length - 1 ? '…' : '')}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="border-t p-3 space-y-2 bg-white">
        <div className="flex gap-2 flex-wrap">
          {QUICK_QUESTIONS.map(q => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              disabled={loading}
              className="text-xs px-3 py-1 rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage(input)
              }
            }}
            placeholder="Pergunte sobre o documento…"
            rows={2}
            className="resize-none text-sm"
            disabled={loading}
          />
          <Button onClick={() => sendMessage(input)} disabled={loading || !input.trim()} size="sm">
            Enviar
          </Button>
        </div>
      </div>
    </div>
  )
}
