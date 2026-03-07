import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Redis } from '@upstash/redis';
import { Contribution } from '@/lib/cadeaux';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const redis = Redis.fromEnv();

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (session.payment_status !== 'paid') {
    return NextResponse.json({ received: true });
  }

  const cadeauId = session.metadata?.cadeauId;
  const contributeurNom = session.metadata?.contributeurNom;
  const montantEuros = Math.round((session.amount_total ?? 0) / 100);

  if (!cadeauId || !contributeurNom || montantEuros <= 0) {
    console.error('Webhook: missing metadata', session.id);
    return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
  }

  const key = `contributions:${cadeauId}`;
  const existing = await redis.get<Contribution[]>(key) ?? [];

  if (existing.some(c => c.stripeSessionId === session.id)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  const contribution: Contribution = {
    id: crypto.randomUUID(),
    cadeauId,
    contributeurNom,
    montant: montantEuros,
    stripeSessionId: session.id,
    createdAt: new Date().toISOString(),
  };

  existing.unshift(contribution);
  await redis.set(key, existing);

  return NextResponse.json({ received: true });
}
