webpackHotUpdate(0,{

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
	
	var GammaEffect = function (_BasePointEffect) {
	    _inherits(GammaEffect, _BasePointEffect);
	
	    function GammaEffect() {
	        _classCallCheck(this, GammaEffect);
	
	        return _possibleConstructorReturn(this, (GammaEffect.__proto__ || Object.getPrototypeOf(GammaEffect)).apply(this, arguments));
	    }
	
	    _createClass(GammaEffect, [{
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
	
	    return GammaEffect;
	}(_BasePoint2.default);
	
	exports.default = GammaEffect;

/***/ }

})
//# sourceMappingURL=0.a9770f576deae91455f7.hot-update.js.map