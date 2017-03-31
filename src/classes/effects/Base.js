class BaseEffect {
    constructor(opts = {}) {
        this.opts = opts;
    }

    getDefaultParameters() {
        return {};
    }

    static getName() {
        throw 'Extend it.';
    }
}

export default BaseEffect;