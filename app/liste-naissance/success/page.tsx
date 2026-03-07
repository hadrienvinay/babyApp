import Link from 'next/link';
import FloatingDecor from '../../../components/FloatingDecor';

interface Props {
  searchParams: Promise<{ cadeau?: string }>;
}

export default async function SuccessPage({ searchParams }: Props) {
  const { cadeau } = await searchParams;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgb(255, 100, 245) 0%, rgb(100, 150, 200) 45%, rgb(0, 0, 100) 100%)' }}
    >
      <FloatingDecor />
      <div
        className="relative z-10 text-center bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border-2 px-10 py-12 max-w-md mx-auto"
        style={{ borderColor: '#FBCFE8' }}
      >
        <div className="text-6xl mb-4 animate-bounce">🎁</div>
        <h2
          className="text-3xl font-extrabold mb-3"
          style={{
            background: 'linear-gradient(135deg, #EC4899, #A855F7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Merci pour ta contribution !
        </h2>
        {cadeau && (
          <p className="text-gray-500 text-base mb-2">
            Tu as contribué à : <span className="font-semibold text-pink-400">{cadeau}</span>
          </p>
        )}
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          Laura & Flavien te remercient du fond du cœur 💖
        </p>
        <Link
          href="/liste-naissance"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white text-md font-bold transition-all hover:scale-105 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #EC4899, #A855F7)', boxShadow: '0 4px 18px rgba(236,72,153,0.3)' }}
        >
          Voir la liste
        </Link>
      </div>
    </div>
  );
}
