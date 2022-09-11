// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Contenedor de Resultados
const resultado = document.querySelector('#resultado');
const max = new Date().getFullYear(); // Muestra año actual
const min = max - 10;

// Obejeto para la búsqueda
const datosBusqueda = {
  marca: '',
  year: '',
  minimo: '',
  maximo: '',
  puertas: '',
  transmision: '',
  color: '',
};

// Events
document.addEventListener('DOMContentLoaded', () => {
  mostrarAutos(autos);

  // Llena el select de los años
  llenarSelect();
});

// Event Listener para los select de búsqueda
marca.addEventListener('change', (e) => {
  datosBusqueda.marca = e.target.value;

  filtrarAuto();
});

year.addEventListener('change', (e) => {
  datosBusqueda.year = parseInt(e.target.value);

  filtrarAuto();
});

minimo.addEventListener('change', (e) => {
  datosBusqueda.minimo = parseInt(e.target.value);

  filtrarAuto();
});

maximo.addEventListener('change', (e) => {
  datosBusqueda.maximo = parseInt(e.target.value);

  filtrarAuto();
});

puertas.addEventListener('change', (e) => {
  datosBusqueda.puertas = parseInt(e.target.value);

  filtrarAuto();
});

transmision.addEventListener('change', (e) => {
  datosBusqueda.transmision = e.target.value;

  filtrarAuto();
});

color.addEventListener('change', (e) => {
  datosBusqueda.color = e.target.value;

  filtrarAuto();
});

// Functions
function mostrarAutos(autos) {
  limpiarHTML();

  autos.forEach((auto) => {
    const { marca, modelo, year, precio, puertas, transmision, color } = auto;
    const autoHTML = document.createElement('p');

    autoHTML.textContent = `
    ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
    `;
    // Inserta los resultados en el HTML
    resultado.appendChild(autoHTML);
  });
}

// Limpiar HTML
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

// Llenar el section del año con options
function llenarSelect() {
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement('option');
    opcion.value = i;
    opcion.textContent = i;

    year.appendChild(opcion); // Esto muestra las options en el section
  }
}

// Funcion para filtrar autos en base a su búsqueda
function filtrarAuto() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    noResultado();
  }
}

// En caso de no encontrar resultados
function noResultado() {
  limpiarHTML();

  const noResultado = document.createElement('div');
  noResultado.classList.add('alerta', 'error');
  noResultado.textContent = 'No hay resultados disponibles. Revisa las opciones de nuevo';
  resultado.appendChild(noResultado);
}

// Funciones que van a filtrar cada elemento
function filtrarMarca(auto) {
  const { marca } = datosBusqueda;
  if (marca) {
    return auto.marca === marca;
  } else {
    return auto;
  }
}

function filtrarYear(auto) {
  const { year } = datosBusqueda;
  if (year) {
    return auto.year === year;
  } else {
    return auto;
  }
}

function filtrarMinimo(auto) {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return auto.precio >= minimo;
  } else {
    return auto;
  }
}

function filtrarMaximo(auto) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return auto.precio <= maximo;
  } else {
    return auto;
  }
}

function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda;
  if (puertas) {
    return auto.puertas === puertas;
  } else {
    return auto;
  }
}

function filtrarTransmision(auto) {
  const { transmision } = datosBusqueda;
  if (transmision) {
    return auto.transmision === transmision;
  } else {
    return auto;
  }
}

function filtrarColor(auto) {
  const { color } = datosBusqueda;
  if (color) {
    return auto.color === color;
  } else {
    return auto;
  }
}
