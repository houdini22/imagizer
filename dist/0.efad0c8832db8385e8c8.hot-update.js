webpackHotUpdate(0,{

/***/ 306:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _GrayScale = __webpack_require__(317);
	
	var _GrayScale2 = _interopRequireDefault(_GrayScale);
	
	var _Sepia = __webpack_require__(319);
	
	var _Sepia2 = _interopRequireDefault(_Sepia);
	
	var _Contrast = __webpack_require__(320);
	
	var _Contrast2 = _interopRequireDefault(_Contrast);
	
	var _Brightness = __webpack_require__(321);
	
	var _Brightness2 = _interopRequireDefault(_Brightness);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var availableEffects = {};
	
	function add(name, _class) {
	    availableEffects[name] = _class;
	}
	
	add('gray-scale', _GrayScale2.default);
	add('sepia', _Sepia2.default);
	add('contrast', _Contrast2.default);
	add('brightness', _Brightness2.default);
	
	var EffectsRepository = function () {
	    function EffectsRepository() {
	        _classCallCheck(this, EffectsRepository);
	    }
	
	    _createClass(EffectsRepository, null, [{
	        key: 'get',
	        value: function get(name) {
	            return availableEffects[name];
	        }
	    }]);
	
	    return EffectsRepository;
	}();
	
	exports.default = EffectsRepository;

/***/ },

/***/ 317:
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
	
	var GrayScaleEffect = function (_BaseColorEffect) {
	    _inherits(GrayScaleEffect, _BaseColorEffect);
	
	    function GrayScaleEffect() {
	        _classCallCheck(this, GrayScaleEffect);
	
	        return _possibleConstructorReturn(this, (GrayScaleEffect.__proto__ || Object.getPrototypeOf(GrayScaleEffect)).apply(this, arguments));
	    }
	
	    _createClass(GrayScaleEffect, [{
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            var newRGB = 0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b;
	            return {
	                r: newRGB,
	                g: newRGB,
	                b: newRGB,
	                a: pixel.a
	            };
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'gray-scale';
	        }
	    }]);
	
	    return GrayScaleEffect;
	}(_BasePoint2.default);
	
	exports.default = GrayScaleEffect;

/***/ },

/***/ 318:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Base = __webpack_require__(309);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	var _extend = __webpack_require__(310);
	
	var _extend2 = _interopRequireDefault(_extend);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BasePointEffect = function (_BaseEffect) {
	    _inherits(BasePointEffect, _BaseEffect);
	
	    function BasePointEffect() {
	        _classCallCheck(this, BasePointEffect);
	
	        return _possibleConstructorReturn(this, (BasePointEffect.__proto__ || Object.getPrototypeOf(BasePointEffect)).apply(this, arguments));
	    }
	
	    _createClass(BasePointEffect, [{
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            throw "Extend it.";
	        }
	    }, {
	        key: 'run',
	        value: function run(imageData, parameters) {
	
	            parameters = (0, _extend2.default)(true, {}, this.getDefaultParameters(), parameters);
	
	            var x = void 0,
	                y = void 0,
	                firstPixelIndex = void 0,
	                result = void 0,
	                imageDataCopy = new Uint8ClampedArray(imageData.data),
	                // copy image data
	            /**
	             * Get ImageData array index from x and y position
	             * @param x
	             * @param y
	             * @returns {number}
	             */
	            getIndex = function getIndex(x, y) {
	                return y * imageData.width * 4 + x * 4;
	            },
	                normalizePixelValue = function normalizePixelValue(value) {
	                return Math.min(Math.max(value, 0), 255) | 0;
	            },
	                sandbox = { // object invoked as this in effect callback
	                /**
	                 * Get changed pixel
	                 * @param {int} x
	                 * @param {int} y
	                 * @returns {{r: *, g: *, b: *, a: *}}
	                 */
	                getPixel: function getPixel(x, y) {
	                    var index = getIndex(x, y);
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
	                getOriginalPixel: function getOriginalPixel(x, y) {
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
	                setPixel: function setPixel(x, y, rgba) {
	                    var index = getIndex(x, y);
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
	
	                    result = this.callback.call(sandbox, {
	                        r: imageDataCopy[firstPixelIndex + 0],
	                        g: imageDataCopy[firstPixelIndex + 1],
	                        b: imageDataCopy[firstPixelIndex + 2],
	                        a: imageDataCopy[firstPixelIndex + 3]
	                    }, x, y, parameters, imageData.width, imageData.height);
	
	                    if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === "object") {
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
	    }]);
	
	    return BasePointEffect;
	}(_Base2.default);
	
	exports.default = BasePointEffect;

/***/ },

/***/ 319:
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
	
	var GrayScaleEffect = function (_BaseColorEffect) {
	    _inherits(GrayScaleEffect, _BaseColorEffect);
	
	    function GrayScaleEffect() {
	        _classCallCheck(this, GrayScaleEffect);
	
	        return _possibleConstructorReturn(this, (GrayScaleEffect.__proto__ || Object.getPrototypeOf(GrayScaleEffect)).apply(this, arguments));
	    }
	
	    _createClass(GrayScaleEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                sepiaValue: 1
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            var tmp = 0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b;
	
	            pixel.r = tmp + 2 * parameters.sepiaValue;
	            pixel.g = tmp + parameters.sepiaValue;
	            pixel.b = tmp;
	
	            return pixel;
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'sepia';
	        }
	    }]);
	
	    return GrayScaleEffect;
	}(_BasePoint2.default);
	
	exports.default = GrayScaleEffect;

/***/ },

/***/ 320:
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
	
	var ContrastEffect = function (_BaseColorEffect) {
	    _inherits(ContrastEffect, _BaseColorEffect);
	
	    function ContrastEffect() {
	        _classCallCheck(this, ContrastEffect);
	
	        return _possibleConstructorReturn(this, (ContrastEffect.__proto__ || Object.getPrototypeOf(ContrastEffect)).apply(this, arguments));
	    }
	
	    _createClass(ContrastEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                contrast: 0.5
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters) {
	            return {
	                factor: 259 * (parameters.contrast * 255 + 255) / (255 * (259 - parameters.contrast * 255))
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            pixel.r = this.data.factor * (pixel.r - 128) + 128;
	            pixel.g = this.data.factor * (pixel.g - 128) + 128;
	            pixel.b = this.data.factor * (pixel.b - 128) + 128;
	
	            return pixel;
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'contrast';
	        }
	    }]);
	
	    return ContrastEffect;
	}(_BasePoint2.default);
	
	exports.default = ContrastEffect;

/***/ },

/***/ 321:
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
	
	var BrightnessEffect = function (_BasePointEffect) {
	    _inherits(BrightnessEffect, _BasePointEffect);
	
	    function BrightnessEffect() {
	        _classCallCheck(this, BrightnessEffect);
	
	        return _possibleConstructorReturn(this, (BrightnessEffect.__proto__ || Object.getPrototypeOf(BrightnessEffect)).apply(this, arguments));
	    }
	
	    _createClass(BrightnessEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                brightness: 0.5
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters) {
	            return {
	                brightness: 255 * parameters.brightness
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            pixel.r = pixel.r + this.data.brightness;
	            pixel.g = pixel.g + this.data.brightness;
	            pixel.b = pixel.b + this.data.brightness;
	
	            return pixel;
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'brightness';
	        }
	    }]);
	
	    return BrightnessEffect;
	}(_BasePoint2.default);
	
	exports.default = BrightnessEffect;

/***/ }

})
//# sourceMappingURL=0.efad0c8832db8385e8c8.hot-update.js.map