import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';


@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent {

  public nombre: string = '';
  public descripcion: string = '';
  public idCurso!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ServiceService) {
  }
  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.idCurso = parseInt(idParam);
        this.getData();
      } else {
        // Manejar el caso en el que el parámetro 'id' sea nulo
        console.error('El parámetro "id" es nulo.');
      }

    });
  }
  getData(): void {
    this.service.getCourse(this.idCurso).subscribe((service) => {
      this.nombre = service.nombre_curso;
      this.descripcion = service.descripcion;
    });
  }
  save() {
    if (!this.nombre ||this.nombre.trim().length<3 || !this.descripcion||this.descripcion.trim().length<5 ) {
      // this.sweetAlertService.showAlert('Error', 'Todos los campos son obligatorios', 'error');
      alert('Debe llenar todos los campos')
      return; // Detener el proceso si falta algún campo obligatorio
    }
    console.log(this.nombre, this.descripcion, this.idCurso)
    this.service.updateCourse(this.nombre, this.descripcion, this.idCurso).subscribe((response) => {
      alert('Se han guardado los cambios')
      this.router.navigateByUrl("courses");
    });
    }
}
