const clickSound = document.getElementById('clickSound');

function activarClickSound(doc) {
  if (!doc) return;
  doc.addEventListener('pointerdown', () => {
    if (localStorage.getItem('clickEnabled') !== 'false') {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  });
}

activarClickSound(document);

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


const ambientSound = document.getElementById('ambientSound');
const btnSonido = document.getElementById('btnSonido');

window.addEventListener('load', () => {
  const muted = localStorage.getItem('ambientMuted') === 'true';
  const volume = localStorage.getItem('ambientVolume') || 1;

  ambientSound.muted = muted;
  ambientSound.volume = volume;

  btnSonido.classList.toggle('fa-volume-high', !muted);
  btnSonido.classList.toggle('fa-volume-xmark', muted);

  ambientSound.play().catch(() => {
    const activarAudio = () => {
      ambientSound.muted = muted;
      ambientSound.play();
      document.removeEventListener('pointerdown', activarAudio);
    };
    document.addEventListener('pointerdown', activarAudio);
  });
});

btnSonido.addEventListener('click', () => {
  ambientSound.muted = !ambientSound.muted;
  localStorage.setItem('ambientMuted', ambientSound.muted);

  btnSonido.classList.toggle('fa-volume-high', !ambientSound.muted);
  btnSonido.classList.toggle('fa-volume-xmark', ambientSound.muted);
});

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
