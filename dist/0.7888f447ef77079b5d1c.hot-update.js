webpackHotUpdate(0,{

/***/ 322:
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
	
	var DiffusionEffect = function (_BasePointEffect) {
	    _inherits(DiffusionEffect, _BasePointEffect);
	
	    function DiffusionEffect() {
	        _classCallCheck(this, DiffusionEffect);
	
	        return _possibleConstructorReturn(this, (DiffusionEffect.__proto__ || Object.getPrototypeOf(DiffusionEffect)).apply(this, arguments));
	    }
	
	    _createClass(DiffusionEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                matrix: [0, 0, 0, 0, 0, 7, 3, 5, 1],
	                levels: 6,
	                colorDither: true,
	                granulate: true
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height, imageData) {
	            var i = void 0,
	                sum = 0,
	                map = [],
	                div = [];
	
	            for (i = 0; i < parameters.matrix.length; i += 1) {
	                sum += parameters.matrix[i];
	            }
	
	            for (i = 0; i < parameters.levels; i += 1) {
	                map[i] = parseInt(255 * i / (parameters.levels - 1));
	            }
	
	            for (i = 0; i < 256; i += 1) {
	                div[i] = parseInt(parameters.levels * i / 256);
	            }
	
	            return {
	                sum: sum,
	                map: map,
	                div: div
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            var red1 = pixel.r,
	                green1 = pixel.g,
	                blue1 = pixel.b,
	                red2 = void 0,
	                green2 = void 0,
	                blue2 = void 0,
	                data = this.data,
	                tmpPixel = void 0,
	                tmpRed = void 0,
	                tmpGreen = void 0,
	                tmpBlue = void 0,
	                i = void 0,
	                j = void 0,
	                iy = void 0,
	                jx = void 0,
	                w = void 0,
	                grayScale = void 0;
	
	            if (!parameters.colorDither) {
	                grayScale = (red1 + green1 + blue1) / 3;
	                red1 = grayScale;
	                green1 = grayScale;
	                blue1 = grayScale;
	            }
	
	            red2 = data.map[data.div[red1]];
	            green2 = data.map[data.div[green1]];
	            blue2 = data.map[data.div[blue1]];
	
	            tmpRed = red1 - red2;
	            tmpGreen = green1 - green2;
	            tmpBlue = blue1 - blue2;
	
	            if (parameters.granulate) {
	                for (i = -1; i <= 1; i += 1) {
	                    iy = i + y;
	                    if (iy < 0 || iy >= height) {
	                        continue;
	                    }
	                    for (j = -1; j <= 1; j += 1) {
	                        jx = j + x;
	                        if (jx < 0 || jx >= width) {
	                            continue;
	                        }
	                        w = parameters.matrix[(i + 1) * 3 + j + 1];
	                        if (w !== 0) {
	                            tmpPixel = this.getPixel(jx, iy);
	                            tmpPixel.r += tmpRed * w / data.sum;
	                            tmpPixel.g += tmpGreen * w / data.sum;
	                            tmpPixel.b += tmpBlue * w / data.sum;
	                            this.setPixel(jx, iy, tmpPixel);
	                        }
	                    }
	                }
	            }
	
	            return {
	                r: red2,
	                g: green2,
	                b: blue2,
	                a: pixel.a
	            };
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'diffusion';
	        }
	    }]);
	
	    return DiffusionEffect;
	}(_BasePoint2.default);
	
	exports.default = DiffusionEffect;

/***/ }

})
//# sourceMappingURL=0.7888f447ef77079b5d1c.hot-update.js.map