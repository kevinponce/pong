import Phaser from 'phaser';
import Court from './court';

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

let court;
const padding = 30;

function create () {
  court = new Court(this, padding)
  court.create();
}

function update() { }
