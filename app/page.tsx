import Link from 'next/link';
import Image from 'next/image';
import { Redis } from '@upstash/redis';
import FloatingDecor from '../components/FloatingDecor';

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


/* ── Helpers ────────────────────────────────────────────────── */
function mode<T>(arr: T[]): T | null {
  if (!arr.length) return null;
  const freq = new Map<T, number>();
  arr.forEach(v => freq.set(v, (freq.get(v) ?? 0) + 1));
  return [...freq.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

function avg(arr: number[]): number | null {
  const valid = arr.filter(n => !isNaN(n) && n > 0);
  return valid.length ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length) : null;
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

/* ── Page ───────────────────────────────────────────────────── */
export default async function ParisPage() {
  const paris: Pari[] = await redis.get<Pari[]>('paris') ?? [];

  const total = paris.length;
  const nbFilles = paris.filter(p => p.sexe === 'fille').length;
  const nbGarcons = total - nbFilles;
  const pctFille = total > 0 ? Math.round((nbFilles / total) * 100) : 0;
  const pctGarcon = 100 - pctFille;

  const avgPoids = avg(paris.map(p => parseFloat(p.poids ?? '')));
  const avgTaille = avg(paris.map(p => parseFloat(p.taille ?? '')));

  const topDate = mode(paris.map(p => new Date(p.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })));
  const topPrenom = mode(paris.filter(p => p.prenom?.trim()).map(p => p.prenom!.trim()));
  const topYeux = mode(paris.filter(p => p.yeux?.trim()).map(p => p.yeux!));
  const topCheveux = mode(paris.filter(p => p.cheveux?.trim()).map(p => p.cheveux!));

  const EYE_EMOJI: Record<string, string> = { bleu: '💙', marron: '🤎', vert: '💚', gris: '⚪' };
  const HAIR_EMOJI: Record<string, string> = { blond: '💛', brun: '🤎', roux: '🧡', noir: '⚫', chauve: '😄' };

  return (
    <div
      className="min-h-screen relative overflow-hidden py-10 px-4"
      style={{ background: 'linear-gradient(135deg, rgb(255, 100, 245) 0%, rgb(100, 150, 200) 45%, rgb(0, 0, 100) 100%)' }}
    >
      <FloatingDecor />

      <div className="relative z-10 max-w-5xl mx-auto space-y-6">

        {/* ── Header card ─────────────────────────────────── */}
        <div className="rounded-3xl shadow-2xl overflow-hidden border-2" style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(16px)', borderColor: '#FBCFE8' }}>
          <div className="flex items-center gap-4 px-8 pt-8 pb-7" style={{ background: 'linear-gradient(135deg, #FDE8F0, #F0E4FF)' }}>
            {/* Image à gauche */}
            <div className="hidden sm:block relative w-36 h-44 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg">
              <Image src="/flavien.JPG" alt="Flavien" fill className="object-cover object-top" />
            </div>
            {/* Texte au centre */}
            <div className="flex-1 text-center">
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #EC4899, #A855F7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                Le Pari des Babes !
              </h1>
              <p className="text-gray-500 text-md mb-5">
                Laura & Flavien attendent l&apos;heureux événement
                <br />
                Qui sera le prochain frère ou la prochaine soeur du PR adoré ?
                <br />
                Grosse récompense à la clé pour le meilleur pari
                <br />
                {' '}
                <span className="font-semibold text-pink-400">{total} pari{total > 1 ? 's' : ''} enregistré{total > 1 ? 's' : ''}</span>
              </p>
              <Link
                href="/new" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white text-md font-bold transition-all hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #EC4899, #A855F7)', boxShadow: '0 4px 18px rgba(236,72,153,0.3)' }}>
                Faire mon pari
              </Link>
            </div>
            {/* Image à droite */}
            <div className="hidden sm:block relative w-36 h-44 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg">
              <Image src="/laulau.jpeg" alt="Laura" fill className="object-cover object-top" />
            </div>
          </div>
        </div>

        {/* ── Photos ──────────────────────────────────────── */}
        <div className="rounded-3xl border-2 overflow-hidden" style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(16px)', borderColor: '#FBCFE8' }}>
          <div className="flex gap-1 p-1 h-64 sm:h-72">
            <div className="relative flex-1 rounded-2xl overflow-hidden">
              <Image src="/babes.jpg" alt="Laura & Flavien" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative flex-1 rounded-2xl overflow-hidden">
              <Image src="/echographie.jpg" alt="Laura & Flavien" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative flex-1 rounded-2xl overflow-hidden">
              <Image src="/pestorosso.jpg" alt="Laura & Flavien" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="hidden sm:flex flex-col gap-1 w-1/3">
              <div className="relative flex-1 rounded-2xl overflow-hidden">
                <Image src="/babes3.jpg" alt="Laura & Flavien" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="relative flex-1 rounded-2xl overflow-hidden">
                <Image src="/flav_lunettes.jpeg" alt="Laura & Flavien" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats ───────────────────────────────────────── */}
        {total > 0 && (
          <div className="space-y-4">
            <h2 className="text-md font-bold tracking-widest uppercase text-pink-400 px-1">📊 Statistiques</h2>

            {/* Gender bar */}
            <div className="rounded-3xl border-2 p-5" style={{ background: 'rgba(255,255,255,0.88)', borderColor: '#FBCFE8', backdropFilter: 'blur(12px)' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👧</span>
                  <div>
                    <div className="text-sm font-bold text-pink-500 uppercase tracking-wider">Fille</div>
                    <div className="text-xl font-extrabold text-pink-600">{pctFille}%</div>
                    <div className="text-sm text-gray-400">{nbFilles} pari{nbFilles > 1 ? 's' : ''}</div>
                  </div>
                </div>
                <div className="flex-1 mx-6">
                  <div className="h-5 rounded-full overflow-hidden bg-blue-100 flex">
                    {pctFille > 0 && (
                      <div
                        className="h-full rounded-l-full transition-all duration-700"
                        style={{ width: `${pctFille}%`, background: 'linear-gradient(to right, #F9A8D4, #EC4899)' }}
                      />
                    )}
                    {pctGarcon > 0 && (
                      <div
                        className="h-full rounded-r-full transition-all duration-700"
                        style={{ width: `${pctGarcon}%`, background: 'linear-gradient(to right, #93C5FD, #3B82F6)' }}
                      />
                    )}
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-pink-400 font-mono">{pctFille}%</span>
                    <span className="text-[10px] text-blue-400 font-mono">{pctGarcon}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-right">
                  <div>
                    <div className="text-sm font-bold text-blue-500 uppercase tracking-wider">Garçon</div>
                    <div className="text-xl font-extrabold text-blue-600">{pctGarcon}%</div>
                    <div className="text-sm text-gray-400">{nbGarcons} pari{nbGarcons > 1 ? 's' : ''}</div>
                  </div>
                  <span className="text-2xl">👦</span>
                </div>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: '⚖️', label: 'Poids moyen prédit', value: avgPoids ? `${avgPoids} g` : '—', color: '#EC4899' },
                { icon: '📏', label: 'Taille moyenne prédite', value: avgTaille ? `${avgTaille} cm` : '—', color: '#34D399' },
                { icon: '✨', label: 'Prénom favori', value: topPrenom ?? '—', color: '#F59E0B' },
                { icon: '📅', label: 'Date la plus pariée', value: topDate ?? '—', color: '#A855F7'},
              ].map(s => (
                <div
                  key={s.label}
                  className="rounded-2xl border-2 p-4 text-center"
                  style={{ background: `${s.color}30`, borderColor: `${s.color}35` }}
                >
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-sm text-gray-900 leading-tight mb-1">{s.label}</div>
                  <div className="text-md font-extrabold" style={{ color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Eye + hair */}
            {(topYeux || topCheveux) && (
              <div className="grid grid-cols-2 gap-3">
                {topYeux && (
                  <div
                    className="rounded-2xl border-2 p-4 flex items-center gap-3"
                    style={{ background: 'rgba(255,255,255,0.8)', borderColor: '#FBCFE8' }}
                  >
                    <span className="text-2xl">{EYE_EMOJI[topYeux] ?? '👁️'}</span>
                    <div>
                      <div className="text-sm text-gray-400 uppercase tracking-wider">Yeux les plus pariés</div>
                      <div className="text-md font-bold text-pink-500 capitalize">{topYeux}</div>
                    </div>
                  </div>
                )}
                {topCheveux && (
                  <div
                    className="rounded-2xl border-2 p-4 flex items-center gap-3"
                    style={{ background: 'rgba(255,255,255,0.8)', borderColor: '#FBCFE8' }}
                  >
                    <span className="text-2xl">{HAIR_EMOJI[topCheveux] ?? '💇'}</span>
                    <div>
                      <div className="text-sm text-gray-400 uppercase tracking-wider">Cheveux les plus pariés</div>
                      <div className="text-md font-bold text-purple-500 capitalize">{topCheveux}</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Bets list ───────────────────────────────────── */}
        {total === 0 ? (
          <div
            className="rounded-3xl border-2 p-12 text-center"
            style={{ background: 'rgba(255,255,255,0.8)', borderColor: '#FBCFE8' }}
          >
            <div className="text-5xl mb-4">🍼</div>
            <p className="text-gray-400 text-md">Aucun pari pour l&apos;instant — sois le premier !</p>
            <Link
              href="/new"
              className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-2xl text-white text-md font-bold"
              style={{ background: 'linear-gradient(135deg, #EC4899, #A855F7)' }}
            >
              Faire mon pari
            </Link>
          </div>
        ) : (
          <div
            className="rounded-3xl border-2 overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.88)', borderColor: '#FBCFE8', backdropFilter: 'blur(12px)' }}
          >
            <div className="px-6 py-4 border-b" style={{ borderColor: '#FBCFE8', background: 'linear-gradient(135deg, #FDE8F0, #F0E4FF)' }}>
              <h2 className="text-md font-extrabold text-pink-500 uppercase tracking-widest">
                🏆 Tous les paris ({total})
              </h2>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-md">
                <thead>
                  <tr style={{ background: 'rgba(252,231,243,0.4)' }}>
                    {['Parieur', 'Sexe', 'Prénom', 'Date', 'Poids', 'Taille', 'Yeux', 'Cheveux'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider text-pink-400">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: '#FCE7F3' }}>
                  {paris.map((pari) => {
                    const isFille = pari.sexe === 'fille';
                    return (
                      <tr
                        key={pari.id}
                        className="transition-colors hover:bg-pink-50/50"
                        style={{ background: isFille ? 'rgba(252,231,243,0.3)' : 'rgba(219,234,254,0.3)' }}
                      >
                        <td className="px-4 py-3 font-bold text-gray-700">{pari.parieurName}</td>
                        <td className="px-4 py-3">
                          <span
                            className="px-2.5 py-1 rounded-full text-sm font-bold"
                            style={
                              isFille
                                ? { background: '#FCE7F3', color: '#BE185D' }
                                : { background: '#DBEAFE', color: '#1D4ED8' }
                            }
                          >
                            {isFille ? '👧 Fille' : '👦 Garçon'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 italic">{pari.prenom || '—'}</td>
                        <td className="px-4 py-3 text-gray-600 font-mono text-sm">
                          {new Date(pari.date).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{pari.poids ? `${pari.poids} g` : '—'}</td>
                        <td className="px-4 py-3 text-gray-600">{pari.taille ? `${pari.taille} cm` : '—'}</td>
                        <td className="px-4 py-3 text-gray-600 capitalize">
                          {pari.yeux ? `${EYE_EMOJI[pari.yeux] ?? '👁️'} ${pari.yeux}` : '—'}
                        </td>
                        <td className="px-4 py-3 text-gray-600 capitalize">
                          {pari.cheveux ? `${HAIR_EMOJI[pari.cheveux] ?? '💇'} ${pari.cheveux}` : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y" style={{ borderColor: '#FCE7F3' }}>
              {paris.map((pari) => {
                const isFille = pari.sexe === 'fille';
                return (
                  <div
                    key={pari.id}
                    className="p-4"
                    style={{ background: isFille ? 'rgba(252,231,243,0.3)' : 'rgba(219,234,254,0.3)' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-gray-700 text-md">{pari.parieurName}</span>
                      <span
                        className="px-2.5 py-1 rounded-full text-sm font-bold"
                        style={
                          isFille
                            ? { background: '#FCE7F3', color: '#BE185D' }
                            : { background: '#DBEAFE', color: '#1D4ED8' }
                        }
                      >
                        {isFille ? '👧 Fille' : '👦 Garçon'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-500">
                      {pari.prenom && <span>✨ Prénom : <span className="font-semibold text-gray-700 italic">{pari.prenom}</span></span>}
                      <span>📅 {new Date(pari.date).toLocaleDateString('fr-FR')}</span>
                      {pari.poids && <span>⚖️ {pari.poids} g</span>}
                      {pari.taille && <span>📏 {pari.taille} cm</span>}
                      {pari.yeux && <span>{EYE_EMOJI[pari.yeux] ?? '👁️'} Yeux {pari.yeux}</span>}
                      {pari.cheveux && <span>{HAIR_EMOJI[pari.cheveux] ?? '💇'} {pari.cheveux}</span>}
                    </div>
                    {pari.autres && (
                      <p className="mt-2 text-sm text-gray-400 italic border-t pt-2" style={{ borderColor: '#FCE7F3' }}>
                        🎯 {pari.autres}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
