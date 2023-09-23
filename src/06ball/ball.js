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

  update() { }

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