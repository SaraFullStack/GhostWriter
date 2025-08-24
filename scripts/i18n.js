const I18N_SUPPORTED = ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ko'];
const I18N_PATH = '../../i18n';
const I18N_STORAGE_KEY = 'preferredLang';

function resolveInitialLang() {
  const stored = localStorage.getItem(I18N_STORAGE_KEY);
  if (stored && I18N_SUPPORTED.includes(stored)) return stored;
  const nav = (navigator.language || navigator.userLanguage || 'en').slice(0, 2);
  return I18N_SUPPORTED.includes(nav) ? nav : 'en';
}

async function loadLangJSON(lang) {
  const url = `${I18N_PATH}/${lang}.json`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (e) {
    console.warn('[i18n] No se pudo cargar', url, e);
    return null;
  }
}

async function loadMessagesWithFallback(lang) {
  const chain = ['en', lang].filter((v, i, a) => a.indexOf(v) === i);
  let merged = {};
  for (const l of chain) {
    const json = await loadLangJSON(l);
    if (json) merged = { ...merged, ...json };
  }
  return merged;
}

function applyI18n(messages, root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const txt = messages[key] ?? key;
    if (el.tagName.toLowerCase() === 'title') {
      document.title = txt;
    } else {
      el.textContent = txt;
    }
  });

  root.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const attr = el.getAttribute('data-i18n-attr');
    const txt = messages[key] ?? key;
    if (attr) el.setAttribute(attr, txt);
  });
}

const I18N = {
  current: resolveInitialLang(),
  messages: {},

  async setLanguage(lang) {
    if (!I18N_SUPPORTED.includes(lang)) lang = 'en';
    this.current = lang;
    localStorage.setItem(I18N_STORAGE_KEY, lang);
    this.messages = await loadMessagesWithFallback(lang);
    applyI18n(this.messages, document);
    document.documentElement.setAttribute('lang', lang);
    this._markActiveButton(lang);
    this._setSaveEnabled(false);
  },

  async previewLanguage(lang) {
    if (!I18N_SUPPORTED.includes(lang)) return;
    const preview = await loadMessagesWithFallback(lang);
    applyI18n(preview, document);
    document.documentElement.setAttribute('lang', lang);
    this._markActiveButton(lang);
    this._setSaveEnabled(lang !== this.current);
  },

  initLanguageUI() {
    const btns = document.querySelectorAll('.language-btn');
    const save = document.getElementById('btnGuardarIdioma');
    this._markActiveButton(this.current);
    this._setSaveEnabled(false);

    btns.forEach(btn => {
      btn.addEventListener('click', () => this.previewLanguage(btn.dataset.lang));
    });

    save?.addEventListener('click', async () => {
      const active = [...btns].find(b => b.classList.contains('ring-2'));
      const lang = active?.dataset.lang ?? this.current;
      await this.setLanguage(lang);

      top.location.reload();
      window.parent?.postMessage({ type: 'idiomaCambiado', idioma: this.current }, '*');
    });

  },

  _markActiveButton(lang) {
    document.querySelectorAll('.language-btn').forEach(b => {
      const active = b.dataset.lang === lang;
      b.classList.toggle('ring-2', active);
      b.classList.toggle('ring-blue-500', active);
      b.classList.toggle('bg-blue-600/20', active);
    });
  },

  _setSaveEnabled(enabled) {
    const save = document.getElementById('btnGuardarIdioma');
    if (save) save.disabled = !enabled;
  },
};

window.I18N = I18N;

document.addEventListener('DOMContentLoaded', async () => {
  await I18N.setLanguage(I18N.current);
  I18N.initLanguageUI();
});
