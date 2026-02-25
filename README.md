# Les Babes 👶💕

Application de paris sur le futur bébé de Laura & Flavien.

## Prérequis

- [Node.js](https://nodejs.org/) v18 ou supérieur
- npm (inclus avec Node.js)

## Installation depuis un nouveau poste

```bash
# 1. Cloner le dépôt
git clone https://github.com/hadrienvinay/babyApp.git
cd babyApp

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000)

## Commandes disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Compile l'application pour la production |
| `npm start` | Lance l'application compilée (après build) |

## Structure du projet

```
baby-app/
├── app/
│   ├── api/baby/       # API route pour soumettre un pari
│   ├── les-babes/      # Page de présentation
│   ├── new/            # Formulaire de nouveau pari
│   ├── layout.tsx      # Layout global (navbar)
│   ├── page.tsx        # Page principale — liste des paris
│   └── globals.css     # Styles globaux
├── components/
│   └── Navbar.tsx      # Barre de navigation
└── data/
    └── paris.json      # Stockage des paris (JSON local)
```

## Notes

- Les paris sont stockés dans `data/paris.json` — ce fichier est versionné avec le projet.
- Aucune base de données requise, tout fonctionne en local avec le filesystem Next.js.
