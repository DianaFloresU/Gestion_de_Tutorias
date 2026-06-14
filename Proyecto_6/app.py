import mysql.connector as mysql_backend
from flask import Flask, jsonify, request, render_template
from flask_mysqldb import MySQL
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from datetime import datetime, date
from flask import current_app

app = Flask(__name__)

# CORREGIDO: Usamos el nuevo alias para que no choque con la variable de abajo
db = mysql_backend.connect(
    host="localhost",
    user="root",
    password="",
    database="gestiontutorias"
)

# Configuración de la Base de Datos
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'       
app.config['MYSQL_PASSWORD'] = ''      
app.config['MYSQL_DB'] = 'gestiontutorias'

# Configuración de JWT
app.config['JWT_SECRET_KEY'] = '12345'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=2)

mysql = MySQL(app)
jwt = JWTManager(app)

# Dashboard estudiante
@app.route('/dashboard_estudiante', methods=['GET'])
def dashboard_estudiante():
    return render_template("dashboard_estudiante.html")

# Endpoint para mostrar estudiantes

@app.route('/mostrar_estudiantes', methods=['GET'])
def mostrar_estudiantes():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM Estudiantes")
    rows = cursor.fetchall()
    cursor.close()
    
    estudiantes = []
    for row in rows:
        estudiantes.append({'id': row[0], 'nombre': row[1], 'apellido': row[2], 'carrera': row[3], 'email': row[4]})
    return jsonify(estudiantes), 200

# Mostrar las tutorias del estudiante con id

@app.route('/mis_tutorias', methods=['GET'])
@jwt_required()
def mis_tutorias():
    correo_estudiante = get_jwt_identity()
    cur = mysql.connection.cursor()
    cur.execute("SELECT id_estudiante FROM estudiantes WHERE email = %s", (correo_estudiante,))
    estudiante = cur.fetchone()
    
    if not estudiante:
        cur.close()
        return jsonify({"msg": "Estudiante no encontrado"}), 404
        
    id_estudiante = estudiante[0]

    sql = """
        SELECT t.id_tutoria,s.id_solicitud, s.asignatura, t.fecha_hora, t.aula_o_link, s.estado AS estado_solicitud, t.estado_tutoria 
        FROM solicitudes s
        LEFT JOIN tutorias t ON s.id_solicitud = t.id_solicitud
        WHERE s.id_estudiante = %s
    """
    cur.execute(sql, (id_estudiante,))
    columnas = ['id_tutoria', 'id_solicitud', 'asignatura', 'fecha_hora', 'aula_o_link', 'estado_solicitud', 'estado_tutoria']
    resultado = [dict(zip(columnas, fila)) for fila in cur.fetchall()]  
    cur.close()
    return jsonify(resultado), 200

# Endpoint para agregar estudiante, requiere autenticación JWT

@app.route('/agregar_estudiante', methods=['POST'])
@jwt_required()
def agregar_estudiante():
    data = request.get_json()
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO Estudiantes (nombre, apellido, carrera, email) VALUES (%s, %s, %s, %s)",
                (data['nombre'], data['apellido'], data['carrera'], data['email']))
    mysql.connection.commit()
    cur.close()
    return jsonify({"msg": "Estudiante agregado exitosamente"}), 201

# Endpoint para modificar estudiante, requiere autenticación JWT

@app.route('/modificar_estudiante/<int:id>', methods=['PUT'])
@jwt_required()
def modificar_estudiante(id):
    data = request.get_json()
    cur = mysql.connection.cursor()
    cur.execute("UPDATE Estudiantes SET nombre=%s, apellido=%s, carrera=%s, email=%s WHERE id_estudiante=%s",
                (data['nombre'], data['apellido'], data['carrera'], data['email'], id))
    mysql.connection.commit()
    cur.close()
    return jsonify({"msg": "Estudiante modificado exitosamente"}), 200

# Endpoint para eliminar estudiante, requiere autenticación JWT

@app.route('/eliminar_estudiante/<int:id>', methods=['DELETE'])
@jwt_required()
def eliminar_estudiante(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM Estudiantes WHERE id_estudiante = %s", (id,))
    mysql.connection.commit()
    cur.close()
    return jsonify({"msg": "Estudiante eliminado exitosamente"}), 200

# Endpoint para mostrar tutores

@app.route('/mostrar_tutores', methods=['GET'])
def mostrar_tutores():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM Tutores")
    rows = cur.fetchall()
    cur.close()
    
    tutores = []
    for row in rows:
        tutores.append({'id': row[0], 'nombre': row[1], 'apellido': row[2], 'especialidad': row[3], 'email': row[4]})
    return jsonify(tutores), 200

# Endpoint para agregar tutor, requiere autenticación JWT

@app.route('/agregar_tutor', methods=['POST'])
@jwt_required()
def agregar_tutor():
    data = request.get_json()
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO Tutores (nombre, apellido, especialidad, email) VALUES (%s, %s, %s, %s)",
                (data['nombre'], data['apellido'], data['especialidad'], data['email']))
    mysql.connection.commit()
    cur.close()
    return jsonify({"msg": "Tutor agregado exitosamente"}), 201

# Endpoint para modificar tutor, requiere autenticación JWT

@app.route('/modificar_tutor/<int:id>', methods=['PUT'])
@jwt_required()
def modificar_tutor(id):
    data = request.get_json()
    cur = mysql.connection.cursor()
    cur.execute("UPDATE Tutores SET nombre=%s, apellido=%s, especialidad=%s, email=%s WHERE id_tutor=%s",
                (data['nombre'], data['apellido'], data['especialidad'], data['email'], id))
    mysql.connection.commit()
    cur.close()
    return jsonify({"msg": "Tutor modificado exitosamente"}), 200

# Endpoint para eliminar tutor, requiere autenticación JWT

@app.route('/eliminar_tutor/<int:id>', methods=['DELETE'])
@jwt_required()
def eliminar_tutor(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM Tutores WHERE id_tutor = %s", (id,))
    mysql.connection.commit()
    cur.close()
    return jsonify({"msg": "Tutor eliminado exitosamente"}), 200

# Endpoint para mostrar solicitudes

@app.route('/mostrar_solicitudes', methods=['GET'])
def mostrar_solicitudes():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM Solicitudes")
    rows = cur.fetchall()
    cur.close()
    
    solicitudes = []
    for row in rows:
        solicitudes.append({'id_solicitud': row[0], 'id_estudiante': row[1], 'asignatura': row[2], 'descripcion': row[3], 'fecha': str(row[4]), 'estado': row[5]})
    return jsonify(solicitudes), 200

# Endpoint para agregar solicitud, requiere autenticación JWT

@app.route('/agregar_solicitud', methods=['POST'])
@jwt_required()
def agregar_solicitud():
    data = request.get_json()
    cur = mysql.connection.cursor()
    descripcion_base = data.get['descripcion_problema', '']
    fecha_inicio = data.get('fecha_inicio')
    fecha_fin = data.get('fecha_fin')

    fecha_actual = datetime.now().strftime("%Y-%m-%d")
    if fecha_inicio and fecha_fin:
        nota_dispo= f"\n\n[Nota de disponibilidad]: Solicito amablemente que la sesión pueda ser programada entre las siguientes fechas: desde el {fecha_inicio} hasta el {fecha_fin}."
        descripcion_final= f"{descripcion_base}{nota_dispo}"
    else:
        descripcion_final= descripcion_base
    
    cur.execute("INSERT INTO Solicitudes (id_estudiante, asignatura, descripcion_problema, fecha_solicitud, estado) VALUES (%s, %s, %s, %s, %s)",
                (data['id_estudiante'], data['asignatura'], descripcion_final, fecha_actual, data['estado']))
    mysql.connection.commit()
    cur.close()
    return jsonify({"msg": "Solicitud agregada exitosamente"}), 201

# Endpoint para modificar solicitud, requiere autenticación JWT

@app.route('/modificar_solicitud/<int:id>', methods=['PUT'])
@jwt_required()
def modificar_solicitud(id):
    data = request.get_json()
    cur = mysql.connection.cursor()
    cur.execute("UPDATE Solicitudes SET id_estudiante=%s, asignatura=%s, descripcion_problema=%s, fecha_solicitud=%s, estado=%s WHERE id_solicitud=%s",
                (data['id_estudiante'], data['asignatura'], data['descripcion_problema'], data['fecha_solicitud'], data['estado'], id))
    mysql.connection.commit()
    cur.close()
    return jsonify({"msg": "Solicitud modificada exitosamente"}), 200

# Endpoint para eliminar solicitud, requiere autenticación JWT

@app.route('/eliminar_solicitud/<int:id>', methods=['DELETE'])
@jwt_required()
def eliminar_solicitud(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM Solicitudes WHERE id_solicitud = %s", (id,))
    mysql.connection.commit()
    cur.close()
    return jsonify({"msg": "Solicitud eliminada exitosamente"}), 200

# Endpoint para mostrar tutorías

@app.route('/mostrar_tutorias', methods=['GET'])
def mostrar_tutorias():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM Tutorias")
    rows = cur.fetchall()
    cur.close()
    
    tutorias = []
    for row in rows:
        tutorias.append({'id_tutoria': row[0], 'id_solicitud': row[1], 'id_tutor': row[2], 'fecha_hora': str(row[3]), 'aula_o_link': row[4], 'estado_tutoria': row[5], 'observaciones': row[6]})
    return jsonify(tutorias), 200

# Endpoint para agregar tutoría, requiere autenticación JWT

@app.route('/agregar_tutoria', methods=['POST'])
@jwt_required()
def agregar_tutoria():
    data = request.get_json()
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO Tutorias (id_solicitud, id_tutor, fecha_hora, aula_o_link, estado_tutoria, observaciones) VALUES (%s, %s, %s, %s, %s, %s)",
                (data['id_solicitud'], data['id_tutor'], data['fecha_hora'], data['aula_o_link'], data['estado_tutoria'], data['observaciones']))
    mysql.connection.commit()
    cur.close()
    return jsonify({"msg": "Tutoría registrada exitosamente"}), 201

# Endpoint para modificar tutoría, requiere autenticación JWT

@app.route('/modificar_tutoria/<int:id>', methods=['PUT'])
@jwt_required()
def modificar_tutoria(id):
    data = request.get_json()
    cur = mysql.connection.cursor()
    cur.execute("UPDATE Tutorias SET id_solicitud=%s, id_tutor=%s, fecha_hora=%s, aula_o_link=%s, estado_tutoria=%s, observaciones=%s WHERE id_tutoria=%s",
                (data['id_solicitud'], data['id_tutor'], data['fecha_hora'], data['aula_o_link'], data['estado_tutoria'], data['observaciones'], id))
    mysql.connection.commit()
    cur.close()
    return jsonify({"msg": "Tutoría modificada exitosamente"}), 200

# Endpoint para eliminar tutoría, requiere autenticación JWT

@app.route('/eliminar_tutoria/<int:id>', methods=['DELETE'])
@jwt_required()
def eliminar_tutoria(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM Tutorias WHERE id_tutoria = %s", (id,))
    mysql.connection.commit()
    cur.close()
    return jsonify({"msg": "Tutoría eliminada exitosamente"}), 200

# Endpoint de consulta avanzada para mostrar asignaturas con más solicitudes
@app.route('/asignaturas_mas_solicitadas', methods=['GET'])
def asignaturas_mas_solicitadas():
    cur = mysql.connection.cursor()
    cur.execute("""SELECT S.asignatura AS Asignatura, COUNT(S.id_solicitud) AS Cantidad_Solicitudes,
                COUNT(DISTINCT S.id_estudiante) AS Alumnos_Unicos_Solicitantes
                FROM Solicitudes S
                GROUP BY S.asignatura
                ORDER BY Cantidad_Solicitudes DESC;""")
    rows = cur.fetchall()
    cur.close()
    
    resultado = []
    for row in rows:
        resultado.append({'asignatura': row[0], 'total_solicitudes': row[1], 'alumnos_unicos': row[2]})
    return jsonify(resultado), 200

@app.route('/tutorias_por_fecha', methods=['GET'])
@jwt_required()
def tutorias_por_fecha():
    correo_estudiante = get_jwt_identity()
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')

    if not fecha_inicio or not fecha_fin:
        return jsonify({"msg": "Debe proporcionar fecha_inicio y fecha_fin en formato YYYY-MM-DD"}), 400

    cursor = mysql.connection.cursor()

    cursor.execute("SELECT id_estudiante FROM estudiantes WHERE email = %s", (correo_estudiante,))
    estudiante = cursor.fetchone()

    if not estudiante:
        cursor.close()
        return jsonify({"msg": "Estudiante no encontrado"}), 404

    id_estudiante = estudiante[0]

    cursor.execute("""
        SELECT t.id_tutoria, s.asignatura,
               CONCAT(e.nombre, ' ', e.apellido) AS estudiante,
               CONCAT(tu.nombre, ' ', tu.apellido) AS tutor,
               t.fecha_hora, t.estado_tutoria
        FROM tutorias t
        JOIN solicitudes s ON t.id_solicitud = s.id_solicitud
        JOIN estudiantes e ON s.id_estudiante = e.id_estudiante
        JOIN tutores tu ON t.id_tutor = tu.id_tutor
        WHERE DATE(t.fecha_hora) BETWEEN %s AND %s
          AND s.id_estudiante = %s
        ORDER BY t.fecha_hora DESC """,
    (fecha_inicio, fecha_fin, id_estudiante))
    rows = cursor.fetchall()
    cursor.close()

    resultado = []
    for row in rows:
        resultado.append({
            'id_tutoria': row[0],
            'asignatura': row[1],
            'estudiante': row[2],
            'tutor': row[3],
            'fecha_hora': str(row[4]),
            'estado': row[5]
        })
    return jsonify(resultado), 200
    

@app.route('/api/reportes/alumnos_demandantes', methods=['GET'])
@jwt_required()
def reporte_alumnos_demandantes():
    usuario_actual = get_jwt_identity()
    
    if usuario_actual != 'admin':
        return jsonify({"msg": "Acceso denegado. Se requieren permisos de administrador."}), 403
        
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT 
            e.id_estudiante,
            CONCAT(e.nombre, ' ', e.apellido) AS nombre_estudiante,
            e.carrera,
            COUNT(s.id_solicitud) AS total_solicitudes
        FROM estudiantes e
        INNER JOIN solicitudes s ON e.id_estudiante = s.id_estudiante
        GROUP BY e.id_estudiante, e.nombre, e.apellido, e.carrera
        ORDER BY total_solicitudes DESC
    """)
    resultados = cur.fetchall()
    cur.close()
    
    respuesta = []
    for fila in resultados:
        respuesta.append({
            "estudiante_id": fila[0],
            "nombre": fila[1],
            "carrera": fila[2],
            "total_materias": fila[3]
        })
        
    return jsonify(respuesta), 200

@app.route('/')
def sesion():
    return render_template("login.html")

@app.route('/dashboard')
def inicio():
    return render_template("dashboard_administrador.html")

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email:
        return jsonify({"msg": "El correo es obligatorio"}), 400
    if not password:
        return jsonify({"msg": "La contraseña es obligatoria"}), 400
    
    if email == 'admin' and password == '123':
        access_token = create_access_token(identity=email)
        return jsonify({
            "access_token": access_token,
            "rol": "admin",                     
            "nombre": "Administrador General", 
            "id": 0
        }), 200
        
    if password != '123':
        return jsonify({"msg": "Contraseña incorrecta"}), 401
    
    cursor = mysql.connection.cursor()
    
    cursor.execute("SELECT id_estudiante, nombre, apellido FROM Estudiantes WHERE email = %s", (email,))
    estudiante = cursor.fetchone()

    if estudiante:
        cursor.close()
        nombre_completo = f"{estudiante[1]} {estudiante[2]}"
        access_token = create_access_token(identity=email)
        return jsonify({
            "access_token": access_token,
            "rol": "estudiante",
            "nombre": nombre_completo,
            "id": estudiante[0]
        }), 200

    cursor.execute("SELECT id_tutor, nombre, apellido FROM Tutores WHERE email = %s", (email,))
    tutor = cursor.fetchone()
    cursor.close()

    if tutor:
        nombre_completo = f"{tutor[1]} {tutor[2]}"
        access_token = create_access_token(identity=email)
        return jsonify({
            "access_token": access_token,
            "rol": "tutor",
            "nombre": nombre_completo,
            "id": tutor[0]
        }), 200
    return jsonify({"msg": "El correo no está registrado en el sistema"}), 404


@app.route('/dashboard_tutor', methods=['GET'])
def dashboard_tutor():
    return render_template("dashboard_tutor.html")

# endpoint login tutores
@app.route('/solicitudes_tutor', methods=['GET'])
@jwt_required()
def solicitudes_tutor():
    cursor = mysql.connection.cursor()
    
    query = """
        SELECT 
            s.id_solicitud, 
            CONCAT(e.nombre, ' ', e.apellido) AS estudiante, 
            s.asignatura, 
            s.descripcion_problema AS descripcion, 
            s.fecha_solicitud AS fecha, 
            s.estado
        FROM Solicitudes s
        JOIN Estudiantes e ON s.id_estudiante = e.id_estudiante
        WHERE LOWER(s.estado) = 'pendiente'
    """
    cursor.execute(query)
    columnas = [col[0] for col in cursor.description]
    resultados = []
    
    for fila in cursor.fetchall():
        dicc = dict(zip(columnas, fila))
        if isinstance(dicc['fecha'], (datetime, date)):
            dicc['fecha'] = dicc['fecha'].isoformat()
        resultados.append(dicc)
        
    cursor.close()
    return jsonify(resultados), 200

@app.route('/tutorias_tutor', methods=['GET'])
@jwt_required()
def tutorias_tutor():
    email_tutor = get_jwt_identity()
    cursor = mysql.connection.cursor()
    
    query = """
        SELECT 
            t.id_tutoria, 
            s.asignatura, 
            t.fecha_hora, 
            t.aula_o_link, 
            t.estado_tutoria
        FROM Tutorias t
        JOIN Solicitudes s ON t.id_solicitud = s.id_solicitud
        JOIN Tutores tut ON t.id_tutor = tut.id_tutor
        WHERE tut.email = %s
    """
    cursor.execute(query, (email_tutor,))
    columnas = [col[0] for col in cursor.description]
    resultados = []
    
    for fila in cursor.fetchall():
        dicc = dict(zip(columnas, fila))
        if isinstance(dicc['fecha_hora'], (datetime, date)):
            dicc['fecha_hora'] = dicc['fecha_hora'].isoformat()
        resultados.append(dicc)
        
    cursor.close()
    return jsonify(resultados), 200

@app.route('/registrar_bitacora', methods=['POST'])
@jwt_required()
def registrar_bitacora():
    datos = request.get_json()
    id_tutoria = datos.get('id_tutoria')
    fecha = datos.get('fecha')
    hora = datos.get('hora')
    temas = datos.get('temas_abordados')
    observaciones = datos.get('observaciones_rendimiento')
    tareas = datos.get('tareas_asignadas')

    if not id_tutoria or not fecha or not hora or not temas:
        return jsonify({"msg": "Faltan datos obligatorios para la bitácora"}), 400

    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO bitacora_sesiones (id_tutoria, fecha, hora, temas_abordados, observaciones_rendimiento, tareas_asignadas)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (id_tutoria, fecha, hora, temas, observaciones, tareas))
        mysql.connection.commit()
        cur.close()
        return jsonify({"msg": "Bitácora de sesión registrada correctamente"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/registrar_asistencia', methods=['POST'])
@jwt_required()
def registrar_asistencia():
    datos = request.get_json()
    id_tutoria = datos.get('id_tutoria')
    id_estudiante = datos.get('id_estudiante')
    asistio = datos.get('asistio')

    if id_tutoria is None or id_estudiante is None or asistio is None:
        return jsonify({"msg": "Faltan datos obligatorios para la asistencia"}), 400

    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO control_asistencia (id_tutoria, id_estudiante, asistio)
            VALUES (%s, %s, %s)
        """, (id_tutoria, id_estudiante, asistio))
        mysql.connection.commit()
        cur.close()
        return jsonify({"msg": "Asistencia registrada correctamente"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/bitacoras_tutor', methods=['GET'])
@jwt_required()
def obtener_bitacoras_tutor():
    try:
        cursor = db.cursor(dictionary=True)
        
        consulta = """
            SELECT b.id_tutoria, b.fecha, b.hora, b.temas_abordados, 
                   b.observaciones_rendimiento, b.tareas_asignadas
            FROM bitacora_sesiones b
            JOIN tutorias t ON b.id_tutoria = t.id_tutoria
            ORDER BY b.fecha DESC, b.hora DESC
        """
        cursor.execute(consulta)
        historial = cursor.fetchall()
        cursor.close()
        
        for registro in historial:
            registro['id_tutoria'] = int(registro['id_tutoria'])
            if registro['fecha']:
                registro['fecha'] = str(registro['fecha'])
            if registro['hora']:
                registro['hora'] = str(registro['hora'])
            registro['temas_abordados'] = str(registro['temas_abordados'] or '')
            registro['observaciones_rendimiento'] = str(registro['observaciones_rendimiento'] or '')
            registro['tareas_asignadas'] = str(registro['tareas_asignadas'] or '')
                
        return jsonify(historial), 200
    except Exception as e:
        print("FALLO CRÍTICO EN BITACORAS:", str(e))
        return jsonify([]), 200

@app.route('/asistencias_tutor', methods=['GET'])
@jwt_required()
def obtener_asistencias_tutor():
    try:
        cursor = db.cursor(dictionary=True)
        
        consulta = """
            SELECT c.id_tutoria, c.id_estudiante, c.asistio
            FROM control_asistencia c
            JOIN tutorias t ON c.id_tutoria = t.id_tutoria
            ORDER BY c.id_tutoria DESC
        """
        cursor.execute(consulta)
        historial = cursor.fetchall()
        
        for registro in historial:
            registro['id_tutoria'] = int(registro['id_tutoria'])
            registro['id_estudiante'] = int(registro['id_estudiante'])
            registro['asistio'] = str(registro['asistio'])
            
            try:
                cursor.execute("SELECT nombre FROM estudiantes WHERE id_estudiante = %s", (registro['id_estudiante'],))
                est = cursor.fetchone()
                if est:
                    registro['estudiante'] = est['nombre']
                else:
                    cursor.execute("SELECT nombre FROM estudiantes WHERE id_usuario = %s", (registro['id_estudiante'],))
                    est_alt = cursor.fetchone()
                    registro['estudiante'] = est_alt['nombre'] if est_alt else f"Estudiante {registro['id_estudiante']}"
            except:
                registro['estudiante'] = f"Estudiante {registro['id_estudiante']}"
                
            try:
                cursor.execute("SELECT id_solicitud FROM tutorias WHERE id_tutoria = %s", (registro['id_tutoria'],))
                tut = cursor.fetchone()
                if tut and tut['id_solicitud']:
                    cursor.execute("SELECT asignatura FROM solicitudes WHERE id_solicitud = %s", (tut['id_solicitud'],))
                    sol = cursor.fetchone()
                    registro['asignatura'] = sol['asignatura'] if sol else "Tutoría"
                else:
                    registro['asignatura'] = "Tutoría"
            except:
                registro['asignatura'] = "Tutoría"
                
        cursor.close()
        return jsonify(historial), 200
    except Exception as e:
        print("FALLO CRÍTICO EN ASISTENCIAS:", str(e))
        return jsonify([]), 200
    
if __name__ == '__main__':
    app.run(debug=True)