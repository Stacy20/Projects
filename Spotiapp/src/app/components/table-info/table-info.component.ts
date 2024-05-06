import { Component, Input } from '@angular/core';
import { Track } from '../../interfaces/spotiapp.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'component-table-info',
  standalone: true,
  imports: [],
  templateUrl: './table-info.component.html',
  styleUrl: './table-info.component.css'
})
// export class TableInfoComponent {
//   @Input()
//   public songs:Track[]=[];
//   iframeUrls: SafeResourceUrl[] = [];

//   constructor(private sanitizer: DomSanitizer) {}

//   ngOnInit() {
//     console.log("ngOnInit", this.songs)
//     console.log("this.songs.length", this.songs.length)

//     // this.songs.forEach(song => {
//     //   console.log("A")
//     //   // console.log(song.id)
//     //   // const url = this.sanitizer.bypassSecurityTrustResourceUrl(song.href);
//     // });
//     console.log("ngOnInit")
//   }
// }

export class TableInfoComponent {
  //todo: cambiar el tipo de songs
  @Input()
  public songs:Track[]=[];
  iframeUrls: SafeResourceUrl[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    console.log("ngOnInit", this.songs)
    this.songs.forEach(song => {
      console.log("A")
      console.log(song.id)
      const url = `https://open.spotify.com/embed/track/${song.id}`;
      this.iframeUrls.push(this.sanitizer.bypassSecurityTrustResourceUrl(url));
    });
    console.log("ngOnInit")
  }


  //todo se debe recibir guardar el tipo de busqueda que se estaba haciendo

}
