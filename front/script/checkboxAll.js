function toggle(source) {
    let btnCantidad= document.querySelector('.btn-cantidad');
    let btnEliminar= document.querySelector('.btn-eliminar');
    checkboxes = document.getElementsByName('contacto');
    for(var i=0, n=checkboxes.length;i<n;i++) {
        checkboxes[i].checked = source.checked;
        checkboxes[i].classList.toggle('on');
        btnEliminar.style.display= "inline-block"
        btnCantidad.style.display= "inline-block"
        btnCantidad.innerHTML= `Todos seleccionados`;
        checkboxes[i].parentNode.parentNode.classList.add('nuevo-checked');
        checkboxes[i].parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.add('canal-checked');
        if (!checkboxes[i].classList.contains('on')) {
            btnEliminar.style.display= "none"
            btnCantidad.style.display= "none"
            checkboxes[i].parentNode.parentNode.classList.remove('nuevo-checked');
            checkboxes[i].parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove('canal-checked');
        }
      }

  }

function verCheckbox(s) {
    let o= [];
    let btnCantidad= document.querySelector('.btn-cantidad');
    let btnEliminar= document.querySelector('.btn-eliminar');
  checkboxes = document.getElementsByName('contacto');
  for(var i=0, n=checkboxes.length;i<n;i++) {
    checkboxes[i].classList.add('on');
      if (checkboxes[i].checked) {
          o.push(checkboxes[i]);
            btnEliminar.style.display= "inline-block";
            btnCantidad.style.display= "inline-block";
            btnCantidad.innerHTML= `${o.length} seleccionados`;
            checkboxes[i].parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.add('canal-checked');
            checkboxes[i].parentNode.parentNode.classList.add('nuevo-checked');
        }

      if (!checkboxes[i].checked) {
        checkboxes[i].parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove('canal-checked');
        checkboxes[i].parentNode.parentNode.classList.remove('nuevo-checked');
      }
      
      if (o== '[]' || o.length==0) {
            checkboxes[i].classList.remove('on');
            btnEliminar.style.display= "none";
            btnCantidad.style.display= "none";
            checkboxes[i].parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove('canal-checked');
      }
    }

}