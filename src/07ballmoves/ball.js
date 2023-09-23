export default class Ball {
  constructor(scene, court, size) {
    this.scene = scene;
    this.court = court
    this.size = size
    this.reset()
    this.previousLocationsRects = []
  }

  create() {
    const { x, y } = this.court.center;
    [3 / 4, 1 / 2, 1/ 3].forEach((scale, i) => {
      this.previousLocationsRects[i] = this.scene.add.rectangle(
        x,
        y,
        this.size * scale,
        this.size * scale,
        0x000000
      )
    })

    this.resetTail();

    this.rect = this.scene.add.rectangle(
      x,
      y,
      this.size,
      this.size,
      0xffffff
    )

    this.scene.physics.add.existing(this.rect);
    this.rect.body.collideWorldBounds = true;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;


    this.rect.x = this.x;
    this.rect.y = this.y;


    this.resetTail()
  }

  // https://stackoverflow.com/posts/29912287/edit#
  reflect(angle) {
    const v = { x: this.vx, y: this.vy };
    const n = this._getNormal(angle);

    var d = 2 * this._dot(v, n);
    this.vx -= d * n.x;
    this.vy -= d * n.y;

    this.update();
  }

  reset() {
    const { center } = this.court;

    this.x = center.x;
    this.y = center.y;

    this.vx = this._random(4, 7);
    this.vy = this._random(2, 4);
  }

  resetTail() {
    for (let i = 0 ; i < this.previousLocationsRects.length; i++) {
      const rect = this.previousLocationsRects[i];

      rect.x = this.x + this.vx * (i + 1) * 2.5 * -1 + this._random(0, 2);
      rect.y = this.y + this.vy * (i + 1) * 2.5 * -1 + this._random(0, 2);
    }
  }

  _dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y
  }

  _getNormal(a) {
    return {
      x: Math.sin(a),
      y: -Math.cos(a)
    }
  }

  _random(min, max) {
    return ((Math.random() * (max - min)) + min) * (Math.random() < 0.5 ? -1 : 1);
  }
}