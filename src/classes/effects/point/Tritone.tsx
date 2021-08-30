import BasePointEffect from "../BasePoint";
import { mixColors } from "../../../helpers/color";

export interface TritoneParameters {
  shadowColor: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  midColor: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  highColor: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}

interface BeforeData {
  lut: Array<{
    r: number;
    g: number;
    b: number;
    a: number;
  }>;
}

class TritoneEffect extends BasePointEffect {
  static getName(): string {
    return "tritone";
  }

  data: BeforeData = {
    lut: [],
  };

  getDefaultParameters(): TritoneParameters {
    return {
      shadowColor: {
        r: 0,
        g: 0,
        b: 0,
        a: 255,
      },
      midColor: {
        r: 136,
        g: 136,
        b: 136,
        a: 255,
      },
      highColor: {
        r: 255,
        g: 255,
        b: 255,
        a: 255,
      },
    };
  }

  before(parameters: TritoneParameters): BeforeData {
    let lut = [],
      t;

    for (let i = 0; i < 128; i += 1) {
      t = i / 127;
      lut[i] = mixColors(t, parameters.shadowColor, parameters.midColor);
    }
    for (let i = 128; i < 256; i += 1) {
      t = (i - 127) / 128;
      lut[i] = mixColors(t, parameters.midColor, parameters.highColor);
    }
    return {
      lut: lut,
    };
  }

  callback(
    pixel: {
      r: number;
      g: number;
      b: number;
      a: number;
    },
    x: number,
    y: number,
    parameters: object,
    width: number,
    height: number
  ): {
    r: number;
    g: number;
    b: number;
    a: number;
  } {
    const brightness = Math.floor((pixel.r + pixel.g + pixel.b) / 3);
    return this.data.lut[brightness];
  }
}

export default TritoneEffect;
