class BaseEffect {
  constructor(opts = {}) {
    this.opts = opts;
  }

  getDefaultParameters() {
    return {};
  }

  before(parameters, width, height, imageData) {
    return {};
  }

  static getName() {
    throw "Extend it.";
  }
}

export default BaseEffect;
