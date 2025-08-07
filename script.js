function abrirApp(nombre) {
  const modal = document.getElementById('modalGeneral');
  const iframe = document.getElementById('iframeModal');

  let url = '';
  switch (nombre) {
    case 'Correo': url = './components/email/email.html'; break;
    case 'Ghost': url = './components/ghost/ghost.html'; break;
    case 'Firefox': url = './components/firefox/firefox.html'; break;
    case 'CompartirArchivos': url = './components/compartirArchivos/compartirArchivos.html'; break;
    case 'Configuración': url = './components/configuracion/configuracion.html'; break;
    default:
      alert(`Abriendo ${nombre}...`);
      return;
  }
  iframe.src = url;
  modal.classList.remove('hidden');
}

document.getElementById('btnCerrarModal').addEventListener('click', () => {
  const modal = document.getElementById('modalGeneral');
  const iframe = document.getElementById('iframeModal');
  iframe.src = '';
  modal.classList.add('hidden');
});


// Ejemplo: actualizar fecha en topbar
function actualizarFecha() {
  const topbarDate = document.getElementById('topbar-date');
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const ahora = new Date();
  const dia = ahora.getDate();
  const mes = meses[ahora.getMonth()];
  const horas = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  topbarDate.textContent = `${dia} ${mes} · ${horas}:${minutos}`;
}
setInterval(actualizarFecha, 1000);
actualizarFecha();
