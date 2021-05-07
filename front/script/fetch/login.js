let btnLogin= document.getElementById('loginBtn');

btnLogin.addEventListener('click', login);

function login(e) {
    let empty= document.getElementById('emptyNameLogin');
    let userLogin= document.getElementById('user-login').value;
    let passLogin= document.getElementById('pass-login').value;

    if (userLogin && passLogin) {
        e.preventDefault();
    } else {
        return;
    }

    let o = {
        email: userLogin,
        contrasenia: passLogin
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(o);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

    fetch("http://localhost:3000/usuarios/login", requestOptions)
    .then(result=> {
        if (result.status== 200) {
            return result.json()
        } else if (result.status == 400) {
            empty.style.display= "inline-block";
        }
    })
    .then(json=> {
       let token= json.token;
       let admin= json.admin;
       sessionStorage.setItem('token', token);
       sessionStorage.setItem('admin', admin);
       window.location.replace('index.html');
    });
}