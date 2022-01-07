export class Enemy {
  public r: number;
  public dis: number;
  public x: number;
  public y: number;

  public constructor(public stage: any) {
    this.r = (Math.random() * Math.PI) / (2.5 / 2) - Math.PI / 2.5;
    this.dis = Math.random() * 1280 + 720;
    this.x = stage.w / 2 - Math.sin(this.r) * this.dis;
    this.y = stage.h - Math.cos(this.r) * this.dis;
  }
}
