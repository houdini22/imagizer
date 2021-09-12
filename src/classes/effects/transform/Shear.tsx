import BaseTransformEffect from "../BaseTransform";

export interface ShearParameters {
  xAngle: number;
  yAngle: number;
  xOffset: number;
  yOffset: number;
}

interface BeforeData {
  shx: number;
  shy: number;
}

class ShearEffect extends BaseTransformEffect {
  static getName(): string {
    return "shear";
  }

  data: BeforeData = {
    shx: 0,
    shy: 0,
  };

  getDefaultParameters(): ShearParameters {
    return {
      xAngle: 0,
      yAngle: 0,
      xOffset: 0,
      yOffset: 0,
    };
  }

  before(
    parameters: ShearParameters,
    width: number,
    height: number
  ): BeforeData {
    return {
      shx: Math.sin(parameters.xAngle),
      shy: Math.sin(parameters.yAngle),
    };
  }

  callback(
    x: number,
    y: number,
    parameters: ShearParameters,
    width: number,
    height: number
  ): Array<number> {
    return [
      (x + parameters.xOffset + y * this.data.shx) | 0,
      (y + parameters.yOffset + x * this.data.shy) | 0,
    ];
  }
}

export default ShearEffect;
