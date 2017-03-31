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

/***/ 329:
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
	
	var InvertAlphaEffect = function (_BasePointEffect) {
	    _inherits(InvertAlphaEffect, _BasePointEffect);
	
	    function InvertAlphaEffect() {
	        _classCallCheck(this, InvertAlphaEffect);
	
	        return _possibleConstructorReturn(this, (InvertAlphaEffect.__proto__ || Object.getPrototypeOf(InvertAlphaEffect)).apply(this, arguments));
	    }
	
	    _createClass(InvertAlphaEffect, [{
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            pixel.a = 255 - pixel.a;
	            return pixel;
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'invert-alpha';
	        }
	    }]);
	
	    return InvertAlphaEffect;
	}(_BasePoint2.default);
	
	exports.default = InvertAlphaEffect;

/***/ },

/***/ 330:
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
	
	var InvertEffect = function (_BasePointEffect) {
	    _inherits(InvertEffect, _BasePointEffect);
	
	    function InvertEffect() {
	        _classCallCheck(this, InvertEffect);
	
	        return _possibleConstructorReturn(this, (InvertEffect.__proto__ || Object.getPrototypeOf(InvertEffect)).apply(this, arguments));
	    }
	
	    _createClass(InvertEffect, [{
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            pixel.r = 255 - pixel.r;
	            pixel.g = 255 - pixel.g;
	            pixel.b = 255 - pixel.b;
	            return pixel;
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'invert';
	        }
	    }]);
	
	    return InvertEffect;
	}(_BasePoint2.default);
	
	exports.default = InvertEffect;

/***/ }

})
//# sourceMappingURL=0.14836b0020dc710af85b.hot-update.js.map