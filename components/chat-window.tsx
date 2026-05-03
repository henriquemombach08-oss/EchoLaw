'use client'

import { useState, useRef, useEffect } from 'react'
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
    <div className="border-t border-outline-variant pt-12 mt-16 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg text-on-primary">
          <span className="material-symbols-outlined text-lg">forum</span>
        </div>
        <h2 className="text-2xl font-black text-on-surface">Tire suas dúvidas</h2>
      </div>

      {/* Message area */}
      <div className="space-y-6 mb-8">
        {messages.length === 0 && (
          <p className="text-sm text-on-surface-variant text-center py-8">
            Faça uma pergunta sobre o documento.
          </p>
        )}
        {messages.map((msg, i) => (
          msg.role === 'user' ? (
            <div key={i} className="flex justify-end">
              <div className="bg-secondary-container text-on-secondary-container p-4 rounded-2xl rounded-tr-none max-w-[80%] text-sm shadow-sm whitespace-pre-wrap">
                {msg.content}
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-start gap-3">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-on-primary flex-shrink-0">
                <span className="material-symbols-outlined text-xs">smart_toy</span>
              </div>
              <div className="bg-surface-container-high text-on-surface p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm shadow-sm leading-relaxed whitespace-pre-wrap">
                {msg.content || (loading && i === messages.length - 1 ? '…' : '')}
              </div>
            </div>
          )
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick chips */}
      <div className="flex gap-2 flex-wrap">
        {QUICK_QUESTIONS.map(q => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            disabled={loading}
            className="bg-surface-bright border border-outline-variant hover:border-primary hover:text-primary transition-all px-4 py-2 rounded-full text-xs font-bold text-on-surface-variant disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              sendMessage(input)
            }
          }}
          placeholder="Pergunte sobre o documento…"
          disabled={loading}
          className="bg-surface-container-low border border-outline-variant rounded-xl py-4 pl-6 pr-14 focus:ring-2 focus:ring-primary text-on-surface w-full outline-none text-sm disabled:opacity-60"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-on-primary h-10 w-10 rounded-lg flex items-center justify-center disabled:opacity-50 hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  )
}
