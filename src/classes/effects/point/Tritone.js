import BasePointEffect from '../BasePoint';
import {mixColors} from '../../../helpers/color';

class TritoneEffect extends BasePointEffect {
  static getName() {
    return 'tritone';
  }

  getDefaultParameters() {
    return {
      shadowColor: {
        r: 0,
        g: 0,
        b: 0,
        a: 255
      },
      midColor: {
        r: 136,
        g: 136,
        b: 136,
        a: 255
      },
      highColor: {
        r: 255,
        g: 255,
        b: 255,
        a: 255
      }
    };
  }

  before(parameters) {
    let lut = [],
      i, t;

    for (i = 0; i < 128; i += 1) {
      t = i / 127;
      lut[i] = mixColors(t, parameters.shadowColor, parameters.midColor);
    }
    for (i = 128; i < 256; i += 1) {
      t = (i - 127) / 128;
      lut[i] = mixColors(t, parameters.midColor, parameters.highColor);
    }
    return {
      lut: lut
    };
  }

  callback(pixel, x, y, parameters, width, height) {
    let brightness = Math.floor((pixel.r + pixel.g + pixel.b) / 3);
    return this.data.lut[brightness];
  }
}

export default TritoneEffect;