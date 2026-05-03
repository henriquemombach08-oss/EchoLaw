'use client'

import { useState, useRef, DragEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'

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
    <div className="w-full h-full">
      {state === 'idle' || state === 'error' ? (
        <div
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current?.click()}
          className={`bg-surface-container-low rounded-xl p-8 border-2 border-dashed transition-all group flex flex-col items-center justify-center text-center space-y-6 cursor-pointer min-h-[300px] ${
            dragging
              ? 'border-primary bg-primary-fixed/20'
              : 'border-outline-variant hover:border-primary'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={onInputChange}
          />

          {/* Upload icon */}
          <div className="w-20 h-20 rounded-full bg-primary-fixed flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-primary text-4xl group-hover:[font-variation-settings:'FILL'_1,'wght'_400,'GRAD'_0,'opsz'_24]">
              upload_file
            </span>
          </div>

          {/* Text */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-on-surface">
              Arraste seu documento aqui
            </h3>
            <p className="text-on-surface-variant">
              ou clique para selecionar do seu dispositivo
            </p>
          </div>

          {/* Format badges */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {['PDF', 'JPG', 'PNG'].map((fmt) => (
              <span
                key={fmt}
                className="px-3 py-1 bg-surface-container-highest rounded text-xs font-bold text-on-secondary-container"
              >
                {fmt}
              </span>
            ))}
          </div>

          {/* Error message */}
          {state === 'error' && (
            <p className="text-sm text-error font-medium">{errorMsg}</p>
          )}
        </div>
      ) : (
        <div className="bg-surface-container-low rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-6 min-h-[300px]">
          {/* Status icon */}
          <div className="w-20 h-20 rounded-full bg-primary-fixed flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-4xl">
              {state === 'uploading' ? 'cloud_upload' : 'manage_search'}
            </span>
          </div>

          {/* Status text */}
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-on-surface">
              {state === 'uploading' ? `Enviando... ${progress}%` : 'Analisando...'}
            </h3>
            {fileName && (
              <p className="text-sm text-on-surface-variant truncate max-w-xs mx-auto">
                {fileName}
              </p>
            )}
            {state === 'analyzing' && (
              <p className="text-xs text-on-surface-variant">
                Isso pode levar até 30 segundos.
              </p>
            )}
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-xs">
            <div className="bg-surface-container rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
