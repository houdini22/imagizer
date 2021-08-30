import BaseTransformEffect from "../BaseTransform";

interface BeforeData {
  sin: number;
  cos: number;
  icentreX: number;
  icentreY: number;
}

export interface RotateParameters {
  angle: number;
}

class RotateEffect extends BaseTransformEffect {
  static getName(): string {
    return "rotate";
  }

  data: BeforeData = {
    sin: 0,
    cos: 0,
    icentreX: 0,
    icentreY: 0,
  };

  getDefaultParameters(): RotateParameters {
    return {
      angle: Math.PI,
    };
  }

  before(
    parameters: RotateParameters,
    width: number,
    height: number,
    imageData: ImageData
  ): BeforeData {
    return {
      cos: Math.cos(parameters.angle),
      sin: Math.sin(parameters.angle),
      icentreX: width / 2,
      icentreY: height / 2,
    };
  }

  callback(
    x: number,
    y: number,
    parameters: RotateParameters,
    width: number,
    height: number
  ): Array<number> {
    return [
      this.data.cos * (x - this.data.icentreX) -
        this.data.sin * (y - this.data.icentreY) +
        this.data.icentreY,
      this.data.sin * (x - this.data.icentreX) -
        this.data.cos * (y - this.data.icentreY) +
        this.data.icentreY,
    ];
  }
}

export default RotateEffect;
