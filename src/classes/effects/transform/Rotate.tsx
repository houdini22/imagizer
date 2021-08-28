import BaseTransformEffect from "../BaseTransform";

class RotateEffect extends BaseTransformEffect {
  static getName() {
    return "rotate";
  }

  data = {
    sin: 0,
    cos: 0,
    icentreX: 0,
    icentreY: 0,
  };

  getDefaultParameters() {
    return {
      angle: Math.PI,
    };
  }

  before(parameters, width, height, imageData) {
    return {
      cos: Math.cos(parameters.angle),
      sin: Math.sin(parameters.angle),
      icentreX: width / 2,
      icentreY: height / 2,
    };
  }

  callback(x, y, parameters, width, height) {
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
