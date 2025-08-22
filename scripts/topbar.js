const topbar = document.getElementById('topbar');

const topbarOriginalHTML = topbar.innerHTML;

const topbarFirefoxHTML = `
<header class="bg-gray-900 h-12 flex items-center px-4 shadow-md w-full" style="background-color: #2e323a;">
  <div class="flex space-x-3 items-center text-white">
    <button aria-label="" i18n="firefox.reload" id="btnRecargar"
      class="text-gray-400 hover:text-white text-2xl font-bold cursor-pointer select-none">⟳</button>
  </div>
  <div class="flex-grow mx-4 bg-gray-800 rounded-md px-3 py-1 text-gray-300 font-mono text-sm select-none truncate pointer-events-none cursor-not-allowed">
    daily-summary.es
  </div>
  <button id="btnCerrarModal" aria-label="" i18n="firefox.close"
    class="text-gray-400 hover:text-white text-2xl font-bold cursor-pointer select-none">×</button>
</header>
`;


function mostrarTopbarFirefox() {
  topbar.classList.add('app');          
  topbar.innerHTML = topbarFirefoxHTML;

  const btnCerrar = document.getElementById('btnCerrarModal');
  if (btnCerrar) btnCerrar.onclick = () => window.cerrarModalApp();

  const btnRecargar = document.getElementById('btnRecargar');
  if (btnRecargar) btnRecargar.onclick = () => {
    const iframe = document.getElementById('iframeModal');
    if (iframe) iframe.src = iframe.src;
  };
}

function mostrarTopbarOriginal() {
  topbar.classList.remove('app');       
  topbar.innerHTML = topbarOriginalHTML;

  const btnCerrar = document.getElementById('btnCerrarModal');
  if (btnCerrar) {
    btnCerrar.style.display = 'none';
    btnCerrar.onclick = () => window.cerrarModalApp();
  }
}

const topbarGhostHTML = `
<header class="bg-[#222] h-12 flex items-center px-2 shadow-md w-full text-gray-200 select-none">
  <div class="flex items-center space-x-1">
    <button disabled data-action="nuevo"        class="px-2 py-1 hover:bg-gray-700 rounded pointer-events-none" title="Nuevo">
      <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-1 14H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2z"/>
      </svg>
    </button>
    <button disabled data-action="abrir"        class="px-2 py-1 hover:bg-gray-700 rounded pointer-events-none" title="Abrir">
      <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 6v12H5V6h14m0-2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"/>
      </svg>
    </button>
    <button disabled data-action="guardar"      class="px-2 py-1 hover:bg-gray-700 rounded pointer-events-none" title="Guardar">
      <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V7l-4-4zM7 19V5h8v4h-2v6h-4v4z"/>
      </svg>
    </button>
    <button disabled data-action="renombrar"    class="px-2 py-1 hover:bg-gray-700 rounded pointer-events-none" title="Renombrar">
      <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
      </svg>
    </button>
    <button disabled data-action="imprimir"     class="px-2 py-1 hover:bg-gray-700 rounded pointer-events-none" title="Imprimir">
      <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 8h-1V3H6v5H5a2 2 0 00-2 2v6h4v4h8v-4h4v-6a2 2 0 00-2-2zM8 19v-5h8v5H8z"/>
      </svg>
    </button>
    <button disabled data-action="buscar"       class="px-2 py-1 hover:bg-gray-700 rounded pointer-events-none" title="Buscar">
      <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 20l-5.6-5.6a7 7 0 10-1.4 1.4L20 21zM10 16a6 6 0 110-12 6 6 0 010 12z"/>
      </svg>
    </button>
    <button disabled data-action="pantalla"     class="px-2 py-1 hover:bg-gray-700 rounded pointer-events-none" title="Pantalla completa">
      <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 4h6v2H6v4H4V4zm10 0h6v6h-2V6h-4V4zm6 10v6h-6v-2h4v-4h2zm-10 6H4v-6h2v4h4v2z"/>
      </svg>
    </button>
  </div>

  <div class="flex-grow text-center text-sm font-semibold opacity-80">
    FocusWriter
  </div>

  <button id="btnCerrarGhost" class="ml-2 text-gray-300 hover:text-white text-2xl font-bold px-2" title="Cerrar">×</button>
</header>
`;


function mostrarTopbarGhost() {
  topbar.classList.add('app');
  topbar.innerHTML = topbarGhostHTML;

  const iframe = document.getElementById('iframeModal');

  topbar.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      if (!iframe?.contentWindow) return;
      iframe.contentWindow.postMessage({ type: 'ghost:action', action }, '*');
    });
  });

  const btnCerrar = document.getElementById('btnCerrarGhost');
  if (btnCerrar) btnCerrar.onclick = () => window.cerrarModalApp();
}



const topbarCompartirHTML = `
<div class="bg-gray-800 px-4 py-1 flex justify-between items-center text-sm select-none text-gray-300">
  <div class="flex space-x-4">
    <span class="hover:bg-gray-700 px-2 rounded cursor-none">File</span>
    <span class="hover:bg-gray-700 px-2 rounded cursor-none">Edit</span>
    <span class="hover:bg-gray-700 px-2 rounded cursor-none">View</span>
    <span class="hover:bg-gray-700 px-2 rounded cursor-none">Go</span>
    <span class="hover:bg-gray-700 px-2 rounded cursor-none">Bookmarks</span>
    <span class="hover:bg-gray-700 px-2 rounded cursor-none">Help</span>
  </div>
  <button id="btnCerrarCompartir" class="text-gray-300 hover:text-white text-xl font-bold px-2" title="Close">×</button>
</div>
`;


function mostrarTopbarCompartir() {
  topbar.classList.add('app');
  topbar.innerHTML = topbarCompartirHTML;

  const iframe = document.getElementById('iframeModal');
  topbar.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      if (!iframe?.contentWindow) return;
      iframe.contentWindow.postMessage({ type: 'compartir:action', action }, '*');
    });
  });

  const btnCerrar = document.getElementById('btnCerrarCompartir');
  if (btnCerrar) btnCerrar.onclick = () => window.cerrarModalApp();
}

const topbarSettingsHTML = `
<div class="bg-gray-800 px-4 py-1.5 flex items-center justify-between text-sm select-none text-gray-300 border-b border-gray-700">
  <div class="flex items-center">
    <svg class="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm8.66 3.23a7.97 7.97 0 00-.36-1.03l1.57-1.22a.75.75 0 00.18-.95l-1.5-2.6a.75.75 0 00-.9-.33l-1.87.6c-.33-.26-.69-.49-1.06-.69l-.27-1.95A.75.75 0 0014.6 2h-3a.75.75 0 00-.74.64l-.27 1.95c-.37.2-.73.43-1.06.69l-1.87-.6a.75.75 0 00-.9.33l-1.5 2.6a.75.75 0 00.18.95l1.57 1.22c-.14.34-.26.68-.36 1.03l-1.96.3a.75.75 0 00-.64.74v3c0 .37.27.68.64.74l1.96.3c.1.35.22.7.36 1.03l-1.57 1.22a.75.75 0 00-.18.95l1.5 2.6c.19.33.58.48.9.33l1.87-.6c.33.26.69.49 1.06.69l.27 1.95c.05.36.37.64.74.64h3c.37 0 .69-.28.74-.64l.27-1.95c.37-.2.73-.43 1.06-.69l1.87.6c.33.15.72 0 .9-.33l1.5-2.6a.75.75 0 00-.18-.95l-1.57-1.22c.14-.34.26-.68.36-1.03l1.96-.3c.37-.06.64-.37.64-.74v-3a.75.75 0 00-.64-.74l-1.96-.3z"/>
    </svg>
  </div>

  <div class="absolute left-1/2 transform -translate-x-1/2 text-gray-200 font-semibold">
    Settings
  </div>

  <div>
    <button id="btnCerrarConfig" class="text-gray-300 hover:text-white text-xl font-bold px-2" title="Cerrar">×</button>
  </div>
</div>
`;



function mostrarTopbarSettings() {
  topbar.classList.add('app');
  topbar.innerHTML = topbarSettingsHTML;

  const btnCerrar = document.getElementById('btnCerrarConfig');
  if (btnCerrar) {
    btnCerrar.onclick = () => window.cerrarModalApp();
  }
}

export {
  mostrarTopbarFirefox,
  mostrarTopbarGhost,
  mostrarTopbarCompartir,
  mostrarTopbarSettings,
  mostrarTopbarOriginal
};
