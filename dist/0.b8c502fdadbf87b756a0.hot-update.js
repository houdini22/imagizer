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
	
	var _Dissolve = __webpack_require__(333);
	
	var _Dissolve2 = _interopRequireDefault(_Dissolve);
	
	var _Diffuse = __webpack_require__(331);
	
	var _Diffuse2 = _interopRequireDefault(_Diffuse);
	
	var _Kaleidoscope = __webpack_require__(334);
	
	var _Kaleidoscope2 = _interopRequireDefault(_Kaleidoscope);
	
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
	add(_Dissolve2.default);
	add(_Kaleidoscope2.default);
	
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

/***/ 334:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseTransform = __webpack_require__(332);
	
	var _BaseTransform2 = _interopRequireDefault(_BaseTransform);
	
	var _common = __webpack_require__(305);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var KaleidoscopeEffect = function (_BaseTransformEffect) {
	    _inherits(KaleidoscopeEffect, _BaseTransformEffect);
	
	    function KaleidoscopeEffect() {
	        _classCallCheck(this, KaleidoscopeEffect);
	
	        return _possibleConstructorReturn(this, (KaleidoscopeEffect.__proto__ || Object.getPrototypeOf(KaleidoscopeEffect)).apply(this, arguments));
	    }
	
	    _createClass(KaleidoscopeEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                centreX: 0.5,
	                centreY: 0.5,
	                angle: 0,
	                angle2: 0,
	                sides: 3,
	                radius: 0
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height, imageData) {
	            return {
	                icentreX: width * parameters.centreX,
	                icentreY: height * parameters.centreY
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(x, y, parameters) {
	            var dx = x - this.data.icentreX,
	                dy = y - this.data.icentreY,
	                r = Math.sqrt(dx * dx + dy * dy),
	                theta = Math.atan2(dy, dx) - parameters.angle - parameters.angle2;
	
	            theta = (0, _common.triangle)(theta / Math.PI * parameters.sides * 0.5);
	
	            if (parameters.radius !== 0) {
	                var c = Math.cos(theta),
	                    radiusC = parameters.radius / c;
	                r = radiusC * (0, _common.triangle)(r / radiusC);
	            }
	
	            theta += parameters.angle;
	
	            return [this.data.icentreX + r * Math.cos(theta), this.data.icentreY + r * Math.sin(theta)];
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'kaleidoscope';
	        }
	    }]);
	
	    return KaleidoscopeEffect;
	}(_BaseTransform2.default);
	
	exports.default = KaleidoscopeEffect;

/***/ }

})
//# sourceMappingURL=0.b8c502fdadbf87b756a0.hot-update.js.map