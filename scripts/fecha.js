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

export { actualizarFecha };
