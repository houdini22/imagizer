import BaseTransformEffect from "../BaseTransform";

interface Parameters {
  angle: number;
  centreX: number;
  centreY: number;
  radius: number;
  amount: number;
}

interface BeforeData {
  icentreX: number;
  icentreY: number;
  radius2: number;
  radius: number;
}

class PinchEffect extends BaseTransformEffect {
  static getName(): string {
    return "pinch";
  }

  data: BeforeData = {
    icentreX: 0,
    icentreY: 0,
    radius2: 0,
    radius: 0,
  };

  getDefaultParameters(): Parameters {
    return {
      angle: 0,
      centreX: 0.5,
      centreY: 0.5,
      radius: 100,
      amount: 0.5,
    };
  }

  before(
    parameters: Parameters,
    width: number,
    height: number,
    imageData: ImageData
  ): BeforeData {
    let icentreX = width * parameters.centreX,
      icentreY = height * parameters.centreY,
      radius = parameters.radius,
      radius2;
    if (radius === 0) {
      radius = Math.min(icentreX, icentreY);
    }
    radius2 = radius * radius;
    return {
      icentreX: icentreX,
      icentreY: icentreY,
      radius: radius,
      radius2: radius2,
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
      dy = y - this.data.icentreY,
      distance = dx * dx + dy * dy,
      d,
      t,
      e,
      a,
      s,
      c;

    if (distance > this.data.radius2 || distance === 0) {
      return [x, y];
    }
    d = Math.sqrt(distance / this.data.radius2);
    t = Math.pow(Math.sin(Math.PI * 0.5 * d), -parameters.amount);

    dx *= t;
    dy *= t;

    e = 1 - d;
    a = parameters.angle * e * e;

    s = Math.sin(a);
    c = Math.cos(a);

    return [
      this.data.icentreX + c * dx - s * dy,
      this.data.icentreY + s * dx + c * dy,
    ];
  }
}

export default PinchEffect;
