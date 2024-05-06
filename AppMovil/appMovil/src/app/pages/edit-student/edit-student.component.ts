import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent {
  public nombre: string = '';
  public apellido: string = '';
  public carnet: number = 0;
  public correo: string = ''

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ServiceService) {
  }
  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('carnet');
      if (idParam !== null) {
        this.carnet = parseInt(idParam);
        this.getData();
      } else {
        // Manejar el caso en el que el parámetro 'id' sea nulo
        console.error('El parámetro "carnet" es nulo.');
      }

    });
  }
  getData(): void {
    this.service.getStudentByCarnet(this.carnet).subscribe((service) => {
      this.nombre = service.nombre;
      this.apellido = service.apellido;
      this.correo=service.correo;
    });
  }
  save() {
    if (!this.nombre ||this.nombre.trim().length<3 || !this.apellido||this.apellido.trim().length<5 ) {
      // this.sweetAlertService.showAlert('Error', 'Todos los campos son obligatorios', 'error');
      alert('Debe llenar todos los campos')
      return; // Detener el proceso si falta algún campo obligatorio
    }
    this.service.updateStudent(this.nombre, this.apellido,this.carnet,this.correo).subscribe((response) => {
      alert('Se han guardado los cambios')
      this.router.navigateByUrl("students");
    });
    }
  }
