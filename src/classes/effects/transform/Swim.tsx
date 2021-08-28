import BaseTransformEffect from "../BaseTransform";
import noise from "../../../helpers/noise";

interface BeforeData {
  m00: number;
  m01: number;
  m10: number;
  m11: number;
}

interface Parameters {
  scale: number;
  turbulence: number;
  amount: number;
  time: number;
  angle: number;
  stretch: number;
}

class SwimEffect extends BaseTransformEffect {
  static getName(): string {
    return "swim";
  }

  data: BeforeData = {
    m00: 0,
    m01: 0,
    m10: 0,
    m11: 0,
  };

  getDefaultParameters(): Parameters {
    return {
      scale: 32,
      turbulence: 0,
      amount: 1,
      time: 0,
      angle: 0,
      stretch: 1,
    };
  }

  before(parameters: Parameters, width: number, height: number): BeforeData {
    let cos = Math.cos(parameters.angle),
      sin = Math.sin(parameters.angle);

    return {
      m00: cos,
      m01: sin,
      m10: -sin,
      m11: cos,
    };
  }

  callback(
    x: number,
    y: number,
    parameters: Parameters,
    width: number,
    height: number
  ): Array<number> {
    let nx = this.data.m00 * x + this.data.m01 * y,
      ny = this.data.m10 * x + this.data.m11 * y;

    nx /= parameters.scale;
    ny /= parameters.scale * parameters.stretch;

    if (parameters.turbulence === 1) {
      return [
        x + parameters.amount * noise.noise3(nx + 0.5, ny, parameters.time),
        y + parameters.amount * noise.noise3(nx, ny + 0.5, parameters.time),
      ];
    }
    return [
      x +
        parameters.amount *
          noise.turbulence3(
            nx + 0.5,
            ny,
            parameters.turbulence,
            parameters.time
          ),
      y +
        parameters.amount *
          noise.turbulence3(
            nx,
            ny + 0.5,
            parameters.turbulence,
            parameters.time
          ),
    ];
  }
}

export default SwimEffect;
