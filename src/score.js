export default class Score {
  constructor(scene, pos, align, score) {
    this.scene = scene
    this.pos = pos
    this.align = align
    this.score = score
  }

  create() {
    const { x, y } = this.pos;
    // this.text = this.scene.add.text(x, y, this.toString(this.score), { fontSize: '32px', fill: '#fff', align: this.align })

    this.numsRects = [];

    let ks = [...new Array(5).keys()];

    if(this.align === 'right') {
      ks.reverse();
    }

    for (let ki = 0; ki < 5; ki++) {
      const k = ks[ki];

      this.numsRects[k] = []
      for (let j = 0; j < 6; j++) {
        this.numsRects[k][j] = []
        for (let i = 0; i < 4; i++) {
          this.numsRects[k][j][i] = this.scene.add.rectangle(
            x + 10 * i + 2 * i + ki * 50  + 2 * ki,
            y + 10 * j + 2 * j,
            10,
            10,
            0x000000
          )
        }
      }
    }

    this.drawScore();
  }

  inc() {
    this.score++;
    
    // this.text.setText(this.toString(this.score));
    this.drawScore();
  }

  toString(num) {
    if (this.align == 'left') {
      return String(num);
    }

    return ' '.repeat(4 - String(num).length) + String(num);
  }

  drawScore() {
    const nums = this.score.toString().split('').map(num => parseInt(num));

    for (let k = 0; k < 5; k++) {
      const numPattern = this.getNumberMap(nums[k]);
      if (numPattern.length > 0) {
        for (let j = 0; j < 6; j++) {
          for (let i = 0; i < 4; i++) {
            const rect = this.numsRects[k][j][i]
            if (numPattern[j][i] == 1) {
              rect.setFillStyle(0xffffff, 1)
              rect.setStrokeStyle(1, 0xff00ff)
            } else {
              rect.setFillStyle(0x000000, 1)
              rect.setStrokeStyle(0, 0x000000)
            }
          }
        }
      }
    }
  }

  getNumberMap(num) {
    if (!Number.isInteger(num)) return this._numMapClear();
    if (num < 0) return this._numMapClear();
    if (num > 9) return this._numMapClear();

    return [
      this._numMapZero,
      this._numMapOne,
      this._numMapTwo,
      this._numMapThree,
      this._numMapFour,
      this._numMapFive,
      this._numMapSix,
      this._numMapSeven,
      this._numMapEight,
      this._numMapNine,
    ][num]();
  }

  _numMapClear() {
    return [
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
    ];
  }

  _numMapZero () {
    return [
      [ 1, 1, 1, 1 ],
      [ 1, 0, 0, 1 ],
      [ 1, 0, 0, 1 ],
      [ 1, 0, 0, 1 ],
      [ 1, 0, 0, 1 ],
      [ 1, 1, 1, 1 ],
    ];
  }

  _numMapOne() {
    return [
      [ 0, 0, 0, 1 ],
      [ 0, 0, 0, 1 ],
      [ 0, 0, 0, 1 ],
      [ 0, 0, 0, 1 ],
      [ 0, 0, 0, 1 ],
      [ 0, 0, 0, 1 ],
    ];
  }

  _numMapTwo() {
    return [
      [ 1, 1, 1, 1 ],
      [ 0, 0, 0, 1 ],
      [ 0, 0, 1, 0 ],
      [ 0, 1, 0, 0 ],
      [ 1, 0, 0, 0 ],
      [ 1, 1, 1, 1 ],
    ];
  }

  _numMapThree() {
    return [
      [ 1, 1, 1, 1 ],
      [ 0, 0, 0, 1 ],
      [ 0, 0, 0, 1 ],
      [ 1, 1, 1, 1 ],
      [ 0, 0, 0, 1 ],
      [ 1, 1, 1, 1 ],
    ];
  }

  _numMapFour() {
    return [
      [ 1, 0, 0, 1 ],
      [ 1, 0, 0, 1 ],
      [ 1, 1, 1, 1 ],
      [ 0, 0, 0, 1 ],
      [ 0, 0, 0, 1 ],
      [ 0, 0, 0, 1 ],
    ];
  }

  _numMapFive() {
    return [
      [ 1, 1, 1, 1 ],
      [ 1, 0, 0, 0 ],
      [ 1, 1, 1, 1 ],
      [ 0, 0, 0, 1 ],
      [ 0, 0, 0, 1 ],
      [ 1, 1, 1, 1 ],
    ];
  }

  _numMapSix() {
    return [
      [ 1, 1, 1, 1 ],
      [ 1, 0, 0, 0 ],
      [ 1, 1, 1, 1 ],
      [ 1, 0, 0, 1 ],
      [ 1, 0, 0, 1 ],
      [ 1, 1, 1, 1 ],
    ];
  }

  _numMapSeven() {
    return [
      [ 1, 1, 1, 1 ],
      [ 0, 0, 0, 1 ],
      [ 0, 0, 0, 1 ],
      [ 0, 0, 0, 1 ],
      [ 0, 0, 0, 1 ],
      [ 0, 0, 0, 1 ],
    ];
  }

  _numMapEight() {
    return [
      [ 1, 1, 1, 1 ],
      [ 1, 0, 0, 1 ],
      [ 1, 1, 1, 1 ],
      [ 1, 0, 0, 1 ],
      [ 1, 0, 0, 1 ],
      [ 1, 1, 1, 1 ],
    ];
  }

  _numMapNine() {
    return [
      [ 1, 1, 1, 1 ],
      [ 1, 0, 0, 1 ],
      [ 1, 1, 1, 1 ],
      [ 0, 0, 0, 1 ],
      [ 0, 0, 0, 1 ],
      [ 0, 0, 0, 1 ],
    ];
  }
}