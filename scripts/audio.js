(() => {
  'use strict';

  function activarClickSound(doc, clickEl) {
    if (!doc || !clickEl) return;
    doc.addEventListener('pointerdown', () => {
      if (localStorage.getItem('clickEnabled') !== 'false') {
        try {
          clickEl.currentTime = 0;
          clickEl.play();
        } catch (e) {
          console.warn('No se pudo reproducir clickSound:', e);
        }
      }
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    const clickSound = document.getElementById('clickSound');

    if (!clickSound) {
      console.warn('Falta #clickSound en esta página.');
      return;
    }

    // Documento principal
    activarClickSound(document, clickSound);

    // Iframes del mismo origen
    document.querySelectorAll('iframe').forEach((iframe) => {
      iframe.addEventListener('load', () => {
        try {
          const idoc = iframe.contentDocument;
          if (idoc) activarClickSound(idoc, clickSound);
        } catch (e) {
          console.warn('No se pudo enganchar el click dentro del iframe:', e);
        }
      });
    });
  });
})();
