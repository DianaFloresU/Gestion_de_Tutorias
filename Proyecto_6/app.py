from flask import Flask, jsonify, request, render_template
from flask_mysqldb import MySQL
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta

app = Flask(__name__)

# Configuración de la Base de Datos
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'       
app.config['MYSQL_PASSWORD'] = ''      
app.config['MYSQL_DB'] = 'gestionTutorias'

# Configuración de JWT
app.config['JWT_SECRET_KEY'] = '12345'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=2)

mysql = MySQL(app)
jwt = JWTManager(app)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    # Contraseña fija 123
    if password != '123':
        return jsonify({"msg": "Contraseña incorrecta"}), 401
    if not email:
        return jsonify({"msg": "El correo es obligatorio"}), 400

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT nombre, apellido FROM Estudiantes WHERE email = %s", (email,))
    estudiante = cursor.fetchone()

    if estudiante:
        cursor.close()
        nombre_completo = f"{estudiante[0]} {estudiante[1]}"
        access_token = create_access_token(identity=email)
        return jsonify({
            "access_token": access_token,
            "rol": "estudiante",
            "nombre": nombre_completo
        }), 200

    cursor.execute("SELECT nombre, apellido FROM Tutores WHERE email = %s", (email,))
    tutor = cursor.fetchone()
    cursor.close()

    if tutor:
        nombre_completo = f"{tutor[0]} {tutor[1]}"
        access_token = create_access_token(identity=email)
        return jsonify({
            "access_token": access_token,
            "rol": "tutor",
            "nombre": nombre_completo
        }), 200

    return jsonify({"msg": "El correo no está registrado en el sistema"}), 404

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
        SELECT t.id_tutoria, s.asignatura, t.fecha_hora, t.aula_o_link, t.estado_tutoria 
        FROM tutorias t
        INNER JOIN solicitudes s ON t.id_solicitud = s.id_solicitud
        WHERE s.id_estudiante = %s
    """
    cur.execute(sql, (id_estudiante,))
    columnas = ['id_tutoria', 'asignatura', 'fecha_hora', 'aula_o_link', 'estado_tutoria']
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

# Dashboard tutor
@app.route('/dashboard_tutor', methods=['GET'])
def dashboard_tutor():
    return render_template("dashboard_tutor.html")
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
    cur.execute("INSERT INTO Solicitudes (id_estudiante, asignatura, descripcion_problema, fecha_solicitud, estado) VALUES (%s, %s, %s, %s, %s)",
                (data['id_estudiante'], data['asignatura'], data['descripcion_problema'], data['fecha_solicitud'], data['estado']))
    mysql.connection.commit()
    cur.close()
    return jsonify({"msg": "Solicitud agregada"}), 201

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
    return jsonify({"msg": "Solicitud modificada"}), 200

# Endpoint para eliminar solicitud, requiere autenticación JWT

@app.route('/eliminar_solicitud/<int:id>', methods=['DELETE'])
@jwt_required()
def eliminar_solicitud(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM Solicitudes WHERE id_solicitud = %s", (id,))
    mysql.connection.commit()
    cur.close()
    return jsonify({"msg": "Solicitud eliminada"}), 200

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
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')
    
    if not fecha_inicio or not fecha_fin:
        return jsonify({"msg": "Debe proporcionar fecha_inicio y fecha_fin en formato YYYY-MM-DD"}), 400
    
    cursor = mysql.connection.cursor()
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
        ORDER BY t.fecha_hora DESC """,
    (fecha_inicio, fecha_fin))
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
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True)