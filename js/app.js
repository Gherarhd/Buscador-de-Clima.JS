const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();
  //Validar

  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (ciudad === "" || pais === "") {
    imprimirAlerta("Todos los campos son obligatorios");
    return;
  }

  //Consultar la API

  consultarApi(ciudad, pais);
}

function consultarApi(ciudad, pais) {
  const apiID = "18d43688e3100a877c9ef7f9d0c4c791";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiID}`;

  limpiarHTML();

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      if (datos.cod === "404") {
        imprimirAlerta("Ciudad no encontrada");
        return;
      }

      //Mostrar datos de clima
      console.log(datos);
      mostrarClima(datos);
    });
}

function mostrarClima(datos) {
  const {
    name,
    main: { temp, temp_max, temp_min, humidity },
  } = datos;

  const centigrados = kelviAcentigrados(temp);
  const max = kelviAcentigrados(temp_max);
  const min = kelviAcentigrados(temp_min);
  const humedad = humidity;
  const datosCiudad = name;

  const mostrarCiudad = document.createElement("p");
  mostrarCiudad.innerHTML = `Clima en ${datosCiudad} `;
  mostrarCiudad.classList.add("text-3xl", "text-indigo-200");

  const actual = document.createElement("p");
  actual.innerHTML = `${centigrados} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const temperaturaMax = document.createElement("p");
  temperaturaMax.innerHTML = `Max: ${max} &#8451;`;
  temperaturaMax.classList.add("text-xl");

  const temperaturaMin = document.createElement("p");
  temperaturaMin.innerHTML = `Min: ${min} &#8451;`;
  temperaturaMin.classList.add("text-xl");

  const humedadP = document.createElement("p");
  humedadP.innerHTML = `Humedad: ${humedad} %`;
  humedadP.classList.add("text-xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(mostrarCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(temperaturaMax);
  resultadoDiv.appendChild(temperaturaMin);
  resultadoDiv.appendChild(humedadP);

  resultado.appendChild(resultadoDiv);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function kelviAcentigrados(grados) {
  return parseInt(grados - 273.15);
}

function imprimirAlerta(mensaje) {
  const alerta = document.querySelector(".bg-red-200");

  if (!alerta) {
    const alerta = document.createElement("div");

    alerta.classList.add(
      "bg-red-200",
      "border-red-500",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );

    alerta.innerHTML = `
  <strong class='font-bold' >Error!</strong>
  <span class='block' >${mensaje}</span>`;

    container.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}
