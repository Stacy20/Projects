import { Component } from '@angular/core';
import { DataTablesModule } from "angular-datatables";
import { RouterModule } from '@angular/router';
import { Router, RouterOutlet } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [DataTablesModule, RouterModule,HttpClientModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  data: any[] = [];
  loaded: boolean = false;

  constructor(
    private router: Router,
    private service: ServiceService) {
  }

  ngOnInit(): void {
    this.obtenerCursos();
  }
  deleteCourses(id_course: number): void {
    this.service.deleteCourse(id_course).subscribe(
      () => {
        // Manejar la respuesta exitosa del servidor
        console.log('Curso eliminado exitosamente.');
        // Aquí puedes realizar cualquier acción adicional después de eliminar al estudiante
      },
      (error) => {
        // Manejar el error en caso de que ocurra
        console.error('Error al eliminar Curso:', error);
        // Aquí puedes mostrar un mensaje de error o realizar cualquier otra acción de manejo de errores
      }
    );
  }
  obtenerCursos(): void {
    this.service.getCursos().subscribe(
      (cursos: any[]) => {
        this.data = cursos;
        this.loaded = true; // Marcar como cargado
      },
      (error) => {
        console.error('Error al obtener los cursos:', error);
      }
    );
  }
  pageEditCourse(id:number) {
    this.router.navigateByUrl("updateCourse/"+id);
    }
  pageAddCourse(): void {
    this.router.navigateByUrl("addCourse");
  }
}
