import { Stage } from './stage.model';

export class Bullet {
  public x: number;
  public y: number;
  public r: number;
  public sound: HTMLAudioElement;

  public constructor(public stage: Stage, public angle: number) {
    this.x = stage.w / 2 - Math.sin(angle) * 150;
    this.y = stage.h - Math.cos(angle) * 150;
    this.r = angle;
    this.sound = new Audio();
    this.sound.src =
      'https://stackblitz.com/files/angular-ivy-kbykxm/github/Sairam-Reddy/angular-games/master/src/assets/audio/mixkit-arcade-retro-jump-223.wav';
    this.sound.load();
    this.sound.playbackRate = 6;
  }
}
