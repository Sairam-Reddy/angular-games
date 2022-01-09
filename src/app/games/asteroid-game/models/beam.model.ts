import { PI, WEPON_DEFAULT } from '../constants/constants';
import { HelperFunctions } from '../helpers/helper-functions';
import { ExplosionPath } from './explosion.model';
import { Path } from './path.model';
import { Point } from './point.model';

/**
 * Beam
 *
 * @super Point
 */
export class Beam extends Point {
  public angle;
  public path;
  public renderPath;

  public power;
  public speed;
  public length;
  public width;
  public color;
  public shootingInterval;
  public through;
  public explosion;

  public releaseCompleted = false;
  public vanished = false;
  public exploding = false;

  public constructor(x, y, angle, wepon) {
    super(x, y);
    this.angle = angle;

    // In order to solve the problem that the hit judgment can not be taken when the line is short or the movement is fast
    // The path for hit detection takes the last position and the current start position, and render path is renderPath
    this.path = new Path([this, this.clone()], false);
    this.renderPath = new Path([this, this.clone()], false);

    this.power = wepon?.power ? wepon.power : WEPON_DEFAULT.power;
    this.speed = wepon?.speed ? wepon.speed : WEPON_DEFAULT.speed;
    this.length = wepon?.length ? wepon.length : WEPON_DEFAULT.length;
    this.width = wepon?.width ? wepon.width : WEPON_DEFAULT.width;
    this.color = wepon?.color ? wepon.color : WEPON_DEFAULT.color;
    this.shootingInterval = wepon?.shootingInterval
      ? wepon.shootingInterval
      : WEPON_DEFAULT.shootingInterval;
    this.through = wepon.through ? wepon?.through : WEPON_DEFAULT.through;
    this.explosion = wepon.explosion
      ? wepon?.explosion
      : WEPON_DEFAULT.explosion;
  }

  public notifyHit() {
    if (this.explosion) {
      if (!this.exploding) {
        this.power *= 0.5;
        this.width = 1;
        this.path = this.renderPath = new ExplosionPath(
          this.x,
          this.y,
          this.explosion
        );
        this.exploding = true;
      }
    } else if (!this.through) {
      this.vanished = true;
    }
  }

  public update(fieldRange) {
    if (this.vanished) return;

    if (this.exploding) {
      this.path.update(); // Explosion update
      if (this.path.complete) this.vanished = true;
      return;
    }

    var v = Point.polar(this.speed, this.angle);
    var renderTail = this.renderPath[1];

    if (!fieldRange.contains(renderTail.x, renderTail.y)) {
      this.vanished = true;
      return;
    }

    this.path[1].set(renderTail);

    this.add(v);

    if (this.releaseCompleted) {
      renderTail.add(v);
    } else {
      // Update the drawing path by determining the injection, and the tail coordinate does not move until the injection is completed
      this.releaseCompleted = this.distanceTo(renderTail) > this.length;
      if (this.releaseCompleted) {
        renderTail.set(Point.polar(this.length, this.angle - PI).add(this));
      }
    }
  }

  public draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width;
    this.renderPath.draw(ctx);
    ctx.stroke();
  }
}
