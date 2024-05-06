import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataTablesModule } from "angular-datatables";
import { ServiceService } from '../../services/service.service';
@Component({
  selector: 'app-students',
  standalone: true,
  imports: [DataTablesModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {

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
    this.service.getEstudiantes().subscribe(
      (estudiantes: any[]) => {
        this.data = estudiantes;
        this.loaded = true; // Marcar como cargado
      },
      (error) => {
        console.error('Error al obtener los estudiantes:', error);
      }
    );
  }
pageAddStudent(): void {
  this.router.navigateByUrl("addStudent");
}
pageEditStudent(carnet:number) {
  this.router.navigateByUrl("updateStudent/"+carnet);
}
deleteStudent(carnet: number): void {
  this.service.deleteStudent(carnet).subscribe(
    () => {
      // Manejar la respuesta exitosa del servidor
      console.log('Estudiante eliminado exitosamente.');
      // Aquí puedes realizar cualquier acción adicional después de eliminar al estudiante
    },
    (error) => {
      // Manejar el error en caso de que ocurra
      console.error('Error al eliminar estudiante:', error);
      // Aquí puedes mostrar un mensaje de error o realizar cualquier otra acción de manejo de errores
    }
  );
}
}
