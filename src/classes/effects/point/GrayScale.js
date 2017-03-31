import BaseColorEffect from '../BaseColor';

class GrayScaleEffect extends BaseColorEffect {
    static getName() {
        return 'gray-scale';
    }

    callback(pixel, x, y, parameters, width, height) {
        let newRGB = 0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b;
        return {
            r: newRGB,
            g: newRGB,
            b: newRGB,
            a: pixel.a
        };
    }
}

export default GrayScaleEffect;