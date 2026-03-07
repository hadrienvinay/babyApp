'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/',                label: 'Les Paris',    emoji: '' },
  { href: '/new',             label: 'Nouveau pari', emoji: '' },
  { href: '/les-babes',       label: 'Les Babes',    emoji: '' },
  { href: '/liste-naissance', label: 'Liste',        emoji: '🎁' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(236,72,153,0.4)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(1px)',
        borderBottom: '1px solid rgba(255,255,255,0.25)',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 select-none">
          <span className="text-2xl">👶</span>
          <span
            className="text-xl font-extrabold tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #fce7f3 60%, #f0e4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 1px 4px rgba(236,72,153,0.4))',
            }}
          >
            Les Babes
          </span>
        </Link>

        {/* Tabs */}
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map(({ href, label, emoji }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                style={
                  isActive
                    ? {
                        background: 'linear-gradient(135deg, #EC4899, #A855F7)',
                        color: 'white',
                        boxShadow: '0 4px 14px rgba(236,72,153,0.45)',
                      }
                    : {
                        color: 'rgba(255,255,255,0.85)',
                        background: 'rgba(255,255,255,0.12)',
                      }
                }
              >
                <span>{emoji}</span>
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </div>

      </div>
    </nav>
  );
}
