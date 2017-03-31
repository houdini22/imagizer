webpackHotUpdate(0,{

/***/ 327:
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
	
	var HSBAdjustEffect = function (_BasePointEffect) {
	    _inherits(HSBAdjustEffect, _BasePointEffect);
	
	    function HSBAdjustEffect() {
	        _classCallCheck(this, HSBAdjustEffect);
	
	        return _possibleConstructorReturn(this, (HSBAdjustEffect.__proto__ || Object.getPrototypeOf(HSBAdjustEffect)).apply(this, arguments));
	    }
	
	    _createClass(HSBAdjustEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                h: 1,
	                s: 1,
	                b: 1
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            var hsb = (0, _color.RGBtoHSB)(pixel.r, pixel.g, pixel.b);
	
	            hsb.h += parameters.h;
	            while (hsb.h < 0) {
	                hsb.h += Math.PI * 2;
	            }
	
	            hsb.s += parameters.s;
	            hsb.s = Math.max(Math.min(hsb.s, 1), 0);
	
	            hsb.b += parameters.b;
	            hsb.b = Math.max(Math.min(hsb.b, 1), 0);
	
	            var result = HSBtoRGB(hsb.h, hsb.s, hsb.b);
	            pixel.r = result.r;
	            pixel.g = result.g;
	            pixel.b = result.b;
	
	            return pixel;
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'hsb-adjust';
	        }
	    }]);
	
	    return HSBAdjustEffect;
	}(_BasePoint2.default);
	
	exports.default = HSBAdjustEffect;

/***/ }

})
//# sourceMappingURL=0.cf4ef5e147e6f5508bc8.hot-update.js.map