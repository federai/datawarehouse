function verUsuariosPag(offset, limit, filas, w) {
    let verUsuarios= document.getElementById('ver-usuarios');
    let token= sessionStorage.getItem('token');
    verUsuarios.innerHTML= "";

    var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
    
    fetch('http://localhost:3000/usuarios', requestOptions)
    .then(result=> {
        if (result.status== 403) {
            let section= document.querySelector(".usuarios-section");
            let btn= document.getElementById('agregarUsuarioBtn');
            btn.style.display= "none";
            section.innerHTML= "Acceso restringido. Sólo administradores pueden acceder a esta página";

        }
       return result.json()
    })
    .then(json=> {
        let paginas= json.length/filas;
        if (paginas <= 1) { 
            for (let x=0; x<json.length; x++) {
                let nuevo= document.createElement('div');
                nuevo.classList.add('datos');
                let nombre= json[x].nombre;
                let email= json[x].email;
                let perfil= json[x].admin;
                let id= json[x].id;
    
                nuevo.setAttribute('id', `${id}`);
                if (perfil== 1) {
                    perfil="Administrador"
                } else if (perfil ==0) {
                    perfil= "Básico"
                }
    
                let txt= `
                    <div class="nombre">${nombre}</div>
                    <div class="email">${email}</div>
                    <div class="perfil">${perfil}</div>
                    <div class="acciones">
                    <button class="btn btn-outline-primary" onclick="editarUsuario(${id})"><i class="fas fa-pen"></i></button>
                        <button class="btn btn-outline-danger" onclick="showModalDeleteUser(${id})"><i class="fas fa-trash"></i></button>
                    </div>`;
                nuevo.innerHTML = txt;
                verUsuarios.appendChild(nuevo);
            }
        } else {
            verUsuarios.innerHTML= "";
            let lim;
            if ((json.length-offset) < limit) {
                lim= json.length;
            } else {
                lim= limit;
            }

            for (let x=offset; x<lim; x++) {
                let nuevo= document.createElement('div');
                nuevo.classList.add('datos');
                let nombre= json[x].nombre;
                let email= json[x].email;
                let perfil= json[x].admin;
                let id= json[x].id;
    
                nuevo.setAttribute('id', `${id}`);
                if (perfil== 1) {
                    perfil="Administrador"
                } else if (perfil ==0) {
                    perfil= "Básico"
                }
    
                let txt= `
                    <div class="nombre">${nombre}</div>
                    <div class="email">${email}</div>
                    <div class="perfil">${perfil}</div>
                    <div class="acciones">
                    <button class="btn btn-outline-primary" onclick="editarUsuario(${id})"><i class="fas fa-pen"></i></button>
                        <button class="btn btn-outline-danger" onclick="showModalDeleteUser(${id})"><i class="fas fa-trash"></i></button>
                    </div>`;
                nuevo.innerHTML = txt;
                verUsuarios.appendChild(nuevo);
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


function editarUsuarioenBD(s) {
    let span= s.parentNode.parentNode.childNodes[3].childNodes[3];
    let id = span.getAttribute('id');
    let token= sessionStorage.getItem('token');

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    let uNombre= document.getElementById('u-nombre').value;
    let uApellido= document.getElementById('u-apellido').value;
    let uEmail= document.getElementById('u-email').value;
    let uPerfil= document.getElementById('u-perfil').value;
    let uContra= document.getElementById('u-contra').value;

    let o= {
        nombre: uNombre,
        apellido: uApellido,
        email: uEmail,
        admin: uPerfil,
        contrasenia: uContra
    }

    var raw = JSON.stringify(o);

    var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(`http://localhost:3000/usuarios/${id}`, requestOptions)
    .then(response => {
        if (response.status == 200) {
            window.location.replace('verUsuarios.html');
        }
    })
    .catch(error => console.log('error', error));

}

function eliminarUsuario(id) {
    let idUs= sessionStorage.getItem('idUsuarioDelete');
    var myHeaders = new Headers();
    let token= sessionStorage.getItem('token');
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`http://localhost:3000/usuarios/${idUs}`, requestOptions)
    .then(response => {
        if (response.status== 200) {
            sessionStorage.removeItem('idUsuarioDelete');
            let modalDelete= document.getElementById('modal-delete');
            modalDelete.style.display= "none";
            let elementoABorrar= document.getElementById(`${idUs}`);
            elementoABorrar.style.display="none";
        }
    })
    .catch(err=> console.error(err));

}

//PAGINADO
function selectFilterUser(th) {
    if(th.value== 10) {
      verUsuariosPag(0, 10, 10, 1);
    } else if(th.value== 20) {
      verUsuariosPag(0, 20, 20, 1);
    } else if (th.value== 30) {
      verUsuariosPag(0, 30, 30, 1);
    }
  
  }
  