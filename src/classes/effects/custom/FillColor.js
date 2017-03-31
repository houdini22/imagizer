import BaseCustomEffect from '../BaseCustom';
import {
    hexToRGB,
} from '../../../helpers/color'

class FillColorEffect extends BaseCustomEffect {
    static getName() {
        return 'fill-color';
    }

    getDefaultParameters() {
        return {
            color: "transparent"
        };
    }

    callback(width, height, parameters) {
        var x, y, color;

        if (parameters.color === "transparent") {
            color = {
                r: 0,
                g: 0,
                b: 0,
                a: 0
            };
        }
        else {
            color = hexToRGB(parameters.color);
            color.a = 255;
        }

        for (y = 0; y < height; y += 1) {
            for (x = 0; x < width; x += 1) {
                this.setPixel(x, y, color);
            }
        }
    }
}

export default FillColorEffect;