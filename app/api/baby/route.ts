import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

const DATA_FILE = path.join(process.cwd(), 'data', 'paris.json');

function readParis(): Pari[] {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeParis(paris: Pari[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(paris, null, 2), 'utf-8');
}

export async function GET() {
  const paris = readParis();
  return NextResponse.json(paris);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const date = formData.get('date') as string;
  const sexe = formData.get('sexe') as string;

  if (!date || !sexe) {
    return NextResponse.json({ error: 'Date et sexe requis' }, { status: 400 });
  }

  const paris = readParis();
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
  writeParis(paris);

  return NextResponse.json({ message: 'Pari créé avec succès', pari: newPari });
}
