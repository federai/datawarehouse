function agregarCanal(s) {
    s.preventDefault();
    let canalContainer= document.getElementById('canal');
    let btnFooter= document.getElementById('btnFooter');
    let nuevoDiv= document.createElement('div');
    let txt= `<label for="new-canal-contacto">`+
            `<p>Canal de Contacto</p>`+
            `<select class="new-canal-contacto" name="new-canal-contacto" tabindex="11">`+
            `<option value="" disabled selected>Seleccionar canal</option>`+
            `</select>`+
        `</label>`+
        
        `<label for="new-cuenta">
        <p>Cuenta de usuario</p>
        <input type="text" id="new-cuenta" placeholder="@ejemplo" tabindex="12"/>
        </label>

        <label for="new-preferencias">
        <p>Preferencias</p>
        <select id="new-preferenicas" name="new-preferencias" tabindex="13">
            <option value="sinpreferencia">Sin Preferencia</option>
            <option value="canalfav">Canal Favorito</option>
            <option value="nomolestar">No Molestar</option>
        </select>
        </label>

        <button class="btn btn-outline-secondary" onclick="agregarCanal()">+ Agregar Canal</button>
  `;
  nuevoDiv.innerHTML= txt;
  nuevoDiv.classList.add('nueva-row')
  canalContainer.insertBefore(nuevoDiv, btnFooter);
}