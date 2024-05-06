import { Component, Input } from '@angular/core';
import { ListCardComponent } from "../../../components/list-card/list-card.component";
import { Track } from '../../../interfaces/spotiapp.interface';
import { SpotiappService } from '../../../services/spotiapp.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-by-search-song',
    standalone: true,
    templateUrl: './by-search-song.component.html',
    styleUrl: './by-search-song.component.css',
    imports: [ListCardComponent]
})
export class BySearchSongComponent {
  //* Son todos las canciones que tiene el artista y que se tiene que mostrar
  public songs: Track[]=[];
  public flag:boolean=true;
  public term:string='';
  //*song es como el termino a buscar
  @Input()
  public nameSong:string='';
  constructor(
    private activedRoute: ActivatedRoute,
    private spotiService: SpotiappService) {
  }
  ngOnInit():void{
    this.activedRoute.params
    .subscribe(params => {
      console.log(params['name'])

      this.term=params['name']
      this.searchTrackByName(params['name']);
    });
  }
  searchTrackByName( trackName: string ): void{
    this.spotiService.searchTrack(trackName)
      .subscribe( trackResponse => {
        if(trackResponse.tracks.items.length===0){
          this.flag=false;
          this.spotiService.eraseLast(trackName);
        }else{
          this.flag=true;
        }
        this.songs = trackResponse.tracks.items;
      });
  }

}
