/* SIMPACT B2B — CART.JS v2.1 */
/* Panier, workflow commande, statuts */

const Cart = {
  // Délégue au Storage
  get items() { return Storage.getPanier(); },

  add(config, devis) {
    const item = {
      config: Utils.clone(config),
      devis:  Utils.clone(devis),
      produit_label: Cart._labelProduit(config),
      fichier: null,
      fichier_status: 'manquant'
    };
    Storage.addToPanier(item);
    Notify.success('Ajouté au panier', `${item.produit_label} — ${Utils.tnd(devis.total_ttc)} TTC`);
    Cart._updateBadge();
  },

  remove(panierID) {
    Storage.removeFromPanier(panierID);
    Cart._updateBadge();
    window.dispatchEvent(new CustomEvent('cart:updated'));
  },

  clear() {
    Storage.clearPanier();
    Cart._updateBadge();
  },

  getTotal() {
    return Storage.getPanier().reduce((sum, i) => sum + (i.devis?.total_ht || 0), 0);
  },

  getTotalTTC() {
    return Storage.getPanier().reduce((sum, i) => sum + (i.devis?.total_ttc || 0), 0);
  },

  count() { return Storage.getPanier().length; },

  validerCommande(livraison = 'gratuit', note = '', adresse = '') {
    const items = Storage.getPanier();
    if (items.length === 0) { Notify.warning('Panier vide', 'Ajoutez des produits avant de valider'); return null; }

    const user = Auth.current;
    let totalHT = this.getTotal();
    let fraisLivraison = Pricing.LIVRAISON[livraison] || 0;
    const totalHTFinal = totalHT + fraisLivraison;
    const tva = Utils.round(totalHTFinal * Pricing.TVA);
    const totalTTC = Utils.round(totalHTFinal + tva);

    const commande = {
      id: Utils.genCommandeId(),
      client_id: user.id,
      items: Utils.clone(items),
      produit: items.map(i => i.produit_label).join(', '),
      config: items[0]?.config || {},
      montant_ht: Utils.round(totalHTFinal),
      tva: tva,
      montant_ttc: totalTTC,
      frais_livraison: fraisLivraison,
      livraison: livraison,
      statut: items.some(i => i.fichier_status === 'manquant') ? 'waiting_file' : 'file_received',
      date: new Date().toISOString(),
      delai: Utils.addWorkDays(new Date().toISOString(), 2),
      fichier: null,
      fichier_statut: 'manquant',
      note: note,
      adresse_livraison: adresse
    };

    Storage.addCommande(commande);
    Storage.clearPanier();
    Cart._updateBadge();
    Notify.success('Commande validée !', `N° ${commande.id} — Vous recevrez une confirmation.`);
    return commande;
  },

  _labelProduit(config) {
    const produits = { flyer:'Flyer', carte_visite:'Carte de visite', depliant:'Dépliant', brochure:'Brochure', livre_nb:'Livre N&B', entete:'En-tête', affiche:'Affiche' };
    const formats = { a4:'A4', a5:'A5', seize23:'16×23', a3:'A3', a3plus:'A3+', carte_visite:'8.5×5.5' };
    return `${produits[config.produit] || config.produit} ${formats[config.format] || config.format} ×${config.quantite}`;
  },

  _updateBadge() {
    const count = Cart.count();
    document.querySelectorAll('[data-cart-badge]').forEach(b => {
      b.textContent = count;
      b.classList.toggle('hidden', count === 0);
    });
  }
};

window.Cart = Cart;
