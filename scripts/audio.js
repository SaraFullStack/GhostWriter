const clickSound = document.getElementById('clickSound');

document.addEventListener('click', () => {
  clickSound.currentTime = 0;
  clickSound.play();
});
 window.addEventListener('load', () => {
      const ambientSound = document.getElementById('ambientSound');
      ambientSound.play().then(() => {
        ambientSound.muted = false;
      }).catch(() => {
        const activarAudio = () => {
          ambientSound.muted = false;
          ambientSound.play();
          document.removeEventListener('click', activarAudio);
        };
        document.addEventListener('click', activarAudio);
      });
    });

const ambientSound = document.getElementById('ambientSound');
const btnSonido = document.getElementById('btnSonido');

btnSonido.addEventListener('click', () => {
  ambientSound.muted = !ambientSound.muted;
  if (ambientSound.muted) {
    btnSonido.classList.remove('fa-volume-high');
    btnSonido.classList.add('fa-volume-xmark');
  } else {
    btnSonido.classList.remove('fa-volume-xmark');
    btnSonido.classList.add('fa-volume-high');
  }
});
