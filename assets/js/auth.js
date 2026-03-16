/* SIMPACT B2B — AUTH.JS v3.0 — FIXED */
/* Authentification robuste — pas de _resolvePath fragile */

const Auth = {
  SESSION_KEY: 'simpact_session',
  SESSION_TTL: 8 * 60 * 60 * 1000,
  current: null,

  init() {
    this.current = this.getSession();
    return this;
  },

  async login(email, password) {
    if (!Storage._data) await Storage.init();
    let user = Storage.findClientByEmail(email);
    if (!user) user = Storage.findAdminByEmail(email);
    if (!user || user.password !== password) throw new Error('Email ou mot de passe incorrect');
    if (user.actif === false) throw new Error('Compte désactivé — contactez Simpact');
    const session = {
      id: user.id, email: user.email, nom: user.nom,
      contact: user.contact || user.nom, role: user.role,
      segment: user.segment || null,
      avatar: user.avatar || (user.nom||'?').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase(),
      loginAt: Date.now(), expiry: Date.now() + this.SESSION_TTL
    };
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    this.current = session;
    return session;
  },

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
    this.current = null;
    window.location.href = Auth._url('pages/login.html');
  },

  getSession() {
    try {
      const raw = localStorage.getItem(this.SESSION_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (Date.now() > s.expiry) { localStorage.removeItem(this.SESSION_KEY); return null; }
      return s;
    } catch { return null; }
  },

  isLoggedIn() { return this.current !== null; },
  isAdmin()    { return this.current?.role === 'ADMIN'; },
  isClient()   { return ['CLIENT','AGENCE'].includes(this.current?.role); },

  // Guard robuste — empêche les boucles
  guard(requiredRole = null) {
    const currentPath = window.location.pathname;
    // Si déjà sur login.html, ne pas rediriger
    if (currentPath.includes('login.html')) return true;

    if (!this.isLoggedIn()) {
      window.location.replace(Auth._url('pages/login.html'));
      return false;
    }
    if (requiredRole === 'ADMIN' && !this.isAdmin()) {
      window.location.replace(Auth._url('pages/client/dashboard.html'));
      return false;
    }
    if (requiredRole === 'CLIENT' && this.isAdmin()) {
      window.location.replace(Auth._url('pages/admin/dashboard.html'));
      return false;
    }
    return true;
  },

  redirectAfterLogin() {
    if (this.isAdmin()) window.location.replace(Auth._url('pages/admin/dashboard.html'));
    else window.location.replace(Auth._url('pages/client/dashboard.html'));
  },

  // Résolution d'URL robuste — utilise window.SIMPACT_ROOT déclaré dans chaque page
  _url(path) {
    const root = window.SIMPACT_ROOT || Auth._detectRoot();
    return root + path;
  },

  // Détection robuste — fonctionne pour TOUT nom de dossier et GitHub Pages
  _detectRoot() {
    const p = window.location.pathname;
    // Si l'URL contient /pages/, tout ce qui est avant est la racine
    if (p.includes('/pages/')) {
      return p.slice(0, p.indexOf('/pages/')) + '/';
    }
    // Sinon enlever le nom de fichier
    return p.replace(/\/[^\/]*$/, '/') || '/';
  },

  refresh() {
    if (this.current) {
      this.current.expiry = Date.now() + this.SESSION_TTL;
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(this.current));
    }
  }
};

window.Auth = Auth;
