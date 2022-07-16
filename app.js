const btnBalance = document.getElementById('btn-balance');
const btnCategorias = document.getElementById('btn-categorias');
const btnReportes = document.getElementById('btn-reportes');
const balance = document.getElementById('balance');
const categorias = document.getElementById('categorias');
const reportes = document.getElementById('reportes');

btnBalance.addEventListener('click', ()=>{
    balance.classList.remove('oculto');
    categorias.classList.add('oculto');
    reportes.classList.add('oculto');
    
})

btnCategorias.addEventListener('click', ()=>{
    categorias.classList.remove('oculto');
    balance.classList.add('oculto');
    reportes.classList.add('oculto');
    
})

btnReportes.addEventListener('click', ()=>{
    reportes.classList.remove('oculto');
    categorias.classList.add('oculto');
    balance.classList.add('oculto');
    
})