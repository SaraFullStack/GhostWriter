
import { mostrarTopbarFirefox, mostrarTopbarGhost, mostrarTopbarCompartir, mostrarTopbarOriginal, mostrarTopbarConfiguracion } from './topbar.js';

function abrirApp(nombre) {
  const modal = document.getElementById('modalGeneral');
  const iframe = document.getElementById('iframeModal');

  if (nombre === 'Firefox') {
    iframe.src = './components/firefox/firefox.html';
    modal.classList.remove('hidden');
    mostrarTopbarFirefox();
    return;
  }

  if (nombre === 'Ghost') {
    iframe.src = './components/ghost/ghost.html';
    modal.classList.remove('hidden');
    mostrarTopbarGhost();
    return;
  }

  if (nombre === 'CompartirArchivos') {
    iframe.src = './components/compartirArchivos/compartirArchivos.html'; 
    modal.classList.remove('hidden');
    mostrarTopbarCompartir();
    return;
  }
  if (nombre === 'Configuración') {
    iframe.src = './components/configuracion/configuracion.html'; 
    modal.classList.remove('hidden');
    mostrarTopbarConfiguracion();
    return;
  }
    if (nombre === 'Correo') {
    iframe.src = './components/email/email.html'; 
    modal.classList.remove('hidden');
    mostrarTopbarCompartir();
    return;
  }
  if (nombre === 'Actividades') {
    iframe.src = './components/actividades/actividades.html'; 
    modal.classList.remove('hidden');
    return;
  }

  iframe.src = '';
  modal.classList.add('hidden');
  mostrarTopbarOriginal();
}

function cerrarModalApp() {
  const modal = document.getElementById('modalGeneral');
  const iframe = document.getElementById('iframeModal');
  iframe.src = '';
  modal.classList.add('hidden');
  mostrarTopbarOriginal();
}

document.addEventListener('DOMContentLoaded', () => {
  const btnCerrarModal = document.getElementById('btnCerrarModal');
  if (btnCerrarModal) {
    btnCerrarModal.style.display = 'none';
  }
});
window.abrirApp = abrirApp;
window.cerrarModalApp = cerrarModalApp;
