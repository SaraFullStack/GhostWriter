const lang = localStorage.getItem("preferredLang") || "en";
const { EMAILS } = await import(`../../const/${lang}/email.js`);

const listEl = document.getElementById('emailList');
const subjectEl = document.getElementById('emailSubject');
const fromEl = document.getElementById('emailFrom');
const bodyEl = document.getElementById('emailBody');
const searchEl = document.getElementById('search');
const actionBar = document.getElementById('actionBar');

let seleccionado = null;
let seleccionadoIndex = null;

function renderList(items = EMAILS) {
  listEl.innerHTML = '';
  items.forEach((c, i) => {
    const li = document.createElement('li');
    li.className = 'px-3 py-3 hover:bg-gray-800 cursor-pointer flex items-start justify-between gap-3 group';
    li.innerHTML = `
          <div class="min-w-0">
            <p class="font-medium text-gray-100 truncate">${c.subject}</p>
            <p class="text-xs text-gray-400 truncate">${c.from}</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-500 pl-2 flex-shrink-0">${c.time}</span>
            <button class="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400" title="Borrar" onclick="event.stopPropagation(); borrarCorreo(${i})">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 
                  01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 
                  1 0 011-1h4a1 1 0 011 1v3m-9 0h10"/>
              </svg>
            </button>
          </div>
        `;
    li.onclick = () => selectMail(c, li, i);
    listEl.appendChild(li);
  });
}

function selectMail(c, li, index) {
  subjectEl.textContent = c.subject;
  fromEl.textContent = `De: ${c.from} · ${c.time}`;
  bodyEl.innerHTML = c.body + `
        <br/>
        <br/>  `;
  if (seleccionado) seleccionado.classList.remove('bg-gray-800');
  li.classList.add('bg-gray-800');
  seleccionado = li;
  seleccionadoIndex = index;
  actionBar.classList.remove('hidden');
}

searchEl.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  const filtered = EMAILS.filter(c =>
    c.subject.toLowerCase().includes(q) || c.from.toLowerCase().includes(q)
  );
  renderList(filtered);
});

renderList();
const firstLi = listEl.querySelector("li");
if (firstLi) {
  selectMail(EMAILS[0], firstLi, 0);
}