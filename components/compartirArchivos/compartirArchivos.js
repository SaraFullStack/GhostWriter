document.addEventListener('DOMContentLoaded', () => {
  // Datos simulados (podrías recibirlos via API o postMessage)
  const archivosRecibidos = {
    "2025-08-05": ['foto1.jpg', 'documento.pdf', 'video.mp4'],
    "2025-08-04": ['informe.docx', 'imagen.png'],
    "2025-08-03": ['presentacion.pptx', 'foto2.webp']
  };

  const carpetasDiv = document.getElementById('carpetas');
  const archivosDiv = document.getElementById('archivos');
  const listaArchivos = document.getElementById('listaArchivos');
  const btnVolver = document.getElementById('btnVolver');

  function mostrarFechas() {
    listaArchivos.innerHTML = '';
    carpetasDiv.innerHTML = '';

    Object.keys(archivosRecibidos)
      .sort((a, b) => new Date(b) - new Date(a))
      .forEach(fecha => {
        const btn = document.createElement('button');
        btn.textContent = fecha;
        btn.className = 'w-full text-left px-4 py-2 bg-gray-100 rounded hover:bg-gray-200';
        btn.addEventListener('click', () => mostrarArchivosPorFecha(fecha));
        carpetasDiv.appendChild(btn);
      });

    carpetasDiv.classList.remove('hidden');
    archivosDiv.classList.add('hidden');
  }

  function mostrarArchivosPorFecha(fecha) {
    listaArchivos.innerHTML = '';
    archivosRecibidos[fecha].forEach(file => {
      const li = document.createElement('li');
      li.textContent = file;
      listaArchivos.appendChild(li);
    });

    carpetasDiv.classList.add('hidden');
    archivosDiv.classList.remove('hidden');
  }

  btnVolver.addEventListener('click', mostrarFechas);

  mostrarFechas();
});
