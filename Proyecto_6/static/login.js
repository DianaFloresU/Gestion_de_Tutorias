function login(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (!email || !password) {
        alert("Por favor, introduce tu correo y contraseña.");
        return;
    }

    fetch("/login", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then(res => {
        return res.json().then(data => {
            return {
                status: res.status,
                data: data
            }
        })
    }).then(resultado => {
        if(resultado.status === 200) {
            localStorage.setItem("token", resultado.data.access_token);
            localStorage.setItem("rol", resultado.data.rol);
            localStorage.setItem("nombre", resultado.data.nombre);
            localStorage.setItem("id", resultado.data.id);
            
            if(resultado.data.rol === "tutor") {
                window.location.href = "/dashboard_tutor";
            } else if(resultado.data.rol === "estudiante") {
                window.location.href = "/dashboard_estudiante";
            } else if(resultado.data.rol === "admin") {
                window.location.href = "/dashboard"
            }
        } else {
            alert(resultado.data.msg || "Error al ingresar");
        }
    }).catch(error => {
        console.error("Error en la conexion:", error);
        alert("Ocurrio un error al conectar con el servidor");
    })
}