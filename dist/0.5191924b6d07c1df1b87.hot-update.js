webpackHotUpdate(0,{

/***/ 331:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(318);
	
	var _BasePoint2 = _interopRequireDefault(_BasePoint);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var LevelsEffect = function (_BasePointEffect) {
	    _inherits(LevelsEffect, _BasePointEffect);
	
	    function LevelsEffect() {
	        _classCallCheck(this, LevelsEffect);
	
	        return _possibleConstructorReturn(this, (LevelsEffect.__proto__ || Object.getPrototypeOf(LevelsEffect)).apply(this, arguments));
	    }
	
	    _createClass(LevelsEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                low: 0,
	                high: 1,
	                lowOutput: 0,
	                highOutput: 1
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height, imageData) {
	            var Histogram = function Histogram(imageData, width, height, offset, stride) {
	                var i = void 0,
	                    j = void 0,
	                    index = void 0,
	                    x = void 0,
	                    y = void 0,
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
	                };
	            };
	
	            var histogram = new Histogram(imageData, width, height, 0, width),
	                scale = 255 / histogram.getNumSamples(),
	                lut = new Array(3),
	                low = parameters.low * 255,
	                high = parameters.high * 255,
	                i = void 0,
	                j = void 0;
	
	            for (i = 0; i < lut.length; i += 1) {
	                lut[i] = new Array(256);
	            }
	            if (low === high) {
	                high++;
	            }
	
	            for (i = 0; i < 3; i += 1) {
	                for (j = 0; j < 256; j += 1) {
	                    lut[i][j] = 255 * (parameters.lowOutput + (parameters.highOutput - parameters.lowOutput) * (j - low) / (high - low));
	                }
	            }
	
	            return {
	                lut: lut
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            return {
	                r: this.data.lut[0][pixel.r],
	                g: this.data.lut[1][pixel.g],
	                b: this.data.lut[2][pixel.b],
	                a: pixel.a
	            };
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'levels';
	        }
	    }]);
	
	    return LevelsEffect;
	}(_BasePoint2.default);
	
	exports.default = LevelsEffect;

/***/ }

})
//# sourceMappingURL=0.5191924b6d07c1df1b87.hot-update.js.map