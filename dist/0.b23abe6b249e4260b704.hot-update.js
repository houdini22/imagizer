webpackHotUpdate(0,{

/***/ 312:
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
	                contrast: 0.2
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
	}(_BaseColor2.default);
	
	exports.default = ContrastEffect;

/***/ }

})
//# sourceMappingURL=0.b23abe6b249e4260b704.hot-update.js.map