import mysql2 from 'mysql2';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Importa cors como un módulo ES

const connection = mysql2.createConnection({
    host: "34.87.16.94",
    database: "gestionAcademica",
    user: "root",
    password: "2021022405"
});

const app = express();
const PORT = 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    try {
        const sql_query = `SELECT * FROM Cursos`;
        connection.query(sql_query, (err, result) => {
            if (err) {
                throw err;
            }
            res.send(result);
        });
    } catch (error) {
        console.error('Error al obtener cursos:', error);
        res.status(500).send('Error interno del servidor');
    }
});
// Ruta para manejar la solicitud POST para crear un nuevo curso
app.post('/addCourse', (req, res) => {
    const { name, description } = req.body;

    // Verificar si los datos requeridos están presentes en el cuerpo de la solicitud
    if (!name || !description) {
        return res.status(400).json({ message: 'Se requiere un nombre y una descripción para crear un curso.' });
    }

    // Crear la consulta SQL para insertar un nuevo curso en la base de datos
    const sql_query = 'INSERT INTO Cursos (nombre_curso, descripcion) VALUES (?, ?)';
    connection.query(sql_query, [name, description], (err, result) => {
        if (err) {
            console.error('Error al insertar el curso en la base de datos:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        res.status(201).json({ message: 'Curso creado exitosamente.' });
    });
});

// Endpoint para actualizar un curso por su id_curso
app.put('/updateCourse/:id_curso', (req, res) => {
    const { nombre, descripcion } = req.body;
    const id_curso = req.params.id_curso;
    const idCurso = parseInt(id_curso);
    console.log(nombre, descripcion, id_curso)
    // Verificar si los datos requeridos están presentes en el cuerpo de la solicitud
    if (!nombre || !descripcion) {
        return res.status(400).json({ message: 'Se requiere un nombre y una descripción para actualizar el curso.' });
    }

    // Crear la consulta SQL para actualizar un curso en la base de datos
    const sql_query = 'UPDATE Cursos SET nombre_curso=?, descripcion=? WHERE id_curso=?';
    connection.query(sql_query, [nombre, descripcion, idCurso], (err, result) => {
        if (err) {
            console.error('Error al actualizar el curso en la base de datos:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No se encontró ningún curso con ese ID.' });
        }
        res.status(200).json({ message: 'Curso actualizado exitosamente.' });
    });
});

// Endpoint para obtener un curso por su id_curso
app.get('/getCourse/:id_curso', (req, res) => {
    const id_curso = req.params.id_curso;
    const idCurso = parseInt(id_curso);
    // Crear la consulta SQL para obtener un curso por su id_curso
    const sql_query = 'SELECT * FROM Cursos WHERE id_curso=?';
    connection.query(sql_query, [idCurso], (err, result) => {
        if (err) {
            console.error('Error al obtener el curso de la base de datos:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontró ningún curso con ese ID.' });
        }
        res.status(200).json(result[0]); // Devolver solo el primer curso encontrado (asumiendo que el id_curso es único)
    });
});

app.delete('/deleteCourse/:id_curso', (req, res) => {
    
    const idCurso = parseInt(req.params.id_curso);
    // Crear la consulta SQL para eliminar el curso de la tabla Cursos
    const deleteCursoQuery = 'DELETE FROM Cursos WHERE id_curso = ?';
    // Crear la consulta SQL para eliminar cualquier entrada en la tabla Estudiantes_Matriculados asociada a ese curso
    const deleteEstudiantesMatriculadosQuery = 'DELETE FROM Estudiantes_Matriculados WHERE id_curso = ?';

    connection.beginTransaction((err) => {
        if (err) {
            console.error('Error al iniciar la transacción:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }

        connection.query(deleteEstudiantesMatriculadosQuery, [idCurso], (err, result) => {
            if (err) {
                return connection.rollback(() => {
                    console.error('Error al eliminar datos de Estudiantes_Matriculados:', err);
                    res.status(500).json({ message: 'Error interno del servidor' });
                });
            }

            connection.query(deleteCursoQuery, [idCurso], (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        console.error('Error al eliminar curso:', err);
                        res.status(500).json({ message: 'Error interno del servidor' });
                    });
                }

                connection.commit((err) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error('Error al realizar commit:', err);
                            res.status(500).json({ message: 'Error interno del servidor' });
                        });
                    }
                    console.log('Curso eliminado exitosamente.');
                    res.status(200).json({ message: 'Curso eliminado exitosamente.' });
                });
            });
        });
    });
});


app.get("/estudiantes", async (req, res) => {
    try {
        const sql_query = `SELECT * FROM Estudiantes`;
        connection.query(sql_query, (err, result) => {
            if (err) {
                throw err;
            }
            res.send(result);
        });
    } catch (error) {
        console.error('Error al obtener estudiantes:', error);
        res.status(500).send('Error interno del servidor');
    }
});
app.post('/addEstudiante', (req, res) => {
    const { nombre, apellido, carnet, correo } = req.body;
    // Verificar si los datos requeridos están presentes en el cuerpo de la solicitud
    if (!nombre || !apellido || !carnet || !correo) {
        return res.status(400).json({ message: 'Se requiere un nombre, un apellido, un carnet y un correo para este estudiante.' });
    }
    const carnetNumber = parseInt(carnet);
    // Crear la consulta SQL para insertar un nuevo curso en la base de datos
    const sql_query = 'INSERT INTO Estudiantes (carnet, nombre,apellido,correo) VALUES (?, ?, ?, ?)';
    connection.query(sql_query, [carnetNumber, nombre, apellido, correo], (err, result) => {
        if (err) {
            console.error('Error al insertar el estudiante en la base de datos:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        res.status(201).json({ message: 'Estudiante creado exitosamente.' });
    });
});

// Endpoint para actualizar un estudiante por su carnet
app.put('/updateEstudiante/:carnet', (req, res) => {
    const { nombre, apellido, correo } = req.body;
    const carnet = req.params.carnet;
    const carnetNumber = parseInt(carnet);
    // Verificar si los datos requeridos están presentes en el cuerpo de la solicitud
    if (!nombre || !apellido || !correo) {
        return res.status(400).json({ message: 'Se requiere un nombre, un apellido y un correo para actualizar al estudiante.' });
    }

    // Crear la consulta SQL para actualizar un estudiante en la base de datos
    const sql_query = 'UPDATE Estudiantes SET nombre=?, apellido=?, correo=? WHERE carnet=?';
    connection.query(sql_query, [nombre, apellido, correo, carnetNumber], (err, result) => {
        if (err) {
            console.error('Error al actualizar el estudiante en la base de datos:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No se encontró ningún estudiante con ese carnet.' });
        }
        res.status(200).json({ message: 'Estudiante actualizado exitosamente.' });
    });
});

// Endpoint para obtener un estudiante por su carnet
app.get('/getEstudiante/:carnet', (req, res) => {
    const carnet = req.params.carnet;
    const carnetNumber = parseInt(carnet);
    // Crear la consulta SQL para obtener un estudiante por su carnet
    const sql_query = 'SELECT * FROM Estudiantes WHERE carnet=?';
    connection.query(sql_query, [carnetNumber], (err, result) => {
        if (err) {
            console.error('Error al obtener el estudiante de la base de datos:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontró ningún estudiante con ese carnet.' });
        }
        res.status(200).json(result[0]); // Devolver solo el primer estudiante encontrado (asumiendo que el carnet es único)
    });
});

app.delete('/deleteEstudiante/:carnet', (req, res) => {
    const carnet = req.params.carnet;
    const carnetNumber = parseInt(carnet);

    // Crear la consulta SQL para eliminar al estudiante de la tabla Estudiantes
    const deleteEstudianteQuery = 'DELETE FROM Estudiantes WHERE carnet = ?';
    // Crear la consulta SQL para eliminar cualquier entrada en la tabla Estudiantes_Matriculados asociada a ese estudiante
    const deleteEstudianteMatriculadoQuery = 'DELETE FROM Estudiantes_Matriculados WHERE id_estudiante IN (SELECT id_estudiante FROM Estudiantes WHERE carnet = ?)';

    connection.beginTransaction((err) => {
        if (err) {
            console.error('Error al iniciar la transacción:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }

        connection.query(deleteEstudianteMatriculadoQuery, [carnetNumber], (err, result) => {
            if (err) {
                return connection.rollback(() => {
                    console.error('Error al eliminar datos de Estudiantes_Matriculados:', err);
                    res.status(500).json({ message: 'Error interno del servidor' });
                });
            }

            connection.query(deleteEstudianteQuery, [carnetNumber], (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        console.error('Error al eliminar estudiante:', err);
                        res.status(500).json({ message: 'Error interno del servidor' });
                    });
                }

                connection.commit((err) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error('Error al realizar commit:', err);
                            res.status(500).json({ message: 'Error interno del servidor' });
                        });
                    }
                    console.log('Estudiante eliminado exitosamente.');
                    res.status(200).json({ message: 'Estudiante eliminado exitosamente.' });
                });
            });
        });
    });
});


app.get("/estudiantes-matriculados", async (req, res) => {
    try {
        const sql_query = `
            SELECT EM.id_matricula, CONCAT(E.nombre, ' ', E.apellido) AS nombre_estudiante, E.carnet, C.nombre_curso AS nombre_curso,C.id_curso
            FROM Estudiantes_Matriculados EM
            JOIN Estudiantes E ON EM.id_estudiante = E.id_estudiante
            JOIN Cursos C ON EM.id_curso = C.id_curso
        `;
        connection.query(sql_query, (err, result) => {
            if (err) {
                throw err;
            }
            res.send(result);
        });
    } catch (error) {
        console.error('Error al obtener estudiantes matriculados:', error);
        res.status(500).send('Error interno del servidor');
    }
});
app.post('/matricularEstudiante', (req, res) => {
    const { carnet, id_curso } = req.body;
    
    // Verificar si los datos requeridos están presentes en el cuerpo de la solicitud
    if (!carnet || !id_curso) {
        return res.status(400).json({ message: 'Se requiere el carnet del estudiante y el ID del curso para matricular al estudiante.' });
    }
    const id_estudiante = parseInt(carnet);
    const idCurso = parseInt(id_curso);
    // Buscar al estudiante por su carnet y obtener su ID

    // Insertar el nuevo registro en la tabla Estudiantes_Matriculados
    const sql_query = 'INSERT INTO Estudiantes_Matriculados (id_estudiante, id_curso) VALUES (?, ?)';
    connection.query(sql_query, [id_estudiante, idCurso], (err, result) => {
        if (err) {
            console.error('Error al insertar la matrícula en la base de datos:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        res.status(201).json({ message: 'Estudiante matriculado exitosamente.' });
    });
});
// Obtener información de una matrícula por su id_matricula
app.get('/matricula/:id_matricula', (req, res) => {
    const id_matricula = req.params.id_matricula;

    // Realizar la consulta SQL para obtener la información de la matrícula por su id_matricula
    const sql_query = 'SELECT * FROM Estudiantes_Matriculados WHERE id_matricula = ?';
    connection.query(sql_query, [id_matricula], (err, results) => {
        if (err) {
            console.error('Error al obtener la información de la matrícula:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        // Verificar si se encontraron resultados
        if (results.length === 0) {
            return res.status(404).json({ message: 'No se encontró la matrícula con el id_matricula proporcionado.' });
        }
        // Devolver los resultados encontrados
        res.status(200).json(results[0]);
    });
});

// Actualizar información de una matrícula por su id_matricula
app.put('/matriculaupdate/:id_matricula', (req, res) => {
    const id_matricula = req.params.id_matricula;
    const { carnet, id_curso } = req.body;
    console.log(carnet, id_curso)
    // Verificar si los datos requeridos están presentes en el cuerpo de la solicitud
    if (!carnet || !id_curso) {
        return res.status(400).json({ message: 'Se requiere el carnet del estudiante y el ID del curso para actualizar la matrícula.' });
    }

    const id_estudiante = parseInt(carnet);
    const idCurso = parseInt(id_curso);

    // Actualizar el registro en la tabla Estudiantes_Matriculados
    const sql_query = 'UPDATE Estudiantes_Matriculados SET id_estudiante = ?, id_curso = ? WHERE id_matricula = ?';
    connection.query(sql_query, [id_estudiante, idCurso, id_matricula], (err, result) => {
        if (err) {
            console.error('Error al actualizar la matrícula en la base de datos:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        // Verificar si se actualizó alguna fila
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No se encontró la matrícula con el id_matricula proporcionado.' });
        }
        res.status(200).json({ message: 'Matrícula actualizada exitosamente.' });
    });
});

app.delete('/deleteEstudianteMatriculado/:id_matricula', (req, res) => {
    const idMatricula = req.params.id_matricula;

    // Crear la consulta SQL para eliminar la entrada de Estudiantes_Matriculados
    const deleteEstudianteMatriculadoQuery = 'DELETE FROM Estudiantes_Matriculados WHERE id_matricula = ?';

    connection.query(deleteEstudianteMatriculadoQuery, [idMatricula], (err, result) => {
        if (err) {
            console.error('Error al eliminar entrada de Estudiantes_Matriculados:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }

        if (result.affectedRows === 0) {
            // Si no se encontró ninguna entrada con el id_matricula proporcionado
            return res.status(404).json({ message: 'No se encontró ninguna entrada con ese ID de matrícula.' });
        }

        console.log('Entrada de Estudiantes_Matriculados eliminada exitosamente.');
        res.status(200).json({ message: 'Entrada de Estudiantes_Matriculados eliminada exitosamente.' });
    });
});


// Definir la función main con async/await
const main = async () => {
    console.log(`SERVER: http://localhost:${PORT}`);
    try {
        await new Promise((resolve, reject) => {
            connection.connect((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        app.listen(PORT, () => {
            console.log("Base de datos conectada y servidor corriendo");
        });
        app.on('close', () => {
            connection.end((err) => {
                if (err) {
                    console.error('Error al cerrar la conexión con la base de datos:', err);
                } else {
                    console.log('Conexión con la base de datos cerrada');
                }
            });
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
};

// Llamar a la función main para iniciar el servidor
main();