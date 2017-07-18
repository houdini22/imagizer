import BaseTransformEffect from '../BaseTransform';

class DiffuseEffect extends BaseTransformEffect {
  static getName() {
    return 'diffuse';
  }

  getDefaultParameters() {
    return {
      scale: 4
    };
  }

  before(parameters, width, height, imageData) {
    let sinTable = new Array(256),
      cosTable = new Array(256),
      i,
      angle;
    for (i = 0; i < 256; i += 1) {
      angle = Math.PI * 2 * i / 256;
      sinTable[i] = parameters.scale * Math.sin(angle);
      cosTable[i] = parameters.scale * Math.cos(angle);
    }
    return {
      sinTable: sinTable,
      cosTable: cosTable
    };
  }

  callback(x, y, parameters) {
    let angle = parseInt(Math.random() * 255),
      distance = Math.random();

    return [
      x + distance * this.data.sinTable[angle],
      y + distance * this.data.cosTable[angle]
    ];
  }
}

export default DiffuseEffect;