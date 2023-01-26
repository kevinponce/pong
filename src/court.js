export default class Court {
  constructor(scene, padding) {
    this.scene = scene;
    this.padding = padding;

    this.gameSize = {
      height: scene.game.config.height,
      width: scene.game.config.width,
    }

    this.center = {
      x: this.gameSize.width / 2,
      y: this.gameSize.height / 2
    }
  }

  create() {
    this._createTopLine();
    this._createBottomLine();
    this._createLeftLine();
    this._createRightLine();
    this._createCenterLine();
  }

  _createTopLine() {
    const { width } = this.gameSize;
    const { padding, center, scene } = this;

    this.top = scene.add.rectangle(center.x, padding * 2 + 5, width - padding * 4, 10, 0xffffff);
    scene.physics.add.existing(this.top);
    this.top.body.setImmovable(true)
    this.top.body.collideWorldBounds = true;

    this.top.setStrokeStyle(1, 0xff00ff)
  }

  _createBottomLine() {
    const { height, width } = this.gameSize;
    const { padding, center, scene } = this;
  
    this.bottom = this.scene.add.rectangle(
      center.x,
      height - padding * 2 + 5,
      width - padding * 4,
      10,
      0xffffff
    );

    scene.physics.add.existing(this.bottom);
    this.bottom.body.setImmovable(true);
    this.bottom.body.collideWorldBounds = true;

    this.bottom.setStrokeStyle(1, 0xff00ff)
  }

  _createLeftLine() {
    const { height } = this.gameSize;
    const { padding, center, scene } = this;

    this.left = scene.add.rectangle(
      padding * 2 + 5,
      center.y,
      10,
      height - padding * 4,
      0xffffff
    );
    scene.physics.add.existing(this.left);
    this.left.body.setImmovable(true);

    this.left.setStrokeStyle(1, 0xff00ff)
  }

  _createRightLine() {
    const { height, width } = this.gameSize;
    const { padding, center, scene } = this;

    this.right = scene.add.rectangle(
      width - padding * 2.2,
      center.y,
      10,
      height - padding * 4,
      0xffffff
    );
    scene.physics.add.existing(this.right);
    this.right.body.setImmovable(true);

    this.right.setStrokeStyle(1, 0xff00ff)
  }

  _createCenterLine() {
    const { height } = this.gameSize;
    const { padding, center, scene } = this;

    const centerLine = scene.add.rectangle(
      center.x, height / 2,
      10,
      height - padding * 4,
      0xffffff
    );

    centerLine.setStrokeStyle(1, 0xff00ff)
  }
}