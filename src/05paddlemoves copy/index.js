import Phaser from 'phaser';
import Court from './court';
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


  leftPaddle = new Paddle(
    this,
    { height: paddleHeight, width: paddleWidth},
    court
  );
  leftPaddle.create({ x: 100, y: court.center.y });

  rightPaddle = new Paddle(
    this,
    { height: paddleHeight, width: paddleWidth},
    court
  );
  rightPaddle.create({ x: this.game.config.width - padding * 3.5, y: court.center.y });

  keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

  farLeftDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
  leftDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
  rightDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
  farRightDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
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
}
