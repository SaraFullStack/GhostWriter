import { NEWS as NEWS_ES } from "../../const/es/news.js";
import { NEWS as NEWS_EN } from "../../const/en/news.js";
import { NEWS as NEWS_FR } from "../../const/fr/news.js";
import { NEWS as NEWS_PT } from "../../const/pt/news.js";
import { NEWS as NEWS_ZH } from "../../const/zh/news.js";
import { NEWS as NEWS_KO } from "../../const/ko/news.js";
import { NEWS as NEWS_DE } from "../../const/de/news.js";
import { NEWS as NEWS_JA } from "../../const/ja/news.js";

const lang = localStorage.getItem("preferredLang") || "en";

const LOCALES = {
  es: NEWS_ES,
  en: NEWS_EN,
  fr: NEWS_FR,
  pt: NEWS_PT,
  zh: NEWS_ZH,
  ko: NEWS_KO,
  de: NEWS_DE,
  ja: NEWS_JA,
};

const NEWS = LOCALES[lang] || NEWS_EN;

if (!localStorage.getItem("dayGame")) localStorage.setItem("dayGame", 0);

function getdayGame() {
  const i = parseInt(localStorage.getItem("dayGame"), 10);
  return i ?? "0";
}

const portadaEl = document.getElementById("portada");
const meteoEl = document.getElementById("aside-meteo");
const historiasEl = document.getElementById("aside-historias");
const asideAdsEl = document.getElementById("aside-ads");
const diaBadge = document.getElementById("diaLabel");

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
function getNameLogo() {
  const medios = {
    1: { logo: "faro.png",          name: "The Lighthouse" },
    2: { logo: "endencidendo.png",  name: "News Storm" },
    3: { logo: "vaso.png",          name: "The Magnifying Glass" },
    4: { logo: "payaso.png",        name: "The Global Parody" },
    5: { logo: "gubernamental.png", name: "Government Press" },
    6: { logo: "colador.png",       name: "The Collator" },
    7: { logo: "compania.png",      name: "Executive Channel" },
    8: { logo: "fuente.png",        name: "The Digital Plaza" },
    9: { logo: "intercambiar.png",  name: "The Change That Works for the Future" },
    10:{ logo: "cinta.png",         name: "Subverse Margin" }
  };

  const press = localStorage.getItem("press") || Math.floor(Math.random() * 10) + 1;
  return medios[press] || medios[1]; // fallback al primero
}

function crearPrincipal(n) {
  const art = document.createElement("article");
  const text = localStorage.getItem("textDay") || n.titulo;
  const medio = getNameLogo(); // <-- logo y nombre juntos

  art.className = "bg-gray-800 rounded-lg overflow-hidden shadow-md flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-300";
  art.innerHTML = `
    <img src="${n.imagen}" alt="${escapeHtml(text)}" class="w-full h-64 object-cover brightness-90">
    <div class="p-5">
      <div class="flex items-center space-x-2 text-xs text-gray-400 mb-2">
        <img src="../../assets/images/prensa/icons/${medio.logo}" alt="Logo medio" class="h-4 object-contain" />
        <span>${escapeHtml(medio.name)}</span>
      </div>
      <h1 class="text-3xl font-semibold text-white leading-tight">${escapeHtml(text)}</h1>
      <p class="text-gray-300 mt-3 max-w-prose">${escapeHtml(n.resumen)}</p>
    </div>`;

  if (n.url) art.onclick = () => window.open(n.url, "_blank");
  return art;
}


function crearSecundaria(s) {
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
  if (s.url) art.onclick = () => window.open(s.url, "_blank");
  return art;
}


function crearAdBanner(ad) {
  console.log(ad);
  const a = document.createElement("a");
  a.setAttribute("aria-label", "Advertising");
  a.className = "block rounded-lg overflow-hidden bg-gray-800 shadow-md hover:shadow-lg transition-shadow";
  a.innerHTML = `
    <div class="text-[10px] text-gray-400 pl-2 pt-1">${escapeHtml(ad.alt || "Advertising")}</div>
    <img src="${ad.img}" alt="${escapeHtml(ad.alt || "Advertising")}" class="w-full h-28 sm:h-36 md:h-40 object-cover">
  `;
  return a;
}

function crearAdCard(ad) {
  const a = document.createElement("a");
  a.setAttribute("aria-label", "Advertising");
  a.className = "bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex";
  a.innerHTML = `
    <img src="${ad.img}" alt="${escapeHtml(ad.alt || "Advertising")}" class="w-40 object-cover brightness-90">
    <div class="p-4 flex items-center justify-center">
      <span class="text-gray-300 font-medium" data-i18n="firefox.advertising">${escapeHtml(ad.alt || "Advertising")}</span>
    </div>
  `;
  return a;
}

function crearAdAside(ad) {
  const a = document.createElement("a");
  a.setAttribute("aria-label", "Advertising");
  a.className = "block bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow";
  a.innerHTML = `
    <img src="${ad.img}" alt="${escapeHtml(ad.title || "Advertising")}" class="w-full h-32 object-cover">
    <div class="p-3">
      <div class="text-[10px] text-gray-400" data-i18n="firefox.advertising">Advertising</div>
      <h5 class="text-sm font-semibold">${escapeHtml(ad.alt || "Advertising")}</h5>
      <p class="text-xs text-gray-400">${escapeHtml(ad.text || "")}</p>
    </div>
  `;
  return a;
}


function renderPortada(data) {
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

function renderAside(a, adsAside) {
  meteoEl.innerHTML = `
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-xl font-semibold text-white" data-i18n="firefox.weather">The Weather</h3>
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
    <h4 class="text-lg font-semibold mb-3 text-white" data-i18n="firefox.news">News of the day</h4>
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
  const dia = getdayGame();
  if (diaBadge) diaBadge.textContent = dia;

  const dataDia = NEWS?.[dia] ?? NEWS?.["0"];
  if (!dataDia) {
    portadaEl.innerHTML = `<div class="bg-red-900/40 border border-red-800 rounded-lg p-4">
      <p class="text-red-200">No hay NEWS definidas para “${escapeHtml(dia)}”.</p>
    </div>`;
    return;
  }

  renderPortada(dataDia);
  renderAside(dataDia.aside ?? {}, dataDia.ads?.aside ?? []);
});
