# LINAF — site web (Next.js)

Site du National Foot 1 : billetterie (démo), calendrier, classement, clubs, joueurs, infos.

## Lancer en local

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # tests du calcul de classement
npm run build    # vérification avant mise en ligne
```

## Mettre à jour les données

Tout se trouve dans `src/data/` :

| Fichier | Contenu | Statut |
|---|---|---|
| `clubs.ts` | Clubs, stades, liste des clubs 2026-27 (`NF1_2026_27`) | Réel (+ 1 promu à confirmer) |
| `standings-2025-26.ts` | Classement final 2025-26 | Réel (Wikipédia, 7 juil. 2026) |
| `fixtures-2026-27.ts` | Calendrier 2026-27 et **résultats** | Calendrier indicatif |
| `players.ts` | Joueurs, stats, distinctions, tribunes et tarifs | **Exemples** |

### Saisir un score
Dans `fixtures-2026-27.ts`, ajoutez une ligne dans `RESULTS` :

```ts
const RESULTS = {
  "2026-27-j1-1": [2, 1], // score domicile, score extérieur
};
```

Le classement, la forme et les pages se mettent à jour automatiquement au prochain déploiement.
Les identifiants des matchs s'affichent dans l'URL des fiches match (`/matchs/2026-27-j1-1`).

### Remplacer le promu « à confirmer »
Dans `clubs.ts`, remplacez l'entrée `promu-n2` par le vrai club (même `slug` partout, ou changez-le
dans `NF1_2026_27`) et retirez `unconfirmed: true`.

### Calendrier officiel
Quand la LINAFP publie les affiches, remplacez la génération automatique de `FIXTURES_2026_27`
par la liste des matchs officiels et retirez `provisional: true`.

## Déploiement (Vercel)
Dans les réglages du projet Vercel : **Root Directory = `frontend`**. Framework détecté : Next.js.
