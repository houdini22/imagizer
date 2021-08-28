import BaseTransformEffect from "../BaseTransform";
import { mod } from "../../../helpers/common";

interface Parameters {
  radius: number;
  height: number;
  angle: number;
  spreadAngle: number;
  centreX: number;
  centreY: number;
}

interface BeforeData {
  icentreX: number;
  icentreY: number;
  width: number;
}

class CircleEffect extends BaseTransformEffect {
  static getName(): string {
    return "circle";
  }

  data: BeforeData = {
    icentreX: 0,
    icentreY: 0,
    width: 0,
  };

  getDefaultParameters(): Parameters {
    return {
      radius: 10,
      height: 20,
      angle: 0,
      spreadAngle: Math.PI,
      centreX: 0.5,
      centreY: 0.5,
    };
  }

  before(
    parameters: Parameters,
    width: number,
    height: number,
    imageData: ImageData
  ): BeforeData {
    return {
      icentreX: width * parameters.centreX,
      icentreY: height * parameters.centreY,
      width: --width,
    };
  }

  callback(
    x: number,
    y: number,
    parameters: Parameters,
    width: number,
    height: number
  ): Array<number> {
    let dx = x - this.data.icentreX,
      dy = y - this.data.icentreX,
      theta = Math.atan2(-dy, -dx) + parameters.angle,
      r = Math.sqrt(dx * dx + dy * dy);

    theta = mod(theta, 2 * Math.PI);

    return [
      (this.data.width * theta) / parameters.spreadAngle + 0.00001,
      height * (1 - (r - parameters.radius) / (height + 0.00001)),
    ];
  }
}

export default CircleEffect;
