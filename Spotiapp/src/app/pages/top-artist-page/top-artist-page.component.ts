import { Component, Input } from '@angular/core';
import { TableInfoComponent } from "../../components/table-info/table-info.component";
import { ActivatedRoute, Router } from '@angular/router';
import { SpotiappService } from '../../services/spotiapp.service';
import { Artist, Track } from '../../interfaces/spotiapp.interface';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-top-artist-page',
    standalone: true,
    templateUrl: './top-artist-page.component.html',
    styleUrl: './top-artist-page.component.css',
    imports: [TableInfoComponent]
})
export class TopArtistPageComponent {
  //todo: se debe cambiar el tipo por song
  public topSongs:Track[]=[];
  public idPage:number=3;
  public artista!: Artist;
//* Sirve para saber si ya la imagen cargo o no
public hasLoaded: boolean = false;
  constructor(
    private activedRoute: ActivatedRoute, //*Para obtener los parametros
    private router: Router, //*Sirve para redireccionar en caso de que la persona se equivoque para asi poder devolverse
    private spotiService: SpotiappService
    ){}


  // todo se sebe descomentar lo de abajo y poner en el constructor el servicio
  ngOnInit(): void {

    this.activedRoute.params
    .subscribe(params => {
      // this.idArtist=params['idArtist']
      this.idPage=params['idPage']
      // this.getArtistTopTracks(params['idArtist']);
      // this.getArtist(params['idArtist'])
      this.getArtistInfo(params['idArtist']);
    });
  }

  getArtistInfo( artistId: string ): void{
    this.spotiService.getArtistTopTracks(artistId)
      .subscribe( trackResponse => {
        this.topSongs = trackResponse.tracks;
        console.log("this.topSongs", this.topSongs);

        this.spotiService.getArtist(artistId)
        .subscribe( trackResponse => {
          this.artista = trackResponse;
        });
      });
  }

  getArtistTopTracks( artistId: string ): void{
    console.log(artistId)
    this.spotiService.getArtistTopTracks(artistId)
      .subscribe( trackResponse => {
        this.topSongs = trackResponse.tracks;
        console.log(this.topSongs)
      });
  }

  getArtist( artistId: string ): void{
    console.log(artistId)
    this.spotiService.getArtist(artistId)
      .subscribe( trackResponse => {
        this.artista = trackResponse;
      });
  }
  redirigirAUrl(url: string): void {
    window.open(url, '_blank');
  }
  //! El backPage no  va funcionar por que el ngOnInit esta documentado entonces no va donde se quiere
  public backPage():void{
     window.history.back();
    // const idPageNumber = Number(this.idPage);
    // switch (idPageNumber) {
    //   case 0:
    //   case 1:
    //     this.router.navigateByUrl(this.spotiService.tagsHistory[0]);
    //     break;
    //   default:
    //     this.router.navigateByUrl('/home');
    //     // Código a ejecutar si la variable no coincide con ninguno de los casos anteriores
    //     break;
    // }
  }

  onLoad():void{
    this.hasLoaded = true;
  }
}
