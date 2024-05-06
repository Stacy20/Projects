import { Component } from '@angular/core';
import { DataTablesModule } from "angular-datatables";
import { RouterModule } from '@angular/router';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../services/service.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DataTablesModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  data: any[] = [];
  loaded: boolean = false;

  constructor(
    private router: Router,
    private service: ServiceService) {
  }

  ngOnInit(): void {
    this.obtenerEstudiantes();
  }

  obtenerEstudiantes(): void {
    this.service.getEstudiantesMatriculados().subscribe(
      (estudiantes: any[]) => {
        this.data = estudiantes;
        this.loaded = true; // Marcar como cargado
      },
      (error) => {
        console.error('Error al obtener los estudiantes:', error);
      }
    );
  }
pageStudents(): void{
  this.router.navigateByUrl("students");
}
pageCourses(): void{
  this.router.navigateByUrl("courses");
}
pageStudentsxCourses(): void{
  this.router.navigateByUrl("studentsxcourses");
}
pageModificarMatricula(idMatricula:number): void{
  this.router.navigateByUrl("updateMatricula/"+idMatricula);
}

deleteStudentMatri(id_matricula: number): void {
  this.service.deleteStudentMatri(id_matricula).subscribe(
    () => {
      // Manejar la respuesta exitosa del servidor
      console.log('matricula eliminada exitosamente.');
      // Aquí puedes realizar cualquier acción adicional después de eliminar al estudiante
    },
    (error) => {
      // Manejar el error en caso de que ocurra
      console.error('Error al eliminar matricula:', error);
      // Aquí puedes mostrar un mensaje de error o realizar cualquier otra acción de manejo de errores
    }
  );
}
}
