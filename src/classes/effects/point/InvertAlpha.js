import BasePointEffect from '../BasePoint';

class InvertAlphaEffect extends BasePointEffect {
    static getName() {
        return 'invert-alpha';
    }

    callback(pixel, x, y, parameters, width, height) {
        pixel.a = 255 - pixel.a;
        return pixel;
    }
}

export default InvertAlphaEffect;