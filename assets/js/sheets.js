/* SIMPACT B2B — SHEETS.JS v1.0
 * Couche d'intégration Google Sheets
 * Remplace le localStorage par les 3 Sheets printhub
 *
 * CONFIGURATION :
 * Après déploiement de printhub_apps_script.js sur Apps Script,
 * remplacer APPS_SCRIPT_URL par l'URL de déploiement.
 */

const SheetsDB = {

  // ─────────────────────────────────────────────────────────────
  // CONFIGURATION — À mettre à jour après déploiement Apps Script
  // ─────────────────────────────────────────────────────────────
  APPS_SCRIPT_URL: '',  // <-- Coller ici l'URL après déploiement
  SECRET_KEY: 'printhub2026simpact',
  TIMEOUT_MS: 8000,

  // ─────────────────────────────────────────────────────────────
  // État & cache local (évite les requêtes répétées)
  // ─────────────────────────────────────────────────────────────
  _cache: {},
  _lastSync: {},
  CACHE_TTL: 30000, // 30 secondes

  // Vérifie si l'intégration est activée
  isActive() {
    return this.APPS_SCRIPT_URL && this.APPS_SCRIPT_URL.length > 10;
  },

  // ─────────────────────────────────────────────────────────────
  // LECTURE — GET /?table=xxx
  // ─────────────────────────────────────────────────────────────
  async getTable(table) {
    if (!this.isActive()) return null;

    // Cache local
    const now = Date.now();
    if (this._cache[table] && (now - this._lastSync[table]) < this.CACHE_TTL) {
      return this._cache[table];
    }

    try {
      const url = `${this.APPS_SCRIPT_URL}?table=${table}&t=${now}`;
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), this.TIMEOUT_MS);
      const res = await fetch(url, { signal: ctrl.signal });
      clearTimeout(timer);
      const json = await res.json();
      if (Array.isArray(json)) {
        this._cache[table] = json;
        this._lastSync[table] = now;
        return json;
      }
    } catch(e) {
      console.warn(`[SheetsDB] Timeout/erreur lecture ${table}:`, e.message);
    }
    return null;
  },

  // ─────────────────────────────────────────────────────────────
  // ÉCRITURE — POST avec action 'upsert'
  // ─────────────────────────────────────────────────────────────
  async upsert(table, record) {
    if (!this.isActive()) return false;

    // Invalider le cache
    delete this._cache[table];

    try {
      const res = await fetch(this.APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          table, action: 'upsert', record,
          key: this.SECRET_KEY
        })
      });
      const json = await res.json();
      return json.success === true;
    } catch(e) {
      console.warn(`[SheetsDB] Erreur écriture ${table}:`, e.message);
      return false;
    }
  },

  // ─────────────────────────────────────────────────────────────
  // SUPPRESSION
  // ─────────────────────────────────────────────────────────────
  async delete(table, id) {
    if (!this.isActive()) return false;
    delete this._cache[table];
    try {
      const res = await fetch(this.APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ table, action: 'delete', id, key: this.SECRET_KEY })
      });
      const json = await res.json();
      return json.success === true;
    } catch(e) {
      return false;
    }
  },

  // ─────────────────────────────────────────────────────────────
  // IMPORT EN MASSE (initialisation des Sheets)
  // ─────────────────────────────────────────────────────────────
  async bulkImport(table, records, headers) {
    if (!this.isActive()) return false;
    delete this._cache[table];
    try {
      const res = await fetch(this.APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          table, action: 'clear_and_import',
          records, headers, key: this.SECRET_KEY
        })
      });
      const json = await res.json();
      return json.success === true;
    } catch(e) {
      console.warn('[SheetsDB] Erreur import:', e.message);
      return false;
    }
  },

  // ─────────────────────────────────────────────────────────────
  // INITIALISATION — Pousse les données actuelles vers Sheets
  // ─────────────────────────────────────────────────────────────
  async initializeSheets(clientsData, commandesData, devisData) {
    if (!this.isActive()) {
      console.warn('[SheetsDB] APPS_SCRIPT_URL non configuré');
      return false;
    }
    console.log('[SheetsDB] Initialisation des Sheets en cours...');

    const clientHeaders = ['id','nom','email','password','contact','tel','adresse','secteur','segment','avatar','ca_mensuel','nb_commandes_mois','derniere_commande','role','actif'];
    const cmdHeaders    = ['id','client_id','produit','config','montant_ht','tva','montant_ttc','statut','date','delai','fichier','fichier_statut','note'];
    const devisHeaders  = ['id','client_id','produit','config','montant_ht','tva','montant_ttc','statut','date','expiry','commande_id','note'];

    const [r1, r2, r3] = await Promise.all([
      this.bulkImport('clients',   clientsData,   clientHeaders),
      this.bulkImport('commandes', commandesData, cmdHeaders),
      this.bulkImport('devis',     devisData,     devisHeaders),
    ]);

    console.log(`[SheetsDB] Init: clients=${r1}, commandes=${r2}, devis=${r3}`);
    return r1 && r2 && r3;
  }
};

window.SheetsDB = SheetsDB;
