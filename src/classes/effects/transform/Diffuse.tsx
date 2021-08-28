import BaseTransformEffect from "../BaseTransform";

interface Parameters {
  scale: number;
}

interface BeforeData {
  sinTable: Array<number>;
  cosTable: Array<number>;
}

class DiffuseEffect extends BaseTransformEffect {
  static getName(): string {
    return "diffuse";
  }

  data: BeforeData = {
    sinTable: [],
    cosTable: [],
  };

  getDefaultParameters(): Parameters {
    return {
      scale: 4,
    };
  }

  before(
    parameters: Parameters,
    width: number,
    height: number,
    imageData: ImageData
  ): BeforeData {
    let sinTable = new Array(256),
      cosTable = new Array(256),
      i,
      angle;
    for (i = 0; i < 256; i += 1) {
      angle = (Math.PI * 2 * i) / 256;
      sinTable[i] = parameters.scale * Math.sin(angle);
      cosTable[i] = parameters.scale * Math.cos(angle);
    }
    return {
      sinTable: sinTable,
      cosTable: cosTable,
    };
  }

  callback(
    x: number,
    y: number,
    parameters: Parameters,
    width: number,
    height: number
  ): Array<number> {
    let angle = (Math.random() * 255) | 0,
      distance = Math.random();

    return [
      x + distance * this.data.sinTable[angle],
      y + distance * this.data.cosTable[angle],
    ];
  }
}

export default DiffuseEffect;
