import { Component } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { ListCardComponent } from "../../components/list-card/list-card.component";
import { Album, AlbumTrack, Track } from '../../interfaces/spotiapp.interface';
import { SpotiappService } from '../../services/spotiapp.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CardComponent, SidebarComponent, ListCardComponent]
})
export class HomeComponent {
  public songs: Track[] = [];
  public albumReleases: Album[] = [];
  public albumTracks: AlbumTrack[] = [];

  constructor(private spotiService: SpotiappService) {}

  ngOnInit():void{
    this.get20Releases();
  }

  get20Releases():void{
    this.spotiService.getAlbumReleases()
      .subscribe( trackResponse => {
        this.albumReleases = trackResponse.albums.items;
        for (const album of this.albumReleases) {
          this.spotiService.getAlbumTracks(album.id)
          .subscribe( trackResponse => {
            this.albumTracks = trackResponse.items;
            this.spotiService.getTrack(this.albumTracks[0].id)
            .subscribe( track => {
              this.songs.push(track);
          });
          });
        }
      });


  }

}
