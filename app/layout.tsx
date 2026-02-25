import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Les Paris des Babes 👶',
  description: 'Pariez sur le futur bébé de Laura & Flavien !',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
