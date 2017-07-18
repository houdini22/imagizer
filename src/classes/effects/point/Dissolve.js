import BasePointEffect from '../BasePoint';
import {smoothStep} from '../../../helpers/common';

class DissolveEffect extends BasePointEffect {
  static getName() {
    return 'dissolve';
  }

  getDefaultParameters() {
    return {
      density: 1,
      softness: 0
    };
  }

  before(parameters, width, height, imageData) {
    let d = (1 - parameters.density) * (1 + parameters.softness);
    return {
      minDensity: d - parameters.softness,
      maxDensity: d
    };
  }

  callback(pixel, x, y, parameters, width, height) {
    let v = Math.random(),
      f = smoothStep(this.data.minDensity, this.data.maxDensity, v);
    pixel.a = pixel.a * f;
    return pixel;
  }
}

export default DissolveEffect;