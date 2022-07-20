const btnBalance = document.getElementById("btn-balance");
const btnCategorias = document.getElementById("btn-categorias");
const btnReportes = document.getElementById("btn-reportes");
const balance = document.getElementById("balance");
const categorias = document.getElementById("categorias");
const reportes = document.getElementById("reportes");
const btnCancelar = document.getElementById("cancelar-btn");

btnBalance.addEventListener("click", () => {
  balance.classList.remove("oculto");
  categorias.classList.add("oculto");
  reportes.classList.add("oculto");
  containerNuevaOperacion.classList.add("oculto");
  filtros.classList.remove("oculto");
  cardBalance.classList.remove("oculto");
  operaciones.classList.remove("oculto");
});

btnCategorias.addEventListener("click", () => {
  categorias.classList.remove("oculto");
  balance.classList.add("oculto");
  reportes.classList.add("oculto");
});

btnReportes.addEventListener("click", () => {
  reportes.classList.remove("oculto");
  categorias.classList.add("oculto");
  balance.classList.add("oculto");
});

const containerNuevaOperacion = document.getElementById(
  "container-nueva-operacion"
);
const btnNuevaOperacion = document.getElementById("btn-nueva-operacion");
const filtros = document.getElementById("filtros");
const cardBalance = document.getElementById("card-balance");
const operaciones = document.getElementById("operaciones");

btnNuevaOperacion.addEventListener("click", () => {
  containerNuevaOperacion.classList.remove("oculto");
  filtros.classList.add("oculto");
  cardBalance.classList.add("oculto");
  operaciones.classList.add("oculto");
});

btnCancelar.addEventListener("click", () => {
  filtros.classList.remove("oculto");
  cardBalance.classList.remove("oculto");
  operaciones.classList.remove("oculto");
  containerNuevaOperacion.classList.add("oculto");
});

const descripcion = document.getElementById("descripcion");
const monto = document.getElementById("monto");
const tipo = document.getElementById("tipo");
const categoria = document.getElementById("categoria");
const fecha = document.getElementById("fecha");
const cancelarBtn = document.getElementById("cancelarBtn");
const agregarBtn = document.getElementById("agregarBtn");

agregarBtn.addEventListener("click", (e) => {
  e.preventDeFault();
  console.log(descripcion.value);
  console.log(monto.value);
  console.log(tipo.value);
  console.log(categoria.value);
  console.log(fecha.value);
});

// const ocultarFiltros = document.getElementById("ocultar-filtros");
// const containerFiltros = document.getElementById("container-filtros");
// ocultarFiltros.addEventListener("click", () => {
//   containerFiltros.classList.toggle("oculto");
//  });

// const operacion = {
//     monto: 0,
//     descripcion: '',
//     tipo: '',
//     categoria: '',
//     fecha: '',
// }

// const rellenarArreglo = obj => {
//     obj = {
//  monto: inputMonto.value,
//  descripcion: inputDescrip.value,
//  tipo: inputTipo.value,
//  categoria:inputCateg.value ,
//  fecha: inputFecha.value,

//  }
//     gastos.push(obj)
// }
