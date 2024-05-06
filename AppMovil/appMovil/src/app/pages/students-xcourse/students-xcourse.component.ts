import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectComponent } from "../../components/select/select.component";
import { ServiceService } from '../../services/service.service';

@Component({
    selector: 'app-students-xcourse',
    standalone: true,
    templateUrl: './students-xcourse.component.html',
    styleUrl: './students-xcourse.component.css',
    imports: [SelectComponent]
})
export class StudentsXCourseComponent {

  data: any[] = [];
  cursos: any[] = [];
  studentSelect:number=0;
  courseSelect:number=0;
  loaded: boolean = false;

  constructor(
    private router: Router,
    private service: ServiceService) {
  }

  ngOnInit(): void {
    this.obtenerEstudiantes();
    this.obtenerCursos();
  }
  obtenerCursos(): void {
    this.service.getCursos().subscribe(
      (cursos: any[]) => {
        this.cursos = cursos;
        this.loaded = true; // Marcar como cargado
      },
      (error) => {
        console.error('Error al obtener los cursos:', error);
      }
    );
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
  obtenerEstudianteSeleccionado(carnet:number): void {
    this.studentSelect=carnet
  }
  obtenerCursoSeleccionado(id:number): void {
    this.courseSelect=id
  }
  save() {
    console.log(this.studentSelect,this.courseSelect)
    this.service.createStudentMatri(this.studentSelect, this.courseSelect).subscribe((response) => {
      alert('Se ha agregado correctamente')

    });
    }
}
