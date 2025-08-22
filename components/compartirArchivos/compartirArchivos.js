const lang = localStorage.getItem("preferredLang") || "en";
const { COMPARTIR_ARCHIVOS, PRENSA } = await import(`../../const/${lang}/shared.js`);

const contenedorCarpetas = document.getElementById("carpetas");
const contenedorArchivos = document.getElementById("archivos");
const gridArchivos = document.getElementById("gridArchivos");
const btnVolver = document.getElementById("btnVolver");
const modal = document.getElementById("modal");
const modalContenido = document.getElementById("modalContenido");
const modalCerrar = document.getElementById("modalCerrar");

function formatearFecha(fecha) {
  const partes = fecha.split("-");
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function mostrarCarpetas() {
  contenedorCarpetas.innerHTML = "";
  contenedorCarpetas.classList.remove("hidden");
  contenedorArchivos.classList.add("hidden");

  Object.keys(COMPARTIR_ARCHIVOS).forEach(dia => {
    const carpeta = document.createElement("div");
    carpeta.className = "flex flex-col items-center cursor-pointer hover:bg-gray-800 rounded p-4";
    carpeta.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mb-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 7a2 2 0 012-2h5l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
        </svg>
        <span class="text-center text-gray-200 text-sm font-medium truncate max-w-full">${dia}</span>
      `;

    carpeta.onclick = () => mostrarArchivos(dia);
    contenedorCarpetas.appendChild(carpeta);
  });
}

function crearIconoArchivo(archivo) {
  if (archivo.tipo === "imagen") {
    return `<img src="${archivo.url}" alt="${archivo.nombre}" class="w-full h-40 object-cover rounded-lg shadow-md" />`;
  } else if (archivo.tipo === "video") {
    return `
        <div class="w-full h-40 flex items-center justify-center bg-gray-800 rounded-lg shadow-md text-gray-400 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6v12a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z" />
          </svg>
          Video
        </div>
      `;
  } else if (archivo.tipo === "texto") {
    return `
        <div class="w-full h-40 flex flex-col items-center justify-center bg-gray-800 rounded-lg shadow-md text-gray-400 text-center px-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m-6-8h6m-7 8h.01M6 6h12M6 18h12" />
          </svg>
          <span class="truncate">${archivo.nombre}</span>
        </div>
      `;
  } else {
    return `<div>${archivo.nombre}</div>`;
  }
}

function mostrarArchivos(dia) {
  gridArchivos.innerHTML = "";
  contenedorCarpetas.classList.add("hidden");
  contenedorArchivos.classList.remove("hidden");

  const archivos = COMPARTIR_ARCHIVOS[dia];

  const randomPRENSA = PRENSA[Math.floor(Math.random() * PRENSA.length)];

  if (randomPRENSA) {
    const divPRENSA = document.createElement("div");
    divPRENSA.className = "cursor-pointer";
    divPRENSA.innerHTML =
      crearIconoArchivo(randomPRENSA) +
      `<p class="mt-2 text-blue-400 text-center truncate">${randomPRENSA.nombre}</p>`;

    divPRENSA.onclick = () => abrirModal(randomPRENSA);

    gridArchivos.appendChild(divPRENSA);
  }

  if (!archivos || archivos.length === 0) {
    gridArchivos.innerHTML += "<p class='text-gray-400'>No hay archivos en esta carpeta.</p>";
    return;
  }

  archivos.forEach(archivo => {
    const div = document.createElement("div");
    div.className = "cursor-pointer";
    div.innerHTML =
      crearIconoArchivo(archivo) +
      `<p class="mt-2 text-gray-200 text-center truncate">${archivo.nombre}</p>`;

    div.onclick = () => abrirModal(archivo);

    gridArchivos.appendChild(div);
  });
}


function abrirModal(archivo) {
  modalContenido.innerHTML = "";

  if (archivo.tipo === "imagen") {
    modalContenido.innerHTML = `<img src="${archivo.url}" alt="${archivo.nombre}" class="max-w-full max-h-[70vh] rounded" />`;
  } else if (archivo.tipo === "video") {
    modalContenido.innerHTML = `<video src="${archivo.url}" controls autoplay class="max-w-full max-h-[70vh] rounded"></video>`;
  } else if (archivo.tipo === "texto") {
    modalContenido.innerHTML = `
        <pre class="whitespace-pre-wrap text-gray-200 bg-gray-800 p-4 rounded max-h-[70vh] overflow-auto">${archivo.contenido}</pre>
      `;
  } else {
    modalContenido.textContent = "No se puede mostrar este archivo.";
  }

  modal.classList.remove("hidden");
}

modalCerrar.onclick = () => {
  modal.classList.add("hidden");
  modalContenido.innerHTML = "";
};

modal.onclick = e => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    modalContenido.innerHTML = "";
  }
};

btnVolver.onclick = () => {
  mostrarCarpetas();
};

mostrarCarpetas();