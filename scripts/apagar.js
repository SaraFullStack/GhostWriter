const btnApagar = document.getElementById('btnApagar');
const modalSalir = document.getElementById('modalSalir');
const confirmarSalir = document.getElementById('confirmarSalir');
const cancelarSalir = document.getElementById('cancelarSalir');

btnApagar.addEventListener('click', () => {
  modalSalir.classList.remove('hidden');
});

cancelarSalir.addEventListener('click', () => {
  modalSalir.classList.add('hidden');
});

confirmarSalir.addEventListener('click', () => {
  modalSalir.classList.add('hidden');
  window.open('', '_self');
  window.close();
  window.location.href = 'https://sarafullstack.github.io/';
});

export {};
