import Project from './classes/Project';
import Image from './classes/Image';

let imagizer = {
    Project,
    Image
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = imagizer;
}
else {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return imagizer;
        });
    }
    else {
        window.Imagizer = imagizer;
    }
}
