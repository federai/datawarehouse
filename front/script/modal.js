let modalContactos= document.getElementById('modal-contacto');
let modalDelete= document.getElementById('modal-delete');
let modalImport= document.getElementById('modal-import');
let modalRegion= document.getElementById('modal-region');
let modalPais= document.getElementById('modal-pais');
let modalCiudad= document.getElementById('modal-ciudad');
let modalCompania= document.getElementById('modal-compania');

let ciudadForm= document.getElementById('agregarCiudadForm');
let companiaForm= document.getElementById('editarCompaniaForm');
let paisForm= document.getElementById('agregarPaisForm');
let agregarRegionForm= document.getElementById('agregarRegionForm'); //para resetearla cada vez que entra
let nuevoContactoForm= document.getElementById('newContactoForm');
let modalUsuarios= document.getElementById('modal-usuario');


function closeModal() {
    if (modalContactos) {
        nuevoContactoForm.reset();
        modalContactos.style.display= "none";
        nuevoContactoForm.classList.remove('editar-contacto');
        let id= sessionStorage.getItem('editarContactoId');

        if (id) {
            sessionStorage.removeItem('editarContactoId');
        }

    }
    
    if (modalDelete) {
        modalDelete.style.display= "none";

        let idBorrar= sessionStorage.getItem('borrarContactoId');

        if (idBorrar) {
            sessionStorage.removeItem('borrarContactoId');
        }

        let idArrayDelete= sessionStorage.getItem('arrayDelete');
        if (idArrayDelete) {
            sessionStorage.removeItem('arrayDelete')
        }
        
    }
    
    if (modalImport) {
        modalImport.style.display= "none";
    }
    
    if (modalUsuarios) { 
        modalUsuarios.style.display="none";
        let idUs= sessionStorage.getItem('idUsuarioDelete');

        if (idUs) {
            sessionStorage.removeItem('idUsuarioDelete');
        }
    }

    if (modalRegion) { 
        modalRegion.style.display="none";
    }

    if (modalPais) { 
        modalPais.style.display="none";
        let idPais= sessionStorage.getItem('idPaisDelete');
        if (idPais) {
            sessionStorage.removeItem('idPaisDelete');
        }

    }

    if (modalCiudad) { 
        modalCiudad.style.display="none";
        let idCiudad= sessionStorage.getItem('idCiudadDelete');
        if (idCiudad) {
            sessionStorage.removeItem('idCiudadDelete');
        }
    }

    if (modalCompania) { 
        modalCompania.style.display="none";
        companiaForm.reset();
    }
}

//-------------------------------CONTACTOS-------------------------------------
function openModalNewContact() {
    modalContactos.style.display= "flex";
    let selectCompania= document.getElementById('new-compania');
    selectCompania.innerHTML= "";
    selectCompania.innerHTML= "<option value='' disabled selected>Seleccionar compañía</option>";

    //FETCH PARA TRAER LAS OPTIONS DE COMPANIA
    let token= sessionStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
        
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
            
    fetch('http://localhost:3000/companias', requestOptions)
    .then((result)=> result.json())
    .then((json)=> {
        for (let x=0; x<json.length; x++) {
            let pais= json[x].pais;
            let id= json[x].id;
            let nombre= json[x].nombre;

            let option= document.createElement('option');
            let txt= `<option value="${id}">${nombre}</option>`;
            option.innerHTML= txt;
            selectCompania.appendChild(option);
        }
    })
    .catch(err=> console.error(err));
    //FETCH PARA TRAER LAS OPTIONS DE REGIONES
    let selectRegiones= document.getElementById('new-region');

    fetch('http://localhost:3000/regiones', requestOptions)
    .then((result)=> result.json())
    .then((json)=> {
        for (let y=0; y<json.length; y++) {
            let idR= json[y].id;
            let nombreR= json[y].nombre;
            let optionR= document.createElement('option');
            let txtR= `<option value="${idR}">${nombreR}</option>`;
            optionR.innerHTML= txtR;
            selectRegiones.appendChild(optionR);
        }
    })
    .catch(err=> console.error(err));

    let selectPaises= document.getElementById('new-pais');
    selectPaises.style.background= "#e5e5e5";
    let selectCiudades= document.getElementById('new-ciudad');
    selectCiudades.style.background= "#e5e5e5";
    let direc= document.getElementById('new-direccion');
    direc.style.background= "#e5e5e5";
    let newCuenta= document.getElementsByName('new-cuenta');
    for (let p=0; p<newCuenta.length; p++) {
        newCuenta[p].style.background= "#e5e5e5";
    }
    let newPreferencias= document.getElementsByName('new-preferencias');
    for (let w=0; w<newPreferencias.length; w++) {
        newPreferencias[w].style.background= "#e5e5e5";
    }
}

function mostrarPaises(s) {
    selectPaises= document.getElementById('new-pais');
    let value= s.value;

    let h= s.childNodes;
    let idRegion;
    for (let x=0; x<h.length; x++) {
        if (h[x].value == value) {
            idRegion= h[x]
        }
    }
    idRegion= idRegion.childNodes[0].getAttribute('value');

    //FETCH PARA TRAER LOS PAISES
    let token= sessionStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
        
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
            
    fetch(`http://localhost:3000/paises/regiones/${idRegion}`, requestOptions)
    .then((result)=> result.json())
    .then((json)=> {
        for (let x=0; x<json.length; x++) {
            let id= json[x].id;
            let nombre= json[x].nombre;

            let option= document.createElement('option');
            let txt= `<option value="${id}">${nombre}</option>`;
            option.innerHTML= txt;
            selectPaises.appendChild(option);
            selectPaises.style.background= "white";
        }
    })
    .catch(err=> console.error(err));
}

function mostrarCiudades(s) { 
    selectCiudades= document.getElementById('new-ciudad');
    let value= s.value;
    let h= s.childNodes;
    let idPais;
    for (let x=0; x<h.length; x++) {
        if (h[x].value == value) {
            idPais= h[x]
        }
    }
    idPais= idPais.childNodes[0].getAttribute('value');

    //FETCH PARA TRAER LOS PAISES
    let token= sessionStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
        
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
            
    fetch(`http://localhost:3000/ciudades/paises/${idPais}`, requestOptions)
    .then((result)=> result.json())
    .then((json)=> {
        for (let x=0; x<json.length; x++) {
            let id= json[x].id;
            let nombre= json[x].nombre;

            let option= document.createElement('option');
            let txt= `<option value="${id}">${nombre}</option>`;
            option.innerHTML= txt;
            selectCiudades.appendChild(option);
            selectCiudades.style.background= "white";
        }
    })
    .catch(err=> console.error(err));
}

function cambiarColor(el) {
    let direc= document.getElementById('new-direccion');
    direc.style.background= "white";
}

function cuentaDeUsuario(s) {
    s.parentElement.nextElementSibling.childNodes[3].style.background= "white";
}

function preferencias(s) {
    s.parentElement.nextElementSibling.childNodes[3].style.background= "white";
}

function cambiarBtnAgregar() {
    let btn= document.getElementById('agregarContactoBtn');
    btn.style.backgroundColor= "green";
}


function editarContacto(id) {
    modalContactos.style.display= "flex";
    modalContactos.childNodes[1].childNodes[1].childNodes[1].innerHTML= "Editar Contacto";
    nuevoContactoForm.classList.add('editar-contacto');
    sessionStorage.setItem('editarContactoId', id);
    //CAMBIAR COLOR BACKGROUND
    cambiarBtnAgregar();

    let newCuenta= document.getElementsByName('new-cuenta');
    for (let p=0; p<newCuenta.length; p++) {
        newCuenta[p].style.background= "white";
    }
    let newPreferencias= document.getElementsByName('new-preferencias');
    for (let w=0; w<newPreferencias.length; w++) {
        newPreferencias[w].style.background= "white";
    }

    let selectCompania= document.getElementById('new-compania');
    selectCompania.innerHTML= "";

    //FETCH PARA TRAER LAS OPTIONS DE COMPANIA
    let token= sessionStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
        
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
            
    fetch('http://localhost:3000/companias', requestOptions)
    .then((result)=> result.json())
    .then((json)=> {
        for (let x=0; x<json.length; x++) {
            let pais= json[x].pais;
            let id= json[x].id;
            let nombre= json[x].nombre;

            let option= document.createElement('option');
            let txt= `<option value="${id}">${nombre}</option>`;
            option.innerHTML= txt;
            selectCompania.appendChild(option);
        }
    })
    .catch(err=> console.error(err));
    //FETCH PARA TRAER LAS OPTIONS DE REGIONES
    let selectRegiones= document.getElementById('new-region');
    selectRegiones.innerHTML= "";

    fetch('http://localhost:3000/regiones', requestOptions)
    .then((result)=> result.json())
    .then((json)=> {
        for (let y=0; y<json.length; y++) {
            let idR= json[y].id;
            let nombreR= json[y].nombre;
            let optionR= document.createElement('option');
            let txtR= `<option value="${idR}">${nombreR}</option>`;
            optionR.innerHTML= txtR;
            selectRegiones.appendChild(optionR);
        }
    })
    .catch(err=> console.error(err));


    //DATOS DEL CONTACTO        
        fetch(`http://localhost:3000/contactos/contacto/${id}`, requestOptions)
        .then((result)=> result.json())
        .then((json)=> {
            let nombre= json[0].nombre;
            let apellido= json[0].apellido;
            let cargo= json[0].cargo;
            let compania= json[0].compania;
            let email= json[0].email;
            let interes= json[0].interes;
            let pais= json[0].pais;
            let region= json[0].region;
            let direccion= json[0].direccion;
            let ciudad= json[0].ciudad;
            let idRegion= json[0].idRegion;
            let idPais= json[0].idPais;

            let nombreE= document.getElementById('new-name');
            let apellidoE= document.getElementById('new-lastname');
            let cargoE= document.getElementById('new-cargo');
            let emailE= document.getElementById('user-email');
            let interesE= document.getElementById('new-porcentaje');
            let direccionE= document.getElementById('new-direccion');
            let rangeE= document.getElementById('new-range');
            direccionE.style.background= "white"
            
            nombreE.value= nombre;
            apellidoE.value= apellido;
            cargoE.value= cargo;
            emailE.value= email;
            interesE.value= interes;
            rangeE.value= interes;
            direccionE.value= direccion;


            selectCompania.value= compania;
            selectRegiones.value= region;

            //mostrar canales
            fetch(`http://localhost:3000/contactos/contacto_canales/${id}`, requestOptions)
            .then((ra)=> ra.json())
            .then((js)=> {
                let canal1= document.getElementById("new-canal-contacto-1").value;
                let cuenta1= document.getElementById("new-cuenta-1");
                let preferencia1= document.getElementById("new-preferencias-1");

                let canal2= document.getElementById("new-canal-contacto-2").value;
                let cuenta2= document.getElementById("new-cuenta-2");
                let preferencia2= document.getElementById("new-preferencias-2");

                let canal3= document.getElementById("new-canal-contacto-3").value;
                let cuenta3= document.getElementById("new-cuenta-3");
                let preferencia3= document.getElementById("new-preferencias-3");

                let canal4= document.getElementById("new-canal-contacto-4").value;
                let cuenta4= document.getElementById("new-cuenta-4");
                let preferencia4= document.getElementById("new-preferencias-4");

                let canal5= document.getElementById("new-canal-contacto-5").value;
                let cuenta5= document.getElementById("new-cuenta-5");
                let preferencia5= document.getElementById("new-preferencias-5");
            
               
                for (let b=0; b< js.length; b++) {
                    if (js[b].canalId == canal1) {
                        cuenta1.value= js[b].usuario;
                        preferencia1.value= js[b].preferencia;
                    }    

                    if (js[b].canalId == canal2) {
                        cuenta2.value= js[b].usuario;
                        preferencia2.value= js[b].preferencia;
                    } 

                    if (js[b].canalId == canal3) {
                        cuenta3.value = js[b].usuario;
                        preferencia3.value = js[b].preferencia;
                    } 

                    if (js[b].canalId == canal4) {
                        cuenta4.value = js[b].usuario;
                        preferencia4.value = js[b].preferencia;
                    } 

                    if (js[b].canalId == canal5) {
                        cuenta5.value = js[b].usuario;
                        preferencia5.value = js[b].preferencia;
                    } 

                }
              
            })
            .catch(err=> console.error(err));


            let selectPaises= document.getElementById('new-pais');
            //mostrar paises

            fetch(`http://localhost:3000/paises/regiones/${idRegion}`, requestOptions)
            .then((result)=> result.json())
            .then((json)=> {
                for (let x=0; x<json.length; x++) {
                    let id= json[x].id;
                    let nombre= json[x].nombre;

                    let option= document.createElement('option');
                    let txt= `<option value="${id}">${nombre}</option>`;
                    option.innerHTML= txt;
                    selectPaises.appendChild(option);
                    selectPaises.style.background= "white";
                }
            })
            .catch(err=> console.error(err));


            selectPaises.value= pais;
            let selectCiudades= document.getElementById('new-ciudad');
            //mostrar ciudades

            fetch(`http://localhost:3000/ciudades/paises/${idPais}`, requestOptions)
            .then((result)=> result.json())
            .then((json)=> {
                for (let j=0; j<json.length; j++) {
                    let id= json[j].id;
                    let nombre= json[j].nombre;

                    let option= document.createElement('option');
                    let txt= `<option value="${id}">${nombre}</option>`;
                    option.innerHTML= txt;
                    selectCiudades.appendChild(option);
                    selectCiudades.style.background= "white";
                }
            })
            .catch(err=> console.error(err));
            selectCiudades.value= ciudad;





        })
        .catch(err=> console.error(err));

}

function borrarContacto(id) {
    sessionStorage.setItem('borrarContactoId', id);
    modalDelete.style.display= "flex";
}

function checkboxDeleteModal() {
    checkboxes = document.getElementsByName('contacto');
    let arrayDelete= [];

    for (let x=0; x<checkboxes.length; x++) {
        if (checkboxes[x].checked) {
            arrayDelete.push(checkboxes[x].getAttribute('id').split('-')[2]);
        }
    }

    sessionStorage.setItem('arrayDelete', JSON.stringify(arrayDelete));
    modalDelete.style.display= "flex";
}


//-------------------------------USUARIOS-------------------------------------

function editarUsuario(id) {
    let idUser= id;

    let token= sessionStorage.getItem('token');
    
    var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`http://localhost:3000/usuarios/${id}`, requestOptions)
    .then(response=> response.json())
    .then(json=> {
        let admin= json[0].admin;
        let apellido= json[0].apellido;
        let nombre= json[0].nombre;
        let email= json[0].email;

        if (admin== 1) {
            admin="Administrador"
        } else if (admin ==0) {
            admin= "Básico"
        }

        let form= document.getElementById('editarUsuarioForm');
        let idUsuario= document.createElement('span');
        idUsuario.setAttribute('id', idUser);
        form.appendChild(idUsuario);
        let uNombre= document.getElementById('u-nombre');
        let uApellido= document.getElementById('u-apellido');
        let uEmail= document.getElementById('u-email');
        let uPerfil= document.getElementById('u-perfil');

        uNombre.value= nombre;
        uApellido.value= apellido;
        uEmail.value= email;
        uPerfil.value= admin;

    })
    .catch(err=> console.error(err));

    modalUsuarios.style.display="flex";
}

//-------------------------MODAL DELETE USUARIOS----------------------------------------
function showModalDeleteUser (id) {
    modalDelete.style.display= "flex";
    sessionStorage.setItem('idUsuarioDelete', id);
}

//-------------------------------REGION-------------------------------------

function agregarRegionModal() {
    modalRegion.style.display= "flex";
}

//-------------------------------PAIS-------------------------------------

function agregarPaisModal(idRegion) {
    modalPais.style.display= "flex";
    let span= document.createElement('span');
    span.setAttribute('id', "span");
    span.classList.add(idRegion);
    modalPais.appendChild(span);
    let titulo= document.getElementById('modal-pais-titulo');
    titulo.innerHTML= 'Agregar país';
    paisForm.reset();
}

function editPais(idPais) {
    modalPais.style.display= "flex";
    let span= document.createElement('span');
    span.setAttribute('id', "editPais");
    span.classList.add(idPais);
    modalPais.appendChild(span);
    let titulo= document.getElementById('modal-pais-titulo');
    titulo.innerHTML= 'Editar país';
}

function modalDeletePais(id) {
    let modalPaisDelete= document.getElementById('modal-delete-pais');
    modalPaisDelete.style.display="flex";
    sessionStorage.setItem('idPaisDelete', id);
}

//-------------------------------CIUDAD-------------------------------------

function agregarCiudadModal(idPais) {
    modalCiudad.style.display= "flex";
    let span= document.createElement('span');
    span.setAttribute('id', "agregarCiudad");
    span.classList.add(idPais);
    modalCiudad.appendChild(span);
    let titulo= document.getElementById('modal-ciudad-titulo');
    titulo.innerHTML= 'Agregar ciudad';
    ciudadForm.reset();
}

function editCity(idCiudad) {
    modalCiudad.style.display= "flex";
    let span= document.createElement('span');
    span.setAttribute('id', "editCiudad");
    span.classList.add(idCiudad);
    modalCiudad.appendChild(span);
    let titulo= document.getElementById('modal-ciudad-titulo');
    titulo.innerHTML= 'Editar ciudad';
}

function modalDeleteCiudad(id) {
    let modalCiudadDelete= document.getElementById('modal-delete-ciudad');
    modalCiudadDelete.style.display="flex";
    sessionStorage.setItem('idCiudadDelete', id);
}

//----------------------------COMPANIAS-------------------------------------------
function agregarModalCompania() {
    let titulo= document.getElementById('modal-compania-titulo');
    titulo.innerHTML= 'Agregar Compañía';
    modalCompania.style.display= "flex";
    companiaForm.reset();

    let ciudad= document.getElementById('label-ciudad');
    let select= document.getElementById('com-ciudad');
    select.innerHTML= "";

    let op= document.createElement('option');
    let t= `<option value="" disabled selected>Seleccionar ciudad</option>`;
    op.innerHTML = t;
    select.appendChild(op);


    let token= sessionStorage.getItem('token');
    
    var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch('http://localhost:3000/regiones', requestOptions)
    .then((j)=> j.json())
    .then((r)=> {
        for (let x=0; x<r.length; x++) {
            let idRegion= r[x].id;

            let region= document.createElement('option');
            region.innerHTML= `-${r[x].nombre}-`;
            region.style.fontWeight= "600";
            region.disabled= true;
            region.setAttribute('value', idRegion);
            select.appendChild(region);

            fetch(`http://localhost:3000/paises/regiones/${idRegion}`, requestOptions)
            .then((l)=> l.json())
            .then((c)=> {
                for (let y=0; y<c.length; y++) {
                    let pais= document.createElement('option');
                    pais.innerHTML= c[y].nombre;
                    pais.style.fontWeight= "600";
                    pais.disabled= true;
                    pais.setAttribute('value', 'disabled');
                    region.after(pais);

                    fetch(`http://localhost:3000/ciudades/paises/${c[y].id}`, requestOptions)
                    .then((w)=> w.json())
                    .then((s)=> {
                        for (let t=0; t<s.length; t++) {
                            let ciudad= document.createElement('option');
                            ciudad.innerHTML= s[t].nombre;
                            ciudad.setAttribute('value', s[t].id);
                            pais.after(ciudad);
                        }
                    })
                }
            })

        }

    })
    
}

function editarCompania(idCompania) {
    modalCompania.style.display= "flex";
    let span= document.createElement('span');
    span.setAttribute('id', "editCompania");
    span.classList.add(idCompania);
    modalCompania.appendChild(span);
    let titulo= document.getElementById('modal-compania-titulo');
    titulo.innerHTML= 'Editar Compañía';

    let ciudad= document.getElementById('label-ciudad');
    let select= document.getElementById('com-ciudad');
    select.innerHTML= "";

    let token= sessionStorage.getItem('token');
    
    var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch('http://localhost:3000/ciudades', requestOptions)
    .then((projects) => projects.json())
    .then((json)=> {
        for (let x=0; x< json.length; x++) {
            let nombre= json[x].nombre;
            let idCiudad = json[x].id;

            let option= document.createElement('option');
            let txt= `<option value="${idCiudad}">${nombre}</option>`;
            option.innerHTML = txt;
            select.appendChild(option);
        }
        ciudad.appendChild(select);
       
    })

    let idCom= idCompania;

    fetch(`http://localhost:3000/companias/${idCom}`, requestOptions)
    .then((projects)=> projects.json())
    .then((json)=> {
        let ciudad= json[0].ciudad;
        let direccion= json[0].direccion;
        let email= json[0].email;
        let id= json[0].id;
        let nombre= json[0].nombre;
        let telefono= json[0].telefono;

        let comNombre= document.getElementById('com-nombre');
        let comEmail= document.getElementById('com-email');
        let comCiudad= document.getElementById('com-ciudad');
        let comDirec= document.getElementById('com-direc');
        let comTel= document.getElementById('com-tel');

        comNombre.value= nombre;
        comEmail.value= email;
        comCiudad.value= ciudad;
        comDirec.value= direccion;
        comTel.value= telefono;
    })
    .catch((err)=>console.error(err));
}

//-------------------------MODAL DELETE COMPANIAS----------------------------------------
function showModalDelete(id) {
    modalDelete.style.display= "flex";
    sessionStorage.setItem('idCompaniaDelete', id);
}






