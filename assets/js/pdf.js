/* SIMPACT B2B — PDF.JS v2.1 */
/* Génération bon de commande via window.print() */
const PDF = {

  genererBonCommande(commandeId) {
    const commande = Storage.getCommande(commandeId) || Storage.getDevisItem(commandeId);
    if (!commande) { Notify.error('Erreur','Commande introuvable'); return; }
    const client = Storage.getClient(commande.client_id);
    const user = Auth.current;
    const today = Utils.dateFormat(new Date().toISOString());

    const printWin = window.open('', '_blank', 'width=800,height=900');
    printWin.document.write(PDF._htmlBonCommande(commande, client, today));
    printWin.document.close();
    setTimeout(() => { printWin.focus(); printWin.print(); }, 500);
  },

  _htmlBonCommande(commande, client, today) {
    const montants = commande.montant_ht ? `
      <tr><td>Sous-total HT</td><td class="right">${Utils.tnd(commande.montant_ht)}</td></tr>
      <tr><td>TVA 19%</td><td class="right">${Utils.tnd(commande.tva)}</td></tr>
      <tr class="total-row"><td><strong>TOTAL TTC</strong></td><td class="right mono"><strong>${Utils.tnd(commande.montant_ttc)}</strong></td></tr>
    ` : '';
    const config = commande.config || {};
    const configStr = Object.entries(config).map(([k,v]) => `${k}: ${v}`).join(' | ');

    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Bon de commande ${commande.id}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;color:#212121;background:white;padding:30px;}
  .header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #00B8D4;padding-bottom:20px;margin-bottom:24px;}
  .logo-zone .company{font-size:22px;font-weight:900;letter-spacing:.02em;color:#1a1a1a;}
  .logo-zone .tagline{font-size:10px;color:#9E9E9E;margin-top:2px;}
  .logo-zone .coords{margin-top:8px;font-size:10px;color:#616161;line-height:1.6;}
  .doc-info{text-align:right;}
  .doc-type{font-size:18px;font-weight:800;color:#00B8D4;margin-bottom:8px;}
  .doc-num{font-size:14px;font-weight:700;color:#1a1a1a;}
  .doc-date{font-size:10px;color:#9E9E9E;margin-top:4px;}
  .section{margin-bottom:20px;}
  .section-title{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9E9E9E;margin-bottom:8px;padding-bottom:4px;border-bottom:1px solid #EEE;}
  .client-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  .field-label{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#BDBDBD;margin-bottom:2px;}
  .field-value{font-size:11px;color:#212121;font-weight:500;}
  table{width:100%;border-collapse:collapse;margin-top:8px;}
  th{background:#F5F5F5;padding:9px 12px;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#9E9E9E;text-align:left;border-bottom:2px solid #EEE;}
  td{padding:11px 12px;border-bottom:1px solid #F5F5F5;font-size:11px;color:#424242;vertical-align:top;}
  td.right{text-align:right;}
  .mono{font-family:'Courier New',monospace;}
  .total-row td{background:#F0FDFF;font-size:13px;border-top:2px solid #00B8D4;color:#0097A7;}
  .footer{margin-top:32px;padding-top:16px;border-top:1px solid #EEE;display:flex;justify-content:space-between;align-items:flex-end;}
  .mention{font-size:9px;color:#BDBDBD;line-height:1.5;max-width:400px;}
  .signature-zone{text-align:right;font-size:10px;color:#9E9E9E;}
  .non-fiscal{display:inline-block;margin-top:8px;padding:4px 12px;border:1.5px solid #EEE;border-radius:4px;font-size:9px;font-weight:700;color:#9E9E9E;text-transform:uppercase;letter-spacing:.1em;}
  @media print{body{padding:0;}}
</style></head><body>
<div class="header">
  <div class="logo-zone">
    <div class="company">◆ SIMPACT</div>
    <div class="tagline">Vos projets, notre expertise</div>
    <div class="coords">
      Rue de la Liberté, Tunis 1002<br>
      Tél : +216 71 000 000 · contact@simpact.tn<br>
      MF : 1234567/A/M/000
    </div>
  </div>
  <div class="doc-info">
    <div class="doc-type">BON DE COMMANDE</div>
    <div class="doc-num">${commande.id}</div>
    <div class="doc-date">Émis le ${today}</div>
    ${commande.statut === 'pending' ? '<div style="margin-top:6px;font-size:10px;color:#FF9800;font-weight:700;">DEVIS — EN ATTENTE DE VALIDATION</div>' : ''}
  </div>
</div>
<div class="section">
  <div class="section-title">Informations client</div>
  <div class="client-grid">
    <div>
      <div class="field-label">Raison sociale</div>
      <div class="field-value">${client?.nom || 'N/D'}</div>
      <div class="field-label" style="margin-top:8px">Adresse</div>
      <div class="field-value">${client?.adresse || 'N/D'}</div>
    </div>
    <div>
      <div class="field-label">Contact</div>
      <div class="field-value">${client?.contact || 'N/D'}</div>
      <div class="field-label" style="margin-top:8px">Email / Tél</div>
      <div class="field-value">${client?.email || ''}<br>${client?.tel || ''}</div>
    </div>
  </div>
</div>
<div class="section">
  <div class="section-title">Détail de la commande</div>
  <table>
    <thead><tr><th>Désignation</th><th>Configuration</th><th>Qté</th><th>Délai</th><th class="right">Montant HT</th></tr></thead>
    <tbody>
      <tr>
        <td><strong>${commande.produit || 'Travail d\'impression'}</strong></td>
        <td style="max-width:200px;font-size:10px;color:#757575">${configStr}</td>
        <td>${config.quantite || '—'}</td>
        <td>${Utils.dateFormat(commande.delai) || '—'}</td>
        <td class="right mono">${Utils.tnd(commande.montant_ht)}</td>
      </tr>
    </tbody>
  </table>
  <table style="margin-top:0;width:300px;margin-left:auto;">
    <tbody>${montants}</tbody>
  </table>
</div>
${commande.note ? `<div class="section"><div class="section-title">Instructions spéciales</div><p style="font-size:11px;color:#616161;padding:10px;background:#FAFAFA;border-radius:6px;">${commande.note}</p></div>` : ''}
<div class="footer">
  <div class="mention">
    Ce document est un bon de commande commercial.<br>
    La facturation est émise séparément par Simpact.<br>
    Toute commande validée est ferme et définitive sous réserve du fichier conforme.<br>
    <div class="non-fiscal">Document commercial — Non fiscal</div>
  </div>
  <div class="signature-zone">
    Simpact<br>
    <div style="margin-top:40px;border-top:1px solid #EEE;padding-top:6px;width:160px;">Signature client</div>
  </div>
</div>
</body></html>`;
  }
};
window.PDF = PDF;
