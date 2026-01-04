# TaskFlow — Gestion de Projets (Kanban simplifié)

Application web (SPA) réalisée avec **Vue.js 3 + Vite** permettant de gérer des **projets** et des **tâches** sous forme de tableau **Kanban** (À faire / En cours / Terminé). L’application est **serverless** et s’appuie sur **Firebase** pour l’authentification, la base de données (Cloud Firestore) et l’hébergement.

## Démo

- URL publique : https://projectj-manager.web.app

## Fonctionnalités

- Authentification Firebase
  - Connexion / inscription par email + mot de passe
  - Connexion avec Google
  - Protection des routes (Dashboard / Projets)
  - Déconnexion
- Projets (Dashboard)
  - Création / modification via popup
  - Suppression avec confirmation
  - Couleur distinctive par projet
  - Liste en temps réel (Firestore `onSnapshot`)
- Tâches (dans un projet)
  - Vue Kanban : `todo` / `doing` / `done`
  - Ajout via popup (titre, description, date limite)
  - Changement de statut (boutons)
  - Suppression avec confirmation
  - Temps réel (Firestore `onSnapshot`)

## Stack technique

- Frontend : Vue 3 (Composition API) + Vite
- Routing : Vue Router
- State management : Pinia
- Base de données : Cloud Firestore
- Auth : Firebase Authentication (Email/Password + Google)
- UI : Tailwind CSS
- Hosting : Firebase Hosting

## Prérequis

- Node.js 18+ (recommandé)
- Un projet Firebase (avec Firestore + Authentication activés)

## Configuration Firebase

1. Créez un projet Firebase.
2. Activez **Authentication** :
   - Email/Password
   - Google
3. Activez **Cloud Firestore**.
4. Renseignez la configuration Firebase dans :
   - `src/firebase/config.js`

> Remarque : le fichier contient des valeurs « REMPLACER_PAR… ». Il faut les remplacer par les valeurs de votre application web Firebase.

## Installation

```bash
npm install
```

## Lancer l’application en développement

```bash
npm run dev
```

Puis ouvrir l’URL affichée dans le terminal (souvent http://localhost:5173).

## Build (production)

```bash
npm run build
```

Les fichiers générés sont dans le dossier `dist/`.

## Déploiement Firebase (Hosting)

Si Firebase CLI n’est pas installé globalement, vous pouvez utiliser `npx`.

```bash
# Build
npm run build

# Deploy
npx -y firebase-tools deploy
```

## Structure (aperçu)

- `src/views/` : pages (Login, Dashboard, ProjectDetails)
- `src/stores/` : Pinia stores (`authStore`, `projectStore`)
- `src/firebase/` : init Firebase (Auth + Firestore)
- `src/components/` : composants UI (Navbar, Modals)

---

Projet pédagogique : **Project Management (Kanban simplifié)** (Vue 3 + Firebase).
