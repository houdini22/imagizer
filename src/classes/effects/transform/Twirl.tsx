import BaseTransformEffect from "../BaseTransform";

interface BeforeData {
  iCentreX: number;
  iCentreY: number;
  radius: number;
  radius2: number;
}

export interface TwirlParameters {
  angle: number;
  centreX: number;
  centreY: number;
  radius: number;
  radius2: number;
}

class TwirlEffect extends BaseTransformEffect {
  static getName(): string {
    return "twirl";
  }

  data: BeforeData = {
    iCentreX: 0,
    iCentreY: 0,
    radius: 0,
    radius2: 0,
  };

  getDefaultParameters(): TwirlParameters {
    return {
      angle: 0,
      centreX: 0.5,
      centreY: 0.5,
      radius: 100,
      radius2: 100,
    };
  }

  before(
    parameters: TwirlParameters,
    width: number,
    height: number
  ): BeforeData {
    let iCentreX = width * parameters.centreX,
      iCentreY = height * parameters.centreY,
      radius = parameters.radius,
      radius2;

    if (radius === 0) {
      radius = Math.min(iCentreX, iCentreY);
    }
    radius2 = radius * radius;

    return {
      iCentreX: iCentreX,
      iCentreY: iCentreY,
      radius: radius,
      radius2: radius2,
    };
  }

  callback(
    x: number,
    y: number,
    parameters: TwirlParameters,
    width: number,
    height: number
  ): Array<number> {
    let dx = x - this.data.iCentreX,
      dy = y - this.data.iCentreY,
      distance = dx * dx + dy * dy,
      a;

    if (distance > parameters.radius2) {
      return [x, y];
    }

    distance = Math.sqrt(distance);
    a =
      Math.atan2(dy, dx) +
      (parameters.angle * (parameters.radius - distance)) / parameters.radius;

    return [
      this.data.iCentreX + (distance * Math.cos(a)) | 0,
      this.data.iCentreY + (distance * Math.sin(a)) | 0,
    ];
  }
}

export default TwirlEffect;
