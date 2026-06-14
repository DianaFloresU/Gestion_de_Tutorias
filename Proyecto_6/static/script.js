function mostrar_estudiantes() {
  fetch("http://127.0.0.1:5000/mostrar_estudiantes")
  .then((response) => response.json())
  .then((data) => {
    const tabla = document.getElementById("tabla-estudiantes");
    tabla.innerHTML = "";
    data.forEach((estudiante) => {
      tabla.innerHTML += `
                <tr>
                  <td>${estudiante.id}</td>
                  <td>${estudiante.nombre}</td>
                  <td>${estudiante.apellido}</td>
                  <td>${estudiante.carrera}</td>
                  <td>${estudiante.email}</td>
                  <td>
                    <div class="btn-acciones-container">
                      <button class="btn-accion btn-editar" onclick="editarEstudiante(${estudiante.id})" title="Editar">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="#ffffff"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                      </button>
                      <button class="btn-accion btn-eliminar" onclick="eliminarEstudiante(${estudiante.id})" title="Eliminar">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="#ffffff"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
            `;
    });
  })
  .catch((error) => console.error("Error Estudiantes:", error));
}


fetch("http://127.0.0.1:5000/mostrar_solicitudes")
  .then((response) => response.json())
  .then((data) => {
    const tabla = document.getElementById("tabla-solicitudes");
    tabla.innerHTML = "";
    data.forEach((solicitud) => {
      tabla.innerHTML += `
                <tr>
                    <td>${solicitud.id_solicitud}</td>
                    <td>${solicitud.id_estudiante}</td>
                    <td>${solicitud.asignatura}</td>
                    <td>${solicitud.descripcion}</td>
                    <td>${solicitud.fecha}</td>
                    <td>${solicitud.estado}</td>
                    <td>
                      <div class="btn-acciones-container">
                        <button class="btn-accion btn-editar" onclick="editarSolicitud(${solicitud.id_solicitud})" title="Editar Solicitud">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="#ffffff">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                          </svg>
                        </button>
                        <button class="btn-accion btn-eliminar" onclick="eliminarSolicitud(${solicitud.id_solicitud})" title="Eliminar Solicitud">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="#ffffff">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                </tr>
            `;
    });
  })
  .catch((error) => console.error("Error Solicitudes:", error));

fetch("http://127.0.0.1:5000/mostrar_tutores")
  .then((response) => response.json())
  .then((data) => {
    const tabla = document.getElementById("tabla-tutores");
    tabla.innerHTML = "";
    data.forEach((tutor) => {
      tabla.innerHTML += `
                <tr>
                    <td>${tutor.id}</td>
                    <td>${tutor.nombre}</td>
                    <td>${tutor.apellido}</td>
                    <td>${tutor.especialidad}</td>
                    <td>${tutor.email}</td>
                    <td>
                        <div class="btn-acciones-container">
                            <button class="btn-accion btn-editar" onclick="editarTutor(${tutor.id})" title="Editar Tutor">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="#ffffff"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                            </button>
                            <button class="btn-accion btn-eliminar" onclick="eliminarTutor(${tutor.id})" title="Eliminar Tutor">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="#ffffff"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
    });
  })
  .catch((error) => console.error("Error Tutores:", error));

fetch("http://127.0.0.1:5000/mostrar_tutorias")
  .then((response) => response.json())
  .then((data) => {
    const tabla = document.getElementById("tabla-tutorias");
    tabla.innerHTML = "";
    data.forEach((tutoria) => {
      tabla.innerHTML += `
                <tr>
                    <td>${tutoria.id_tutoria}</td>
                    <td>${tutoria.id_solicitud}</td>
                    <td>${tutoria.id_tutor}</td>
                    <td>${tutoria.fecha_hora}</td>
                    <td>${tutoria.aula_o_link}</td>
                    <td>${tutoria.estado_tutoria}</td>
                    <td>${tutoria.observaciones}</td>
                    <td>
                      <div class="btn-acciones-container">
                        <button class="btn-accion btn-editar" onclick="editarTutoria(${tutoria.id_tutoria})" title="Editar Tutoría">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="#ffffff"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                        </button>
                        <button class="btn-accion btn-eliminar" onclick="eliminarTutoria(${tutoria.id_tutoria})" title="Eliminar Tutoría">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="#ffffff"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                        </button>
                      </div>
                    </td>           
                </tr>
            `;
    });
  })
  .catch((error) => console.error("Error Tutorías:", error));

function cerrarSesion() {
  localStorage.removeItem("token");
  window.location.replace("/");
}

let modoEstudiante = "crear"; 
let idEstudianteActual = null;

function addEstudiante() {
    modoEstudiante = "crear";
    idEstudianteActual = null;
    
    document.getElementById("modal-estudiante-titulo").innerText = "Registrar Estudiante";
    document.getElementById("form-estudiante").reset();
    document.getElementById("modal-estudiante").style.display = "flex";
}

function cerrarModalEstudiante() {
    document.getElementById("modal-estudiante").style.display = "none";
}

function editarEstudiante(id) {
    modoEstudiante = "editar";
    idEstudianteActual = id;
    document.getElementById("modal-estudiante-titulo").innerText = "Modificar Estudiante";
    fetch("http://127.0.0.1:5000/mostrar_estudiantes")
        .then(res => res.json())
        .then(lista => {
            const reg = lista.find(item => item.id === id);
            if (reg) {
                document.getElementById("est-nombre").value = reg.nombre;
                document.getElementById("est-apellido").value = reg.apellido;
                document.getElementById("est-carrera").value = reg.carrera;
                document.getElementById("est-email").value = reg.email;
                document.getElementById("modal-estudiante").style.display = "flex";
            }
        });
}


document.getElementById("form-estudiante").addEventListener("submit", (e) => {
  e.preventDefault(); 

  const token = localStorage.getItem("token");
  const datos = {
    nombre: document.getElementById("est-nombre").value,
    apellido: document.getElementById("est-apellido").value,
    carrera: document.getElementById("est-carrera").value,
    email: document.getElementById("est-email").value
  };

  let url = "http://127.0.0.1:5000/agregar_estudiante";
  let metodo = "POST";
  let mensajeExito = "Se agregó correctamente el estudiante";

  if (modoEstudiante === "editar") {
    url = `http://127.0.0.1:5000/modificar_estudiante/${idEstudianteActual}`;
    metodo = "PUT";
    mensajeExito = "Se actualizó correctamente el estudiante";
  }

  fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(datos)
  })
  .then(res => {
    if (!res.ok) throw new Error("Error en la respuesta del servidor");
    return res.json();
  })
  .then(() => {
    cerrarModalEstudiante();  
    mostrar_estudiantes();    
    alert(mensajeExito);   
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("Ocurrió un error en el servidor");
  });
});

function eliminarEstudiante(id) {
    if (confirm("¿Estás seguro de eliminar este estudiante?")) {
        const token = localStorage.getItem("token");
        fetch(`http://127.0.0.1:5000/eliminar_estudiante/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => { 
            alert(data.msg || "Eliminado"); 
            mostrar_estudiantes();
        });
    }
}

mostrar_estudiantes();