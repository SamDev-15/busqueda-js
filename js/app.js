const resultado   = document.querySelector("#resultado");
const year        = document.querySelector("#year");
const marca       = document.querySelector("#marca");
const minimo      = document.querySelector("#minimo");
const maximo      = document.querySelector("#maximo");
const puertas     = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color       = document.querySelector("#color");

const busqueda = {
    year:"",
    marca:"",
    minimo:"",
    maximo:"",
    puertas:"",
    transmision:"",
    color:""
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);
    loadyear();
})

year.addEventListener('change', e => {
    busqueda.year = parseInt(e.target.value);
    filtrarAuto();
})
marca.addEventListener('change', e => {
    busqueda.marca = e.target.value;
    filtrarAuto();
})
minimo.addEventListener('change', e => {
    busqueda.minimo = e.target.value;
    filtrarAuto();
})
maximo.addEventListener('change', e => {
    busqueda.maximo = e.target.value;
    filtrarAuto();
})
puertas.addEventListener('change', e => {
    busqueda.puertas = e.target.value;
    filtrarAuto();
})
transmision.addEventListener('change', e => {
    busqueda.transmision = e.target.value;
    filtrarAuto();
})
color.addEventListener('change', e => {
    busqueda.color = e.target.value;
    filtrarAuto();
})

function mostrarAutos(autos){

    limpiar();

    autos.forEach( auto => {

        const { marca,modelo,year,precio,puertas,color,transmision } = auto;

        const autoHTML = document.createElement("p");

        autoHTML.textContent = `${marca} ${modelo} ${puertas} puertas ${year} color : ${color}  trasmision : ${transmision}  precio : $ ${precio}`;

        resultado.appendChild(autoHTML);
    })
}

function limpiar(){
    
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}


function loadyear(){

    const max = new Date().getFullYear();
    const min = max - 10;
    

    for(let i = max; i >= min; i--){
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
}

function filtrarAuto(){
    const filtro = autos.filter(filtrarMarca)
                        .filter(filtrarYear)
                        .filter(filtrarMinimo)
                        .filter(filtrarMaximo)
                        .filter(filtrarPuertas)
                        .filter(filtrarTransmision)
                        .filter(filtrarColor);

    if( filtro.length ) {
       mostrarAutos(filtro);
    } else {
        noResultado();
    }
                    
}


function noResultado() {

    limpiar();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No Hay Resultados, Intenta con otros términos de búsqueda';
    resultado.appendChild(noResultado)

}

function filtrarMarca(auto){
    if(busqueda.marca){
        return busqueda.marca == auto.marca;
    }
    return auto;
}

function filtrarYear(auto){
    if(busqueda.year){
        return busqueda.year == auto.year;
    }
    return auto;
}

function filtrarMinimo(auto){
    if(busqueda.minimo){
        return busqueda.minimo <= auto.precio;
    }
    return auto;
}

function filtrarMaximo(auto){
    if(busqueda.maximo){
        return busqueda.maximo >= auto.precio;
    }
    return auto;
}

function filtrarPuertas(auto){
    if(busqueda.puertas){
        return busqueda.puertas == auto.puertas;
    }
    return auto;
}

function filtrarTransmision(auto){
    if(busqueda.transmision){
        return busqueda.transmision == auto.transmision;
    }
    return auto;
}

function filtrarColor(auto){
    if(busqueda.color){
        return busqueda.color == auto.color;
    }
    return auto;
}