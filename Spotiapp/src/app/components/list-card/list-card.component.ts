import { Component, Input } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { Album, Track } from '../../interfaces/spotiapp.interface';

@Component({
    selector: 'component-list-card',
    standalone: true,
    templateUrl: './list-card.component.html',
    styleUrl: './list-card.component.css',
    imports: [CardComponent]
})
export class ListCardComponent {

//  @Input()
//   public songs:Song[]=[];
//*data son las canciones a mostrar
  @Input()
  public data: Track[] | null = null;
  @Input()
  public albumes:Album[]=[];

  @Input()
  public typeCard!: number;

  @Input()
  public idPage!:number;

}
