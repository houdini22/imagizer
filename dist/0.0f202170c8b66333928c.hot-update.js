webpackHotUpdate(0,{

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
	
	var GrayScaleEffect = function (_BasePointEffect) {
	    _inherits(GrayScaleEffect, _BasePointEffect);
	
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
	
	var GrayScaleEffect = function (_BasePointEffect) {
	    _inherits(GrayScaleEffect, _BasePointEffect);
	
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
	
	var ContrastEffect = function (_BasePointEffect) {
	    _inherits(ContrastEffect, _BasePointEffect);
	
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

/***/ }

})
//# sourceMappingURL=0.0f202170c8b66333928c.hot-update.js.map