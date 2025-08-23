function actualizarFecha() {
  const topbarDate = document.getElementById('topbar-date');
  const ahora = new Date();

  // Map de idiomas a locales válidos
  const locales = {
    es: "es-ES",
    en: "en-US",
    zh: "zh-CN",
    pt: "pt-PT",
    fr: "fr-FR",
    de: "de-DE",
    ko: "ko-KR",
    ja: "ja-JP"
  };

  // Recuperar del localStorage

  const idiomaGuardado = localStorage.getItem("preferredLang") || "es";
// console.log("Idioma guardado:", idiomaGuardado);
  // Obtener locale real
  const idioma = locales[idiomaGuardado] || "es-ES";

  // Crear formatter con el idioma forzado
  const formatterFecha = new Intl.DateTimeFormat(idioma, { day: "numeric", month: "short" });
  const formatterHora  = new Intl.DateTimeFormat(idioma, { hour: "2-digit", minute: "2-digit" });

  const fecha = formatterFecha.format(ahora);
  const hora  = formatterHora.format(ahora);

  topbarDate?.textContent = `${fecha} · ${hora}`;
}

setInterval(actualizarFecha, 1000);
actualizarFecha();

export { actualizarFecha };
