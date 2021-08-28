class BaseEffect {
  opts = {};

  constructor(opts: object = {}) {
    this.opts = opts;
  }

  getDefaultParameters() {
    return {};
  }

  before(parameters: object, width: number, height: number, imageData: any) {
    return {};
  }

  static getName() {
    throw "Extend it.";
  }
}

export default BaseEffect;
