let nombre= document.getElementById('nombre-search');
let cargo= document.getElementById('cargo-search');
let pais= document.getElementById('pais-search');
let compania= document.getElementById('compania-search');
let canal= document.getElementById('canal-search');
let interes= document.getElementById('interes-search');

function getPaises() {
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
                region.innerHTML= r[x].nombre;
                region.style.fontWeight= "bold";
                region.setAttribute('value', idRegion);
                pais.appendChild(region);

                fetch(`http://localhost:3000/paises/regiones/${idRegion}`, requestOptions)
                .then((l)=> l.json())
                .then((c)=> {
                    for (let y=0; y<c.length; y++) {
                        let pais= document.createElement('option');
                        pais.innerHTML= c[y].nombre;
                        pais.setAttribute('value', c[y].id);
                        region.after(pais);
                    }
                })

            }

        })
        .catch(err=> console.error(err))
}

function getCompanias() {
    let token= sessionStorage.getItem('token');
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
        
        fetch('http://localhost:3000/companias', requestOptions)
        .then((j)=> j.json())
        .then((r)=> {
            for (let x=0; x<r.length; x++) {
                let idCom= r[x].id;

                let comp= document.createElement('option');
                comp.innerHTML= r[x].nombre;
                comp.setAttribute('value', idCom);
                compania.appendChild(comp);

            }

        })
        .catch(err=> console.error(err))       
}

// function searchContactos() {
//     showDropdown();
//     let actualContactos= document.querySelector('.actual-contactos');
//     actualContactos.innerHTML= "";

//     let o= {
//         nombre: nombre.value,
//         cargo: cargo.value,
//         pais: pais.value,
//         compania: compania.value,
//         canal: canal.value,
//         interes: interes.value
//     }


//     var myHeaders = new Headers();
//     let token= sessionStorage.getItem('token');
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Authorization", `Bearer ${token}`);
    
//     var raw = JSON.stringify(o);
    
//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//     };
    
//     fetch("http://localhost:3000/contactos/search/nombre", requestOptions)
//     .then((r)=> r.json())
//     .then((j)=> {
//         for (let x=0; x<j.length; x++) {
//             let id= j[x].id;
//             let nombre= j[x].nombre;
//             let apellido= j[x].apellido;
//             let cargo= j[x].cargo;
//             let compania= j[x].compania;
//             let email= j[x].email;
//             let interes= j[x].interes;
//             let pais= j[x].pais;
//             let region= j[x].region;

//             let nuevo= document.createElement('div');
//             nuevo.classList.add('nuevo');
//             nuevo.classList.add('d-flex');
//             let txt=  `
//             <div class="checkbox-div">
//             <label for="checkbox-contacto-${id}"></label> <!--ACA IRIA COMO ID EL ID DEL CONTACTO-->
//             <input type="checkbox" name="contacto" onclick="verCheckbox(this)" id="checkbox-contacto-${id}"/>
//           </div>

//           <div class="primer-contacto d-flex">
//             <div class="primer-contacto-info d-flex flex-column">
//               <p class="big">${nombre} ${apellido}</p>
//               <p class="small">${email}</p>
//             </div>
//           </div>

//           <div class="region d-flex flex-column">
//             <p class="big">${pais}</p>
//             <p class="small">${region}</p>         
//           </div>

//           <div class="compania d-flex">
//             <p class="big">${compania}</p>
//           </div>

//           <div class="cargo d-flex">
//             <p class="big">${cargo}</p>
//           </div>

//           <div class="interes d-flex">
//             <p class="big">${interes}%</p>
//             <div class="interes-bar-${interes}"></div>
//           </div>

//           <div class="acciones d-flex">
//             <div class="div-acc">
//             <i class="text-secondary dot fas fa-ellipsis-h"></i>

//             <div class="hover-acciones">
//               <i class="fas fa-trash" onclick="borrarContacto(${id})"></i>
//               <i class="fas fa-pen" onclick="editarContacto(${id})"></i>
//             </div>
//             </div>
//           </div>
//             `;
//             nuevo.innerHTML= txt;
//             actualContactos.appendChild(nuevo);
//         }

//         let porNombre= document.getElementById('ordenarPorNombre');
//         porNombre.removeEventListener('click', verContactos);
//         porNombre.addEventListener('click', searchContactos);

//         let porPais= document.getElementById('ordenarPorPais');
//         porPais.removeEventListener('click', ordenarPorPais);
//         porPais.addEventListener('click', searchPais);

//         let porCompania= document.getElementById('ordenarPorCompania');
//         porCompania.removeEventListener('click', ordenarPorCompania);
//         porCompania.addEventListener('click', searchCompania);

//         let porCargo= document.getElementById('ordenarPorCargo');
//         porCargo.removeEventListener('click', ordenarPorCargo);
//         porCargo.addEventListener('click', searchCargo);

//         let porInteres= document.getElementById('ordenarPorInteres');
//         porInteres.removeEventListener('click', ordenarPorInteres);
//         porInteres.addEventListener('click', searchInteres);
//     })
//     .catch(err=> console.error(err));

// }


function searchContactosPag(offset, limit, filas, w) {
  showDropdown();
  let actualContactos= document.querySelector('.actual-contactos');
  actualContactos.innerHTML= "";

  let o= {
      nombre: nombre.value,
      cargo: cargo.value,
      pais: pais.value,
      compania: compania.value,
      canal: canal.value,
      interes: interes.value
  }


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
  
  fetch("http://localhost:3000/contactos/search/nombre", requestOptions)
  .then((r)=> r.json())
  .then((j)=> {
    let paginas= j.length/filas;
          if (paginas <=1) { 
            for (let x=0; x<j.length; x++) {
              let id= j[x].id;
              let nombre= j[x].nombre;
              let apellido= j[x].apellido;
              let cargo= j[x].cargo;
              let compania= j[x].compania;
              let email= j[x].email;
              let interes= j[x].interes;
              let pais= j[x].pais;
              let region= j[x].region;
    
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
                <p class="big">${nombre} ${apellido}</p>
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
            if ((j.length-offset) < limit) {
                lim= json.length;
            } else {
                lim= limit;
            }

            for (let x=offset; x<lim; x++) {
              let id= j[x].id;
              let nombre= j[x].nombre;
              let apellido= j[x].apellido;
              let cargo= j[x].cargo;
              let compania= j[x].compania;
              let email= j[x].email;
              let interes= j[x].interes;
              let pais= j[x].pais;
              let region= j[x].region;
    
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
                <p class="big">${nombre} ${apellido}</p>
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

          pagDosP.innerHTML= `${w}-${filas} de ${j.length} filas`;
          pagDos.insertBefore(pagDosP, anterior);

          }

      let porNombre= document.getElementById('ordenarPorNombre');
      porNombre.removeEventListener('click', verContactosPag);
      porNombre.setAttribute('onclick', `searchContactos(${offset}, ${limit}, ${filas}, ${w})`)

      let porPais= document.getElementById('ordenarPorPais');
      porPais.removeEventListener('click', ordenarPorPais);
      porPais.setAttribute('onclick', `searchPais(${offset}, ${limit}, ${filas}, ${w})`)

      let porCompania= document.getElementById('ordenarPorCompania');
      porCompania.removeEventListener('click', ordenarPorCompania);
      porCompania.setAttribute('onclick', `searchCompania(${offset}, ${limit}, ${filas}, ${w})`)

      let porCargo= document.getElementById('ordenarPorCargo');
      porCargo.removeEventListener('click', ordenarPorCargo);
      porCargo.setAttribute('onclick', `searchCargo(${offset}, ${limit}, ${filas}, ${w})`)

      let porInteres= document.getElementById('ordenarPorInteres');
      porInteres.removeEventListener('click', ordenarPorInteres);
      porInteres.setAttribute('onclick', `searchInteres(${offset}, ${limit}, ${filas}, ${w})`)

    })
  .catch(err=> console.error(err));

}


function searchPais(offset, limit, filas, w) {
  let actualContactos= document.querySelector('.actual-contactos');
  actualContactos.innerHTML= "";

  let o= {
      nombre: nombre.value,
      cargo: cargo.value,
      pais: pais.value,
      compania: compania.value,
      canal: canal.value,
      interes: interes.value
  }


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
  
  fetch("http://localhost:3000/contactos/search/pais", requestOptions)
  .then((r)=> r.json())
  .then((j)=> {
    let paginas= j.length/filas;
          if (paginas <=1) { 
            for (let x=0; x<j.length; x++) {
              let id= j[x].id;
              let nombre= j[x].nombre;
              let apellido= j[x].apellido;
              let cargo= j[x].cargo;
              let compania= j[x].compania;
              let email= j[x].email;
              let interes= j[x].interes;
              let pais= j[x].pais;
              let region= j[x].region;
    
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
                <p class="big">${nombre} ${apellido}</p>
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
            if ((j.length-offset) < limit) {
                lim= json.length;
            } else {
                lim= limit;
            }

            for (let x=offset; x<lim; x++) {
              let id= j[x].id;
              let nombre= j[x].nombre;
              let apellido= j[x].apellido;
              let cargo= j[x].cargo;
              let compania= j[x].compania;
              let email= j[x].email;
              let interes= j[x].interes;
              let pais= j[x].pais;
              let region= j[x].region;
    
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
                <p class="big">${nombre} ${apellido}</p>
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

          pagDosP.innerHTML= `${w}-${filas} de ${j.length} filas`;
          pagDos.insertBefore(pagDosP, anterior);

          }

    })
    .catch(err=> console.error(err));
}

function searchCompania(offset, limit, filas, w) {
  let actualContactos= document.querySelector('.actual-contactos');
  actualContactos.innerHTML= "";

  let o= {
      nombre: nombre.value,
      cargo: cargo.value,
      pais: pais.value,
      compania: compania.value,
      canal: canal.value,
      interes: interes.value
  }


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
  
  fetch("http://localhost:3000/contactos/search/compania", requestOptions)
  .then((r)=> r.json())
  .then((j)=> {
    let paginas= j.length/filas;
          if (paginas <=1) { 
            for (let x=0; x<j.length; x++) {
              let id= j[x].id;
              let nombre= j[x].nombre;
              let apellido= j[x].apellido;
              let cargo= j[x].cargo;
              let compania= j[x].compania;
              let email= j[x].email;
              let interes= j[x].interes;
              let pais= j[x].pais;
              let region= j[x].region;
    
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
                <p class="big">${nombre} ${apellido}</p>
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
            if ((j.length-offset) < limit) {
                lim= json.length;
            } else {
                lim= limit;
            }

            for (let x=offset; x<lim; x++) {
              let id= j[x].id;
              let nombre= j[x].nombre;
              let apellido= j[x].apellido;
              let cargo= j[x].cargo;
              let compania= j[x].compania;
              let email= j[x].email;
              let interes= j[x].interes;
              let pais= j[x].pais;
              let region= j[x].region;
    
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
                <p class="big">${nombre} ${apellido}</p>
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

          pagDosP.innerHTML= `${w}-${filas} de ${j.length} filas`;
          pagDos.insertBefore(pagDosP, anterior);

          }

    })
    .catch(err=> console.error(err));
}

function searchCargo(offset, limit, filas, w) {
  let actualContactos= document.querySelector('.actual-contactos');
  actualContactos.innerHTML= "";

  let o= {
      nombre: nombre.value,
      cargo: cargo.value,
      pais: pais.value,
      compania: compania.value,
      canal: canal.value,
      interes: interes.value
  }


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
  
  fetch("http://localhost:3000/contactos/search/cargo", requestOptions)
  .then((r)=> r.json())
  .then((j)=> {
    let paginas= j.length/filas;
          if (paginas <=1) { 
            for (let x=0; x<j.length; x++) {
              let id= j[x].id;
              let nombre= j[x].nombre;
              let apellido= j[x].apellido;
              let cargo= j[x].cargo;
              let compania= j[x].compania;
              let email= j[x].email;
              let interes= j[x].interes;
              let pais= j[x].pais;
              let region= j[x].region;
    
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
                <p class="big">${nombre} ${apellido}</p>
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
            if ((j.length-offset) < limit) {
                lim= json.length;
            } else {
                lim= limit;
            }

            for (let x=offset; x<lim; x++) {
              let id= j[x].id;
              let nombre= j[x].nombre;
              let apellido= j[x].apellido;
              let cargo= j[x].cargo;
              let compania= j[x].compania;
              let email= j[x].email;
              let interes= j[x].interes;
              let pais= j[x].pais;
              let region= j[x].region;
    
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
                <p class="big">${nombre} ${apellido}</p>
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

          pagDosP.innerHTML= `${w}-${filas} de ${j.length} filas`;
          pagDos.insertBefore(pagDosP, anterior);

          }

    })
    .catch(err=> console.error(err));
}

function searchInteres(offset, limit, filas, w) {
  let actualContactos= document.querySelector('.actual-contactos');
  actualContactos.innerHTML= "";

  let o= {
      nombre: nombre.value,
      cargo: cargo.value,
      pais: pais.value,
      compania: compania.value,
      canal: canal.value,
      interes: interes.value
  }


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
  
  fetch("http://localhost:3000/contactos/search/interes", requestOptions)
  .then((r)=> r.json())
  .then((j)=> {
    let paginas= j.length/filas;
          if (paginas <=1) { 
            for (let x=0; x<j.length; x++) {
              let id= j[x].id;
              let nombre= j[x].nombre;
              let apellido= j[x].apellido;
              let cargo= j[x].cargo;
              let compania= j[x].compania;
              let email= j[x].email;
              let interes= j[x].interes;
              let pais= j[x].pais;
              let region= j[x].region;
    
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
                <p class="big">${nombre} ${apellido}</p>
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
            if ((j.length-offset) < limit) {
                lim= json.length;
            } else {
                lim= limit;
            }

            for (let x=offset; x<lim; x++) {
              let id= j[x].id;
              let nombre= j[x].nombre;
              let apellido= j[x].apellido;
              let cargo= j[x].cargo;
              let compania= j[x].compania;
              let email= j[x].email;
              let interes= j[x].interes;
              let pais= j[x].pais;
              let region= j[x].region;
    
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
                <p class="big">${nombre} ${apellido}</p>
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

          pagDosP.innerHTML= `${w}-${filas} de ${j.length} filas`;
          pagDos.insertBefore(pagDosP, anterior);

          }

    })
    .catch(err=> console.error(err));

}
