import BaseTransformEffect from "../BaseTransform";

export interface OffsetParameters {
  xOffset: number;
  yOffset: number;
  wrap: boolean;
}

class RotateEffect extends BaseTransformEffect {
  static getName(): string {
    return "offset";
  }

  getDefaultParameters(): OffsetParameters {
    return {
      xOffset: 100,
      yOffset: 100,
      wrap: true,
    };
  }

  callback(
    x: number,
    y: number,
    parameters: OffsetParameters,
    width: number,
    height: number
  ): Array<number> {
    if (parameters.wrap) {
      return [
        (x + width - parameters.xOffset) % width,
        (y + height - parameters.yOffset) % height,
      ];
    } else {
      return [x - parameters.xOffset, y - parameters.yOffset];
    }
  }
}

export default RotateEffect;
