import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectComponent } from '../../components/select/select.component';

@Component({
  selector: 'app-edit-matricula',
  standalone: true,
  imports: [SelectComponent],
  templateUrl: './edit-matricula.component.html',
  styleUrl: './edit-matricula.component.css'
})
export class EditMatriculaComponent {

  data: any[] = [];
  cursos: any[] = [];
  studentSelect:number=0;
  courseSelect:number=0;
  loaded: boolean = false;
  public id_matricula!: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ServiceService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id_matricula');
      if (idParam !== null) {
        this.id_matricula = parseInt(idParam);
        this.obtenerEstudiantes();
        this.obtenerCursos();
        this.getData()
      } else {
        // Manejar el caso en el que el parámetro 'id' sea nulo
        console.error('El parámetro "id" es nulo.');
      }

    });

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
  getData(): void {
    this.service.getEstudiabteMa(this.id_matricula).subscribe((service) => {
      this.courseSelect = service.id_curso;
      this.studentSelect = service.id_estudiante;
      console.log(this.studentSelect,this.courseSelect)
    });
  }
  obtenerEstudianteSeleccionado(carnet:number): void {
    this.studentSelect=carnet
  }
  obtenerCursoSeleccionado(id:number): void {
    this.courseSelect=id
  }
  save() {
    console.log(this.studentSelect,this.courseSelect)
    this.service.updateMatricula(this.studentSelect, this.courseSelect, this.id_matricula).subscribe((response) => {
      alert('Se ha agregado correctamente')

    });
    }
}
