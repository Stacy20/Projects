import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'shared-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './select.component.html',
  styles: ``
})
export class SelectComponent {
  @Input()
  public listOption:string[]=['Por Artista', 'Por canción']
  @Input()
  public value!: number;
  @Output()
  public idSelect:EventEmitter<number>= new EventEmitter();

  onSelectChange(event: any) {
    const selectedIndex = event.target.value;
    console.log('a ver a ver', selectedIndex);
    // Haz algo con el índice seleccionado, por ejemplo, llamar a una función
    this.idSelect.emit(selectedIndex);
  }
}
