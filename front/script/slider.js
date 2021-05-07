let slider= document.getElementById('new-range');
let select= document.getElementById('new-porcentaje');
let firstOption= document.getElementById('first-option');
let optionTwo= document.getElementById('option-25');
let optionThree= document.getElementById('option-50');
let optionFour= document.getElementById('option-75');
let optionFive= document.getElementById('option-100');
let output= document.createElement('option');

output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value + '%';
  output.setAttribute('value', this.value);
  output.setAttribute('selected', true);
  output.classList.add('additional');
  select.insertBefore(output, firstOption);
}

function changeValue(option) {
    console.log('hola');
    slider.setAttribute('value', option);
}

select.addEventListener('change', (e)=> {
  changeValue(e.target.value);
})
