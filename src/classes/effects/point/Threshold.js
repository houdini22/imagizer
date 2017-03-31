import BasePointEffect from '../BasePoint';

class ThresholdEffect extends BasePointEffect {
    static getName() {
        return 'threshold';
    }

    callback(pixel, x, y, parameters, width, height) {
        var grayscale = (pixel.r + pixel.g + pixel.b) / 3;

        if (grayscale >= 127) {
            return {
                r: 255,
                g: 255,
                b: 255,
                a: pixel.a
            };
        }

        return {
            r: 0,
            g: 0,
            b: 0,
            a: pixel.a
        };
    }
}

export default ThresholdEffect;