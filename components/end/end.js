const lang = localStorage.getItem("preferredLang") || "en";
const { RESULT_CONFIG } = await import(`../../const/${lang}/end.js`);

const DIVISOR = 6;

// 1) Nota 1..10 según total/6
function notaDesdePuntos(totalPoints, divisor = DIVISOR) {
  // Redondeo al entero más cercano y acoto a 1..10
  return Math.max(1, Math.min(10, Math.round((totalPoints || 0) / divisor)));
}

// 2) Bucket lógico (no cambia los textos, solo decide la familia)
function bucketPorNota(nota) {
  if (nota >= 9) return 'excelente';
  if (nota >= 7) return 'bien';        // tu “bueno”
  if (nota >= 5) return 'regular';     // tu “aceptable suficiente”
  return 'inaceptable';
}

// 3) Resolver la **clave antigua** de RESULT_CONFIG según sinónimos disponibles
function resolverClaveConfig(bucket) {
  const SINONIMOS = {
    inaceptable: ['inaceptable', 'mal', 'bad', 'fail'],
    regular: ['regular', 'aceptable', 'suficiente', 'aceptable_suficiente'],
    bien: ['bien', 'bueno', 'ok', 'good'],
    excelente: ['excelente', 'perfecto', 'perfect']
  };
  const candidatos = SINONIMOS[bucket] || [];
  for (const k of candidatos) {
    if (RESULT_CONFIG && RESULT_CONFIG[k]) return k;
  }
  // Fallback: primera clave disponible para no romper UI
  const fallback = Object.keys(RESULT_CONFIG || {})[0] || 'inaceptable';
  return fallback;
}

// ---- Ejecutar flujo ----
const totalPoints = Number(localStorage.getItem('points')) || 0;
const nota = notaDesdePuntos(totalPoints);
const bucket = bucketPorNota(nota);
const llave = resolverClaveConfig(bucket);

localStorage.setItem('resultado', llave);

// Pintar UI con los **textos de antes** (RESULT_CONFIG[llave])
const cfg = RESULT_CONFIG[llave];

const img = document.getElementById('result-img');
img.src = cfg.image;
img.alt = 'Resultado: ' + llave;

const badge = document.getElementById('result-badge');
badge.className = [
  'inline-block uppercase tracking-widest text-sm font-bold px-3 py-1 rounded-full mb-3 border',
  cfg.badgeColor.bg,
  cfg.badgeColor.text,
  cfg.badgeColor.border
].join(' ');
badge.textContent = cfg.badge; // ← mantiene tu texto/badge original

document.getElementById('result-title').textContent = cfg.title;
document.getElementById('result-summary').textContent = cfg.summary;

document.getElementById('retry').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = '../../index.html';
});

