import GrayScale from './effects/point/GrayScale';
import Sepia from './effects/point/Sepia';
import Contrast from './effects/point/Contrast';
import Brightness from './effects/point/Brightness';
import Diffusion from './effects/point/Diffusion';
import Dither from './effects/point/Dither';
import Exposure from './effects/point/Exposure';
import Gain from './effects/point/Gain';
import Gamma from './effects/point/Gamma';
import HSBAdjust from './effects/point/HSBAdjust';
import InvertAlpha from './effects/point/InvertAlpha';
import Invert from './effects/point/Invert';
import Levels from './effects/point/Levels';
import Rescale from './effects/point/Rescale';
import Solarize from './effects/point/Solarize';
import Threshold from './effects/point/Threshold';
import Tritone from './effects/point/Tritone';
import Dissolve from './effects/point/Dissolve';

import Diffuse from './effects/transform/Diffuse';
import Kaleidoscope from './effects/transform/Kaleidoscope';

let availableEffects = {};

function add(_class) {
    availableEffects[_class.getName()] = _class;
}

add(GrayScale);
add(Sepia);
add(Contrast);
add(Brightness);
add(Diffusion);
add(Dither);
add(Exposure);
add(Gain);
add(Gamma);
add(HSBAdjust);
add(InvertAlpha);
add(Invert);
add(Levels);
add(Rescale);
add(Solarize);
add(Threshold);
add(Tritone);
add(Diffuse);
add(Dissolve);
add(Kaleidoscope);

class EffectsRepository {
    static get(name) {
        return availableEffects[name];
    }
}

export default EffectsRepository;