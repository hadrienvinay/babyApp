import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Les Paris des Babes ',
  description: 'Pariez sur le futur bébé de Laura & Flavien !',
  openGraph: {
    title: 'Les Paris des Babes',
    description: 'Pariez sur le futur bébé de Laura & Flavien !',
    images: [
      {
        url: '/home.png',
        width: 1200,
        height: 630,
        alt: 'Les Paris des Babes',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body
        style={{
          background: 'linear-gradient(135deg, rgb(255, 100, 245) 0%, rgb(100, 150, 200) 45%, rgb(0, 0, 100) 100%)',
          minHeight: '100vh',
        }}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
