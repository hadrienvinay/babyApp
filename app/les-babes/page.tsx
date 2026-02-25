import FloatingDecor from '../../components/FloatingDecor';

export default function LesBasesPage() {
  return (
    <div
      className="min-h-screen relative overflow-hidden py-10 px-4 pb-16"
      style={{ background: 'linear-gradient(135deg, rgb(255, 100, 245) 0%, rgb(100, 150, 200) 45%, rgb(0, 0, 100) 100%)' }}
    >
      <FloatingDecor />

      <div className="relative z-10 max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div
          className="rounded-3xl shadow-2xl overflow-hidden border-2"
          style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(16px)', borderColor: '#FBCFE8' }}
        >
          <div
            className="px-8 pt-10 pb-8 text-center"
            style={{ background: 'linear-gradient(135deg, #FDE8F0, #F0E4FF)' }}
          >
            <h1
              className="text-3xl sm:text-4xl font-extrabold mb-3"
              style={{
                background: 'linear-gradient(135deg, #EC4899, #A855F7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Les Babes
            </h1>
            <p className="text-gray-500 text-base leading-relaxed">
              Laura & Flavien attendent leur petit bout de chou 🌸<br />
              Tout le monde est invité à parier sur qui il sera !
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              emoji: '👩',
              name: 'Laura',
              description: 'La future maman, rayonnante et impatiente de rencontrer son bébé.',
              color: '#EC4899',
              bg: '#FDE8F0',
              border: '#FBCFE8',
            },
            {
              emoji: '👨',
              name: 'Flavien',
              description: 'Le futur papa, prêt à relever le plus beau défi de sa vie.',
              color: '#A855F7',
              bg: '#F0E4FF',
              border: '#E9D5FF',
            },
          ].map(card => (
            <div
              key={card.name}
              className="rounded-3xl border-2 p-6 text-center"
              style={{ background: card.bg, borderColor: card.border, backdropFilter: 'blur(12px)' }}
            >
              <div className="text-5xl mb-3">{card.emoji}</div>
              <h2 className="text-xl font-extrabold mb-2" style={{ color: card.color }}>{card.name}</h2>
              <p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        {/* Baby reveal card */}
        <div
          className="rounded-3xl border-2 p-8 text-center"
          style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(16px)', borderColor: '#FBCFE8' }}
        >
          <div className="text-4xl mb-4">🍼</div>
          <h2
            className="text-xl font-extrabold mb-2"
            style={{
              background: 'linear-gradient(135deg, #EC4899, #A855F7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Le verdict arrive bientôt…
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Fille ou garçon ? Quel prénom ? Quelle date ?<br />
            Parie maintenant et on verra si tu avais le nez creux ! 🍀
          </p>
        </div>

      </div>
    </div>
  );
}
