function verTree(s) {
    s.classList.toggle("caret-down");
    s.parentElement.querySelector(".nested").classList.toggle("active");
};

let myUl= document.getElementById('myUL');

function verRegiones() {
let token= sessionStorage.getItem('token');
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

var requestOptions = {
method: 'GET',
headers: myHeaders,
redirect: 'follow'
};

fetch("http://localhost:3000/regiones", requestOptions)
.then(response => response.json())
.then(result => {
for (let z=0; z<result.length; z++) {
    let idRegion= result[z].id;
    let li= document.createElement('li');
    let txt= `<span class="region caret" onclick="verTree(this)">${result[z].nombre}</span>
    <button class="btn btn-outline-primary float-right" onclick="agregarPaisModal(${idRegion})">Agregar país</button>
    <ul class="nested" id=region${idRegion}></ul>`;
    li.innerHTML = txt;
    myUl.appendChild(li);
    verPaises(idRegion);
}
})
.catch(error => console.log('error', error));
}

function verPaises(idRegion) {
let token= sessionStorage.getItem('token');
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

var requestOptions = {
method: 'GET',
headers: myHeaders,
redirect: 'follow'
};

fetch(`http://localhost:3000/paises/regiones/${idRegion}`, requestOptions)
.then((r)=> r.json())
.then((json)=> {
let regionElement= document.getElementById(`region${idRegion}`);

for (let x=0; x<json.length; x++) {
    let idPais= json[x].id;
    let li= document.createElement('li');
    let txt= `
    <span class="pais caret" onclick="verTree(this)">${json[x].nombre}</span>
    <button class="btn mr-2 btn-outline-primary" onclick="editPais(${idPais})"><i class="fas fa-pen"></i></button>
    <button class="btn mr-2 btn-outline-danger" onclick="modalDeletePais(${idPais})"><i class="fas fa-trash"></i></button>
    <button class="btn btn-outline-primary float-right" onclick="agregarCiudadModal(${idPais})">Agregar ciudad</button>
    <ul class="nested" id=pais${idPais}></ul>`;
    li.innerHTML = txt;
    regionElement.appendChild(li);
    verCiudades(idPais); 
}        
})
.catch((err)=> console.error(err));

}

function verCiudades(idPais) {
let token= sessionStorage.getItem('token');
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

var requestOptions = {
method: 'GET',
headers: myHeaders,
redirect: 'follow'
};

fetch(`http://localhost:3000/ciudades/paises/${idPais}`, requestOptions)
.then((r)=> r.json())
.then((json)=> {
let paisElement= document.getElementById(`pais${idPais}`);

for (let x=0; x<json.length; x++) {
    let idCiudad= json[x].id;
    let li= document.createElement('li');
    let txt= `
    <p class="ciudad">${json[x].nombre}</p>
    <button class="btn mr-2 btn-outline-primary" onclick="editCity(${idCiudad})"><i class="fas fa-pen"></i></button>
    <button class="btn mr-2 btn-outline-danger" onclick="modalDeleteCiudad(${idCiudad})"><i class="fas fa-trash"></i></button>
    `;
    li.innerHTML = txt;
    paisElement.appendChild(li);
}
})
.catch((err)=> console.error(err));

}

function agregarRegion(s) {
let regionNombre= s.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[3];

if (regionNombre.value.length == 0) {
let emptyName= document.getElementById('emptyNameRegion');
emptyName.style.display= "inline-block";
} else { 
emptyName.style.display= "none";
let token= sessionStorage.getItem('token');
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);
myHeaders.append("Content-Type", "application/json");

let o= {
    nombre: regionNombre.value
};

var raw = JSON.stringify(o);

var requestOptions = {
method: 'POST',
headers: myHeaders,
body: raw,
redirect: 'follow'
};

fetch("http://localhost:3000/regiones", requestOptions)
.then(response => {
    if (response.status== 200) {
        location.reload();
    } else if (response.status== 400) {
        emptyName.innerHTML= "Región ya existe";
        emptyName.style.display= "inline-block";
    }
})
.catch(error => console.log('error', error));
}
}

function addPais(s) {
let paisNombre= s.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[3];
let span= document.getElementById('span');
let emptyName= document.getElementById('emptyNamePais');
let titulo= document.getElementById('modal-pais-titulo');

if (paisNombre.value.length == 0) {
emptyName.style.display= "inline-block";
} else if (titulo.innerHTML == "Agregar país") { 
emptyName.style.display= "none";
let token= sessionStorage.getItem('token');
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);
myHeaders.append("Content-Type", "application/json");

let o= {
    region_id: span.className,
    nombre: paisNombre.value
};

var raw = JSON.stringify(o);

var requestOptions = {
method: 'POST',
headers: myHeaders,
body: raw,
redirect: 'follow'
};

fetch("http://localhost:3000/paises", requestOptions)
.then(response => {
    if (response.status== 200) {
        location.reload();
    } else if (response.status== 400) {
        emptyName.innerHTML= "País ya existe";
        emptyName.style.display= "inline-block";
    }
})
.catch(error => console.log('error', error));
} else if (titulo.innerHTML == 'Editar país') {
let spanPais= document.getElementById('editPais');
let paisId= spanPais.className;
emptyName.style.display= "none";
let token= sessionStorage.getItem('token');
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);
myHeaders.append("Content-Type", "application/json");

let o= {
    nombre: paisNombre.value
};

var raw = JSON.stringify(o);

var requestOptions = {
method: 'PATCH',
headers: myHeaders,
body: raw,
redirect: 'follow'
};

fetch(`http://localhost:3000/paises/${paisId}`, requestOptions)
.then(response => {
    if (response.status== 200) {
       location.reload();
    } else if (response.status== 404) {
        emptyName.innerHTML= "Error!";
        emptyName.style.display= "inline-block";
    }
})
.catch(error => console.log('error', error));
}
}

function deletePais() {
let idPais= sessionStorage.getItem('idPaisDelete');
let token= sessionStorage.getItem('token');
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

var requestOptions = {
method: 'DELETE',
headers: myHeaders,
redirect: 'follow'
};

fetch(`http://localhost:3000/paises/${idPais}`, requestOptions)
.then(response => {
if (response.status== 200) {
    sessionStorage.removeItem('idPaisDelete');
    location.reload();
} 
})
.catch(error => console.log('error', error));
}

function addCity(s) {
let ciudadNombre= s.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[3];
let emptyName= document.getElementById('emptyNameCiudad');
let titulo= document.getElementById('modal-ciudad-titulo');

if (ciudadNombre.value.length == 0) {
emptyName.style.display= "inline-block";
} else if (titulo.innerHTML == "Agregar ciudad") { 
let idPais= document.getElementById('agregarCiudad').className;
emptyName.style.display= "none";
let token= sessionStorage.getItem('token');
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);
myHeaders.append("Content-Type", "application/json");

let o= {
    pais_id: idPais,
    nombre: ciudadNombre.value
};

var raw = JSON.stringify(o);

var requestOptions = {
method: 'POST',
headers: myHeaders,
body: raw,
redirect: 'follow'
};

fetch("http://localhost:3000/ciudades", requestOptions)
.then(response => {
    if (response.status== 200) {
        location.reload();
    } else if (response.status== 400) {
        emptyName.innerHTML= "Ciudad ya existe";
        emptyName.style.display= "inline-block";
    }
})
.catch(error => console.log('error', error));
} else if (titulo.innerHTML == 'Editar ciudad') {
emptyName.style.display= "none";
let editCiudadId= document.getElementById('editCiudad').className;

let token= sessionStorage.getItem('token');
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);
myHeaders.append("Content-Type", "application/json");

let o= {
    nombre: ciudadNombre.value
};

var raw = JSON.stringify(o);

var requestOptions = {
method: 'PATCH',
headers: myHeaders,
body: raw,
redirect: 'follow'
};

fetch(`http://localhost:3000/ciudades/${editCiudadId}`, requestOptions)
.then(response => {
    if (response.status== 200) {
       location.reload();
    } else if (response.status== 404) {
        emptyName.innerHTML= "Error!";
        emptyName.style.display= "inline-block";
    }
})
.catch(error => console.log('error', error));
}

} 

function deleteCity() {
let idCiudad= sessionStorage.getItem('idCiudadDelete');
let token= sessionStorage.getItem('token');
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

var requestOptions = {
method: 'DELETE',
headers: myHeaders,
redirect: 'follow'
};

fetch(`http://localhost:3000/ciudades/${idCiudad}`, requestOptions)
.then(response => {
if (response.status== 200) {
    sessionStorage.removeItem('idCiudadDelete');
    location.reload();
} 
})
.catch(error => console.log('error', error));
}