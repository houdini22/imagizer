class BaseEffect {
  opts: object = {};

  constructor(opts: object = {}) {
    this.opts = opts;
  }

  getDefaultParameters(): object {
    return {};
  }

  before(
    parameters: object,
    width: number,
    height: number,
    imageData: ImageData
  ): object {
    return {};
  }

  static getName(): string {
    throw "Extend it.";
  }

  run(imageData: ImageData, parameters: object): ImageData {
    return null;
  }
}

export default BaseEffect;
