function login(){
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    fetch("/login", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            username: username,
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
            localStorage.setItem("token", resultado.data.access_token) 
            window.location.href = "/dashboard"
        } else {
            alert(resultado.data.msg) 
        }
    }).catch(error => {
        console.error(error)
    })
}
