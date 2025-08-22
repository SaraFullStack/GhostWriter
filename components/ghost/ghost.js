const lang = localStorage.getItem("preferredLang") || "en";
const { GHOST, WORDS, TEXTS, WRITE } = await import(`../../const/${lang}/ghost.js`);


let palabrasDisponibles = [];
let textos = [];
let seleccionadas = [];
let timeoutEscribiendo = null;

const palabrasDiv = document.getElementById('palabras');
const vistaPrevia = document.getElementById('vistaPrevia');
const mensaje = document.getElementById('mensaje');

const KEY_LOCALSTORAGE = 'articulosDelDia';
const btnEnviar = document.getElementById('btnEnviar');
const modal = document.getElementById('confirmModal');
const btnNo = document.getElementById('btnNo');
const btnSi = document.getElementById('btnSi');

function cargarDatos() {
  const dia = localStorage.getItem('dayGame') || '0';
  if (GHOST[dia]) {
    palabrasDisponibles = GHOST[dia].palabrasDisponibles;
    textos = GHOST[dia].textos;
  }

  renderPalabras();
  actualizarEstado();
}

function renderPalabras() {
  palabrasDiv.innerHTML = '';
  palabrasDisponibles.forEach(palabra => {
    const span = document.createElement('span');
    span.textContent = palabra;
    span.className = 'palabra';
    if (seleccionadas.includes(palabra)) span.classList.add('selected');
    span.onclick = () => toggleSeleccion(palabra, span);
    palabrasDiv.appendChild(span);
  });
}

function toggleSeleccion(palabra, element) {
  if (seleccionadas.includes(palabra)) {
    seleccionadas = seleccionadas.filter(p => p !== palabra);
    element.classList.remove('selected');
  } else {
    if (seleccionadas.length < 3) {
      seleccionadas.push(palabra);
      element.classList.add('selected');
    } else {
      return;
    }
  }
  actualizarEstado();
}

function buscarTextoPorPalabras(textos, palabrasSeleccionadas) {
  return textos.find(texto =>
    palabrasSeleccionadas.every(palabra =>
      texto.toLowerCase().includes(palabra.toLowerCase())
    )
  ) || null;
}

function actualizarEstado() {
  if (timeoutEscribiendo) {
    clearTimeout(timeoutEscribiendo);
    timeoutEscribiendo = null;
  }

  if (seleccionadas.length < 3) {
    mensaje.textContent = `${WORDS} (${seleccionadas.length}/3): ${seleccionadas.join(', ')}`;
    vistaPrevia.value = seleccionadas.join(' ');
    return;
  }

  mensaje.textContent = WRITE;
  vistaPrevia.value = "";

  timeoutEscribiendo = setTimeout(() => {
    const textoEncontrado = buscarTextoPorPalabras(textos, seleccionadas);
    if (textoEncontrado) {
      vistaPrevia.value = textoEncontrado;
      mensaje.textContent = TEXTS;
    } else {
      vistaPrevia.value = "ERROR";
      mensaje.textContent = "ERROR";
    }
    timeoutEscribiendo = null;
  }, 1000);
}

function abrirModal() {
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}
function cerrarModal() {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

btnEnviar.addEventListener('click', () => {
  const texto = (vistaPrevia.value || '').trim();
  if (!texto) return;
  abrirModal();
});

btnNo.addEventListener('click', cerrarModal);

btnSi.addEventListener('click', () => {
  const texto = (vistaPrevia.value || '').trim();
  try {
    const existente = JSON.parse(localStorage.getItem(KEY_LOCALSTORAGE)) || [];
    if (!existente.includes(texto)) {
      existente.push(texto);
    }
    localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(existente));
  } catch (e) {
    localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify([texto]));
  }
  const day = Number(localStorage.getItem('dayGame')) || 0;
  localStorage.setItem('dayGame', day + 1);

  if (window.parent) {
    window.parent.postMessage({ type: "goto:day" }, "*");
  }
});


modal.addEventListener('click', (e) => {
  if (e.target === modal) cerrarModal();
});


cargarDatos();
