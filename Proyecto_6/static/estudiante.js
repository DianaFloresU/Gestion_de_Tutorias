const token = localStorage.getItem("token");
const nombre = localStorage.getItem("nombre");

document.addEventListener("DOMContentLoaded", () => {
    if (nombre) {
        document.getElementById("nombre-usuario").innerText = nombre;
    }
    cargarMisTutorias();
});

function cambiarSeccion(idSeccion, boton) {
    document.querySelectorAll(".content-section").forEach(s => s.classList.remove("active"));
    document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
    
    document.getElementById(idSeccion).classList.add("active");
    boton.classList.add("active");
}

function cargarMisTutorias() {
    fetch("http://127.0.0.1:5000/mis_tutorias", {
        method: "GET",
        headers: { 
            "Authorization": `Bearer ${token}` 
        }
    })
    .then(res => {
        if (res.status === 401) {
            cerrarSesion();
            return;
        }
        return res.json();
    })
    .then(data => {
        const tabla = document.getElementById("tabla-tutorias-estudiante");
        if (!tabla || !data) return;
        tabla.innerHTML = "";

        data.forEach(tutoria => {
            const fechaHora = new Date(tutoria.fecha_hora);
            const opcionesFecha= { 
                wekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            let fechaEsp= fechaHora.toLocaleDateString('es-ES', opcionesFecha);
            fechaEsp = fechaEsp.charAt(0).toUpperCase() + fechaEsp.slice(1);
            
            let claseBadge = "pendiente"; 
            const estado = tutoria.estado_tutoria.toLowerCase();

            if (estado === "programada" || estado === "realizada") {
                claseBadge = "programada";
            } else if (estado === "cancelada") {
                claseBadge = "cancelada";
            }

            tabla.innerHTML += `
                <tr>
                    <td>${tutoria.id_tutoria}</td>
                    <td>Solicitud #${tutoria.asignatura}</td>
                    <td>${fechaEsp}</td>
                    <td>${tutoria.aula_o_link}</td>
                    <td><span class="badge ${claseBadge}">${tutoria.estado_tutoria}</span></td>
                </tr>`;
        });
    })
    .catch(error => console.error("Error al mapear datos desde MariaDB:", error));
}

function enviarSolicitud(event) {
    event.preventDefault();

    const asignatura = document.getElementById("asignatura").value;
    const descripcion = document.getElementById("descripcion").value;
    const fechaInicio = document.getElementById("fecha-inicio").value;

    const datosSolicitud = {
        asignatura: asignatura,
        descripcion_problema: descripcion,
        fecha_solicitud: fechaInicio,
        estado: "Pendiente" 
    };

    fetch("http://127.0.0.1:5000/agregar_solicitud", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(datosSolicitud)
    })
    .then(res => res.json())
    .then(data => {
        alert("¡Tu solicitud de tutoría ha sido registrada en la base de datos!");
        document.getElementById("form-solicitud").reset();
        
        const botonTutorias = document.querySelectorAll("nav button")[1];
        cambiarSeccion('tutorias', botonTutorias);
        cargarMisTutorias(); 
    })
    .catch(error => console.error("Error al insertar solicitud:", error));
}

function cerrarSesion() {
    localStorage.clear();
    window.location.href = "/";
}

function consultarTutoriasPorFecha() {
    const token = localStorage.getItem("token");
    const fechaInicio = document.getElementById("fecha_inicio").value;
    const fechaFin = document.getElementById("fecha_fin").value;

    if (!fechaInicio || !fechaFin) {
        alert("Debe seleccionar ambas fechas");
        return;
    }

    fetch(`http://127.0.0.1:5000/tutorias_por_fecha?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
        let html = '<div class="table-responsive"><table class="tabla-tutorias"><thead><tr><th>ID</th><th>Asignatura</th><th>Estudiante</th><th>Tutor</th><th>Fecha/Hora</th><th>Estado</th></tr></thead><tbody>';
        if (data.length === 0) {
            html += '<tr><td colspan="6" class="text-center">No hay tutorías en ese rango</td></tr>';
        } else {
            data.forEach(t => {
                html += `<tr>
                            <td>${t.id_tutoria}</td>
                            <td>${t.asignatura}</td>
                            <td>${t.estudiante}</td>
                            <td>${t.tutor}</td>
                            <td>${t.fecha_hora}</td>
                            <td>${t.estado}</td>
                         </tr>`;
            });
        }
        html += '</tbody></table></div>';
        // Mostrar resultados debajo del botón
        document.getElementById("resultado-consulta").innerHTML = html;
    })
    .catch(error => console.error("Error al consultar:", error));
}