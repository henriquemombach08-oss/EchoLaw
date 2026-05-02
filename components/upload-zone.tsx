'use client'

import { useState, useRef, DragEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

type State = 'idle' | 'uploading' | 'analyzing' | 'error'

export function UploadZone() {
  const [state, setState] = useState<State>('idle')
  const [progress, setProgress] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')
  const [fileName, setFileName] = useState('')
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  async function handleFile(file: File) {
    const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
    if (!allowed.includes(file.type)) {
      setErrorMsg('Use PDF ou imagem (JPG, PNG, WEBP).')
      setState('error')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Arquivo muito grande. Máximo 10MB.')
      setState('error')
      return
    }

    setFileName(file.name)
    setState('uploading')
    setProgress(20)

    const formData = new FormData()
    formData.append('file', file)

    const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData })
    if (!uploadRes.ok) {
      const { error } = await uploadRes.json()
      setErrorMsg(error ?? 'Erro ao fazer upload.')
      setState('error')
      return
    }

    const { path, name } = await uploadRes.json()
    setProgress(50)
    setState('analyzing')

    const analyzeRes = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentPath: path, documentName: name }),
    })

    if (!analyzeRes.ok) {
      const { error } = await analyzeRes.json()
      setErrorMsg(error ?? 'Erro ao analisar documento.')
      setState('error')
      return
    }

    const { analysisId } = await analyzeRes.json()
    setProgress(100)
    router.push(`/analise/${analysisId}`)
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  function reset() {
    setState('idle')
    setProgress(0)
    setErrorMsg('')
    setFileName('')
    if (inputRef.current) inputRef.current.value = ''
  }

  const isLoading = state === 'uploading' || state === 'analyzing'

  return (
    <div className="w-full max-w-xl mx-auto">
      {state === 'idle' || state === 'error' ? (
        <div
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
            dragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={onInputChange}
          />
          <div className="text-4xl mb-3">📄</div>
          <p className="font-medium text-gray-700">Arraste seu documento aqui</p>
          <p className="text-sm text-gray-500 mt-1">ou clique para selecionar</p>
          <p className="text-xs text-gray-400 mt-3">PDF, JPG, PNG, WEBP — máx. 10MB</p>

          {state === 'error' && (
            <p className="mt-4 text-sm text-red-600 font-medium">{errorMsg}</p>
          )}
        </div>
      ) : (
        <div className="border rounded-xl p-8 text-center space-y-4">
          <div className="text-2xl">{state === 'uploading' ? '⬆️' : '🔍'}</div>
          <p className="font-medium text-gray-700">
            {state === 'uploading' ? 'Enviando arquivo…' : 'Analisando documento…'}
          </p>
          <p className="text-sm text-gray-500 truncate">{fileName}</p>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-gray-400">
            {state === 'analyzing' ? 'Isso pode levar até 30 segundos.' : ''}
          </p>
        </div>
      )}
    </div>
  )
}
