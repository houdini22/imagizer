import Project from './classes/Project';
import Image from './classes/Image';
import {isNode} from './helpers/common';

let imagizer = {
  Project,
  Image
};

if (isNode()) {
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
