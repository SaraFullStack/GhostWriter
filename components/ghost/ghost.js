document.addEventListener('DOMContentLoaded', () => {
  let articulos = JSON.parse(localStorage.getItem('miniGhostArticulos') || '[]');
  let config = JSON.parse(localStorage.getItem('miniGhostConfig') || '{"nombreSitio":"Mi Mini Ghost","autor":""}');
  let articuloActualId = null;

  const nombreSitio = document.getElementById('nombreSitio');
  const lista = document.getElementById('lista');
  const editor = document.getElementById('editor');
  const configuracion = document.getElementById('configuracion');

  const btnLista = document.getElementById('btnLista');
  const btnEditor = document.getElementById('btnEditor');
  const btnConfiguracion = document.getElementById('btnConfiguracion');

  const btnGuardarArticulo = document.getElementById('btnGuardarArticulo');
  const btnCancelarEdicion = document.getElementById('btnCancelarEdicion');

  const btnGuardarConfig = document.getElementById('btnGuardarConfig');
  const btnCancelarConfig = document.getElementById('btnCancelarConfig');

  const tituloInput = document.getElementById('tituloArticulo');
  const contenidoInput = document.getElementById('contenidoArticulo');
  const inputNombreSitio = document.getElementById('inputNombreSitio');
  const inputAutor = document.getElementById('inputAutor');
  const listaArticulos = document.getElementById('listaArticulos');

  function actualizarHeader() {
    nombreSitio.textContent = config.nombreSitio;
  }

  function renderListaArticulos() {
    listaArticulos.innerHTML = '';
    if (articulos.length === 0) {
      listaArticulos.innerHTML = '<li>No hay artículos publicados.</li>';
      return;
    }
    articulos.forEach(art => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = art.titulo;
      a.href = '#';
      a.addEventListener('click', e => {
        e.preventDefault();
        mostrarEditor(art.id);
      });
      li.appendChild(a);
      listaArticulos.appendChild(li);
    });
  }

  function mostrarLista() {
    lista.style.display = 'block';
    editor.style.display = 'none';
    configuracion.style.display = 'none';
    renderListaArticulos();
    actualizarHeader();
  }

  function mostrarEditor(id = null) {
    articuloActualId = id;
    lista.style.display = 'none';
    editor.style.display = 'block';
    configuracion.style.display = 'none';

    if (id !== null) {
      const art = articulos.find(a => a.id === id);
      if (art) {
        tituloInput.value = art.titulo;
        contenidoInput.value = art.contenido;
      }
    } else {
      tituloInput.value = '';
      contenidoInput.value = '';
    }
  }

  function mostrarConfiguracion() {
    lista.style.display = 'none';
    editor.style.display = 'none';
    configuracion.style.display = 'block';

    inputNombreSitio.value = config.nombreSitio;
    inputAutor.value = config.autor;
  }

  function guardarArticulo() {
    const titulo = tituloInput.value.trim();
    const contenido = contenidoInput.value.trim();
    if (!titulo || !contenido) {
      alert('Título y contenido son obligatorios');
      return;
    }

    if (articuloActualId !== null) {
      const art = articulos.find(a => a.id === articuloActualId);
      if (art) {
        art.titulo = titulo;
        art.contenido = contenido;
      }
    } else {
      const id = Date.now();
      articulos.push({ id, titulo, contenido });
    }
    localStorage.setItem('miniGhostArticulos', JSON.stringify(articulos));
    mostrarLista();
  }

  function guardarConfiguracion() {
    config.nombreSitio = inputNombreSitio.value.trim() || 'Mi Mini Ghost';
    config.autor = inputAutor.value.trim();
    localStorage.setItem('miniGhostConfig', JSON.stringify(config));
    actualizarHeader();
    mostrarLista();
  }

  btnLista.addEventListener('click', mostrarLista);
  btnEditor.addEventListener('click', () => mostrarEditor(null));
  btnConfiguracion.addEventListener('click', mostrarConfiguracion);

  btnGuardarArticulo.addEventListener('click', guardarArticulo);
  btnCancelarEdicion.addEventListener('click', mostrarLista);

  btnGuardarConfig.addEventListener('click', guardarConfiguracion);
  btnCancelarConfig.addEventListener('click', mostrarLista);

  mostrarLista();
});
