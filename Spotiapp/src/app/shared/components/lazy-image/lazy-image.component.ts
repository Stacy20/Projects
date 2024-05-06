import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AudioService } from '../../../services/audio.service';
import { AudioComponent } from "../audio/audio.component";

@Component({
    selector: 'lazy-image',
    standalone: true,
    templateUrl: './lazy-image.component.html',
    styleUrl: './lazy-image.css',
    imports: [CommonModule, AudioComponent]
})
export class LazyImageComponent {
  @Input()
  public url!: string;

  @Input()
  public alt: string='';

  //*La entrada del audio
  @Input() audioSrc: string = ''; // Propiedad para la ruta del archivo de audio

  @Input()
  public typeCard!: number; //Cero significa Artista osea que no va tener cancion solo el album


  //* Sirve para saber si ya la imagen cargo o no
  public hasLoaded: boolean = false;


  ngOnInit():void{
    //if(this.url) throw new Error('Url is required');
    if(!this.url) throw new Error('Url is required');

  }

  onLoad():void{
    this.hasLoaded = true;
  }


}
