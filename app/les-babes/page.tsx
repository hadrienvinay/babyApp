import Image from 'next/image';
import FloatingDecor from '../../components/FloatingDecor';

export default function LesBasesPage() {
  return (
    <div
      className="min-h-screen relative overflow-hidden py-10 px-4 pb-16"
      style={{ background: 'linear-gradient(135deg, rgb(255, 100, 245) 0%, rgb(100, 150, 200) 45%, rgb(0, 0, 100) 100%)' }}
    >
      <FloatingDecor />

      <div className="relative z-10 max-w-5xl mx-auto space-y-6">

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
              Tout le monde est invité à parier sur le sexe du bébé, sa date de naissances, son prénom ou autres données pour les plus inspirés.
            </p>
          </div>
        </div>

        {/* Cards Laura & Flavien */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className="rounded-3xl border-2 overflow-hidden text-center"
            style={{ background: '#FDE8F0', borderColor: '#FBCFE8' }}
          >
            <div className="relative w-full h-100">
              <Image src="/laura.jpg" alt="Laura" fill className="object-cover object-top" />
              <div className="absolute inset-0"/>
            </div>
            <div className="p-5">
              <h2 className="text-xl font-extrabold mb-1" style={{ color: '#EC4899' }}>Laura</h2>
              <p className="text-gray-500 text-sm leading-relaxed">La future maman, notre babe nationnale, toujours radieuse et souriante. Bon courage pour cette dernière ligne droite !</p>
            </div>
          </div>

          <div
            className="rounded-3xl border-2 overflow-hidden text-center"
            style={{ background: '#F0E4FF', borderColor: '#E9D5FF' }}
          >
            <div className="relative w-full h-100">
              <Image src="/flavpr.jpg" alt="Flavien" fill className="object-cover object-top" />
              <div className="absolute inset-0" />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-extrabold mb-1" style={{ color: '#A855F7' }}>Flavien</h2>
              <p className="text-gray-500 text-sm leading-relaxed">Le futur papa, qui s'est bien entrainé avec Pesto Rosse, est prêt à relever le plus beau défi de sa vie.</p>
            </div>
          </div>
        </div>

        {/* Galerie couple */}
        <div
          className="rounded-3xl border-2 overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(16px)', borderColor: '#FBCFE8' }}
        >
          <div className="px-6 py-4 border-b text-center" style={{ borderColor: '#FBCFE8', background: 'linear-gradient(135deg, #FDE8F0, #F0E4FF)' }}>
            <h2 className="font-extrabold text-pink-500 uppercase tracking-widest text-sm">Petit best-of des babes</h2>
          </div>
          <div className="grid grid-cols-3 gap-1 p-1">
            {['/babes.jpg', '/babes2.jpg', '/babes3.jpg'].map((src, i) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden">
                <Image src={src} alt={`Photo ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Baby reveal card */}
        <div
          className="rounded-3xl border-2 overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(16px)', borderColor: '#FBCFE8' }}
        >
          <div className="relative w-full h-48">
            <Image src="/echographie.jpg" alt="Échographie" fill className="object-cover" />
            <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: 'rgba(253,232,240,0.75)', backdropFilter: 'blur(2px)' }}>
              <div className="text-4xl mb-2">🍼</div>
              <h2
                className="text-xl font-extrabold"
                style={{
                  background: 'linear-gradient(135deg, #EC4899, #A855F7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Le verdict arrive bientôt…
              </h2>
            </div>
          </div>
          <div className="p-6 text-center">
            <p className="text-gray-400 text-sm leading-relaxed">
              Fille ou garçon ? Quel prénom ? Quelle date ?<br />
              Parie maintenant et on verra si tu avais le nez creux ! 🍀
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
