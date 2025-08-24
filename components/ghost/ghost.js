const lang = localStorage.getItem("preferredLang") || "en";
const { GHOST, WORDS, TEXTS, WRITE, ERROR_NOT_READY } = await import(`../../const/${lang}/ghost.js`);

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

function getPressKey(dia) {
  return `press_${dia}`;
}

function cargarDatos() {
  const dia = localStorage.getItem('dayGame') || '0';
  const pressKey = getPressKey(dia);
  const tienePrensa = !!localStorage.getItem(pressKey);

  if (!tienePrensa) {
    palabrasDisponibles = [];
    textos = [];
    seleccionadas = [];
    if (palabrasDiv) palabrasDiv.innerHTML = '';
    if (vistaPrevia) vistaPrevia.value = '';
    if (mensaje) {
      mensaje.textContent = ERROR_NOT_READY;
    }
    if (btnEnviar) btnEnviar.disabled = true;
    return; 
  }

  if (btnEnviar) btnEnviar.disabled = false;

  if (GHOST[dia]) {
    palabrasDisponibles = GHOST[dia].palabrasDisponibles;
    textos = GHOST[dia].textos;
  }

  renderPalabras();
  actualizarEstado();
}

function mezclar(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderPalabras() {
  palabrasDiv.innerHTML = '';
  const lista = mezclar([...palabrasDisponibles]);
  lista.forEach(palabra => {
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
  localStorage.setItem('textDay', vistaPrevia.value);

  //SUMAR PUNTOS
  const puntos = Number(localStorage.getItem('points')) || 0;
  localStorage.setItem('points', puntos + PointsDay());

  if (window.parent) {
    window.parent.postMessage({ type: "goto:day" }, "*");
  }
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) cerrarModal();
});

function PointsDay() {
  const dayGame = Number(localStorage.getItem('dayGame')) || 1;
  const dia = Math.max(0, dayGame - 1);

  const ghostDia = GHOST?.[dia];
  if (!ghostDia) return 0;

  const frase = (localStorage.getItem('textDay') || '').trim();
  if (!frase) return 0;

  const textosDia = Array.isArray(ghostDia.textos) ? ghostDia.textos : [];
  const idxTexto = textosDia.findIndex(
    t => (t || '').trim().toLowerCase() === frase.toLowerCase()
  );
  if (idxTexto === -1) return 0;

  const pressKey = getPressKey(dia); 
  const rawId = localStorage.getItem(pressKey);
  if (rawId == null) return 0;
  const pressId = Number(String(rawId).trim());
  if (!Number.isFinite(pressId)) return 0;

  const tabla = ghostDia.Puntuacion; 
  if (!Array.isArray(tabla)) return 0;

  const filaRaw = tabla[idxTexto];
  if (filaRaw == null) return 0;

  const orden = (Array.isArray(filaRaw) ? filaRaw : String(filaRaw).split(','))
    .map(s => Number(String(s).trim()))
    .filter(n => Number.isFinite(n));

  if (!orden.length) return 0;

  const pos = orden.indexOf(pressId);
  if (pos === -1) return 0;

  return orden.length - pos;
}


cargarDatos();
