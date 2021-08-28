import BaseTransformEffect from "../BaseTransform";
import noiseHelper from "../../../helpers/noise";

class MarbleEffect extends BaseTransformEffect {
  static getName() {
    return "marble";
  }

  data = {
    sinTable: {},
    cosTable: {},
    displacementMap: (x: number, y: number) => 0,
  };

  getDefaultParameters() {
    return {
      xScale: 4,
      yScale: 4,
      amount: 1,
      turbulence: 1,
    };
  }

  before(parameters, width, height, imageData) {
    let sinTable = new Array(256),
      cosTable = new Array(256),
      i = 0,
      angle;

    for (i = 0; i < 256; i += 1) {
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

  callback(x, y, parameters) {
    let displacement = Math.floor(this.data.displacementMap(x, y));
    return [
      x + this.data.sinTable[displacement],
      y + this.data.cosTable[displacement],
    ];
  }
}

export default MarbleEffect;
