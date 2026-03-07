export interface Cadeau {
  id: string;
  nom: string;
  description: string;
  emoji: string;
  prixTotal: number; // en euros
}

export interface Contribution {
  id: string;
  cadeauId: string;
  contributeurNom: string;
  montant: number; // en euros
  stripeSessionId: string;
  createdAt: string;
}

export const CADEAUX: Cadeau[] = [
  {
    id: 'poussette',
    nom: 'Poussette Babyzen YOYO',
    description: 'La poussette légère et compacte, idéale pour toutes les aventures en famille.',
    emoji: '🛻',
    prixTotal: 350,
  },
  {
    id: 'bain',
    nom: 'Baignoire & table à langer',
    description: 'Un espace bain confortable et pratique pour les premiers mois.',
    emoji: '🛁',
    prixTotal: 150,
  },
  {
    id: 'tapis-eveil',
    nom: "Tapis d'éveil",
    description: 'Pour stimuler les sens de bébé dès les premiers jours.',
    emoji: '🎯',
    prixTotal: 80,
  },
  {
    id: 'transat',
    nom: 'Transat / Hamac bébé',
    description: 'Un cocon douillet pour les siestes et les moments de détente.',
    emoji: '🌙',
    prixTotal: 120,
  },
  {
    id: 'bibliotheque',
    nom: 'Bibliothèque de livres',
    description: 'Des livres illustrés pour éveiller la curiosité du bébé.',
    emoji: '📚',
    prixTotal: 60,
  },
];
