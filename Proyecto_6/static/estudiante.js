const token = localStorage.getItem("token");
const nombre = localStorage.getItem("nombre");
const usuarioId = localStorage.getItem("id");

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
            let fechaEsp = "Sin fecha asignada aun";
            if(tutoria.fecha_hora) {
                const fechaHora = new Date(tutoria.fecha_hora);
                const opcionesFecha= { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                };
                fechaEsp= fechaHora.toLocaleDateString('es-ES', opcionesFecha);
                fechaEsp = fechaEsp.charAt(0).toUpperCase() + fechaEsp.slice(1);
            }

            let claseBadge = "pendiente"; 
            let textoEstado = "PENDIENTE";

            if(tutoria.id_tutoria === null) {
                claseBadge = "pendiente";
                textoEstado = tutoria.estado_solicitud ? tutoria.estado_solicitud.toUpperCase() : "PENDIENTE";
            } else {
                const estado = tutoria.estado_tutoria ? tutoria.estado_tutoria.toLowerCase() : "";
                textoEstado = tutoria.estado_tutoria;
                if (estado === "programada" || estado === "realizada") {
                    claseBadge = "programada";
                }else if (estado === "cancelada") {
                    claseBadge = "cancelada";
                }
            }

            const lugarTexto = tutoria.aula_o_link ? tutoria.aula_o_link : "Por asignar";

            tabla.innerHTML += `
                <tr>
                    <td>${tutoria.id_solicitud}</td>
                    <td>${tutoria.asignatura}</td>
                    <td>${fechaEsp}</td>
                    <td>${lugarTexto}</td>
                    <td><span class="badge ${claseBadge}">${textoEstado}</span></td>
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
    const fechaFin = document.getElementById("fecha-fin").value;
    
    const hoy = new Date();
    const fechaHoy = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;
    
    const datosSolicitud = {
        id_estudiante: usuarioId, // <-- Esta línea se aumentó
        asignatura: asignatura,
        descripcion_problema: descripcion,
        fecha_solicitud: fechaHoy,
        estado: "Pendiente",
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin
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
        alert("¡Tu solicitud de tutoría ha sido registrada correctamente!");
        document.getElementById("form-solicitud").reset();
        
        const botonTutorias = document.querySelectorAll("nav button")[1];
        cambiarSeccion('tutorias', botonTutorias);
        cargarMisTutorias(); 
    })
    .catch(error => console.error("Error al insertar solicitud:", error));
}

function cerrarSesion() {
    localStorage.clear();
    window.location.replace("/");
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
                let badgeClase = "programada";
                if(t.estado.toLowerCase()=== "realizada") badgeClase = "realizada";
                if(t.estado.toLowerCase() === "cancelada") badgeClase = "cancelada";
                
                html += `<tr>
                            <td>${t.id_tutoria}</td>
                            <td>${t.asignatura}</td>
                            <td>${t.estudiante}</td>
                            <td>${t.tutor}</td>
                            <td>${t.fecha_hora}</td>
                            <td><span class="badge ${badgeClase}">${t.estado}</span></td>
                         </tr>`;
            });
        }
        html += '</tbody></table></div>';
        // Mostrar resultados debajo del botón
        document.getElementById("resultado-consulta").innerHTML = html;
    })
    .catch(error => console.error("Error al consultar:", error));
}