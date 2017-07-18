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
import Edge from './effects/point/Edge';
import ChannelMix from './effects/point/ChannelMix';
import AutoContrast from './effects/point/AutoContrast';

import Diffuse from './effects/transform/Diffuse';
import Kaleidoscope from './effects/transform/Kaleidoscope';
import Marble from './effects/transform/Marble';
import Pinch from './effects/transform/Pinch';
import Ripple from './effects/transform/Ripple';
import Shear from './effects/transform/Shear';
import Sphere from './effects/transform/Sphere';
import Swim from './effects/transform/Swim';
import Twirl from './effects/transform/Twirl';
import Water from './effects/transform/Water';
import Circle from './effects/transform/Circle';
import Rotate from './effects/transform/Rotate';
import Offset from './effects/transform/Offset';
import Polar from './effects/transform/Polar';
import Perspective from './effects/transform/Perspective';

import AutoWhiteBalance from './effects/custom/AutoWhiteBalance';
import FillColor from './effects/custom/FillColor';
import Flip from './effects/custom/Flip';
import Block from './effects/custom/Block';
import Border from './effects/custom/Border';
import Emboss from './effects/custom/Emboss';
import ComponentStretching from './effects/custom/ComponentStretching';

let availableEffects = {};

function add(_class) {
  if (availableEffects[_class.getName()]) {
    throw `Effect: ${_class.getName()} exists already!`;
  }
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
add(Marble);
add(Pinch);
add(Ripple);
add(Shear);
add(Sphere);
add(Swim);
add(Twirl);
add(Water);
add(Edge);
add(ChannelMix);
add(Circle);
add(Rotate);
add(Offset);
add(Polar);
add(Perspective);
add(AutoContrast);
add(AutoWhiteBalance);
add(FillColor);
add(Flip);
add(Block);
add(Border);
add(Emboss);
add(ComponentStretching);

class EffectsRepository {
  static get(name) {
    return availableEffects[name];
  }
}

export default EffectsRepository;