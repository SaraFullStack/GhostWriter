const diasJuego = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

if (!localStorage.getItem("diaJuego")) {
  localStorage.setItem("diaJuego", 0); 
}

function getDiaJuego() {
  const indice = parseInt(localStorage.getItem("diaJuego"), 10);
  return diasJuego[indice];
}

function pasarAlSiguienteDia() {
  let indice = parseInt(localStorage.getItem("diaJuego"), 10);
  indice = (indice + 1) % diasJuego.length;
  localStorage.setItem("diaJuego", indice);
}

console.log("Hoy es:", getDiaJuego());

if (getDiaJuego() === "lunes") {
  console.log("Mostrar datos para lunes");
}

reiniciarDiaJuego();
console.log("Ahora es:", getDiaJuego());

function reiniciarDiaJuego() {
  localStorage.setItem("diaJuego", 0); 
}
