import {
  COUNTDOWN,
  DOWN,
  DYING,
  EATEN_PAUSE,
  KEY,
  LEFT,
  PACMAN,
  PAUSE,
  PLAYING,
  RIGHT,
  UP,
  WAITING,
} from '../constants/pacman.constants';
import { Ghost } from './ghost.model';
import { PacmanAudio } from './pacman-audio';
import { PacmanMap } from './pacman-map.model';
import { PacmanUser } from './pacman-user.model';

export class Pacman {
  public state = WAITING;
  public audio: PacmanAudio = null;
  public ghosts: Array<Ghost> = [];
  public ghostSpecs = ['#00FFDE', '#FF0000', '#FFB8DE', '#FFB847'];
  public eatenCount = 0;
  public level = 0;
  public tick = 0;
  public ghostPos;
  public userPos;
  public stateChanged = true;
  public timerStart = null;
  public lastTime = 0;
  public canvas = null;
  public ctx = null;
  public timer = null;
  public map: PacmanMap;
  public user: PacmanUser;
  public stored = null;

  private xDown = null;
  private yDown = null;

  public constructor() {}

  public getTick() {
    return this.tick;
  }

  public drawScore(text, position) {
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '12px BDCartoonShoutRegular';
    this.ctx.fillText(
      text,
      (position['new']['x'] / 10) * this.map.blockSize,
      ((position['new']['y'] + 5) / 10) * this.map.blockSize
    );
  }
  0;

  public dialog(text) {
    this.ctx.fillStyle = '#FFFF00';
    this.ctx.font = '18px Calibri';
    var width = this.ctx.measureText(text).width,
      x = (this.map.width * this.map.blockSize - width) / 2;
    this.ctx.fillText(text, x, this.map.height * 10 + 8);
  }

  public soundDisabled() {
    return localStorage['soundDisabled'] === 'true';
  }

  public startLevel() {
    this.user.resetPosition();
    for (var i = 0; i < this.ghosts.length; i++) {
      this.ghosts[i].reset();
    }
    this.audio.play('start');
    this.timerStart = this.tick;
    this.setState(COUNTDOWN);
  }

  public startNewGame() {
    this.setState(WAITING);
    this.level = 1;
    this.user.reset();
    this.map.reset();
    this.map.draw(this.ctx);
    this.startLevel();
  }

  public keyDown(e) {
    if (e.keyCode === KEY.N) {
      this.startNewGame();
    } else if (e.keyCode === KEY.S) {
      this.audio.disableSound();
      localStorage['soundDisabled'] = !this.soundDisabled();
    } else if (e.keyCode === KEY.P && this.state === PAUSE) {
      this.audio.resume();
      this.map.draw(this.ctx);
      this.setState(this.stored);
    } else if (e.keyCode === KEY.P) {
      this.stored = this.state;
      this.setState(PAUSE);
      this.audio.pause();
      this.map.draw(this.ctx);
      this.dialog('Paused');
    } else if (this.state !== PAUSE) {
      return this.user.keyDown(e);
    }
    return true;
  }

  public loseLife() {
    this.setState(WAITING);
    this.user.loseLife();
    if (this.user.getLives() > 0) {
      this.startLevel();
    } else {
      if (this.user.score > this.user.highScore) {
        this.user.updateHighScore(this.user.getScore());
      }
    }
  }

  public setState(nState) {
    this.state = nState;
    this.stateChanged = true;
  }

  public collided(user, ghost) {
    return (
      Math.sqrt(Math.pow(ghost.x - user.x, 2) + Math.pow(ghost.y - user.y, 2)) <
      10
    );
  }

  public drawFooter() {
    var topLeft = this.map.height * this.map.blockSize,
      textBase = topLeft + 17;

    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, topLeft, this.map.width * this.map.blockSize, 30);

    this.ctx.fillStyle = '#FFFF00';

    for (var i = 0, len = this.user.getLives(); i < len; i++) {
      this.ctx.fillStyle = '#FFFF00';
      this.ctx.beginPath();
      this.ctx.moveTo(
        150 + 25 * i + this.map.blockSize / 2,
        topLeft - 4 + this.map.blockSize / 2
      );

      this.ctx.arc(
        150 + 25 * i + this.map.blockSize / 2,
        topLeft - 4 + this.map.blockSize / 2,
        this.map.blockSize / 2,
        Math.PI * 0.25,
        Math.PI * 1.75,
        false
      );
      this.ctx.fill();
    }

    this.ctx.fillStyle = !this.soundDisabled() ? '#00FF00' : '#FF0000';
    this.ctx.font = 'bold 16px sans-serif';
    //ctx.fillText("♪", 10, textBase);
    // this.ctx.fillText('s', 10, textBase);

    this.ctx.fillStyle = '#FFFF00';
    this.ctx.font = '14px Calibri';
    this.ctx.fillText('Score: ' + this.user.getScore(), 15, textBase + 13);
    this.ctx.fillText(
      'H Score: ' + this.user.getHighScore(),
      10,
      textBase + 13
    );
    this.ctx.fillText('Level: ' + this.level, 250, textBase + 13);
  }

  public redrawBlock(pos) {
    this.map.drawBlock(
      Math.floor(pos.y / 10),
      Math.floor(pos.x / 10),
      this.ctx
    );
    this.map.drawBlock(Math.ceil(pos.y / 10), Math.ceil(pos.x / 10), this.ctx);
  }

  public mainDraw() {
    let diff;
    let u;

    let nScore;

    this.ghostPos = [];

    for (let i = 0; i < this.ghosts.length; i++) {
      this.ghostPos.push(this.ghosts[i].move(this.ctx));
    }
    u = this.user.move(this.ctx);

    for (let i = 0; i < this.ghosts.length; i++) {
      this.redrawBlock(this.ghostPos[i].old);
    }
    this.redrawBlock(u.old);

    for (let i = 0; i < this.ghosts.length; i++) {
      this.ghosts[i].draw(this.ctx);
    }
    this.user.draw(this.ctx);

    this.userPos = u['new'];

    for (let i = 0; i < this.ghosts.length; i++) {
      if (this.collided(this.userPos, this.ghostPos[i]['new'])) {
        if (this.ghosts[i].isVunerable()) {
          this.audio.play('eatghost');
          this.ghosts[i].eat();
          this.eatenCount += 1;
          nScore = this.eatenCount * 50;
          this.drawScore(nScore, this.ghostPos[i]);
          this.user.addScore(nScore);
          this.setState(EATEN_PAUSE);
          this.timerStart = this.tick;
        } else if (this.ghosts[i].isDangerous()) {
          this.audio.play('die');
          this.setState(DYING);
          this.timerStart = this.tick;
        }
      }
    }
  }

  public mainLoop() {
    let diff;

    if (this.state !== PAUSE) {
      ++this.tick;
    }

    this.map.drawPills(this.ctx);

    if (this.state === PLAYING) {
      this.mainDraw();
    } else if (this.state === WAITING && this.stateChanged) {
      this.stateChanged = false;
      this.map.draw(this.ctx);
      this.dialog('Press N or tap to start a New game');
    } else if (
      this.state === EATEN_PAUSE &&
      this.tick - this.timerStart > PACMAN.FPS / 3
    ) {
      this.map.draw(this.ctx);
      this.setState(PLAYING);
    } else if (this.state === DYING) {
      if (this.tick - this.timerStart > PACMAN.FPS * 2) {
        this.loseLife();
      } else {
        this.redrawBlock(this.userPos);
        for (let i = 0; i < this.ghosts.length; i++) {
          this.redrawBlock(this.ghostPos[i].old);
          this.ghostPos.push(this.ghosts[i].draw(this.ctx));
        }
        this.user.drawDead(
          this.ctx,
          (this.tick - this.timerStart) / (PACMAN.FPS * 2)
        );
      }
    } else if (this.state === COUNTDOWN) {
      diff = 5 + Math.floor((this.timerStart - this.tick) / PACMAN.FPS);

      if (diff === 0) {
        this.map.draw(this.ctx);
        this.setState(PLAYING);
      } else {
        if (diff !== this.lastTime) {
          this.lastTime = diff;
          this.map.draw(this.ctx);
          this.dialog('Starting in: ' + diff);
        }
      }
    }

    this.drawFooter();
  }

  public eatenPill() {
    this.audio.play('eatpill');
    this.timerStart = this.tick;
    this.eatenCount = 0;
    for (let i = 0; i < this.ghosts.length; i += 1) {
      this.ghosts[i].makeEatable();
    }
  }

  public completedLevel() {
    this.setState(WAITING);
    this.level += 1;
    this.map.reset();
    this.user.newLevel();
    this.startLevel();
  }

  public keyPress(e) {
    if (this.state !== WAITING && this.state !== PAUSE) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  public init(wrapper, root) {
    let ghost;
    let blockSize = wrapper.offsetWidth / 19;
    this.canvas = document.createElement('canvas');

    this.canvas.setAttribute('width', blockSize * 19 + 'px');
    this.canvas.setAttribute('height', blockSize * 22 + 30 + 'px');

    wrapper.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');

    this.audio = new PacmanAudio({ soundDisabled: this.soundDisabled });
    this.map = new PacmanMap(blockSize);
    this.user = new PacmanUser(this.map);

    this.user.onCompletedLevel = () => {
      this.completedLevel();
    };

    this.user.onEatenPill = () => {
      this.eatenPill();
    };

    for (let i = 0, len = this.ghostSpecs.length; i < len; i += 1) {
      ghost = new Ghost(this.map, this.ghostSpecs[i]);
      ghost.getTick = () => {
        return this.getTick();
      };
      this.ghosts.push(ghost);
    }

    this.map.draw(this.ctx);
    //this.dialog('Loading ...');

    var extension = 'mp3';

    var audio_files = [
      ['start', root + 'audio/opening_song.' + extension],
      ['die', root + 'audio/die.' + extension],
      ['eatghost', root + 'audio/eatghost.' + extension],
      ['eatpill', root + 'audio/eatpill.' + extension],
      ['eating', root + 'audio/eating.short.' + extension],
      ['eating2', root + 'audio/eating.short.' + extension],
    ];

    this.load(audio_files);
    this.loaded();
  }

  public load(arr) {
    if (arr.length === 0) {
    } else {
      for (let i = 0; i < arr.length; i++) {
        var x = arr[i];
        this.audio.load(x[0], x[1]);
      }
    }
  }

  public loaded() {
    document.addEventListener('keydown', this.keyDown.bind(this), true);
    document.addEventListener('keypress', this.keyPress.bind(this), true);

    document.addEventListener(
      'touchstart',
      this.handleTouchStart.bind(this),
      false
    );
    document.addEventListener(
      'touchmove',
      this.handleTouchMove.bind(this),
      false
    );

    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = window.setInterval(
        this.mainLoop.bind(this),
        1000 / PACMAN.FPS
      );
    } else {
      this.timer = window.setInterval(
        this.mainLoop.bind(this),
        1000 / PACMAN.FPS
      );
    }
  }

  public getTouches(evt) {
    return (
      evt.touches || // browser API
      evt.originalEvent.touches
    ); // jQuery
  }

  public handleTouchStart(evt) {
    if (this.state === WAITING) {
      this.startNewGame();
    } else {
      const firstTouch = this.getTouches(evt)[0];
      this.xDown = firstTouch.clientX;
      this.yDown = firstTouch.clientY;
    }
  }

  public handleTouchMove(evt) {
    if (!this.xDown || !this.yDown || !this.user) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = this.xDown - xUp;
    var yDiff = this.yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        this.user.setDirection(LEFT);
      } else {
        this.user.setDirection(RIGHT);
      }
    } else {
      if (yDiff > 0) {
        this.user.setDirection(UP);
      } else {
        this.user.setDirection(DOWN);
      }
    }
    /* reset values */
    this.xDown = null;
    this.yDown = null;
  }

  public destory(): void {
    if (this.timer) {
      window.clearInterval(this.timer);
    }

    if (this.audio) {
      this.audio.pause();
    }

    window.removeEventListener('keydown', this.keyDown);
    window.removeEventListener('keypress', this.keyPress);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchmove', this.handleTouchMove);
  }
}
