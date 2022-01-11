export class PinballPaddleCollision {
  public sound: HTMLAudioElement;

  public constructor() {
    this.sound = new Audio();
    this.sound.src =
      'https://stackblitz.com/files/angular-ivy-kbykxm/github/Sairam-Reddy/angular-games/master/src/assets/audio/Pinball-Flipper.mp3';
    this.sound.load();
    this.sound.playbackRate = 2;
  }
}
