import { Component } from '@angular/core';
import { SpotiappService } from '../../../services/spotiapp.service';
import { Album, AlbumTrack, Artist, Track} from '../../../interfaces/spotiapp.interface';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-sidebar',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  constructor(
    private router: Router,
    private spotiService: SpotiappService) {
  }

  public tracks: Track[] = [];
  public artists: Artist[] = [];
  public artistsTopTracks: Track[] = [];
  public albumTracks: AlbumTrack[] = [];
  public albumReleases: Album[] = [];
  public songs: Track[] = [];

  getTags(): string[]{
    return this.spotiService.tagsHistory;
  }
  searchTag(tag: string): void{
    this.spotiService.organizeHistory(tag);
    this.router.navigateByUrl(tag);
  }

}
