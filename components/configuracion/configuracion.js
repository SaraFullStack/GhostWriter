document.addEventListener('DOMContentLoaded', () => {
  const selectIdioma = document.getElementById('selectIdioma');
  const btnGuardarIdioma = document.getElementById('btnGuardarIdioma');

  // Cargar idioma guardado o navegador al cargar
  function cargarIdiomaInicial() {
    let idioma = localStorage.getItem('idiomaSeleccionado');
    if (!idioma) {
      const navLang = (navigator.language || navigator.userLanguage).slice(0, 2);
      const soportados = ['es', 'en', 'fr', 'de'];
      idioma = soportados.includes(navLang) ? navLang : 'es';
    }
    selectIdioma.value = idioma;
  }

  btnGuardarIdioma.addEventListener('click', () => {
    const idioma = selectIdioma.value;
    localStorage.setItem('idiomaSeleccionado', idioma);
    // Comunicar al padre para actualizar idioma y cerrar modal
    window.parent.postMessage({ type: 'idiomaCambiado', idioma }, '*');
  });

  cargarIdiomaInicial();
});
