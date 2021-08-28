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
    imageData: any
  ): object {
    return {};
  }

  static getName(): string {
    throw "Extend it.";
  }
}

export default BaseEffect;
