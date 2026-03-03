import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

interface Pari {
  id: number;
  parieurName: string;
  sexe: string;
  date: string;
  prenom: string;
  poids: string;
  taille: string;
  yeux: string;
  cheveux: string;
  autres?: string;
  createdAt: string;
}

const redis = Redis.fromEnv();

export async function GET() {
  const paris = await redis.get<Pari[]>('paris') ?? [];
  return NextResponse.json(paris);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const date = formData.get('date') as string;
  const sexe = formData.get('sexe') as string;
  const prenom = formData.get('prenom') as string;


  if (!date || !sexe || !prenom) {
    return NextResponse.json({ error: 'Date, sexe et prénom requis' }, { status: 400 });
  }

  const paris = await redis.get<Pari[]>('paris') ?? [];
  const newPari: Pari = {
    id: paris.length > 0 ? Math.max(...paris.map(p => p.id)) + 1 : 1,
    parieurName: (formData.get('parieurName') as string) || '',
    sexe,
    date,
    prenom: (formData.get('prenom') as string) || '',
    poids: (formData.get('poids') as string) || '',
    taille: (formData.get('taille') as string) || '',
    yeux: (formData.get('yeux') as string) || '',
    cheveux: (formData.get('cheveux') as string) || '',
    autres: (formData.get('autres') as string) || undefined,
    createdAt: new Date().toISOString(),
  };

  paris.unshift(newPari);
  await redis.set('paris', paris);

  return NextResponse.json({ message: 'Pari créé avec succès', pari: newPari });
}
