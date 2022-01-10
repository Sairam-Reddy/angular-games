//------------------------------------
// CONFIG
//------------------------------------

// Default weapon
export const WEPON_DEFAULT = {
  // Weapon name
  name: 'NORMAL BEAM',
  // Damage dealt 0 ~ 1
  power: 0.3,
  // Bullet speed
  speed: 3,
  // Bullet length
  length: 10,
  // Bullet width
  width: 1,
  // The color of the bullet, in the case of special weapons, reflected in the color of the item, specified by CSS color
  color: 'white',
  // Fire rate
  shootingInterval: 1000 * 0.35,
  // true
  // explosion
  // Indicates whether the bullet
  // If true, will not disappear even if it lands
  // If explosion is specified, it takes precedence.
  through: false,
  // Range attack after landing due to explosion
  // Specify with an object that has the following properties:
  // { range: Explosion range, speed: Explosion speed }
  // * The power of range attacks is half the basic power of weapons
  explosion: false,
};

// Special weapon array, Randomly appear when you destroy a UFO
export const WEPON_SPECIAL = [
  {
    name: 'TINY BEAM',
    power: 0.1,
    speed: 10,
    length: 5,
    width: 1,
    color: 'rgb(131, 224, 8)',
    shootingInterval: 1000 * 0.1,
    through: false,
    explosion: false,
  },
  {
    name: 'BLASTER',
    power: 1,
    speed: 3,
    length: 15,
    width: 3,
    color: 'rgb(244, 0, 122)',
    shootingInterval: 1000 * 0.3,
    through: false,
    explosion: false,
  },
  {
    name: 'LASER',
    power: 0.2,
    speed: 35,
    length: 200,
    width: 2,
    color: 'rgb(138, 227, 252)',
    shootingInterval: 1000 * 0.6,
    through: true,
    explosion: false,
  },
  {
    name: 'EXPLOSION BEAM',
    power: 0.15,
    speed: 15,
    length: 10,
    width: 2,
    color: 'rgb(255, 153, 0)',
    shootingInterval: 1000 * 0.5,
    through: false,
    explosion: {
      range: 100,
      speed: 4.5,
    },
  } /*
  ,{
    name: 'INSANE BEAM',
    power: 0.035,
    speed: 7.5,
    length: 5,
    color: 'rgb(255, 246, 0)',
    width: 2,
    shootingInterval: 1000 * 0.015,
    through: true,
    explosion: false,
    explosion: {
      range: 75,
      speed: 2
    }
  }//*/,
];

export const ASTEROID_MAX_NUM = 75;
export const ASTEROID_SPAWN_TIME = 350;
export const ASTEROID_MAX_SIZE = 80;
export const ASTEROID_MIN_SIZE = 5;

export const UFO_INCIDENCE = 0.0035;
export const UFO_SPEED = 2;

export const ITEM_SPEED = 0.5;

export const SHIP_SPEED = 1.5;
export const SPECIAL_WEPON_TIME = 1000 * 20;

export const FPS = 60;

export const PI = Math.PI;
export const TWO_PI = PI * 2;
export const DEG_TO_RAD: number = PI / 180;

export const SCORE = {
  ASTEROID_DAMAGE: 100,
  ASTEROID_DESTROY: 200,
  UFO_DAMAGE: 0,
  UFO_DESTROY: 300,
};
