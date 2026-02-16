let dominios = JSON.parse(localStorage.getItem("dominios")) || {
  negocio: 5,
  dinero: 4,
  aprendizaje: 3
};

let chart;

function guardar() {
  localStorage.setItem("dominios", JSON.stringify(dominios));
}

function actualizarSelector() {
  const select = document.getElementById("dominio");
  select.innerHTML = "";
  for (let clave in dominios) {
    let option = document.createElement("option");
    option.value = clave;
    option.textContent = clave;
    select.appendChild(option);
  }
}

function agregarDominio() {
  const nuevo = document.getElementById("nuevoDominio").value.trim();
  if (nuevo && !dominios[nuevo]) {
    dominios[nuevo] = 5;
    guardar();
    actualizarSelector();
    actualizarGrafica();
  }
}

function sonidoClick() {
  const audio = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");
  audio.play();
}

function analizar() {
  sonidoClick();

  const problema = document.getElementById("problema").value;
  const emocion = document.getElementById("emocion").value;
  const dominio = document.getElementById("dominio").value;
  const resultado = document.getElementById("resultado");

  if (!problema.trim()) {
    resultado.textContent = "Describe el problema con claridad.";
    return;
  }

  let respuesta = "";

  if (emocion === "emocional") {
    dominios[dominio] -= 1;
    respuesta = "Estás reaccionando emocionalmente. Pausa. Analiza con frialdad antes de actuar.";
  } else if (emocion === "cansado") {
    respuesta = "Tu energía está baja. Descansa antes de decidir.";
  } else {
    dominios[dominio] += 1;
    respuesta = "Estado estable. Diseña acción concreta y ejecuta.";
  }

  if (dominios[dominio] > 10) dominios[dominio] = 10;
  if (dominios[dominio] < 0) dominios[dominio] = 0;

  guardar();
  actualizarGrafica();

  resultado.textContent = respuesta;
}

function actualizarGrafica() {
  const ctx = document.getElementById("grafica").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: Object.keys(dominios),
      datasets: [{
        label: "Estado actual",
        data: Object.values(dominios),
        backgroundColor: "rgba(0, 191, 255, 0.2)",
        borderColor: "#00e6ff",
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        r: {
          min: 0,
          max: 10
        }
      }
    }
  });
}

actualizarSelector();
actualizarGrafica();
