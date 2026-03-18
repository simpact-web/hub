/* SIMPACT B2B — APP.JS v3.1 — CART-SAFE */
/* Utilitaires UI — PAS d'init automatique (chaque page gère son propre init) */

const App = {

    // Appeler depuis chaque page APRÈS Storage.init() et Auth.init()
    setupUI() {
          App._updateUserUI();
          App._highlightNav();
          Auth.refresh();

      // Logout
      document.querySelectorAll('[data-logout]').forEach(el => {
              el.addEventListener('click', e => { e.preventDefault(); Auth.logout(); });
      });

      // Mobile burger
      const burger  = document.getElementById('burger-btn');
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

      // Dropdowns
      document.addEventListener('click', e => {
              const toggle = e.target.closest('[data-dropdown]');
              if (toggle) {
                        const dd = toggle.closest('.dropdown');
                        document.querySelectorAll('.dropdown.open').forEach(d => {
                                    if(d !== dd) d.classList.remove('open');
                        });
                        dd?.classList.toggle('open');
                        e.stopPropagation();
              } else {
                        document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
              }
      });

      // Fermer modals sur overlay click
      document.querySelectorAll('.modal-overlay').forEach(ov => {
              ov.addEventListener('click', e => {
                        if (e.target === ov) ov.classList.remove('active');
              });
      });

      Notify.init();
    },

    _updateUserUI() {
          const user = Auth.current;
          if (!user) return;
          document.querySelectorAll('[data-user-avatar]').forEach(el => el.textContent = user.avatar || '?');
          document.querySelectorAll('[data-user-name]').forEach(el => el.textContent = user.contact || user.nom);
          document.querySelectorAll('[data-user-role]').forEach(el => el.textContent = user.role);
          document.querySelectorAll('[data-user-nom]').forEach(el => el.textContent = user.nom);
          document.querySelectorAll('[data-user-prenom]').forEach(el => {
                  el.textContent = (user.contact || user.nom || '').split(' ')[0];
          });
          if (user.segment) {
                  document.querySelectorAll('[data-user-segment]').forEach(el => {
                            el.textContent = Utils.segmentLabel(user.segment);
                            el.className = 'user-segment ' + Utils.segmentClass(user.segment);
                  });
          }
          // Cart badge — uniquement sur les pages client qui chargent cart.js
      if (window.Cart && typeof Cart._updateBadge === 'function') {
              Cart._updateBadge();
      }
    },

    _highlightNav() {
          const path = window.location.pathname;
          document.querySelectorAll('.nav-item[href]').forEach(item => {
                  const href = item.getAttribute('href') || '';
                  if (!href || href === '#') return;
                  const pageName = href.split('/').pop().replace('.html','');
                  const isActive = pageName && path.includes(pageName);
                  item.classList.toggle('active', isActive);
          });
    },

    // ── Modals ──
    openModal(id) {
          const el = document.getElementById(id);
          if (el) { el.classList.add('active'); }
    },
    closeModal(id) {
          const el = document.getElementById(id);
          if (el) { el.classList.remove('active'); }
    },

    // ── Slide panels ──
    openPanel(id) {
          document.getElementById(id)?.classList.add('open');
          document.getElementById(id + '-overlay')?.classList.add('open');
    },
    closePanel(id) {
          document.getElementById(id)?.classList.remove('open');
          document.getElementById(id + '-overlay')?.classList.remove('open');
    },

    // ── Helper path depuis SIMPACT_ROOT ──
    url(rel) { return (window.SIMPACT_ROOT || Auth._detectRoot()) + rel; }
};

window.App = App;
