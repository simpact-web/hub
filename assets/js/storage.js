/* SIMPACT B2B — STORAGE.JS v3.0 — FIXED */
/* Données inline (pas de fetch) + localStorage */

// Données de démonstration embarquées (évite les erreurs fetch sur file://)
const DEMO_DATA_INLINE = {"clients": [{"id": "CLI101", "nom": "UBCI", "email": "ubci@simpact.tn", "password": "ubci2026", "contact": "UBCI", "tel": "", "adresse": "Tunis", "secteur": "Banque", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "UB", "actif": true}, {"id": "CLI102", "nom": "Attijari", "email": "attijari@simpact.tn", "password": "attijari2026", "contact": "Attijari", "tel": "", "adresse": "Tunis", "secteur": "Banque", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "AT", "actif": true}, {"id": "CLI103", "nom": "ATB Bank", "email": "atb@simpact.tn", "password": "atb2026", "contact": "ATB Bank", "tel": "", "adresse": "Tunis", "secteur": "Banque", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "AB", "actif": true}, {"id": "CLI104", "nom": "Amen Bank", "email": "amen@simpact.tn", "password": "amen2026", "contact": "Amen Bank", "tel": "", "adresse": "Tunis", "secteur": "Banque", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "AM", "actif": true}, {"id": "CLI105", "nom": "BIAT", "email": "biat@simpact.tn", "password": "biat2026", "contact": "BIAT", "tel": "", "adresse": "Tunis", "secteur": "Banque", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "BI", "actif": true}, {"id": "CLI106", "nom": "Zitouna Bank", "email": "zitouna@simpact.tn", "password": "zitouna2026", "contact": "Zitouna Bank", "tel": "", "adresse": "Tunis", "secteur": "Banque", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "ZB", "actif": true}, {"id": "CLI107", "nom": "BTK Bank", "email": "btk@simpact.tn", "password": "btk2026", "contact": "BTK Bank", "tel": "", "adresse": "Tunis", "secteur": "Banque", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "BK", "actif": true}, {"id": "CLI108", "nom": "QNB Bank", "email": "qnb@simpact.tn", "password": "qnb2026", "contact": "QNB Bank", "tel": "", "adresse": "Tunis", "secteur": "Banque", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "QN", "actif": true}, {"id": "CLI109", "nom": "TSB Bank", "email": "tsb@simpact.tn", "password": "tsb2026", "contact": "TSB Bank", "tel": "", "adresse": "Tunis", "secteur": "Banque", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "TS", "actif": true}, {"id": "CLI110", "nom": "BTE Bank", "email": "bte@simpact.tn", "password": "bte2026", "contact": "BTE Bank", "tel": "", "adresse": "Tunis", "secteur": "Banque", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "BT", "actif": true}, {"id": "CLI111", "nom": "BT Bank", "email": "bt@simpact.tn", "password": "bt2026", "contact": "BT Bank", "tel": "", "adresse": "Tunis", "secteur": "Banque", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "BP", "actif": true}, {"id": "CLI112", "nom": "STAR", "email": "star@simpact.tn", "password": "star2026", "contact": "STAR", "tel": "", "adresse": "Tunis", "secteur": "Assurance", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "ST", "actif": true}, {"id": "CLI113", "nom": "Astree", "email": "astree@simpact.tn", "password": "astree2026", "contact": "Astree", "tel": "", "adresse": "Tunis", "secteur": "Assurance", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "AS", "actif": true}, {"id": "CLI114", "nom": "Comar", "email": "comar@simpact.tn", "password": "comar2026", "contact": "Comar", "tel": "", "adresse": "Tunis", "secteur": "Assurance", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "CO", "actif": true}, {"id": "CLI115", "nom": "La Carte", "email": "carte@simpact.tn", "password": "carte2026", "contact": "La Carte", "tel": "", "adresse": "Tunis", "secteur": "Assurance", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "LC", "actif": true}, {"id": "CLI116", "nom": "GAT Assurance", "email": "gat@simpact.tn", "password": "gat2026", "contact": "GAT Assurance", "tel": "", "adresse": "Tunis", "secteur": "Assurance", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "GA", "actif": true}, {"id": "CLI117", "nom": "Maghrebia", "email": "maghrebia@simpact.tn", "password": "maghrebia2026", "contact": "Maghrebia", "tel": "", "adresse": "Tunis", "secteur": "Assurance", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "MG", "actif": true}, {"id": "CLI118", "nom": "Biat Assurance", "email": "biatassur@simpact.tn", "password": "biatassur2026", "contact": "Biat Assurance", "tel": "", "adresse": "Tunis", "secteur": "Assurance", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "BA", "actif": true}, {"id": "CLI119", "nom": "Lloyd Assurances", "email": "lloyd@simpact.tn", "password": "lloyd2026", "contact": "Lloyd Assurances", "tel": "", "adresse": "Tunis", "secteur": "Assurance", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "LL", "actif": true}, {"id": "CLI120", "nom": "MAE Assurance", "email": "mae@simpact.tn", "password": "mae2026", "contact": "MAE Assurance", "tel": "", "adresse": "Tunis", "secteur": "Assurance", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "MA", "actif": true}, {"id": "CLI121", "nom": "Zitouna Takaful", "email": "takaful@simpact.tn", "password": "takaful2026", "contact": "Zitouna Takaful", "tel": "", "adresse": "Tunis", "secteur": "Assurance", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "ZT", "actif": true}, {"id": "CLI122", "nom": "At-Takafulia", "email": "takafulia@simpact.tn", "password": "takafulia2026", "contact": "At-Takafulia", "tel": "", "adresse": "Tunis", "secteur": "Assurance", "segment": "standard", "ca_mensuel": 0, "nb_commandes_mois": 0, "derniere_commande": null, "role": "CLIENT", "avatar": "TK", "actif": true}], "admins": [{"id": "ADM001", "nom": "Simpact Admin", "email": "admin@simpact.tn", "password": "admin", "role": "ADMIN", "avatar": "SA"}, {"id": "ADM002", "nom": "Youssef — Super Admin", "email": "youssef@simpact.tn", "password": "ni3Shaey", "role": "SUPERADMIN", "avatar": "YS", "acces_total": true}], "commandes": [], "devis": [], "kpis": {"ca_aujourd_hui": 12450, "ca_mois_courant": 45200, "ca_mois_precedent": 41850, "variation_ca_pct": 8.0, "commandes_aujourd_hui": 47, "commandes_mois": 312, "pages_ytd": 1847000, "pages_objectif": 2000000, "panier_moyen": 264, "panier_moyen_variation": 3.0, "top_clients": ["CLI002", "CLI005", "CLI001", "CLI003", "CLI004"], "ca_mensuel_12m": [28400, 31200, 29800, 33500, 35100, 38200, 36800, 39500, 42100, 40300, 41850, 45200], "mois_labels": ["Avr'25", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc", "Jan'26", "Fév", "Mar"], "mix_produits": {"Flyer": 35, "Brochure": 22, "Carte de visite": 18, "Dépliant": 12, "En-tête": 8, "Autres": 5}, "ca_segments": {"Platinum": 38, "Gold": 32, "Silver": 20, "Standard": 10}}, "stocks": [{"ref": "PAP-COU135-A3P", "nom": "Couché 135g A3+", "type": "papier", "grammage": 135, "format": "A3+", "qty": 4200, "seuil": 1000, "statut": "ok", "unite": "feuilles"}, {"ref": "PAP-COU350-A3P", "nom": "Couché 350g A3+", "type": "papier", "grammage": 350, "format": "A3+", "qty": 380, "seuil": 500, "statut": "low", "unite": "feuilles"}, {"ref": "PAP-OFF80-A3", "nom": "Offset 80g A3", "type": "papier", "grammage": 80, "format": "A3", "qty": 8500, "seuil": 2000, "statut": "ok", "unite": "feuilles"}, {"ref": "PAP-COU250-A3P", "nom": "Couché 250g A3+", "type": "papier", "grammage": 250, "format": "A3+", "qty": 1200, "seuil": 500, "statut": "ok", "unite": "feuilles"}, {"ref": "PAP-COU115-A3P", "nom": "Couché 115g A3+", "type": "papier", "grammage": 115, "format": "A3+", "qty": 3600, "seuil": 1000, "statut": "ok", "unite": "feuilles"}, {"ref": "PAP-OFF100-A3", "nom": "Offset 100g A3", "type": "papier", "grammage": 100, "format": "A3", "qty": 120, "seuil": 500, "statut": "rupture", "unite": "feuilles"}, {"ref": "TON-V1000-K", "nom": "Toner Noir V1000", "type": "consommable", "qty_pct": 72, "statut": "ok", "dernier_remplacement": "2026-02-15"}, {"ref": "TON-V1000-C", "nom": "Toner Cyan V1000", "type": "consommable", "qty_pct": 41, "statut": "low", "dernier_remplacement": "2026-02-15"}, {"ref": "TON-V1000-M", "nom": "Toner Magenta V1000", "type": "consommable", "qty_pct": 68, "statut": "ok", "dernier_remplacement": "2026-02-15"}, {"ref": "TON-V1000-Y", "nom": "Toner Yellow V1000", "type": "consommable", "qty_pct": 55, "statut": "ok", "dernier_remplacement": "2026-02-15"}], "fichiers": []};
const PRICING_INLINE = {"formats": {"_doc": "Ratio = surface_format / surface_A4. UA4 = Unités A4 équivalentes. Utilisé pour tous les calculs de prix.", "carte_visite": {"label": "Carte de visite 8,5×5,5 cm", "dimensions_mm": [85, 55], "surface_m2": 0.004675, "ratio_a4": 0.075, "imposition_par_face_a4": 10, "nota": "10 cartes par face A4 (2 colonnes × 5 rangées)"}, "a5": {"label": "A5", "dimensions_mm": [148, 210], "surface_m2": 0.03108, "ratio_a4": 0.4983, "imposition_par_face_a3plus": 4, "pages_par_feuille_rv": 8}, "seize23": {"label": "16×23 cm (édition)", "dimensions_mm": [160, 230], "surface_m2": 0.0368, "ratio_a4": 0.59, "imposition_par_face_a3plus": 4, "pages_par_feuille_rv": 8, "nota": "Même imposition que A5. Prix naturellement +18,4% vs A5."}, "a4": {"label": "A4", "dimensions_mm": [210, 297], "surface_m2": 0.06237, "ratio_a4": 1.0, "imposition_par_face_a3plus": 1, "pages_par_feuille_rv": 2}, "a3": {"label": "A3", "dimensions_mm": [297, 420], "surface_m2": 0.12474, "ratio_a4": 2.0, "nota": "1 A3 = 2 UA4"}, "a3plus": {"label": "A3+ (33×48 cm)", "dimensions_mm": [330, 480], "surface_m2": 0.1584, "ratio_a4": 2.5397, "nota": "Format max V1000"}}, "grilles_tarifaires": {"_doc": "Tables d'interpolation indexées en UA4 (Unités A4). Moteur V3. Utiliser interpolation linéaire entre deux paliers. Prix HORS papier, HORS finitions consommables.", "flyer_recto": {"_doc": "Flyer recto couleur. UA4 = qty × ratio_format × 1. Prix TND pour le lot.", "paliers_ua4": [[24, 36], [49, 66], [99, 100], [249, 230], [498, 350], [747, 490], [996, 610], [1494, 890], [1992, 1150], [2988, 1700]], "prix_min": 28}, "flyer_rv": {"_doc": "Flyer recto/verso couleur. UA4 = qty × ratio_format × 2. Paliers ≥498 UA4 revalorisés (audit marge 2026).", "paliers_ua4": [[24, 40], [49, 76], [99, 125], [249, 280], [498, 450], [747, 640], [996, 840], [1494, 1180], [1992, 1540], [2988, 2200]], "prix_min": 28}, "depliant_rv": {"_doc": "Dépliant R/V. UA4 = qty × ratio_format × 2. Paliers ≥400 UA4 revalorisés (audit 2026).", "paliers_ua4": [[50, 29], [100, 47], [200, 84], [400, 175], [1000, 410], [2000, 760], [3000, 1050], [4000, 1350], [5000, 1620], [10000, 3050], [20000, 5800]], "prix_min": 28}, "entete_recto": {"_doc": "En-tête recto couleur. UA4 = qty × ratio_format × 1.", "paliers_ua4": [[10, 28.5], [25, 36], [50, 59], [100, 90], [200, 156], [500, 340], [1000, 519], [2000, 999], [5000, 2490], [10000, 4990]], "prix_min": 28}, "carte_visite_sans_pelliculage": {"_doc": "Tarif par QUANTITÉ (pas UA4). Imposition 10 cartes/face A4 déjà intégrée.", "paliers_quantite": [[100, 20], [200, 36], [500, 50], [1000, 79], [1500, 109], [2000, 122], [2500, 149], [5000, 249], [10000, 479]], "prix_min": 28, "nota": "Ajouter supplément papier séparément si grammage > 90g"}, "carte_visite_avec_pelliculage": {"_doc": "Tarif par quantité. Pelliculage inclus dans ce tarif (ne pas ajouter séparément).", "paliers_quantite": [[100, 28], [200, 44], [500, 59], [1000, 89], [1500, 119], [2000, 136], [2500, 171], [5000, 299], [10000, 560]], "prix_min": 28}}, "papier": {"precalcul_feuille_a4": {"_doc": "Coût papier seul (hors impression) par feuille A4 avec marge commerciale ×2.2", "offset_80g": 0.0308, "offset_100g": 0.0385, "couche_90g": 0.0456, "couche_115g": 0.0566, "couche_135g": 0.0665, "couche_170g": 0.0837, "couche_200g": 0.0985, "couche_250g": 0.1231, "couche_300g": 0.1614, "couche_350g": 0.1883, "couche_400g": 0.2152}}, "parametres_entreprise": {"_doc": "Paramètres Simpact à utiliser dans les calculs du portail.", "prix_vente_base_page_a4": 0.5, "prix_vente_page_nb_km": 0.055, "tva": 0.19, "delai_standard_heures": 48, "delai_urgent_heures": 24, "supplement_urgent_pct": 30, "supplement_tres_urgent_pct": 60, "prix_minimum_commande_tnd": 28, "supplement_conception_graphique": {"simple": 30, "moyen": 60, "complexe": 120}}, "finitions_consommables": {"_doc": "Coûts MATIÈRE des consommables de finition. La main d'œuvre est déjà incluse dans les coûts fixes ABC (poste A4 façonnage = 0.0100/page). Ces montants s'ajoutent uniquement quand la finition est sélectionnée.", "pelliculage": {"_doc": "Coût film pelliculage (mat ou brillant). Proportionnel à la surface du format.", "cout_matiere_par_unite": {"carte_visite": 0.003, "a5": 0.012, "seize23": 0.014, "a4": 0.02, "a3": 0.04}, "prix_vente_par_unite": {"_doc": "Prix de vente suggéré incluant matière + MO (déjà dans ABC) + marge", "carte_visite": 0.025, "a5": 0.06, "seize23": 0.071, "a4": 0.1, "a3": 0.18}}, "rainage": {"cout_matiere_par_unite": 0.002, "prix_vente_par_unite": 0.025, "nota": "La MO rainage est dans A4 façonnage (ABC)"}, "pliage": {"1_pli": {"cout_matiere": 0.001, "prix_vente": 0.02}, "2_plis": {"cout_matiere": 0.002, "prix_vente": 0.035}, "3_plis": {"cout_matiere": 0.002, "prix_vente": 0.045}}, "reliure": {"piquure_cheval": {"cout_matiere_par_unite": 0.015, "prix_vente_par_unite": {"min": 0.4, "max": 0.8}, "nota": "Agrafes métal. Prix vente selon nb pages."}, "spirale_plastique": {"cout_matiere_par_unite": 0.35, "prix_vente_par_unite": {"min": 1.2, "max": 2.5}, "nota": "Spirale plastique. Prix selon épaisseur doc."}, "spirale_metal_wirero": {"cout_matiere_par_unite": 0.65, "prix_vente_par_unite": {"min": 2.0, "max": 4.0}}, "dos_carre_colle": {"cout_matiere_par_unite": 0.08, "prix_vente_par_unite": {"min": 2.5, "max": 5.0}, "nota": "Colle thermique. Prix selon épaisseur dos."}, "reliure_thermique": {"cout_matiere_par_unite": 0.25, "prix_vente_par_unite": {"min": 1.5, "max": 3.5}}}, "coins_arrondis": {"cout_matiere_par_unite": 0.002, "prix_vente_par_unite": 0.03}, "decoupe_speciale": {"cout_matiere_par_unite": 0.01, "prix_vente_par_unite": {"min": 0.08, "max": 0.2}, "nota": "Découpe forme spéciale (hors coupe droite incluse)"}}};

const Storage = {
  _data: null,
  _pricing: null,
  DATA_KEY: 'simpact_data',
  DATA_VERSION: 'v9', // Changer pour forcer un reset localStorage

  async init() {
    // Toujours charger le pricing depuis les données inline
    this._pricing = PRICING_INLINE;

    // Essayer de charger depuis localStorage d'abord
    // Vérifier la version — forcer reset si version différente
    const savedVersion = localStorage.getItem(this.DATA_KEY + '_version');
    if (savedVersion !== this.DATA_VERSION) {
      localStorage.removeItem(this.DATA_KEY);
      localStorage.setItem(this.DATA_KEY + '_version', this.DATA_VERSION);
    }

    const saved = localStorage.getItem(this.DATA_KEY);
    if (saved) {
      try {
        this._data = JSON.parse(saved);
        // S'assurer que toutes les clés nécessaires existent
        if (!this._data.clients) this._data.clients = DEMO_DATA_INLINE.clients;
        if (!this._data.admins)  this._data.admins  = DEMO_DATA_INLINE.admins;
        if (!this._data.commandes) this._data.commandes = DEMO_DATA_INLINE.commandes;
        if (!this._data.devis)   this._data.devis   = DEMO_DATA_INLINE.devis;
        if (!this._data.kpis)    this._data.kpis    = DEMO_DATA_INLINE.kpis;
        if (!this._data.stocks)  this._data.stocks  = DEMO_DATA_INLINE.stocks;
        if (!this._data.fichiers)this._data.fichiers= DEMO_DATA_INLINE.fichiers;
        return this;
      } catch(e) {
        console.warn('localStorage corrompu, reset vers données de démo');
      }
    }

    // Pas de données sauvegardées — utiliser les données inline
    this._data = JSON.parse(JSON.stringify(DEMO_DATA_INLINE));
    this._save();
    return this;
  },

  _save() {
    try {
      localStorage.setItem(this.DATA_KEY, JSON.stringify(this._data));
    } catch(e) {
      console.warn('localStorage plein — données non sauvegardées');
    }
  },

  reset() {
    localStorage.removeItem(this.DATA_KEY);
    this._data = null;
    location.reload();
  },

  // ── Clients ──
  getClients() { return this._data?.clients || []; },
  getClient(id) { return (this._data?.clients || []).find(c => c.id === id); },
  findClientByEmail(email) { return (this._data?.clients || []).find(c => c.email === email); },
  addClient(client) { this._data.clients.push(client); this._save(); },
  updateClient(id, updates) {
    const idx = (this._data?.clients||[]).findIndex(c => c.id === id);
    if (idx >= 0) { this._data.clients[idx] = { ...this._data.clients[idx], ...updates }; this._save(); }
  },

  // ── Admins ──
  getAdmins() { return this._data?.admins || []; },
  findAdminByEmail(email) { return (this._data?.admins || []).find(a => a.email === email); },

  // ── Commandes ──
  getCommandes(clientId = null) {
    const cmds = this._data?.commandes || [];
    return clientId ? cmds.filter(c => c.client_id === clientId) : cmds;
  },
  getCommande(id) { return (this._data?.commandes||[]).find(c => c.id === id); },
  addCommande(commande) { this._data.commandes.unshift(commande); this._save(); return commande; },
  updateCommande(id, updates) {
    const idx = (this._data?.commandes||[]).findIndex(c => c.id === id);
    if (idx >= 0) { this._data.commandes[idx] = { ...this._data.commandes[idx], ...updates }; this._save(); }
  },

  // ── Devis ──
  getDevis(clientId = null) {
    const devis = this._data?.devis || [];
    return clientId ? devis.filter(d => d.client_id === clientId) : devis;
  },
  getDevisItem(id) { return (this._data?.devis||[]).find(d => d.id === id); },
  addDevis(devis) { this._data.devis.unshift(devis); this._save(); return devis; },
  updateDevis(id, updates) {
    const idx = (this._data?.devis||[]).findIndex(d => d.id === id);
    if (idx >= 0) { this._data.devis[idx] = { ...this._data.devis[idx], ...updates }; this._save(); }
  },

  // ── KPIs ──
  getKPIs() { return this._data?.kpis || {}; },

  // ── Stocks ──
  getStocks() { return this._data?.stocks || []; },
  updateStock(ref, updates) {
    const idx = (this._data?.stocks||[]).findIndex(s => s.ref === ref);
    if (idx >= 0) { this._data.stocks[idx] = { ...this._data.stocks[idx], ...updates }; this._save(); }
  },

  // ── Fichiers ──
  getFichiers(clientId = null) {
    const files = this._data?.fichiers || [];
    return clientId ? files.filter(f => f.client_id === clientId) : files;
  },
  addFichier(fichier) { this._data.fichiers.unshift(fichier); this._save(); },

  // ── Pricing ──
  getPricing() { return this._pricing; },

  // ── Panier (mémoire session) ──
  _panier: [],
  getPanier() { return this._panier; },
  addToPanier(item) {
    item.panier_id = 'PAN_' + Date.now();
    this._panier.push(item);
    this._notifyPanier();
  },
  removeFromPanier(panierID) {
    this._panier = this._panier.filter(i => i.panier_id !== panierID);
    this._notifyPanier();
  },
  clearPanier() { this._panier = []; this._notifyPanier(); },
  _notifyPanier() {
    document.querySelectorAll('[data-cart-badge]').forEach(b => {
      const count = this._panier.length;
      b.textContent = count;
      b.classList.toggle('hidden', count === 0);
    });
    window.dispatchEvent(new CustomEvent('panier:changed', { detail: this._panier }));
  },

  // ── Modèles ──
  getModeles(clientId) {
    try { return JSON.parse(localStorage.getItem('simpact_modeles_' + clientId) || '[]'); } catch { return []; }
  },
  saveModele(clientId, modele) {
    const key = 'simpact_modeles_' + clientId;
    const modeles = this.getModeles(clientId);
    modele.id = 'MDL_' + Date.now();
    modele.date = new Date().toISOString();
    modeles.unshift(modele);
    localStorage.setItem(key, JSON.stringify(modeles.slice(0, 20)));
    return modele;
  },
  deleteModele(clientId, id) {
    const key = 'simpact_modeles_' + clientId;
    localStorage.setItem(key, JSON.stringify(this.getModeles(clientId).filter(m => m.id !== id)));
  }
};

window.Storage = Storage;


// ─────────────────────────────────────────────────────────────────────────
// INTÉGRATION GOOGLE SHEETS — patch automatique si SheetsDB est actif
// ─────────────────────────────────────────────────────────────────────────
const Storage_Original_GetClients    = Storage.getClients.bind(Storage);
const Storage_Original_GetCommandes  = Storage.getCommandes.bind(Storage);
const Storage_Original_GetDevis      = Storage.getDevis.bind(Storage);
const Storage_Original_AddCommande   = Storage.addCommande.bind(Storage);
const Storage_Original_UpdateCommande= Storage.updateCommande.bind(Storage);
const Storage_Original_AddClient     = Storage.addClient.bind(Storage);
const Storage_Original_UpdateClient  = Storage.updateClient.bind(Storage);
const Storage_Original_AddDevis      = Storage.addDevis.bind(Storage);
const Storage_Original_UpdateDevis   = Storage.updateDevis.bind(Storage);

// Surcharge asynchrone — utilise Sheets si actif, sinon localStorage
Storage.getClientsAsync = async function() {
  if (window.SheetsDB?.isActive()) {
    const data = await SheetsDB.getTable('clients');
    if (data) { this._data.clients = data; this._save(); return data; }
  }
  return this.getClients();
};

Storage.getCommandesAsync = async function(clientId = null) {
  if (window.SheetsDB?.isActive()) {
    const data = await SheetsDB.getTable('commandes');
    if (data) {
      this._data.commandes = data;
      return clientId ? data.filter(c => c.client_id === clientId) : data;
    }
  }
  return this.getCommandes(clientId);
};

Storage.getDevisAsync = async function(clientId = null) {
  if (window.SheetsDB?.isActive()) {
    const data = await SheetsDB.getTable('devis');
    if (data) {
      this._data.devis = data;
      return clientId ? data.filter(d => d.client_id === clientId) : data;
    }
  }
  return this.getDevis(clientId);
};

// Les écritures écrivent en localStorage ET dans Sheets
const _patchWrite = (origFn, table) => async function(...args) {
  const result = origFn(...args);
  if (window.SheetsDB?.isActive()) {
    // Écriture asynchrone en arrière-plan
    const record = args[0];
    if (typeof record === 'object') {
      SheetsDB.upsert(table, record).catch(() => {});
    }
  }
  return result;
};

Storage.addCommande    = _patchWrite(Storage_Original_AddCommande,    'commandes');
Storage.addClient      = _patchWrite(Storage_Original_AddClient,      'clients');
Storage.addDevis       = _patchWrite(Storage_Original_AddDevis,       'devis');
