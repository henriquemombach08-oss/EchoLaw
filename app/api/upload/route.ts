import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const MAX_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'Arquivo não enviado' }, { status: 400 })

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Tipo de arquivo não suportado. Use PDF ou imagem.' }, { status: 400 })
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'Arquivo muito grande. Máximo 10MB.' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()
  const path = `${user.id}/${Date.now()}.${ext}`
  const buffer = await file.arrayBuffer()

  const { error } = await supabase.storage
    .from('documents')
    .upload(path, buffer, { contentType: file.type })

  if (error) return NextResponse.json({ error: 'Erro ao fazer upload' }, { status: 500 })

  return NextResponse.json({ path, name: file.name })
}
