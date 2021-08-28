import BaseTransformEffect from "../BaseTransform";

interface BeforeData {
  iCentreX: number;
  iCentreY: number;
  radius2: number;
  radius: number;
}

interface Parameters {
  waveLength: number;
  amplitude: number;
  phase: number;
  centreX: number;
  centreY: number;
  radius: number;
}

class WaterEffect extends BaseTransformEffect {
  static getName(): string {
    return "water";
  }

  data: BeforeData = {
    iCentreX: 0,
    iCentreY: 0,
    radius2: 0,
    radius: 0,
  };

  getDefaultParameters(): Parameters {
    return {
      waveLength: 16,
      amplitude: 10,
      phase: 0,
      centreX: 0.5,
      centreY: 0.5,
      radius: 50,
    };
  }

  before(parameters: Parameters, width: number, height: number): BeforeData {
    let iCentreX = width * parameters.centreX,
      iCentreY = height * parameters.centreY,
      radius = parameters.radius,
      radius2;

    if (radius === 0) {
      radius = Math.min(iCentreX, iCentreY);
    }
    radius2 = radius * radius;

    return {
      iCentreX,
      iCentreY,
      radius,
      radius2,
    };
  }

  callback(
    x: number,
    y: number,
    parameters: Parameters,
    width: number,
    height: number
  ): Array<number> {
    let dx = x - this.data.iCentreX,
      dy = y - this.data.iCentreY,
      distance2 = dx * dx + dy * dy,
      distance,
      amount;

    if (distance2 > this.data.radius2) {
      return [x, y];
    }
    distance = Math.sqrt(distance2);
    amount =
      parameters.amplitude *
      Math.sin(
        (distance / parameters.waveLength) * Math.PI * 2 - parameters.phase
      );
    amount *= (parameters.radius - distance) / parameters.radius;
    if (distance !== 0) {
      amount *= parameters.waveLength / distance;
    }
    return [x + dx * amount, y + dy * amount];
  }
}

export default WaterEffect;
