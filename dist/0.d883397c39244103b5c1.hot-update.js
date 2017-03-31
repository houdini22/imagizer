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
	
	var _Diffusion = __webpack_require__(322);
	
	var _Diffusion2 = _interopRequireDefault(_Diffusion);
	
	var _Dither = __webpack_require__(323);
	
	var _Dither2 = _interopRequireDefault(_Dither);
	
	var _Exposure = __webpack_require__(324);
	
	var _Exposure2 = _interopRequireDefault(_Exposure);
	
	var _Gain = __webpack_require__(325);
	
	var _Gain2 = _interopRequireDefault(_Gain);
	
	var _Gamma = __webpack_require__(326);
	
	var _Gamma2 = _interopRequireDefault(_Gamma);
	
	var _HSBAdjust = __webpack_require__(327);
	
	var _HSBAdjust2 = _interopRequireDefault(_HSBAdjust);
	
	var _InvertAlpha = __webpack_require__(329);
	
	var _InvertAlpha2 = _interopRequireDefault(_InvertAlpha);
	
	var _Invert = __webpack_require__(330);
	
	var _Invert2 = _interopRequireDefault(_Invert);
	
	var _Levels = __webpack_require__(331);
	
	var _Levels2 = _interopRequireDefault(_Levels);
	
	var _Rescale = __webpack_require__(332);
	
	var _Rescale2 = _interopRequireDefault(_Rescale);
	
	var _Solarize = __webpack_require__(333);
	
	var _Solarize2 = _interopRequireDefault(_Solarize);
	
	var _Threshold = __webpack_require__(334);
	
	var _Threshold2 = _interopRequireDefault(_Threshold);
	
	var _Tritone = __webpack_require__(335);
	
	var _Tritone2 = _interopRequireDefault(_Tritone);
	
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

/***/ 335:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(318);
	
	var _BasePoint2 = _interopRequireDefault(_BasePoint);
	
	var _color = __webpack_require__(328);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TritoneEffect = function (_BasePointEffect) {
	    _inherits(TritoneEffect, _BasePointEffect);
	
	    function TritoneEffect() {
	        _classCallCheck(this, TritoneEffect);
	
	        return _possibleConstructorReturn(this, (TritoneEffect.__proto__ || Object.getPrototypeOf(TritoneEffect)).apply(this, arguments));
	    }
	
	    _createClass(TritoneEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
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
	    }, {
	        key: 'before',
	        value: function before(parameters) {
	            var lut = [],
	                i = void 0,
	                t = void 0;
	
	            for (i = 0; i < 128; i += 1) {
	                t = i / 127;
	                lut[i] = (0, _color.mixColors)(t, parameters.shadowColor, parameters.midColor);
	            }
	            for (i = 128; i < 256; i += 1) {
	                t = (i - 127) / 128;
	                lut[i] = (0, _color.mixColors)(t, parameters.midColor, parameters.highColor);
	            }
	            return {
	                lut: lut
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            var brightness = Math.floor((pixel.r + pixel.g + pixel.b) / 3);
	            return this.data.lut[brightness];
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'tritone';
	        }
	    }]);
	
	    return TritoneEffect;
	}(_BasePoint2.default);
	
	exports.default = TritoneEffect;

/***/ }

})
//# sourceMappingURL=0.d883397c39244103b5c1.hot-update.js.map