import { Component } from '@angular/core';
import { TableInfoComponent } from '../../components/table-info/table-info.component';
import { ActivatedRoute, Router, RouterModule  } from '@angular/router';
import { switchMap } from 'rxjs';
import { SpotiappService } from '../../services/spotiapp.service';
import {
  Album,
  AlbumTrack,
  Artist,
  Track,
} from '../../interfaces/spotiapp.interface';

@Component({
  selector: 'app-album-page',
  standalone: true,
  templateUrl: './album-page.component.html',
  styleUrl: './album-page.component.css',
  imports: [TableInfoComponent, RouterModule],
})
export class AlbumPageComponent {
  public idPage: number = 3;

  //* este array es para mandarlo a la tabla y que se muestre la informacion
  public topSongs: Track[] = [];
  public artists: Artist[] = [];
  public album!: Album;
  public hasLoaded: boolean = false;
  constructor(
    private activedRoute: ActivatedRoute, //*Para obtener los parametros
    private router: Router, //*Sirve para redireccionar en caso de que la persona se equivoque para asi poder devolverse
    private spotiService: SpotiappService
  ) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      this.idPage = params['idPage'];
      this.getAlbum(params['idAlbum']);
    });
  }
  // todo se debe conseguir el nombre del artista, y el link e imagen por medio del idAlbum

  getAlbum(albumId: string): void {
    this.spotiService.getAlbumTracks(albumId).subscribe((albumTrackResponse) => {
      for (const track of albumTrackResponse.items) {
        this.spotiService.getTrack(track.id)
          .subscribe( track => {
            this.topSongs.push(track);

            this.spotiService.getAlbum(albumId).subscribe((album) => {
              this.album = album;
              this.artists = album.artists;
            });
        });
      }
    });
  }

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
  redirigirAUrl(url: string): void {
    window.open(url, '_blank');
  }
}
