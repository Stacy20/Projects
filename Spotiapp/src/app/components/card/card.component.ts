import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LazyImageComponent } from "../../shared/components/lazy-image/lazy-image.component";
import { Router, RouterModule } from '@angular/router';
import { Artist } from '../../interfaces/spotiapp.interface';

@Component({
    selector: 'song-card',
    standalone: true,
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
    imports: [CommonModule, LazyImageComponent, RouterModule]
})
export class CardComponent {

  constructor(
    // private activedRoute: ActivatedRoute, //*Para obtener los parametros
    private router: Router, //*Sirve para redireccionar en caso de que la persona se equivoque para asi poder devolverse
    // private countriesService: CountriesService //*Llamar al servio igual que al siempre
  ){}

// todo: Aqui realmente va la cancion tipo song, ya luego en el html se le saca los elementos necesario
//Se pondria song!: Song;
  @Input()
  public url!: string;

  @Input()
  public alt: string='';

  @Input()
  public title: string='';

  @Input()
  public typeCard!:number;

  @Input()
  public idAlbum!:string;
  //*La entrada del audio
  @Input() audioSrc: string = 'assets/images/song.mp3'; // Propiedad para la ruta del archivo de audio

//Esto es para el nombre de los artistas que componen la cancion y id
  @Input()
  public listArtist: Artist[] = []
  // public ListArtist:string[]=['Adele']

  @Input()
  public idPage!:number;

  public pageAlbum():void{
    console.log(this.idPage)
    this.router.navigateByUrl(`/albumArtist/${this.idPage}/${this.idAlbum}`);
  }

}
