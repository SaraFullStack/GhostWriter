document.addEventListener('DOMContentLoaded', () => {
  
  const systemSoundToggle = document.getElementById('systemSoundToggle');
  const bgSoundToggle = document.getElementById('bgSoundToggle');
  const volumeRange = document.getElementById('volumeRange');
  const volumeValue = document.getElementById('volumeValue');
  const clickSound = document.getElementById('clickSound');
  const bgSound = document.getElementById('bgSound');

  const soundState = {
    system: JSON.parse(localStorage.getItem('soundSystemEnabled') ?? 'true'),
    bg: JSON.parse(localStorage.getItem('soundBgEnabled') ?? 'false'),
    volume: parseInt(localStorage.getItem('soundVolume') ?? '70', 10)
  };

  systemSoundToggle.checked = soundState.system;
  bgSoundToggle.checked = soundState.bg;
  volumeRange.value = soundState.volume;
  volumeValue.textContent = soundState.volume + '%';
  bgSound.volume = soundState.volume / 100;

  function ensureBgPlayback() {
    if (bgSoundToggle.checked) {
      bgSound.play().catch(() => {});
    } else {
      bgSound.pause();
      bgSound.currentTime = 0;
    }
  }

  bgSoundToggle.addEventListener('change', () => {
    localStorage.setItem('soundBgEnabled', bgSoundToggle.checked);
    ensureBgPlayback();
  });

  systemSoundToggle.addEventListener('change', () => {
    localStorage.setItem('soundSystemEnabled', systemSoundToggle.checked);
  });

  volumeRange.addEventListener('input', () => {
    const v = parseInt(volumeRange.value, 10);
    volumeValue.textContent = v + '%';
    bgSound.volume = v / 100;
    localStorage.setItem('soundVolume', v);
  });

  document.addEventListener('click', (e) => {
    const isControl = e.target.closest('input, button, a, label');
    if (systemSoundToggle.checked && isControl) {
      const s = clickSound.cloneNode();
      s.volume = Math.min(1, (parseInt(localStorage.getItem('soundVolume') ?? '70', 10) / 100));
      s.play().catch(() => {});
    }
  }, true);

  ensureBgPlayback();
});
