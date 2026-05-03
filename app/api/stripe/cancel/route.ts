import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

export async function POST() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe não configurado' }, { status: 503 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  // Find customer by email
  const customers = await stripe.customers.list({ email: user.email!, limit: 1 })
  if (!customers.data.length) {
    return NextResponse.json({ error: 'Cliente não encontrado no Stripe' }, { status: 404 })
  }

  const customerId = customers.data[0].id

  // Find active subscription
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'active',
    limit: 1,
  })

  if (!subscriptions.data.length) {
    return NextResponse.json({ error: 'Nenhuma assinatura ativa encontrada' }, { status: 404 })
  }

  // Cancel immediately
  await stripe.subscriptions.cancel(subscriptions.data[0].id)

  // Downgrade plan immediately
  const service = createServiceClient()
  await service.from('profiles').update({ plan: 'free' }).eq('id', user.id)

  return NextResponse.json({ success: true })
}
