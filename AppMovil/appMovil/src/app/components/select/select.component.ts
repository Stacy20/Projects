import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  filteredList: any[] = []; // Lista filtrada de opciones
  searchTerm: string = '';
  @Input()
  public list: any[]=[];
  @Input()
  public type!: number;

  @Input()
  public selectedId!: any;
  // @Output()
  // public option: number=0;
  ngOnInit(): void {
    this.filterOptions();
    console.log(this.selectedId)

  }
  @Output()
  public option:EventEmitter<number>= new EventEmitter();

  filterOptions() {
    console.log(this.list, this.selectedId)
    if (this.searchTerm!='') {
      // Aplica el filtro a la lista original utilizando el texto de búsqueda
      this.filteredList = this.list.filter(option => {
        const fullName = option.carnet+' '+option.nombre.toLowerCase() + ' ' + option.apellido.toLowerCase();
        return fullName.includes(this.searchTerm.toLowerCase());
      });
      console.log(this.filteredList)
    } else {
      // Si el texto de búsqueda está vacío, muestra la lista original
      this.filteredList = this.list;
      console.log(this.filteredList)
    }
  }
  filterOptionsCourses() {
    console.log(this.list)
    if (this.searchTerm!='') {
      // Aplica el filtro a la lista original utilizando el texto de búsqueda
      this.filteredList = this.list.filter(option => {
        const fullName = option.id_curso+' '+option.nombre_curso.toLowerCase();
        return fullName.includes(this.searchTerm.toLowerCase());
      });
      console.log(this.filteredList)
    } else {
      // Si el texto de búsqueda está vacío, muestra la lista original
      this.filteredList = this.list;
      console.log(this.filteredList)
    }
  }
  onSelectChange(event: any) {
    const idOption = event.target.value;
    this.selectedId = event.target.value;
    // Haz algo con el índice seleccionado, por ejemplo, llamar a una función
      this.option.emit(idOption);

  }

}
