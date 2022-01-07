export class Bullet {
  public x: number;
  public y: number;
  public r: number;
  public constructor(public stage: any, public angle: any) {
    this.x = stage.w / 2 - Math.sin(angle) * 150;
    this.y = stage.h - Math.cos(angle) * 150;
    this.r = angle;
  }
}
