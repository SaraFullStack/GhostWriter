let wifiConectado = true;
const iconoWifi = document.querySelector('.fa-wifi');
iconoWifi.style.cursor = 'pointer';
iconoWifi.classList.add('text-gray-400');
iconoWifi.classList.remove('text-red-400');

iconoWifi.addEventListener('click', () => {
  wifiConectado = !wifiConectado;
  if (wifiConectado) {
    iconoWifi.classList.remove('text-red-400');
    iconoWifi.classList.add('text-gray-400');
  } else {
    iconoWifi.classList.remove('text-gray-400');
    iconoWifi.classList.add('text-red-400');
  }
});

export { wifiConectado };
