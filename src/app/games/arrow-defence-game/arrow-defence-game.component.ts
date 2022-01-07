import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Bullet } from './models/bullet.model';
import { Enemy } from './models/enemy.model';
import { Explosion } from './models/explosion.model';
import { Pointer } from './models/pointer.model';
import { Stage } from './models/stage.model';

@Component({
  selector: 'app-arrow-defence-game',
  templateUrl: './arrow-defence-game.component.html',
  styleUrls: ['./arrow-defence-game.component.scss'],
})
export class ArrowDefenceGameComponent implements AfterViewInit, OnDestroy {
  @ViewChild('graphCanvas') graphCanvas: ElementRef;
  ctx: CanvasRenderingContext2D;
  canvasElement: HTMLCanvasElement;

  private stage: Stage = {
    w: 1280,
    h: 720,
  };

  private pointer: Pointer = {
    x: 0,
    y: 0,
  };
  private scale: number = 1;
  private portrait: boolean = true;
  private loffset: number = 0;
  private toffset: number = 0;
  private mxpos: number = 0;
  private mypos: number = 0;
  private colors = [
    '#1abc9c',
    '#1abc9c',
    '#3498db',
    '#9b59b6',
    '#34495e',
    '#16a085',
    '#27ae60',
    '#2980b9',
    '#8e44ad',
    '#2c3e50',
    '#f1c40f',
    '#e67e22',
    '#e74c3c',
    '#95a5a6',
    '#f39c12',
    '#d35400',
    '#c0392b',
    '#bdc3c7',
    '#7f8c8d',
  ];
  private shake: boolean = false;
  private shaket: number = 0;
  private angle: number = 0;
  private ai: boolean = true;
  private ait: number = 0;
  private btm: number = 0;
  private bullets: Array<Bullet> = [];
  private enemies: Array<Enemy> = [];
  private explosions: Array<Explosion> = [];

  private timebomb: number = 0;
  private lastCalledTime: number;
  private fpcount: number = 0;
  private fpall: number = 0;
  private smoothfps: number = 60;
  private thisfps: number = 60;

  private eturn: number = 0;
  private cold: Array<any> = [];

  private explodeImage: HTMLImageElement;
  private explodebImage: HTMLImageElement;
  private backroundImage: HTMLImageElement;

  public constructor(@Inject(DOCUMENT) private document: any) {}

  public ngAfterViewInit(): void {
    this.canvasElement = this.graphCanvas.nativeElement;
    this.ctx = this.canvasElement.getContext('2d');
    this.canvasElement.width = this.stage.w;
    this.canvasElement.height = this.stage.h;
    this.initialiseView();
  }

  public ngOnDestroy(): void {}

  public onResize(): void {}

  private initialiseView(): void {
    this.ctx.clearRect(0, 0, this.stage.w, this.stage.h);
    for (var i = 0; i < 200; i++) {
      var angle = Math.random() * Math.PI * 2;
      var length = Math.random() * 250 + 50;
      var myx = 360 + Math.sin(angle) * length;
      var myy = 360 - Math.cos(angle) * length;
      this.drawArrow(
        myx,
        myy,
        myx + (length / 6) * Math.sin(angle),
        myy - (length / 6) * Math.cos(angle),
        length / 30,
        length / 30,
        '#c0392b'
      );
    }
    this.explodeImage = new Image();
    this.explodeImage.src = this.canvasElement.toDataURL('image/png');

    this.ctx.clearRect(0, 0, this.stage.w, this.stage.h);
    for (var i = 0; i < 200; i++) {
      var angle = Math.random() * Math.PI - Math.PI / 2;
      var length = Math.random() * 480 + 50;
      var myx = this.stage.w / 2 + Math.sin(angle) * length;
      var myy = this.stage.h - Math.cos(angle) * length;
      this.drawArrow(
        myx,
        myy,
        myx + (length / 6) * Math.sin(angle),
        myy - (length / 6) * Math.cos(angle),
        length / 30,
        length / 30,
        '#2c3e50'
      );
    }
    this.explodebImage = new Image();
    this.explodebImage.src = this.canvasElement.toDataURL('image/png');
  }

  private drawArrow(
    fromx: number,
    fromy: number,
    tox: number,
    toy: number,
    lw: number,
    hlen: number,
    color: string
  ) {
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = lw;
    this.ctx.beginPath();
    this.ctx.moveTo(fromx, fromy);
    this.ctx.lineTo(tox, toy);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(tox, toy);
    this.ctx.lineTo(
      tox - hlen * Math.cos(angle - Math.PI / 6),
      toy - hlen * Math.sin(angle - Math.PI / 6)
    );
    this.ctx.lineTo(
      tox - (hlen * Math.cos(angle)) / 2,
      toy - (hlen * Math.sin(angle)) / 2
    );
    this.ctx.lineTo(
      tox - hlen * Math.cos(angle + Math.PI / 6),
      toy - hlen * Math.sin(angle + Math.PI / 6)
    );
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();
  }
}
