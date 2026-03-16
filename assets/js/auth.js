/* SIMPACT B2B — AUTH.JS v2.2 */
/* Authentification, sessions, roles, guards */

const Auth = {
    SESSION_KEY: 'simpact_session',
    SESSION_TTL: 8 * 60 * 60 * 1000,

    current: null,

    init() {
          this.current = this.getSession();
          return this;
    },

    async login(email, password) {
          let user = Storage.findClientByEmail(email);
          if (!user) user = Storage.findAdminByEmail(email);
          if (!user || user.password !== password) {
                  throw new Error('Email ou mot de passe incorrect');
          }
          if (user.actif === false) {
                  throw new Error('Compte desactive - contactez Simpact');
          }
          const session = {
                  id: user.id,
                  email: user.email,
                  nom: user.nom,
                  contact: user.contact || user.nom,
                  role: user.role,
                  segment: user.segment || null,
                  avatar: user.avatar || Utils.initials(user.nom),
                  loginAt: Date.now(),
                  expiry: Date.now() + this.SESSION_TTL
          };
          localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
          this.current = session;
          return session;
    },

    logout() {
          localStorage.removeItem(this.SESSION_KEY);
          this.current = null;
          window.location.href = this._resolvePath('pages/login.html');
    },

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

    isLoggedIn() { return this.current !== null; },
    isAdmin()    { return this.current?.role === 'ADMIN'; },
    isClient()   { return ['CLIENT','AGENCE'].includes(this.current?.role); },

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

    redirectAfterLogin() {
          if (this.isAdmin()) {
                  window.location.href = this._resolvePath('pages/admin/dashboard.html');
          } else {
                  window.location.href = this._resolvePath('pages/client/dashboard.html');
          }
    },

    _resolvePath(path) {
          const pathname = window.location.pathname;
          let root;
          if (pathname.includes('/pages/')) {
                  root = pathname.split('/pages/')[0] + '/';
          } else if (pathname.match(/\/[^\/]+\.html$/)) {
                  root = pathname.replace(/\/[^\/]+\.html$/, '/');
          } else {
                  root = pathname.replace(/\/$/, '') + '/';
          }
          return window.location.origin + root + path;
    },

    refresh() {
          if (this.current) {
                  this.current.expiry = Date.now() + this.SESSION_TTL;
                  localStorage.setItem(this.SESSION_KEY, JSON.stringify(this.current));
          }
    }
};

window.Auth = Auth;
