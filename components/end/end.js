import { RESULT_CONFIG } from '../../const/es/end.js';

function leerResultadoLS() {
    const posiblesClaves = ['resultado', 'resultadoJuego', 'end', 'fin'];
    let bruto = null, claveUsada = null;

    for (const k of posiblesClaves) {
        const v = localStorage.getItem(k);
        if (v != null) { bruto = v; claveUsada = k; break; }
    }
    if (bruto == null) return { valor: null, clave: null };

    let valor = bruto;
    try {
        const obj = JSON.parse(bruto);
        valor = obj?.resultado ?? obj?.value ?? obj?.end ?? obj?.fin ?? null;
    } catch (_) { }

    if (typeof valor === 'string') valor = valor.trim().toLowerCase();

    const alias = {
        ok: 'bien', good: 'bien',
        perfecto: 'excelente', perfect: 'excelente',
        mal: 'inaceptable', bad: 'inaceptable', fail: 'inaceptable'
    };
    if (valor && alias[valor]) valor = alias[valor];

    return { valor, clave: claveUsada };
}

const { valor: resultadoLS } = leerResultadoLS();
const llave = ['excelente', 'bien', 'regular', 'inaceptable'].includes(resultadoLS)
    ? resultadoLS
    : 'inaceptable';
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
badge.textContent = cfg.badge;

document.getElementById('result-title').textContent = cfg.title;
document.getElementById('result-summary').textContent = cfg.summary;

document.getElementById('retry').addEventListener('click', () => {
    ['resultado', 'resultadoJuego', 'end', 'fin'].forEach(k => localStorage.removeItem(k));

    const target = document.body.dataset.home || './index.html';
    if (history.length > 1) history.back();
    else window.location.href = target;
});

document.getElementById('retry').addEventListener('click', () => {
    localStorage.clear();

    const target = document.body.dataset.home || './index.html';
    if (history.length > 1) history.back();
    else window.location.href = target;
});


localStorage.setItem('resultado', 'regular'); 