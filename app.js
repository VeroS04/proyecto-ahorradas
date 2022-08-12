const btnBalance = document.getElementById("btn-balance");
const btnCategorias = document.getElementById("btn-categorias");
const btnReportes = document.getElementById("btn-reportes");
const btnNuevaOperacion = document.getElementById("btn-nueva-operacion");
const cancelarBtn = document.getElementById("cancelar-btn");
const agregarBtn = document.getElementById("agregar-btn");
const ocultarFiltros = document.getElementById("ocultar-filtros");
const agregarEditadoBtn = document.getElementById("agregar-editado-btn");

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
const inputEditarDescripcion = document.getElementById("input-edit-descripcion");
const inputEditarMonto = document.getElementById("input-edit-monto");
const selectEditarTipo = document.getElementById("select-edit-tipo");
const selectEditarCategoria = document.getElementById("select-edit-categoria");
const inputEditarFecha = document.getElementById("input-edit-fecha");
const cardEditarOperacion = document.getElementById('container-editar-operacion')

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
  containerNuevaOperacion.classList.add("d-none");
});

btnReportes.addEventListener("click", () => {
  reportes.classList.remove("d-none");
  categorias.classList.add("d-none");
  balance.classList.add("d-none");
  containerNuevaOperacion.classList.add("d-none");
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






//                                                             ************************************
//                                                                     SECCION OPERACIONES
//                                                             ************************************

let arrOperaciones = JSON.parse(localStorage.getItem('arrOperaciones')) || [];

const listaOperaciones = (arr) => {
  if (!arr.length) {
    sinOperaciones.classList.remove('d-none');
    conOperaciones.classList.add('d-none');
  } else {
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

    const {
      id,
      descripcion,
      categoria,
      fecha,
      tipo,
      monto
    } = operacion;

    str += `<div class="mi-flex d-flex flex-row mt-4" >
              <div class="col-3">
                <span>${descripcion}</span>
              </div>
              <div class="col-2">
                <span class="color text-success">${categoria}</span>
              </div>
              <div class="col-2 text-end">
                <span>${fecha}</span>
              </div>
              <div class="col-2 text-end fw-bold">
                <span class="${tipo === 'ganancia'? 'green' : 'red'}">${monto}</span>
              </div>
                <span class="col-3 text-end">
                  <a href="#" class="btn-editar me-2" data-id=${id} >Editar</a>
                  <a href="#" class="btn-eliminar" data-id=${id} >Eliminar</a>
                </span>
            </div>`

    operaciones.innerHTML = str;
  })

  //                             BOTON ELIMINAR OPERACION

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

  //                             BOTON EDITAR OPERACION

  const editarBtns = document.querySelectorAll('.btn-editar')

  editarBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      let arrEditarOperacion = arrOperaciones.filter(operacion => operacion.id === e.target.dataset.id)
      localStorage.setItem('arrOperaciones', JSON.stringify(arrEditarOperacion))
      arrOperaciones = JSON.parse(localStorage.getItem('arrOperaciones'))

      editarOperacion(arrEditarOperacion)
      listaOperaciones(arrOperaciones)

    })
  })


  const editarOperacion = arr => {
    const {
      id,
      descripcion,
      monto,
      tipo,
      categoria,
      fecha
    } = arr[0]

    inputEditarDescripcion.value = descripcion;
    inputEditarMonto.value = monto;
    inputEditarFecha.value = fecha;
    selectEditarCategoria.value = categoria;
    selectEditarTipo.value = tipo


    balance.classList.add('d-none');
    cardEditarOperacion.classList.remove('d-none')
    console.log(arr)

  }


  agregarEditadoBtn.addEventListener('click', () => {

    const operacionEditada = {
      id: uuidv4(),
      descripcion: inputEditarDescripcion.value,
      monto: inputEditarMonto.value,
      tipo: selectEditarTipo.value,
      categoria: selectEditarCategoria.value,
      fecha: inputEditarFecha.value
    }

    console.log(operacionEditada);
    balance.classList.remove('d-none');
    cardEditarOperacion.classList.add('d-none')

  })


  const cancelarEdicionBtn = document.getElementById('cancelar-editar-btn')

  cancelarEdicionBtn.addEventListener('click', () => {
    balance.classList.remove('d-none');
    cardEditarOperacion.classList.add('d-none')
  })
}






//                                            *********************************************************************
//                                                                     SECCION BALANCE
//                                            *********************************************************************


const totalBalance = arr => {
  const resultGanancias = arr.filter(operacion => operacion.tipo === 'ganancia').reduce((prev, current) =>
    prev + Number(current.monto), 0)
  const totalGanancia = document.getElementById('total-ganancia').innerHTML += `<p class="fs-5">Ganancias</p>
 <div class="total-ganancias" style="color:rgb(109, 213, 6);">+$${resultGanancias}</div>`


  const resultGastos = arr.filter(operacion => operacion.tipo === 'gasto').reduce((prev, current) =>
    prev + Number(current.monto), 0)
  const totalGastos = document.getElementById('total-gastos').innerHTML += `<p class="fs-5">Gastos</p>
  <div class="total-gastos" style="color:rgb(209, 7, 7);">-$${resultGastos}</div>`
  const totalBalance = document.getElementById('total-balance').innerHTML += `<h4>Total</h4>
  <div class="total-total fw-bold fs-4">$${resultGanancias - resultGastos}</div>`

  // Falta local storage para no tener que refrescar la página
}


// ************    SECCION FILTROS   ************


//          ** FILTRO POR GASTO/GANANCIA **

let arrTipoFiltro = JSON.parse(localStorage.getItem('arrOperaciones')) || [];

const selectFilterTipo = document.getElementById("select-filter-tipo");

selectFilterTipo.addEventListener('change', e => {
  if (e.target.value !== 'todos') {
    const arrFiltroTipo = arrOperaciones.filter(operacion => operacion.tipo == e.target.value)
    localStorage.setItem('arrTipoFiltro', arrFiltroTipo)
    localStorage.setItem('arrTipoFiltro', JSON.stringify(arrFiltroTipo))

    operacionAgregada(arrFiltroTipo);
  } else {

    operacionAgregada(arrOperaciones);
  }
})

//     ****** FILTRO POR CATEGORIA *******


let arrCategoriasIniciales = JSON.parse(localStorage.getItem('categorias')) || [{
    categoria: 'Comida',
    id: uuidv4(),
  },
  {
    categoria: 'Servicios',
    id: uuidv4(),
  },
  {
    categoria: 'Salidas',
    id: uuidv4(),
  },
  {
    categoria: 'Educacion',
    id: uuidv4(),
  },
  {
    categoria: 'Transporte',
    id: uuidv4(),
  },
  {
    categoria: 'Trabajo',
    id: uuidv4(),
  }
]

const generarFiltrosCategorias = () => {
  const selects = document.getElementsByClassName('categoria-select')

  for (let i = 0; i < selects.length; i++) {
    const select = selects[i];
    if (select.classList.contains('filtro-categoria')) {
      select.innerHTML = '<option value="todas">Todas</option>'
    }
    for (let j = 0; j < arrCategoriasIniciales.length; j++) {
      select.innerHTML += `<option value=${arrCategoriasIniciales[j].categoria}>${arrCategoriasIniciales[j].categoria}</option>`
    }
  }
}
generarFiltrosCategorias()

const selectFilterCategorias = document.getElementById("select-filter-categorias");

let arrCategiriaFiltro = JSON.parse(localStorage.getItem('arrOperaciones')) || [];

selectFilterCategorias.addEventListener('input', e => {
  if (e.target.value !== 'todas') {
    const arrFiltroCategorias = arrOperaciones.filter(operacion => operacion.categoria === e.target.value)
    localStorage.setItem('arrCategiriaFiltro', arrFiltroCategorias)
    localStorage.setItem('arrCategiriaFiltro', JSON.stringify(arrFiltroCategorias))

    operacionAgregada(arrFiltroCategorias);
  } else {

    operacionAgregada(arrOperaciones);
  }
})


//                                            *********************************************************************
//                                                                     SECCION CATEGORIA
//                                            *********************************************************************

const categoriaNuevaBtn = document.getElementById('agregar-categoria-nueva');
const inputNombreCategoria = document.getElementById('nombre-input');
const ListaDeCategorias = document.getElementById('lista-categorias')

categoriaNuevaBtn.addEventListener('click', () => {

  const nuevaCategoria = {
    categoria: inputNombreCategoria.value,
    id: uuidv4()
  }

  arrCategoriasIniciales.push(nuevaCategoria)

  inputNombreCategoria.value = '';

  ListaDeCategorias.innerHTML += ` <div class="d-flex justify-content-between mt-3 mb-2">
  <div style="color:#00947e; background-color: #ebfffc;">${nuevaCategoria.categoria}</div>
    <div>
      <a href="#" class="btn-editar-categoria me-2" data-id=${nuevaCategoria.id}>Editar</a>
      <a href="#" class="btn-eliminar-categoria" data-id=${nuevaCategoria.id}>Eliminar</a> 
    </div>
  </div>`

  localStorage.setItem('categorias', JSON.stringify(arrCategoriasIniciales))
  const categoriaEditada = JSON.parse(localStorage.getItem('categorias'))

  generarFiltrosCategorias(categoriaEditada)
})

const generarCategorias = () => {

  for (let i = 0; i < arrCategoriasIniciales.length; i++) {

    ListaDeCategorias.innerHTML += ` <div class="d-flex justify-content-between mt-3 mb-2">
                                        <div style="color:#00947e; background-color: #ebfffc;">${arrCategoriasIniciales[i].categoria}</div>
                                        <div>
                                          <a href="#" class="btn-editar-categoria me-2" data-id=${arrCategoriasIniciales[i].id} >Editar</a>
                                          <a href="#" class="btn-eliminar-categoria" data-id=${arrCategoriasIniciales[i].id} >Eliminar</a> 
                                        </div>
                                      </div>`

  }
  localStorage.setItem('categorias', JSON.stringify(arrCategoriasIniciales))

  const btnsEliminarCategoria = document.querySelectorAll('.btn-eliminar-categoria');
  btnsEliminarCategoria.forEach(btn => {
    btn.addEventListener('click', e => {
      const arrCategoriaEditada = arrCategoriasIniciales.filter(categoria => categoria.id !== e.target.dataset.id)
      localStorage.setItem('arrCategoriasIniciales', JSON.stringify(arrCategoriaEditada))
      localStorage.setItem('categorias', JSON.stringify(arrCategoriaEditada))
      arrCategoriasIniciales = JSON.parse(localStorage.getItem('arrCategoriasIniciales'))
      generarCategorias(arrCategoriaEditada)
      generarFiltrosCategorias(arrCategoriaEditada)
      console.log(arrCategoriaEditada);
    })
  })

}







const inicializar = () => {
  fechaInput.valueAsDate = new Date()
  generarCategorias(arrCategoriasIniciales)
  operacionAgregada(arrOperaciones);
  listaOperaciones(arrOperaciones);
  totalBalance(arrOperaciones);
}

window.onload = inicializar