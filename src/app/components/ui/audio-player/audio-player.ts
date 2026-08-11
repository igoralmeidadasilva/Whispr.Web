import { Component, ElementRef, input, OnDestroy, viewChild, afterNextRender, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-audio-player',
  imports: [],
  templateUrl: './audio-player.html',
  styleUrl: './audio-player.css',
})
export class AudioPlayer implements OnDestroy{
  public readonly src = input.required<string>();
  public readonly type = input<string>('audio/mp3');

  public readonly audioElement = viewChild.required<ElementRef<HTMLAudioElement>>('audioElement');
  public player?: Plyr;
  private platformId = inject(PLATFORM_ID);

constructor() {
    afterNextRender(async () => {
      if (isPlatformBrowser(this.platformId)) {
        const PlyrModule = await import('plyr');
        const Plyr = PlyrModule.default || PlyrModule;

        this.player = new Plyr(this.audioElement().nativeElement, {
          captions: { active: true },
        });
      }
    });
  }

  ngOnDestroy() {
    this.player?.destroy();
  }
}