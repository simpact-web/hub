/* SIMPACT B2B — AUTH.JS v2.2 */
/* Authentification, sessions, rôles, guards */

const Auth = {
  SESSION_KEY: 'simpact_session',
  SESSION_TTL: 8 * 60 * 60 * 1000, // 8h en ms

  // ── Utilisateur courant ──
  current: null,

  // ── Initialisation ──
  init() {
    this.current = this.getSession();
    return this;
  },

  // ── Login ──
  async login(email, password) {
    // Chercher dans les clients
    let user = Storage.findClientByEmail(email);
    if (!user) user = Storage.findAdminByEmail(email);

    if (!user || user.password !== password) {
      throw new Error('Email ou mot de passe incorrect');
    }
    if (user.actif === false) {
      throw new Error('Compte désactivé — contactez Simpact');
    }

    const session = {
      id:       user.id,
      email:    user.email,
      nom:      user.nom,
      contact:  user.contact || user.nom,
      role:     user.role,
      segment:  user.segment || null,
      avatar:   user.avatar || Utils.initials(user.nom),
      loginAt:  Date.now(),
      expiry:   Date.now() + this.SESSION_TTL
    };

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    this.current = session;
    return session;
  },

  // ── Logout ──
  logout() {
    localStorage.removeItem(this.SESSION_KEY);
    this.current = null;
    window.location.href = this._resolvePath('pages/login.html');
  },

  // ── Récupérer la session ──
  getSession() {
    try {
      const raw = localStorage.getItem(this.SESSION_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (Date.now() > s.expiry) {
        localStorage.removeItem(this.SESSION_KEY);
        return null;
      }
      return s;
    } catch {
      return null;
    }
  },

  // ── Vérifications ──
  isLoggedIn() { return this.current !== null; },
  isAdmin()    { return this.current?.role === 'ADMIN'; },
  isClient()   { return ['CLIENT','AGENCE'].includes(this.current?.role); },

  // ── Guard de route ──
  guard(requiredRole = null) {
    if (!this.isLoggedIn()) {
      window.location.href = this._resolvePath('pages/login.html');
      return false;
    }
    if (requiredRole === 'ADMIN' && !this.isAdmin()) {
      window.location.href = this._resolvePath('pages/client/dashboard.html');
      return false;
    }
    if (requiredRole === 'CLIENT' && this.isAdmin()) {
      window.location.href = this._resolvePath('pages/admin/dashboard.html');
      return false;
    }
    return true;
  },

  // ── Redirect après login ──
  redirectAfterLogin() {
    if (this.isAdmin()) {
      window.location.href = this._resolvePath('pages/admin/dashboard.html');
    } else {
      window.location.href = this._resolvePath('pages/client/dashboard.html');
    }
  },

  // ── Résolution chemin (compatible GitHub Pages) ──
  _resolvePath(path) {
    // Trouver le chemin racine du projet
    const loc = window.location.pathname;
    // Compter combien de niveaux remonter
    const parts = loc.split('/').filter(Boolean);
    // Enlever 'index.html' si présent
    const clean = parts[parts.length-1]?.includes('.html') ? parts.slice(0,-1) : parts;
    // Trouver la racine du projet
    const projRoot = clean.includes('simpact-b2b') ? 
      loc.substring(0, loc.indexOf('simpact-b2b') + 'simpact-b2b'.length) + '/' : 
      '/';
    return projRoot + path;
  },

  // ── Rafraîchir l'expiry ──
  refresh() {
    if (this.current) {
      this.current.expiry = Date.now() + this.SESSION_TTL;
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(this.current));
    }
  }
};

window.Auth = Auth;
