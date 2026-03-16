/* SIMPACT B2B — PRICING.JS v2.1 */
/* Moteur UA4 complet — Algorithme de calcul devis */

const Pricing = {

  // ── Constantes ──
  FORMAT_RATIO: {
    carte_visite: 0.0750,
    a5:           0.4983,
    seize23:      0.5900,
    a4:           1.0000,
    a3:           2.0000,
    a3plus:       2.5397
  },

  TARIFS: {
    recto:    [[24,36],[49,66],[99,100],[249,230],[498,350],[747,490],[996,610],[1494,890],[1992,1150],[2988,1700]],
    rv:       [[24,40],[49,76],[99,125],[249,280],[498,450],[747,640],[996,840],[1494,1180],[1992,1540],[2988,2200]],
    depliant: [[50,29],[100,47],[200,84],[400,175],[1000,410],[2000,760],[3000,1050],[4000,1350],[5000,1620],[10000,3050],[20000,5800]],
    entete:   [[10,28.5],[25,36],[50,59],[100,90],[200,156],[500,340],[1000,519],[2000,999],[5000,2490],[10000,4990]],
    cv_sans:  [[100,20],[200,36],[500,50],[1000,79],[1500,109],[2000,122],[2500,149],[5000,249],[10000,479]],
    cv_avec:  [[100,28],[200,44],[500,59],[1000,89],[1500,119],[2000,136],[2500,171],[5000,299],[10000,560]]
  },

  PAPIER: {
    'offset-80':0.0308,'offset-100':0.0385,
    'couche-90':0.0456,'couche-115':0.0566,'couche-135':0.0665,
    'couche-170':0.0837,'couche-200':0.0985,'couche-250':0.1231,
    'couche-300':0.1614,'couche-350':0.1883,'couche-400':0.2152
  },

  PELLICULAGE: {
    carte_visite:0.025, a5:0.060, seize23:0.071, a4:0.100, a3:0.180, a3plus:0.225
  },

  PLIAGE: { '1_pli': 0.020, '2_plis': 0.035, '3_plis': 0.045 },
  RAINAGE: 0.025,
  COINS_ARRONDIS: 0.030,

  RELIURES: {
    piquure:  { min:0.40, max:0.80 },
    spirale:  { min:1.20, max:2.50 },
    wirero:   { min:2.00, max:4.00 },
    dsc:      { min:2.50, max:5.00 },
    thermique:{ min:1.50, max:3.50 }
  },

  COUV_LIVRE: {
    a4:      { r:1.30, rv:1.50 },
    a5:      { r:0.65, rv:0.75 },
    seize23: { r:0.77, rv:0.89 }
  },

  PRIX_MIN:        28,
  TVA:             0.19,
  SURCHARGE_24H:   0.30,
  SURCHARGE_4H:    0.60,
  KM_PRIX_FEUILLE: 0.20,

  LIVRAISON: { gratuit:0, grand_tunis:5, national:8 },

  // ── Interpolation linéaire ──
  interpoler(table, valeur) {
    if (valeur <= table[0][0])                       return table[0][1];
    if (valeur >= table[table.length-1][0])          return table[table.length-1][1];
    for (let i = 0; i < table.length - 1; i++) {
      if (valeur >= table[i][0] && valeur <= table[i+1][0]) {
        const r = (valeur - table[i][0]) / (table[i+1][0] - table[i][0]);
        return table[i][1] + r * (table[i+1][1] - table[i][1]);
      }
    }
    return table[table.length-1][1];
  },

  // ── Taux brochure selon UA4 total ──
  tauxBrochure(ua4, faces_rv = true) {
    const paliers = [
      [0,   25,  3.00, 2.80],
      [25,  50,  2.50, 2.30],
      [50,  100, 2.00, 1.80],
      [100, 200, 1.90, 1.70],
      [200, 300, 1.80, 1.60],
      [300, 400, 1.70, 1.50],
      [400, 500, 1.60, 1.40],
      [500, 9999,1.50, 1.30]
    ];
    for (const [min, max, rv, r] of paliers) {
      if (ua4 >= min && ua4 < max) return faces_rv ? rv : r;
    }
    return faces_rv ? 1.50 : 1.30;
  },

  // ── Calcul principal ──
  calculerDevis(config) {
    /*
     * config = {
     *   produit:   'flyer'|'carte_visite'|'depliant'|'brochure'|'livre_nb'|'entete'|'affiche'
     *   format:    'a4'|'a5'|'seize23'|'a3'|'a3plus'|'carte_visite'
     *   quantite:  number
     *   faces:     'recto'|'rv'  (pour flyer/entete/affiche)
     *   pages:     number        (pour brochure/livre)
     *   papier:    'couche-135'  (clé PAPIER)
     *   papier_couv: 'couche-350' (pour brochure/livre)
     *   pelliculage: bool
     *   pelliculage_couv: bool
     *   pliage:    '1_pli'|'2_plis'|'3_plis'|null
     *   rainage:   bool
     *   coins_arrondis: bool
     *   reliure:   'piquure'|'spirale'|'wirero'|'dsc'|'thermique'|null
     *   reliure_pv: number   (prix vente unitaire reliure choisi)
     *   urgence:   'standard'|'urgent_24h'|'express_4h'
     *   livraison: 'gratuit'|'grand_tunis'|'national'
     *   couverture_faces: 'recto'|'rv' (pour brochure)
     * }
     */
    const { produit, format, quantite, faces, pages, papier, papier_couv,
            pelliculage, pelliculage_couv, pliage, rainage, coins_arrondis,
            reliure, reliure_pv, urgence, livraison, couverture_faces } = config;

    const detail = [];
    let prix_impression = 0;
    let prix_papier = 0;
    let prix_finitions = 0;
    const ratio = this.FORMAT_RATIO[format] || 1.0;
    const qty = parseInt(quantite) || 0;

    // ─── FLYER ───
    if (produit === 'flyer' || produit === 'affiche') {
      const nb_faces = faces === 'rv' ? 2 : 1;
      const ua4 = qty * ratio * nb_faces;
      const tarif = faces === 'rv' ? this.TARIFS.rv : this.TARIFS.recto;
      prix_impression = Math.max(this.interpoler(tarif, ua4), this.PRIX_MIN);
      detail.push({ label:`Impression ${faces === 'rv' ? 'R/V':'Recto'} (${Math.round(ua4)} UA4)`, montant:prix_impression });

      const coutFeuille = (this.PAPIER[papier] || 0.0566) * ratio;
      prix_papier = qty * coutFeuille;
      if (prix_papier > 0) detail.push({ label:`Papier ${this._nomPapier(papier)} ×${qty} feuilles`, montant:prix_papier });

      if (pelliculage && this.PELLICULAGE[format]) {
        const montant = qty * this.PELLICULAGE[format];
        prix_finitions += montant;
        detail.push({ label:'Pelliculage', montant });
      }
    }

    // ─── CARTE DE VISITE ───
    else if (produit === 'carte_visite') {
      const tarif = pelliculage ? this.TARIFS.cv_avec : this.TARIFS.cv_sans;
      prix_impression = Math.max(this.interpoler(tarif, qty), this.PRIX_MIN);
      detail.push({ label:`Impression carte de visite${pelliculage?' + pelliculage':''}`, montant:prix_impression });

      const coutFeuille = (this.PAPIER[papier] || 0.1883) * this.FORMAT_RATIO.carte_visite;
      prix_papier = qty * coutFeuille;
      if (prix_papier > 0) detail.push({ label:`Papier ${this._nomPapier(papier)} ×${qty}`, montant:prix_papier });

      if (coins_arrondis) {
        const montant = qty * this.COINS_ARRONDIS;
        prix_finitions += montant;
        detail.push({ label:'Coins arrondis', montant });
      }
    }

    // ─── DÉPLIANT ───
    else if (produit === 'depliant') {
      const ua4 = qty * ratio * 2;
      prix_impression = Math.max(this.interpoler(this.TARIFS.depliant, ua4), this.PRIX_MIN);
      detail.push({ label:`Impression dépliant R/V (${Math.round(ua4)} UA4)`, montant:prix_impression });

      const coutFeuille = (this.PAPIER[papier] || 0.0665) * ratio;
      prix_papier = qty * coutFeuille;
      if (prix_papier > 0) detail.push({ label:`Papier ${this._nomPapier(papier)} ×${qty}`, montant:prix_papier });

      if (rainage) {
        const montant = qty * this.RAINAGE;
        prix_finitions += montant;
        detail.push({ label:'Rainage', montant });
      }
      if (pliage && this.PLIAGE[pliage]) {
        const montant = qty * this.PLIAGE[pliage];
        prix_finitions += montant;
        detail.push({ label:`Pliage ${pliage.replace('_',' ')}`, montant });
      }
    }

    // ─── EN-TÊTE ───
    else if (produit === 'entete') {
      const ua4 = qty * ratio;
      prix_impression = Math.max(this.interpoler(this.TARIFS.entete, ua4), this.PRIX_MIN);
      detail.push({ label:`Impression en-tête recto (${Math.round(ua4)} UA4)`, montant:prix_impression });

      const coutFeuille = (this.PAPIER[papier] || 0.0308) * ratio;
      prix_papier = qty * coutFeuille;
      if (prix_papier > 0) detail.push({ label:`Papier ${this._nomPapier(papier)} ×${qty}`, montant:prix_papier });
    }

    // ─── BROCHURE ───
    else if (produit === 'brochure') {
      const nbPages = parseInt(pages) || 8;
      // Feuilles selon format
      const pagesParFeuille = format === 'a4' ? 4 : 8;
      const nbFeuillesInt = Math.ceil(nbPages / pagesParFeuille);
      const nbFeuillesCouv = format === 'a4' ? 1 : 0.5;

      // UA4
      const ua4_int = nbFeuillesInt * qty * ratio * 2;
      const ua4_couv = nbFeuillesCouv * qty * ratio * (couverture_faces === 'rv' ? 2 : 1);
      const ua4_total = ua4_int + ua4_couv;

      const taux = this.tauxBrochure(ua4_total, true);
      prix_impression = Math.max(taux * ua4_total, this.PRIX_MIN);
      detail.push({ label:`Impression brochure (${Math.round(ua4_total)} UA4 × ${taux.toFixed(2)} TND)`, montant:prix_impression });

      // Papier intérieur
      const papierIntKey = papier || 'couche-115';
      const coutInt = (this.PAPIER[papierIntKey] || 0.0566) * ratio * nbFeuillesInt * qty;
      prix_papier += coutInt;
      if (coutInt > 0) detail.push({ label:`Papier intérieur ${this._nomPapier(papierIntKey)}`, montant:coutInt });

      // Papier couverture
      const papierCvKey = papier_couv || 'couche-350';
      const coutCouv = (this.PAPIER[papierCvKey] || 0.1883) * ratio * nbFeuillesCouv * qty;
      prix_papier += coutCouv;
      if (coutCouv > 0) detail.push({ label:`Papier couverture ${this._nomPapier(papierCvKey)}`, montant:coutCouv });

      // Pelliculage couverture
      if (pelliculage_couv && this.PELLICULAGE[format]) {
        const montant = qty * this.PELLICULAGE[format];
        prix_finitions += montant;
        detail.push({ label:'Pelliculage couverture', montant });
      }
    }

    // ─── LIVRE N&B ───
    else if (produit === 'livre_nb') {
      const nbPages = parseInt(pages) || 50;
      const pagesParFeuille = format === 'a4' ? 4 : 8;
      const nbFeuilles = Math.ceil(nbPages / pagesParFeuille);

      // Intérieur KM
      prix_impression = nbFeuilles * qty * this.KM_PRIX_FEUILLE;
      detail.push({ label:`Intérieur N&B (${nbFeuilles} feuilles × ${qty} ex × ${this.KM_PRIX_FEUILLE} TND)`, montant:prix_impression, machine:'KM' });

      // Couverture V1000
      const cfaces = couverture_faces === 'rv' ? 'rv' : 'r';
      const priceCouv = (this.COUV_LIVRE[format] || this.COUV_LIVRE.a5)[cfaces];
      const montantCouv = priceCouv * qty;
      prix_finitions += montantCouv;
      detail.push({ label:`Couverture couleur V1000 (${couverture_faces?.toUpperCase()||'R/V'})`, montant:montantCouv, machine:'V1000' });

      // Papier intérieur (offset 80g standard KM)
      const coutInt = (this.PAPIER['offset-80'] || 0.0308) * (this.FORMAT_RATIO[format]||1) * nbFeuilles * qty;
      prix_papier += coutInt;
      if (coutInt > 0) detail.push({ label:`Papier intérieur Offset 80g`, montant:coutInt });
    }

    // ─── RELIURE ───
    if (reliure && reliure_pv) {
      const montant = parseFloat(reliure_pv) * qty;
      prix_finitions += montant;
      const label = { piquure:'Piqûre à cheval', spirale:'Spirale plastique', wirero:"Spirale Wire'O", dsc:'Dos carré collé', thermique:'Reliure thermique' };
      detail.push({ label: label[reliure] || 'Reliure', montant });
    }

    // ─── SOUS-TOTAL ───
    let sous_total = prix_impression + prix_papier + prix_finitions;

    // ─── SUPPLÉMENT URGENCE ───
    let montant_urgence = 0;
    if (urgence === 'urgent_24h') {
      montant_urgence = sous_total * this.SURCHARGE_24H;
      detail.push({ label:'Supplément urgent 24h (+30%)', montant:montant_urgence, type:'surcharge' });
    } else if (urgence === 'express_4h') {
      montant_urgence = sous_total * this.SURCHARGE_4H;
      detail.push({ label:'Supplément express 4h (+60%)', montant:montant_urgence, type:'surcharge' });
    }

    // ─── LIVRAISON ───
    let montant_livraison = 0;
    if (livraison === 'grand_tunis') {
      montant_livraison = this.LIVRAISON.grand_tunis;
      detail.push({ label:'Livraison Grand Tunis', montant:montant_livraison, type:'livraison' });
    } else if (livraison === 'national') {
      montant_livraison = this.LIVRAISON.national;
      detail.push({ label:'Livraison nationale', montant:montant_livraison, type:'livraison' });
    }

    const total_ht = Math.max(sous_total + montant_urgence + montant_livraison, this.PRIX_MIN);
    const tva_montant = Utils.round(total_ht * this.TVA);
    const total_ttc = Utils.round(total_ht + tva_montant);
    const pu_ht = qty > 0 ? Utils.round(total_ht / qty, 4) : 0;
    const pu_ttc = qty > 0 ? Utils.round(total_ttc / qty, 4) : 0;

    return {
      total_ht: Utils.round(total_ht),
      tva_montant,
      total_ttc,
      pu_ht,
      pu_ttc,
      detail
    };
  },

  // ── Comparateur de paliers ──
  comparateurPaliers(config) {
    const base = parseInt(config.quantite) || 100;
    const paliers = [
      Math.max(50, Math.round(base * 0.5)),
      base,
      Math.round(base * 2)
    ];
    return paliers.map(q => ({
      quantite: q,
      ...this.calculerDevis({ ...config, quantite: q })
    }));
  },

  // ── Nom papier lisible ──
  _nomPapier(key) {
    const map = {
      'offset-80':'Offset 80g','offset-100':'Offset 100g',
      'couche-90':'Couché 90g','couche-115':'Couché 115g','couche-135':'Couché 135g',
      'couche-170':'Couché 170g','couche-200':'Couché 200g','couche-250':'Couché 250g',
      'couche-300':'Couché 300g','couche-350':'Couché 350g','couche-400':'Couché 400g'
    };
    return map[key] || key;
  },

  // ── Délai estimé en jours ouvrables ──
  delaiEstime(produit, quantite, urgence) {
    if (urgence === 'express_4h') return '4 heures';
    if (urgence === 'urgent_24h') return '24 heures';
    const base = { flyer:2, carte_visite:2, depliant:3, brochure:4, livre_nb:5, entete:2, affiche:2 };
    let days = base[produit] || 2;
    if (quantite > 5000) days += 1;
    if (quantite > 10000) days += 2;
    return `${days} jours ouvrables`;
  }
};

// ── AUTO-TESTS (commentés en production, décommenter pour vérification) ──
/*
console.group('Pricing auto-tests');
// Brochure A5 28p 500ex → ~3040 TND TTC
const t1 = Pricing.calculerDevis({produit:'brochure',format:'a5',quantite:500,pages:28,papier:'couche-115',papier_couv:'couche-350',pelliculage_couv:false,urgence:'standard',couverture_faces:'rv'});
console.log('Brochure A5 28p 500ex TTC:', t1.total_ttc, '(attendu ~3040)');

// Brochure 16x23 28p 500ex → ~3600 TND TTC (+18.4%)
const t2 = Pricing.calculerDevis({produit:'brochure',format:'seize23',quantite:500,pages:28,papier:'couche-115',papier_couv:'couche-350',pelliculage_couv:false,urgence:'standard',couverture_faces:'rv'});
console.log('Brochure 16x23 28p 500ex TTC:', t2.total_ttc, '(attendu ~3600)');
console.groupEnd();
*/

window.Pricing = Pricing;
