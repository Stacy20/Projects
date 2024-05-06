import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AudioService } from '../../../services/audio.service';

@Component({
  selector: 'shared-audio',
  standalone: true,
  imports: [],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.css'
})
export class AudioComponent {
//*La entrada del audio
@Input() audioSrc: string = ''; // Propiedad para la ruta del archivo de audio

//* sirve para saber si el audio se esta reproduciendo o no
public audioPlaying: boolean = false;

private audio: HTMLAudioElement | undefined;
  //* Obtenemos una referencia al elemento de audio usando ViewChild
  @ViewChild('audioPlayer') audioPlayer: ElementRef | undefined;
/**
 * *Utilizamos el servicio del audio para manejar entre los futuros componentes  y que no suenen al mismo tiempo todos
 * @param audioService
 */
constructor(private audioService: AudioService) {}

/**
 * * El metado de abajo sirve para tomar el elemento del audio del html
 * * saber si esta en pausa o no, y saber cuando relaizar eso cambio segun se toque click
 */
toggleAudio() {
  if (!this.audio) {
    this.audio = this.audioPlayer?.nativeElement;
  }

  if (this.audio) {
    if (this.audioPlaying) {
      this.audioService.pauseAudio();
    } else {
      this.audioService.playAudio(this.audio);
    }

    this.audioPlaying = !this.audioPlaying;
  }
}
}
