import BaseTransformEffect from "../BaseTransform";

interface Parameters {
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

  getDefaultParameters(): Parameters {
    return {
      xAngle: 0,
      yAngle: 0,
      xOffset: 0,
      yOffset: 0,
    };
  }

  before(parameters: Parameters, width: number, height: number): BeforeData {
    return {
      shx: Math.sin(parameters.xAngle),
      shy: Math.sin(parameters.yAngle),
    };
  }

  callback(
    x: number,
    y: number,
    parameters: Parameters,
    width: number,
    height: number
  ): Array<number> {
    return [
      x + parameters.xOffset + y * this.data.shx,
      y + parameters.yOffset + x * this.data.shy,
    ];
  }
}

export default ShearEffect;
