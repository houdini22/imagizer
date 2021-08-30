import BaseTransformEffect from "../BaseTransform";
import { triangle } from "../../../helpers/common";

interface BeforeData {
  icentreX: number;
  icentreY: number;
}

export interface KaleidoscopeParameters {
  centreX: number;
  centreY: number;
  angle: number;
  angle2: number;
  sides: number;
  radius: number;
}

class KaleidoscopeEffect extends BaseTransformEffect {
  static getName(): string {
    return "kaleidoscope";
  }

  data: BeforeData = {
    icentreX: 0,
    icentreY: 0,
  };

  getDefaultParameters(): KaleidoscopeParameters {
    return {
      centreX: 0.5,
      centreY: 0.5,
      angle: 0,
      angle2: 0,
      sides: 3,
      radius: 0,
    };
  }

  before(
    parameters: KaleidoscopeParameters,
    width: number,
    height: number,
    imageData: ImageData
  ): BeforeData {
    return {
      icentreX: width * parameters.centreX,
      icentreY: height * parameters.centreY,
    };
  }

  callback(
    x: number,
    y: number,
    parameters: KaleidoscopeParameters,
    width: number,
    height: number
  ): Array<number> {
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
