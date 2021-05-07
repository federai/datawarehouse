let searchDropBar= document.querySelector('.search-dropdown-btn');
let searchDrop= document.querySelector('.search-dropdown');

searchDropBar.addEventListener('click', showDropdown);

function showDropdown() {
    if (searchDrop.classList.contains('show')) {
        searchDrop.style.display= "none";
        searchDrop.classList.remove('show')
    } else {
    searchDrop.style.display= "block";
    searchDrop.classList.add('show');
    }
}

