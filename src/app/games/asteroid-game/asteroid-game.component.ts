import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  VERSION,
  ViewChild,
} from '@angular/core';
import { HelperFunctions } from './helpers/helper-functions';
import { Asteroid } from './models/asteroid.model';
import { Collection } from './models/collection.model';
import { Debri } from './models/debri.model';
import { Item } from './models/item.model';
import { Point } from './models/point.model';
import { Ship } from './models/ship.model';
import { Ufo } from './models/ufo.model';
import { Range } from './models/range.model';
import {
  ASTEROID_MAX_NUM,
  ASTEROID_SPAWN_TIME,
  FPS,
  UFO_INCIDENCE,
} from './constants/constants';

@Component({
  selector: 'app-asteroid-game',
  templateUrl: './asteroid-game.component.html',
  styleUrls: ['./asteroid-game.component.scss'],
})
export class AsteroidGameComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('graphCanvas') graphCanvas: ElementRef;

  private ctx: CanvasRenderingContext2D;
  private canvasElement: HTMLCanvasElement;

  //------------------------------------
  // Variables
  //------------------------------------

  public score = 0;
  public highestScore = 0;
  public isPlay = false;
  public gamePlayed = false;
  public ship: Ship; // Ship

  private gameOverAudio: HTMLAudioElement;

  private canvasWidth;
  private canvasHeight;
  private mouse;
  private isMouseDown = false;
  private beams; // Collection of Beam
  private asteroids; // Collection of Asteroid
  private splinters; // Collection of Splinter
  private debris; // Collection of Debri
  private ufo; // Ufo
  private item; // Item
  private asteroidLastSpawn = 0;
  private ufoLastSpawn = 0;
  private debriLastSpawn = 0;
  private fieldRange;
  private resizeObserver;

  public constructor(private element: ElementRef) {}

  public ngOnInit(): void {
    const highestScore: number = JSON.parse(
      localStorage.getItem('asteroid_game_high_score')
    );
    if (highestScore) {
      this.highestScore = highestScore;
    }
  }

  public ngAfterViewInit(): void {
    this.canvasElement = this.graphCanvas.nativeElement;
    this.ctx = this.canvasElement.getContext('2d');

    this.gameOverAudio = new Audio();
    this.gameOverAudio.src =
      'https://stackblitz.com/files/angular-ivy-kbykxm/github/Sairam-Reddy/angular-games/master/src/assets/audio/asteroied-game-over.mp3';
    this.gameOverAudio.load();
    this.gameOverAudio.playbackRate = 2;

    this.fieldRange = new Range();

    window.addEventListener('resize', this.resize.bind(this), false);
    // Resize
    this.resizeObserver = new ResizeObserver(() => {
      this.resize();
    });
    this.resizeObserver.observe(this.element.nativeElement);
    this.resize();

    this.mouse = new Point();

    this.canvasElement.addEventListener(
      'mousemove',
      this.mouseMove.bind(this),
      false
    );
    this.canvasElement.addEventListener(
      'mousedown',
      this.mouseDown.bind(this),
      false
    );
    this.canvasElement.addEventListener(
      'mouseup',
      this.mouseUp.bind(this),
      false
    );
    this.canvasElement.addEventListener('click', this.click.bind(this), false);

    this.canvasElement.addEventListener(
      'touchmove',
      this.touchMove.bind(this),
      false
    );
    this.canvasElement.addEventListener(
      'touchstart',
      this.mouseDown.bind(this),
      false
    );
    this.canvasElement.addEventListener(
      'touchend',
      this.mouseUp.bind(this),
      false
    );

    this.debris = new Collection();
    for (var i = 0; i < 30; i++) {
      this.debris.push(
        new Debri(HelperFunctions.randInt(this.canvasWidth), this.canvasHeight)
      );
    }

    setInterval(this.loop.bind(this), 1000 / FPS);
  }

  public start(e) {
    this.play();
    this.gamePlayed = true;
    e.preventDefault();
  }

  //------------------------------------
  // EVENT HANDLERS
  //------------------------------------

  private resize() {
    this.canvasElement.width =
      this.canvasWidth =
      this.fieldRange.right =
        this.element.nativeElement.offsetWidth;
    this.canvasElement.height =
      this.canvasHeight =
      this.fieldRange.bottom =
        this.element.nativeElement.offsetHeight;

    this.ctx.fillStyle = 'white';
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 1;
  }

  private mouseMove(e) {
    this.mouse.set(e.clientX, e.clientY);
  }

  private touchMove(e) {
    this.mouse.set(e.touches[0].clientX, e.touches[0].clientY);
    console.log(e.touches[0].clientX, e.touches[0].clientY);
  }

  private mouseDown(e) {
    this.isMouseDown = true;
  }

  private mouseUp(e) {
    this.isMouseDown = false;
  }

  private click(e) {
    if (this.ship) {
      this.ship.fire(this.beams);
    }
  }

  //------------------------------------
  // FRAME LOOP
  //------------------------------------

  private loop() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    var now = new Date().getTime();

    // Spawn Debri
    if (now - this.debriLastSpawn > 300) {
      this.debris.push(new Debri(this.canvasWidth, this.canvasHeight));
      this.debriLastSpawn = now;
    }

    // Debri update
    this.debris.eachUpdate();

    if (this.isPlay) {
      // Spawn

      if (
        now - this.asteroidLastSpawn > ASTEROID_SPAWN_TIME &&
        this.asteroids.length < ASTEROID_MAX_NUM
      ) {
        this.asteroids.push(
          Asteroid.spawn(this.canvasWidth, this.canvasHeight)
        );
        this.asteroidLastSpawn = now;
      }

      if (!this.ufo && !this.item && Math.random() < UFO_INCIDENCE) {
        this.ufo = Ufo.spawn(this.canvasWidth, this.canvasHeight);
      }

      // Update

      if (this.ship) {
        if (this.isMouseDown) {
          this.ship.fire(this.beams);
        }
        this.ship.update(this.mouse, this.fieldRange);
      }

      if (this.ufo) {
        this.ufo.update({
          canvasWidth: this.canvasWidth,
          canvasHeight: this.canvasHeight,
        });
        if (this.ufo.vanished) {
          this.item = new Item(this.ufo.x, this.ufo.y);
          this.ufo = null;
        } else if (this.hitDetection(this.ufo, this.ship)) {
          this.gameOver();
        }
      }

      if (this.item) {
        this.item.update(this.fieldRange);
        if (this.item.vanished) {
          this.item = null;
        } else if (this.hitDetection(this.item, this.ship)) {
          this.ship.setSpecialWepon(this.item.wepon);
          this.item = null;
        }
      }

      this.beams.eachUpdate(this.fieldRange);

      this.asteroids.eachUpdate(this.fieldRange);

      this.splinters.eachUpdate(this.fieldRange);
    }

    // Draw

    this.ctx.beginPath();
    this.ctx.strokeStyle = 'rgb(255, 255, 255)';
    this.ctx.lineWidth = 1;
    if (this.ship) {
      this.ship.draw(this.ctx);
    }
    if (this.ufo) {
      this.ufo.draw(this.ctx);
    }
    if (this.asteroids) {
      this.asteroids.eachDraw(this.ctx);
    }
    this.ctx.stroke();

    // Beam
    if (this.beams) {
      this.beams.eachDraw(this.ctx);
    }

    if (this.item) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.item.wepon.color;
      this.ctx.lineWidth = 1;
      this.item.draw(this.ctx);
      this.ctx.stroke();
    }

    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgb(255, 255, 255)';
    if (this.splinters) {
      this.splinters.eachDraw(this.ctx);
    }
    if (this.debris) {
      this.debris.eachDraw(this.ctx);
    }
    // Game over
    if (this.ship && this.ship.died) {
      this.ship.update(this.mouse, this.fieldRange);
      this.ship.splinter.draw(this.ctx);
    }
    this.ctx.fill();
  }

  //------------------------------------
  // FUNCTIONS
  //------------------------------------

  private play() {
    this.ship = new Ship(this.canvasWidth / 2, this.canvasHeight / 2, 8);
    this.mouse.set(this.ship.x, this.ship.y);
    this.beams = new Collection();
    this.asteroids = new Collection();
    this.splinters = new Collection();

    this.beams.callback = (index, beam) => {
      for (var i = 0; i < this.asteroids.length; i++) {
        const asteroid = this.asteroids[i];
        if (this.hitDetection(beam, asteroid)) {
          this.score += asteroid.damage(beam.power, this.splinters);
          beam.notifyHit();
        }
      }

      if (this.ufo && this.hitDetection(beam, this.ufo)) {
        this.score += this.ufo.damage(beam.power, this.splinters);
        beam.notifyHit();
      }
    };

    this.asteroids.callback = (index, asteroid) => {
      if (this.hitDetection(asteroid, this.ship)) {
        this.gameOver();
      }
    };

    this.ufo = null;
    this.item = null;
    this.score = 0;
    this.isMouseDown = false;
    this.isPlay = true;
  }

  private gameOver() {
    this.ship.destroy();
    this.isPlay = false;
    if (this.ufo && !this.ufo.vanished) {
      this.ufo.stopSound();
    }

    this.gameOverAudio.play();
    if (this.score > this.highestScore) {
      this.highestScore = this.score;
      localStorage.setItem(
        'asteroid_game_high_score',
        this.highestScore.toString()
      );
    }
  }

  public tweetLink() {
    var exc = this.score < 1000 ? '...' : this.score > 3000 ? '!!!' : '!';

    return (
      'https://twitter.com/intent/tweet?url=https://codepen.io/akm2/pen/eYYyELr&text=SCORE ' +
      this.score +
      ' PTS' +
      exc +
      ' - ASTEROIDS'
    );
  }

  // Perform path collision detection
  // The object specified in the argument can be referenced from the path property.
  private hitDetection(a, b) {
    var ap = a.path,
      bp = b.path;
    var as, bs; // Segments
    var a1, a2, b1, b2; // Points

    for (let i = 0, ilen = ap.segmentNum(); i < ilen; i++) {
      as = ap.segment(i);
      a1 = as[0];
      a2 = as[1];
      for (let j = 0, jlen = bp.segmentNum(); j < jlen; j++) {
        bs = bp.segment(j);
        b1 = bs[0];
        b2 = bs[1];
        if (this.intersection(a1, a2, b1, b2)) {
          return true;
        }
      }
    }

    return false;
  }

  // Straight line intersection detection used in hitDetection
  // True if they intersect
  private intersection(a1, a2, b1, b2) {
    var ax = a2.x - a1.x,
      ay = a2.y - a1.y;
    var bx = b2.x - b1.x,
      by = b2.y - b1.y;
    return (
      (ax * (b1.y - a1.y) - ay * (b1.x - a1.x)) *
        (ax * (b2.y - a1.y) - ay * (b2.x - a1.x)) <=
        0 &&
      (bx * (a1.y - b1.y) - by * (a1.x - b1.x)) *
        (bx * (a2.y - b1.y) - by * (a2.x - b1.x)) <=
        0
    );
  }

  ngOnDestroy(): void {
    this.gameOverAudio.pause();
    this.gameOverAudio.src = null;
    this.resizeObserver.unobserve(this.element.nativeElement);
    this.ufo?.stopAllSounds();
    this.asteroids?.map((asteroid) => asteroid?.stopAllSounds());
  }
}
