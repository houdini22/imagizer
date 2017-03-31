import BaseColorEffect from '../BaseColor';

class GrayScaleEffect extends BaseColorEffect {
    static getName() {
        return 'sepia';
    }

    getDefaultParameters() {
        return {
            sepiaValue: 4
        };
    }

    callback(pixel, x, y, parameters, width, height) {
        let tmp = 0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b;

        pixel.r = tmp + 2 * parameters.sepiaValue;
        pixel.g = tmp + parameters.sepiaValue;
        pixel.b = tmp;

        return pixel;
    }
}

export default GrayScaleEffect;