import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

const PRICE_IDS: Record<string, string | undefined> = {
  essencial: process.env.STRIPE_PRICE_ESSENCIAL,
  pro: process.env.STRIPE_PRICE_PRO,
}

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe não configurado' }, { status: 503 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const { plan } = await request.json()
  const priceId = PRICE_IDS[plan]
  if (!priceId) return NextResponse.json({ error: 'Plano inválido' }, { status: 400 })

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/perfil?upgraded=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/perfil`,
    customer_email: user.email ?? undefined,
    metadata: { user_id: user.id, plan },
  })

  return NextResponse.json({ url: session.url })
}
