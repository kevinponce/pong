export default class Paddle {
  constructor(scene, size, court, ball) {
    this.scene = scene;
    this.size = size;
    this.court = court;
    this.ball = ball;
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

    this.rect.setStrokeStyle(1, 0xff00ff)

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

  ai(handleSpeed, scaleCanSeeInTheFuture) {
    const { court, rect } = this;
    const { x, y, vx, vy } = this.ball;

    const ballLeftCenterEdge = {
      x: x - this.ball.size / 2,
      y,
    }

    const interceptPoint = this.intercept(
      ballLeftCenterEdge,
      { x: ballLeftCenterEdge.x + vx * scaleCanSeeInTheFuture, y: ballLeftCenterEdge.y + vy * scaleCanSeeInTheFuture },
      {
        x: rect.x + rect.width / 2,
        y: -10000,
        x2: rect.x + rect.width / 2,
        y2: 10000,
      }
    );

    if (interceptPoint) {
      const delta = rect.y - interceptPoint.y;

      // fix the shaking
      if (Math.abs(delta) <= handleSpeed) {
        return;
      }

      if (delta < 0) {
        this.down(handleSpeed);
      } else if (delta > 0) {
        this.up(handleSpeed);
      }

      return
    }
    const delta = rect.y - court.center.y;
    // fix the shaking
    if (Math.abs(delta) <= handleSpeed) {
      return;
    }

    if (delta < 0) {
      this.down(handleSpeed);
    } else if (delta > 0) {
      this.up(handleSpeed);
    }
  }

  // https://github.com/jakesgordon/javascript-pong/blob/master/pong.js
  intercept(ball, ballNext, rect2) {
    var denom = ((rect2.y2-rect2.y) * (ballNext.x-ball.x)) - ((rect2.x2-rect2.x) * (ballNext.y-ball.y));
    if (denom == 0) return null;

    var ua = (((rect2.x2 - rect2.x) * (ball.y - rect2.y)) - ((rect2.y2 - rect2.y) * (ball.x - rect2.x))) / denom;

    if ((ua >= 0) && (ua <= 1)) {
      var ub = (((ballNext.x - ball.x) * (ball.y - rect2.y)) - ((ballNext.y - ball.y) * (ball.x - rect2.x))) / denom;

      if ((ub >= 0) && (ub <= 1)) {
        var x = ball.x + (ua * (ballNext.x-ball.x));
        var y = ball.y + (ua * (ballNext.y-ball.y));
        return { x: x, y: y };
      }
    }
  }
}
