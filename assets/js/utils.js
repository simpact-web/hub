/* SIMPACT B2B — UTILS.JS v2.1 */
/* Helpers : TND, dates, validation, formatage */

const Utils = {

  // ── Formatage TND ──
  tnd(montant, decimales = 3) {
    if (montant === null || montant === undefined || isNaN(montant)) return '—';
    return new Intl.NumberFormat('fr-TN', {
      minimumFractionDigits: decimales,
      maximumFractionDigits: decimales
    }).format(montant) + ' TND';
  },

  tndShort(montant) {
    if (montant >= 1000) return (montant / 1000).toFixed(1).replace('.0','') + 'k TND';
    return this.tnd(montant, 0);
  },

  // ── Formatage dates ──
  dateFormat(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('fr-TN', { day:'2-digit', month:'short', year:'numeric' });
  },

  dateTime(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('fr-TN', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' });
  },

  relativeTime(iso) {
    if (!iso) return '—';
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1)  return 'À l\'instant';
    if (mins < 60) return `Il y a ${mins} min`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24)  return `Il y a ${hrs}h`;
    const days = Math.floor(hrs / 24);
    if (days < 7)  return `Il y a ${days}j`;
    return this.dateFormat(iso);
  },

  today() {
    return new Date().toISOString().split('T')[0];
  },

  addWorkDays(date, days) {
    const d = new Date(date);
    let added = 0;
    while (added < days) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0 && d.getDay() !== 6) added++;
    }
    return d.toISOString().split('T')[0];
  },

  // ── Validation ──
  isEmail(str) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str); },
  isPhone(str) { return /^[+\d\s()-]{8,}$/.test(str); },
  isNotEmpty(str) { return str && str.trim().length > 0; },

  // ── Strings ──
  initials(nom) {
    if (!nom) return '??';
    return nom.split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase();
  },

  capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  slug(str) {
    return str.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');
  },

  truncate(str, n = 50) {
    if (!str || str.length <= n) return str;
    return str.slice(0, n) + '…';
  },

  // ── Calculs ──
  variation(actuel, precedent) {
    if (!precedent) return 0;
    return ((actuel - precedent) / precedent * 100).toFixed(1);
  },

  pct(valeur, total) {
    if (!total) return 0;
    return Math.round(valeur / total * 100);
  },

  round(n, decimals = 3) {
    return Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },

  // ── IDs ──
  genCommandeId() {
    const year = new Date().getFullYear();
    const n = String(Math.floor(Math.random() * 9000) + 1000);
    return `SC-${year}-${n}`;
  },

  genDevisId() {
    const year = new Date().getFullYear();
    const n = String(Math.floor(Math.random() * 90) + 10);
    return `DEV-${year}-${n}`;
  },

  // ── DOM helpers ──
  $(sel, ctx = document) { return ctx.querySelector(sel); },
  $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; },

  show(el) { if (el) el.classList.remove('hidden'); },
  hide(el) { if (el) el.classList.add('hidden'); },
  toggle(el) { if (el) el.classList.toggle('hidden'); },

  setText(sel, val) {
    const el = document.querySelector(sel);
    if (el) el.textContent = val;
  },

  setHTML(sel, val) {
    const el = document.querySelector(sel);
    if (el) el.innerHTML = val;
  },

  // ── Debounce ──
  debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  // ── Deep clone ──
  clone(obj) { return JSON.parse(JSON.stringify(obj)); },

  // ── Trier un tableau ──
  sortBy(arr, key, desc = false) {
    return [...arr].sort((a, b) => {
      if (a[key] < b[key]) return desc ? 1 : -1;
      if (a[key] > b[key]) return desc ? -1 : 1;
      return 0;
    });
  },

  // ── Status helpers ──
  statusLabel(statut) {
    const map = {
      'waiting_file':  'En attente fichier',
      'file_received': 'Fichier reçu',
      'production':    'En production',
      'finishing':     'Finition',
      'ready':         'Prêt',
      'delivered':     'Livré',
      'cancelled':     'Annulé',
      'pending':       'En attente',
      'accepted':      'Accepté',
      'expired':       'Expiré'
    };
    return map[statut] || statut;
  },

  statusClass(statut) {
    const map = {
      'waiting_file':  'status-waiting-file',
      'file_received': 'status-file-received',
      'production':    'status-production',
      'finishing':     'status-finishing',
      'ready':         'status-ready',
      'delivered':     'status-delivered',
      'cancelled':     'status-cancelled',
      'pending':       'status-pending',
      'accepted':      'status-accepted',
      'expired':       'status-expired'
    };
    return map[statut] || 'badge-default';
  },

  segmentLabel(seg) {
    const map = { standard:'Standard', bronze:'Bronze', silver:'Silver', gold:'Gold', platinum:'Platinum' };
    return map[seg] || seg;
  },

  segmentClass(seg) {
    const map = { standard:'badge-standard', bronze:'badge-bronze', silver:'badge-silver', gold:'badge-gold', platinum:'badge-platinum' };
    return map[seg] || 'badge-default';
  },

  // ── Local helpers ──
  formatBytes(bytes) {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B','KB','MB','GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
};

// Export global
window.Utils = Utils;
