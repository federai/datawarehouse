
//PRUEBA PAGINADO
function verContactosPag(offset, limit, filas, w) {
    let actualContactos= document.querySelector('.actual-contactos');
    actualContactos.innerHTML= "";
    let token= sessionStorage.getItem('token');
    
        var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
    
            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
        
        fetch('http://localhost:3000/contactos/nombre', requestOptions)
        .then((result)=> result.json())
        .then((json)=> {
            let paginas= json.length/filas;
            if (paginas <=1) {
              let pagDos= document.getElementById('pagDos');
              pagDos.innerHTML= "";
              for (let x=0; x<json.length; x++) {
                let id= json[x].id;
                let nombre= json[x].nombre;
                let email= json[x].email;
                let cargo= json[x].cargo;
                let compania= json[x].compania;
                let direccion= json[x].direccion;
                let interes= json[x].interes;
                let pais= json[x].pais;
                let region= json[x].region;
  
                let nuevo= document.createElement('div');
                nuevo.classList.add('nuevo');
                nuevo.classList.add('d-flex');
                let txt=  `
                <div class="checkbox-div">
                <label for="checkbox-contacto-${id}"></label> <!--ACA IRIA COMO ID EL ID DEL CONTACTO-->
                <input type="checkbox" name="contacto" onclick="verCheckbox(this)" id="checkbox-contacto-${id}"/>
              </div>
    
              <div class="primer-contacto d-flex">
                <div class="primer-contacto-info d-flex flex-column">
                  <p class="big">${nombre}</p>
                  <p class="small">${email}</p>
                </div>
              </div>
    
              <div class="region d-flex flex-column">
                <p class="big">${pais}</p>
                <p class="small">${region}</p>         
              </div>
    
              <div class="compania d-flex">
                <p class="big">${compania}</p>
              </div>
    
              <div class="cargo d-flex">
                <p class="big">${cargo}</p>
              </div>
    
              <div class="interes d-flex">
                <p class="big">${interes}%</p>
                <div class="interes-bar-${interes}"></div>
              </div>
    
              <div class="acciones d-flex">
                <div class="div-acc">
                <i class="text-secondary dot fas fa-ellipsis-h"></i>
    
                <div class="hover-acciones">
                  <i class="fas fa-trash" onclick="borrarContacto(${id})"></i>
                  <i class="fas fa-pen" onclick="editarContacto(${id})"></i>
                </div>
                </div>
              </div>
                `;
                nuevo.innerHTML= txt;
                actualContactos.appendChild(nuevo);
            }
            } else {
              actualContactos.innerHTML= "";
            
              let lim;
              if ((json.length-offset) < limit) {
                  lim= json.length;
              } else {
                  lim= limit;
              }
  
              for (let x=offset; x<lim; x++) {
                let id= json[x].id;
                let nombre= json[x].nombre;
                let email= json[x].email;
                let cargo= json[x].cargo;
                let compania= json[x].compania;
                let direccion= json[x].direccion;
                let interes= json[x].interes;
                let pais= json[x].pais;
                let region= json[x].region;
  
                let nuevo= document.createElement('div');
                nuevo.classList.add('nuevo');
                nuevo.classList.add('d-flex');
                let txt=  `
                <div class="checkbox-div">
                <label for="checkbox-contacto-${id}"></label> <!--ACA IRIA COMO ID EL ID DEL CONTACTO-->
                <input type="checkbox" name="contacto" onclick="verCheckbox(this)" id="checkbox-contacto-${id}"/>
              </div>
    
              <div class="primer-contacto d-flex">
                <div class="primer-contacto-info d-flex flex-column">
                  <p class="big">${nombre}</p>
                  <p class="small">${email}</p>
                </div>
              </div>
    
              <div class="region d-flex flex-column">
                <p class="big">${pais}</p>
                <p class="small">${region}</p>         
              </div>
    
              <div class="compania d-flex">
                <p class="big">${compania}</p>
              </div>
    
              <div class="cargo d-flex">
                <p class="big">${cargo}</p>
              </div>
    
              <div class="interes d-flex">
                <p class="big">${interes}%</p>
                <div class="interes-bar-${interes}"></div>
              </div>
    
              <div class="acciones d-flex">
                <div class="div-acc">
                <i class="text-secondary dot fas fa-ellipsis-h"></i>
    
                <div class="hover-acciones">
                  <i class="fas fa-trash" onclick="borrarContacto(${id})"></i>
                  <i class="fas fa-pen" onclick="editarContacto(${id})"></i>
                </div>
                </div>
              </div>
                `;
                nuevo.innerHTML= txt;
                actualContactos.appendChild(nuevo);
            }
            let pagDos= document.getElementById('pagDos');
            pagDos.innerHTML= "";
            let pagDosP= document.createElement('p');
  
            let wo= w;
            let ww= ++wo;
            let wv= w-1;
  
            let siguiente= document.createElement('a');
            let texto= `<button class="btn text-secondary bb" onclick="verContactosPag(${limit}, ${limit+filas}, ${filas}, ${ww})"><i class="fas fa-angle-right"></i></button>`
            siguiente.innerHTML= texto;
            let anterior= document.createElement('a');
            let textoAnterior= `<button class="btn text-secondary bb" onclick="verContactosPag(${offset-offset}, ${limit-filas}, ${filas}, ${wv})"><i class="fas fa-angle-left"></i></button>`
            anterior.innerHTML= textoAnterior;
            pagDos.appendChild(anterior);
            pagDos.appendChild(siguiente);
  
            pagDosP.innerHTML= `${w}-${filas} de ${json.length} filas`;
            pagDos.insertBefore(pagDosP, anterior);
            
            }
  
            let porNombre= document.getElementById('ordenarPorNombre');
            porNombre.setAttribute('onclick', `verContactosPag(${offset}, ${limit}, ${filas}, ${w})`)
  
            let porPais= document.getElementById('ordenarPorPais');
            porPais.setAttribute('onclick', `ordenarPorPais(${offset}, ${limit}, ${filas}, ${w})`)
  
            let porCompania= document.getElementById('ordenarPorCompania');
            porCompania.setAttribute('onclick', `ordenarPorCompania(${offset}, ${limit}, ${filas}, ${w})`)
  
            let porCargo= document.getElementById('ordenarPorCargo');
            porCargo.setAttribute('onclick', `ordenarPorCargo(${offset}, ${limit}, ${filas}, ${w})`)
  
            let porInteres= document.getElementById('ordenarPorInteres');
            porInteres.setAttribute('onclick', `ordenarPorInteres(${offset}, ${limit}, ${filas}, ${w})`)
  
        })
        .catch(err=> console.error(err));
  }
  
  //ORDENAR POR:
  function ordenarPorPais(offset, limit, filas, w) {
    let actualContactos= document.querySelector('.actual-contactos');
    actualContactos.innerHTML= "";
    let token= sessionStorage.getItem('token');
    
        var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
    
            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
        
        fetch('http://localhost:3000/contactos/pais', requestOptions)
        .then((result)=> result.json())
        .then((json)=> {
            let paginas= json.length/filas;
  
            if (paginas <=1) {
              for (let x=0; x<json.length; x++) {
                let id= json[x].id;
                let nombre= json[x].nombre;
                let email= json[x].email;
                let cargo= json[x].cargo;
                let compania= json[x].compania;
                let direccion= json[x].direccion;
                let interes= json[x].interes;
                let pais= json[x].pais;
                let region= json[x].region;
  
                let nuevo= document.createElement('div');
                nuevo.classList.add('nuevo');
                nuevo.classList.add('d-flex');
                let txt=  `
                <div class="checkbox-div">
                <label for="checkbox-contacto-${id}"></label> <!--ACA IRIA COMO ID EL ID DEL CONTACTO-->
                <input type="checkbox" name="contacto" onclick="verCheckbox(this)" id="checkbox-contacto-${id}"/>
              </div>
    
              <div class="primer-contacto d-flex">
                <div class="primer-contacto-info d-flex flex-column">
                  <p class="big">${nombre}</p>
                  <p class="small">${email}</p>
                </div>
              </div>
    
              <div class="region d-flex flex-column">
                <p class="big">${pais}</p>
                <p class="small">${region}</p>         
              </div>
    
              <div class="compania d-flex">
                <p class="big">${compania}</p>
              </div>
    
              <div class="cargo d-flex">
                <p class="big">${cargo}</p>
              </div>
    
              <div class="interes d-flex">
                <p class="big">${interes}%</p>
                <div class="interes-bar-${interes}"></div>
              </div>
    
              <div class="acciones d-flex">
                <div class="div-acc">
                <i class="text-secondary dot fas fa-ellipsis-h"></i>
    
                <div class="hover-acciones">
                  <i class="fas fa-trash" onclick="borrarContacto(${id})"></i>
                  <i class="fas fa-pen" onclick="editarContacto(${id})"></i>
                </div>
                </div>
              </div>
                `;
                nuevo.innerHTML= txt;
                actualContactos.appendChild(nuevo);
                let pagUno= document.getElementById('pagUno');
                pagUno.style.display= "none";
            }
            } else {
              actualContactos.innerHTML= "";
            
              let lim;
              if ((json.length-offset) < limit) {
                  lim= json.length;
              } else {
                  lim= limit;
              }
  
              for (let x=offset; x<lim; x++) {
                let id= json[x].id;
                let nombre= json[x].nombre;
                let email= json[x].email;
                let cargo= json[x].cargo;
                let compania= json[x].compania;
                let direccion= json[x].direccion;
                let interes= json[x].interes;
                let pais= json[x].pais;
                let region= json[x].region;
  
                let nuevo= document.createElement('div');
                nuevo.classList.add('nuevo');
                nuevo.classList.add('d-flex');
                let txt=  `
                <div class="checkbox-div">
                <label for="checkbox-contacto-${id}"></label> <!--ACA IRIA COMO ID EL ID DEL CONTACTO-->
                <input type="checkbox" name="contacto" onclick="verCheckbox(this)" id="checkbox-contacto-${id}"/>
              </div>
    
              <div class="primer-contacto d-flex">
                <div class="primer-contacto-info d-flex flex-column">
                  <p class="big">${nombre}</p>
                  <p class="small">${email}</p>
                </div>
              </div>
    
              <div class="region d-flex flex-column">
                <p class="big">${pais}</p>
                <p class="small">${region}</p>         
              </div>
    
              <div class="compania d-flex">
                <p class="big">${compania}</p>
              </div>
    
              <div class="cargo d-flex">
                <p class="big">${cargo}</p>
              </div>
    
              <div class="interes d-flex">
                <p class="big">${interes}%</p>
                <div class="interes-bar-${interes}"></div>
              </div>
    
              <div class="acciones d-flex">
                <div class="div-acc">
                <i class="text-secondary dot fas fa-ellipsis-h"></i>
    
                <div class="hover-acciones">
                  <i class="fas fa-trash" onclick="borrarContacto(${id})"></i>
                  <i class="fas fa-pen" onclick="editarContacto(${id})"></i>
                </div>
                </div>
              </div>
                `;
                nuevo.innerHTML= txt;
                actualContactos.appendChild(nuevo);
            }
            let pagDos= document.getElementById('pagDos');
            pagDos.innerHTML= "";
            let pagDosP= document.createElement('p');
  
            let wo= w;
            let ww= ++wo;
            let wv= w-1;
  
            let siguiente= document.createElement('a');
            let texto= `<button class="btn text-secondary bb" onclick="ordenarPorPais(${limit}, ${limit+filas}, ${filas}, ${ww})"><i class="fas fa-angle-right"></i></button>`
            siguiente.innerHTML= texto;
            let anterior= document.createElement('a');
            let textoAnterior= `<button class="btn text-secondary bb" onclick="ordenarPorPais(${offset-offset}, ${limit-filas}, ${filas}, ${wv})"><i class="fas fa-angle-left"></i></button>`
            anterior.innerHTML= textoAnterior;
            pagDos.appendChild(anterior);
            pagDos.appendChild(siguiente);
  
            pagDosP.innerHTML= `${w}-${filas} de ${json.length} filas`;
            pagDos.insertBefore(pagDosP, anterior);
            
            }
  
        })
        .catch(err=> console.error(err));
  }
  
  function ordenarPorCompania(offset, limit, filas, w) {
    let actualContactos= document.querySelector('.actual-contactos');
    actualContactos.innerHTML= "";
    let token= sessionStorage.getItem('token');
    
        var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
    
            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
        
        fetch('http://localhost:3000/contactos/compania', requestOptions)
        .then((result)=> result.json())
        .then((json)=> {
            let paginas= json.length/filas;
  
            if (paginas <=1) {
              for (let x=0; x<json.length; x++) {
                let id= json[x].id;
                let nombre= json[x].nombre;
                let email= json[x].email;
                let cargo= json[x].cargo;
                let compania= json[x].compania;
                let direccion= json[x].direccion;
                let interes= json[x].interes;
                let pais= json[x].pais;
                let region= json[x].region;
  
                let nuevo= document.createElement('div');
                nuevo.classList.add('nuevo');
                nuevo.classList.add('d-flex');
                let txt=  `
                <div class="checkbox-div">
                <label for="checkbox-contacto-${id}"></label> <!--ACA IRIA COMO ID EL ID DEL CONTACTO-->
                <input type="checkbox" name="contacto" onclick="verCheckbox(this)" id="checkbox-contacto-${id}"/>
              </div>
    
              <div class="primer-contacto d-flex">
                <div class="primer-contacto-info d-flex flex-column">
                  <p class="big">${nombre}</p>
                  <p class="small">${email}</p>
                </div>
              </div>
    
              <div class="region d-flex flex-column">
                <p class="big">${pais}</p>
                <p class="small">${region}</p>         
              </div>
    
              <div class="compania d-flex">
                <p class="big">${compania}</p>
              </div>
    
              <div class="cargo d-flex">
                <p class="big">${cargo}</p>
              </div>
    
              <div class="interes d-flex">
                <p class="big">${interes}%</p>
                <div class="interes-bar-${interes}"></div>
              </div>
    
              <div class="acciones d-flex">
                <div class="div-acc">
                <i class="text-secondary dot fas fa-ellipsis-h"></i>
    
                <div class="hover-acciones">
                  <i class="fas fa-trash" onclick="borrarContacto(${id})"></i>
                  <i class="fas fa-pen" onclick="editarContacto(${id})"></i>
                </div>
                </div>
              </div>
                `;
                nuevo.innerHTML= txt;
                actualContactos.appendChild(nuevo);
                let pagUno= document.getElementById('pagUno');
                pagUno.style.display= "none";
            }
            } else {
              actualContactos.innerHTML= "";
            
              let lim;
              if ((json.length-offset) < limit) {
                  lim= json.length;
              } else {
                  lim= limit;
              }
  
              for (let x=offset; x<lim; x++) {
                let id= json[x].id;
                let nombre= json[x].nombre;
                let email= json[x].email;
                let cargo= json[x].cargo;
                let compania= json[x].compania;
                let direccion= json[x].direccion;
                let interes= json[x].interes;
                let pais= json[x].pais;
                let region= json[x].region;
  
                let nuevo= document.createElement('div');
                nuevo.classList.add('nuevo');
                nuevo.classList.add('d-flex');
                let txt=  `
                <div class="checkbox-div">
                <label for="checkbox-contacto-${id}"></label> <!--ACA IRIA COMO ID EL ID DEL CONTACTO-->
                <input type="checkbox" name="contacto" onclick="verCheckbox(this)" id="checkbox-contacto-${id}"/>
              </div>
    
              <div class="primer-contacto d-flex">
                <div class="primer-contacto-info d-flex flex-column">
                  <p class="big">${nombre}</p>
                  <p class="small">${email}</p>
                </div>
              </div>
    
              <div class="region d-flex flex-column">
                <p class="big">${pais}</p>
                <p class="small">${region}</p>         
              </div>
    
              <div class="compania d-flex">
                <p class="big">${compania}</p>
              </div>
    
              <div class="cargo d-flex">
                <p class="big">${cargo}</p>
              </div>
    
              <div class="interes d-flex">
                <p class="big">${interes}%</p>
                <div class="interes-bar-${interes}"></div>
              </div>
    
              <div class="acciones d-flex">
                <div class="div-acc">
                <i class="text-secondary dot fas fa-ellipsis-h"></i>
    
                <div class="hover-acciones">
                  <i class="fas fa-trash" onclick="borrarContacto(${id})"></i>
                  <i class="fas fa-pen" onclick="editarContacto(${id})"></i>
                </div>
                </div>
              </div>
                `;
                nuevo.innerHTML= txt;
                actualContactos.appendChild(nuevo);
            }
            let pagDos= document.getElementById('pagDos');
            pagDos.innerHTML= "";
            let pagDosP= document.createElement('p');
  
            let wo= w;
            let ww= ++wo;
            let wv= w-1;
  
            let siguiente= document.createElement('a');
            let texto= `<button class="btn text-secondary bb" onclick="ordenarPorCompania(${limit}, ${limit+filas}, ${filas}, ${ww})"><i class="fas fa-angle-right"></i></button>`
            siguiente.innerHTML= texto;
            let anterior= document.createElement('a');
            let textoAnterior= `<button class="btn text-secondary bb" onclick="ordenarPorCompania(${offset-offset}, ${limit-filas}, ${filas}, ${wv})"><i class="fas fa-angle-left"></i></button>`
            anterior.innerHTML= textoAnterior;
            pagDos.appendChild(anterior);
            pagDos.appendChild(siguiente);
  
            pagDosP.innerHTML= `${w}-${filas} de ${json.length} filas`;
            pagDos.insertBefore(pagDosP, anterior);
            
            }
  
        })
        .catch(err=> console.error(err));
  }
  
  function ordenarPorCargo(offset, limit, filas, w) {
    let actualContactos= document.querySelector('.actual-contactos');
    actualContactos.innerHTML= "";
    let token= sessionStorage.getItem('token');
    
        var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
    
            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
        
        fetch('http://localhost:3000/contactos/cargo', requestOptions)
        .then((result)=> result.json())
        .then((json)=> {
            let paginas= json.length/filas;
  
            if (paginas <=1) {
              for (let x=0; x<json.length; x++) {
                let id= json[x].id;
                let nombre= json[x].nombre;
                let email= json[x].email;
                let cargo= json[x].cargo;
                let compania= json[x].compania;
                let direccion= json[x].direccion;
                let interes= json[x].interes;
                let pais= json[x].pais;
                let region= json[x].region;
  
                let nuevo= document.createElement('div');
                nuevo.classList.add('nuevo');
                nuevo.classList.add('d-flex');
                let txt=  `
                <div class="checkbox-div">
                <label for="checkbox-contacto-${id}"></label> <!--ACA IRIA COMO ID EL ID DEL CONTACTO-->
                <input type="checkbox" name="contacto" onclick="verCheckbox(this)" id="checkbox-contacto-${id}"/>
              </div>
    
              <div class="primer-contacto d-flex">
                <div class="primer-contacto-info d-flex flex-column">
                  <p class="big">${nombre}</p>
                  <p class="small">${email}</p>
                </div>
              </div>
    
              <div class="region d-flex flex-column">
                <p class="big">${pais}</p>
                <p class="small">${region}</p>         
              </div>
    
              <div class="compania d-flex">
                <p class="big">${compania}</p>
              </div>
    
              <div class="cargo d-flex">
                <p class="big">${cargo}</p>
              </div>
    
              <div class="interes d-flex">
                <p class="big">${interes}%</p>
                <div class="interes-bar-${interes}"></div>
              </div>
    
              <div class="acciones d-flex">
                <div class="div-acc">
                <i class="text-secondary dot fas fa-ellipsis-h"></i>
    
                <div class="hover-acciones">
                  <i class="fas fa-trash" onclick="borrarContacto(${id})"></i>
                  <i class="fas fa-pen" onclick="editarContacto(${id})"></i>
                </div>
                </div>
              </div>
                `;
                nuevo.innerHTML= txt;
                actualContactos.appendChild(nuevo);
                let pagUno= document.getElementById('pagUno');
                pagUno.style.display= "none";
            }
            } else {
              actualContactos.innerHTML= "";
            
              let lim;
              if ((json.length-offset) < limit) {
                  lim= json.length;
              } else {
                  lim= limit;
              }
  
              for (let x=offset; x<lim; x++) {
                let id= json[x].id;
                let nombre= json[x].nombre;
                let email= json[x].email;
                let cargo= json[x].cargo;
                let compania= json[x].compania;
                let direccion= json[x].direccion;
                let interes= json[x].interes;
                let pais= json[x].pais;
                let region= json[x].region;
  
                let nuevo= document.createElement('div');
                nuevo.classList.add('nuevo');
                nuevo.classList.add('d-flex');
                let txt=  `
                <div class="checkbox-div">
                <label for="checkbox-contacto-${id}"></label> <!--ACA IRIA COMO ID EL ID DEL CONTACTO-->
                <input type="checkbox" name="contacto" onclick="verCheckbox(this)" id="checkbox-contacto-${id}"/>
              </div>
    
              <div class="primer-contacto d-flex">
                <div class="primer-contacto-info d-flex flex-column">
                  <p class="big">${nombre}</p>
                  <p class="small">${email}</p>
                </div>
              </div>
    
              <div class="region d-flex flex-column">
                <p class="big">${pais}</p>
                <p class="small">${region}</p>         
              </div>
    
              <div class="compania d-flex">
                <p class="big">${compania}</p>
              </div>
    
              <div class="cargo d-flex">
                <p class="big">${cargo}</p>
              </div>
    
              <div class="interes d-flex">
                <p class="big">${interes}%</p>
                <div class="interes-bar-${interes}"></div>
              </div>
    
              <div class="acciones d-flex">
                <div class="div-acc">
                <i class="text-secondary dot fas fa-ellipsis-h"></i>
    
                <div class="hover-acciones">
                  <i class="fas fa-trash" onclick="borrarContacto(${id})"></i>
                  <i class="fas fa-pen" onclick="editarContacto(${id})"></i>
                </div>
                </div>
              </div>
                `;
                nuevo.innerHTML= txt;
                actualContactos.appendChild(nuevo);
            }
            let pagDos= document.getElementById('pagDos');
            pagDos.innerHTML= "";
            let pagDosP= document.createElement('p');
  
            let wo= w;
            let ww= ++wo;
            let wv= w-1;
  
            let siguiente= document.createElement('a');
            let texto= `<button class="btn text-secondary bb" onclick="ordenarPorCargo(${limit}, ${limit+filas}, ${filas}, ${ww})"><i class="fas fa-angle-right"></i></button>`
            siguiente.innerHTML= texto;
            let anterior= document.createElement('a');
            let textoAnterior= `<button class="btn text-secondary bb" onclick="ordenarPorCargo(${offset-offset}, ${limit-filas}, ${filas}, ${wv})"><i class="fas fa-angle-left"></i></button>`
            anterior.innerHTML= textoAnterior;
            pagDos.appendChild(anterior);
            pagDos.appendChild(siguiente);
  
            pagDosP.innerHTML= `${w}-${filas} de ${json.length} filas`;
            pagDos.insertBefore(pagDosP, anterior);
            
            }
  
        })
        .catch(err=> console.error(err));
  }
  
  function ordenarPorInteres(offset, limit, filas, w) {
    let actualContactos= document.querySelector('.actual-contactos');
    actualContactos.innerHTML= "";
    let token= sessionStorage.getItem('token');
    
        var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
    
            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
        
        fetch('http://localhost:3000/contactos/interes', requestOptions)
        .then((result)=> result.json())
        .then((json)=> {
            let paginas= json.length/filas;
  
            if (paginas <=1) {
              for (let x=0; x<json.length; x++) {
                let id= json[x].id;
                let nombre= json[x].nombre;
                let email= json[x].email;
                let cargo= json[x].cargo;
                let compania= json[x].compania;
                let direccion= json[x].direccion;
                let interes= json[x].interes;
                let pais= json[x].pais;
                let region= json[x].region;
  
                let nuevo= document.createElement('div');
                nuevo.classList.add('nuevo');
                nuevo.classList.add('d-flex');
                let txt=  `
                <div class="checkbox-div">
                <label for="checkbox-contacto-${id}"></label> <!--ACA IRIA COMO ID EL ID DEL CONTACTO-->
                <input type="checkbox" name="contacto" onclick="verCheckbox(this)" id="checkbox-contacto-${id}"/>
              </div>
    
              <div class="primer-contacto d-flex">
                <div class="primer-contacto-info d-flex flex-column">
                  <p class="big">${nombre}</p>
                  <p class="small">${email}</p>
                </div>
              </div>
    
              <div class="region d-flex flex-column">
                <p class="big">${pais}</p>
                <p class="small">${region}</p>         
              </div>
    
              <div class="compania d-flex">
                <p class="big">${compania}</p>
              </div>
    
              <div class="cargo d-flex">
                <p class="big">${cargo}</p>
              </div>
    
              <div class="interes d-flex">
                <p class="big">${interes}%</p>
                <div class="interes-bar-${interes}"></div>
              </div>
    
              <div class="acciones d-flex">
                <div class="div-acc">
                <i class="text-secondary dot fas fa-ellipsis-h"></i>
    
                <div class="hover-acciones">
                  <i class="fas fa-trash" onclick="borrarContacto(${id})"></i>
                  <i class="fas fa-pen" onclick="editarContacto(${id})"></i>
                </div>
                </div>
              </div>
                `;
                nuevo.innerHTML= txt;
                actualContactos.appendChild(nuevo);
                let pagUno= document.getElementById('pagUno');
                pagUno.style.display= "none";
            }
            } else {
              actualContactos.innerHTML= "";
            
              let lim;
              if ((json.length-offset) < limit) {
                  lim= json.length;
              } else {
                  lim= limit;
              }
  
              for (let x=offset; x<lim; x++) {
                let id= json[x].id;
                let nombre= json[x].nombre;
                let email= json[x].email;
                let cargo= json[x].cargo;
                let compania= json[x].compania;
                let direccion= json[x].direccion;
                let interes= json[x].interes;
                let pais= json[x].pais;
                let region= json[x].region;
  
                let nuevo= document.createElement('div');
                nuevo.classList.add('nuevo');
                nuevo.classList.add('d-flex');
                let txt=  `
                <div class="checkbox-div">
                <label for="checkbox-contacto-${id}"></label> <!--ACA IRIA COMO ID EL ID DEL CONTACTO-->
                <input type="checkbox" name="contacto" onclick="verCheckbox(this)" id="checkbox-contacto-${id}"/>
              </div>
    
              <div class="primer-contacto d-flex">
                <div class="primer-contacto-info d-flex flex-column">
                  <p class="big">${nombre}</p>
                  <p class="small">${email}</p>
                </div>
              </div>
    
              <div class="region d-flex flex-column">
                <p class="big">${pais}</p>
                <p class="small">${region}</p>         
              </div>
    
              <div class="compania d-flex">
                <p class="big">${compania}</p>
              </div>
    
              <div class="cargo d-flex">
                <p class="big">${cargo}</p>
              </div>
    
              <div class="interes d-flex">
                <p class="big">${interes}%</p>
                <div class="interes-bar-${interes}"></div>
              </div>
    
              <div class="acciones d-flex">
                <div class="div-acc">
                <i class="text-secondary dot fas fa-ellipsis-h"></i>
    
                <div class="hover-acciones">
                  <i class="fas fa-trash" onclick="borrarContacto(${id})"></i>
                  <i class="fas fa-pen" onclick="editarContacto(${id})"></i>
                </div>
                </div>
              </div>
                `;
                nuevo.innerHTML= txt;
                actualContactos.appendChild(nuevo);
            }
            let pagDos= document.getElementById('pagDos');
            pagDos.innerHTML= "";
            let pagDosP= document.createElement('p');
  
            let wo= w;
            let ww= ++wo;
            let wv= w-1;
  
            let siguiente= document.createElement('a');
            let texto= `<button class="btn text-secondary bb" onclick="ordenarPorInteres(${limit}, ${limit+filas}, ${filas}, ${ww})"><i class="fas fa-angle-right"></i></button>`
            siguiente.innerHTML= texto;
            let anterior= document.createElement('a');
            let textoAnterior= `<button class="btn text-secondary bb" onclick="ordenarPorInteres(${offset-offset}, ${limit-filas}, ${filas}, ${wv})"><i class="fas fa-angle-left"></i></button>`
            anterior.innerHTML= textoAnterior;
            pagDos.appendChild(anterior);
            pagDos.appendChild(siguiente);
  
            pagDosP.innerHTML= `${w}-${filas} de ${json.length} filas`;
            pagDos.insertBefore(pagDosP, anterior);
            
            }
  
        })
        .catch(err=> console.error(err));
  }
  
  //AGREGAR/EDITAR
  
  function agregarContacto() {
      let titulo= document.getElementById('contacto-title');
      let form= document.getElementById('newContactoForm');
      let nombre= form.elements["nombre-contacto"].value;
      let apellido= form.elements["apellido-contacto"].value;
      let cargo=  form.elements["cargo-contacto"].value; 
      let email=  form.elements["email-contacto"].value; 
      let compania= form.elements["new-compania"]; 
      let ciudad= document.getElementById("new-ciudad");
      let ciudadId;
      let companiaId;
  
      for (let x=0; x< ciudad.length; x++) {
          if (ciudad.value == ciudad[x].value) {
             ciudadId= ciudad[x].childNodes[0].getAttribute('value');
          }
      }
  
      for (let y=0; y< compania.length; y++) {
          if (compania.value == compania[y].value) {
             companiaId= compania[y].childNodes[0].getAttribute('value');
          }
      }
  
      let direccion= form.elements["new-direccion"].value;  
      let interes= form.elements["new-porcentaje"].value;
  
      let canal1= document.getElementById("new-canal-contacto-1").value;
      let cuenta1= document.getElementById("new-cuenta-1").value;
      let preferencia1= document.getElementById("new-preferencias-1").value;
  
      let canal2= document.getElementById("new-canal-contacto-2").value;
      let cuenta2= document.getElementById("new-cuenta-2").value;
      let preferencia2= document.getElementById("new-preferencias-2").value;
  
      let canal3= document.getElementById("new-canal-contacto-3").value;
      let cuenta3= document.getElementById("new-cuenta-3").value;
      let preferencia3= document.getElementById("new-preferencias-3").value;
  
      let canal4= document.getElementById("new-canal-contacto-4").value;
      let cuenta4= document.getElementById("new-cuenta-4").value;
      let preferencia4= document.getElementById("new-preferencias-4").value;
  
      let canal5= document.getElementById("new-canal-contacto-5").value;
      let cuenta5= document.getElementById("new-cuenta-5").value;
      let preferencia5= document.getElementById("new-preferencias-5").value;
  
      let o= {
          nombre: nombre,
          apellido:apellido,
          email: email,
          cargo: cargo,
          interes: interes,
          direccion: direccion,
          ciudadId: ciudadId,
          companiaId: companiaId
      }
  
      let canales= [];
  
      if (cuenta1.length != 0) {
          canales.push({
              canal: canal1,
              cuenta: cuenta1,
              preferencia: preferencia1
          });
      }
      if (cuenta2.length != 0) {
          canales.push({
              canal: canal2,
              cuenta: cuenta2,
              preferencia: preferencia2
          });
      }
      if (cuenta3.length != 0) {
          canales.push({
              canal: canal3,
              cuenta: cuenta3,
              preferencia: preferencia3
          });
      } 
      
      if (cuenta4.length != 0) {
          canales.push({
              canal: canal4,
              cuenta: cuenta4,
              preferencia: preferencia4
          });
      } 
      
      if (cuenta5.length != 0) {
          canales.push({
              canal: canal5,
              cuenta: cuenta5,
              preferencia: preferencia5
          });
      }
      
      o.canales= canales;
  
      if (titulo.innerHTML == 'Nuevo Contacto') {
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
      
              fetch("http://localhost:3000/contactos", requestOptions)
              .then((result)=> {
                  if (result.status== 200) {
                    sessionStorage.removeItem('editarContactoId');
                      location.reload();
                  } else if (result.status == 400) {
                      return alert('Contacto ya existe');
                  }
              })
              .catch(err=> console.error(err));
         
      } else if (titulo.innerHTML == 'Editar Contacto') {
          var myHeaders = new Headers();
          let token= sessionStorage.getItem('token');
          let idContacto= sessionStorage.getItem('editarContactoId');
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", `Bearer ${token}`);
      
              var raw = JSON.stringify(o);
      
              var requestOptions = {
              method: 'PATCH',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
              };
      
              fetch(`http://localhost:3000/contactos/${idContacto}`, requestOptions)
              .then((result)=> {
                  if (result.status== 200) {
                      sessionStorage.removeItem('editarContactoId');
                      location.reload();
                  } else if (result.status == 400) {
                      return alert('Error');
                  }
              })
              .catch(err=> console.error(err));
      }
  
  }
  
  //BORRAR UN CONTACTO
  function borrarContactoDeDB() {
    let token= sessionStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
  
    var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
    };
  
  
    let idBorrar= sessionStorage.getItem('borrarContactoId');
  
    if (idBorrar) {
      fetch(`http://localhost:3000/contactos/${idBorrar}`, requestOptions)
      .then(response => {
        sessionStorage.removeItem('borrarContactoId');
        if (response.status== 200) {
            location.reload();
        } 
    })
    .catch(error => console.log('error', error));
    }
  
    let arrayDelete= sessionStorage.getItem('arrayDelete');
  
    if (arrayDelete) {
      arrayDelete= JSON.parse(arrayDelete);
      
      let arr= arrayDelete.map((x)=> parseInt(x));
  
      for (let y=0; y<arr.length; y++) {
        let token= sessionStorage.getItem('token');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
    
        var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
        };
    
        fetch(`http://localhost:3000/contactos/${arr[y]}`, requestOptions)
        .then(response => {
          sessionStorage.removeItem('borrarContactoId');
          if (response.status== 200) {
              location.reload();
          } 
      })
      .catch(error => console.log('error', error));
    
      }
    }
  
  }
  
  //PAGINADO
  function selectFilter(th) {
    if(th.value== 10) {
      verContactosPag(0, 10, 10, 1);
    } else if(th.value== 20) {
      verContactosPag(0, 20, 20, 1);
    } else if (th.value== 30) {
      verContactosPag(0, 30, 30, 1);
    }
  
  }
  