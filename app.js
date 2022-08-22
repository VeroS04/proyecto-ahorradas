//BOTONES Y SELECTS

const btnBalance = document.getElementById("btn-balance");
const btnCategorias = document.getElementById("btn-categorias");
const btnReportes = document.getElementById("btn-reportes");
const btnNuevaOperacion = document.getElementById("btn-nueva-operacion");
const cancelarBtn = document.getElementById("cancelar-btn");
const agregarBtn = document.getElementById("agregar-btn");
const ocultarFiltros = document.getElementById("ocultar-filtros");
const selectEditarTipo = document.getElementById("select-edit-tipo");

// PAGINAS Y FORMULARIOS
const balance = document.getElementById("balance");
const categorias = document.getElementById("categorias");
const reportes = document.getElementById("reportes");
const containerNuevaOperacion = document.getElementById(
  "container-nueva-operacion"
);
const cardBalance = document.getElementById("card-balance");
const containerFiltros = document.getElementById("container-filtros");
const sinOperaciones = document.getElementById("sin-operaciones");
const conOperaciones = document.getElementById("con-operaciones");
const operaciones = document.getElementById("operaciones");
const cardEditarOperacion = document.getElementById(
  "container-editar-operacion"
);
const cardEditarcategoria = document.getElementById("card-editar-categorias");
const cardCategoria = document.getElementById("card-categorias");
const reporteSinOperacion = document.getElementById("reporte-sin-operacion");
const reporteConOperacion = document.getElementById("reporte-con-operaciones");
const PorCategoriaLista = document.getElementById("total-por-categoria");

// INPUTS

const descripcionInput = document.getElementById("descripcion-input");
const montoInput = document.getElementById("monto-input");
const tipoSelect = document.getElementById("tipo-select");
const categoriaSelect = document.getElementById("categoria-select");
const fechaInput = document.getElementById("fecha-input");
const inputEditarDescripcion = document.getElementById(
  "input-edit-descripcion"
);
const inputEditarMonto = document.getElementById("input-edit-monto");
const selectEditarCategoria = document.getElementById("select-edit-categoria");
const inputEditarFecha = document.getElementById("input-edit-fecha");

// ************ SECCION EVENTOS NAV ************

// Boton a balance que oculta categorias, reportes y formulario de nueva operacion

btnBalance.addEventListener("click", () => {
  balance.classList.remove("d-none");
  categorias.classList.add("d-none");
  reportes.classList.add("d-none");
  containerNuevaOperacion.classList.add("d-none");
  cardEditarOperacion.classList.add("d-none");
});

// Boton a categorias que oculta balance, reportes y formulario de nueva operacion

btnCategorias.addEventListener("click", () => {
  categorias.classList.remove("d-none");
  balance.classList.add("d-none");
  reportes.classList.add("d-none");
  containerNuevaOperacion.classList.add("d-none");
  cardEditarOperacion.classList.add("d-none");
});

// Boton a reportes que oculta balance, categorias y formulario de nueva operacion

btnReportes.addEventListener("click", () => {
  reportes.classList.remove("d-none");
  categorias.classList.add("d-none");
  balance.classList.add("d-none");
  containerNuevaOperacion.classList.add("d-none");
  cardEditarOperacion.classList.add("d-none");
  if (!arrOperaciones.length) {
    reporteSinOperacion.classList.remove("d-none");
    reporteConOperacion.classList.add("d-none");
  } else {
    reporteConOperacion.classList.remove("d-none");
    reporteSinOperacion.classList.add("d-none");
  }
});

// Boton a formulario de nueva operacion que oculta balance, categorias y reportes

btnNuevaOperacion.addEventListener("click", () => {
  containerNuevaOperacion.classList.remove("d-none");
  balance.classList.add("d-none");
});

// Boton que cancela formulario de nueva operacion y deja en vista a balance

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

// Arreglo original donde se guardan las operaciones
let arrOperaciones = JSON.parse(localStorage.getItem("arrOperaciones")) || [];

// Función que oculta la imagen de sin operaciones si hay operaciones nuevas
const listaOperaciones = (arr) => {
  if (!arr.length) {
    sinOperaciones.classList.remove("d-none");
    conOperaciones.classList.add("d-none");
  } else {
    sinOperaciones.classList.add("d-none");
    conOperaciones.classList.remove("d-none");
  }
};

// Botón que agrega una operacion nueva que se crea con la funcion operacionAgregada

agregarBtn.addEventListener("click", () => {
  const operacion = {
    id: uuidv4(),
    descripcion: descripcionInput.value,
    monto: montoInput.value,
    tipo: tipoSelect.value,
    categoria: categoriaSelect.value,
    fecha: fechaInput.value,
  };

  arrOperaciones.push(operacion);

  balance.classList.remove("d-none");
  containerNuevaOperacion.classList.add("d-none");

  descripcionInput.value = "";
  montoInput.value = 0;
  tipoSelect.value = "gasto";
  categoriaSelect.value = "comida";
  fechaInput.valueAs = new Date();

  listaOperaciones(arrOperaciones);

  localStorage.setItem("arrOperaciones", JSON.stringify(arrOperaciones));

  operacionAgregada(arrOperaciones);
});

// Función que crea el div con las operaciones

operacionAgregada = (arr) => {
  document.getElementById("operaciones").innerHTML = "";
  let str = "";
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
                <span class="${
                  tipo === "ganancia" ? "green" : "red"
                }">${monto}</span>
              </div>
                <span class="col-3 text-end">
                  <a href="#" class="btn-editar me-2" data-id=${id} >Editar</a>
                  <a href="#" class="btn-eliminar" data-id=${id} >Eliminar</a>
                </span>
            </div>`;
  });
  operaciones.innerHTML = str;
  totalBalance(arrOperaciones);

  //                             BOTON EDITAR OPERACION

  const agregarEditadoBtn = document.getElementById("agregar-editado-btn");
  const editarBtns = document.querySelectorAll(".btn-editar");

  editarBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      balance.classList.add("d-none");
      cardEditarOperacion.classList.remove("d-none");

      let arrEditarOperacion = arrOperaciones.filter(
        (operacion) => operacion.id === e.target.dataset.id
      );

      arrEditarOperacion.forEach((operacion) => {
        inputEditarDescripcion.value = operacion.descripcion;
        inputEditarMonto.value = operacion.monto;
        selectEditarCategoria.value = operacion.categoria;
        selectEditarTipo.value = operacion.tipo;
        inputEditarFecha.value = operacion.fecha;
      });

      agregarEditadoBtn.addEventListener("click", () => {
        const operacionEditada = arrOperaciones.filter(
          (operacion) => operacion.id === arrEditarOperacion[0].id
        );

        const operacionFiltrada = operacionEditada[0];
        operacionFiltrada.descripcion = inputEditarDescripcion.value;
        operacionFiltrada.monto = inputEditarMonto.value;
        operacionFiltrada.tipo = selectEditarTipo.value;
        operacionFiltrada.categoria = selectEditarCategoria.value;
        operacionFiltrada.fecha = inputEditarFecha.value;

        const nuevaOperacionEditada = arrOperaciones.map((operacion) =>
          operacion.id === arrOperaciones[0].id ? operacionFiltrada : operacion
        );

        localStorage.setItem(
          "arrOperaciones",
          JSON.stringify(nuevaOperacionEditada)
        );
        arrOperaciones = JSON.parse(localStorage.getItem("arrOperaciones"));

        balance.classList.remove("d-none");
        cardEditarOperacion.classList.add("d-none");

        operacionAgregada(arrOperaciones);
        listaOperaciones(arrOperaciones);
        totalBalance(arrOperaciones);
      });
    });
  });

  const cancelarEdicionBtn = document.getElementById("cancelar-editar-btn");

  cancelarEdicionBtn.addEventListener("click", () => {
    balance.classList.remove("d-none");
    cardEditarOperacion.classList.add("d-none");
  });

  //                             BOTON ELIMINAR OPERACION

  const btnsEliminar = document.querySelectorAll(".btn-eliminar");

  btnsEliminar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const arregloSinOperacion = arrOperaciones.filter(
        (operacion) => operacion.id !== e.target.dataset.id
      );
      localStorage.setItem(
        "arrOperaciones",
        JSON.stringify(arregloSinOperacion)
      );
      arrOperaciones = JSON.parse(localStorage.getItem("arrOperaciones"));
      operacionAgregada(arrOperaciones);
      listaOperaciones(arrOperaciones);
    });
  });
};

//                                            *********************************************************************
//                                                                     SECCION BALANCE
//                                            *********************************************************************

// Función que pinta las ganacias, los gastos y el balance
const totalBalance = (arr) => {
  const resultGanancias = arr
    .filter((operacion) => operacion.tipo === "ganancia")
    .reduce((prev, current) => prev + Number(current.monto), 0);
  const totalGanancia = (document.getElementById(
    "total-ganancia"
  ).innerHTML = `<p class="fs-5">Ganancias</p>
 <div class="total-ganancias" style="color:rgb(109, 213, 6);">+$${resultGanancias}</div>`);

  const resultGastos = arr
    .filter((operacion) => operacion.tipo === "gasto")
    .reduce((prev, current) => prev + Number(current.monto), 0);
  const totalGastos = (document.getElementById(
    "total-gastos"
  ).innerHTML = `<p class="fs-5">Gastos</p>
  <div class="total-gastos" style="color:rgb(209, 7, 7);">-$${resultGastos}</div>`);

  const totalDeBalance = (document.getElementById(
    "total-balance"
  ).innerHTML = `<h4>Total</h4>
  <div class="total-total fw-bold fs-4">$${
    resultGanancias - resultGastos
  }</div>`);
};

//                             ***********************************************
//                                          SECCION FILTROS
//                             ***********************************************

//          ***** FILTRO POR GASTO/GANANCIA *****

let arrTipoFiltro = JSON.parse(localStorage.getItem("arrOperaciones")) || [];

const selectFilterTipo = document.getElementById("select-filter-tipo");

selectFilterTipo.addEventListener("change", (e) => {
  if (e.target.value !== "todos") {
    const arrFiltroTipo = arrOperaciones.filter(
      (operacion) => operacion.tipo == e.target.value
    );
    localStorage.setItem("arrTipoFiltro", arrFiltroTipo);
    localStorage.setItem("arrTipoFiltro", JSON.stringify(arrFiltroTipo));

    operacionAgregada(arrFiltroTipo);
  } else {
    operacionAgregada(arrOperaciones);
  }
});

//           ****** FILTRO POR CATEGORIA *******

// Arreglo donde se guardan las categorias predeterminadas y donde se suman nuevas

let arrCategoriasIniciales = JSON.parse(localStorage.getItem("categorias")) || [{
    categoria: "Comida",
    id: uuidv4(),
  },
  {
    categoria: "Servicios",
    id: uuidv4(),
  },
  {
    categoria: "Salidas",
    id: uuidv4(),
  },
  {
    categoria: "Educacion",
    id: uuidv4(),
  },
  {
    categoria: "Transporte",
    id: uuidv4(),
  },
  {
    categoria: "Trabajo",
    id: uuidv4(),
  },
];

// Función que genera las categorias tomando el objeto que esta en el arreglo de categorias iniciales

const generarFiltrosCategorias = (arr) => {
  const selects = document.getElementsByClassName("categoria-select");

  for (let i = 0; i < selects.length; i++) {
    const select = selects[i];
    if (select.classList.contains("filtro-categoria")) {
      select.innerHTML = '<option value="todas">Todas</option>';
    }
    for (let j = 0; j < arr.length; j++) {
      select.innerHTML += `<option value=${arr[j].categoria}>${arr[j].categoria}</option>`;
    }
  }
};

const selectFilterCategorias = document.getElementById(
  "select-filter-categorias"
);

let arrCategoriaFiltro =
  JSON.parse(localStorage.getItem("arrOperaciones")) || [];

// Función que realiza el filtro por categoria

selectFilterCategorias.addEventListener("input", (e) => {
  if (e.target.value !== "todas") {
    const arrFiltroCategorias = arrOperaciones.filter(
      (operacion) => operacion.categoria === e.target.value
    );
    localStorage.setItem("arrCategoriaFiltro", arrFiltroCategorias);
    localStorage.setItem(
      "arrCategoriaFiltro",
      JSON.stringify(arrFiltroCategorias)
    );

    operacionAgregada(arrFiltroCategorias);
  } else {
    operacionAgregada(arrOperaciones);
  }
});

//         ****************   FILTRO ORDENAR POR ********************

const filtroOrdenarPor = document.getElementById("filtro-ordenar-por");
let ordenCategorias;
filtroOrdenarPor.addEventListener("input", (e) => {
  if (e.target.value === "mayor-monto") {
    ordenCategorias = arrOperaciones.sort((a, b) =>
      Number(a.monto) > Number(b.monto) ?
      -1 :
      Number(a.monto) < Number(b.monto) ?
      1 :
      0
    );
  } else if (e.target.value === "menor-monto") {
    ordenCategorias = arrOperaciones.sort((a, b) =>
      Number(a.monto) > Number(b.monto) ?
      1 :
      Number(a.monto) < Number(b.monto) ?
      -1 :
      0
    );
  } else if (e.target.value === "a-z") {
    ordenCategorias = arrOperaciones.sort((a, b) =>
      a.descripcion.localeCompare(b.descripcion)
    );
  } else if (e.target.value === "z-a") {
    ordenCategorias = arrOperaciones.sort((a, b) =>
      b.descripcion.localeCompare(a.descripcion)
    );
  } else if (e.target.value === "mas-reciente") {
    ordenCategorias = arrOperaciones.sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );
  } else if (e.target.value === "menos-reciente") {
    ordenCategorias = arrOperaciones.sort(
      (a, b) => new Date(a.fecha) - new Date(b.fecha)
    );
  }

  operacionAgregada(ordenCategorias);
  //****** funcionan más y menos reciente, pero si le doy primero el click a Más reciente
  //no funciona, si empiezo con el otro sí
});

// ***************** FILTRO DESDE ***************

const filtroDesde = document.getElementById("date");

filtroDesde.addEventListener("change", (e) => {
  const ordenDesde = arrOperaciones.filter(
    (operacion) => new Date(operacion.fecha) >= new Date(e.target.value)
  );
  operacionAgregada(ordenDesde);
});

//**** Falta que los filtros funcionen juntos

//                                            *********************************************************************
//                                                                     SECCION CATEGORIA
//                                            *********************************************************************

const categoriaNuevaBtn = document.getElementById("agregar-categoria-nueva");
const inputNombreCategoria = document.getElementById("nombre-input");
const ListaDeCategorias = document.getElementById("lista-categorias");

// Botón que agrega una categoria nueva

categoriaNuevaBtn.addEventListener("click", () => {
  const nuevaCategoria = {
    categoria: inputNombreCategoria.value,
    id: uuidv4(),
  };

  arrCategoriasIniciales.push(nuevaCategoria);

  inputNombreCategoria.value = "";

  ListaDeCategorias.innerHTML += ` <div class="d-flex justify-content-between mt-3 mb-2">
  <div style="color:#00947e; background-color: #ebfffc;">${nuevaCategoria.categoria}</div>
    <div>
      <a href="#" class="btn-editar-categoria me-2" data-id=${nuevaCategoria.id}>Editar</a>
      <a href="#" class="btn-eliminar-categoria" data-id=${nuevaCategoria.id}>Eliminar</a> 
    </div>
  </div>`;

  localStorage.setItem("categorias", JSON.stringify(arrCategoriasIniciales));
  const categoriaEditada = JSON.parse(localStorage.getItem("categorias"));

  generarFiltrosCategorias(categoriaEditada);
});

// Función que pinta la categoria nueva

const pintarCategorias = (arr) => {
  ListaDeCategorias.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {
    ListaDeCategorias.innerHTML += ` <div class="d-flex justify-content-between mt-3 mb-2">
                                        <div style="color:#00947e; background-color: #ebfffc;">${arr[i].categoria}</div>
                                        <div>
                                          <a href="#" class="btn-editar-categoria me-2" data-id=${arr[i].id} >Editar</a>
                                          <a href="#" class="btn-eliminar-categoria" data-id=${arr[i].id} >Eliminar</a> 
                                        </div>
                                      </div>`;
  }
  localStorage.setItem("categorias", JSON.stringify(arrCategoriasIniciales));

  //               ***** BOTON EDITAR CATEGORIA *****

  const btnsEditarCategoria = document.querySelectorAll(
    ".btn-editar-categoria"
  );
  const btnCategoriaEditada = document.getElementById(
    "agregar-categoria-editada"
  );
  const btnCancelarCategoria = document.getElementById(
    "cancelar-categoria-editada"
  );
  const inputEditadoNombre = document.getElementById("editado-nombre-input");

  btnsEditarCategoria.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      cardEditarcategoria.classList.remove("d-none");
      cardCategoria.classList.add("d-none");
      let arrEditarategoria = arrCategoriasIniciales.filter(
        (categoria) => categoria.id === e.target.dataset.id
      );

      arrEditarategoria.forEach((categoria) => {
        inputEditadoNombre.value = categoria.categoria;
      });

      btnCategoriaEditada.addEventListener("click", () => {
        const cambioCategoria = arrCategoriasIniciales.filter(
          (categoria) => categoria.id === arrEditarategoria[0].id
        );

        const filtrada = cambioCategoria[0];
        filtrada.categoria = inputEditadoNombre.value;
        const accionEditar = arrCategoriasIniciales.map((categoria) =>
          categoria.id === arrEditarategoria[0].id ? filtrada : categoria
        );

        localStorage.setItem(
          "arrCategoriasIniciales",
          JSON.stringify(accionEditar)
        );
        arrCategoriasIniciales = JSON.parse(
          localStorage.getItem("arrCategoriasIniciales")
        );

        cardEditarcategoria.classList.add("d-none");
        cardCategoria.classList.remove("d-none");

        pintarCategorias(arrCategoriasIniciales);
        generarFiltrosCategorias(arrCategoriasIniciales);
      });
    });
  });

  btnCancelarCategoria.addEventListener("click", () => {
    cardEditarcategoria.classList.add("d-none");
    cardCategoria.classList.remove("d-none");
  });

  //               ***** BOTON ELIMINAR CATEGORIA *****

  const btnsEliminarCategoria = document.querySelectorAll(
    ".btn-eliminar-categoria"
  );
  btnsEliminarCategoria.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const arrCategoriaEliminada = arrCategoriasIniciales.filter(
        (categoria) => categoria.id !== e.target.dataset.id
      );
      localStorage.setItem("categorias", JSON.stringify(arrCategoriaEliminada));
      arrCategoriasIniciales = JSON.parse(localStorage.getItem("categorias"));
      pintarCategorias(arrCategoriaEliminada);
      generarFiltrosCategorias(arrCategoriaEliminada);
    });
  });
};

//                                            *********************************************************************
//                                                                     SECCION REPORTES
//                                            *********************************************************************

//*** Resumen

// Funcion que realiza un filtrado de las operaciones y devuelve las categorias y meses con mayor ganancia y 
// las categorias y meses con mayor con mayor gasto

const reportesResumen = () => {
  const resumenMayorGanancia = arrOperaciones.filter(
    (operacion) => operacion.tipo === "ganancia"
  );
  const totalMayorGanancia = resumenMayorGanancia.sort(
    (a, b) => b.monto - a.monto
  );
  document.getElementById(
    "categoria-mayor-ganancia"
  ).innerHTML = `<h6>Categoria con mayor ganancia</h6>
<div>
  <div class="color">${totalMayorGanancia[0].categoria}
  </div>
</div> 
    <div class= "mb-4  align-item-center" style="color:rgb(109, 213, 6);">+$${totalMayorGanancia[0].monto}</div>`;

  const resumenMayorGasto = arrOperaciones.filter(
    (operacion) => operacion.tipo === "gasto"
  );
  const totalMayorGasto = resumenMayorGasto.sort((a, b) => b.monto - a.monto);

  document.getElementById(
    "categoria-mayor-gasto"
  ).innerHTML = `<h6>Categoria con mayor gasto</h6>
<div>
  <div class="color">${totalMayorGasto[0].categoria}
  </div>
</div> 
    <div class= "mb-4  align-item-center" style="color:rgb(209, 7, 7);">-$${totalMayorGasto[0].monto}</div>`;
};

const mesMayorGananciaYGasto = () => {
  const resumenMayorMonto = arrOperaciones.sort((a, b) =>
    (b.monto - a.monto))

  const gananciaMayor = resumenMayorMonto.filter((operacion) =>
    operacion.tipo === 'ganancia')
  document.getElementById('mes-mayor-ganancia').innerHTML = `<h6>Mes con mayor ganancia</h6>
<div>
  <div class="color">${gananciaMayor[0].fecha.split('-')[1]}
  </div>
</div> 
    <div class= "mb-4  align-item-center" style="color:rgb(109, 213, 6);">+$${gananciaMayor[0].monto}</div>`;

  const gastoMayor = resumenMayorMonto.filter((operacion) =>
    operacion.tipo === 'gasto')
  document.getElementById('mes-mayor-gasto').innerHTML = `<h6>Mes con mayor gasto</h6>
<div>
  <div class="color">${gastoMayor[0].fecha.split('-')[1]}
  </div>
</div> 
    <div class= "mb-4 justify-content-center" style="color:rgb(209, 7, 7);">-$${gastoMayor[0].monto}</div>`;
};


//Totales por categoria

// Funcion que filtra las categorias y operaciones y devuelve las categorias que tienen operaciones y 
// la suma total de sus ganancias y gastos y el balance

const totalesPorCategoria = (arrOperaciones, arrCategoriasIniciales) => {
  let arrConMonto = [];
  arrCategoriasIniciales.forEach((categoria) => {
    const porCategoria = arrOperaciones.filter(
      (operacion) => operacion.categoria === categoria.categoria
    );
    porCategoria.forEach((operacion) => {
      if (operacion.monto !== 0) {
        arrConMonto.push(operacion);
      }

      const totalGananciaCategoria = porCategoria
        .filter((operacion) => operacion.tipo === "ganancia")
        .reduce((count, current) => count + current.monto, 0);
      const totalGastoCategoria = porCategoria
        .filter((operacion) => operacion.tipo === "gasto")
        .reduce((count, current) => count + current.monto, 0);
      const totalPorCategoria = (document.getElementById(
        "total-categoria-categoria"
      ).innerHTML += `<div class="mb-4 mt-4">${categoria.categoria}</div>`);
      const totalPorCategoriaGanancia = (document.getElementById(
        "total-categoria-ganancias"
      ).innerHTML += `<div class="mb-4 mt-4 text-end" style="color:rgb(109, 213, 6);">+$${totalGananciaCategoria}</div>`);
      const totalPorCategoriaGasto = (document.getElementById(
        "total-categoria-gastos"
      ).innerHTML += `<div class="mb-4 mt-4 text-end" style="color:rgb(209, 7, 7);">-$${totalGastoCategoria}</div>`);
      const totalPorCategoriaBalance = (document.getElementById(
        "total-categoria-balance"
      ).innerHTML += `<div class="mb-4 mt-4 text-end">$${
        totalGananciaCategoria - totalGastoCategoria
      }</div>`);
    });
  });
};

// Totales por Mes

// Funcion que filtra las operaciones y devuelve los meses que tienen operaciones y 
// la suma total de sus ganancias y gastos y su balance

const totalPorMes = (arr) => {
  const mesesSinRepetir = [
    ...new Set(arr.map((operacion) => operacion.fecha.split("-")[1])),
  ].sort();

  for (let i = 0; i < mesesSinRepetir.length; i++) {
    const operacionesPorMes = arr.filter(
      (operacion) => operacion.fecha.split("-")[1] === mesesSinRepetir[i]
    );
    const porTipoGanancia = operacionesPorMes
      .filter((operacion) => operacion.tipo === "ganancia")
      .reduce((prev, current) => prev + Number(current.monto), 0);
    const porTipoGasto = operacionesPorMes
      .filter((operacion) => operacion.tipo === "gasto")
      .reduce((prev, current) => prev + Number(current.monto), 0);

    const totalMesMeses = (document.getElementById(
      "total-mes-meses"
    ).innerHTML += `<div class="mb-4 mt-4 text-end">${mesesSinRepetir[i]} </div>`);
    const totalMesGanancia = (document.getElementById(
      "total-mes-ganancias"
    ).innerHTML += `<div class="mb-4 mt-4 text-end" style="color:rgb(109, 213, 6);">+$${porTipoGanancia}</div>`);
    const totalMesGastos = (document.getElementById(
      "total-mes-gastos"
    ).innerHTML += `<div class="mb-4 mt-4 text-end" style="color:rgb(209, 7, 7);">+$${porTipoGasto}</div>`);
    const totalMesBalance = (document.getElementById(
      "total-mes-balance"
    ).innerHTML += `<div class="mb-4 mt-4 text-end">+$${
      porTipoGanancia - porTipoGasto
    }</div>`);
  }
};

const inicializar = () => {
  fechaInput.valueAsDate = new Date();
  filtroDesde.valueAsDate = new Date();
  generarFiltrosCategorias(arrCategoriasIniciales);
  pintarCategorias(arrCategoriasIniciales);
  operacionAgregada(arrOperaciones);
  listaOperaciones(arrOperaciones);
  totalBalance(arrOperaciones);
  totalesPorCategoria(arrOperaciones, arrCategoriasIniciales);
  totalPorMes(arrOperaciones);
  reportesResumen(arrOperaciones);
  mesMayorGananciaYGasto(arrOperaciones);
};

window.onload = inicializar;