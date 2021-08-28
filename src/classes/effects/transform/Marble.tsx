import BaseTransformEffect from "../BaseTransform";
import noiseHelper from "../../../helpers/noise";

interface BeforeData {
  sinTable: Array<number>;
  cosTable: Array<number>;
  displacementMap: (x: number, y: number) => number;
}

interface Parameters {
  xScale: number;
  yScale: number;
  amount: number;
  turbulence: number;
}

class MarbleEffect extends BaseTransformEffect {
  static getName(): string {
    return "marble";
  }

  data: BeforeData = {
    sinTable: [],
    cosTable: [],
    displacementMap: (x: number, y: number) => 0,
  };

  getDefaultParameters(): Parameters {
    return {
      xScale: 4,
      yScale: 4,
      amount: 1,
      turbulence: 1,
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
      angle;

    for (let i = 0; i < 256; i += 1) {
      angle = ((Math.PI * 2 * i) / 256) * parameters.turbulence;
      sinTable[i] = -parameters.yScale * Math.sin(angle);
      cosTable[i] = parameters.yScale * Math.cos(angle);
    }
    return {
      sinTable: sinTable,
      cosTable: cosTable,
      displacementMap: function (x, y) {
        let result =
          127 *
          (1 +
            noiseHelper.noise2(x / parameters.xScale, y / parameters.yScale));
        return Math.min(255, Math.max(0, result));
      },
    };
  }

  callback(
    x: number,
    y: number,
    parameters: Parameters,
    width: number,
    height: number
  ): Array<number> {
    let displacement = Math.floor(this.data.displacementMap(x, y));
    return [
      x + this.data.sinTable[displacement],
      y + this.data.cosTable[displacement],
    ];
  }
}

export default MarbleEffect;
