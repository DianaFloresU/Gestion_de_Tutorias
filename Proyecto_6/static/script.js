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

function mostrar_solicitudes() {
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
}

function mostrar_tutores() {
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
}

function mostrar_tutorias() {
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
}

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

let modoSolicitud = "crear";
let idSolicitudActual = null;

function cargarComboEstudiantes(idSeleccionado = null) {
    const selectEstudiantes = document.getElementById("sol-id-estudiante");
    selectEstudiantes.innerHTML = '<option value="">Seleccione un estudiante...</option>';
    return fetch("http://127.0.0.1:5000/mostrar_estudiantes")
        .then(res => res.json())
        .then(lista => {
            lista.forEach(est => {
                const id = est.id || est.id_estudiante;
                const option = document.createElement("option");
                option.value = id;
                option.textContent = `[${est.id}] - ${est.nombre} ${est.apellido}`;
                selectEstudiantes.appendChild(option);
            });
            if (idSeleccionado) {
                selectEstudiantes.value = idSeleccionado;
            }
        })
        .catch(err => console.error("Error al cargar combo de estudiantes:", err));
}

function addSolicitud() {
    modoSolicitud = "crear";
    idSolicitudActual = null;
    document.getElementById("modal-solicitud-titulo").innerText = "Registrar Solicitud";
    document.getElementById("form-solicitud").reset();
    cargarComboEstudiantes();
    document.getElementById("modal-solicitud").style.display = "flex"; 
}

function cerrarModalSolicitud() {
    document.getElementById("modal-solicitud").style.display = "none";
    document.getElementById("campos-edicion-solicitud").style.display = "none";
}

function editarSolicitud(id) {
    modoSolicitud = "editar";
    idSolicitudActual = id;
    cargarComboEstudiantes();
    document.getElementById("modal-solicitud-titulo").innerText = "Modificar Solicitud";
    fetch("http://127.0.0.1:5000/mostrar_solicitudes")
        .then(res => res.json())
        .then(lista => {
            const reg = lista.find(item => item.id_solicitud == id || item.id == id);
            if (reg) {
                document.getElementById("sol-id-estudiante").value = reg.id_estudiante || "";
                document.getElementById("sol-asignatura").value = reg.asignatura || "";
                document.getElementById("sol-descripcion").value = reg.descripcion || reg.descripcion_problema || "";
                document.getElementById("campos-edicion-solicitud").style.display = "block";
                if (reg.fecha || reg.fecha_solicitud) {
                    const fechaBase = reg.fecha || reg.fecha_solicitud;
                    document.getElementById("sol-fecha-solicitud").value = fechaBase.substring(0, 10);
                } else {
                    document.getElementById("sol-fecha-solicitud").value = "";
                }
                document.getElementById("sol-estado").value = reg.estado || "pendiente";
                document.getElementById("campos-edicion-solicitud").style.display = "block";
                document.getElementById("modal-solicitud").style.display = "flex";
            } else {
                console.error("No se encontró coincidencia en la lista para el ID:", id);
                alert("La solicitud no existe o los identificadores no coinciden.");
            }
        })
        .catch(err => {
            console.error("Error crítico al procesar la solicitud:", err);
            alert("Error de conexión con el servidor.");
        });
}

document.getElementById("form-solicitud").addEventListener("submit", (e) => {
  e.preventDefault(); 

  const token = localStorage.getItem("token");
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0'); 
  const dia = String(hoy.getDate()).padStart(2, '0');
  const fechaActualMySQL = `${anio}-${mes}-${dia}`;

  const datos = {
    id_estudiante: parseInt(document.getElementById("sol-id-estudiante").value, 10),
    asignatura: document.getElementById("sol-asignatura").value,
    descripcion_problema: document.getElementById("sol-descripcion").value,
    fecha_solicitud: fechaActualMySQL, 
    estado: "Pendiente"
  };

  let url = "http://127.0.0.1:5000/agregar_solicitud";
  let metodo = "POST";
  let mensajeExito = "Se agregó correctamente la solicitud";

  if (modoSolicitud === "editar") {
    url = `http://127.0.0.1:5000/modificar_solicitud/${idSolicitudActual}`;
    metodo = "PUT";
    mensajeExito = "Se actualizó correctamente la solicitud";
    
    datos.fecha_solicitud = document.getElementById("sol-fecha-solicitud").value;
    datos.estado = document.getElementById("sol-estado").value;
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
    cerrarModalSolicitud();  
    mostrar_solicitudes();    
    alert(mensajeExito);   
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("Ocurrió un error en el servidor al procesar la solicitud");
  });
});


function eliminarSolicitud(id) {
    if (confirm("¿Estás seguro de eliminar esta solicitud?")) {
        const token = localStorage.getItem("token");
        fetch(`http://127.0.0.1:5000/eliminar_solicitud/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => {
            if (!res.ok) throw new Error("No se pudo eliminar");
            return res.json();
        })
        .then(data => { 
            alert(data.msg || "Solicitud eliminada con éxito"); 
            mostrar_solicitudes();
        })
        .catch(err => {
            console.error("Error al eliminar solicitud:", err);
            alert("No se pudo eliminar la solicitud");
        });
    }
}

let modoTutor = "crear";
let idTutorActual = null;

function addTutor() {
    modoTutor = "crear";
    idTutorActual = null;
    
    document.getElementById("modal-tutor-titulo").innerText = "Registrar Tutor";
    document.getElementById("form-tutor").reset();
    
    document.getElementById("modal-tutor").style.display = "flex";
}

function cerrarModalTutor() {
    document.getElementById("modal-tutor").style.display = "none";
}

function editarTutor(id) {
    modoTutor = "editar";
    idTutorActual = id;
    document.getElementById("modal-tutor-titulo").innerText = "Modificar Tutor";
    
    fetch("http://127.0.0.1:5000/mostrar_tutores")
        .then(res => res.json())
        .then(lista => {
            
            const reg = lista.find(item => item.id === id);
            
            if (reg) {
                
                document.getElementById("tut-nombre").value = reg.nombre;
                document.getElementById("tut-apellido").value = reg.apellido;
                document.getElementById("tut-especialidad").value = reg.especialidad;
                document.getElementById("tut-email").value = reg.email;
                
                
                document.getElementById("modal-tutor").style.display = "flex";
            } else {
                console.error("No se encontró ningún tutor con el ID:", id);
            }
        })
        .catch(err => console.error("Error al abrir edición de tutor:", err));
}

document.getElementById("form-tutor").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
    
    const datos = {
        nombre: document.getElementById("tut-nombre").value,
        apellido: document.getElementById("tut-apellido").value,
        especialidad: document.getElementById("tut-especialidad").value,
        email: document.getElementById("tut-email").value
    };

    let url = "http://127.0.0.1:5000/agregar_tutor";
    let metodo = "POST";
    let mensajeExito = "Se agregó correctamente el tutor";

    if (modoTutor === "editar") {
        url = `http://127.0.0.1:5000/modificar_tutor/${idTutorActual}`;
        metodo = "PUT";
        mensajeExito = "Se actualizó correctamente el tutor";
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
        cerrarModalTutor();
        mostrar_tutores();
        alert(mensajeExito);
    })
    .catch((error) => {
        console.error("Error al guardar tutor:", error);
        alert("Ocurrió un error en el servidor al procesar el tutor");
    });
});

function eliminarTutor(id) {
    if (confirm("¿Estás seguro de eliminar este tutor?")) {
        const token = localStorage.getItem("token");
        
        fetch(`http://127.0.0.1:5000/eliminar_tutor/${id}`, {
            method: "DELETE",
            headers: { 
                "Authorization": `Bearer ${token}` 
            }
        })
        .then(res => {
            if (!res.ok) throw new Error("Error al intentar eliminar");
            return res.json();
        })
        .then(data => {
            alert(data.msg || "Tutor eliminado correctamente");
            mostrar_tutores();
        })
        .catch(err => {
            console.error("Error al eliminar tutor:", err);
            alert("No se pudo completar la eliminación");
        });
    }
}

let modoTutoria = "crear";
let idTutoriaActual = null;

function cargarCombosTutoria(idSolicitudSel = null, idTutorSel = null) {
    const selectSol = document.getElementById("tuto-id-solicitud");
    const selectTut = document.getElementById("tuto-id-tutor");
    
    selectSol.innerHTML = '<option value="">Seleccione una solicitud...</option>';
    selectTut.innerHTML = '<option value="">Seleccione un tutor...</option>';

    const p1 = fetch("http://127.0.0.1:5000/mostrar_solicitudes").then(r => r.json());
    const p2 = fetch("http://127.0.0.1:5000/mostrar_tutores").then(r => r.json());

    return Promise.all([p1, p2]).then(([solicitudes, tutores]) => {
        solicitudes.forEach(sol => {
            const idSol = sol.id_solicitud || sol.id;
            const opt = document.createElement("option");
            opt.value = idSol;
            opt.textContent = `[${idSol}] ${sol.asignatura} - (${sol.descripcion})`;
            selectSol.appendChild(opt);
        });

        tutores.forEach(tut => {
            const idTut = tut.id || tut.id_tutor;
            const opt = document.createElement("option");
            opt.value = idTut;
            opt.textContent = `[${idTut}] - ${tut.nombre} ${tut.apellido}`;
            selectTut.appendChild(opt);
        });

        if (idSolicitudSel) selectSol.value = String(idSolicitudSel);
        if (idTutorSel) selectTut.value = String(idTutorSel);
    }).catch(err => console.error("Error al poblar selectores de tutorías:", err));
}

function addTutoria() {
    modoTutoria = "crear";
    idTutoriaActual = null;
    document.getElementById("modal-tutoria-titulo").innerText = "Registrar Tutoría";
    document.getElementById("form-tutoria").reset();
    
    cargarCombosTutoria();
    
    document.getElementById("modal-tutoria").style.display = "flex";
}

function cerrarModalTutoria() {
    document.getElementById("modal-tutoria").style.display = "none";
}

function editarTutoria(id) {
    modoTutoria = "editar";
    idTutoriaActual = id;
    document.getElementById("modal-tutoria-titulo").innerText = "Modificar Tutoría";
    
    fetch("http://127.0.0.1:5000/mostrar_tutorias")
        .then(res => res.json())
        .then(lista => {
            const reg = lista.find(item => item.id_tutoria == id || item.id == id);
            if (reg) {
                cargarCombosTutoria(reg.id_solicitud, reg.id_tutor).then(() => {
                    document.getElementById("tuto-aula-link").value = reg.aula_o_link;
                    document.getElementById("tuto-estado").value = reg.estado_tutoria;
                    document.getElementById("tuto-observaciones").value = reg.observaciones;
                    
                    if (reg.fecha_hora) {
                        const fechaFormateada = reg.fecha_hora.replace(" ", "T").substring(0, 16);
                        document.getElementById("tuto-fecha-hora").value = fechaFormateada;
                    } else {
                        document.getElementById("tuto-fecha-hora").value = "";
                    }
                    
                    document.getElementById("campos-edicion-tutoria").style.display = "block";
                    document.getElementById("modal-tutoria").style.display = "flex";
                });
            }
        })
        .catch(err => console.error("Error al abrir edición de tutoría:", err));
}

document.getElementById("form-tutoria").addEventListener("submit", (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    const datos = {
        id_solicitud: parseInt(document.getElementById("tuto-id-solicitud").value, 10),
        id_tutor: parseInt(document.getElementById("tuto-id-tutor").value, 10),
        fecha_hora: document.getElementById("tuto-fecha-hora").value.replace("T", " "), 
        aula_o_link: document.getElementById("tuto-aula-link").value,
        estado_tutoria: document.getElementById("tuto-estado").value, 
        observaciones: document.getElementById("tuto-observaciones").value
    };

    let url = "http://127.0.0.1:5000/agregar_tutoria";
    let metodo = "POST";
    let mensajeExito = "Se agendó correctamente la tutoría";

    if (modoTutoria === "editar") {
        url = `http://127.0.0.1:5000/modificar_tutoria/${idTutoriaActual}`;
        metodo = "PUT";
        mensajeExito = "Se actualizó correctamente la tutoría";
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
        if (!res.ok) throw new Error("Error en el servidor");
        return res.json();
    })
    .then(() => {
        cerrarModalTutoria();
        mostrar_tutorias();
        alert(mensajeExito);
    })
    .catch(err => console.error("Error al guardar tutoría:", err));
});

function eliminarTutoria(id) {
    if (confirm("¿Estás seguro de eliminar esta tutoría?")) {
        const token = localStorage.getItem("token");
        fetch(`http://127.0.0.1:5000/eliminar_tutoria/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            alert(data.msg || "Tutoría eliminada");
            mostrar_tutorias();
        })
        .catch(err => console.error("Error al eliminar tutoría:", err));
    }
}

mostrar_estudiantes();
mostrar_solicitudes();
mostrar_tutores();
mostrar_tutorias();