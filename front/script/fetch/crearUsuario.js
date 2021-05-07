function contraseniaRepetida(input) {
    if (input.value !== document.getElementById("pass-user").value) {
      input.setCustomValidity("Contraseña no coincide");
      return;
    } else {
      input.setCustomValidity("");
      return;
    }
  }
  
  let btnCrearUsuario = document.getElementById("btnCrearUsuario");
  
  btnCrearUsuario.addEventListener("click", crearUsuarios);
  
  function crearUsuarios(event) {
    let nombre = document.getElementById("user-name").value;
    let apellido = document.getElementById("user-lastname").value;
    let email = document.getElementById("user-email").value;
    let admin = document.getElementById("user-perfil").value;
    let contrasenia = document.getElementById("pass-user").value;
    let contraRepetir = document.getElementById("pass-user-repeat").value;
  
    if (nombre && apellido && email && admin && contrasenia && contraRepetir) {
      event.preventDefault();
    } else {
      return;
    }
  
    if (admin == "basic") {
      admin = 0;
    } else if (admin == "admin") {
      admin = 1;
    }
  
    let o = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      admin: admin,
      contrasenia: contrasenia,
      contraRepetir: contraRepetir,
    };
  
    var myHeaders = new Headers();
    let token = sessionStorage.getItem("token");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
  
    var raw = JSON.stringify(o);
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  
    fetch("http://localhost:3000/usuarios/registro", requestOptions)
      .then((result) => {
        if (result.status == 201) {
          window.location.replace("verUsuarios.html");
        }
      })
      .catch((error) => console.log("error", error));
  }
  