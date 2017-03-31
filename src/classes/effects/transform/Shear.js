import BaseTransformEffect from '../BaseTransform';
import {
    triangle,
    mod
} from '../../../helpers/common';
import noise from '../../../helpers/noise';

class ShearEffect extends BaseTransformEffect {
    static getName() {
        return 'shear';
    }

    getDefaultParameters() {
        return {
            xAngle: 0,
            yAngle: 0,
            xOffset: 0,
            yOffset: 0
        };
    }

    before(parameters, width, height) {
        return {
            shx: Math.sin(parameters.xAngle),
            shy: Math.sin(parameters.yAngle)
        };
    }

    callback(x, y, parameters) {
        return [
            x + parameters.xOffset + (y * this.data.shx),
            y + parameters.yOffset + (x * this.data.shy)
        ];
    }
}

export default ShearEffect;