import Phaser from 'phaser';
import Court from './court';
import Ball from './ball';
import Paddle from './paddle';

const paddleWidth = 30;
const paddleHeight = 100;

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  }
};

const game = new Phaser.Game(config);

function preload () { }

const centerX = config.width / 2;
const centerY = config.height / 2;

let ball;
let keyUp;
let keyDown;
let leftPaddle;
let rightPaddle;
let court;
const padding = 30;
let farLeftDown;
let leftDown;
let rightDown;
let farRightDown;

function create () {
  court = new Court(this, padding)
  court.create();

  ball = new Ball(this, court, 20);
  ball.create();

  leftPaddle = new Paddle(
    this,
    { height: paddleHeight, width: paddleWidth},
    court,
    ball
  );
  leftPaddle.create({ x: 100, y: court.center.y });

  rightPaddle = new Paddle(
    this,
    { height: paddleHeight, width: paddleWidth},
    court,
    ball
  );
  rightPaddle.create({ x: this.game.config.width - padding * 3.5, y: court.center.y });

  keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

  farLeftDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
  leftDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
  rightDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
  farRightDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

  this.physics.add.collider(ball.rect, court.bottom, trapWallBounce, null, this);
  this.physics.add.collider(ball.rect, court.top, trapWallBounce, null, this);
  this.physics.add.collider(ball.rect, leftPaddle.rect, trapPaddleBounce, null, this);
  this.physics.add.collider(ball.rect, rightPaddle.rect, trapPaddle2Bounce, null, this);
}

function update() {
  if (keyUp.isDown) {
    rightPaddle.up(5);
  } else if (keyDown.isDown) {
    rightPaddle.down(5);
  }

  if (farLeftDown.isDown) {
    rightPaddle.up(10);
  } else if (leftDown.isDown) {
    rightPaddle.up(5);
  } else if (rightDown.isDown) {
    rightPaddle.down(5);
  } else if (farRightDown.isDown) {
    rightPaddle.down(10);
  }

  ball.update();
}

function trapWallBounce (_ball, two) {
  ball.reflect(0 * (Math.PI/180));
}

function trapPaddleBounce (_ball, two) {
  updateBallSpeedAndAngle(90, leftPaddle);
}

function trapPaddle2Bounce (_ball, two) {
  updateBallSpeedAndAngle(-90, rightPaddle)
}

function updateBallSpeedAndAngle(angle, paddle) {
  if (new Date() - paddle.lastMoved >= 300) {
    ball.reflect(angle * (Math.PI/180));
    return;
  }

  let { speed } = paddle;
  speed /= 2

  angle -= speed;
  if (speed < 0) {
    // paddle is moving up
    if (ball.vy < 0) {
      // ball is moving up
      ball.vy += speed;
    } else {
      // ball is moving down
      ball.vy -= speed;
    }
  } else {
    // paddle is moving down

    if (ball.vy < 0) {
      // ball is moving up
      ball.vy -= speed;
    } else {
      // ball is moving down
      ball.vy += speed;
    }
  }

  ball.reflect(angle * (Math.PI/180));
}
