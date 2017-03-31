webpackHotUpdate(0,{

/***/ 306:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _GrayScale = __webpack_require__(307);
	
	var _GrayScale2 = _interopRequireDefault(_GrayScale);
	
	var _Sepia = __webpack_require__(311);
	
	var _Sepia2 = _interopRequireDefault(_Sepia);
	
	var _Contrast = __webpack_require__(312);
	
	var _Contrast2 = _interopRequireDefault(_Contrast);
	
	var _Brightness = __webpack_require__(313);
	
	var _Brightness2 = _interopRequireDefault(_Brightness);
	
	var _Diffusion = __webpack_require__(314);
	
	var _Diffusion2 = _interopRequireDefault(_Diffusion);
	
	var _Dither = __webpack_require__(315);
	
	var _Dither2 = _interopRequireDefault(_Dither);
	
	var _Exposure = __webpack_require__(316);
	
	var _Exposure2 = _interopRequireDefault(_Exposure);
	
	var _Gain = __webpack_require__(317);
	
	var _Gain2 = _interopRequireDefault(_Gain);
	
	var _Gamma = __webpack_require__(318);
	
	var _Gamma2 = _interopRequireDefault(_Gamma);
	
	var _HSBAdjust = __webpack_require__(319);
	
	var _HSBAdjust2 = _interopRequireDefault(_HSBAdjust);
	
	var _InvertAlpha = __webpack_require__(321);
	
	var _InvertAlpha2 = _interopRequireDefault(_InvertAlpha);
	
	var _Invert = __webpack_require__(322);
	
	var _Invert2 = _interopRequireDefault(_Invert);
	
	var _Levels = __webpack_require__(323);
	
	var _Levels2 = _interopRequireDefault(_Levels);
	
	var _Rescale = __webpack_require__(324);
	
	var _Rescale2 = _interopRequireDefault(_Rescale);
	
	var _Solarize = __webpack_require__(325);
	
	var _Solarize2 = _interopRequireDefault(_Solarize);
	
	var _Threshold = __webpack_require__(326);
	
	var _Threshold2 = _interopRequireDefault(_Threshold);
	
	var _Tritone = __webpack_require__(327);
	
	var _Tritone2 = _interopRequireDefault(_Tritone);
	
	var _Diffuse = __webpack_require__(331);
	
	var _Diffuse2 = _interopRequireDefault(_Diffuse);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var availableEffects = {};
	
	function add(_class) {
	    availableEffects[_class.getName()] = _class;
	}
	
	add(_GrayScale2.default);
	add(_Sepia2.default);
	add(_Contrast2.default);
	add(_Brightness2.default);
	add(_Diffusion2.default);
	add(_Dither2.default);
	add(_Exposure2.default);
	add(_Gain2.default);
	add(_Gamma2.default);
	add(_HSBAdjust2.default);
	add(_InvertAlpha2.default);
	add(_Invert2.default);
	add(_Levels2.default);
	add(_Rescale2.default);
	add(_Solarize2.default);
	add(_Threshold2.default);
	add(_Tritone2.default);
	add(_Diffuse2.default);
	
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

/***/ 331:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseTransform = __webpack_require__(332);
	
	var _BaseTransform2 = _interopRequireDefault(_BaseTransform);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DiffuseEffect = function (_BaseTransformEffect) {
	    _inherits(DiffuseEffect, _BaseTransformEffect);
	
	    function DiffuseEffect() {
	        _classCallCheck(this, DiffuseEffect);
	
	        return _possibleConstructorReturn(this, (DiffuseEffect.__proto__ || Object.getPrototypeOf(DiffuseEffect)).apply(this, arguments));
	    }
	
	    _createClass(DiffuseEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                scale: 4
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height, imageData) {
	            var sinTable = new Array(256),
	                cosTable = new Array(256),
	                i = void 0,
	                angle = void 0;
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
	    }, {
	        key: 'callback',
	        value: function callback(x, y, parameters) {
	            var angle = parseInt(Math.random() * 255),
	                distance = Math.random();
	
	            return [x + distance * this.data.sinTable[angle], y + distance * this.data.cosTable[angle]];
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'diffuse';
	        }
	    }]);
	
	    return DiffuseEffect;
	}(_BaseTransform2.default);
	
	exports.default = DiffuseEffect;

/***/ },

/***/ 332:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Base = __webpack_require__(309);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	var _extend = __webpack_require__(310);
	
	var _extend2 = _interopRequireDefault(_extend);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BaseTransformEffect = function (_BaseEffect) {
	    _inherits(BaseTransformEffect, _BaseEffect);
	
	    function BaseTransformEffect() {
	        _classCallCheck(this, BaseTransformEffect);
	
	        return _possibleConstructorReturn(this, (BaseTransformEffect.__proto__ || Object.getPrototypeOf(BaseTransformEffect)).apply(this, arguments));
	    }
	
	    _createClass(BaseTransformEffect, [{
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
	                normalizePixelValue = function normalizePixelValue(value) {
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
	    }]);
	
	    return BaseTransformEffect;
	}(_Base2.default);
	
	exports.default = BaseTransformEffect;

/***/ }

})
//# sourceMappingURL=0.1d2e3cece66c63ae8fd1.hot-update.js.map