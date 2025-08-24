const btnEnd = document.getElementById('btnEnd');
const modalExit = document.getElementById('modalExit');
const confirmExit = document.getElementById('confirmExit');
const cancelExit = document.getElementById('cancelExit');

btnEnd.addEventListener('click', () => {
  modalExit.classList.remove('hidden');
});

cancelExit.addEventListener('click', () => {
  modalExit.classList.add('hidden');
});

confirmExit.addEventListener('click', () => {
  modalExit.classList.add('hidden');
  window.open('', '_self');
  window.close();
  window.location.href = 'https://sarafullstack.github.io/';
});

export {};
