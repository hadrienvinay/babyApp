import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CADEAUX } from '@/lib/cadeaux';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { cadeauId, montant, contributeurNom } = await req.json();

  const cadeau = CADEAUX.find(c => c.id === cadeauId);
  if (!cadeau) {
    return NextResponse.json({ error: 'Cadeau introuvable' }, { status: 404 });
  }

  const montantNum = parseInt(montant, 10);
  if (isNaN(montantNum) || montantNum < 1 || !contributeurNom?.trim()) {
    return NextResponse.json({ error: 'Montant ou nom invalide' }, { status: 400 });
  }

  const baseUrl = process.env.BASE_URL!;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'eur',
          unit_amount: montantNum * 100,
          product_data: {
            name: `${cadeau.emoji} ${cadeau.nom}`,
            description: `Contribution de la part de ${contributeurNom}`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      cadeauId,
      contributeurNom,
    },
    success_url: `${baseUrl}/liste-naissance/success?cadeau=${encodeURIComponent(cadeau.nom)}`,
    cancel_url: `${baseUrl}/liste-naissance`,
  });

  return NextResponse.json({ url: session.url });
}
