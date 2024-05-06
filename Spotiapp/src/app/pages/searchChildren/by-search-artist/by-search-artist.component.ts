import { Component, Input } from '@angular/core';
import { ListCardComponent } from "../../../components/list-card/list-card.component";
import { ActivatedRoute } from '@angular/router';
import { SpotiappService } from '../../../services/spotiapp.service';
import { Album, Track } from '../../../interfaces/spotiapp.interface';

@Component({
    selector: 'app-by-search-artist',
    standalone: true,
    templateUrl: './by-search-artist.component.html',
    styleUrl: './by-search-artist.component.css',
    imports: [ListCardComponent]
})
export class BySearchArtistComponent {
  //todo: se debe cambiar el tipo por el album
  //* Son todos los albumes que tiene el artista y que se tiene que mostrar
  public albumes: Album[]=[];
  public flag:boolean=true;
  public term:string='';
  //*artist es como el termino a buscar
  @Input()
  public artist:string='';

  //todo: hacer el constructor para traer la info
  //todo: hacer metodo para buscar los albumes del artista
  constructor(
    private activedRoute: ActivatedRoute,
    private spotiService: SpotiappService) {
  }

  //constructor(private route: ActivatedRoute){}

  ngOnInit(): void {

    this.activedRoute.params
    .subscribe(params => {
      console.log(params['name'])
      this.term=params['name']
      // this.searchArtistAlbums(params['name']);
      this.spotiService.searchArtist(params['name'])
      .subscribe( artistResponse => {
        if(artistResponse.artists.items.length===0){
          this.flag=false;
          this.spotiService.eraseLast(params['name']);
        }else{
          this.flag = true;
        }
        this.spotiService.getArtistAlbums(artistResponse.artists.items[0].id)
        .subscribe( albumsResponse => {
          this.albumes = albumsResponse.items;
        });
      });
    });
  }

}
