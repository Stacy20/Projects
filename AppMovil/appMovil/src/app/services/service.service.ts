import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:5000'; // URL de tu servidor Express

  constructor(private http: HttpClient) { }

  getCursos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`)
      .pipe(
        tap(cursos => console.log('Cursos recibidos:')), // Optional: Log to console
        catchError(error => {
          console.error('Error al obtener cursos:', error);
          return throwError(error); // Re-throw the error for handling in the component
        })
      );
  }
  createCourse(name: string, description: string): Observable<any> {
    const url = `${this.apiUrl}/addCourse`;
    return this.http.post<any>(url, {
      name, description
    })

  }
  createStudentMatri(carnet: number, id_curso: number): Observable<any> {
    console.log(id_curso,carnet)
    const url = `${this.apiUrl}/matricularEstudiante`;
    return this.http.post<any>(url, {
       carnet,id_curso
    })

  }
  updateCourse(nombre: string, descripcion: string, id_curso: number): Observable<any> {
    const url = `${this.apiUrl}/updateCourse/${id_curso}`;
    console.log(nombre, descripcion,id_curso)
    return this.http.put<any>(url, {
      nombre, descripcion
    });
  }
  getCourse(id_curso: number): Observable<any> {
    const url = `${this.apiUrl}/getCourse/${id_curso}`;
    return this.http.get<any>(url);
  }
  getEstudiantes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estudiantes`)
      .pipe(
        tap(estudiantes => console.log('estudiantes recibidos:')), // Optional: Log to console
        catchError(error => {
          console.error('Error al obtener estudiantes:', error);
          return throwError(error); // Re-throw the error for handling in the component
        })
      );
  }
  createStudent(nombre: string, apellido: string, carnet: number, correo: string): Observable<any> {
    const url = `${this.apiUrl}/addEstudiante`;
    return this.http.post<any>(url, {
      nombre, apellido, carnet, correo
    })

  }
  updateStudent(nombre: string, apellido: string, carnet: number, correo: string): Observable<any> {
    const url = `${this.apiUrl}/updateEstudiante/${carnet}`;
    return this.http.put<any>(url, {
      nombre, apellido, correo
    });
  }
  getStudentByCarnet(carnet: number): Observable<any> {
    const url = `${this.apiUrl}/getEstudiante/${carnet}`;
    return this.http.get<any>(url);
  }

  getEstudiantesMatriculados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estudiantes-matriculados`)
      .pipe(
        tap(estudiantes => console.log('estudiantes recibidos:')), // Optional: Log to console
        catchError(error => {
          console.error('Error al obtener estudiantes:', error);
          return throwError(error); // Re-throw the error for handling in the component
        })
      );
  }
  updateMatricula(carnet: number, id_curso: number, id_matricula: number): Observable<any> {
    const url = `${this.apiUrl}/matriculaupdate/${id_matricula}`;
    console.log(carnet, id_curso,id_matricula)
    return this.http.put<any>(url, {
      carnet, id_curso
    });
  }
  getEstudiabteMa(id_matricula: number): Observable<any> {
    const url = `${this.apiUrl}/matricula/${id_matricula}`;
    return this.http.get<any>(url);
  }

  deleteStudent(carnet: number): Observable<any> {
    const url = `${this.apiUrl}/deleteEstudiante/${carnet}`;
    return this.http.delete<any>(url);
  }
  deleteCourse(id_course: number): Observable<any> {
    const url = `${this.apiUrl}/deleteCourse/${id_course}`;
    return this.http.delete<any>(url);
  }
  deleteStudentMatri(id_matricula: number): Observable<any> {
    const url = `${this.apiUrl}/deleteEstudianteMatriculado/${id_matricula}`;
    return this.http.delete<any>(url);
  }
}
