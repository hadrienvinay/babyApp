import { Redis } from '@upstash/redis';
import { CADEAUX, Contribution } from '@/lib/cadeaux';
import FloatingDecor from '@/components/FloatingDecor';
import GiftCard from './GiftCard';

const redis = Redis.fromEnv();

export default async function ListeNaissancePage() {
  const contributions = await Promise.all(
    CADEAUX.map(c =>
      redis.get<Contribution[]>(`contributions:${c.id}`).then(r => r ?? [])
    )
  );

  const data = CADEAUX.map((cadeau, i) => ({
    cadeau,
    contributions: contributions[i],
    totalCollecte: contributions[i].reduce((sum, c) => sum + c.montant, 0),
  }));

  const totalGlobal = data.reduce((sum, d) => sum + d.totalCollecte, 0);
  const objectifGlobal = CADEAUX.reduce((sum, c) => sum + c.prixTotal, 0);

  return (
    <div
      className="min-h-screen relative overflow-hidden py-10 px-4 pb-16"
      style={{ background: 'linear-gradient(135deg, rgb(255, 100, 245) 0%, rgb(100, 150, 200) 45%, rgb(0, 0, 100) 100%)' }}
    >
      <FloatingDecor />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">

        {/* En-tête */}
        <div
          className="rounded-3xl shadow-2xl overflow-hidden border-2"
          style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(16px)', borderColor: '#FBCFE8' }}
        >
          <div
            className="px-8 pt-8 pb-7 text-center"
            style={{ background: 'linear-gradient(135deg, #FDE8F0, #F0E4FF)' }}
          >
            <h1
              className="text-3xl sm:text-4xl font-extrabold mb-2"
              style={{
                background: 'linear-gradient(135deg, #EC4899, #A855F7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Liste de Naissance
            </h1>
            <p className="text-gray-500 text-md mb-4">
              Participez au bonheur de Laura & Flavien 🎀
            </p>

            {/* Progression globale */}
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1 px-2">
                <span className="font-bold text-pink-500">{totalGlobal} € collectés</span>
                <span className="text-gray-400">Objectif : {objectifGlobal} €</span>
              </div>
              <div className="h-3 rounded-full bg-pink-100 overflow-hidden mx-2">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(100, Math.round((totalGlobal / objectifGlobal) * 100))}%`,
                    background: 'linear-gradient(to right, #EC4899, #A855F7)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cartes cadeaux */}
        {data.map(({ cadeau, contributions, totalCollecte }) => (
          <GiftCard
            key={cadeau.id}
            cadeau={cadeau}
            contributions={contributions}
            totalCollecte={totalCollecte}
          />
        ))}
      </div>
    </div>
  );
}
