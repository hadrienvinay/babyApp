'use client';

import { useState } from 'react';
import { Cadeau, Contribution } from '@/lib/cadeaux';

const PAYPAL_ME = 'https://paypal.me/VOTRE_PSEUDO';
const REVOLUT_ME = 'https://revolut.me/VOTRE_TAG';

const inputClass =
  'w-full px-4 py-3 rounded-2xl border-2 text-gray-700 placeholder-gray-400 focus:outline-none transition-all duration-200 bg-white/70';

interface Props {
  cadeau: Cadeau;
  contributions: Contribution[];
  totalCollecte: number;
}

export default function GiftCard({ cadeau, contributions, totalCollecte }: Props) {
  const [nom, setNom] = useState('');
  const [montant, setMontant] = useState('');
  const [loading, setLoading] = useState(false);

  const pct = Math.min(100, Math.round((totalCollecte / cadeau.prixTotal) * 100));
  const isComplete = pct >= 100;

  const handleContribuer = async () => {
    const montantNum = parseInt(montant, 10);
    if (!nom.trim() || isNaN(montantNum) || montantNum < 1) return;
    setLoading(true);
    try {
      const res = await fetch('/api/cadeaux/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cadeauId: cadeau.id, montant: montantNum, contributeurNom: nom }),
      });
      const { url, error } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        alert(error ?? 'Erreur lors de la redirection vers le paiement');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="rounded-3xl border-2 overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)', borderColor: '#FBCFE8' }}
    >
      {/* En-tête du cadeau */}
      <div
        className="px-6 py-4 border-b"
        style={{ borderColor: '#FBCFE8', background: 'linear-gradient(135deg, #FDE8F0, #F0E4FF)' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{cadeau.emoji}</span>
          <div>
            <h2 className="font-extrabold text-gray-700 text-lg">{cadeau.nom}</h2>
            <p className="text-sm text-gray-400">{cadeau.description}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Barre de progression */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-bold text-pink-500">{totalCollecte} € collectés</span>
            <span className="text-gray-400">Objectif : {cadeau.prixTotal} €</span>
          </div>
          <div className="h-4 rounded-full bg-pink-100 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${pct}%`,
                background: 'linear-gradient(to right, #EC4899, #A855F7)',
              }}
            />
          </div>
          <div className="text-right text-xs text-gray-400 mt-0.5">{pct}%</div>
        </div>

        {/* Liste des contributeurs */}
        {contributions.length > 0 && (
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Contributeurs
            </p>
            <div className="flex flex-wrap gap-2">
              {contributions.map(c => (
                <span
                  key={c.id}
                  className="px-3 py-1 rounded-full text-sm font-semibold"
                  style={{ background: '#FDE8F0', color: '#BE185D' }}
                >
                  {c.contributeurNom} — {c.montant} €
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Formulaire de contribution */}
        {!isComplete ? (
          <div className="space-y-3 pt-2 border-t" style={{ borderColor: '#FBCFE8' }}>
            <input
              type="text"
              placeholder="Ton prénom / pseudo"
              value={nom}
              onChange={e => setNom(e.target.value)}
              className={inputClass}
              style={{ borderColor: '#F9A8D4' }}
              onFocus={e => (e.currentTarget.style.borderColor = '#C084FC')}
              onBlur={e => (e.currentTarget.style.borderColor = '#F9A8D4')}
            />
            <input
              type="number"
              placeholder="Montant (€)"
              min={1}
              value={montant}
              onChange={e => setMontant(e.target.value)}
              className={inputClass}
              style={{ borderColor: '#F9A8D4' }}
              onFocus={e => (e.currentTarget.style.borderColor = '#C084FC')}
              onBlur={e => (e.currentTarget.style.borderColor = '#F9A8D4')}
            />
            <button
              onClick={handleContribuer}
              disabled={loading}
              className="w-full py-3 rounded-2xl text-white font-extrabold transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #EC4899, #A855F7)',
                boxShadow: '0 4px 18px rgba(236,72,153,0.3)',
              }}
            >
              {loading ? 'Redirection vers le paiement…' : 'Contribuer par carte 💳'}
            </button>

            <div className="flex items-center gap-2 py-1">
              <div className="flex-1 h-px bg-pink-100" />
              <span className="text-xs text-gray-400">ou</span>
              <div className="flex-1 h-px bg-pink-100" />
            </div>

            <div className="flex gap-3">
              <a
                href={montant ? `${PAYPAL_ME}/${montant}EUR` : PAYPAL_ME}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-2xl font-extrabold text-center text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: '#FFC43A', color: '#003087' }}
              >
                PayPal
              </a>
              <a
                href={REVOLUT_ME}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-2xl font-extrabold text-center text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: '#191C1F', color: '#FFFFFF' }}
              >
                Revolut
              </a>
            </div>
            <p className="text-xs text-center text-gray-400">
              Pense à indiquer ton prénom dans le message de paiement
            </p>
          </div>
        ) : (
          <div
            className="text-center py-3 rounded-2xl font-bold text-green-700"
            style={{ background: '#D1FAE5', border: '1px solid #6EE7B7' }}
          >
            Cadeau entièrement financé ! Merci à tous 🎉
          </div>
        )}
      </div>
    </div>
  );
}
