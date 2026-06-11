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
                </tr>
            `;
    });
  })
  .catch((error) => console.error("Error Estudiantes:", error));

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
                </tr>
            `;
    });
  })
  .catch((error) => console.error("Error Tutorías:", error));

function cerrarSesion() {
  localStorage.removeItem("token");
  window.location.href = "/";
}

function toggleFormulario(idFormulario) {
  const form = document.getElementById(idFormulario);
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
}