import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {

  public nombre: string = '';
  public descripcion: string = '';

  constructor(
    private router: Router,
    private service: ServiceService) {
  }

  save() {
    if (!this.nombre ||this.nombre.trim().length<3 || !this.descripcion||this.descripcion.trim().length<5 ) {
      // this.sweetAlertService.showAlert('Error', 'Todos los campos son obligatorios', 'error');
      alert('Debe llenar todos los campos')
      return; // Detener el proceso si falta algún campo obligatorio
    }
    this.service.createCourse(this.nombre, this.descripcion).subscribe((response) => {
      alert('Se ha agregado correctamente')
      this.nombre='';
      this.descripcion='';
    });
    }
}
