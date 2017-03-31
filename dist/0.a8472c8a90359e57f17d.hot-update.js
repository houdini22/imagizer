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

/***/ 326:
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
	
	var DitherEffect = function (_BasePointEffect) {
	    _inherits(DitherEffect, _BasePointEffect);
	
	    function DitherEffect() {
	        _classCallCheck(this, DitherEffect);
	
	        return _possibleConstructorReturn(this, (DitherEffect.__proto__ || Object.getPrototypeOf(DitherEffect)).apply(this, arguments));
	    }
	
	    _createClass(DitherEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                gammaRed: 1,
	                gammaGreen: 1,
	                gammaBlue: 1
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height, imageData) {
	            var table = {
	                r: [],
	                g: [],
	                b: []
	            },
	                i = void 0;
	
	            for (i = 0; i < 256; i += 1) {
	                table.r[i] = parseInt(255 * Math.pow(i / 255, 1 / parameters.gammaRed) + 0.5);
	                table.g[i] = parseInt(255 * Math.pow(i / 255, 1 / parameters.gammaGreen) + 0.5);
	                table.b[i] = parseInt(255 * Math.pow(i / 255, 1 / parameters.gammaBlue) + 0.5);
	            }
	
	            return {
	                table: table
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            return {
	                r: this.data.table.r[pixel.r],
	                g: this.data.table.g[pixel.g],
	                b: this.data.table.b[pixel.b],
	                a: pixel.a
	            };
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'gamma';
	        }
	    }]);
	
	    return DitherEffect;
	}(_BasePoint2.default);
	
	exports.default = DitherEffect;

/***/ }

})
//# sourceMappingURL=0.a8472c8a90359e57f17d.hot-update.js.map