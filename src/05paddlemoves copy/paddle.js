export default class Paddle {
  constructor(scene, size, court) {
    this.scene = scene;
    this.size = size;
    this.court = court;
    this.speed = 0;

    this.lowerBounds = court.top.y + court.top.height / 2 + size.height / 2;
    this.upperBounds = court.bottom.y - court.top.height / 2 - size.height / 2;
    this.lastMoved = new Date();
  }

  create({ x, y }) {
    const { scene, size } = this;

    this.rect = scene.add.rectangle(
      x,
      y,
      size.width,
      size.height,
      0xffffff
    );

    scene.physics.add.existing(this.rect);
    this.rect.body.setImmovable(true)
    this.rect.body.collideWorldBounds = true;
  }

  up(speed) {
    if (this.lowerBounds > (this.rect.y - speed)) {
      this.rect.y = this.lowerBounds
    } else {
      this.rect.y -= speed;
      this.speed = speed * - 1;
      this.lastMoved = new Date();
    }
  }

  down(speed) {
    if (this.upperBounds < (this.rect.y + speed)) {
      this.rect.y = this.upperBounds
    } else {
      this.rect.y += speed;
      this.speed = speed;
      this.lastMoved = new Date();
    }
  }
}
