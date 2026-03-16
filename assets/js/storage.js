/* SIMPACT B2B — STORAGE.JS v2.1 */
/* Abstraction données : localStorage + données de démo */

const Storage = {
    _data: null,
    _pricing: null,
    DATA_KEY: 'simpact_data',

    // ── Résolution base URL (compatible GitHub Pages /hub/ et local) ──
    _getBaseUrl() {
          const path = window.location.pathname;
          if (path.includes('/pages/')) {
                  return window.location.origin + path.split('/pages/')[0] + '/';
          }
          return window.location.origin + path.replace(/\/[^\/]*$/, '/').replace(/\/pages\/.*/, '/');
    },

    // ── Initialisation ──
    async init() {
          // Charger les données de démo depuis le JSON
      try {
              const base = this._getBaseUrl();
              const [demoRes, pricingRes] = await Promise.all([
                        fetch(base + 'data/demo_data.json'),
                        fetch(base + 'data/pricing_matrix.json')
                      ]);
              const demo = await demoRes.json();
              this._pricing = await pricingRes.json();

            // Vérifier si on a des données sauvegardées
            const saved = localStorage.getItem(this.DATA_KEY);
              if (saved) {
                        this._data = JSON.parse(saved);
                        // Fusionner les nouvelles clés du demo si manquantes
                if (!this._data.clients) this._data.clients = demo.clients;
                        if (!this._data.admins) this._data.admins = demo.admins;
              } else {
                        this._data = Utils.clone(demo);
                        this._save();
              }
      } catch(e) {
              console.error('Erreur chargement données:', e);
              this._data = { clients:[], admins:[], commandes:[], devis:[], kpis:{}, stocks:[], fichiers:[] };
      }
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
          location.reload();
    },

    // ── Clients ──
    getClients() { return this._data.clients || []; },
    getClient(id) { return this._data.clients.find(c => c.id === id); },
    findClientByEmail(email) { return this._data.clients.find(c => c.email === email); },
    addClient(client) { this._data.clients.push(client); this._save(); },
    updateClient(id, updates) {
          const idx = this._data.clients.findIndex(c => c.id === id);
          if (idx >= 0) { this._data.clients[idx] = { ...this._data.clients[idx], ...updates }; this._save(); }
    },

    // ── Admins ──
    getAdmins() { return this._data.admins || []; },
    findAdminByEmail(email) { return this._data.admins.find(a => a.email === email); },

    // ── Commandes ──
    getCommandes(clientId = null) {
          const cmds = this._data.commandes || [];
          return clientId ? cmds.filter(c => c.client_id === clientId) : cmds;
    },
    getCommande(id) { return this._data.commandes.find(c => c.id === id); },
    addCommande(commande) { this._data.commandes.unshift(commande); this._save(); return commande; },
    updateCommande(id, updates) {
          const idx = this._data.commandes.findIndex(c => c.id === id);
          if (idx >= 0) { this._data.commandes[idx] = { ...this._data.commandes[idx], ...updates }; this._save(); }
    },

    // ── Devis ──
    getDevis(clientId = null) {
          const devis = this._data.devis || [];
          return clientId ? devis.filter(d => d.client_id === clientId) : devis;
    },
    getDevisItem(id) { return this._data.devis.find(d => d.id === id); },
    addDevis(devis) { this._data.devis.unshift(devis); this._save(); return devis; },
    updateDevis(id, updates) {
          const idx = this._data.devis.findIndex(d => d.id === id);
          if (idx >= 0) { this._data.devis[idx] = { ...this._data.devis[idx], ...updates }; this._save(); }
    },

    // ── KPIs ──
    getKPIs() { return this._data.kpis || {}; },

    // ── Stocks ──
    getStocks() { return this._data.stocks || []; },
    updateStock(ref, updates) {
          const idx = this._data.stocks.findIndex(s => s.ref === ref);
          if (idx >= 0) { this._data.stocks[idx] = { ...this._data.stocks[idx], ...updates }; this._save(); }
    },

    // ── Fichiers ──
    getFichiers(clientId = null) {
          const files = this._data.fichiers || [];
          return clientId ? files.filter(f => f.client_id === clientId) : files;
    },
    addFichier(fichier) { this._data.fichiers.unshift(fichier); this._save(); },

    // ── Pricing ──
    getPricing() { return this._pricing; },

    // ── Panier (session uniquement) ──
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
          const badge = document.querySelector('[data-cart-badge]');
          if (badge) {
                  const count = this._panier.length;
                  badge.textContent = count;
                  badge.classList.toggle('hidden', count === 0);
          }
          window.dispatchEvent(new CustomEvent('panier:changed', { detail: this._panier }));
    },

    // ── Modèles sauvegardés ──
    getModeles(clientId) {
          const key = `simpact_modeles_${clientId}`;
          try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
    },
    saveModele(clientId, modele) {
          const key = `simpact_modeles_${clientId}`;
          const modeles = this.getModeles(clientId);
          modele.id = 'MDL_' + Date.now();
          modele.date = new Date().toISOString();
          modeles.unshift(modele);
          localStorage.setItem(key, JSON.stringify(modeles.slice(0, 20)));
          return modele;
    },
    deleteModele(clientId, id) {
          const key = `simpact_modeles_${clientId}`;
          const modeles = this.getModeles(clientId).filter(m => m.id !== id);
          localStorage.setItem(key, JSON.stringify(modeles));
    }
};

window.Storage = Storage;
