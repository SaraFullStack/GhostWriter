document.addEventListener('DOMContentLoaded', async () => {
  const contenedor = document.getElementById('contenedorNoticias');
  contenedor.innerHTML = 'Cargando noticias...';

  try {
    // Aquí puedes hacer fetch a API real o usar datos simulados
    const noticiasDemo = [
      {
        titulo: "Noticia 1: Evento importante hoy",
        fuente: "Fuente A",
        resumen: "Resumen corto de la noticia 1 que ocurrió hoy.",
        url: "https://ejemplo.com/noticia1"
      },
      {
        titulo: "Noticia 2: Avances tecnológicos",
        fuente: "Fuente B",
        resumen: "Resumen corto de la noticia 2 sobre tecnología.",
        url: "https://ejemplo.com/noticia2"
      },
      {
        titulo: "Noticia 3: Deportes y resultados",
        fuente: "Fuente C",
        resumen: "Resumen corto de la noticia 3 sobre deportes.",
        url: "https://ejemplo.com/noticia3"
      }
    ];

    // Simula retardo
    await new Promise(r => setTimeout(r, 1000));

    contenedor.innerHTML = '';
    noticiasDemo.forEach(noticia => {
      const div = document.createElement('div');
      div.className = 'p-4 border rounded hover:shadow cursor-pointer';
      div.onclick = () => window.open(noticia.url, '_blank');
      div.innerHTML = `
        <h3 class="text-lg font-semibold text-blue-700">${noticia.titulo}</h3>
        <p class="text-sm italic text-gray-600 mb-1">${noticia.fuente}</p>
        <p>${noticia.resumen}</p>
      `;
      contenedor.appendChild(div);
    });
  } catch (error) {
    contenedor.innerHTML = 'Error al cargar noticias.';
    console.error(error);
  }
});
