import {
  DEG_TO_RAD,
  SHIP_SPEED,
  SPECIAL_WEPON_TIME,
  WEPON_DEFAULT,
} from '../constants/constants';
import { Beam } from './beam.model';
import { Path } from './path.model';
import { Point } from './point.model';
import { Splinter } from './splinter.model';

/**
 * Ship
 *
 * @super Point
 */
export class Ship extends Point {
  public size;
  public currentWepon;
  public latest;
  public path;
  public possibleShooting = true;
  public specialWeponSetTime = 0;
  public died = false;
  public splinter = null;

  private _referencePath;
  private v;

  public angle() {
    return 0;
  }

  public constructor(x, y, size) {
    super(x, y);
    this.size = size;
    this.currentWepon = WEPON_DEFAULT;
    // Calculate the speed at the time of the previous position and bullet firing
    this.latest = this.clone();
    this.path = new Path();
    // A path indicating a reference point, used as a reference for rotation of path
    this._referencePath = new Path();
    this.v = new Point();

    // Create hull drawing points
    var d = [0, 140, 180, 220],
      c,
      r,
      p;
    for (var i = 0, len = d.length; i < len; i++) {
      (c = DEG_TO_RAD * d[i]), (r = i === 2 ? this.size / 2 : this.size);
      p = Point.polar(r, c).add(this);
      this.path.push(p);
      this._referencePath.push(p.clone());
    }
  }

  public setSpecialWepon(wepon) {
    this.specialWeponSetTime = new Date().getTime();
    this.currentWepon = wepon;
  }

  // died
  public destroy() {
    this.died = true;
    this.splinter = new Splinter(this.x, this.y, 100, 100);
  }

  // Beam is emitted, and if injection is possible, Beam is added to the Collection passed as an argument
  public fire(beams) {
    if (!this.possibleShooting) return false;
    this.possibleShooting = false;

    var p = Point.polar(this.size, this.angle).add(this);
    var beam = new Beam(p.x, p.y, this.angle, this.currentWepon);

    // Put your own speed
    var currentSpeed = this.latest.distanceTo(this);
    if (currentSpeed > SHIP_SPEED) currentSpeed = SHIP_SPEED;
    beam.speed += currentSpeed;

    var self = this;
    setTimeout(function () {
      self.possibleShooting = true;
    }, beam.shootingInterval);

    beams.push(beam);
  }

  public update(mouse, fieldRange) {
    if (this.died) {
      this.splinter.update(fieldRange);
      return;
    }

    this.latest.set(this);

    var v = this.v.set(mouse).sub(this);
    var vlen = v.length();

    if (vlen > SHIP_SPEED) v.normalize(SHIP_SPEED);

    var i, len;
    if (vlen > this.size + 10) {
      this.add(v);
      for (i = 0, len = this.path.length; i < len; i++) {
        this._referencePath[i].add(v);
      }
    }

    var angle = (this.angle = v.angle());

    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var p, rp, dx, dy;

    for (i = 0, len = this.path.length; i < len; i++) {
      p = this.path[i];
      rp = this._referencePath[i];
      dx = rp.x - this.x;
      dy = rp.y - this.y;
      p.x = this.x + dx * cos - dy * sin;
      p.y = this.y + dx * sin + dy * cos;
    }

    if (new Date().getTime() - this.specialWeponSetTime > SPECIAL_WEPON_TIME) {
      this.currentWepon = WEPON_DEFAULT;
    }
  }

  public draw(ctx) {
    if (!this.died) this.path.draw(ctx);
  }
}
