import BasePointEffect from "../BasePoint";

class ChannelMixEffect extends BasePointEffect {
  static getName() {
    return "channel-mix";
  }

  getDefaultParameters() {
    return {
      blueGreen: 1,
      redBlue: 1,
      greenRed: 1,
      intoR: 1,
      intoG: 1,
      intoB: 1,
    };
  }

  callback(pixel, x, y, parameters, width, height) {
    const { r, g, b } = pixel;

    return {
      r:
        ((parameters.intoR *
          (parameters.blueGreen * g + (255 - parameters.blueGreen) * b)) /
          255 +
          (255 - parameters.intoR) * r) /
        255,
      g:
        ((parameters.intoG *
          (parameters.redBlue * g + (255 - parameters.redBlue) * r)) /
          255 +
          (255 - parameters.intoG) * g) /
        255,
      b:
        ((parameters.intoB *
          (parameters.greenRed * g + (255 - parameters.greenRed) * g)) /
          255 +
          (255 - parameters.intoB) * b) /
        255,
      a: pixel.a,
    };
  }
}

export default ChannelMixEffect;
