(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 62);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_extend__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_extend___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_extend__);



class BasePointEffect extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */] {
  callback(pixel, x, y, parameters, width, height) {
    throw "Extend it."
  }

  run(imageData, parameters) {

    parameters = __WEBPACK_IMPORTED_MODULE_1_extend___default()(true, {}, this.getDefaultParameters(), parameters);

    let x, y,
      firstPixelIndex,
      result,
      imageDataCopy = new Uint8ClampedArray(imageData.data), // copy image data
      /**
       * Get ImageData array index from x and y position
       * @param x
       * @param y
       * @returns {number}
       */
      getIndex = function getIndex(x, y) {
        return y * imageData.width * 4 + x * 4;
      },
      normalizePixelValue = function (value) {
        return Math.min(Math.max(value, 0), 255) | 0;
      },
      sandbox = { // object invoked as this in effect callback
        /**
         * Get changed pixel
         * @param {int} x
         * @param {int} y
         * @returns {{r: *, g: *, b: *, a: *}}
         */
        getPixel: function (x, y) {
          let index = getIndex(x, y);
          return {
            r: imageDataCopy[index + 0],
            g: imageDataCopy[index + 1],
            b: imageDataCopy[index + 2],
            a: imageDataCopy[index + 3]
          };
        },
        /**
         * Get original pixel.
         * @param {int} x
         * @param {int} y
         * @returns {{r: *, g: *, b: *, a: *}}
         */
        getOriginalPixel: function (x, y) {
          let index = getIndex(x, y);
          return {
            r: imageData.data[index + 0],
            g: imageData.data[index + 1],
            b: imageData.data[index + 2],
            a: imageData.data[index + 3]
          };
        },
        /**
         * Set new pixel
         * @param {int} x
         * @param {int} y
         * @param {object} rgba
         */
        setPixel: function (x, y, rgba) {
          let index = getIndex(x, y);
          imageDataCopy[index + 0] = normalizePixelValue(rgba.r);
          imageDataCopy[index + 1] = normalizePixelValue(rgba.g);
          imageDataCopy[index + 2] = normalizePixelValue(rgba.b);
          imageDataCopy[index + 3] = normalizePixelValue(rgba.a);
        },
        /**
         * Data created by effect init function
         */
        data: null,
        /**
         * ImageData width
         */
        width: imageData.width,
        /**
         * ImageData height
         */
        height: imageData.height
      };

    sandbox.data = this.before.call(sandbox, parameters, imageData.width, imageData.height, imageData);

    for (y = 0; y < imageData.height; y += 1) {
      for (x = 0; x < imageData.width; x += 1) {
        firstPixelIndex = getIndex(x, y);

        result = this.callback.call(sandbox,
          {
            r: imageDataCopy[firstPixelIndex + 0],
            g: imageDataCopy[firstPixelIndex + 1],
            b: imageDataCopy[firstPixelIndex + 2],
            a: imageDataCopy[firstPixelIndex + 3]
          },
          x,
          y,
          parameters,
          imageData.width,
          imageData.height
        );

        if (typeof result === "object") {
          imageDataCopy[firstPixelIndex + 0] = normalizePixelValue(result.r);
          imageDataCopy[firstPixelIndex + 1] = normalizePixelValue(result.g);
          imageDataCopy[firstPixelIndex + 2] = normalizePixelValue(result.b);
          imageDataCopy[firstPixelIndex + 3] = normalizePixelValue(result.a);
        }
      }
    }

    imageData.data.set(imageDataCopy);
    return imageData;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BasePointEffect);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_extend__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_extend___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_extend__);



class BaseTransformEffect extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */] {
  callback(pixel, x, y, parameters, width, height) {
    throw "Extend it."
  }

  run(imageData, parameters) {

    parameters = __WEBPACK_IMPORTED_MODULE_1_extend___default()(true, {}, this.getDefaultParameters(), parameters);

    let x, y,
      normalizePixelValue = function (value) {
        return Math.min(Math.max(value, 0), 255) | 0;
      },
      sandbox = {
        data: null
      },
      imageDataCopy = new Uint8ClampedArray(imageData.data);

    sandbox.data = this.before.call(sandbox, parameters, imageData.width, imageData.height, imageData);

    for (y = 0; y < imageData.height; y += 1) {
      for (x = 0; x < imageData.width; x += 1) {
        var newXY = this.callback.call(sandbox, x, y, parameters, imageData.width, imageData.height),
          newX = normalizePixelValue(newXY[0]),
          newY = normalizePixelValue(newXY[1]),
          oldPixelIndex = y * imageData.width * 4 + x * 4,
          newPixelIndex = newY * imageData.width * 4 + newX * 4;

        imageDataCopy[oldPixelIndex + 0] = imageData.data[newPixelIndex + 0];
        imageDataCopy[oldPixelIndex + 1] = imageData.data[newPixelIndex + 1];
        imageDataCopy[oldPixelIndex + 2] = imageData.data[newPixelIndex + 2];
        imageDataCopy[oldPixelIndex + 3] = imageData.data[newPixelIndex + 3];
      }
    }

    imageData.data.set(imageDataCopy);
    return imageData;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BaseTransformEffect);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = mergeImageData;
/* harmony export (immutable) */ __webpack_exports__["c"] = mergePixelCallback;
/* harmony export (immutable) */ __webpack_exports__["h"] = cropImageData;
/* harmony export (immutable) */ __webpack_exports__["e"] = mod;
/* harmony export (immutable) */ __webpack_exports__["f"] = triangle;
/* harmony export (immutable) */ __webpack_exports__["g"] = smoothStep;
/* harmony export (immutable) */ __webpack_exports__["d"] = brightness;
/* harmony export (immutable) */ __webpack_exports__["a"] = isNode;
let blendingModes = {
  lighten: function (bottomPixel, topPixel) {
    return topPixel > bottomPixel ? topPixel : bottomPixel;
  },
  darken: function (bottomPixel, topPixel) {
    return topPixel > bottomPixel ? bottomPixel : topPixel;
  },
  multiply: function (bottomPixel, topPixel) {
    return bottomPixel * topPixel / 255;
  },
  average: function (bottomPixel, topPixel) {
    return bottomPixel + topPixel / 2;
  },
  add: function (bottomPixel, topPixel) {
    return Math.min(255, bottomPixel + topPixel);
  },
  subtract: function (bottomPixel, topPixel) {
    return bottomPixel + topPixel < 255 ? 0 : bottomPixel + topPixel - 255;
  },
  difference: function (bottomPixel, topPixel) {
    return Math.abs(bottomPixel - topPixel);
  },
  negation: function (bottomPixel, topPixel) {
    return 255 - Math.abs(255 - bottomPixel - topPixel);
  },
  screen: function (bottomPixel, topPixel) {
    return 255 - (((255 - bottomPixel) * (255 - topPixel)) >> 8);
  },
  exclusion: function (bottomPixel, topPixel) {
    return bottomPixel + topPixel - 2 * bottomPixel * topPixel / 255;
  },
  overlay: function (bottomPixel, topPixel) {
    return topPixel < 128
      ? (2 * bottomPixel * topPixel / 255)
      : (255 - 2 * (255 - bottomPixel) * (255 - topPixel) / 255);
  },
  softLight: function (bottomPixel, topPixel) {
    return topPixel < 128
      ? (2 * ((bottomPixel >> 1) + 64)) * (topPixel / 255)
      : 255 - (2 * (255 - (( bottomPixel >> 1) + 64)) * (255 - topPixel) / 255);
  },
  hardLight: function (bottomPixel, topPixel) {
    return blendingModes.softLight(topPixel, bottomPixel);
  },
  colorDodge: function (bottomPixel, topPixel) {
    return topPixel == 255 ? topPixel : Math.min(255, ((bottomPixel << 8 ) / (255 - topPixel)));
  },
  colorBurn: function (bottomPixel, topPixel) {
    return topPixel == 0 ? topPixel : Math.max(0, (255 - ((255 - bottomPixel) << 8 ) / topPixel));
  },
  linearDodge: function (bottomPixel, topPixel) {
    return blendingModes.add(bottomPixel, topPixel);
  },
  linearBurn: function (bottomPixel, topPixel) {
    return blendingModes.subtract(bottomPixel, topPixel);
  },
  linearLight: function (bottomPixel, topPixel) {
    return topPixel < 128
      ? blendingModes.linearBurn(bottomPixel, 2 * topPixel)
      : blendingModes.linearDodge(bottomPixel, (2 * (topPixel - 128)));
  },
  vividLight: function (bottomPixel, topPixel) {
    return topPixel < 128
      ? blendingModes.colorBurn(bottomPixel, 2 * topPixel)
      : blendingModes.colorDodge(bottomPixel, (2 * (topPixel - 128)));
  },
  pinLight: function (bottomPixel, topPixel) {
    return topPixel < 128
      ? blendingModes.darken(bottomPixel, 2 * topPixel)
      : blendingModes.lighten(bottomPixel, (2 * (topPixel - 128)));
  },
  hardMix: function (bottomPixel, topPixel) {
    return blendingModes.vividLight(bottomPixel, topPixel) < 128 ? 0 : 255;
  },
  reflect: function (bottomPixel, topPixel) {
    return topPixel == 255 ? topPixel : Math.min(255, (bottomPixel * bottomPixel / (255 - topPixel)))
  },
  glow: function (bottomPixel, topPixel) {
    return blendingModes.reflect(topPixel, bottomPixel);
  },
  phoenix: function (bottomPixel, topPixel) {
    return Math.min(bottomPixel, topPixel) - Math.max(bottomPixel, topPixel) + 255
  }
};

function mergeImageData(bottom, top, pixelCallback) {
  let x, y,
    xx, yy,
    firstOldPixelIndex, firstNewPixelIndex,
    pixelResult;

  for (y = top.y, yy = 0; y < bottom.height && yy < top.height; y += 1, yy += 1) {
    for (x = top.x, xx = 0; x < bottom.width && xx < top.width; x += 1, xx += 1) {
      if (xx < top.width && yy < top.height) // overwrite only rect-size of current layer
      {
        firstOldPixelIndex = y * bottom.width * 4 + x * 4;
        firstNewPixelIndex = yy * top.width * 4 + xx * 4;

        pixelResult = pixelCallback({
          r: bottom.imageData.data[firstOldPixelIndex + 0],
          g: bottom.imageData.data[firstOldPixelIndex + 1],
          b: bottom.imageData.data[firstOldPixelIndex + 2],
          a: bottom.imageData.data[firstOldPixelIndex + 3]
        }, {
          r: top.imageData.data[firstNewPixelIndex + 0],
          g: top.imageData.data[firstNewPixelIndex + 1],
          b: top.imageData.data[firstNewPixelIndex + 2],
          a: top.imageData.data[firstNewPixelIndex + 3]
        }, x, y, {
          blendingMode: top.blendingMode
        });

        if (pixelResult !== false) // if skip change
        {
          bottom.imageData.data[firstOldPixelIndex + 0] = pixelResult.r;
          bottom.imageData.data[firstOldPixelIndex + 1] = pixelResult.g;
          bottom.imageData.data[firstOldPixelIndex + 2] = pixelResult.b;
          bottom.imageData.data[firstOldPixelIndex + 3] = pixelResult.a;
        }
      }
    }
  }
  return bottom.imageData;
}

function mergePixelCallback(bottomPixel, topPixel, x, y, parameters) {
  if (topPixel.a === 0) {
    return false; // skip change - opacity is full
  }

  // alpha compositing
  let mergedR,
    mergedG,
    mergedB,
    mergedA = topPixel.a / 255,
    rootA = bottomPixel.a / 255 * (1 - mergedA),
    outA = (mergedA + bottomPixel.a * (1 - mergedA) / 255);

  switch (parameters.blendingMode) {
    case "lighten":
    case "darken":
    case "multiply":
    case "average":
    case "add":
    case "subtract":
    case "difference":
    case "negation":
    case "screen":
    case "exclusion":
    case "overlay":
    case "softLight":
    case "hardLight":
    case "colorDodge":
    case "colorBurn":
    case "linearDodge":
    case "linearBurn":
    case "linearLight":
    case "vividLight":
    case "pinLight":
    case "hardMix":
    case "reflect":
    case "glow":
    case "phoenix":
      topPixel.r = blendingModes[parameters.blendingMode](bottomPixel.r, topPixel.r);
      topPixel.g = blendingModes[parameters.blendingMode](bottomPixel.g, topPixel.g);
      topPixel.b = blendingModes[parameters.blendingMode](bottomPixel.b, topPixel.b);
      break;

    default:
      break;
  }

  let rootR = bottomPixel.r;
  let rootG = bottomPixel.g;
  let rootB = bottomPixel.b;

  mergedR = topPixel.r * mergedA + rootR * rootA;
  mergedG = topPixel.g * mergedA + rootG * rootA;
  mergedB = topPixel.b * mergedA + rootB * rootA;

  mergedR = outA == 0 ? 0 : mergedR / outA;
  mergedG = outA == 0 ? 0 : mergedG / outA;
  mergedB = outA == 0 ? 0 : mergedB / outA;

  return {
    r: Math.min(Math.max(0, mergedR), 255) | 0,
    g: Math.min(Math.max(0, mergedG), 255) | 0,
    b: Math.min(Math.max(0, mergedB), 255) | 0,
    a: (255 * outA) | 0
  }
}

function cropImageData(oldImageData, newImageData, startX, startY, width, height) {
  let oldWidth = oldImageData.width,
    newWidth = newImageData.width,
    x, y, xx, yy,
    firstOldPixelIndex, firstNewPixelIndex;

  for (y = startY, yy = 0; y < startY + height && yy < height; y += 1, yy += 1) {
    for (x = startX, xx = 0; x < startX + width && xx < width; x += 1, xx += 1) {
      firstOldPixelIndex = y * oldWidth * 4 + x * 4;
      firstNewPixelIndex = yy * newWidth * 4 + xx * 4;

      newImageData.data[firstNewPixelIndex] = oldImageData.data[firstOldPixelIndex];
      newImageData.data[firstNewPixelIndex + 1] = oldImageData.data[firstOldPixelIndex + 1];
      newImageData.data[firstNewPixelIndex + 2] = oldImageData.data[firstOldPixelIndex + 2];
      newImageData.data[firstNewPixelIndex + 3] = oldImageData.data[firstOldPixelIndex + 3];
    }
  }

  return newImageData;
}

function mod(a, b) {
  var n = Math.floor(a / b);
  a -= n * b;
  if (a < 0) {
    return a + b;
  }
  return a;
}

function triangle(x) {
  var r = mod(x, 1);
  return 2 * (r < 0.5 ? r : 1 - r);
}

function smoothStep(a, b, x) {
  if (x < a) {
    return 0;
  }
  if (x >= b) {
    return 1;
  }
  x = (x - a) / (b - a);
  return x * x * (3 - 2 * x);
}

function brightness(pixel) {
  return (pixel.r + pixel.g + pixel.b) / 3;
}

function isNode() {
  return typeof window == 'undefined';
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_extend__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_extend___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_extend__);



class BaseCustomEffect extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */] {
  callback(pixel, x, y, parameters, width, height) {
    throw "Extend it."
  }

  run(imageData, parameters) {

    parameters = __WEBPACK_IMPORTED_MODULE_1_extend___default()(true, {}, this.getDefaultParameters(), parameters);

    var imageDataCopy = new Uint8ClampedArray(imageData.data), // copy image data
      /**
       * Get ImageData array index from x and y position
       * @param x
       * @param y
       * @returns {number}
       */
      getIndex = function getIndex(x, y) {
        return y * imageData.width * 4 + x * 4;
      },
      normalizePixelValue = function (value) {
        return Math.min(Math.max(value, 0), 255) | 0;
      },
      sandbox = { // object invoked as this in effect callback
        /**
         * Get changed pixel
         * @param {int} x
         * @param {int} y
         * @returns {{r: *, g: *, b: *, a: *}}
         */
        getPixel: function (x, y) {
          var index = getIndex(x, y);
          return {
            r: imageDataCopy[index + 0],
            g: imageDataCopy[index + 1],
            b: imageDataCopy[index + 2],
            a: imageDataCopy[index + 3]
          };
        },
        /**
         * Get pixel by its index
         * @param index
         */
        getOriginalPixelByIndex: function (index) {
          index *= 4;
          return {
            r: imageData.data[index],
            g: imageData.data[index + 1],
            b: imageData.data[index + 2],
            a: imageData.data[index + 3]
          };
        },
        /**
         * Get original pixel.
         * @param {int} x
         * @param {int} y
         * @returns {{r: *, g: *, b: *, a: *}}
         */
        getOriginalPixel: function (x, y) {
          var index = getIndex(x, y);
          return {
            r: imageData.data[index + 0],
            g: imageData.data[index + 1],
            b: imageData.data[index + 2],
            a: imageData.data[index + 3]
          };
        },
        /**
         * Set new pixel
         * @param {int} x
         * @param {int} y
         * @param {object} rgba
         */
        setPixel: function (x, y, rgba) {
          var index = getIndex(x, y);
          imageDataCopy[index + 0] = normalizePixelValue(rgba.r);
          imageDataCopy[index + 1] = normalizePixelValue(rgba.g);
          imageDataCopy[index + 2] = normalizePixelValue(rgba.b);
          imageDataCopy[index + 3] = normalizePixelValue(rgba.a);
        },
        /**
         * Set pixel by index.
         * @param index
         * @param rgba
         */
        setPixelByIndex: function (index, rgba) {
          index *= 4;
          imageDataCopy[index + 0] = normalizePixelValue(rgba.r);
          imageDataCopy[index + 1] = normalizePixelValue(rgba.g);
          imageDataCopy[index + 2] = normalizePixelValue(rgba.b);
          imageDataCopy[index + 3] = normalizePixelValue(rgba.a);
        },
        /**
         * Data created by effect init function
         */
        data: null,
        /**
         * ImageData width
         */
        width: imageData.width,
        /**
         * ImageData height
         */
        height: imageData.height
      };

    sandbox.data = this.before.call(sandbox, parameters, imageData.width, imageData.height, imageData);

    this.callback.call(sandbox, imageData.width, imageData.height, parameters);

    imageData.data.set(imageDataCopy);

    return imageData;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BaseCustomEffect);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let parameters = {},
  isInit = false;

let noise = {
  init: function () {
    if (isInit) {
      return false;
    }
    isInit = true;

    parameters.B = 0x100;
    parameters.BM = 0xff;
    parameters.N = 0x1000;

    parameters.P = new Array(parameters.B + parameters.B + 2);
    parameters.G1 = new Array(parameters.B + parameters.B + 2);
    parameters.G2 = new Array(parameters.B + parameters.B + 2);
    for (i = 0; i < parameters.G2.length; i += 1) {
      parameters.G2[i] = new Array(2);
    }
    parameters.G3 = new Array(parameters.B + parameters.B + 2);
    for (i = 0; i < parameters.G3.length; i += 1) {
      parameters.G3[i] = new Array(3);
    }
    var i, j, k;

    for (i = 0; i < parameters.B; i += 1) {
      parameters.P[i] = i;
      parameters.G1[i] = ((this.random() % (parameters.B + parameters.B)) - parameters.B) / parameters.B;
      parameters.G2[i] = [];
      for (j = 0; j < 2; j += 1) {
        parameters.G2[i][j] = ((this.random() % (parameters.B + parameters.B)) - parameters.B) / parameters.B;
      }
      parameters.G2[i] = this.normalize2(parameters.G2[i]);

      parameters.G3[i] = [];
      for (j = 0; j < 3; j += 1) {
        parameters.G3[i][j] = ((this.random() % (parameters.B + parameters.B)) - parameters.B) / parameters.B;
      }
      parameters.G3[i] = this.normalize3(parameters.G3[i]);
    }

    for (i = parameters.B - 1; i >= 0; i -= 1) {
      k = parameters.P[i];
      parameters.P[i] = parameters.P[j = this.random() % parameters.B];
      parameters.P[j] = k;
    }

    for (i = 0; i < parameters.B + 2; i += 1) {
      parameters.P[parameters.B + i] = parameters.P[i];
      parameters.G1[parameters.B + i] = parameters.G1[i];
      for (j = 0; j < 2; j += 1) {
        parameters.G2[parameters.B + i][j] = parameters.G2[i][j];
      }
      for (j = 0; j < 3; j++) {
        parameters.G3[parameters.B + i][j] = parameters.G3[i][j];
      }
    }
  },
  random: function () {
    return parseInt(Math.random() * 256 * 256) & 0x7fffffff;
  },
  normalize2: function (arr) {
    var s = Math.sqrt(arr[0] * arr[0] + arr[1] * arr[1] + arr[2] * arr[2]);
    arr[0] = arr[0] / s;
    arr[1] = arr[1] / s;
    arr[2] = arr[2] / s;
    return arr;
  },
  normalize3: function (arr) {
    var s = Math.sqrt(arr[0] * arr[0] + arr[1] * arr[1]);
    arr[0] = arr[0] / s;
    arr[1] = arr[1] / s;
    return arr;
  },
  sCurve: function (t) {
    return t * t * (3.0 - 2.0 * t);
  },
  lerp: function (t, a, b) {
    return a + t * (b - a);
  },
  /**
   * Compute 1-dimensional Perlin noise.
   * @param x
   */
  noise1: function (x) {
    var bx0, bx1,
      rx0, rx1, sx, t, u, v;

    this.init();

    t = x + parameters.N;
    bx0 = parseInt(t) & parameters.BM;
    bx1 = (bx0 + 1) & parameters.BM;
    rx0 = t - parseInt(t);
    rx1 = rx0 - 1;

    sx = this.sCurve(rx0);

    u = rx0 * parameters.G1[parameters.P[bx0]];
    v = rx1 * parameters.G1[parameters.P[bx1]];

    return 2.3 * this.lerp(sx, u, v);
  },
  /**
   * Compute 2-dimensional Perlin noise
   * @param x
   * @param y
   * @returns {number}
   */
  noise2: function (x, y) {
    var bx0, bx1, by0, by1, b00, b10, b01, b11,
      rx0, rx1, ry0, ry1, q = [], sx, sy, a, b, t, u, v,
      i, j;

    this.init();

    t = x + parameters.N;
    bx0 = parseInt(t) & parameters.BM;
    bx1 = (bx0 + 1) & parameters.BM;
    rx0 = t - parseInt(t);
    rx1 = rx0 - 1;

    t = y + parameters.N;
    by0 = parseInt(t) & parameters.BM;
    by1 = (by0 + 1) & parameters.BM;
    ry0 = t - parseInt(t);
    ry1 = ry0 - 1;

    i = parameters.P[bx0];
    j = parameters.P[bx1];

    b00 = parameters.P[i + by0];
    b10 = parameters.P[j + by0];
    b01 = parameters.P[i + by1];
    b11 = parameters.P[j + by1];

    sx = this.sCurve(rx0);
    sy = this.sCurve(ry0);

    q = parameters.G2[b00];
    u = rx0 * q[0] + ry0 * q[1];
    q = parameters.G2[b10];
    v = rx1 * q[0] + ry0 * q[1];
    a = this.lerp(sx, u, v);

    q = parameters.G2[b01];
    u = rx0 * q[0] + ry1 * q[1];
    q = parameters.G2[b11];
    v = rx1 * q[0] + ry1 * q[1];
    b = this.lerp(sx, u, v);

    return 1.5 * this.lerp(sy, a, b);
  },
  /**
   * Compute 3-dimensional Perlin noise.
   * @param x
   * @param y
   * @param z
   */
  noise3: function (x, y, z) {
    var bx0, bx1, by0, by1, bz0, bz1, b00, b10, b01, b11,
      rx0, rx1, ry0, ry1, rz0, rz1, q, sy, sz, a, b, c, d, t, u, v,
      i, j;

    this.init();

    t = x + parameters.N;
    bx0 = parseInt(t) & parameters.BM;
    bx1 = (bx0 + 1) & parameters.BM;
    rx0 = t - parseInt(t);
    rx1 = rx0 - 1;

    t = y + parameters.N;
    by0 = parseInt(t) & parameters.BM;
    by1 = (by0 + 1) & parameters.BM;
    ry0 = t - parseInt(t);
    ry1 = ry0 - 1;

    t = z + parameters.N;
    bz0 = parseInt(t) & parameters.BM;
    bz1 = (bz0 + 1) & parameters.BM;
    rz0 = t - parseInt(t);
    rz1 = rz0 - 1;

    i = parameters.P[bx0];
    j = parameters.P[bx1];

    b00 = parameters.P[i + by0];
    b10 = parameters.P[j + by0];
    b01 = parameters.P[i + by1];
    b11 = parameters.P[j + by1];

    t = this.sCurve(rx0);
    sy = this.sCurve(ry0);
    sz = this.sCurve(rz0);

    q = parameters.G3[b00 + bz0];
    u = rx0 * q[0] + ry0 * q[1] + rz0 * q[2];
    q = parameters.G3[b10 + bz0];
    v = rx1 * q[0] + ry0 * q[1] + rz0 * q[2];
    a = this.lerp(t, u, v);

    q = parameters.G3[b01 + bz0];
    u = rx0 * q[0] + ry1 * q[1] + rz0 * q[2];
    q = parameters.G3[b11 + bz0];
    v = rx1 * q[0] + ry1 * q[1] + rz0 * q[2];
    b = this.lerp(t, u, v);

    c = this.lerp(sy, a, b);

    q = parameters.G3[b00 + bz1];
    u = rx0 * q[0] + ry0 * q[1] + rz1 * q[2];
    q = parameters.G3[b10 + bz1];
    v = rx1 * q[0] + ry0 * q[1] + rz1 * q[2];
    a = this.lerp(t, u, v);

    q = parameters.G3[b01 + bz1];
    u = rx0 * q[0] + ry1 * q[1] + rz1 * q[2];
    q = parameters.G3[b11 + bz1];
    v = rx1 * q[0] + ry1 * q[1] + rz1 * q[2];
    b = this.lerp(t, u, v);

    d = this.lerp(sy, a, b);

    return 1.5 * this.lerp(sz, c, d);
  },
  /**
   * Compute turbulence using Perlin noise.
   * @param x
   * @param y
   * @param z
   * @param octaves
   * @returns {*}
   */
  turbulence3: function (x, y, z, octaves) {
    var t = 0,
      i;
    for (i = 1; i <= octaves; i *= 2) {
      t += Math.abs(this.noise3(i * x, i * y, i * z)) / i;
    }
    return t;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (noise);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_common__ = __webpack_require__(2);


class CanvasWrapper {
  constructor(width, height) {
    this.canvas = null;
    this.context = null;
    this.width = 0;
    this.height = 0;
    this.initialize(width, height);
  }

  initialize(width = 0, height = 0) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_common__["a" /* isNode */])()) {
      let Canvas = __webpack_require__(10);
      this.canvas = new Canvas(width, height);
    } else {
      this.canvas = document.createElement("canvas");

      // hide from viewport
      this.canvas.style.position = "absolute";
      this.canvas.style.left = "-99999px";
      this.canvas.style.top = "-99999px";

      this.setWidth(width);
      this.setHeight(height);

      document.body.appendChild(this.canvas);
    }
  }

  setWidth(value) {
    this.canvas.setAttribute("width", "" + value);
    this.width = value;
    return this;
  }

  setHeight(value) {
    this.canvas.setAttribute("height", "" + value);
    this.height = value;
    return this;
  }

  getContext() {
    if (!this.context) {
      this.context = this.canvas.getContext("2d");
    }
    return this.context;
  }

  getCanvas() {
    return this.canvas;
  }

  toDataURL(type) {
    return this.canvas.toDataURL(type);
  }

  destroy() {
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers_common__["a" /* isNode */])()) {
      document.body.removeChild(this.canvas);
    }
    this.canvas = null;
    this.context = null;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (CanvasWrapper);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = RGBtoHSB;
/* harmony export (immutable) */ __webpack_exports__["f"] = HSBtoRGB;
/* harmony export (immutable) */ __webpack_exports__["d"] = mixColors;
/* harmony export (immutable) */ __webpack_exports__["a"] = hexToRGB;
/* unused harmony export RGBtoHex */
/* unused harmony export RGBtoXYZ */
/* harmony export (immutable) */ __webpack_exports__["b"] = RGBtoCIELab;
/* unused harmony export CIELabToXYZ */
/* harmony export (immutable) */ __webpack_exports__["c"] = CIELabToRGB;
/**
 * RGB to HSB color convert.
 * @param r
 * @param g
 * @param b
 * @returns {{h: number, s: number, b: number}}
 */
function RGBtoHSB(r, g, b) {
  var hue, saturation, brightness,
    cmax = Math.max(r, g, b),
    cmin = Math.min(r, g, b);

  brightness = cmax / 255;
  if (cmax !== 0) {
    saturation = (cmax - cmin) / cmax;
  }
  else {
    saturation = 0;
  }

  if (saturation === 0) {
    hue = 0;
  }
  else {
    var redc = (cmax - r) / (cmax - cmin),
      greenc = (cmax - g) / (cmax - cmin),
      bluec = (cmax - b) / (cmax - cmin);

    if (r === cmax) {
      hue = bluec - greenc;
    }
    else {
      if (g === cmax) {
        hue = 2 + redc - bluec;
      }
      else {
        hue = 4 + greenc - redc;
      }
    }

    hue /= 6;
    if (hue < 0) {
      hue += 1;
    }
  }

  return {
    h: hue,
    s: saturation,
    b: brightness
  };
}
/**
 * HSB to RGB color convert.
 * @param hue
 * @param saturation
 * @param brightness
 * @returns {{r: Number, g: Number, b: Number}}
 */
function HSBtoRGB(hue, saturation, brightness) {
  var red, green, blue;
  if (saturation === 0) {
    red = brightness * 255 + 0.5;
    green = brightness * 255 + 0.5;
    blue = brightness * 255 + 0.5;
  }
  else {
    var h = (hue - Math.floor(hue)) * 6,
      f = h - Math.floor(h),
      p = brightness * (1 - saturation),
      q = brightness * (1 - saturation * f),
      t = brightness * (1 - (saturation * (1 - f)));

    switch (parseInt(h)) {
      case 0:
        red = (brightness * 255 + 0.5);
        green = (t * 255 + 0.5);
        blue = (p * 255 + 0.5);
        break;

      case 1:
        red = (q * 255 + 0.5);
        green = (brightness * 255 + 0.5);
        blue = (p * 255 + 0.5);
        break;

      case 2:
        red = (p * 255 + 0.5);
        green = (brightness * 255 + 0.5);
        blue = (t * 255 + 0.5);
        break;

      case 3:
        red = (p * 255 + 0.5);
        green = (q * 255 + 0.5);
        blue = (brightness * 255 + 0.5);
        break;

      case 4:
        red = (t * 255 + 0.5);
        green = (p * 255 + 0.5);
        blue = (brightness * 255 + 0.5);
        break;

      case 5:
        red = (brightness * 255 + 0.5);
        green = (p * 255 + 0.5);
        blue = (q * 255 + 0.5);
        break;

      default:
        red = 0;
        green = 0;
        blue = 0;
        break;
    }
  }
  return {
    r: parseInt(red),
    g: parseInt(green),
    b: parseInt(blue)
  };
}

function mixColors(t, rgb1, rgb2) {
  return {
    r: rgb1.r + t * (rgb2.r - rgb1.r),
    g: rgb1.g + t * (rgb2.g - rgb1.g),
    b: rgb1.b + t * (rgb2.b - rgb1.b),
    a: rgb1.a + t * (rgb2.a - rgb1.a)
  }
}

function hexToRGB(hex) {
  hex = parseInt(hex.replace("#", ""), 16);
  var r = hex >> 16;
  var g = hex >> 8 & 0xFF;
  var b = hex & 0xFF;
  return {
    r: r,
    g: g,
    b: b
  };
}

function RGBtoHex(pixel) {
  var bin = pixel.r << 16 | pixel.g << 8 | pixel.b;
  return (function (h) {
    return new Array(7 - h.length).join("0") + h
  })(bin.toString(16).toUpperCase())
}

function RGBtoXYZ(r, g, b) {
  var var_R = ( r / 255 );
  var var_G = ( g / 255 );
  var var_B = ( b / 255 );

  if (var_R > 0.04045) {
    var_R = Math.pow(( var_R + 0.055 ) / 1.055, 2.4);
  }
  else {
    var_R = var_R / 12.92;
  }

  if (var_G > 0.04045) {
    var_G = Math.pow(( var_G + 0.055 ) / 1.055, 2.4);
  }
  else {
    var_G = var_G / 12.92;
  }

  if (var_B > 0.04045) {
    var_B = Math.pow(( var_B + 0.055 ) / 1.055, 2.4);
  }
  else {
    var_B = var_B / 12.92;
  }

  var_R = var_R * 100;
  var_G = var_G * 100;
  var_B = var_B * 100;

  return {
    x: var_R * 0.4124 + var_G * 0.3576 + var_B * 0.1805,
    y: var_R * 0.2126 + var_G * 0.7152 + var_B * 0.0722,
    z: var_R * 0.0193 + var_G * 0.1192 + var_B * 0.9505
  };
}

function RGBtoCIELab(r, g, b) {
  var xyz = RGBtoXYZ(r, g, b);

  var var_X = xyz.x / 95.047; // ref
  var var_Y = xyz.y / 100; // ref
  var var_Z = xyz.z / 108.883; // ref

  if (var_X > 0.008856) {
    var_X = Math.pow(var_X, ( 1 / 3 ));
  }
  else {
    var_X = ( 7.787 * var_X ) + ( 16 / 116 );
  }

  if (var_Y > 0.008856) {
    var_Y = Math.pow(var_Y, ( 1 / 3 ));
  }
  else {
    var_Y = ( 7.787 * var_Y ) + ( 16 / 116 );
  }

  if (var_Z > 0.008856) {
    var_Z = Math.pow(var_Z, ( 1 / 3 ));
  }
  else {
    var_Z = ( 7.787 * var_Z ) + ( 16 / 116 );
  }

  return {
    l: ( 116 * var_Y ) - 16,
    a: 500 * ( var_X - var_Y ),
    b: 200 * ( var_Y - var_Z )
  };
}

function CIELabToXYZ(l, a, b) {
  var var_Y = ( l + 16 ) / 116;
  var var_X = a / 500 + var_Y;
  var var_Z = var_Y - b / 200;

  if (Math.pow(var_Y, 3) > 0.008856) {
    var_Y = Math.pow(var_Y, 3);
  }
  else {
    var_Y = ( var_Y - 16 / 116 ) / 7.787;
  }

  if (Math.pow(var_X, 3) > 0.008856) {
    var_X = Math.pow(var_X, 3);
  }
  else {
    var_X = ( var_X - 16 / 116 ) / 7.787;
  }

  if (Math.pow(var_Z, 3) > 0.008856) {
    var_Z = Math.pow(var_Z, 3);
  }
  else {
    var_Z = ( var_Z - 16 / 116 ) / 7.787;
  }

  return {
    x: 95.047 * var_X, // ref
    y: 100 * var_Y, // ref
    z: 108.883 * var_Z // ref
  };
}

function CIELabToRGB(l, a, b) {
  var xyz = CIELabToXYZ(l, a, b);

  var var_X = xyz.x / 100;
  var var_Y = xyz.y / 100;
  var var_Z = xyz.z / 100;

  var var_R = var_X * 3.2406 + var_Y * -1.5372 + var_Z * -0.4986;
  var var_G = var_X * -0.9689 + var_Y * 1.8758 + var_Z * 0.0415;
  var var_B = var_X * 0.0557 + var_Y * -0.2040 + var_Z * 1.0570;

  if (var_R > 0.0031308) {
    var_R = 1.055 * ( Math.pow(var_R, ( 1 / 2.4 )) ) - 0.055;
  }
  else {
    var_R = 12.92 * var_R;
  }

  if (var_G > 0.0031308) {
    var_G = 1.055 * ( Math.pow(var_G, ( 1 / 2.4 )) ) - 0.055;
  }
  else {
    var_G = 12.92 * var_G;
  }

  if (var_B > 0.0031308) {
    var_B = 1.055 * ( Math.pow(var_B, ( 1 / 2.4 )) ) - 0.055;
  }
  else {
    var_B = 12.92 * var_B;
  }

  return {
    r: var_R * 255,
    g: var_G * 255,
    b: var_B * 255
  };
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__effects_point_GrayScale__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__effects_point_Sepia__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__effects_point_Contrast__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__effects_point_Brightness__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__effects_point_Diffusion__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__effects_point_Dither__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__effects_point_Exposure__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__effects_point_Gain__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__effects_point_Gamma__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__effects_point_HSBAdjust__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__effects_point_InvertAlpha__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__effects_point_Invert__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__effects_point_Levels__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__effects_point_Rescale__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__effects_point_Solarize__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__effects_point_Threshold__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__effects_point_Tritone__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__effects_point_Dissolve__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__effects_point_Edge__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__effects_point_ChannelMix__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__effects_point_AutoContrast__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__effects_transform_Diffuse__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__effects_transform_Kaleidoscope__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__effects_transform_Marble__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__effects_transform_Pinch__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__effects_transform_Ripple__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__effects_transform_Shear__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__effects_transform_Sphere__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__effects_transform_Swim__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__effects_transform_Twirl__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__effects_transform_Water__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__effects_transform_Circle__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__effects_transform_Rotate__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__effects_transform_Offset__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__effects_transform_Polar__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__effects_transform_Perspective__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__effects_custom_AutoWhiteBalance__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__effects_custom_FillColor__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__effects_custom_Flip__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__effects_custom_Block__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__effects_custom_Border__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__effects_custom_Emboss__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__effects_custom_ComponentStretching__ = __webpack_require__(21);














































let availableEffects = {};

function add(_class) {
  if (availableEffects[_class.getName()]) {
    throw `Effect: ${_class.getName()} exists already!`;
  }
  availableEffects[_class.getName()] = _class;
}

add(__WEBPACK_IMPORTED_MODULE_0__effects_point_GrayScale__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_1__effects_point_Sepia__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_2__effects_point_Contrast__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_3__effects_point_Brightness__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_4__effects_point_Diffusion__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_5__effects_point_Dither__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_6__effects_point_Exposure__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_7__effects_point_Gain__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_8__effects_point_Gamma__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_9__effects_point_HSBAdjust__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_10__effects_point_InvertAlpha__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_11__effects_point_Invert__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_12__effects_point_Levels__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_13__effects_point_Rescale__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_14__effects_point_Solarize__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_15__effects_point_Threshold__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_16__effects_point_Tritone__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_21__effects_transform_Diffuse__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_17__effects_point_Dissolve__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_22__effects_transform_Kaleidoscope__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_23__effects_transform_Marble__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_24__effects_transform_Pinch__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_25__effects_transform_Ripple__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_26__effects_transform_Shear__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_27__effects_transform_Sphere__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_28__effects_transform_Swim__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_29__effects_transform_Twirl__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_30__effects_transform_Water__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_18__effects_point_Edge__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_19__effects_point_ChannelMix__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_31__effects_transform_Circle__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_32__effects_transform_Rotate__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_33__effects_transform_Offset__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_34__effects_transform_Polar__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_35__effects_transform_Perspective__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_20__effects_point_AutoContrast__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_36__effects_custom_AutoWhiteBalance__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_37__effects_custom_FillColor__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_38__effects_custom_Flip__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_39__effects_custom_Block__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_40__effects_custom_Border__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_41__effects_custom_Emboss__["a" /* default */]);
add(__WEBPACK_IMPORTED_MODULE_42__effects_custom_ComponentStretching__["a" /* default */]);

class EffectsRepository {
  static get(name) {
    return availableEffects[name];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (EffectsRepository);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BaseEffect {
  constructor(opts = {}) {
    this.opts = opts;
  }

  getDefaultParameters() {
    return {};
  }

  before(parameters, width, height, imageData) {
    return {};
  }

  static getName() {
    throw 'Extend it.';
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BaseEffect);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("canvas");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_Project__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_Image__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Project", function() { return __WEBPACK_IMPORTED_MODULE_0__classes_Project__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return __WEBPACK_IMPORTED_MODULE_1__classes_Image__["a"]; });






/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CanvasWrapper__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_resize__ = __webpack_require__(61);



class BaseOnLayerObject {
  constructor() {
    this.imageData = null;
    this.canvas = null;
    this.width = 0;
    this.height = 0;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  setWidth(value) {
    this.width = value;
    return this;
  }

  setHeight(value) {
    this.height = value;
    return this;
  }

  getImageData() {
    if (!this.imageData) {
      this.imageData = this.canvas.getContext().getImageData(0, 0, this.getWidth(), this.getHeight());
    }
    return this.imageData;
  }

  setImageData(value) {
    this.imageData = value;
    return this;
  }

  resize(newWidth, newHeight, mode = 'nearest-neighbour') {
    let oldImageData = this.getImageData(),
      canvas = new __WEBPACK_IMPORTED_MODULE_0__CanvasWrapper__["a" /* default */](newWidth, newHeight),
      newImageData = canvas.getContext().createImageData(newWidth, newHeight);

    switch (mode) {
      case "nearest-neighbour":
        newImageData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_resize__["a" /* resizeNearestNeighbour */])(oldImageData, newImageData, newWidth, newHeight);
        break;

      case "bilinear-interpolation":
        newImageData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_resize__["b" /* resizeBilinearInterpolation */])(oldImageData, newImageData, newWidth, newHeight);
        break;

      case "biquadratic-interpolation":
        newImageData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_resize__["c" /* resizeBiquadraticInterpolation */])(oldImageData, newImageData, newWidth, newHeight);
        break;

      default:
        canvas.destroy();
        return this;
    }

    canvas.destroy();

    return this.setWidth(newWidth)
      .setHeight(newHeight)
      .setImageData(newImageData);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BaseOnLayerObject);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseOnLayer__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CanvasWrapper__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_common__ = __webpack_require__(2);




class Image extends __WEBPACK_IMPORTED_MODULE_0__BaseOnLayer__["a" /* default */] {
  constructor() {
    super();
    this.url = null;

    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_common__["a" /* isNode */])()) {
      let canvas = __webpack_require__(10);
      this.image = new canvas.Image();
    }
    else {
      this.image = new window.Image();

      // hide from viewport
      this.image.style.position = "absolute";
      this.image.style.left = "-99999px";
      this.image.style.top = "-99999px";
    }
  }

  load(url, callback) {
    let load = () => {
      this.setWidth(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_common__["a" /* isNode */])() ? this.image.width : this.image.clientWidth);
      this.setHeight(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_common__["a" /* isNode */])() ? this.image.height : this.image.clientHeight);

      // get image data
      this.canvas = new __WEBPACK_IMPORTED_MODULE_1__CanvasWrapper__["a" /* default */](this.getWidth(), this.getHeight());
      this.canvas.getContext().drawImage(this.image, 0, 0, this.getWidth(), this.getHeight());

      if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_common__["a" /* isNode */])()) {
        document.body.removeChild(this.image);
      }

      if (typeof callback === "function") {
        callback.call(this);
      }
    };

    this.url = url;

    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_common__["a" /* isNode */])()) {
      document.body.appendChild(this.image);
      this.image.onload = function () {
        load();
      };
      this.image.src = url;
    }
    else {
      let fs = __webpack_require__(11);
      this.image.src = fs.readFileSync(url);
      load();
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Image);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CanvasWrapper__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__LayerObject__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__EffectsRepository__ = __webpack_require__(8);





class Layer {
  constructor(width, height, parameters = {}) {
    this.objects = [];
    this.effects = [];
    this.x = 0;
    this.y = 0;
    this.initialize(width, height, parameters);

    if (parameters.background_color && parameters.background_color !== "transparent") {
      this.applyEffect("fill-color", {
        color: parameters.background_color
      });
    }
  }

  initialize(width, height, parameters) {
    this.canvas = new __WEBPACK_IMPORTED_MODULE_0__CanvasWrapper__["a" /* default */](width, height);
    this.imageData = this.canvas.getContext().createImageData(width, height);
    this.width = width;
    this.height = height;
    this.parameters = parameters;
  }

  put(obj, x, y) {
    let put = new __WEBPACK_IMPORTED_MODULE_1__LayerObject__["a" /* default */](obj, this, x, y, {});
    this.objects.push(put);
    return put;
  }

  exportTo(selector, imageType = 'image/png') {
    this.exportLayer();

    let container = document.querySelector(selector),
      exportedImage = new Image();

    exportedImage.src = canvas.toDataURL(imageType);
    container.appendChild(exportedImage);
  }

  exportLayer() {
    let i,
      layerObject;

    for (i = 0; i < this.objects.length; i += 1) {
      layerObject = this.objects[i];
      this.imageData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_common__["b" /* mergeImageData */])({
        width: this.width,
        height: this.height,
        imageData: this.imageData
      }, {
        x: layerObject.getX(),
        y: layerObject.getY(),
        width: layerObject.getWidth(),
        height: layerObject.getHeight(),
        imageData: layerObject.exportObject()
      }, __WEBPACK_IMPORTED_MODULE_2__helpers_common__["c" /* mergePixelCallback */]);
    }

    for (i = 0; i < this.effects.length; i++) {
      this.imageData = this.effects[i].effect.run(this.imageData, this.effects[i].params);
    }

    return this.imageData;
  }

  applyEffect(name, parameters) {
    this.effects.push({
      name,
      effect: new (__WEBPACK_IMPORTED_MODULE_3__EffectsRepository__["a" /* default */].get(name)),
      parameters
    });
  }

  resize(newWidth, newHeight, mode) {
    let i;

    this.canvas.destroy();
    this.canvas = null;
    this.imageData = null;

    this.initialize(newWidth, newHeight, this.parameters);

    for (i = 0; i < this.objects.length; i += 1) {
      this.objects[i].resize(newWidth, newHeight, mode, true);
    }

    return this;
  }

  crop(startX, startY, width, height) {
    let i;

    for (i = 0; i < this.objects.length; i += 1) {
      this.objects[i].crop(startX, startY, width, height);
    }

    return this;
  }

  moveXY(x, y) {
    this.moveX(x);
    this.moveY(y);
    return this;
  }

  moveX(x) {
    this.x += (x | 0);
    return this;
  }

  moveY(y) {
    this.y += (y | 0);
    return this;
  }

  setX(x) {
    this.x = x;
    return this;
  }

  setY(y) {
    this.y = y;
    return this;
  }

  setBlendingMode(blendingMode) {
    this.parameters.blendingMode = blendingMode;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getParameter(name) {
    return this.parameters[name];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Layer);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CanvasWrapper__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EffectsRepository__ = __webpack_require__(8);




class LayerObject {
  constructor(obj, layer, x, y, opts) {
    this.obj = obj;
    this.layer = this;
    this.x = x;
    this.y = y;
    this.opts = opts;
    this.effects = [];
  }

  getObject() {
    return this.obj;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y
  }

  getWidth() {
    return this.obj.getWidth();
  }

  getHeight() {
    return this.obj.getHeight();
  }

  exportObject() {
    let imageData = this.obj.getImageData();
    for (let i = 0; i < this.effects.length; i += 1) {
      imageData = this.effects[i].effect.run(imageData, this.effects[i].params);
    }
    return imageData;
  }

  applyEffect(name, parameters) {
    this.effects.push({
      name,
      effect: new (__WEBPACK_IMPORTED_MODULE_2__EffectsRepository__["a" /* default */].get(name)),
      parameters
    });
  }

  moveXY(x, y) {
    this.moveX(x);
    this.moveY(y);
    return this;
  }

  moveX(x) {
    this.x += (x | 0);
    return this;
  }

  moveY(y) {
    this.y += (y | 0);
    return this;
  }

  setXY(x, y) {
    this.setX(x);
    this.setY(y);
    return this;
  }

  setX(x) {
    this.x = x;
    return this;
  }

  setY(y) {
    this.y = y;
    return this;
  }

  resize(newWidth, newHeight, mode, isLayerResize) {
    let oldWidth = this.getWidth(),
      oldHeight = this.getHeight(),
      ratioX = newWidth / oldWidth,
      ratioY = newHeight / oldHeight;

    if (isLayerResize) {
      this.moveXY(-this.getX() * ratioX, -this.getY() * ratioY);
    }

    this.getObject().resize(newWidth, newHeight, mode);

    return this;
  }

  crop(startX, startY, width, height) {
    let object = this.getObject(),
      oldImageData = object.getImageData(),
      canvas = new __WEBPACK_IMPORTED_MODULE_0__CanvasWrapper__["a" /* default */](width, height),
      newImageData = canvas.getContext().createImageData(width, height);

    newImageData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_common__["h" /* cropImageData */])(oldImageData, newImageData, startX, startY, width, height);

    object
      .setImageData(newImageData)
      .setWidth(width)
      .setHeight(height);

    this.setXY(startX, startY);

    return this;
  };
}

/* harmony default export */ __webpack_exports__["a"] = (LayerObject);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CanvasWrapper__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Layer__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__EffectsRepository__ = __webpack_require__(8);





class Project {
  constructor(width, height, parameters = {}) {
    this.imageData = null;
    this.effects = [];
    this.layers = [];
    this.startTime = new Date();
    this.initialize(width, height, parameters);
  }

  initialize(width, height, parameters) {
    this.parameters = parameters;
    this.width = width;
    this.height = height;
    this.canvas = new __WEBPACK_IMPORTED_MODULE_0__CanvasWrapper__["a" /* default */](width, height);
    this.imageData = this.canvas.getContext().getImageData(0, 0, width, height);
  }

  createLayer(parameters) {
    let layer = new __WEBPACK_IMPORTED_MODULE_1__Layer__["a" /* default */](this.width, this.height, parameters);
    this.layers.push(layer);
    return layer;
  }

  getTime() {
    let end = new Date();
    return end.getTime() - this.startTime.getTime();
  }

  exportTo(selector, imageType = 'image/png') {
    var i,
      container,
      exportedImage = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_common__["a" /* isNode */])() ? null : new window.Image();

    for (i = 0; i < this.layers.length; i++) {
      this.imageData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_common__["b" /* mergeImageData */])({
        width: this.width,
        height: this.height,
        imageData: this.imageData
      }, {
        x: this.layers[i].getX(),
        y: this.layers[i].getY(),
        width: this.layers[i].getWidth(),
        height: this.layers[i].getHeight(),
        imageData: this.layers[i].exportLayer(),
        blendingMode: this.layers[i].getParameter("blendingMode")
      }, __WEBPACK_IMPORTED_MODULE_2__helpers_common__["c" /* mergePixelCallback */]);
    }

    for (i = 0; i < this.effects.length; i++) {
      this.imageData = this.effects[i].effect.run(this.imageData, this.effects[i].parameters);
    }

    this.canvas.getContext().putImageData(this.imageData, 0, 0);

    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_common__["a" /* isNode */])()) {
      let fs = __webpack_require__(11),
        img = this.canvas.toDataURL(),
        data = img.replace(/^data:image\/\w+;base64,/, ""),
        buff = new Buffer(data, 'base64');

      fs.writeFile(selector, buff);
    }
    else {
      container = document.querySelector(selector);
      exportedImage.src = this.canvas.toDataURL(imageType);
      container.appendChild(exportedImage);
    }
  }

  applyEffect(name, parameters = {}) {
    this.effects.push({
      name,
      effect: new (__WEBPACK_IMPORTED_MODULE_3__EffectsRepository__["a" /* default */].get(name)),
      parameters
    });
  }

  resize(newWidth, newHeight, mode) {
    this.canvas.destroy();
    this.canvas = null;
    this.imageData = null;
    this.initialize(newWidth, newHeight, mode);

    for (let i = 0; i < this.layers.length; i += 1) {
      this.layers[i].resize(newWidth, newHeight, mode);
    }

    return this;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Project);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseCustom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_color__ = __webpack_require__(6);



class AutoWhiteBalanceEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseCustom__["a" /* default */] {
  static getName() {
    return 'auto-white-balance';
  }

  getDefaultParameters() {
    return {
      intensity: 50
    };
  }

  callback(width, height, parameters) {
    var x, y,
      sumA = 0, sumB = 0,
      pixel,
      lab,
      avgSumA, avgSumB,
      aDelta, bDelta;

    for (y = 0; y < height; y += 1) {
      for (x = 0; x < width; x += 1) {
        pixel = this.getPixel(x, y);
        lab = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_color__["b" /* RGBtoCIELab */])(pixel.r, pixel.g, pixel.b);
        sumA += lab.a;
        sumB += lab.b;
      }
    }

    avgSumA = 0 - (sumA / (width * height));
    avgSumB = 0 - (sumB / (width * height));

    aDelta = avgSumA * (parameters.intensity / 100) * 1.1;
    bDelta = avgSumB * (parameters.intensity / 100) * 1.1;

    for (y = 0; y < height; y += 1) {
      for (x = 0; x < width; x += 1) {
        pixel = this.getPixel(x, y);

        lab = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_color__["b" /* RGBtoCIELab */])(pixel.r, pixel.g, pixel.b);

        lab.a += aDelta;
        lab.b += bDelta;

        pixel = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_color__["c" /* CIELabToRGB */])(lab.l, lab.a, lab.b);
        pixel.a = this.getPixel(x, y).a;

        this.setPixel(x, y, pixel);
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AutoWhiteBalanceEffect);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseCustom__ = __webpack_require__(3);


class BlockEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseCustom__["a" /* default */] {
  static getName() {
    return 'block';
  }

  getDefaultParameters() {
    return {
      blockSize: 5
    };
  }

  callback(width, height, parameters) {
    var x, y,
      w, h,
      t,
      r, g, b,
      pixel,
      by, bx;

    for (y = 0; y < height; y += parameters.blockSize) {
      for (x = 0; x < width; x += parameters.blockSize) {
        w = Math.min(parameters.blockSize, width - x);
        h = Math.min(parameters.blockSize, height - y);
        t = w * h;

        r = 0;
        g = 0;
        b = 0;

        for (by = 0; by < h; by += 1) {
          for (bx = 0; bx < w; bx += 1) {
            pixel = this.getOriginalPixel(x + bx, y + by);

            r += pixel.r & 0xFF;
            g += pixel.g & 0XFF;
            b += pixel.b & 0xFF;
          }
        }

        r = r / t;
        g = g / t;
        b = b / t;

        for (by = 0; by < h; by += 1) {
          for (bx = 0; bx < w; bx += 1) {
            this.setPixel(x + bx, y + by, {
              r: r,
              g: g,
              b: b,
              a: 255
            });
          }
        }
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BlockEffect);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseCustom__ = __webpack_require__(3);


class BorderEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseCustom__["a" /* default */] {
  static getName() {
    return 'border';
  }

  getDefaultParameters() {
    return {
      leftBorder: 10,
      rightBorder: 10,
      topBorder: 10,
      bottomBorder: 10,
      borderColor: {
        r: 0,
        b: 0,
        g: 0,
        a: 255
      }
    };
  }

  before(parameters, width, height, imageData) {
    return {
      leftBorder: parameters.leftBorder | 0,
      rightBorder: parameters.rightBorder | 0,
      topBorder: parameters.rightBorder | 0,
      bottomBorder: parameters.bottomBorder | 0
    };
  }

  callback(width, height, parameters) {
    var x, y;

    for (y = 0; y < height; y += 1) {
      for (x = 0; x < width; x += 1) {
        if (this.data.leftBorder > 0 && x < this.data.leftBorder) {
          this.setPixel(x, y, parameters.borderColor);
        }
        if (this.data.rightBorder > 0 && width - this.data.rightBorder < x) {
          this.setPixel(x, y, parameters.borderColor);
        }
        if (this.data.topBorder > 0 && y < this.data.topBorder) {
          this.setPixel(x, y, parameters.borderColor);
        }
        if (this.data.bottomBorder > 0 && height - this.data.bottomBorder < y) {
          this.setPixel(x, y, parameters.borderColor);
        }
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BorderEffect);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseCustom__ = __webpack_require__(3);


class ComponentStretchingEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseCustom__["a" /* default */] {
  static getName() {
    return 'component-stretching';
  }

  callback(width, height, parameters) {
    var x, y,
      minR = Infinity, minG = Infinity, minB = Infinity,
      maxR = -1, maxG = -1, maxB = -1,
      pixel,
      remap = function remap(value, min, max) {
        return (value - min) * 255 / (max - min);
      };

    for (y = 0; y < height; y += 1) {
      for (x = 0; x < width; x += 1) {
        pixel = this.getPixel(x, y);

        minR = Math.min(pixel.r, minR);
        minG = Math.min(pixel.g, minG);
        minB = Math.min(pixel.b, minB);

        maxR = Math.max(pixel.r, maxR);
        maxG = Math.max(pixel.g, maxG);
        maxB = Math.max(pixel.b, maxB);
      }
    }

    for (y = 0; y < height; y += 1) {
      for (x = 0; x < width; x += 1) {
        pixel = this.getPixel(x, y);

        pixel.r = remap(pixel.r, minR, maxR);
        pixel.g = remap(pixel.g, minG, maxG);
        pixel.b = remap(pixel.b, minB, maxB);

        this.setPixel(x, y, pixel);
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ComponentStretchingEffect);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseCustom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_common__ = __webpack_require__(2);



class EmbossEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseCustom__["a" /* default */] {
  static getName() {
    return 'emboss';
  }

  getDefaultParameters() {
    return {
      azimuth: 135 * Math.PI / 180,
      elevation: 30 * Math.PI / 180,
      width45: 3,
      emboss: true
    };
  }

  callback(width, height, parameters) {
    var x, y,
      bumpMapWidth = width,
      bumpPixels = [],
      Nx, Ny, Nz, Lx, Ly, Lz, Nz2, NzLz, NdotL,
      s1, s2, s3,
      shade, background,
      pixelScale = 255.9,
      bumpIndex = 0,
      index = 0,
      pixel,
      r, g, b;

    Lx = (Math.cos(parameters.azimuth) * Math.cos(parameters.elevation) * pixelScale) | 0;
    Ly = (Math.sin(parameters.azimuth) * Math.cos(parameters.elevation) * pixelScale) | 0;
    Lz = (Math.sin(parameters.elevation) * pixelScale) | 0;

    Nz = (6 * 255 / parameters.width45) | 0;
    Nz2 = Nz * Nz;
    NzLz = Nz * Lz;

    background = Lz;

    for (y = 0; y < height; y += 1) {
      for (x = 0; x < width; x += 1) {
        bumpPixels.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_common__["d" /* brightness */])(this.getOriginalPixel(x, y)) | 0);
      }
    }

    for (y = 0; y < height; y += 1, bumpIndex += bumpMapWidth) {
      s1 = bumpIndex;
      s2 = s1 + bumpMapWidth;
      s3 = s2 + bumpMapWidth;

      for (x = 0; x < width; x += 1, s1 += 1, s2 += 1, s3 += 1) {
        if (y != 0 && y < height - 2 && x != 0 && x < width - 2) {
          Nx = bumpPixels[s1 - 1] + bumpPixels[s2 - 1] + bumpPixels[s3 - 1] - bumpPixels[s1 + 1] - bumpPixels[s2 + 1] - bumpPixels[s3 + 1];
          Ny = bumpPixels[s3 - 1] + bumpPixels[s3] + bumpPixels[s3 + 1] - bumpPixels[s1 - 1] - bumpPixels[s1] - bumpPixels[s1 + 1];

          if (Nx == 0 && Ny == 0) {
            shade = background;
          }
          else {
            if ((NdotL = Nx * Lx + Ny * Ly + NzLz) < 0) {
              shade = 0;
            }
            else {
              shade = (NdotL / Math.sqrt(Nx * Nx + Ny * Ny + Nz2));
            }
          }
        }
        else {
          shade = background;
        }

        if (parameters.emboss) {
          pixel = this.getOriginalPixelByIndex(index);
          r = (pixel.r * shade) >> 8;
          g = (pixel.g * shade) >> 8;
          b = (pixel.b * shade) >> 8;
          this.setPixelByIndex(index++, {
            r: r,
            g: g,
            b: b,
            a: pixel.a
          });
        }
        else {
          this.setPixelByIndex(index++, {
            r: shade,
            g: shade << 8,
            b: shade << 16,
            a: 255
          });
        }
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (EmbossEffect);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseCustom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_color__ = __webpack_require__(6);



class FillColorEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseCustom__["a" /* default */] {
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
      color = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_color__["a" /* hexToRGB */])(parameters.color);
      color.a = 255;
    }

    for (y = 0; y < height; y += 1) {
      for (x = 0; x < width; x += 1) {
        this.setPixel(x, y, color);
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (FillColorEffect);

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseCustom__ = __webpack_require__(3);


class FlipEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseCustom__["a" /* default */] {
  static getName() {
    return 'flip';
  }

  getDefaultParameters() {
    return {
      operation: "FLIP_H" // FLIP_H, FLIP_V, FLIP_HV, FLIP_90CW, FLIP_90CCW, FLIP_180
    };
  }

  callback(width, height, parameters) {
    var x = 0, y = 0,
      w = width,
      h = height,
      newX = 0,
      newY = 0,
      newW = w,
      newH = h,
      newRow, newCol;

    switch (parameters.operation) {
      case "FLIP_H":
        newX = width - (x + w);
        break;
      case "FLIP_V":
        newY = height - (y + h);
        break;
      case "FLIP_HV":
        newW = h;
        newH = w;
        newX = y;
        newY = x;
        break;
      case "FLIP_90CW":
        newW = h;
        newH = w;
        newX = height - (y + h);
        newY = x;
        break;
      case "FLIP_90CCW":
        newW = h;
        newH = w;
        newX = y;
        newY = width - (x + w);
        break;
      case "FLIP_180":
        newX = width - (x + w);
        newY = height - (y + h);
        break;
    }

    for (y = 0; y < height; y += 1) {
      for (x = 0; x < width; x += 1) {
        newRow = y;
        newCol = x;

        switch (parameters.operation) {
          case "FLIP_H":
            newCol = w - x - 1;
            break;
          case "FLIP_V":
            newRow = h - y - 1;
            break;
          case "FLIP_HV":
            newRow = x;
            newCol = y;
            break;
          case "FLIP_90CW":
            newRow = x;
            newCol = h - y - 1;
            break;
          case "FLIP_90CCW":
            newRow = w - x - 1;
            newCol = y;
            break;
          case "FLIP_180":
            newRow = h - y - 1;
            newCol = w - x - 1;
            break;
        }

        this.setPixel(newCol, newRow, this.getOriginalPixel(x, y));
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (FlipEffect);

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BasePoint__ = __webpack_require__(0);


class AutoContrastEffect extends __WEBPACK_IMPORTED_MODULE_0__BasePoint__["a" /* default */] {
  static getName() {
    return 'auto-contrast';
  }

  before(parameters, width, height) {
    var x, y,
      pixel,
      min = Infinity, max = -1;

    for (y = 0; y < height; y += 1) {
      for (x = 0; x < width; x += 1) {
        pixel = this.getPixel(x, y);

        min = Math.min((pixel.r + pixel.g + pixel.b) / 3, min);
        max = Math.max((pixel.r + pixel.g + pixel.b) / 3, max);
      }
    }

    return {
      min: min,
      max: max,
      remap: function (value) {
        return ((value) - min) * 255 / (max - min);
      }
    };
  }

  callback(pixel, x, y, parameters, width, height) {
    pixel.r = this.data.remap(pixel.r, this.data.min, this.data.max);
    pixel.g = this.data.remap(pixel.g, this.data.min, this.data.max);
    pixel.b = this.data.remap(pixel.b, this.data.min, this.data.max);

    return pixel;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AutoContrastEffect);

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BasePoint__ = __webpack_require__(0);


class BrightnessEffect extends __WEBPACK_IMPORTED_MODULE_0__BasePoint__["a" /* default */] {
  static getName() {
    return 'brightness';
  }

  getDefaultParameters() {
    return {
      brightness: 0.5
    };
  }

  before(parameters) {
    return {
      brightness: 255 * parameters.brightness
    };
  }

  callback(pixel, x, y, parameters, width, height) {
    pixel.r = pixel.r + this.data.brightness;
    pixel.g = pixel.g + this.data.brightness;
    pixel.b = pixel.b + this.data.brightness;

    return pixel;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BrightnessEffect);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BasePoint__ = __webpack_require__(0);


class ChannelMixEffect extends __WEBPACK_IMPORTED_MODULE_0__BasePoint__["a" /* default */] {
  static getName() {
    return 'channel-mix';
  }

  getDefaultParameters() {
    return {
      blueGreen: 1,
      redBlue: 1,
      greenRed: 1,
      intoR: 1,
      intoG: 1,
      intoB: 1
    };
  }

  callback(pixel, x, y, parameters, width, height) {
    var r = pixel.r,
      g = pixel.g,
      b = pixel.b;

    return {
      r: ((parameters.intoR * (parameters.blueGreen * g + (255 - parameters.blueGreen) * b) / 255 + (255 - parameters.intoR) * r) / 255),
      g: ((parameters.intoG * (parameters.redBlue * g + (255 - parameters.redBlue) * r) / 255 + (255 - parameters.intoG) * g) / 255),
      b: ((parameters.intoB * (parameters.greenRed * g + (255 - parameters.greenRed) * g) / 255 + (255 - parameters.intoB) * b) / 255),
      a: pixel.a
    };
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ChannelMixEffect);

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BasePoint__ = __webpack_require__(0);


class ContrastEffect extends __WEBPACK_IMPORTED_MODULE_0__BasePoint__["a" /* default */] {
  static getName() {
    return 'contrast';
  }

  getDefaultParameters() {
    return {
      contrast: 0.5
    };
  }

  before(parameters) {
    return {
      factor: (259 * ((parameters.contrast * 255) + 255)) / (255 * (259 - (parameters.contrast * 255)))
    };
  }

  callback(pixel, x, y, parameters, width, height) {
    pixel.r = this.data.factor * (pixel.r - 128) + 128;
    pixel.g = this.data.factor * (pixel.g - 128) + 128;
    pixel.b = this.data.factor * (pixel.b - 128) + 128;

    return pixel;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ContrastEffect);

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BasePoint__ = __webpack_require__(0);


class DiffusionEffect extends __WEBPACK_IMPORTED_MODULE_0__BasePoint__["a" /* default */] {
  static getName() {
    return 'diffusion';
  }

  getDefaultParameters() {
    return {
      matrix: [0, 0, 0, 0, 0, 7, 3, 5, 1],
      levels: 6,
      colorDither: true,
      granulate: true
    };
  }

  before(parameters, width, height, imageData) {
    let i, sum = 0, map = [], div = [];

    for (i = 0; i < parameters.matrix.length; i += 1) {
      sum += parameters.matrix[i];
    }

    for (i = 0; i < parameters.levels; i += 1) {
      map[i] = parseInt(255 * i / (parameters.levels - 1));
    }

    for (i = 0; i < 256; i += 1) {
      div[i] = parseInt(parameters.levels * i / 256);
    }

    return {
      sum: sum,
      map: map,
      div: div
    };
  }

  callback(pixel, x, y, parameters, width, height) {
    let red1 = pixel.r,
      green1 = pixel.g,
      blue1 = pixel.b,
      red2, green2, blue2,
      data = this.data,
      tmpPixel,
      tmpRed, tmpGreen, tmpBlue,
      i, j,
      iy, jx,
      w,
      grayScale;

    if (!parameters.colorDither) {
      grayScale = (red1 + green1 + blue1) / 3;
      red1 = grayScale;
      green1 = grayScale;
      blue1 = grayScale;
    }

    red2 = data.map[data.div[red1]];
    green2 = data.map[data.div[green1]];
    blue2 = data.map[data.div[blue1]];

    tmpRed = red1 - red2;
    tmpGreen = green1 - green2;
    tmpBlue = blue1 - blue2;

    if (parameters.granulate) {
      for (i = -1; i <= 1; i += 1) {
        iy = i + y;
        if (iy < 0 || iy >= height) {
          continue;
        }
        for (j = -1; j <= 1; j += 1) {
          jx = j + x;
          if (jx < 0 || jx >= width) {
            continue;
          }
          w = parameters.matrix[(i + 1) * 3 + j + 1];
          if (w !== 0) {
            tmpPixel = this.getPixel(jx, iy);
            tmpPixel.r += (tmpRed * w / data.sum);
            tmpPixel.g += (tmpGreen * w / data.sum);
            tmpPixel.b += (tmpBlue * w / data.sum);
            this.setPixel(jx, iy, tmpPixel);
          }
        }
      }
    }

    return {
      r: red2,
      g: green2,
      b: blue2,
      a: pixel.a
    };
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DiffusionEffect);

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BasePoint__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_common__ = __webpack_require__(2);



class DissolveEffect extends __WEBPACK_IMPORTED_MODULE_0__BasePoint__["a" /* default */] {
  static getName() {
    return 'dissolve';
  }

  getDefaultParameters() {
    return {
      density: 1,
      softness: 0
    };
  }

  before(parameters, width, height, imageData) {
    let d = (1 - parameters.density) * (1 + parameters.softness);
    return {
      minDensity: d - parameters.softness,
      maxDensity: d
    };
  }

  callback(pixel, x, y, parameters, width, height) {
    let v = Math.random(),
      f = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_common__["g" /* smoothStep */])(this.data.minDensity, this.data.maxDensity, v);
    pixel.a = pixel.a * f;
    return pixel;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DissolveEffect);

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BasePoint__ = __webpack_require__(0);


class DitherEffect extends __WEBPACK_IMPORTED_MODULE_0__BasePoint__["a" /* default */] {
  static getName() {
    return 'dither';
  }

  getDefaultParameters() {
    return {
      matrices: {
        ditherMagic4x4Matrix: [
          0, 14, 3, 13,
          11, 5, 8, 6,
          12, 2, 15, 1,
          7, 9, 4, 10
        ],
        ditherOrdered4x4Matrix: [
          0, 8, 2, 10,
          12, 4, 14, 6,
          3, 11, 1, 9,
          15, 7, 13, 5
        ],
        ditherLines4x4Matrix: [
          0, 1, 2, 3,
          4, 5, 6, 7,
          8, 9, 10, 11,
          12, 13, 14, 15
        ],
        dither90Halftone6x6Matrix: [
          29, 18, 12, 19, 30, 34,
          17, 7, 4, 8, 20, 28,
          11, 3, 0, 1, 9, 27,
          16, 6, 2, 5, 13, 26,
          25, 15, 10, 14, 21, 31,
          33, 25, 24, 23, 33, 36
        ],
        ditherOrdered6x6Matrix: [
          1, 59, 15, 55, 2, 56, 12, 52,
          33, 17, 47, 31, 34, 18, 44, 28,
          9, 49, 5, 63, 10, 50, 6, 60,
          41, 25, 37, 21, 42, 26, 38, 22,
          3, 57, 13, 53, 0, 58, 14, 54,
          35, 19, 45, 29, 32, 16, 46, 30,
          11, 51, 7, 61, 8, 48, 4, 62,
          43, 27, 39, 23, 40, 24, 36, 20
        ],
        ditherOrdered8x8Matrix: [
          1, 235, 59, 219, 15, 231, 55, 215, 2, 232, 56, 216, 12, 228, 52, 212,
          129, 65, 187, 123, 143, 79, 183, 119, 130, 66, 184, 120, 140, 76, 180, 116,
          33, 193, 17, 251, 47, 207, 31, 247, 34, 194, 18, 248, 44, 204, 28, 244,
          161, 97, 145, 81, 175, 111, 159, 95, 162, 98, 146, 82, 172, 108, 156, 92,
          9, 225, 49, 209, 5, 239, 63, 223, 10, 226, 50, 210, 6, 236, 60, 220,
          137, 73, 177, 113, 133, 69, 191, 127, 138, 74, 178, 114, 134, 70, 188, 124,
          41, 201, 25, 241, 37, 197, 21, 255, 42, 202, 26, 242, 38, 198, 22, 252,
          169, 105, 153, 89, 165, 101, 149, 85, 170, 106, 154, 90, 166, 102, 150, 86,
          3, 233, 57, 217, 13, 229, 53, 213, 0, 234, 58, 218, 14, 230, 54, 214,
          131, 67, 185, 121, 141, 77, 181, 117, 128, 64, 186, 122, 142, 78, 182, 118,
          35, 195, 19, 249, 45, 205, 29, 245, 32, 192, 16, 250, 46, 206, 30, 246,
          163, 99, 147, 83, 173, 109, 157, 93, 160, 96, 144, 80, 174, 110, 158, 94,
          11, 227, 51, 211, 7, 237, 61, 221, 8, 224, 48, 208, 4, 238, 62, 222,
          139, 75, 179, 115, 135, 71, 189, 125, 136, 72, 176, 112, 132, 68, 190, 126,
          43, 203, 27, 243, 39, 199, 23, 253, 40, 200, 24, 240, 36, 196, 20, 254,
          171, 107, 155, 91, 167, 103, 151, 87, 168, 104, 152, 88, 164, 100, 148, 84
        ],
        ditherCluster3Matrix: [
          9, 11, 10, 8, 6, 7,
          12, 17, 16, 5, 0, 1,
          13, 14, 15, 4, 3, 2,
          8, 6, 7, 9, 11, 10,
          5, 0, 1, 12, 17, 16,
          4, 3, 2, 13, 14, 15
        ],
        ditherCluster4Matrix: [
          18, 20, 19, 16, 13, 11, 12, 15,
          27, 28, 29, 22, 4, 3, 2, 9,
          26, 31, 30, 21, 5, 0, 1, 10,
          23, 25, 24, 17, 8, 6, 7, 14,
          13, 11, 12, 15, 18, 20, 19, 16,
          4, 3, 2, 9, 27, 28, 29, 22,
          5, 0, 1, 10, 26, 31, 30, 21,
          8, 6, 7, 14, 23, 25, 24, 17
        ],
        ditherCluster8Matrix: [
          64, 69, 77, 87, 86, 76, 68, 67, 63, 58, 50, 40, 41, 51, 59, 60,
          70, 94, 100, 109, 108, 99, 93, 75, 57, 33, 27, 18, 19, 28, 34, 52,
          78, 101, 114, 116, 115, 112, 98, 83, 49, 26, 13, 11, 12, 15, 29, 44,
          88, 110, 123, 124, 125, 118, 107, 85, 39, 17, 4, 3, 2, 9, 20, 42,
          89, 111, 122, 127, 126, 117, 106, 84, 38, 16, 5, 0, 1, 10, 21, 43,
          79, 102, 119, 121, 120, 113, 97, 82, 48, 25, 8, 6, 7, 14, 30, 45,
          71, 95, 103, 104, 105, 96, 92, 74, 56, 32, 24, 23, 22, 31, 35, 53,
          65, 72, 80, 90, 91, 81, 73, 66, 62, 55, 47, 37, 36, 46, 54, 61,
          63, 58, 50, 40, 41, 51, 59, 60, 64, 69, 77, 87, 86, 76, 68, 67,
          57, 33, 27, 18, 19, 28, 34, 52, 70, 94, 100, 109, 108, 99, 93, 75,
          49, 26, 13, 11, 12, 15, 29, 44, 78, 101, 114, 116, 115, 112, 98, 83,
          39, 17, 4, 3, 2, 9, 20, 42, 88, 110, 123, 124, 125, 118, 107, 85,
          38, 16, 5, 0, 1, 10, 21, 43, 89, 111, 122, 127, 126, 117, 106, 84,
          48, 25, 8, 6, 7, 14, 30, 45, 79, 102, 119, 121, 120, 113, 97, 82,
          56, 32, 24, 23, 22, 31, 35, 53, 71, 95, 103, 104, 105, 96, 92, 74,
          62, 55, 47, 37, 36, 46, 54, 61, 65, 72, 80, 90, 91, 81, 73, 66
        ]
      },
      levels: 6,
      matrix: "ditherMagic4x4Matrix",
      colorDither: true
    };
  }

  before(parameters, width, height, imageData) {
    let matrix = parameters.matrix,
      rows, cols,
      map = [], div = [], mod = [],
      i;

    if (typeof matrix === "string") {
      matrix = parameters.matrices[matrix];
    }

    rows = Math.sqrt(matrix.length);
    cols = Math.sqrt(matrix.length);

    for (i = 0; i < parameters.levels; i += 1) {
      map[i] = 255 * i / (parameters.levels - 1);
    }

    for (i = 0; i < 256; i += 1) {
      div[i] = parseInt((parameters.levels - 1) * i / 256);
      mod[i] = parseInt(i * (rows * cols + 1) / 256);
    }

    return {
      matrix: matrix,
      map: map,
      div: div,
      mod: mod,
      cols: cols,
      rows: rows
    };
  }

  callback(pixel, x, y, parameters, width, height) {
    let col = x % this.data.cols,
      row = y % this.data.rows,
      v = parameters.matrix[row * this.data.cols + col],
      red = pixel.r, green = pixel.g, blue = pixel.b,
      result = {a: pixel.a},
      value;

    if (parameters.colorDither) {
      result.r = this.data.map[this.data.mod[red] > v ? this.data.div[red] + 1 : this.data.div[red]];
      result.g = this.data.map[this.data.mod[green] > v ? this.data.div[green] + 1 : this.data.div[green]];
      result.b = this.data.map[this.data.mod[blue] > v ? this.data.div[blue] + 1 : this.data.div[blue]];
    }
    else {
      value = (red + green + blue) / 3;
      result.r = result.g = result.b = this.data.map[this.data.mod[value] > v ? this.data.div[value] + 1 : this.data.div[value]];
    }

    return result;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DitherEffect);

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BasePoint__ = __webpack_require__(0);


class EdgeEffect extends __WEBPACK_IMPORTED_MODULE_0__BasePoint__["a" /* default */] {
  static getName() {
    return 'edge';
  }

  getDefaultParameters() {
    return {
      matrixes: {
        robertsV: [
          0, 0, -1,
          0, 1, 0,
          0, 0, 0
        ],
        robertsH: [
          -1, 0, 0,
          0, 1, 0,
          0, 0, 0
        ],
        prewittV: [
          -1, 0, 1,
          -1, 0, 1,
          -1, 0, 1
        ],
        prewittH: [
          -1, -1, -1,
          0, 0, 0,
          1, 1, 1
        ],
        sobelV: [
          -1, 0, 1,
          -2, 0, 2,
          -1, 0, 1
        ],
        sobelH: [
          -1, -2, -1,
          0, 0, 0,
          1, 2, 1
        ],
        freiChenV: [
          -1, 0, 1,
          -Math.sqrt(2), 0, Math.sqrt(2),
          -1, 0, 1
        ],
        freiChenH: [
          -1, -Math.sqrt(2), -1,
          0, 0, 0,
          1, Math.sqrt(2), 1
        ]
      },
      hEdgeMatrix: "sobelV",
      vEdgeMatrix: "sobelH"
    };
  }

  before(parameters, width, height, imageData) {
    var hEdgeMatrix = parameters.hEdgeMatrix,
      vEdgeMatrix = parameters.vEdgeMatrix;

    if (typeof hEdgeMatrix === "string") {
      hEdgeMatrix = parameters.matrixes[parameters.hEdgeMatrix];
    }
    if (typeof vEdgeMatrix === "string") {
      vEdgeMatrix = parameters.matrixes[parameters.vEdgeMatrix];
    }
    return {
      hEdgeMatrix: hEdgeMatrix,
      vEdgeMatrix: vEdgeMatrix
    }
  }

  callback(pixel, x, y, parameters, width, height) {
    var r = 0, g = 0, b = 0,
      rh = 0, gh = 0, bh = 0,
      rv = 0, gv = 0, bv = 0,
      row, iy, col, ix, mOffset,
      pixel2, h, v;

    for (row = -1; row <= 1; row += 1) {
      iy = y + row;
      if (!(0 <= iy && iy < height)) {
        iy = y;
      }
      mOffset = 3 * (row + 1) + 1;
      for (col = -1; col <= 1; col += 1) {
        ix = x + col;
        if (!(0 <= ix && ix < width)) {
          ix = x;
        }
        pixel2 = this.getOriginalPixel(ix, iy);
        h = this.data.hEdgeMatrix[mOffset + col];
        v = this.data.vEdgeMatrix[mOffset + col];

        r = pixel2.r;
        g = pixel2.g;
        b = pixel2.b;

        rh += Math.floor(h * r);
        gh += Math.floor(h * g);
        bh += Math.floor(h * b);

        rv += Math.floor(v * r);
        gv += Math.floor(v * g);
        bv += Math.floor(v + b);
      }
    }
    r = Math.floor(Math.sqrt(rh * rh + rv * rv) / 1.8);
    g = Math.floor(Math.sqrt(gh * gh + gv * gv) / 1.8);
    b = Math.floor(Math.sqrt(bh * bh + bv * bv) / 1.8);
    return {
      r: r,
      g: g,
      b: b,
      a: pixel.a
    };
  }
}

/* harmony default export */ __webpack_exports__["a"] = (EdgeEffect);

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BasePoint__ = __webpack_require__(0);


class ExposureEffect extends __WEBPACK_IMPORTED_MODULE_0__BasePoint__["a" /* default */] {
  static getName() {
    return 'exposure';
  }

  getDefaultParameters() {
    return {
      exposure: 1
    };
  }

  callback(pixel, x, y, parameters, width, height) {
    pixel.r = (1 - Math.exp(-pixel.r / 255 * parameters.exposure)) * 255;
    pixel.g = (1 - Math.exp(-pixel.g / 255 * parameters.exposure)) * 255;
    pixel.b = (1 - Math.exp(-pixel.b / 255 * parameters.exposure)) * 255;

    return pixel;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ExposureEffect);

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BasePoint__ = __webpack_require__(0);


class GainEffect extends __WEBPACK_IMPORTED_MODULE_0__BasePoint__["a" /* default */] {
  static getName() {
    return 'gain';
  }

  getDefaultParameters() {
    return {
      gain: 1,
      bias: 1
    };
  }

  callback(pixel, x, y, parameters, width, height) {
    let red = (1 / parameters.gain - 2) * (1 - 2 * pixel.r / 255),
      green = (1 / parameters.gain - 2) * (1 - 2 * pixel.g / 255),
      blue = (1 / parameters.gain - 2) * (1 - 2 * pixel.b / 255);

    if (pixel.r / 255 < 0.5) {
      red = (pixel.r / 255) / red + 1;
    }
    else {
      red = (red - (pixel.r / 255)) / (red - 1);
    }

    if (pixel.g / 255 < 0.5) {
      green = (pixel.g / 255) / green + 1;
    }
    else {
      green = (green - (pixel.g / 255)) / (green - 1);
    }

    if (pixel.b / 255 < 0.5) {
      blue = (pixel.b / 255) / blue + 1;
    }
    else {
      blue = (blue - (pixel.b / 255)) / (blue - 1);
    }

    red = red / ((1 / parameters.bias - 2) * (1 - red) + 1);
    green = green / ((1 / parameters.bias - 2) * (1 - green) + 1);
    blue = blue / ((1 / parameters.bias - 2) * (1 - blue) + 1);

    pixel.r = red * 255;
    pixel.g = green * 255;
    pixel.b = blue * 255;

    return pixel;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GainEffect);

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BasePoint__ = __webpack_require__(0);


class GammaEffect extends __WEBPACK_IMPORTED_MODULE_0__BasePoint__["a" /* default */] {
  static getName() {
    return 'gamma';
  }

  getDefaultParameters() {
    return {
      gammaRed: 1,
      gammaGreen: 1,
      gammaBlue: 1
    };
  }

  before(parameters, width, height, imageData) {
    let table = {
      r: [],
      g: [],
      b: []
    }, i;

    for (i = 0; i < 256; i += 1) {
      table.r[i] = parseInt(((255 * Math.pow(i / 255, 1 / parameters.gammaRed)) + 0.5));
      table.g[i] = parseInt(((255 * Math.pow(i / 255, 1 / parameters.gammaGreen)) + 0.5));
      table.b[i] = parseInt(((255 * Math.pow(i / 255, 1 / parameters.gammaBlue)) + 0.5));
    }

    return {
      table: table
    };
  }

  callback(pixel, x, y, parameters, width, height) {
    return {
      r: this.data.table.r[pixel.r],
      g: this.data.table.g[pixel.g],
      b: this.data.table.b[pixel.b],
      a: pixel.a
    };
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GammaEffect);

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BasePoint__ = __webpack_require__(0);


class GrayScaleEffect extends __WEBPACK_IMPORTED_MODULE_0__BasePoint__["a" /* default */] {
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

/* harmony default export */ __webpack_exports__["a"] = (GrayScaleEffect);

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BasePoint__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_color__ = __webpack_require__(6);



class HSBAdjustEffect extends __WEBPACK_IMPORTED_MODULE_0__BasePoint__["a" /* default */] {
  static getName() {
    return 'hsb-adjust';
  }

  getDefaultParameters() {
    return {
      h: 1,
      s: 1,
      b: 1
    };
  }

  callback(pixel, x, y, parameters, width, height) {
    let hsb = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_color__["e" /* RGBtoHSB */])(pixel.r, pixel.g, pixel.b);

    hsb.h += parameters.h;
    while (hsb.h < 0) {
      hsb.h += Math.PI * 2;
    }

    hsb.s += parameters.s;
    hsb.s = Math.max(Math.min(hsb.s, 1), 0);

    hsb.b += parameters.b;
    hsb.b = Math.max(Math.min(hsb.b, 1), 0);

    let result = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_color__["f" /* HSBtoRGB */])(hsb.h, hsb.s, hsb.b);
    pixel.r = result.r;
    pixel.g = result.g;
    pixel.b = result.b;

    return pixel;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (HSBAdjustEffect);

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BasePoint__ = __webpack_require__(0);


class InvertEffect extends __WEBPACK_IMPORTED_MODULE_0__BasePoint__["a" /* default */] {
  static getName() {
    return 'invert';
  }

  callback(pixel, x, y, parameters, width, height) {
    pixel.r = 255 - pixel.r;
    pixel.g = 255 - pixel.g;
    pixel.b = 255 - pixel.b;
    return pixel;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (InvertEffect);

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BasePoint__ = __webpack_require__(0);


class InvertAlphaEffect extends __WEBPACK_IMPORTED_MODULE_0__BasePoint__["a" /* default */] {
  static getName() {
    return 'invert-alpha';
  }

  callback(pixel, x, y, parameters, width, height) {
    pixel.a = 255 - pixel.a;
    return pixel;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (InvertAlphaEffect);

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BasePoint__ = __webpack_require__(0);


class LevelsEffect extends __WEBPACK_IMPORTED_MODULE_0__BasePoint__["a" /* default */] {
  static getName() {
    return 'levels';
  }

  getDefaultParameters() {
    return {
      low: 0,
      high: 1,
      lowOutput: 0,
      highOutput: 1
    };
  }

  before(parameters, width, height, imageData) {
    let Histogram = function (imageData, width, height, offset, stride) {
      let i, j, index,
        x, y,
        histogram = new Array(3),
        minValue = new Array(4),
        maxValue = new Array(4),
        minFrequency = new Array(3),
        maxFrequency = new Array(3),
        mean = new Array(3),
        numSamples = width * height,
        isGray = true,
        RED = 0,
        GREEN = 1,
        BLUE = 2,
        GRAY = 3;

      for (i = 0; i < histogram.length; i += 1) {
        histogram[i] = new Array(256);
        for (j = 0; j < 256; j += 1) {
          histogram[i][j] = 0;
        }
      }

      for (y = 0; y < height; y += 1) {
        for (x = 0; x < width; x += 1) {
          index = y * width * 4 + x * 4;
          histogram[RED][imageData.data[index]]++;
          histogram[GREEN][imageData.data[index + 1]]++;
          histogram[BLUE][imageData.data[index + 2]]++;
        }
      }

      for (i = 0; i < 256; i += 1) {
        if (histogram[RED][i] !== histogram[GREEN][i] || histogram[GREEN][i] !== histogram[BLUE][i]) {
          isGray = false;
          break;
        }
      }

      for (i = 0; i < 3; i += 1) {
        for (j = 0; j < 256; j += 1) {
          if (histogram[i][j] > 0) {
            minValue[i] = j;
            break;
          }
        }
        for (j = 255; j >= 0; j -= 1) {
          if (histogram[i][j] > 0) {
            maxValue[i] = j;
            break;
          }
        }
        minFrequency[i] = Infinity;
        maxFrequency[i] = 0;
        for (j = 0; j < 256; j += 1) {
          minFrequency[i] = Math.min(minFrequency[i], histogram[i][j]);
          maxFrequency[i] = Math.max(maxFrequency[i], histogram[i][j]);
          mean[i] += j * histogram[i][j];
        }
        mean[i] /= numSamples;
        minValue[GRAY] = Math.min(minValue[RED], minValue[GREEN], minValue[BLUE]);
        maxValue[GRAY] = Math.max(maxValue[RED], maxValue[GREEN], maxValue[BLUE]);
      }

      this.getNumSamples = function () {
        return numSamples;
      };

      this.isGray = function () {
        return isGray;
      };

      this.getFrequency = function (channel, value) {
        if (!value) {
          if (numSamples > 0 && isGray && value >= 0 && value <= 255) {
            return histogram[0][value];
          }
          return -1;
        }
        if (numSamples < 1 || channel < 0 || channel > 2 || value < 0 || value > 255) {
          return -1;
        }
        return histogram[channel][value];
      };

      this.getMinFrequency = function (channel) {
        if (!channel) {
          if (numSamples > 0 && isGray) {
            return minFrequency[0];
          }
          return -1;
        }
        if (numSamples < 1 || channel < 0 || channel > 2) {
          return -1;
        }
        return minFrequency[channel];
      };

      this.getMaxFrequency = function (channel) {
        if (!channel) {
          if (numSamples > 0 && isGray) {
            return maxFrequency[0];
          }
          return -1;
        }
        if (numSamples < 1 || channel < 0 || channel > 2) {
          return -1;
        }
        return maxFrequency[channel];
      };

      this.getMinValue = function (channel) {
        if (!channel) {
          if (numSamples > 0 && isGray) {
            return minValue[0];
          }
          return -1;
        }
        return minValue[channel];
      };

      this.getMaxValue = function (channel) {
        if (!channel) {
          if (numSamples > 0 && isGray) {
            return maxValue[0];
          }
          return -1;
        }
        return maxValue[channel];
      };

      this.getMeanValue = function (channel) {
        if (!channel) {
          if (numSamples > 0 && isGray) {
            return mean[0];
          }
          return -1;
        }
        return mean[channel];
      }
    };

    let histogram = new Histogram(imageData, width, height, 0, width),
      lut = new Array(3),
      low = parameters.low * 255,
      high = parameters.high * 255,
      i, j;

    for (i = 0; i < lut.length; i += 1) {
      lut[i] = new Array(256);
    }
    if (low === high) {
      high++;
    }

    for (i = 0; i < 3; i += 1) {
      for (j = 0; j < 256; j += 1) {
        lut[i][j] = (255 * (parameters.lowOutput + (parameters.highOutput - parameters.lowOutput) * (j - low) / (high - low)))
      }
    }

    histogram.isGray(); // uglify fix - "Side effects in initialization of unused variable histogram" warning

    return {
      lut: lut
    }
  }

  callback(pixel, x, y, parameters, width, height) {
    return {
      r: this.data.lut[0][pixel.r],
      g: this.data.lut[1][pixel.g],
      b: this.data.lut[2][pixel.b],
      a: pixel.a
    };
  }
}

/* harmony default export */ __webpack_exports__["a"] = (LevelsEffect);

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BasePoint__ = __webpack_require__(0);


class RescaleEffect extends __WEBPACK_IMPORTED_MODULE_0__BasePoint__["a" /* default */] {
  static getName() {
    return 'rescale';
  }

  getDefaultParameters() {
    return {
      scale: 1
    };
  }

  callback(pixel, x, y, parameters, width, height) {
    pixel.r = parameters.scale * pixel.r;
    pixel.g = parameters.scale * pixel.g;
    pixel.b = parameters.scale * pixel.b;

    return pixel;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (RescaleEffect);

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BasePoint__ = __webpack_require__(0);


class GrayScaleEffect extends __WEBPACK_IMPORTED_MODULE_0__BasePoint__["a" /* default */] {
  static getName() {
    return 'sepia';
  }

  getDefaultParameters() {
    return {
      sepiaValue: 1
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

/* harmony default export */ __webpack_exports__["a"] = (GrayScaleEffect);

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BasePoint__ = __webpack_require__(0);


class SolarizeEffect extends __WEBPACK_IMPORTED_MODULE_0__BasePoint__["a" /* default */] {
  static getName() {
    return 'solarize';
  }

  callback(pixel, x, y, parameters, width, height) {
    var red = pixel.r / 255 > 0.5 ? 2 * ((pixel.r / 255) - 0.5) : 2 * (0.5 - (pixel.r / 255)),
      green = pixel.g / 255 > 0.5 ? 2 * ((pixel.g / 255) - 0.5) : 2 * (0.5 - (pixel.g / 255)),
      blue = pixel.b / 255 > 0.5 ? 2 * ((pixel.b / 255) - 0.5) : 2 * (0.5 - (pixel.b / 255));

    return {
      r: red * 255,
      g: green * 255,
      b: blue * 255,
      a: pixel.a
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (SolarizeEffect);

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BasePoint__ = __webpack_require__(0);


class ThresholdEffect extends __WEBPACK_IMPORTED_MODULE_0__BasePoint__["a" /* default */] {
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

/* harmony default export */ __webpack_exports__["a"] = (ThresholdEffect);

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BasePoint__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_color__ = __webpack_require__(6);



class TritoneEffect extends __WEBPACK_IMPORTED_MODULE_0__BasePoint__["a" /* default */] {
  static getName() {
    return 'tritone';
  }

  getDefaultParameters() {
    return {
      shadowColor: {
        r: 0,
        g: 0,
        b: 0,
        a: 255
      },
      midColor: {
        r: 136,
        g: 136,
        b: 136,
        a: 255
      },
      highColor: {
        r: 255,
        g: 255,
        b: 255,
        a: 255
      }
    };
  }

  before(parameters) {
    let lut = [],
      i, t;

    for (i = 0; i < 128; i += 1) {
      t = i / 127;
      lut[i] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_color__["d" /* mixColors */])(t, parameters.shadowColor, parameters.midColor);
    }
    for (i = 128; i < 256; i += 1) {
      t = (i - 127) / 128;
      lut[i] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_color__["d" /* mixColors */])(t, parameters.midColor, parameters.highColor);
    }
    return {
      lut: lut
    };
  }

  callback(pixel, x, y, parameters, width, height) {
    let brightness = Math.floor((pixel.r + pixel.g + pixel.b) / 3);
    return this.data.lut[brightness];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (TritoneEffect);

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseTransform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_common__ = __webpack_require__(2);



class CircleEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseTransform__["a" /* default */] {
  static getName() {
    return 'circle';
  }

  getDefaultParameters() {
    return {
      radius: 10,
      height: 20,
      angle: 0,
      spreadAngle: Math.PI,
      centreX: 0.5,
      centreY: 0.5
    };
  }

  before(parameters, width, height, imageData) {
    return {
      icentreX: width * parameters.centreX,
      icentreY: height * parameters.centreY,
      width: --width
    };
  }

  callback(x, y, parameters, width, height) {
    var dx = x - this.data.icentreX,
      dy = y - this.data.icentreX,
      theta = Math.atan2(-dy, -dx) + parameters.angle,
      r = Math.sqrt(dx * dx + dy * dy);

    theta = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_common__["e" /* mod */])(theta, 2 * Math.PI);

    return [
      this.data.width * theta / parameters.spreadAngle + 0.00001,
      height * (1 - (r - parameters.radius) / (height + 0.00001))
    ];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (CircleEffect);

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseTransform__ = __webpack_require__(1);


class DiffuseEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseTransform__["a" /* default */] {
  static getName() {
    return 'diffuse';
  }

  getDefaultParameters() {
    return {
      scale: 4
    };
  }

  before(parameters, width, height, imageData) {
    let sinTable = new Array(256),
      cosTable = new Array(256),
      i,
      angle;
    for (i = 0; i < 256; i += 1) {
      angle = Math.PI * 2 * i / 256;
      sinTable[i] = parameters.scale * Math.sin(angle);
      cosTable[i] = parameters.scale * Math.cos(angle);
    }
    return {
      sinTable: sinTable,
      cosTable: cosTable
    };
  }

  callback(x, y, parameters) {
    let angle = parseInt(Math.random() * 255),
      distance = Math.random();

    return [
      x + distance * this.data.sinTable[angle],
      y + distance * this.data.cosTable[angle]
    ];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DiffuseEffect);

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseTransform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_common__ = __webpack_require__(2);



class KaleidoscopeEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseTransform__["a" /* default */] {
  static getName() {
    return 'kaleidoscope';
  }

  getDefaultParameters() {
    return {
      centreX: 0.5,
      centreY: 0.5,
      angle: 0,
      angle2: 0,
      sides: 3,
      radius: 0
    };
  }

  before(parameters, width, height, imageData) {
    return {
      icentreX: width * parameters.centreX,
      icentreY: height * parameters.centreY
    };
  }

  callback(x, y, parameters) {
    var dx = x - this.data.icentreX,
      dy = y - this.data.icentreY,
      r = Math.sqrt(dx * dx + dy * dy),
      theta = Math.atan2(dy, dx) - parameters.angle - parameters.angle2;

    theta = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_common__["f" /* triangle */])(theta / Math.PI * parameters.sides * 0.5);

    if (parameters.radius !== 0) {
      var c = Math.cos(theta),
        radiusC = parameters.radius / c;
      r = radiusC * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_common__["f" /* triangle */])(r / radiusC);
    }

    theta += parameters.angle;

    return [
      this.data.icentreX + r * Math.cos(theta),
      this.data.icentreY + r * Math.sin(theta)
    ];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (KaleidoscopeEffect);

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseTransform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_noise__ = __webpack_require__(4);



class MarbleEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseTransform__["a" /* default */] {
  static getName() {
    return 'marble';
  }

  getDefaultParameters() {
    return {
      xScale: 4,
      yScale: 4,
      amount: 1,
      turbulence: 1
    };
  }

  before(parameters, width, height, imageData) {
    let sinTable = new Array(256),
      cosTable = new Array(256),
      i = 0,
      angle;

    for (i = 0; i < 256; i += 1) {
      angle = Math.PI * 2 * i / 256 * parameters.turbulence;
      sinTable[i] = -parameters.yScale * Math.sin(angle);
      cosTable[i] = parameters.yScale * Math.cos(angle);
    }
    return {
      sinTable: sinTable,
      cosTable: cosTable,
      displacementMap: function (x, y) {
        let result = 127 * (1 + __WEBPACK_IMPORTED_MODULE_1__helpers_noise__["a" /* default */].noise2(x / parameters.xScale, y / parameters.yScale));
        return Math.min(255, Math.max(0, result));
      }
    };
  }

  callback(x, y, parameters) {
    let displacement = Math.floor(this.data.displacementMap(x, y));
    return [
      x + this.data.sinTable[displacement],
      y + this.data.cosTable[displacement]
    ];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MarbleEffect);

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseTransform__ = __webpack_require__(1);


class RotateEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseTransform__["a" /* default */] {
  static getName() {
    return 'offset';
  }

  getDefaultParameters() {
    return {
      xOffset: 100,
      yOffset: 100,
      wrap: true
    };
  }

  callback(x, y, parameters, width, height) {
    if (parameters.wrap) {
      return [
        (x + width - parameters.xOffset) % width,
        (y + height - parameters.yOffset) % height
      ];
    }
    else {
      return [
        x - parameters.xOffset,
        y - parameters.yOffset
      ];
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (RotateEffect);

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseTransform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_noise__ = __webpack_require__(4);



class PerspectiveEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseTransform__["a" /* default */] {
  static getName() {
    return 'perspective';
  }

  getDefaultParameters() {
    return {
      x0: 0,
      y0: 0,
      x1: 1,
      y1: 0,
      x2: 1,
      y2: 1,
      x3: 0,
      y3: 1
    };
  }

  before(parameters, width, height, imageData) {
    function unitSquareToQuad() {
      var result = {},
        x0 = Math.floor(width * parameters.x0),
        y0 = Math.floor(height * parameters.y0),
        x1 = Math.floor(width * parameters.x1),
        y1 = Math.floor(height * parameters.y1),
        x2 = Math.floor(width * parameters.x2),
        y2 = Math.floor(height * parameters.y2),
        x3 = Math.floor(width * parameters.x3),
        y3 = Math.floor(height * parameters.y3),
        dx1 = x1 - x2,
        dy1 = y1 - y2,
        dx2 = x3 - x2,
        dy2 = y3 - y2,
        dx3 = x0 - x1 + x2 - x3,
        dy3 = y0 - y1 + y2 - y3;

      if (dx3 == 0 && dy3 == 0) {
        result.a11 = x1 - x0;
        result.a21 = x2 - x1;
        result.a31 = x0;
        result.a12 = y1 - y0;
        result.a22 = y2 - y1;
        result.a32 = y0;
        result.a13 = result.a23 = 0;
      }
      else {
        result.a13 = (dx3 * dy2 - dx2 * dy3) / (dx1 * dy2 - dy1 * dx2);
        result.a23 = (dx1 * dy3 - dy1 * dx3) / (dx1 * dy2 - dy1 * dx2);
        result.a11 = x1 - x0 + result.a13 * x1;
        result.a21 = x3 - x0 + result.a23 * x3;
        result.a31 = x0;
        result.a12 = y1 - y0 + result.a13 * y1;
        result.a22 = y3 - y0 + result.a23 * y3;
        result.a32 = y0;
      }

      result.a33 = 1;

      return result;
    }

    var result = unitSquareToQuad();

    result.A = result.a22 * result.a33 - result.a32 * result.a23;
    result.B = result.a31 * result.a23 - result.a21 * result.a33;
    result.C = result.a21 * result.a32 - result.a31 * result.a22;
    result.D = result.a32 * result.a13 - result.a12 * result.a33;
    result.E = result.a11 * result.a33 - result.a31 * result.a13;
    result.F = result.a31 * result.a12 - result.a11 * result.a32;
    result.G = result.a12 * result.a23 - result.a22 * result.a13;
    result.H = result.a21 * result.a13 - result.a11 * result.a23;
    result.I = result.a11 * result.a22 - result.a21 * result.a12;

    return result;
  }

  callback(x, y, parameters, width, height) {
    return [
      width * (this.data.A * x + this.data.B * y + this.data.C) / (this.data.G * x + this.data.H * y + this.data.I),
      height * (this.data.D * x + this.data.E * y + this.data.F) / (this.data.G * x + this.data.H * y + this.data.I)
    ];
  }
}
/* harmony default export */ __webpack_exports__["a"] = (PerspectiveEffect);

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseTransform__ = __webpack_require__(1);


class PinchEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseTransform__["a" /* default */] {
  static getName() {
    return 'pinch';
  }

  getDefaultParameters() {
    return {
      angle: 0,
      centreX: 0.5,
      centreY: 0.5,
      radius: 100,
      amount: 0.5
    };
  }

  before(parameters, width, height, imageData) {
    var icentreX = width * parameters.centreX,
      icentreY = height * parameters.centreY,
      radius = parameters.radius,
      radius2;
    if (radius === 0) {
      radius = Math.min(icentreX, icentreY);
    }
    radius2 = radius * radius;
    return {
      icentreX: icentreX,
      icentreY: icentreY,
      radius: radius,
      radius2: radius2
    };
  }

  callback(x, y, parameters) {
    var dx = x - this.data.icentreX,
      dy = y - this.data.icentreY,
      distance = dx * dx + dy * dy,
      d, t, e, a, s, c;

    if (distance > this.data.radius2 || distance === 0) {
      return [x, y];
    }
    d = Math.sqrt(distance / this.data.radius2);
    t = Math.pow(Math.sin(Math.PI * 0.5 * d), -parameters.amount);

    dx *= t;
    dy *= t;

    e = 1 - d;
    a = parameters.angle * e * e;

    s = Math.sin(a);
    c = Math.cos(a);

    return [
      this.data.icentreX + c * dx - s * dy,
      this.data.icentreY + s * dx + c * dy
    ];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (PinchEffect);

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseTransform__ = __webpack_require__(1);


class PolarEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseTransform__["a" /* default */] {
  static getName() {
    return 'polar';
  }

  getDefaultParameters() {
    return {
      type: "RECT_TO_POLAR" // RECT_TO_POLAR, POLAR_TO_RECT, INVERT_IN_CIRCLE
    };
  }

  before(parameters, width, height, imageData) {
    return {
      centreX: width / 2,
      centreY: height / 2,
      radius: Math.max(width / 2, height / 2),
      sqr: function (x) {
        return x * x;
      }
    };
  }

  callback(x, y, parameters, width, height) {
    var theta, theta2, t,
      m, xMax, yMax, nx, ny, xmax, ymax,
      dx, dy, distance,
      r = 0;

    switch (parameters.type) {
      case "RECT_TO_POLAR":
        if (x >= this.data.centreX) {
          if (y > this.data.centreY) {
            theta = Math.PI - Math.atan(((x - this.data.centreX)) / ((y - this.data.centreY)));
            r = Math.sqrt(this.data.sqr(x - this.data.centreX) + this.data.sqr(y - this.data.centreY));
          }
          else {
            if (y < this.data.centreY) {
              theta = Math.atan(((x - this.data.centreX)) / ((this.data.centreY - y)));
              r = Math.sqrt(this.data.sqr(x - this.data.centreX) + this.data.sqr(this.data.centreY - y));
            }
            else {
              theta = Math.PI / 2;
              r = x - this.data.centreX;
            }
          }
        }
        else {
          if (x < this.data.centreX) {
            if (y < this.data.centreY) {
              theta = (Math.PI * 2) - Math.atan(((this.data.centreX - x)) / ((this.data.centreY - y)));
              r = Math.sqrt(this.data.sqr(this.data.centreX - x) + this.data.sqr(this.data.centreY - y));
            }
            else {
              if (y > this.data.centreY) {
                theta = Math.PI + Math.atan(((this.data.centreX - x)) / ((y - this.data.centreY)));
                r = Math.sqrt(this.data.sqr(this.data.centreX - x) + this.data.sqr(y - this.data.centreY));
              }
              else {
                theta = 1.5 * Math.PI;
                r = this.data.centreX - x;
              }
            }
          }
        }
        if (x != this.data.centreX) {
          m = Math.abs(((y - this.data.centreY)) / ((x - this.data.centreX)));
        }
        else {
          m = 0;
        }

        if (m <= ((height / width))) {
          if (x == this.data.centreX) {
            xMax = 0;
            yMax = this.data.centreY;
          }
          else {
            xMax = this.data.centreX;
            yMax = m * xMax;
          }
        }
        else {
          yMax = this.data.centreY;
          xMax = yMax / m;
        }

        return [
          (width - 1) - (width - 1) / (Math.PI * 2 * theta),
          height * r / this.data.radius
        ];

      case "POLAR_TO_RECT":

        theta = x / width * Math.PI * 2;

        if (theta >= 1.5 * Math.PI) {
          theta2 = Math.PI * 2 - theta;
        }
        else {
          if (theta >= Math.PI) {
            theta2 = theta - Math.PI;
          }
          else {
            if (theta >= 0.5 * Math.PI
            ) {
              theta2 = Math.PI - theta;
            }
            else {
              theta2 = theta;
            }
          }
        }

        t = Math.tan(theta2);
        if (t != 0) {
          m = 1.0 / t;
        }
        else {
          m = 0;
        }

        if (m <= ((height) / (width))) {
          if (theta2 == 0) {
            xmax = 0;
            ymax = this.data.centreY;
          }
          else {
            xmax = this.data.centreX;
            ymax = m * xmax;
          }
        }
        else {
          ymax = this.data.centreY;
          xmax = ymax / m;
        }

        r = this.data.radius * (y / (height));

        nx = -r * Math.sin(theta2);
        ny = r * Math.cos(theta2);

        if (theta >= 1.5 * Math.PI) {
          return [
            this.data.centreX - nx,
            this.data.centreY - ny
          ];
        }
        else {
          if (theta >= Math.PI) {
            return [
              this.data.centreX - nx,
              this.data.centreY + ny
            ];
          }
          else {
            if (theta >= 0.5 * Math.PI) {
              return [
                this.data.centreX + nx,
                this.data.centreY + ny
              ];
            }
            else {
              return [
                this.data.centreX + nx,
                this.data.centreY - ny
              ];
            }
          }
        }
        break; // TODO: ???

      case "INVERT_IN_CIRCLE":
        dx = x - this.data.centreX;
        dy = y - this.data.centreY;
        distance = dx * dx + dy * dy;

        return [
          this.data.centreX + this.data.centreX * this.data.centreX * dx / distance,
          this.data.centreY + this.data.centreY * this.data.centreY * dy / distance
        ];
    }
  }
}
/* harmony default export */ __webpack_exports__["a"] = (PolarEffect);

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseTransform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_noise__ = __webpack_require__(4);




class RippleEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseTransform__["a" /* default */] {
  static getName() {
    return 'ripple';
  }

  getDefaultParameters() {
    return {
      xAmplitude: 5,
      yAmplitute: 0,
      xWaveLength: 16,
      yWaveLength: 16,
      waveType: "SINE" // SAWTOOTH TRIANGLE NOISE
    };
  }

  callback(x, y, parameters) {
    var nx = y / parameters.xWaveLength,
      ny = x / parameters.yWaveLength,
      fx, fy;

    switch (parameters.waveType) {
      case "SINE":
      default:
        fx = Math.sin(nx);
        fy = Math.sin(ny);
        break;

      case "SAWTOOTH":
        fx = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_common__["e" /* mod */])(nx, 1);
        fy = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_common__["e" /* mod */])(ny, 1);
        break;

      case "TRIANGLE":
        fx = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_common__["f" /* triangle */])(nx);
        fy = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_common__["f" /* triangle */])(ny);
        break;

      case "NOISE":
        fx = __WEBPACK_IMPORTED_MODULE_2__helpers_noise__["a" /* default */].noise1(nx);
        fy = __WEBPACK_IMPORTED_MODULE_2__helpers_noise__["a" /* default */].noise1(ny);
        break;
    }

    return [
      x + parameters.xAmplitude * fx,
      y + parameters.yAmplitute * fy
    ];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (RippleEffect);

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseTransform__ = __webpack_require__(1);


class RotateEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseTransform__["a" /* default */] {
  static getName() {
    return 'rotate';
  }

  getDefaultParameters() {
    return {
      angle: Math.PI
    };
  }

  before(parameters, width, height, imageData) {
    return {
      cos: Math.cos(parameters.angle),
      sin: Math.sin(parameters.angle),
      icentreX: width / 2,
      icentreY: height / 2
    };
  }

  callback(x, y, parameters, width, height) {
    return [
      ((this.data.cos * (x - this.data.icentreX)) - (this.data.sin * (y - this.data.icentreY)) + this.data.icentreY),
      ((this.data.sin * (x - this.data.icentreX)) - (this.data.cos * (y - this.data.icentreY)) + this.data.icentreY)
    ];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (RotateEffect);

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseTransform__ = __webpack_require__(1);


class ShearEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseTransform__["a" /* default */] {
  static getName() {
    return 'shear';
  }

  getDefaultParameters() {
    return {
      xAngle: 0,
      yAngle: 0,
      xOffset: 0,
      yOffset: 0
    };
  }

  before(parameters, width, height) {
    return {
      shx: Math.sin(parameters.xAngle),
      shy: Math.sin(parameters.yAngle)
    };
  }

  callback(x, y, parameters) {
    return [
      x + parameters.xOffset + (y * this.data.shx),
      y + parameters.yOffset + (x * this.data.shy)
    ];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ShearEffect);

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseTransform__ = __webpack_require__(1);


class SphereEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseTransform__["a" /* default */] {
  static getName() {
    return 'sphere';
  }

  getDefaultParameters() {
    return {
      a: 0,
      b: 0,
      centreX: 0.5,
      centreY: 0.5,
      refractionIndex: 1.5
    };
  }

  before(parameters, width, height) {
    var icentreX = width * parameters.centreX,
      icentreY = height * parameters.centreY,
      a = parameters.a,
      b = parameters.b,
      a2, b2;
    if (a === 0) {
      a = width / 2;
    }
    if (b === 0) {
      b = height / 2;
    }
    a2 = a * a;
    b2 = b * b;

    return {
      icentreX: icentreX,
      icentreY: icentreY,
      a: a,
      b: b,
      a2: a2,
      b2: b2
    };
  }

  callback(x, y, parameters) {
    var dx = x - this.data.icentreX,
      dy = y - this.data.icentreY,
      x2 = dx * dx,
      y2 = dy * dy,
      rRefraction = 1 / parameters.refractionIndex,
      z = Math.sqrt((1 - x2 / this.data.a2 - y2 / this.data.b2) * (this.data.a * this.data.b)),
      z2 = z * z,
      xAngle = Math.acos(dx / Math.sqrt(x2 + z2)),
      angle1 = Math.PI / 2 - xAngle,
      angle2 = Math.asin(Math.sin(angle1) * rRefraction),
      yAngle = Math.acos(dy / Math.sqrt(y2 + z2)),
      ret = new Array(2);

    if (y2 >= (this.data.b2 - (this.data.b2 / x2) / this.data.a2)) {
      return [x, y];
    }

    angle2 = (Math.PI / 2) - xAngle - angle2;
    ret[0] = x - Math.tan(angle2) * z;

    angle1 = (Math.PI / 2) - yAngle;
    angle2 = Math.asin(Math.sin(angle1) * rRefraction);
    angle2 = (Math.PI / 2) - yAngle - angle2;
    ret[1] = y - Math.tan(angle2) * z;
    return ret;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (SphereEffect);

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseTransform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_noise__ = __webpack_require__(4);



class SwimEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseTransform__["a" /* default */] {
  static getName() {
    return 'swim';
  }

  getDefaultParameters() {
    return {
      scale: 32,
      turbulence: 0,
      amount: 1,
      time: 0,
      angle: 0,
      stretch: 1
    };
  }

  before(parameters, width, height) {
    var cos = Math.cos(parameters.angle),
      sin = Math.sin(parameters.angle);

    return {
      m00: cos,
      m01: sin,
      m10: -sin,
      m11: cos
    };
  }

  callback(x, y, parameters) {
    var nx = this.data.m00 * x + this.data.m01 * y,
      ny = this.data.m10 * x + this.data.m11 * y;

    nx /= parameters.scale;
    ny /= parameters.scale * parameters.stretch;

    if (parameters.turbulence === 1) {
      return [
        x + parameters.amount * __WEBPACK_IMPORTED_MODULE_1__helpers_noise__["a" /* default */].noise3(nx + 0.5, ny, parameters.time),
        y + parameters.amount * __WEBPACK_IMPORTED_MODULE_1__helpers_noise__["a" /* default */].noise3(nx, ny + 0.5, parameters.time)
      ];
    }
    return [
      x + parameters.amount * __WEBPACK_IMPORTED_MODULE_1__helpers_noise__["a" /* default */].turbulence3(nx + 0.5, ny, parameters.turbulence, parameters.time),
      y + parameters.amount * __WEBPACK_IMPORTED_MODULE_1__helpers_noise__["a" /* default */].turbulence3(nx, ny + 0.5, parameters.turbulence, parameters.time)
    ];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (SwimEffect);

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseTransform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_noise__ = __webpack_require__(4);



class TwirlEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseTransform__["a" /* default */] {
  static getName() {
    return 'twirl';
  }

  getDefaultParameters() {
    return {
      angle: 0,
      centreX: 0.5,
      centreY: 0.5,
      radius: 100
    };
  }

  before(parameters, width, height) {
    var iCentreX = width * parameters.centreX,
      iCentreY = height * parameters.centreY,
      radius = parameters.radius,
      radius2;

    if (radius === 0) {
      radius = Math.min(iCentreX, iCentreY);
    }
    radius2 = radius * radius;

    return {
      iCentreX: iCentreX,
      iCentreY: iCentreY,
      radius: radius,
      radius2: radius2
    };
  }

  callback(x, y, parameters) {
    var dx = x - this.data.iCentreX,
      dy = y - this.data.iCentreY,
      distance = dx * dx + dy * dy,
      a;

    if (distance > parameters.radius2) {
      return [x, y];
    }

    distance = Math.sqrt(distance);
    a = Math.atan2(dy, dx) + parameters.angle * (parameters.radius - distance) / parameters.radius;

    return [
      this.data.iCentreX + distance * Math.cos(a),
      this.data.iCentreY + distance * Math.sin(a)
    ];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (TwirlEffect);

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseTransform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_noise__ = __webpack_require__(4);



class WaterEffect extends __WEBPACK_IMPORTED_MODULE_0__BaseTransform__["a" /* default */] {
  static getName() {
    return 'water';
  }

  getDefaultParameters() {
    return {
      waveLength: 16,
      amplitude: 10,
      phase: 0,
      centreX: 0.5,
      centreY: 0.5,
      radius: 50
    };
  }

  before(parameters, width, height) {
    var iCentreX = width * parameters.centreX,
      iCentreY = height * parameters.centreY,
      radius = parameters.radius,
      radius2;

    if (radius === 0) {
      radius = Math.min(iCentreX, iCentreY);
    }
    radius2 = radius * radius;

    return {
      iCentreX: iCentreX,
      iCentreY: iCentreY,
      radius: radius,
      radius2: radius2
    };
  }

  callback(x, y, parameters) {
    var dx = x - this.data.iCentreX,
      dy = y - this.data.iCentreY,
      distance2 = dx * dx + dy * dy,
      distance,
      amount;

    if (distance2 > this.data.radius2) {
      return [x, y];
    }
    distance = Math.sqrt(distance2);
    amount = parameters.amplitude * Math.sin(distance / parameters.waveLength * Math.PI * 2 - parameters.phase);
    amount *= (parameters.radius - distance) / parameters.radius;
    if (distance !== 0) {
      amount *= parameters.waveLength / distance;
    }
    return [x + dx * amount, y + dy * amount];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (WaterEffect);

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = resizeNearestNeighbour;
/* harmony export (immutable) */ __webpack_exports__["b"] = resizeBilinearInterpolation;
/* harmony export (immutable) */ __webpack_exports__["c"] = resizeBiquadraticInterpolation;
function resizeNearestNeighbour(oldImageData, newImageData, newWidth, newHeight) {
  let oldWidth = oldImageData.width,
    oldHeight = oldImageData.height,
    ratioX = oldWidth / newWidth,
    ratioY = oldHeight / newHeight,
    oldPixelIndex,
    newPixelIndex,
    x, y;

  for (y = 0; y < newHeight; y += 1) {
    for (x = 0; x < newWidth; x += 1) {
      oldPixelIndex = Math.floor(y * ratioY) * oldWidth * 4 + Math.floor(x * ratioX) * 4;
      newPixelIndex = y * newWidth * 4 + x * 4;

      newImageData.data[newPixelIndex + 0] = oldImageData.data[oldPixelIndex + 0];
      newImageData.data[newPixelIndex + 1] = oldImageData.data[oldPixelIndex + 1];
      newImageData.data[newPixelIndex + 2] = oldImageData.data[oldPixelIndex + 2];
      newImageData.data[newPixelIndex + 3] = oldImageData.data[oldPixelIndex + 3];
    }
  }

  return newImageData;
}

function resizeBilinearInterpolation(oldImageData, newImageData, newWidth, newHeight) {
  let oldWidth = oldImageData.width,
    oldHeight = oldImageData.height,
    ratioX = oldWidth / newWidth,
    ratioY = oldHeight / newHeight,
    newPixelIndex,
    x, y,
    x0, y0,
    dx, dy,
    x1, y1,
    oldPixelIndex00, oldPixelIndex01, oldPixelIndex10, oldPixelIndex11,
    i, j;

  for (i = 0; i < newHeight; i += 1) {
    for (j = 0; j < newWidth; j += 1) {
      x = j * ratioX;
      y = i * ratioY;
      x0 = Math.floor(x);
      y0 = Math.floor(y);
      dx = x - x0;
      dy = y - y0;
      x1 = x0 + 1;
      y1 = y0 + 1;

      if (x1 >= oldWidth) {
        x1 = x0;
      }
      if (y1 >= oldHeight) {
        y1 = y0;
      }

      oldPixelIndex00 = (y0 * oldWidth + x0) * 4;
      oldPixelIndex01 = (y0 * oldWidth + x1) * 4;
      oldPixelIndex10 = (y1 * oldWidth + x0) * 4;
      oldPixelIndex11 = (y1 * oldWidth + x1) * 4;
      newPixelIndex = (i * newWidth + j) * 4;

      newImageData.data[newPixelIndex] =
        (1.0 - dy) * ((1.0 - dx) * oldImageData.data[oldPixelIndex00] + dx * oldImageData.data[oldPixelIndex01]) +
        dy * ((1.0 - dx) * oldImageData.data[oldPixelIndex10] + dx * oldImageData.data[oldPixelIndex11]);
      newImageData.data[newPixelIndex + 1] =
        (1.0 - dy) * ((1.0 - dx) * oldImageData.data[oldPixelIndex00 + 1] + dx * oldImageData.data[oldPixelIndex01 + 1]) +
        dy * ((1.0 - dx) * oldImageData.data[oldPixelIndex10 + 1] + dx * oldImageData.data[oldPixelIndex11 + 1]);
      newImageData.data[newPixelIndex + 2] =
        (1.0 - dy) * ((1.0 - dx) * oldImageData.data[oldPixelIndex00 + 2] + dx * oldImageData.data[oldPixelIndex01 + 2]) +
        dy * ((1.0 - dx) * oldImageData.data[oldPixelIndex10 + 2] + dx * oldImageData.data[oldPixelIndex11 + 2]);
      newImageData.data[newPixelIndex + 3] =
        (1.0 - dy) * ((1.0 - dx) * oldImageData.data[oldPixelIndex00 + 3] + dx * oldImageData.data[oldPixelIndex01 + 3]) +
        dy * ((1.0 - dx) * oldImageData.data[oldPixelIndex10 + 3] + dx * oldImageData.data[oldPixelIndex11 + 3]);
    }
  }

  return newImageData;
}

function resizeBiquadraticInterpolation(oldImageData, newImageData, newWidth, newHeight) {
  let interpolate = function interpolate(f1, f2, f3, d) {
      return (f2 + (f3 - f1) * d + (f1 - 2 * f2 + f3) * d * d);
    },
    interpolateNormalize = function interpolateNormalize(f1, f2, f3, d) {
      let result = interpolate(f1, f2, f3, d);
      if (result > 255) {
        return 255;
      }
      if (result < 0) {
        return 0;
      }
      return Math.floor(result);
    },
    oldWidth = oldImageData.width,
    oldHeight = oldImageData.height,
    ratioX = oldWidth / newWidth,
    ratioY = oldHeight / newHeight,
    x, y,
    x0, y0, x1, y1, x2, y2,
    dx, dy,
    oldPixelIndex00, oldPixelIndex01, oldPixelIndex02,
    oldPixelIndex10, oldPixelIndex11, oldPixelIndex12,
    oldPixelIndex20, oldPixelIndex21, oldPixelIndex22,
    newPixelIndex,
    i, j;

  for (i = 0; i < newHeight; i += 1) {
    for (j = 0; j < newWidth; j += 1) {
      x = j * ratioX;
      y = i * ratioY;

      x1 = Math.floor(x);
      y1 = Math.floor(y);
      dx = (x - x1) * 0.5;
      dy = (y - y1) * 0.5;

      if (x1 - 1 >= 0) {
        x0 = x1 - 1;
      }
      else {
        x0 = x1;
      }

      if (y1 - 1 >= 0) {
        y0 = y1 - 1;
      }
      else {
        y0 = y1;
      }

      if (x1 + 1 >= oldWidth) {
        x2 = x1;
      }
      else {
        x2 = x1 + 1;
      }

      if (y1 + 1 >= oldWidth) {
        y2 = y1;
      }
      else {
        y2 = y1 + 1;
      }

      oldPixelIndex00 = (y0 * oldWidth + x0) * 4;
      oldPixelIndex01 = (y0 * oldWidth + x1) * 4;
      oldPixelIndex02 = (y0 * oldWidth + x2) * 4;
      oldPixelIndex10 = (y1 * oldWidth + x0) * 4;
      oldPixelIndex11 = (y1 * oldWidth + x1) * 4;
      oldPixelIndex12 = (y1 * oldWidth + x2) * 4;
      oldPixelIndex20 = (y2 * oldWidth + x0) * 4;
      oldPixelIndex21 = (y2 * oldWidth + x1) * 4;
      oldPixelIndex22 = (y2 * oldWidth + x2) * 4;

      newPixelIndex = (i * newWidth + j) * 4;

      newImageData.data[newPixelIndex] = (
        interpolateNormalize(
          interpolate(oldImageData.data[oldPixelIndex00], oldImageData.data[oldPixelIndex01], oldImageData.data[oldPixelIndex02], dx),
          interpolate(oldImageData.data[oldPixelIndex10], oldImageData.data[oldPixelIndex11], oldImageData.data[oldPixelIndex12], dx),
          interpolate(oldImageData.data[oldPixelIndex20], oldImageData.data[oldPixelIndex21], oldImageData.data[oldPixelIndex22], dx),
          dy)
      );

      newImageData.data[newPixelIndex + 1] = (
        interpolateNormalize(
          interpolate(oldImageData.data[oldPixelIndex00 + 1], oldImageData.data[oldPixelIndex01 + 1], oldImageData.data[oldPixelIndex02 + 1], dx),
          interpolate(oldImageData.data[oldPixelIndex10 + 1], oldImageData.data[oldPixelIndex11 + 1], oldImageData.data[oldPixelIndex12 + 1], dx),
          interpolate(oldImageData.data[oldPixelIndex20 + 1], oldImageData.data[oldPixelIndex21 + 1], oldImageData.data[oldPixelIndex22 + 1], dx),
          dy)
      );

      newImageData.data[newPixelIndex + 2] = (
        interpolateNormalize(
          interpolate(oldImageData.data[oldPixelIndex00 + 2], oldImageData.data[oldPixelIndex01 + 2], oldImageData.data[oldPixelIndex02 + 2], dx),
          interpolate(oldImageData.data[oldPixelIndex10 + 2], oldImageData.data[oldPixelIndex11 + 2], oldImageData.data[oldPixelIndex12 + 2], dx),
          interpolate(oldImageData.data[oldPixelIndex20 + 2], oldImageData.data[oldPixelIndex21 + 2], oldImageData.data[oldPixelIndex22 + 2], dx),
          dy)
      );

      newImageData.data[newPixelIndex + 3] = (
        interpolateNormalize(
          interpolate(oldImageData.data[oldPixelIndex00 + 3], oldImageData.data[oldPixelIndex01 + 3], oldImageData.data[oldPixelIndex02 + 3], dx),
          interpolate(oldImageData.data[oldPixelIndex10 + 3], oldImageData.data[oldPixelIndex11 + 3], oldImageData.data[oldPixelIndex12 + 3], dx),
          interpolate(oldImageData.data[oldPixelIndex20 + 3], oldImageData.data[oldPixelIndex21 + 3], oldImageData.data[oldPixelIndex22 + 3], dx),
          dy)
      );
    }
  }

  return newImageData;
}

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ })
/******/ ])));
//# sourceMappingURL=imagizer.node.dev.js.map