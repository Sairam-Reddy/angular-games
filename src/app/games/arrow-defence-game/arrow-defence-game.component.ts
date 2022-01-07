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

  public onResize(): void {
    var cw = window.innerWidth;
    var ch = window.innerHeight;
    if (cw <= (ch * this.stage.w) / this.stage.h) {
      this.portrait = true;
      this.scale = this.stage.w / cw;
      this.loffset = 0;
      this.toffset = Math.floor(ch - (cw * this.stage.h) / this.stage.w) / 2;
      this.canvasElement.style.width = cw + 'px';
      this.canvasElement.style.height =
        Math.floor((cw * this.stage.h) / this.stage.w) + 'px';
      this.canvasElement.style.marginLeft = this.loffset + 'px';
      this.canvasElement.style.marginTop = this.toffset + 'px';
    } else {
      this.scale = this.stage.h / ch;
      this.portrait = false;
      this.loffset = Math.floor(cw - (ch * this.stage.w) / this.stage.h) / 2;
      this.toffset = 0;
      this.canvasElement.style.height = ch + 'px';
      this.canvasElement.style.width =
        Math.floor((ch * this.stage.w) / this.stage.h) + 'px';
      this.canvasElement.style.marginLeft = this.loffset + 'px';
      this.canvasElement.style.marginTop = this.toffset + 'px';
    }
  }

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

    this.ctx.clearRect(0, 0, this.stage.w, this.stage.h);
    this.ctx.fillStyle = 'rgba(236,240,241,1)';
    this.ctx.fillRect(0, 0, this.stage.w, this.stage.h);
    for (var i = 0; i < 200; i++) {
      var angle = ((Math.random() * Math.PI) / Math.PI) * 180;
      var length = Math.random() * 250 + 50;
      var myx = Math.random() * this.stage.w;
      var myy = Math.random() * this.stage.h;
      this.drawArrow(
        myx,
        myy,
        myx + (length / 6) * Math.sin(angle),
        myy - (length / 6) * Math.cos(angle),
        length / 30,
        length / 30,
        this.colors[Math.floor(Math.random() * this.colors.length)]
      );
    }

    this.ctx.fillStyle = 'rgba(236,240,241,0.9)';
    this.ctx.fillRect(0, 0, this.stage.w, this.stage.h);

    this.backroundImage = new Image();
    this.backroundImage.src = this.canvasElement.toDataURL('image/png');

    for (var i = 0; i < 10; i++) {
      this.enemies.push(new Enemy(this.stage));

      this.enemies[i].x += Math.sin(this.enemies[i].r) * 300;
      this.enemies[i].y += Math.cos(this.enemies[i].r) * 300;
    }

    this.setupEventListeners();
    this.animateView();
    // setTimeout(() => {
    //   this.animateView();
    // }, 1000 / 60);
  }

  private setupEventListeners(): void {
    window.addEventListener(
      'mousedown',
      (e) => {
        this.motchstart(e);
      },
      false
    );
    window.addEventListener(
      'mousemove',
      (e) => {
        this.motchmove(e);
      },
      false
    );
    window.addEventListener(
      'mouseup',
      (e) => {
        this.motchend(e);
      },
      false
    );
    window.addEventListener(
      'touchstart',
      (e) => {
        e.preventDefault();
        this.motchstart(e.touches[0]);
      },
      false
    );
    window.addEventListener(
      'touchmove',
      (e) => {
        e.preventDefault();
        this.motchmove(e.touches[0]);
      },
      false
    );
    window.addEventListener(
      'touchend',
      (e) => {
        e.preventDefault();
        this.motchend(e.touches[0]);
      },
      false
    );
  }

  private animateView(): void {
    this.requestAnimFrame();

    if (this.shake) {
      var trax = Math.random() * 60 - 30;
      var tray = Math.random() * 60 - 30;
      this.ctx.translate(trax, tray);
    }
    this.fpscounter();
    this.ctx.clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    this.enginestep();

    // unused code
    // this.ctx.fillStyle = '#8e44ad';
    // this.ctx.font = '24px arial';

    // this.ctx.textAlign = 'left';
    // this.ctx.fillText(this.thisfps.toString(), 20, 50);
    // this.smoothfps += (this.thisfps - this.smoothfps) / 100;
    // this.ctx.fillText(this.cold[0].slice(1, 6), 20, 80);
    // this.ctx.beginPath();
    // this.ctx.arc(this.pointer.x, this.pointer.y, 50, 0, Math.PI * 2, false);
    // this.ctx.closePath();
    // this.ctx.fill();

    if (this.shake) {
      this.ctx.translate(-trax, -tray);
      this.shaket++;
      if (this.shaket > 20) {
        this.shaket = 0;
        this.shake = false;
      }
    }
  }

  private enginestep() {
    this.ctx.drawImage(this.backroundImage, 0, 0);
    if (!this.ai && this.ait < Date.now() - 3000) {
      this.ai = true;
    }
    this.btm++;
    if (this.btm > 8) {
      this.btm = 0;
      this.bullets.push(new Bullet(this.stage, this.angle));
    }

    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].x -= Math.sin(this.bullets[i].r) * 20;
      this.bullets[i].y -= Math.cos(this.bullets[i].r) * 20;
      this.drawArrow(
        this.bullets[i].x + Math.sin(this.bullets[i].r) * 50,
        this.bullets[i].y + Math.cos(this.bullets[i].r) * 50,
        this.bullets[i].x,
        this.bullets[i].y,
        8,
        8,
        '#2980b9'
      );
      if (this.bullets[i].x < -100 || this.bullets[i].x > this.stage.w + 100) {
        this.bullets.splice(i, 1);
      }
      if (this.bullets[i].y < -100 || this.bullets[i].y > this.stage.h + 100) {
        this.bullets.splice(i, 1);
      }
    }

    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].x += Math.sin(this.enemies[i].r) * 3;
      this.enemies[i].y += Math.cos(this.enemies[i].r) * 3;
      this.drawArrow(
        this.enemies[i].x - Math.sin(this.enemies[i].r) * 100,
        this.enemies[i].y - Math.cos(this.enemies[i].r) * 100,
        this.enemies[i].x,
        this.enemies[i].y,
        15,
        15,
        '#c0392b'
      );
      if (this.enemies[i].y > this.stage.h) {
        this.enemies[i] = new Enemy(this.stage);
        this.explosions.push(new Explosion(this.stage.w / 2, this.stage.h, 2));
        this.shake = true;
        this.shaket = 0;
      }
      for (var b = 0; b < this.bullets.length; b++) {
        var dx = this.enemies[i].x - this.bullets[b].x;
        var dy = this.enemies[i].y - this.bullets[b].y;
        var dis = dx * dx + dy * dy;
        if (dis < 20 * 20) {
          this.explosions.push(
            new Explosion(this.enemies[i].x, this.enemies[i].y, 1)
          );
          this.enemies[i] = new Enemy(this.stage);
          this.bullets.splice(b, 1);
        }
      }
    }

    if (this.ai) {
      for (var l = 0; l < this.enemies.length; l++) {
        var dx = this.enemies[l].x - this.stage.w / 2;
        var dy = this.enemies[l].y - this.stage.h;
        var dis = Math.floor(Math.sqrt(dx * dx + dy * dy));
        var val1 = 100000 + dis;
        var val2 = 1000 + l;
        this.cold[l] = val1 + 'x' + val2;
      }

      this.cold.sort();
      this.eturn = parseInt(this.cold[0].slice(8, 11));
      if (parseInt(this.cold[0].slice(1, 6)) < 800) {
        this.angle += (this.enemies[this.eturn].r - this.angle) / 8;
      }
    } else {
      var dx = this.pointer.x - this.stage.w / 2;
      var dy = this.pointer.y - this.stage.h;
      this.angle = Math.atan(dx / dy);
    }

    this.drawArrow(
      this.stage.w / 2,
      this.stage.h,
      this.stage.w / 2 - Math.sin(this.angle) * 150,
      this.stage.h - Math.cos(this.angle) * 150,
      30,
      20,
      '#2c3e50'
    );

    for (var e = 0; e < this.explosions.length; e++) {
      if (this.explosions[e].ty == 1) {
        var myimg = this.explodeImage;
        this.ctx.globalAlpha = 1 - this.explosions[e].t / this.stage.h;
        this.ctx.drawImage(
          myimg,
          this.explosions[e].x - this.explosions[e].t / 2,
          this.explosions[e].y - this.explosions[e].t / 2,
          (this.explosions[e].t * this.stage.w) / this.stage.h,
          this.explosions[e].t
        );
        this.ctx.globalAlpha = 1;
      } else {
        var myimg = this.explodebImage;
        this.ctx.globalAlpha = 1 - this.explosions[e].t / this.stage.h;
        this.ctx.drawImage(
          myimg,
          this.explosions[e].x -
            (this.explosions[e].t * this.stage.w) / this.stage.h / 2,
          this.stage.h - this.explosions[e].t,
          (this.explosions[e].t * this.stage.w) / this.stage.h,
          this.explosions[e].t
        );
        this.ctx.globalAlpha = 1;
      }
    }

    for (var e = 0; e < this.explosions.length; e++) {
      this.explosions[e].t += 20;
      if (this.explosions[e].t > this.stage.h) {
        this.explosions.splice(e, 1);
      }
    }
  }

  private fpscounter() {
    this.timebomb++;
    if (!this.lastCalledTime) {
      this.lastCalledTime = Date.now();
      return;
    }
    var delta = (Date.now() - this.lastCalledTime) / 1000;
    this.lastCalledTime = Date.now();
    var fps = 1 / delta;
    this.fpcount++;
    this.fpall += fps;
    if (this.timebomb > 30) {
      this.thisfps = ((this.fpall / this.fpcount) * 10) / 10;
      this.fpcount = 0;
      this.fpall = 0;
      this.timebomb = 0;
    }
  }

  private requestAnimFrame() {
    window.requestAnimationFrame(() =>
      setTimeout(() => {
        this.animateView();
      }, 1000 / 60)
    );
  }

  private motchstart(e) {
    this.mxpos = (e.pageX - this.loffset) * this.scale;
    this.mypos = (e.pageY - this.toffset) * this.scale;
  }

  private motchmove(e) {
    this.mxpos = (e.pageX - this.loffset) * this.scale;
    this.mypos = (e.pageY - this.toffset) * this.scale;
    this.pointer.x = this.mxpos;
    this.pointer.y = this.mypos;
    this.ai = false;
    this.ait = Date.now();
  }

  private motchend(e) {
    //
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
