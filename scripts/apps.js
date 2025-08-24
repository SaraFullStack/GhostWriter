import {
  mostrarTopbarFirefox,
  mostrarTopbarGhost,
  mostrarTopbarCompartir,
  mostrarTopbarOriginal,
  mostrarTopbarSettings,
} from './topbar.js';

const APPS = Object.freeze({
  Firefox: {
    src: './components/firefox/firefox.html',
    topbar: mostrarTopbarFirefox,
  },
  Ghost: {
    src: './components/ghost/ghost.html',
    topbar: mostrarTopbarGhost,
  },
  CompartirArchivos: {
    src: './components/shared/shared.html',
    topbar: mostrarTopbarCompartir,
  },
  'Configuración': {
    src: './components/settings/settings.html',
    topbar: mostrarTopbarSettings,
  },
  Correo: {
    src: './components/email/email.html',
    topbar: mostrarTopbarCompartir,
  },
  Actividades: {
    src: './components/actividades/actividades.html',
    topbar: null,
  },
});

const $ = (id) => document.getElementById(id);
const showModal = (src) => {
  const modal = $('modalGeneral');
  const iframe = $('iframeModal');
  iframe.src = src;
  modal.classList.remove('hidden');
};
const hideModal = () => {
  const modal = $('modalGeneral');
  const iframe = $('iframeModal');
  iframe.src = '';
  modal.classList.add('hidden');
};

function abrirApp(nombre) {
  const app = APPS[nombre];

  if (app) {
    showModal(app.src);
    if (typeof app.topbar === 'function') app.topbar();
    return;
  }

  hideModal();
  mostrarTopbarOriginal();
}

function cerrarModalApp() {
  hideModal();
  mostrarTopbarOriginal();
  top.location.reload();
}

window.addEventListener('message', ({ data }) => {
  if (data?.type === 'close:topbar') cerrarModalApp();

  if (data?.type === 'goto:day') {
    cerrarModalApp();
    window.location.href = './components/day/day.html';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const btnCerrarModal = $('btnCerrarModal');
  if (btnCerrarModal) btnCerrarModal.style.display = 'none';

  $('btnTerminarJuego')?.addEventListener('click', () => {
    window.location.replace('./components/end/end.html');
  });
});

window.abrirApp = abrirApp;
window.cerrarModalApp = cerrarModalApp;

export { abrirApp };
