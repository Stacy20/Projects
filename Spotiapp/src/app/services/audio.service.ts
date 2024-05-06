import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private currentAudio: HTMLAudioElement | undefined;
  private audioPlayingSubject = new BehaviorSubject<boolean>(false);

  audioPlaying$ = this.audioPlayingSubject.asObservable();

  playAudio(audio: HTMLAudioElement) {
    if (this.currentAudio && this.currentAudio !== audio) {
      this.currentAudio.pause();
    }

    this.currentAudio = audio;
    this.audioPlayingSubject.next(true);
    this.currentAudio.play().catch(error => {
      console.error('Error al reproducir audio:', error);
      this.audioPlayingSubject.next(true);
    });
  }

  pauseAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.audioPlayingSubject.next(false);
    }
  }


}
