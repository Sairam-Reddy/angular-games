export class Explosion {
  public x: number;
  public y: number;
  public ty: number;
  public t: number;
  public sound: HTMLAudioElement;

  constructor(x: number, y: number, ty: number) {
    this.x = x;
    this.y = y;
    this.ty = ty;
    this.t = 30;
    this.sound = new Audio();
    if (ty === 1) {
      this.sound.src =
        'https://stackblitz.com/files/angular-ivy-kbykxm/github/Sairam-Reddy/angular-games/master/src/assets/audio/mixkit-explosion-in-battle-2809.wav';
      this.sound.load();
      this.sound.playbackRate = 4;
    } else {
      this.sound.src =
        'https://stackblitz.com/files/angular-ivy-kbykxm/github/Sairam-Reddy/angular-games/master/src/assets/audio/Red-Arrow-Space_Grenade.mp3';
      this.sound.load();
      this.sound.playbackRate = 2;
    }
  }
}
