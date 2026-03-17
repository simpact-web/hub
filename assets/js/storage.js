/* SIMPACT B2B — STORAGE.JS v3.0 — FIXED */
/* Données inline (pas de fetch) + localStorage */

// Données de démonstration embarquées (évite les erreurs fetch sur file://)
const DEMO_DATA_INLINE = {"clients": [{"id": "CLI001", "nom": "Clinique Hannibal", "contact": "Dr. Rami Gharbi", "email": "client@demo.tn", "tel": "+216 71 895 000", "adresse": "Rue du Lac Léman, Les Berges du Lac, Tunis", "secteur": "Santé", "segment": "gold", "ca_mensuel": 2800, "nb_commandes_mois": 12, "derniere_commande": "2026-03-14", "password": "demo123", "role": "CLIENT", "avatar": "CH", "actif": true}, {"id": "CLI002", "nom": "Memac Ogilvy Tunisie", "contact": "Mehdi Ben Salah", "email": "agence@demo.tn", "tel": "+216 71 965 000", "adresse": "Rue du Lac Windermere, Les Berges du Lac 2, Tunis", "secteur": "Agences", "segment": "platinum", "ca_mensuel": 6200, "nb_commandes_mois": 28, "derniere_commande": "2026-03-15", "password": "demo123", "role": "AGENCE", "avatar": "MO", "actif": true}, {"id": "CLI003", "nom": "The Residence Tunis", "contact": "Sofien Mzoughi", "email": "residence@demo.tn", "tel": "+216 71 910 101", "adresse": "Les Côtes de Carthage, Tunis", "secteur": "Hôtellerie", "segment": "silver", "ca_mensuel": 900, "nb_commandes_mois": 5, "derniere_commande": "2026-03-10", "password": "demo123", "role": "CLIENT", "avatar": "RT", "actif": true}, {"id": "CLI004", "nom": "ESPRIT School", "contact": "Sonia Belhadj", "email": "esprit@demo.tn", "tel": "+216 71 862 600", "adresse": "2 Rue Abou Rayhane Albirouni, Ariana", "secteur": "Éducation", "segment": "silver", "ca_mensuel": 780, "nb_commandes_mois": 6, "derniere_commande": "2026-03-08", "password": "demo123", "role": "CLIENT", "avatar": "ES", "actif": true}, {"id": "CLI005", "nom": "Délice Holding", "contact": "Karim Ghariani", "email": "delice@demo.tn", "tel": "+216 71 788 000", "adresse": "Boulevard du 7 Novembre, Tunis", "secteur": "Industrie", "segment": "gold", "ca_mensuel": 3100, "nb_commandes_mois": 15, "derniere_commande": "2026-03-15", "password": "demo123", "role": "CLIENT", "avatar": "DH", "actif": true}, {"id": "CLI006", "nom": "Studio Artline", "contact": "Yassine Cherif", "email": "artline@demo.tn", "tel": "+216 28 456 789", "adresse": "Rue Ibn Khaldoun, Tunis Médina", "secteur": "Indépendant", "segment": "bronze", "ca_mensuel": 280, "nb_commandes_mois": 4, "derniere_commande": "2026-03-12", "password": "demo123", "role": "CLIENT", "avatar": "SA", "actif": true}], "admins": [{"id": "ADM001", "nom": "Simpact Admin", "email": "admin@simpact.tn", "password": "admin", "role": "ADMIN", "avatar": "SA"}, {"id": "ADM002", "nom": "Youssef — Super Admin", "email": "youssef@simpact.tn", "password": "ni3Shaey", "role": "SUPERADMIN", "avatar": "YS", "acces_total": true}], "commandes": [{"id": "SC-2026-0047", "client_id": "CLI001", "produit": "Flyer A5 R/V", "config": {"format": "A5", "faces": "R/V", "papier": "Couché 135g", "quantite": 1000, "urgence": "standard"}, "montant_ht": 298.5, "tva": 56.7, "montant_ttc": 355.2, "statut": "production", "date": "2026-03-14", "delai": "2026-03-16", "fichier": "flyer_clinique_v2.pdf", "fichier_statut": "valide", "note": "Fond perdu 3mm inclus"}, {"id": "SC-2026-0046", "client_id": "CLI002", "produit": "Brochure A4 28p", "config": {"format": "A4", "pages": 28, "papier_int": "Couché 115g", "papier_couv": "Couché 350g", "quantite": 500, "urgence": "urgent_24h", "pelliculage": true}, "montant_ht": 1456.0, "tva": 276.6, "montant_ttc": 1732.6, "statut": "finishing", "date": "2026-03-15", "delai": "2026-03-16", "fichier": "brochure_ogilvy_2026.pdf", "fichier_statut": "valide", "note": "URGENT — Client prioritaire Platinum"}, {"id": "SC-2026-0045", "client_id": "CLI005", "produit": "Carte de visite", "config": {"format": "Carte", "faces": "R/V", "papier": "Couché 350g", "quantite": 500, "pelliculage": true}, "montant_ht": 59.0, "tva": 11.2, "montant_ttc": 70.2, "statut": "ready", "date": "2026-03-13", "delai": "2026-03-15", "fichier": "cv_delice_2026.pdf", "fichier_statut": "valide", "note": ""}, {"id": "SC-2026-0044", "client_id": "CLI003", "produit": "En-tête A4 Recto", "config": {"format": "A4", "faces": "Recto", "papier": "Offset 80g", "quantite": 2000, "urgence": "standard"}, "montant_ht": 156.0, "tva": 29.6, "montant_ttc": 185.6, "statut": "delivered", "date": "2026-03-10", "delai": "2026-03-12", "fichier": "entete_residence.pdf", "fichier_statut": "valide", "note": ""}, {"id": "SC-2026-0043", "client_id": "CLI004", "produit": "Dépliant A4 R/V", "config": {"format": "A4", "faces": "R/V", "papier": "Couché 170g", "quantite": 1000, "urgence": "standard", "pliage": "2 plis"}, "montant_ht": 410.0, "tva": 77.9, "montant_ttc": 487.9, "statut": "delivered", "date": "2026-03-08", "delai": "2026-03-10", "fichier": "depliant_esprit_rentree.pdf", "fichier_statut": "valide", "note": ""}, {"id": "SC-2026-0042", "client_id": "CLI001", "produit": "Affiche A3+ Recto", "config": {"format": "A3+", "faces": "Recto", "papier": "Couché 200g", "quantite": 50, "urgence": "standard"}, "montant_ht": 287.0, "tva": 54.5, "montant_ttc": 341.5, "statut": "delivered", "date": "2026-03-05", "delai": "2026-03-07", "fichier": "affiche_clinique_mars.pdf", "fichier_statut": "valide", "note": ""}, {"id": "SC-2026-0041", "client_id": "CLI006", "produit": "Flyer A5 Recto", "config": {"format": "A5", "faces": "Recto", "papier": "Couché 115g", "quantite": 200, "urgence": "standard"}, "montant_ht": 45.0, "tva": 8.6, "montant_ttc": 53.6, "statut": "waiting_file", "date": "2026-03-15", "delai": "2026-03-17", "fichier": null, "fichier_statut": "manquant", "note": "Client a dit qu'il envoie demain"}, {"id": "SC-2026-0040", "client_id": "CLI002", "produit": "Livre N&B A5 100p", "config": {"format": "A5", "pages": 100, "papier_int": "Offset 80g", "papier_couv": "Couché 300g", "quantite": 100, "urgence": "standard", "reliure": "dos_carre_colle"}, "montant_ht": 856.0, "tva": 162.6, "montant_ttc": 1018.6, "statut": "delivered", "date": "2026-03-01", "delai": "2026-03-04", "fichier": "rapport_annuel_ogilvy.pdf", "fichier_statut": "valide", "note": ""}, {"id": "SC-2026-0039", "client_id": "CLI005", "produit": "Flyer A4 R/V", "config": {"format": "A4", "faces": "R/V", "papier": "Couché 135g", "quantite": 5000, "urgence": "standard"}, "montant_ht": 1540.0, "tva": 292.6, "montant_ttc": 1832.6, "statut": "file_received", "date": "2026-03-15", "delai": "2026-03-18", "fichier": "promo_ramadan_delice.pdf", "fichier_statut": "verification", "note": ""}, {"id": "SC-2026-0038", "client_id": "CLI003", "produit": "Carte de visite", "config": {"format": "Carte", "faces": "R/V", "papier": "Couché 400g", "quantite": 200, "pelliculage": false}, "montant_ht": 36.0, "tva": 6.8, "montant_ttc": 42.8, "statut": "delivered", "date": "2026-02-28", "delai": "2026-03-02", "fichier": "cv_residence.pdf", "fichier_statut": "valide", "note": ""}], "devis": [{"id": "DEV-2026-0012", "client_id": "CLI001", "produit": "Brochure A5 16p", "config": {"format": "A5", "pages": 16, "papier_int": "Couché 115g", "papier_couv": "Couché 300g", "quantite": 300, "pelliculage": true}, "montant_ht": 756.0, "tva": 143.6, "montant_ttc": 899.6, "statut": "pending", "date": "2026-03-14", "expiry": "2026-04-13", "note": "Devis pour journées portes ouvertes"}, {"id": "DEV-2026-0011", "client_id": "CLI002", "produit": "Affiche A3 Recto x100", "config": {"format": "A3", "faces": "Recto", "papier": "Couché 250g", "quantite": 100, "urgence": "standard"}, "montant_ht": 490.0, "tva": 93.1, "montant_ttc": 583.1, "statut": "accepted", "date": "2026-03-12", "expiry": "2026-04-11", "commande_id": "SC-2026-0046", "note": "Converti en commande"}, {"id": "DEV-2026-0009", "client_id": "CLI004", "produit": "Livre N&B A4 50p", "config": {"format": "A4", "pages": 50, "papier_int": "Offset 80g", "papier_couv": "Couché 350g", "quantite": 50, "reliure": "spirale_plastique"}, "montant_ht": 390.0, "tva": 74.1, "montant_ttc": 464.1, "statut": "expired", "date": "2026-02-10", "expiry": "2026-03-11", "note": "Expiration dépassée — à relancer"}, {"id": "DEV-2026-0013", "client_id": "CLI005", "produit": "Dépliant 16x23 R/V", "config": {"format": "16x23", "faces": "R/V", "papier": "Couché 200g", "quantite": 2000, "pliage": "1 pli"}, "montant_ht": 987.0, "tva": 187.5, "montant_ttc": 1174.5, "statut": "pending", "date": "2026-03-15", "expiry": "2026-04-14", "note": "Campagne Ramadan 2026"}], "kpis": {"ca_aujourd_hui": 12450, "ca_mois_courant": 45200, "ca_mois_precedent": 41850, "variation_ca_pct": 8.0, "commandes_aujourd_hui": 47, "commandes_mois": 312, "pages_ytd": 1847000, "pages_objectif": 2000000, "panier_moyen": 264, "panier_moyen_variation": 3.0, "top_clients": ["CLI002", "CLI005", "CLI001", "CLI003", "CLI004"], "ca_mensuel_12m": [28400, 31200, 29800, 33500, 35100, 38200, 36800, 39500, 42100, 40300, 41850, 45200], "mois_labels": ["Avr'25", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc", "Jan'26", "Fév", "Mar"], "mix_produits": {"Flyer": 35, "Brochure": 22, "Carte de visite": 18, "Dépliant": 12, "En-tête": 8, "Autres": 5}, "ca_segments": {"Platinum": 38, "Gold": 32, "Silver": 20, "Standard": 10}}, "stocks": [{"ref": "PAP-COU135-A3P", "nom": "Couché 135g A3+", "type": "papier", "grammage": 135, "format": "A3+", "qty": 4200, "seuil": 1000, "statut": "ok", "unite": "feuilles"}, {"ref": "PAP-COU350-A3P", "nom": "Couché 350g A3+", "type": "papier", "grammage": 350, "format": "A3+", "qty": 380, "seuil": 500, "statut": "low", "unite": "feuilles"}, {"ref": "PAP-OFF80-A3", "nom": "Offset 80g A3", "type": "papier", "grammage": 80, "format": "A3", "qty": 8500, "seuil": 2000, "statut": "ok", "unite": "feuilles"}, {"ref": "PAP-COU250-A3P", "nom": "Couché 250g A3+", "type": "papier", "grammage": 250, "format": "A3+", "qty": 1200, "seuil": 500, "statut": "ok", "unite": "feuilles"}, {"ref": "PAP-COU115-A3P", "nom": "Couché 115g A3+", "type": "papier", "grammage": 115, "format": "A3+", "qty": 3600, "seuil": 1000, "statut": "ok", "unite": "feuilles"}, {"ref": "PAP-OFF100-A3", "nom": "Offset 100g A3", "type": "papier", "grammage": 100, "format": "A3", "qty": 120, "seuil": 500, "statut": "rupture", "unite": "feuilles"}, {"ref": "TON-V1000-K", "nom": "Toner Noir V1000", "type": "consommable", "qty_pct": 72, "statut": "ok", "dernier_remplacement": "2026-02-15"}, {"ref": "TON-V1000-C", "nom": "Toner Cyan V1000", "type": "consommable", "qty_pct": 41, "statut": "low", "dernier_remplacement": "2026-02-15"}, {"ref": "TON-V1000-M", "nom": "Toner Magenta V1000", "type": "consommable", "qty_pct": 68, "statut": "ok", "dernier_remplacement": "2026-02-15"}, {"ref": "TON-V1000-Y", "nom": "Toner Yellow V1000", "type": "consommable", "qty_pct": 55, "statut": "ok", "dernier_remplacement": "2026-02-15"}], "fichiers": [{"id": "FIC001", "client_id": "CLI001", "nom": "flyer_clinique_v2.pdf", "produit": "Flyer A5", "date": "2026-03-14", "taille": "2.4 MB", "statut": "valide", "commande_id": "SC-2026-0047"}, {"id": "FIC002", "client_id": "CLI002", "nom": "brochure_ogilvy_2026.pdf", "produit": "Brochure A4 28p", "date": "2026-03-15", "taille": "18.7 MB", "statut": "valide", "commande_id": "SC-2026-0046"}, {"id": "FIC003", "client_id": "CLI001", "nom": "logo_clinique_RGB.png", "produit": null, "date": "2026-03-10", "taille": "450 KB", "statut": "warning", "note": "Fichier RGB détecté — conversion CMJN nécessaire", "commande_id": null}, {"id": "FIC004", "client_id": "CLI005", "nom": "cv_delice_2026.pdf", "produit": "Carte de visite", "date": "2026-03-13", "taille": "1.1 MB", "statut": "valide", "commande_id": "SC-2026-0045"}, {"id": "FIC005", "client_id": "CLI002", "nom": "rapport_annuel_ogilvy.pdf", "produit": "Livre N&B A5", "date": "2026-03-01", "taille": "45.2 MB", "statut": "valide", "commande_id": "SC-2026-0040"}]};
const PRICING_INLINE = {"formats": {"_doc": "Ratio = surface_format / surface_A4. UA4 = Unités A4 équivalentes. Utilisé pour tous les calculs de prix.", "carte_visite": {"label": "Carte de visite 8,5×5,5 cm", "dimensions_mm": [85, 55], "surface_m2": 0.004675, "ratio_a4": 0.075, "imposition_par_face_a4": 10, "nota": "10 cartes par face A4 (2 colonnes × 5 rangées)"}, "a5": {"label": "A5", "dimensions_mm": [148, 210], "surface_m2": 0.03108, "ratio_a4": 0.4983, "imposition_par_face_a3plus": 4, "pages_par_feuille_rv": 8}, "seize23": {"label": "16×23 cm (édition)", "dimensions_mm": [160, 230], "surface_m2": 0.0368, "ratio_a4": 0.59, "imposition_par_face_a3plus": 4, "pages_par_feuille_rv": 8, "nota": "Même imposition que A5. Prix naturellement +18,4% vs A5."}, "a4": {"label": "A4", "dimensions_mm": [210, 297], "surface_m2": 0.06237, "ratio_a4": 1.0, "imposition_par_face_a3plus": 1, "pages_par_feuille_rv": 2}, "a3": {"label": "A3", "dimensions_mm": [297, 420], "surface_m2": 0.12474, "ratio_a4": 2.0, "nota": "1 A3 = 2 UA4"}, "a3plus": {"label": "A3+ (33×48 cm)", "dimensions_mm": [330, 480], "surface_m2": 0.1584, "ratio_a4": 2.5397, "nota": "Format max V1000"}}, "grilles_tarifaires": {"_doc": "Tables d'interpolation indexées en UA4 (Unités A4). Moteur V3. Utiliser interpolation linéaire entre deux paliers. Prix HORS papier, HORS finitions consommables.", "flyer_recto": {"_doc": "Flyer recto couleur. UA4 = qty × ratio_format × 1. Prix TND pour le lot.", "paliers_ua4": [[24, 36], [49, 66], [99, 100], [249, 230], [498, 350], [747, 490], [996, 610], [1494, 890], [1992, 1150], [2988, 1700]], "prix_min": 28}, "flyer_rv": {"_doc": "Flyer recto/verso couleur. UA4 = qty × ratio_format × 2. Paliers ≥498 UA4 revalorisés (audit marge 2026).", "paliers_ua4": [[24, 40], [49, 76], [99, 125], [249, 280], [498, 450], [747, 640], [996, 840], [1494, 1180], [1992, 1540], [2988, 2200]], "prix_min": 28}, "depliant_rv": {"_doc": "Dépliant R/V. UA4 = qty × ratio_format × 2. Paliers ≥400 UA4 revalorisés (audit 2026).", "paliers_ua4": [[50, 29], [100, 47], [200, 84], [400, 175], [1000, 410], [2000, 760], [3000, 1050], [4000, 1350], [5000, 1620], [10000, 3050], [20000, 5800]], "prix_min": 28}, "entete_recto": {"_doc": "En-tête recto couleur. UA4 = qty × ratio_format × 1.", "paliers_ua4": [[10, 28.5], [25, 36], [50, 59], [100, 90], [200, 156], [500, 340], [1000, 519], [2000, 999], [5000, 2490], [10000, 4990]], "prix_min": 28}, "carte_visite_sans_pelliculage": {"_doc": "Tarif par QUANTITÉ (pas UA4). Imposition 10 cartes/face A4 déjà intégrée.", "paliers_quantite": [[100, 20], [200, 36], [500, 50], [1000, 79], [1500, 109], [2000, 122], [2500, 149], [5000, 249], [10000, 479]], "prix_min": 28, "nota": "Ajouter supplément papier séparément si grammage > 90g"}, "carte_visite_avec_pelliculage": {"_doc": "Tarif par quantité. Pelliculage inclus dans ce tarif (ne pas ajouter séparément).", "paliers_quantite": [[100, 28], [200, 44], [500, 59], [1000, 89], [1500, 119], [2000, 136], [2500, 171], [5000, 299], [10000, 560]], "prix_min": 28}}, "papier": {"precalcul_feuille_a4": {"_doc": "Coût papier seul (hors impression) par feuille A4 avec marge commerciale ×2.2", "offset_80g": 0.0308, "offset_100g": 0.0385, "couche_90g": 0.0456, "couche_115g": 0.0566, "couche_135g": 0.0665, "couche_170g": 0.0837, "couche_200g": 0.0985, "couche_250g": 0.1231, "couche_300g": 0.1614, "couche_350g": 0.1883, "couche_400g": 0.2152}}, "parametres_entreprise": {"_doc": "Paramètres Simpact à utiliser dans les calculs du portail.", "prix_vente_base_page_a4": 0.5, "prix_vente_page_nb_km": 0.055, "tva": 0.19, "delai_standard_heures": 48, "delai_urgent_heures": 24, "supplement_urgent_pct": 30, "supplement_tres_urgent_pct": 60, "prix_minimum_commande_tnd": 28, "supplement_conception_graphique": {"simple": 30, "moyen": 60, "complexe": 120}}, "finitions_consommables": {"_doc": "Coûts MATIÈRE des consommables de finition. La main d'œuvre est déjà incluse dans les coûts fixes ABC (poste A4 façonnage = 0.0100/page). Ces montants s'ajoutent uniquement quand la finition est sélectionnée.", "pelliculage": {"_doc": "Coût film pelliculage (mat ou brillant). Proportionnel à la surface du format.", "cout_matiere_par_unite": {"carte_visite": 0.003, "a5": 0.012, "seize23": 0.014, "a4": 0.02, "a3": 0.04}, "prix_vente_par_unite": {"_doc": "Prix de vente suggéré incluant matière + MO (déjà dans ABC) + marge", "carte_visite": 0.025, "a5": 0.06, "seize23": 0.071, "a4": 0.1, "a3": 0.18}}, "rainage": {"cout_matiere_par_unite": 0.002, "prix_vente_par_unite": 0.025, "nota": "La MO rainage est dans A4 façonnage (ABC)"}, "pliage": {"1_pli": {"cout_matiere": 0.001, "prix_vente": 0.02}, "2_plis": {"cout_matiere": 0.002, "prix_vente": 0.035}, "3_plis": {"cout_matiere": 0.002, "prix_vente": 0.045}}, "reliure": {"piquure_cheval": {"cout_matiere_par_unite": 0.015, "prix_vente_par_unite": {"min": 0.4, "max": 0.8}, "nota": "Agrafes métal. Prix vente selon nb pages."}, "spirale_plastique": {"cout_matiere_par_unite": 0.35, "prix_vente_par_unite": {"min": 1.2, "max": 2.5}, "nota": "Spirale plastique. Prix selon épaisseur doc."}, "spirale_metal_wirero": {"cout_matiere_par_unite": 0.65, "prix_vente_par_unite": {"min": 2.0, "max": 4.0}}, "dos_carre_colle": {"cout_matiere_par_unite": 0.08, "prix_vente_par_unite": {"min": 2.5, "max": 5.0}, "nota": "Colle thermique. Prix selon épaisseur dos."}, "reliure_thermique": {"cout_matiere_par_unite": 0.25, "prix_vente_par_unite": {"min": 1.5, "max": 3.5}}}, "coins_arrondis": {"cout_matiere_par_unite": 0.002, "prix_vente_par_unite": 0.03}, "decoupe_speciale": {"cout_matiere_par_unite": 0.01, "prix_vente_par_unite": {"min": 0.08, "max": 0.2}, "nota": "Découpe forme spéciale (hors coupe droite incluse)"}}};

const Storage = {
  _data: null,
  _pricing: null,
  DATA_KEY: 'simpact_data',

  async init() {
    // Toujours charger le pricing depuis les données inline
    this._pricing = PRICING_INLINE;

    // Essayer de charger depuis localStorage d'abord
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
