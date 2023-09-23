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

let leftPaddle;
let rightPaddle;
let court;
const padding = 30;

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
}

function update() { }
