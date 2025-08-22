// ===== CLICK SOUND =====
const clickSound = document.getElementById('clickSound');
document.addEventListener('click', () => {
  // Solo reproducir si está activado en localStorage
  if (localStorage.getItem('clickEnabled') !== 'false') {
    clickSound.currentTime = 0;
    clickSound.play();
  }
});

// ===== AMBIENT SOUND =====
const ambientSound = document.getElementById('ambientSound');
const btnSonido = document.getElementById('btnSonido');

// Cargar configuración inicial desde localStorage
window.addEventListener('load', () => {
  const muted = localStorage.getItem('ambientMuted') === 'true';
  const volume = localStorage.getItem('ambientVolume') || 1;

  ambientSound.muted = muted;
  ambientSound.volume = volume;

  // Ajustar icono al estado guardado
  if (muted) {
    btnSonido.classList.remove('fa-volume-high');
    btnSonido.classList.add('fa-volume-xmark');
  } else {
    btnSonido.classList.remove('fa-volume-xmark');
    btnSonido.classList.add('fa-volume-high');
  }

  // Intentar reproducir (con autoplay policy en browsers)
  ambientSound.play().catch(() => {
    const activarAudio = () => {
      ambientSound.muted = muted;
      ambientSound.play();
      document.removeEventListener('click', activarAudio);
    };
    document.addEventListener('click', activarAudio);
  });
});

// Botón para activar/desactivar sonido ambiente
btnSonido.addEventListener('click', () => {
  ambientSound.muted = !ambientSound.muted;
  localStorage.setItem('ambientMuted', ambientSound.muted);

  if (ambientSound.muted) {
    btnSonido.classList.remove('fa-volume-high');
    btnSonido.classList.add('fa-volume-xmark');
  } else {
    btnSonido.classList.remove('fa-volume-xmark');
    btnSonido.classList.add('fa-volume-high');
  }
});

// ===== OPCIONAL: CONTROL DE VOLUMEN =====
// Si tienes un input range para el volumen:
const slider = document.getElementById('volumenSlider');
if (slider) {
  slider.addEventListener('input', () => {
    ambientSound.volume = slider.value;
    localStorage.setItem('ambientVolume', slider.value);
  });

  // Al cargar, aplicar valor guardado
  const savedVol = localStorage.getItem('ambientVolume');
  if (savedVol !== null) {
    slider.value = savedVol;
    ambientSound.volume = savedVol;
  }
}
