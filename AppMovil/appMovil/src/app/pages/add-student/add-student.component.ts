import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {
  public nombre: string = '';
  public apellido: string = '';
  public carnet: number = 0;
  public correo: string = ''

  constructor(
    private router: Router,
    private service: ServiceService) {
  }

  save() {
    if (!this.nombre ||this.nombre.trim().length<3 || !this.apellido||this.apellido.trim().length<5 ) {
      // this.sweetAlertService.showAlert('Error', 'Todos los campos son obligatorios', 'error');
      alert('Debe llenar todos los campos')
      return; // Detener el proceso si falta algún campo obligatorio
    }
    this.service.createStudent(this.nombre, this.apellido,this.carnet,this.correo).subscribe((response) => {
      alert('Se ha agregado correctamente')
      this.nombre=''
      this.apellido=''
      this.carnet=0
      this.correo=''
    });
    }
}
