import BaseTransformEffect from "../BaseTransform";
import { triangle } from "../../../helpers/common";

class KaleidoscopeEffect extends BaseTransformEffect {
  static getName() {
    return "kaleidoscope";
  }

  getDefaultParameters() {
    return {
      centreX: 0.5,
      centreY: 0.5,
      angle: 0,
      angle2: 0,
      sides: 3,
      radius: 0,
    };
  }

  before(parameters, width, height, imageData) {
    return {
      icentreX: width * parameters.centreX,
      icentreY: height * parameters.centreY,
    };
  }

  callback(x, y, parameters) {
    let dx = x - this.data.icentreX,
      dy = y - this.data.icentreY,
      r = Math.sqrt(dx * dx + dy * dy),
      theta = Math.atan2(dy, dx) - parameters.angle - parameters.angle2;

    theta = triangle((theta / Math.PI) * parameters.sides * 0.5);

    if (parameters.radius !== 0) {
      let c = Math.cos(theta),
        radiusC = parameters.radius / c;
      r = radiusC * triangle(r / radiusC);
    }

    theta += parameters.angle;

    return [
      this.data.icentreX + r * Math.cos(theta),
      this.data.icentreY + r * Math.sin(theta),
    ];
  }
}

export default KaleidoscopeEffect;
