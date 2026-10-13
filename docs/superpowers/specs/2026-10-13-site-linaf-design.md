# Site LINAF — refonte complète (design)

Date : 2026-10-13 · Statut : validé par l'utilisateur

## Objectif
Remplacer la page statique https://linaf-billetterie.vercel.app/ par un site complet :
billetterie + toutes les infos du National Foot 1 (classement, équipes, joueurs, calendrier, stades).

## Choix validés
- **Tech** : Next.js 16 (App Router, TypeScript, Tailwind v4) dans `frontend/`, pages pré-générées, sans backend pour l'instant.
- **Données** : vraies données quand elles existent, exemples sinon, marqués « Exemple » à l'écran.

## Données
| Donnée | Source | Statut |
|---|---|---|
| 14 clubs 2025-26, villes, stades | Wikipédia FR « Championnat du Gabon 2025-2026 » | Réel |
| Classement final 2025-26 (maj 7 juil. 2026) | idem | Réel |
| Reprise NF1 2026-27 : 24 oct. 2026 → 22 mai 2027 | Gabon Media Time, 6 oct. 2026 | Réel |
| Clubs 2026-27 | 12 non relégués + CF Mounana (cité) + 1 promu à confirmer | Partiel |
| Calendrier 2026-27, prix, tribunes | — | Indicatif / exemple |
| Joueurs, buteurs, meilleur joueur | — | Exemple |

Tout est dans `frontend/src/data/`. Le classement d'une saison en cours est **calculé** à partir des scores
(`lib/standings.ts`) : 3 pts victoire, 1 nul ; départage points → différence → buts marqués → nom.

## Pages
Accueil · Matchs (+ fiche match) · Classement (2026-27 calculé / 2025-26 final) · Équipes (+ fiche club) ·
Joueurs & stats (+ fiche joueur) · Billetterie (choix match → tribune/quantité → paiement simulé → billet QR) ·
Mes billets (stockés dans le navigateur) · Infos (LINAF, stades, FAQ, contact).

## Design
Identité Gabon (vert #009E60, jaune #FCD116, bleu #3A75C4), fond sombre façon diffusion sportive,
titres condensés (Barlow Condensed) + Inter. Écussons générés (initiales + couleurs) en attendant les vrais logos.
Mobile d'abord. Pas de panthère/ballon dessinés.

## Hors périmètre
Vrai paiement, comptes utilisateurs, back-office, branchement NestJS.

## Vérification
Tests vitest du calcul de classement · `next build` sans erreur · captures desktop + mobile de chaque page.
