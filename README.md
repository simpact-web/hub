# SIMPACT B2B — Portail Web-to-Print

Portail B2B professionnel pour Simpact (Tunis) — Impression numérique sur Canon imagePRESS V1000.

## 🚀 Déploiement GitHub Pages

1. **Fork** ou clonez ce dépôt sur votre compte GitHub
2. Allez dans **Settings → Pages → Source : main branch → / (root)**
3. Votre portail sera disponible sur `https://[votre-username].github.io/simpact-b2b/`
4. **Aucune installation requise** — tout fonctionne via CDN

### Lancement local

Double-cliquez sur `index.html` ou ouvrez-le dans votre navigateur. Aucun Node.js requis.

---

## 🔐 Comptes de démonstration

| Compte | Email | Mot de passe | Rôle |
|--------|-------|-------------|------|
| Clinique Hannibal | `client@demo.tn` | `demo123` | Client |
| Memac Ogilvy | `agence@demo.tn` | `demo123` | Agence |
| Admin Simpact | `admin@simpact.tn` | `admin` | Administrateur |

---

## 📁 Structure du projet

```
simpact-b2b/
├── index.html              ← Page d'accueil (splash + redirection)
├── pages/
│   ├── login.html          ← Authentification
│   ├── client/             ← Espace client
│   │   ├── dashboard.html
│   │   ├── configurateur.html  ← ⭐ Moteur de devis UA4
│   │   ├── panier.html
│   │   ├── commandes.html
│   │   ├── devis.html
│   │   ├── catalogue.html
│   │   ├── fichiers.html
│   │   └── profil.html
│   └── admin/              ← Back-office Simpact
│       ├── dashboard.html
│       ├── commandes.html  ← Vue Kanban + Tableau
│       ├── clients.html
│       ├── reporting.html
│       ├── catalogue.html
│       └── stock.html
├── assets/
│   ├── css/                ← Design system complet
│   └── js/                 ← Moteur UA4, auth, cart, PDF...
└── data/
    ├── pricing_matrix.json ← ⭐ Matrice de prix (éditable)
    └── demo_data.json      ← Données de démonstration
```

---

## 💰 Modifier les prix

Éditez le fichier `data/pricing_matrix.json` pour mettre à jour :
- Les grilles tarifaires (UA4 → prix lot)
- Les prix papier par feuille
- Les prix de finitions
- Les paramètres d'entreprise (TVA, délais, suppléments urgence)

---

## ⚡ Moteur UA4

Le moteur de calcul utilise la formule :

```
UA4 = quantité × ratio_format × nb_faces
Prix = interpolation_linéaire(table_tarifaire, UA4)
Total = impression + papier + finitions ± urgence
```

Voir `assets/js/pricing.js` pour l'implémentation complète.

---

*Simpact B2B v2.1 · Canon imagePRESS V1000 · Tunisie · 2026*
