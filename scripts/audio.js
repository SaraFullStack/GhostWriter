// ================= CLICK SOUND =================
const clickSound = document.getElementById('clickSound');

// Función para activar sonido de clic en un documento cualquiera
function activarClickSound(doc) {
  if (!doc) return;
  doc.addEventListener('pointerdown', () => {
    if (localStorage.getItem('clickEnabled') !== 'false') {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  });
}

// Activar en el documento principal
activarClickSound(document);

// Activar también en iframes (del mismo dominio) cuando carguen
window.addEventListener('load', () => {
  document.querySelectorAll('iframe').forEach(iframe => {
    iframe.addEventListener('load', () => {
      try {
        activarClickSound(iframe.contentDocument);
      } catch (e) {
        console.warn("No se pudo enganchar el click dentro del iframe:", e);
      }
    });
  });
});


// ================= AMBIENT SOUND =================
const ambientSound = document.getElementById('ambientSound');
const btnSonido = document.getElementById('btnSonido');

// Configuración inicial desde localStorage
window.addEventListener('load', () => {
  const muted = localStorage.getItem('ambientMuted') === 'true';
  const volume = localStorage.getItem('ambientVolume') || 1;

  ambientSound.muted = muted;
  ambientSound.volume = volume;

  btnSonido.classList.toggle('fa-volume-high', !muted);
  btnSonido.classList.toggle('fa-volume-xmark', muted);

  // Intentar reproducir (autoplay policy)
  ambientSound.play().catch(() => {
    const activarAudio = () => {
      ambientSound.muted = muted;
      ambientSound.play();
      document.removeEventListener('pointerdown', activarAudio);
    };
    document.addEventListener('pointerdown', activarAudio);
  });
});

// Botón activar/desactivar sonido ambiente
btnSonido.addEventListener('click', () => {
  ambientSound.muted = !ambientSound.muted;
  localStorage.setItem('ambientMuted', ambientSound.muted);

  btnSonido.classList.toggle('fa-volume-high', !ambientSound.muted);
  btnSonido.classList.toggle('fa-volume-xmark', ambientSound.muted);
});

// ================= CONTROL DE VOLUMEN (opcional) =================
const slider = document.getElementById('volumenSlider');
if (slider) {
  slider.addEventListener('input', () => {
    ambientSound.volume = slider.value;
    localStorage.setItem('ambientVolume', slider.value);
  });

  const savedVol = localStorage.getItem('ambientVolume');
  if (savedVol !== null) {
    slider.value = savedVol;
    ambientSound.volume = savedVol;
  }
}
