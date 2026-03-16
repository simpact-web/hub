/* SIMPACT B2B — APP.JS v2.1 */
/* Router SPA, navigation, init globale */

const App = {
  currentPage: null,

  async init() {
    // Init données
    await Storage.init();

    // Init auth
    Auth.init();

    // Init notifications
    Notify.init();

    // Mise à jour UI utilisateur dans sidebar
    App._updateUserUI();

    // Activer nav item courant
    App._highlightNav();

    // Refresh session
    Auth.refresh();

    // Bind logout
    document.querySelectorAll('[data-logout]').forEach(el => {
      el.addEventListener('click', e => { e.preventDefault(); Auth.logout(); });
    });

    // Bind mobile burger
    const burger = document.getElementById('burger-btn');
    const sidebar = document.getElementById('app-sidebar');
    const overlay = document.getElementById('mobile-overlay');
    if (burger) {
      burger.addEventListener('click', () => {
        sidebar?.classList.toggle('mobile-open');
        overlay?.classList.toggle('open');
      });
      overlay?.addEventListener('click', () => {
        sidebar?.classList.remove('mobile-open');
        overlay?.classList.remove('open');
      });
    }

    // Bind modals (fermer sur overlay)
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) App.closeModal(overlay.id);
      });
    });

    // Bind accordéons
    document.querySelectorAll('.accordion-header').forEach(h => {
      h.addEventListener('click', () => {
        const body = h.nextElementSibling;
        const isOpen = body?.classList.contains('open');
        document.querySelectorAll('.accordion-body.open').forEach(b => {
          b.classList.remove('open');
          b.previousElementSibling?.classList.remove('active');
        });
        if (!isOpen && body) {
          body.classList.add('open');
          h.classList.add('active');
        }
      });
    });

    // Bind dropdowns
    document.addEventListener('click', e => {
      const toggle = e.target.closest('[data-dropdown]');
      if (toggle) {
        const dd = toggle.closest('.dropdown');
        document.querySelectorAll('.dropdown.open').forEach(d => { if(d !== dd) d.classList.remove('open'); });
        dd?.classList.toggle('open');
        e.stopPropagation();
      } else {
        document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
      }
    });

    // Init tabs
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        if (!target) return;
        const group = tab.closest('[data-tabs]');
        if (group) {
          group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
          group.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
          tab.classList.add('active');
          const content = group.querySelector(`[data-tab-content="${target}"]`);
          if (content) content.classList.add('active');
        }
      });
    });

    console.log('🖨️ Simpact B2B Portal v2.1 — Ready');
  },

  _updateUserUI() {
    const user = Auth.current;
    if (!user) return;

    // Avatar
    document.querySelectorAll('[data-user-avatar]').forEach(el => el.textContent = user.avatar || '?');
    document.querySelectorAll('[data-user-name]').forEach(el => el.textContent = user.contact || user.nom);
    document.querySelectorAll('[data-user-role]').forEach(el => el.textContent = user.role);
    document.querySelectorAll('[data-user-nom]').forEach(el => el.textContent = user.nom);
    document.querySelectorAll('[data-user-prenom]').forEach(el => el.textContent = (user.contact || user.nom).split(' ')[0]);

    // Segment
    if (user.segment) {
      document.querySelectorAll('[data-user-segment]').forEach(el => {
        el.textContent = Utils.segmentLabel(user.segment);
        el.className = 'user-segment ' + Utils.segmentClass(user.segment);
      });
    }

    // Badge panier
    Cart._updateBadge();
  },

  _highlightNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-item').forEach(item => {
      const href = item.getAttribute('href') || '';
      const isActive = path.endsWith(href) || (href !== '#' && href !== '' && path.includes(href.split('/').pop().replace('.html','')));
      item.classList.toggle('active', isActive);
    });
  },

  // ── Modals ──
  openModal(id) {
    const overlay = document.getElementById(id);
    if (overlay) { overlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
  },

  closeModal(id) {
    const overlay = document.getElementById(id);
    if (overlay) { overlay.classList.remove('active'); document.body.style.overflow = ''; }
  },

  // ── Slide panels ──
  openPanel(id) {
    const panel = document.getElementById(id);
    const overlay = document.getElementById(id + '-overlay');
    panel?.classList.add('open');
    overlay?.classList.add('open');
  },

  closePanel(id) {
    const panel = document.getElementById(id);
    const overlay = document.getElementById(id + '-overlay');
    panel?.classList.remove('open');
    overlay?.classList.remove('open');
  },

  // ── Navigation ──
  navigate(url) { window.location.href = url; },

  // ── Helper chemin relatif ──
  path(rel) {
    const base = document.querySelector('base')?.href || './';
    return base + rel;
  }
};

// Initialiser au DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => App.init());
window.App = App;
