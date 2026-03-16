/* SIMPACT B2B — NOTIFICATIONS.JS v2.1 */
const Notify = {
  container: null,

  init() {
    this.container = document.getElementById('toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
    return this;
  },

  show(type, title, message = '', duration = 4000) {
    if (!this.container) this.init();
    const icons = { success:'✓', error:'✕', warning:'⚠', info:'ℹ' };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || 'ℹ'}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        ${message ? `<div class="toast-message">${message}</div>` : ''}
      </div>
      <button class="toast-close" onclick="this.closest('.toast').remove()">✕</button>
    `;
    this.container.appendChild(toast);
    if (duration > 0) setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all .3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
    return toast;
  },

  success(title, message, duration) { return this.show('success', title, message, duration); },
  error(title, message, duration)   { return this.show('error', title, message, duration); },
  warning(title, message, duration) { return this.show('warning', title, message, duration); },
  info(title, message, duration)    { return this.show('info', title, message, duration); }
};
window.Notify = Notify;
