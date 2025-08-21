import { NOTICIAS } from "../../const/es/news.js";

localStorage.setItem('diaJuego', 'lunes'); 

const diasJuego = ["lunes","martes","miércoles","jueves","viernes","sábado","domingo"];
if (!localStorage.getItem("diaJuego")) localStorage.setItem("diaJuego", 0);
function getDiaJuego(){ const i = parseInt(localStorage.getItem("diaJuego"),10); return diasJuego[i] ?? "lunes"; }

const portadaEl = document.getElementById("portada");
const meteoEl = document.getElementById("aside-meteo");
const historiasEl = document.getElementById("aside-historias");
const asideAdsEl = document.getElementById("aside-ads");
const diaBadge = document.getElementById("diaLabel");

function escapeHtml(str=""){return String(str).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;");}

function crearPrincipal(n){
  const art = document.createElement("article");
  art.className = "bg-gray-800 rounded-lg overflow-hidden shadow-md flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-300";
  art.innerHTML = `
    <img src="${n.imagen}" alt="${escapeHtml(n.titulo)}" class="w-full h-64 object-cover brightness-90">
    <div class="p-5">
      <div class="flex items-center space-x-2 text-xs text-gray-400 mb-2">
        <img src="${n.medioLogo}" alt="Logo medio" class="h-4 object-contain" />
        <span>${escapeHtml(n.medio)}</span>
      </div>
      <h1 class="text-3xl font-semibold text-white leading-tight">${escapeHtml(n.titulo)}</h1>
      <p class="text-gray-300 mt-3 max-w-prose">${escapeHtml(n.resumen)}</p>
    </div>`;
  if (n.url) art.onclick = () => window.open(n.url,"_blank");
  return art;
}

function crearSecundaria(s){
  const art = document.createElement("article");
  art.className = "bg-gray-800 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 flex";
  art.innerHTML = `
    <img src="${s.imagen}" alt="${escapeHtml(s.titulo)}" class="w-40 object-cover brightness-90">
    <div class="p-4 flex flex-col justify-between">
      <div>
        <div class="flex items-center space-x-2 text-xs text-gray-400 mb-1">
          <img src="${s.medioLogo}" alt="Logo medio" class="h-3 object-contain" />
          <span>${escapeHtml(s.medio)}</span>
        </div>
        <h2 class="text-lg font-semibold text-white leading-snug">${escapeHtml(s.titulo)}</h2>
      </div>
    </div>`;
  if (s.url) art.onclick = () => window.open(s.url,"_blank");
  return art;
}

function crearAdBanner(ad){
  const a = document.createElement("a");
  a.setAttribute("aria-label","Publicidad");
  a.className = "block rounded-lg overflow-hidden bg-gray-800 shadow-md hover:shadow-lg transition-shadow";
  a.innerHTML = `
    <div class="text-[10px] text-gray-400 pl-2 pt-1">${escapeHtml(ad.alt || "Publicidad")}</div>
    <img src="${ad.img}" alt="${escapeHtml(ad.alt || "Publicidad")}" class="w-full h-28 sm:h-36 md:h-40 object-cover">
  `;
  return a;
}

function crearAdCard(ad){
  const a = document.createElement("a");
  a.setAttribute("aria-label","Publicidad");
  a.className = "bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex";
  a.innerHTML = `
    <img src="${ad.img}" alt="${escapeHtml(ad.alt || "Publicidad")}" class="w-40 object-cover brightness-90">
    <div class="p-4 flex items-center justify-center">
      <span class="text-gray-300 font-medium">${escapeHtml(ad.alt || "Publicidad")}</span>
    </div>
  `;
  return a;
}

function crearAdAside(ad){
  const a = document.createElement("a");
  a.setAttribute("aria-label","Publicidad");
  a.className = "block bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow";
  a.innerHTML = `
    <img src="${ad.img}" alt="${escapeHtml(ad.title || "Publicidad")}" class="w-full h-32 object-cover">
    <div class="p-3">
      <div class="text-[10px] text-gray-400">Publicidad</div>
      <h5 class="text-sm font-semibold">${escapeHtml(ad.alt || "Publicidad")}</h5>
      <p class="text-xs text-gray-400">${escapeHtml(ad.text || "")}</p>
    </div>
  `;
  return a;
}

function renderPortada(data){
  portadaEl.innerHTML = "";
  const ads = data.ads || {};

  const top = ads.topBanner;
  if (top) portadaEl.appendChild(crearAdBanner(top));

  if (data.principal) portadaEl.appendChild(crearPrincipal(data.principal));

  const grid = document.createElement("div");
  grid.className = "grid grid-cols-1 sm:grid-cols-2 gap-4";

  const secundarias = data.secundarias ?? [];
  const infeed = ads.infeed;

  let adIdx = 0;
  secundarias.forEach((s, i) => {
    grid.appendChild(crearSecundaria(s));
    const isBreak = (i % 2 === 1);
    if (isBreak && infeed[adIdx]) {
      grid.appendChild(crearAdCard(infeed[adIdx]));
      adIdx = (adIdx + 1) % infeed.length;
    }
  });

  if (secundarias.length < 3 && infeed[adIdx]) {
    grid.appendChild(crearAdCard(infeed[adIdx]));
  }

  portadaEl.appendChild(grid);
}

function renderAside(a, adsAside){
  meteoEl.innerHTML = `
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-xl font-semibold text-white">El tiempo</h3>
      <span class="text-sm bg-orange-500 text-white px-2 py-1 rounded select-none cursor-default">
        ${escapeHtml(a.temperatura ?? "—")}
      </span>
    </div>
    <div>
      <p class="text-gray-300 mb-1">${escapeHtml(a.alerta ?? "")}</p>
    </div>
  `;

  const historias = a?.historias ?? [];
  historiasEl.innerHTML = `
    <h4 class="text-lg font-semibold mb-3 text-white">Noticias del día</h4>
    <ul class="space-y-3 text-gray-300 text-sm">
      ${historias.map(h => `
        <li>
          <p>
            <strong>${escapeHtml(h.medio ?? "Medio")}</strong> · ${escapeHtml(h.titulo ?? "")}
          </p>
        </li>`).join("")}
    </ul>
  `;

  asideAdsEl.innerHTML = "";
  const pack = adsAside;
  pack.forEach(ad => asideAdsEl.appendChild(crearAdAside(ad)));
}

document.addEventListener("DOMContentLoaded", () => {
  const dia = getDiaJuego();
  if (diaBadge) diaBadge.textContent = dia;

  const dataDia = NOTICIAS?.[dia] ?? NOTICIAS?.["lunes"];
  if (!dataDia) {
    portadaEl.innerHTML = `<div class="bg-red-900/40 border border-red-800 rounded-lg p-4">
      <p class="text-red-200">No hay noticias definidas para “${escapeHtml(dia)}”.</p>
    </div>`;
    return;
  }

  renderPortada(dataDia);
  renderAside(dataDia.aside ?? {}, dataDia.ads?.aside ?? []);
});
