import { ITEM_SPEED, TWO_PI, WEPON_SPECIAL } from '../constants/constants';
import { HelperFunctions } from '../helpers/helper-functions';
import { Path } from './path.model';
import { Point } from './point.model';

/**
 * Item
 *
 * @super Point
 */
export class Item extends Point {
  public path;
  public wepon;
  public v;
  public vanished;

  public constructor(x, y) {
    super(x, y);

    var path = (this.path = new Path());

    var d = TWO_PI / 6;
    for (var i = 0; i < 6; i++) {
      path.push(Point.polar(10, d * i).add(this));
    }

    this.wepon =
      WEPON_SPECIAL[HelperFunctions.randInt(WEPON_SPECIAL.length - 1)];

    this.v = Point.polar(ITEM_SPEED, HelperFunctions.randUniform(TWO_PI));
  }

  public update(fieldRange) {
    var v = this.v;
    this.add(v);
    this.path.eachPoints(function (p, i) {
      p.add(v);
    });

    // 画面外に出たら消失
    if (!fieldRange.contains(this.x, this.y, 20)) {
      this.vanished = true;
      return;
    }
  }

  public draw(ctx) {
    this.path.draw(ctx);
    // 対角線を描画
    this.path.eachPoints(function (p, i) {
      if (i === 3) return false;
      ctx.moveTo(p.x, p.y);
      var p2 = this[i + 3];
      ctx.lineTo(p2.x, p2.y);
    });
  }
}
