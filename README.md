# 🎓 Sistema de Gestión de Tutorías Académicas

¡Bienvenido al sistema automatizado para el control, emparejamiento y seguimiento de tutorías de acompañamiento académico! Esta plataforma web conecta a estudiantes que requieren reforzamiento en asignaturas críticas con tutores calificados, centralizando toda la operación mediante un panel de administración inteligente.

La aplicación cuenta con una arquitectura desacoplada utilizando un **Backend de microservicios con Flask (Python)** y un **Frontend interactivo moderno** que adopta la estética de Modo Oscuro (*Dark Mode*).

---

## 🚀 Características Principales

### 👨‍🎓 Módulo del Estudiante
* **Creación de Solicitudes:** Formulario interactivo para registrar requerimientos especificando materia, debilidades conceptuales y rangos de fechas disponibles.
* **Control Asimétrico de Interfaz:** Maquetación responsiva de dos columnas que balancea el formulario de carga junto con paneles instructivos de buenas prácticas.
* **CRUD de Solicitudes Pendientes:** Modificación dinámica mediante ventanas modales y eliminación física con doble confirmación de seguridad (restringido estrictamente a estados *Pendientes*).
* **Consultas por Rango de Fechas:** Filtro avanzado e individualizado que consulta el historial de tutorías del alumno en sesión mediante comunicación asíncrona.

### 👨‍🏫 Módulo del Tutor
* **Bitácora de Sesiones:** Registro minucioso de cada tutoría realizada (temas abordados, tareas asignadas y observaciones cualitativas del rendimiento).
* **Control de Asistencia:** Sistema de verificación para asentar el cumplimiento de la sesión programada.

### 👑 Módulo del Administrador
* **Algoritmo de Emparejamiento:** Asignación inteligente de tutores específicos a solicitudes pendientes, evaluando la carga activa y el área de dominio técnico de cada docente.
* **Gestión de Catálogos:** Altas, bajas y modificaciones de los perfiles de Estudiantes, Tutores y Asignaturas en el sistema.
* **Reportes de Rendimiento:** Consultas avanzadas cruzadas para coordinadores (materias de mayor demanda, índices de inasistencia, etc.).

---

## 🛠️ Tecnologías Utilizadas

* **Backend:** Python 3.x, Flask, Flask-JWT-Extended (Manejo de Autenticación de Sesiones).
* **Base de Datos:** MariaDB / MySQL (Conector `flask_mysqldb`).
* **Frontend:** HTML5, CSS3 (Estructuras Flexbox/Grid nativas), JavaScript Moderno (Vanilla ES6, peticiones asíncronas vía API Fetch).
* **Estilo y Librerías:** Font Awesome 5 (Iconos vectoriales), Toast UI (Notificaciones animadas dinámicas integradas).

---

## 🔐 Seguridad y Autenticación

El sistema implementa un esquema de seguridad basado en tokens de acceso **JWT (JSON Web Tokens)**:
* Cada inicio de sesión genera un token plano encriptado firmado por el servidor que almacena la identidad (`email`) del usuario activo.
* Los endpoints críticos del backend se encuentran blindados utilizando el decorador `@jwt_required()`.
* Las consultas relacionales inyectan parámetros limpios (`%s`) mediante tuplas en el cursor de base de datos para prevenir de raíz ataques de **Inyección SQL**.

---

## 📂 Estructura del Proyecto

```text
├── app.py                     # Servidor Flask principal y definición de API Restful
├── database/
│   └── script.sql             # Estructura relacional de las tablas (Solicitudes, Tutorías, etc.)
├── static/
│   ├── css/
│   │   └── estilos.css        # Hoja de estilos globales y diseño Dark UI
│   └── js/
│       ├── login.js           # Manejo de tokens y validación de accesos
│       └── estudiante.js      # Lógica de CRUD, Toasts y búsquedas asíncronas
└── templates/
    ├── login.html             # Pantalla de acceso al sistema
    ├── dashboard.html         # Panel general de la administración
    └── dashboard_estudiante.html # Panel interactivo del estudiante
