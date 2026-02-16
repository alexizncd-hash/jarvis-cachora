let dominios = {
  negocio: 5,
  dinero: 4,
  relacion: 6,
  aprendizaje: 3,
  legado: 5,
  fisico: 6
};

function guardarDominios() {
  localStorage.setItem("dominios", JSON.stringify(dominios));
}

function cargarDominios() {
  const data = localStorage.getItem("dominios");
  if (data) dominios = JSON.parse(data);
}

function mostrarDominios() {
  const contenedor = document.getElementById("estadoDominios");
  contenedor.innerHTML = "";
  for (let clave in dominios) {
    contenedor.innerHTML += clave.toUpperCase() + ": " + dominios[clave] + "/10<br>";
  }
}

function analizar() {
  const problema = document.getElementById("problema").value;
  const emocion = document.getElementById("emocion").value;
  const dominio = document.getElementById("dominio").value;
  const resultado = document.getElementById("resultado");

  let diagnostico = "";
  let plan = "";
  let impacto = 0;

  if (!problema.trim()) {
    resultado.textContent = "No escribiste ningún problema. Sé claro.";
    return;
  }

  if (emocion === "emocional" || emocion === "frustrado") {
    diagnostico = "Estás reaccionando desde emoción. No es estratégico decidir así.";
    plan =
      "1. No decidas hoy.\n" +
      "2. Reformula el problema en términos lógicos.\n" +
      "3. Evalúa impacto a 5 años.\n" +
      "4. Decide solo cuando estés estable.";
    impacto = -1;
  } else if (emocion === "cansado") {
    diagnostico = "Fatiga detectada. Rendimiento cognitivo bajo.";
    plan =
      "1. Descansa.\n" +
      "2. Reevalúa mañana.\n" +
      "3. No tomes decisiones críticas hoy.";
    impacto = -1;
  } else {
    diagnostico = "Estado estable. Procede con análisis estructurado.";
    plan =
      "1. Define el objetivo afectado.\n" +
      "2. Identifica variables bajo tu control.\n" +
      "3. Diseña acción concreta.\n" +
      "4. Ejecuta sin dilación.";
    impacto = 1;
  }

  dominios[dominio] += impacto;

  if (dominios[dominio] > 10) dominios[dominio] = 10;
  if (dominios[dominio] < 0) dominios[dominio] = 0;

  guardarDominios();
  mostrarDominios();

  resultado.textContent =
    "DIAGNÓSTICO:\n" + diagnostico +
    "\n\nPLAN DE ACCIÓN:\n" + plan +
    "\n\nDominio afectado: " + dominio.toUpperCase() +
    "\nNivel actual: " + dominios[dominio] + "/10";
}

cargarDominios();
mostrarDominios();
