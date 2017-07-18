import BaseTransformEffect from '../BaseTransform';
import noise from '../../../helpers/noise';

class SwimEffect extends BaseTransformEffect {
  static getName() {
    return 'swim';
  }

  getDefaultParameters() {
    return {
      scale: 32,
      turbulence: 0,
      amount: 1,
      time: 0,
      angle: 0,
      stretch: 1
    };
  }

  before(parameters, width, height) {
    var cos = Math.cos(parameters.angle),
      sin = Math.sin(parameters.angle);

    return {
      m00: cos,
      m01: sin,
      m10: -sin,
      m11: cos
    };
  }

  callback(x, y, parameters) {
    var nx = this.data.m00 * x + this.data.m01 * y,
      ny = this.data.m10 * x + this.data.m11 * y;

    nx /= parameters.scale;
    ny /= parameters.scale * parameters.stretch;

    if (parameters.turbulence === 1) {
      return [
        x + parameters.amount * noise.noise3(nx + 0.5, ny, parameters.time),
        y + parameters.amount * noise.noise3(nx, ny + 0.5, parameters.time)
      ];
    }
    return [
      x + parameters.amount * noise.turbulence3(nx + 0.5, ny, parameters.turbulence, parameters.time),
      y + parameters.amount * noise.turbulence3(nx, ny + 0.5, parameters.turbulence, parameters.time)
    ];
  }
}

export default SwimEffect;