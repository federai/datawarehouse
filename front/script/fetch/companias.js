function verCompaniasPag(offset, limit, filas, w) {
    let verCompanias= document.getElementById('ver-companias');
    let token= sessionStorage.getItem('token');
    verCompanias.innerHTML= "";


    var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
    
    fetch('http://localhost:3000/companias', requestOptions)
    .then((result)=> result.json())
    .then((j)=> {
        let paginas= j.length/filas;
        if (paginas <= 1) { 
            for (let x=0; x<j.length; x++) {
                let pais= j[x].pais;
                let direccion= j[x].direccion;
                let email= j[x].email;
                let id= j[x].id;
                let nombre= j[x].nombre;
                let telefono= j[x].telefono;

                let datos= document.createElement('div');
                datos.classList.add('datos');
                let txt= `<div class="nombre">${nombre}</div>
                <div class="pais">${pais}</div>
                <div class="direccion">${direccion}</div>
                <div class="acciones">${telefono}</div>
                <div class="acciones">
                    <button class="btn btn-outline-primary" onclick="editarCompania(${id})"><i class="fas fa-pen"></i></button>
                    <button class="btn btn-outline-danger" onclick="showModalDelete(${id})"><i class="fas fa-trash"></i></button>
                </div>`;
                datos.innerHTML= txt;
                verCompanias.appendChild(datos);
               
            }
        } else {
            let lim;
            if ((json.length-offset) < limit) {
                lim= json.length;
            } else {
                lim= limit;
            }

            for (let x=offset; x<j.lim; x++) {
                let pais= j[x].pais;
                let direccion= j[x].direccion;
                let email= j[x].email;
                let id= j[x].id;
                let nombre= j[x].nombre;
                let telefono= j[x].telefono;

                let datos= document.createElement('div');
                datos.classList.add('datos');
                let txt= `<div class="nombre">${nombre}</div>
                <div class="pais">${pais}</div>
                <div class="direccion">${direccion}</div>
                <div class="acciones">${telefono}</div>
                <div class="acciones">
                    <button class="btn btn-outline-primary" onclick="editarCompania(${id})"><i class="fas fa-pen"></i></button>
                    <button class="btn btn-outline-danger" onclick="showModalDelete(${id})"><i class="fas fa-trash"></i></button>
                </div>`;
                datos.innerHTML= txt;
                verCompanias.appendChild(datos);
               
            }
        let pagDos= document.getElementById('pagDos');
        pagDos.innerHTML= "";
        let pagDosP= document.createElement('p');

        let wo= w;
        let ww= ++wo;
        let wv= w-1;

        let siguiente= document.createElement('a');
        let texto= `<button class="btn text-secondary bb" onclick="verUsuariosPag(${limit}, ${limit+filas}, ${filas}, ${ww})"><i class="fas fa-angle-right"></i></button>`
        siguiente.innerHTML= texto;
        let anterior= document.createElement('a');
        let textoAnterior= `<button class="btn text-secondary bb" onclick="verUsuariosPag(${offset-offset}, ${limit-filas}, ${filas}, ${wv})"><i class="fas fa-angle-left"></i></button>`
        anterior.innerHTML= textoAnterior;
        pagDos.appendChild(anterior);
        pagDos.appendChild(siguiente);

        pagDosP.innerHTML= `${w}-${filas} de ${json.length} filas`;
        pagDos.insertBefore(pagDosP, anterior);

        }

    })
    .catch(err=> console.err(error));
}


let btnAgregar= document.getElementById('agregarCompaniaBD');

btnAgregar.addEventListener('click', agregarCompania)

function agregarCompania(event) {
let nombre= document.getElementById('com-nombre');
let email= document.getElementById('com-email');
let direccion= document.getElementById('com-direc');
let telefono= document.getElementById('com-tel');
let ciudad= document.getElementById('com-ciudad');
let titulo= document.getElementById('modal-compania-titulo');

if (nombre.value.length==0 || email.value.length==0 || direccion.value.length==0 || telefono.value.length==0 || ciudad.value.length== 0 ) {
    return
} else {
    event.preventDefault();
    
    let o= {
        nombre: nombre.value,
        email: email.value,
        telefono: telefono.value,
        direccion: direccion.value,
        ciudad: ciudad.value 
    }

    if (titulo.innerHTML == 'Agregar Compañía') {
        var myHeaders = new Headers();
        let token= sessionStorage.getItem('token');
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var raw = JSON.stringify(o);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:3000/companias", requestOptions)
        .then((result)=> {
            if (result.status== 200) {
                location.reload();
            } else {
                alert('Error');
            }
        })
        .catch(err=> console.log(err));
    } else if (titulo.innerHTML == 'Editar Compañía') {
        let idCompa= document.getElementById('editCompania').className;
        var myHeaders = new Headers();
        let token= sessionStorage.getItem('token');
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var raw = JSON.stringify(o);

        var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`http://localhost:3000/companias/${idCompa}`, requestOptions)
        .then((result)=> {
            if (result.status== 200) {
                location.reload();
            } else {
                alert('Error');
            }
        })
        .catch(err=> console.log(err));
    }

}
}

function eliminarCompania() {
let id= sessionStorage.getItem('idCompaniaDelete');
let token= sessionStorage.getItem('token');
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

var requestOptions = {
method: 'DELETE',
headers: myHeaders,
redirect: 'follow'
};

fetch(`http://localhost:3000/companias/${id}`, requestOptions)
.then(response => {
    sessionStorage.removeItem('idCompaniaDelete');
    if (response.status== 200) {
        location.reload();
    } 
})
.catch(error => console.log('error', error));
}

//PAGINADO
function selectFilterCompania(th) {
if(th.value== 10) {
  verCompaniasPag(0, 10, 10, 1);
} else if(th.value== 20) {
  verCompaniasPag(0, 20, 20, 1);
} else if (th.value== 30) {
  verCompaniasPag(0, 30, 30, 1);
}

}
