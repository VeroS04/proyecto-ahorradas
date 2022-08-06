const btnBalance = document.getElementById("btn-balance");
const btnCategorias = document.getElementById("btn-categorias");
const btnReportes = document.getElementById("btn-reportes");
const btnNuevaOperacion = document.getElementById("btn-nueva-operacion");
const cancelarBtn = document.getElementById("cancelar-btn");
const agregarBtn = document.getElementById("agregar-btn");
const ocultarFiltros = document.getElementById("ocultar-filtros");

const balance = document.getElementById("balance");
const categorias = document.getElementById("categorias");
const reportes = document.getElementById("reportes");
const containerNuevaOperacion = document.getElementById("container-nueva-operacion");
const filtros = document.getElementById("filtros");
const cardBalance = document.getElementById("card-balance");
const descripcionInput = document.getElementById("descripcion-input");
const montoInput = document.getElementById("monto-input");
const tipoSelect = document.getElementById("tipo-select");
const categoriaSelect = document.getElementById("categoria-select");
const fechaInput = document.getElementById("fecha-input");
const containerFiltros = document.getElementById("container-filtros");
const sinOperaciones = document.getElementById("sin-operaciones");
const conOperaciones = document.getElementById("con-operaciones");
const operaciones = document.getElementById("operaciones")

// ************ SECCION EVENTOS ************

btnBalance.addEventListener("click", () => {
  balance.classList.remove("d-none");
  categorias.classList.add("d-none");
  reportes.classList.add("d-none");
  containerNuevaOperacion.classList.add("d-none");
});

btnCategorias.addEventListener("click", () => {
  categorias.classList.remove("d-none");
  balance.classList.add("d-none");
  reportes.classList.add("d-none");
});

btnReportes.addEventListener("click", () => {
  reportes.classList.remove("d-none");
  categorias.classList.add("d-none");
  balance.classList.add("d-none");
});

btnNuevaOperacion.addEventListener("click", () => {
  containerNuevaOperacion.classList.remove("d-none");
  balance.classList.add("d-none");
});

cancelarBtn.addEventListener("click", () => {
  balance.classList.remove("d-none");
  containerNuevaOperacion.classList.add("d-none");
});

ocultarFiltros.addEventListener("click", () => {
  containerFiltros.classList.toggle("d-none");
});






//                                            *********************************************************************
//                                                                     SECCION BALANCE
//                                            *********************************************************************

//                                                             ************************************
//                                                                     SECCION OPERACIONES
//                                                             ************************************

let arrOperaciones = JSON.parse(localStorage.getItem('arrOperaciones')) || [];

const listaOperaciones = (arr) => {
  if (!arr.length){
    sinOperaciones.classList.remove('d-none');
    conOperaciones.classList.add('d-none');
  }else {
    sinOperaciones.classList.add('d-none');
    conOperaciones.classList.remove('d-none');
  }
}

agregarBtn.addEventListener('click', () => {

  const operacion = {
    id: uuidv4(),
    descripcion: descripcionInput.value,
    monto: montoInput.value,
    tipo: tipoSelect.value,
    categoria: categoriaSelect.value,
    fecha: fechaInput.value
  }

  arrOperaciones.push(operacion);

  balance.classList.remove('d-none');
  containerNuevaOperacion.classList.add('d-none');

  descripcionInput.value = ''
  montoInput.value = 0
  tipoSelect.value = 'gasto'
  categoriaSelect.value = 'comida'
  fechaInput.valueAs = new Date()

  listaOperaciones(arrOperaciones)

  localStorage.setItem('arrOperaciones', JSON.stringify(arrOperaciones))

  operacionAgregada(arrOperaciones)
  
})

operacionAgregada = arr => {
  document.getElementById('operaciones').innerHTML = ''
  let str = ''
  arr.forEach((operacion) => {

    // const { id, descripcion, categoria, fecha, tipo, monto} = operacion;

    str += `<div class="mi-flex d-flex flex-row mt-4" >
              <div class="col-3 p-2">
                <span>${operacion.descripcion}</span>
              </div>
              <div class="col-2">
                <span class="color text-success">${operacion.categoria}</span>
              </div>
              <div class="col-2 text-end">
                <span>${operacion.fecha}</span>
              </div>
              <div class="col-2 text-end fw-bold">
                <span class="${operacion.tipo === 'ganancia'? 'green' : 'red'}">${operacion.monto}</span>
              </div>
                <span class="col-3 text-end">
                  <a href="#" class="btn-editar me-2" data-id=${operacion.id} >Editar</a>
                  <a href="#" class="btn-eliminar" data-id=${operacion.id} >Eliminar</a>
                </span>
            </div>`

          operaciones.innerHTML = str;
  })

  const btnsEliminar = document.querySelectorAll('.btn-eliminar');
  btnsEliminar.forEach(btn => {
    btn.addEventListener('click', e => {
      const arregloSinOperacion = arrOperaciones.filter(operacion => operacion.id !== e.target.dataset.id)
      localStorage.setItem('arrOperaciones', JSON.stringify(arregloSinOperacion))
      arrOperaciones = JSON.parse(localStorage.getItem('arrOperaciones'))
      operacionAgregada(arrOperaciones)
      listaOperaciones(arrOperaciones)
   })
})
}



// ************    SECCION FILTROS   ************


//          ** FILTRO POR GASTO/GANANCIA **

let arrTipoFiltro = JSON.parse(localStorage.getItem('arrOperaciones')) || [];

const selectFilterTipo = document.getElementById("select-filter-tipo");

selectFilterTipo.addEventListener('change', e => {
  if(e.target.value !== 'todos'){
    const arrFiltroTipo = arrOperaciones.filter(operacion => operacion.tipo == e.target.value)
    localStorage.setItem('arrTipoFiltro', arrFiltroTipo)
    localStorage.setItem('arrTipoFiltro',JSON.stringify(arrFiltroTipo))

    operacionAgregada(arrFiltroTipo);
}else{

    operacionAgregada(arrOperaciones);
}
})

arrTipoFiltro = [...arrOperaciones]

//     ****** FILTRO POR CATEGORIA *******


const arrCategoriasIniciales = [
  'Comida',
  'Servicios',
  'Salidas',
  'Educacion',
  'Transporte',
  'Trabajo'
]

const generarFiltrosCategorias = () => {
  const selects = document.getElementsByClassName('categoria-select')
  
  for (let i = 0; i < selects.length; i++) {
    const select = selects[i];
    if(select.classList.contains('filtro-categoria')){
      select.innerHTML = '<option value="todas">Todas</option>'
    }
    for(let j = 0; j < arrCategoriasIniciales.length; j++) {
      select.innerHTML += `<option value=${arrCategoriasIniciales[j]}>${arrCategoriasIniciales[j]}</option>`
    }
  }
}
generarFiltrosCategorias()

const selectFilterCategorias = document.getElementById("select-filter-categorias");

let arrCategiriaFiltro = JSON.parse(localStorage.getItem('arrOperaciones')) || [];

selectFilterCategorias.addEventListener('input', e => {
  if(e.target.value !== 'todos'){
    const arrFiltroCategorias= arrOperaciones.filter(operacion => operacion.categoria === e.target.value)
    localStorage.setItem('arrCategiriaFiltro', arrFiltroCategorias)
    localStorage.setItem('arrCategiriaFiltro',JSON.stringify(arrFiltroCategorias))

    operacionAgregada(arrFiltroCategorias);
  }else{

    operacionAgregada(arrOperaciones);
}
})

arrCategiriaFiltro = [...arrOperaciones]


const inicializar = () => {
  fechaInput.valueAsDate = new Date ()
  operacionAgregada(arrOperaciones);
  listaOperaciones(arrOperaciones);
}

window.onload = inicializar

