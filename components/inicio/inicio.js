const terminal = document.getElementById('terminal');
const terminalBody = document.getElementById('terminal-body');
const inputLine = document.getElementById('inputLine');
const input = document.getElementById('inputLogin');
const form = document.getElementById('form');
const errorMsg = document.getElementById('errorMsg');

const lines = [
    'Recomendamos jugar con pantalla completa "F11" para mejorar la experiencia',
    'Si está listo para jugar, escriba GhostWriter en la terminal'
];

let currentLine = 0;
let currentChar = 0;

function scrollTerminal() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function escribirLinea(text, callback) {
    const outputLine = document.createElement('pre');
    outputLine.style.color = '#4ae54a';
    outputLine.style.fontWeight = '600';
    outputLine.style.fontFamily = 'inherit';
    outputLine.style.margin = '0.1rem 0';
    outputLine.style.minHeight = '2rem';
    outputLine.textContent = '';
    terminalBody.appendChild(outputLine);

    function typeChar() {
        if (currentChar < text.length) {
            outputLine.textContent += text[currentChar];
            currentChar++;
            scrollTerminal();
            setTimeout(typeChar, 40);
        } else {
            currentChar = 0;
            callback();
        }
    }
    typeChar();
}

function escribirLineas() {
    if (currentLine < lines.length) {
        escribirLinea(lines[currentLine], () => {
            currentLine++;
            escribirLineas();
        });
    } else {
        const asciiGhost = document.createElement('pre');
        asciiGhost.id = 'asciiGhost';
        asciiGhost.textContent = ` .-.
(o o) boo!
| O \\
 \\   \\
  \`~~~'`;
        terminalBody.appendChild(asciiGhost);
        scrollTerminal();

        inputLine.style.display = 'flex';
        input.disabled = false;
        input.focus();
        scrollTerminal();
    }
}

escribirLineas();

form.addEventListener('submit', e => {
    e.preventDefault();
    const valor = input.value.trim();
    if (valor === 'GhostWriter') {
        errorMsg.textContent = '';
        const bye = document.createElement('pre');
        bye.style.color = '#4ae54a';
        bye.style.fontWeight = '600';
        bye.style.margin = '0.1rem 0';
        bye.textContent = 'Accediendo...';
        terminalBody.appendChild(bye);
        scrollTerminal();
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 800);
    } else {
        errorMsg.textContent = 'Comando incorrecto. Por favor, escriba "GhostWriter".';
        let nuevoTexto = '';
        for (let i = 0; i < valor.length; i++) {
            if ('GhostWriter'[i] === valor[i]) {
                nuevoTexto += valor[i];
            } else {
                break;
            }
        }
        input.value = nuevoTexto;
        input.setSelectionRange(nuevoTexto.length, nuevoTexto.length);
    }
});