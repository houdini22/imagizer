webpackHotUpdate(0,{

/***/ 311:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseColor = __webpack_require__(308);
	
	var _BaseColor2 = _interopRequireDefault(_BaseColor);
	
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
	                sepiaValue: 4
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
	}(_BaseColor2.default);
	
	exports.default = GrayScaleEffect;

/***/ }

})
//# sourceMappingURL=0.b3f31b67d65a1595f02a.hot-update.js.map