function isLogin() {
    let token= sessionStorage.getItem('token');
    let admin = sessionStorage.getItem('admin');
    let usuariosLi= document.getElementById('usuarioLi');

    if (admin== 0) {
        usuariosLi.style.display= "none";
    }

    if (token) {
        if (typeof(verUsuariosPag)== 'undefined') {
            console.log('skip');
        } else {
            verUsuariosPag(0, 10, 10, 1);
        }

        if (typeof(verRegiones)== 'undefined') {
            console.log('skip');
        } else {
            verRegiones();
        }

        if (typeof(verCompaniasPag)== 'undefined') {
                console.log('skip');
            } else {
                verCompaniasPag(0, 10, 10, 1);
            }


        if (typeof(verContactosPag)== 'undefined') {
            console.log('skip');
        } else {
            verContactosPag(0, 10, 10, 1);
        }


        if (typeof(getPaises)== 'undefined') {
            console.log('skip');
        } else {
            getPaises();
        }

        if (typeof(getCompanias)== 'undefined') {
            console.log('skip');
        } else {
            getCompanias();
        }

    } else {
        window.location.replace('login.html');
    }
}