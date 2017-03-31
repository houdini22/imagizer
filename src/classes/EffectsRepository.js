import GrayScale from './effects/point/GrayScale';
import Sepia from './effects/point/Sepia';

let availableEffects = {};

function add(name, _class) {
    availableEffects[name] = _class;
}

add('gray-scale', GrayScale);
add('sepia', Sepia);

class EffectsRepository {
    static get(name) {
        return availableEffects[name];
    }
}

export default EffectsRepository;