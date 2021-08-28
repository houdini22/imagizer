import BaseTransformEffect from "../BaseTransform";

class SphereEffect extends BaseTransformEffect {
  static getName() {
    return "sphere";
  }

  getDefaultParameters() {
    return {
      a: 0,
      b: 0,
      centreX: 0.5,
      centreY: 0.5,
      refractionIndex: 1.5,
    };
  }

  before(parameters, width, height) {
    let icentreX = width * parameters.centreX,
      icentreY = height * parameters.centreY,
      a = parameters.a,
      b = parameters.b,
      a2,
      b2;
    if (a === 0) {
      a = width / 2;
    }
    if (b === 0) {
      b = height / 2;
    }
    a2 = a * a;
    b2 = b * b;

    return {
      icentreX: icentreX,
      icentreY: icentreY,
      a: a,
      b: b,
      a2: a2,
      b2: b2,
    };
  }

  callback(x, y, parameters) {
    let dx = x - this.data.icentreX,
      dy = y - this.data.icentreY,
      x2 = dx * dx,
      y2 = dy * dy,
      rRefraction = 1 / parameters.refractionIndex,
      z = Math.sqrt(
        (1 - x2 / this.data.a2 - y2 / this.data.b2) *
          (this.data.a * this.data.b)
      ),
      z2 = z * z,
      xAngle = Math.acos(dx / Math.sqrt(x2 + z2)),
      angle1 = Math.PI / 2 - xAngle,
      angle2 = Math.asin(Math.sin(angle1) * rRefraction),
      yAngle = Math.acos(dy / Math.sqrt(y2 + z2)),
      ret = new Array(2);

    if (y2 >= this.data.b2 - this.data.b2 / x2 / this.data.a2) {
      return [x, y];
    }

    angle2 = Math.PI / 2 - xAngle - angle2;
    ret[0] = x - Math.tan(angle2) * z;

    angle1 = Math.PI / 2 - yAngle;
    angle2 = Math.asin(Math.sin(angle1) * rRefraction);
    angle2 = Math.PI / 2 - yAngle - angle2;
    ret[1] = y - Math.tan(angle2) * z;
    return ret;
  }
}

export default SphereEffect;
