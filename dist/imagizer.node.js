(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("canvas"), require("fs"));
	else if(typeof define === 'function' && define.amd)
		define(["canvas", "fs"], factory);
	else if(typeof exports === 'object')
		exports["imagizer"] = factory(require("canvas"), require("fs"));
	else
		root["imagizer"] = factory(root["canvas"], root["fs"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_63__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _Project = __webpack_require__(2);
	
	var _Project2 = _interopRequireDefault(_Project);
	
	var _Image = __webpack_require__(64);
	
	var _Image2 = _interopRequireDefault(_Image);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var imagizer = {
	    Project: _Project2.default,
	    Image: _Image2.default
	};
	
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	    module.exports = imagizer;
	} else {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return imagizer;
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        window.Imagizer = imagizer;
	    }
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _CanvasWrapper = __webpack_require__(7);
	
	var _CanvasWrapper2 = _interopRequireDefault(_CanvasWrapper);
	
	var _Layer = __webpack_require__(10);
	
	var _Layer2 = _interopRequireDefault(_Layer);
	
	var _common = __webpack_require__(8);
	
	var _EffectsRepository = __webpack_require__(12);
	
	var _EffectsRepository2 = _interopRequireDefault(_EffectsRepository);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Project = function () {
	    function Project(width, height) {
	        var parameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	        _classCallCheck(this, Project);
	
	        this.imageData = null;
	        this.effects = [];
	        this.layers = [];
	        this.startTime = new Date();
	        this.initialize(width, height, parameters);
	    }
	
	    _createClass(Project, [{
	        key: 'initialize',
	        value: function initialize(width, height, parameters) {
	            this.parameters = parameters;
	            this.width = width;
	            this.height = height;
	            this.canvas = new _CanvasWrapper2.default(width, height);
	            this.imageData = this.canvas.getContext().getImageData(0, 0, width, height);
	        }
	    }, {
	        key: 'createLayer',
	        value: function createLayer(parameters) {
	            var layer = new _Layer2.default(this.width, this.height, parameters);
	            this.layers.push(layer);
	            return layer;
	        }
	    }, {
	        key: 'getTime',
	        value: function getTime() {
	            var end = new Date();
	            return end.getTime() - this.startTime.getTime();
	        }
	    }, {
	        key: 'exportTo',
	        value: function exportTo(selector) {
	            var imageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'image/png';
	
	            var i,
	                container,
	                exportedImage = (0, _common.isNode)() ? null : new window.Image();
	
	            for (i = 0; i < this.layers.length; i++) {
	                this.imageData = (0, _common.mergeImageData)({
	                    width: this.width,
	                    height: this.height,
	                    imageData: this.imageData
	                }, {
	                    x: this.layers[i].getX(),
	                    y: this.layers[i].getY(),
	                    width: this.layers[i].getWidth(),
	                    height: this.layers[i].getHeight(),
	                    imageData: this.layers[i].exportLayer(),
	                    blendingMode: this.layers[i].getParameter("blendingMode")
	                }, _common.mergePixelCallback);
	            }
	
	            for (i = 0; i < this.effects.length; i++) {
	                this.imageData = this.effects[i].effect.run(this.imageData, this.effects[i].parameters);
	            }
	
	            this.canvas.getContext().putImageData(this.imageData, 0, 0);
	
	            if ((0, _common.isNode)()) {
	                var fs = __webpack_require__(63),
	                    img = this.canvas.toDataURL(),
	                    data = img.replace(/^data:image\/\w+;base64,/, ""),
	                    buff = new Buffer(data, 'base64');
	
	                fs.writeFile(selector, buff);
	            } else {
	                container = document.querySelector(selector);
	                exportedImage.src = this.canvas.toDataURL(imageType);
	                container.appendChild(exportedImage);
	            }
	        }
	    }, {
	        key: 'applyEffect',
	        value: function applyEffect(name) {
	            var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            this.effects.push({
	                name: name,
	                effect: new (_EffectsRepository2.default.get(name))(),
	                parameters: parameters
	            });
	        }
	    }, {
	        key: 'resize',
	        value: function resize(newWidth, newHeight, mode) {
	            this.canvas.destroy();
	            this.canvas = null;
	            this.imageData = null;
	            this.initialize(newWidth, newHeight, mode);
	
	            for (var i = 0; i < this.layers.length; i += 1) {
	                this.layers[i].resize(newWidth, newHeight, mode);
	            }
	
	            return this;
	        }
	    }]);
	
	    return Project;
	}();
	
	exports.default = Project;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3).Buffer))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(4)
	var ieee754 = __webpack_require__(5)
	var isArray = __webpack_require__(6)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()
	
	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()
	
	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }
	
	  return that
	}
	
	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */
	
	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }
	
	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}
	
	Buffer.poolSize = 8192 // not used by this implementation
	
	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}
	
	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }
	
	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }
	
	  return fromObject(that, value)
	}
	
	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}
	
	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}
	
	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}
	
	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}
	
	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }
	
	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }
	
	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)
	
	  var actual = that.write(string, encoding)
	
	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }
	
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer
	
	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }
	
	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }
	
	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }
	
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}
	
	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)
	
	    if (that.length === 0) {
	      return that
	    }
	
	    obj.copy(that, 0, 0, len)
	    return that
	  }
	
	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }
	
	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }
	
	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }
	
	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }
	
	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}
	
	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.
	
	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }
	
	  if (end === undefined || end > this.length) {
	    end = this.length
	  }
	
	  if (end <= 0) {
	    return ''
	  }
	
	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0
	
	  if (end <= start) {
	    return ''
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true
	
	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}
	
	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}
	
	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}
	
	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }
	
	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }
	
	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }
	
	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }
	
	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0
	
	  if (this === target) return 0
	
	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)
	
	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)
	
	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1
	
	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }
	
	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }
	
	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }
	
	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length
	
	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }
	
	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }
	
	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }
	
	  return -1
	}
	
	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}
	
	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []
	
	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1
	
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint
	
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }
	
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }
	
	    res.push(codePoint)
	    i += bytesPerSequence
	  }
	
	  return decodeCodePointsArray(res)
	}
	
	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000
	
	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }
	
	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	  var i
	
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }
	
	  return len
	}
	
	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }
	
	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }
	
	  if (end <= start) {
	    return this
	  }
	
	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0
	
	  if (!val) val = 0
	
	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	
	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }
	
	        // valid lead
	        leadSurrogate = codePoint
	
	        continue
	      }
	
	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }
	
	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }
	
	    leadSurrogate = null
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict'
	
	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray
	
	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
	
	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}
	
	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63
	
	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }
	
	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}
	
	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return b64.length * 3 / 4 - placeHoldersCount(b64)
	}
	
	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)
	
	  arr = new Arr(len * 3 / 4 - placeHolders)
	
	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len
	
	  var L = 0
	
	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  return arr
	}
	
	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}
	
	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}
	
	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3
	
	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }
	
	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }
	
	  parts.push(output)
	
	  return parts.join('')
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _common = __webpack_require__(8);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CanvasWrapper = function () {
	    function CanvasWrapper(width, height) {
	        _classCallCheck(this, CanvasWrapper);
	
	        this.canvas = null;
	        this.context = null;
	        this.width = 0;
	        this.height = 0;
	        this.initialize(width, height);
	    }
	
	    _createClass(CanvasWrapper, [{
	        key: 'initialize',
	        value: function initialize() {
	            var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	            var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
	            if ((0, _common.isNode)()) {
	                var Canvas = __webpack_require__(9);
	                this.canvas = new Canvas(width, height);
	            } else {
	                this.canvas = document.createElement("canvas");
	
	                // hide from viewport
	                this.canvas.style.position = "absolute";
	                this.canvas.style.left = "-99999px";
	                this.canvas.style.top = "-99999px";
	
	                this.setWidth(width);
	                this.setHeight(height);
	
	                document.body.appendChild(this.canvas);
	            }
	        }
	    }, {
	        key: 'setWidth',
	        value: function setWidth(value) {
	            this.canvas.setAttribute("width", "" + value);
	            this.width = value;
	            return this;
	        }
	    }, {
	        key: 'setHeight',
	        value: function setHeight(value) {
	            this.canvas.setAttribute("height", "" + value);
	            this.height = value;
	            return this;
	        }
	    }, {
	        key: 'getContext',
	        value: function getContext() {
	            if (!this.context) {
	                this.context = this.canvas.getContext("2d");
	            }
	            return this.context;
	        }
	    }, {
	        key: 'getCanvas',
	        value: function getCanvas() {
	            return this.canvas;
	        }
	    }, {
	        key: 'toDataURL',
	        value: function toDataURL(type) {
	            return this.canvas.toDataURL(type);
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            if (!(0, _common.isNode)()) {
	                document.body.removeChild(this.canvas);
	            }
	            this.canvas = null;
	            this.context = null;
	        }
	    }]);
	
	    return CanvasWrapper;
	}();
	
	exports.default = CanvasWrapper;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.mergeImageData = mergeImageData;
	exports.mergePixelCallback = mergePixelCallback;
	exports.cropImageData = cropImageData;
	exports.mod = mod;
	exports.triangle = triangle;
	exports.smoothStep = smoothStep;
	exports.brightness = brightness;
	exports.isNode = isNode;
	var blendingModes = {
	    lighten: function lighten(bottomPixel, topPixel) {
	        return topPixel > bottomPixel ? topPixel : bottomPixel;
	    },
	    darken: function darken(bottomPixel, topPixel) {
	        return topPixel > bottomPixel ? bottomPixel : topPixel;
	    },
	    multiply: function multiply(bottomPixel, topPixel) {
	        return bottomPixel * topPixel / 255;
	    },
	    average: function average(bottomPixel, topPixel) {
	        return bottomPixel + topPixel / 2;
	    },
	    add: function add(bottomPixel, topPixel) {
	        return Math.min(255, bottomPixel + topPixel);
	    },
	    subtract: function subtract(bottomPixel, topPixel) {
	        return bottomPixel + topPixel < 255 ? 0 : bottomPixel + topPixel - 255;
	    },
	    difference: function difference(bottomPixel, topPixel) {
	        return Math.abs(bottomPixel - topPixel);
	    },
	    negation: function negation(bottomPixel, topPixel) {
	        return 255 - Math.abs(255 - bottomPixel - topPixel);
	    },
	    screen: function screen(bottomPixel, topPixel) {
	        return 255 - ((255 - bottomPixel) * (255 - topPixel) >> 8);
	    },
	    exclusion: function exclusion(bottomPixel, topPixel) {
	        return bottomPixel + topPixel - 2 * bottomPixel * topPixel / 255;
	    },
	    overlay: function overlay(bottomPixel, topPixel) {
	        return topPixel < 128 ? 2 * bottomPixel * topPixel / 255 : 255 - 2 * (255 - bottomPixel) * (255 - topPixel) / 255;
	    },
	    softLight: function softLight(bottomPixel, topPixel) {
	        return topPixel < 128 ? 2 * ((bottomPixel >> 1) + 64) * (topPixel / 255) : 255 - 2 * (255 - ((bottomPixel >> 1) + 64)) * (255 - topPixel) / 255;
	    },
	    hardLight: function hardLight(bottomPixel, topPixel) {
	        return blendingModes.softLight(topPixel, bottomPixel);
	    },
	    colorDodge: function colorDodge(bottomPixel, topPixel) {
	        return topPixel == 255 ? topPixel : Math.min(255, (bottomPixel << 8) / (255 - topPixel));
	    },
	    colorBurn: function colorBurn(bottomPixel, topPixel) {
	        return topPixel == 0 ? topPixel : Math.max(0, 255 - (255 - bottomPixel << 8) / topPixel);
	    },
	    linearDodge: function linearDodge(bottomPixel, topPixel) {
	        return blendingModes.add(bottomPixel, topPixel);
	    },
	    linearBurn: function linearBurn(bottomPixel, topPixel) {
	        return blendingModes.subtract(bottomPixel, topPixel);
	    },
	    linearLight: function linearLight(bottomPixel, topPixel) {
	        return topPixel < 128 ? blendingModes.linearBurn(bottomPixel, 2 * topPixel) : blendingModes.linearDodge(bottomPixel, 2 * (topPixel - 128));
	    },
	    vividLight: function vividLight(bottomPixel, topPixel) {
	        return topPixel < 128 ? blendingModes.colorBurn(bottomPixel, 2 * topPixel) : blendingModes.colorDodge(bottomPixel, 2 * (topPixel - 128));
	    },
	    pinLight: function pinLight(bottomPixel, topPixel) {
	        return topPixel < 128 ? blendingModes.darken(bottomPixel, 2 * topPixel) : blendingModes.lighten(bottomPixel, 2 * (topPixel - 128));
	    },
	    hardMix: function hardMix(bottomPixel, topPixel) {
	        return blendingModes.vividLight(bottomPixel, topPixel) < 128 ? 0 : 255;
	    },
	    reflect: function reflect(bottomPixel, topPixel) {
	        return topPixel == 255 ? topPixel : Math.min(255, bottomPixel * bottomPixel / (255 - topPixel));
	    },
	    glow: function glow(bottomPixel, topPixel) {
	        return blendingModes.reflect(topPixel, bottomPixel);
	    },
	    phoenix: function phoenix(bottomPixel, topPixel) {
	        return Math.min(bottomPixel, topPixel) - Math.max(bottomPixel, topPixel) + 255;
	    }
	};
	
	function mergeImageData(bottom, top, pixelCallback) {
	    var x = void 0,
	        y = void 0,
	        xx = void 0,
	        yy = void 0,
	        firstOldPixelIndex = void 0,
	        firstNewPixelIndex = void 0,
	        pixelResult = void 0;
	
	    for (y = top.y, yy = 0; y < bottom.height && yy < top.height; y += 1, yy += 1) {
	        for (x = top.x, xx = 0; x < bottom.width && xx < top.width; x += 1, xx += 1) {
	            if (xx < top.width && yy < top.height) // overwrite only rect-size of current layer
	                {
	                    firstOldPixelIndex = y * bottom.width * 4 + x * 4;
	                    firstNewPixelIndex = yy * top.width * 4 + xx * 4;
	
	                    pixelResult = pixelCallback({
	                        r: bottom.imageData.data[firstOldPixelIndex + 0],
	                        g: bottom.imageData.data[firstOldPixelIndex + 1],
	                        b: bottom.imageData.data[firstOldPixelIndex + 2],
	                        a: bottom.imageData.data[firstOldPixelIndex + 3]
	                    }, {
	                        r: top.imageData.data[firstNewPixelIndex + 0],
	                        g: top.imageData.data[firstNewPixelIndex + 1],
	                        b: top.imageData.data[firstNewPixelIndex + 2],
	                        a: top.imageData.data[firstNewPixelIndex + 3]
	                    }, x, y, {
	                        blendingMode: top.blendingMode
	                    });
	
	                    if (pixelResult !== false) // if skip change
	                        {
	                            bottom.imageData.data[firstOldPixelIndex + 0] = pixelResult.r;
	                            bottom.imageData.data[firstOldPixelIndex + 1] = pixelResult.g;
	                            bottom.imageData.data[firstOldPixelIndex + 2] = pixelResult.b;
	                            bottom.imageData.data[firstOldPixelIndex + 3] = pixelResult.a;
	                        }
	                }
	        }
	    }
	    return bottom.imageData;
	}
	
	function mergePixelCallback(bottomPixel, topPixel, x, y, parameters) {
	    if (topPixel.a === 0) {
	        return false; // skip change - opacity is full
	    }
	
	    // alpha compositing
	    var mergedR = void 0,
	        mergedG = void 0,
	        mergedB = void 0,
	        mergedA = topPixel.a / 255,
	        rootA = bottomPixel.a / 255 * (1 - mergedA),
	        outA = mergedA + bottomPixel.a * (1 - mergedA) / 255;
	
	    switch (parameters.blendingMode) {
	        case "lighten":
	        case "darken":
	        case "multiply":
	        case "average":
	        case "add":
	        case "subtract":
	        case "difference":
	        case "negation":
	        case "screen":
	        case "exclusion":
	        case "overlay":
	        case "softLight":
	        case "hardLight":
	        case "colorDodge":
	        case "colorBurn":
	        case "linearDodge":
	        case "linearBurn":
	        case "linearLight":
	        case "vividLight":
	        case "pinLight":
	        case "hardMix":
	        case "reflect":
	        case "glow":
	        case "phoenix":
	            topPixel.r = blendingModes[parameters.blendingMode](bottomPixel.r, topPixel.r);
	            topPixel.g = blendingModes[parameters.blendingMode](bottomPixel.g, topPixel.g);
	            topPixel.b = blendingModes[parameters.blendingMode](bottomPixel.b, topPixel.b);
	            break;
	
	        default:
	            break;
	    }
	
	    var rootR = bottomPixel.r;
	    var rootG = bottomPixel.g;
	    var rootB = bottomPixel.b;
	
	    mergedR = topPixel.r * mergedA + rootR * rootA;
	    mergedG = topPixel.g * mergedA + rootG * rootA;
	    mergedB = topPixel.b * mergedA + rootB * rootA;
	
	    mergedR = outA == 0 ? 0 : mergedR / outA;
	    mergedG = outA == 0 ? 0 : mergedG / outA;
	    mergedB = outA == 0 ? 0 : mergedB / outA;
	
	    return {
	        r: Math.min(Math.max(0, mergedR), 255) | 0,
	        g: Math.min(Math.max(0, mergedG), 255) | 0,
	        b: Math.min(Math.max(0, mergedB), 255) | 0,
	        a: 255 * outA | 0
	    };
	}
	
	function cropImageData(oldImageData, newImageData, startX, startY, width, height) {
	    var oldWidth = oldImageData.width,
	        newWidth = newImageData.width,
	        x = void 0,
	        y = void 0,
	        xx = void 0,
	        yy = void 0,
	        firstOldPixelIndex = void 0,
	        firstNewPixelIndex = void 0;
	
	    for (y = startY, yy = 0; y < startY + height && yy < height; y += 1, yy += 1) {
	        for (x = startX, xx = 0; x < startX + width && xx < width; x += 1, xx += 1) {
	            firstOldPixelIndex = y * oldWidth * 4 + x * 4;
	            firstNewPixelIndex = yy * newWidth * 4 + xx * 4;
	
	            newImageData.data[firstNewPixelIndex] = oldImageData.data[firstOldPixelIndex];
	            newImageData.data[firstNewPixelIndex + 1] = oldImageData.data[firstOldPixelIndex + 1];
	            newImageData.data[firstNewPixelIndex + 2] = oldImageData.data[firstOldPixelIndex + 2];
	            newImageData.data[firstNewPixelIndex + 3] = oldImageData.data[firstOldPixelIndex + 3];
	        }
	    }
	
	    return newImageData;
	}
	
	function mod(a, b) {
	    var n = Math.floor(a / b);
	    a -= n * b;
	    if (a < 0) {
	        return a + b;
	    }
	    return a;
	}
	
	function triangle(x) {
	    var r = mod(x, 1);
	    return 2 * (r < 0.5 ? r : 1 - r);
	}
	
	function smoothStep(a, b, x) {
	    if (x < a) {
	        return 0;
	    }
	    if (x >= b) {
	        return 1;
	    }
	    x = (x - a) / (b - a);
	    return x * x * (3 - 2 * x);
	}
	
	function brightness(pixel) {
	    return (pixel.r + pixel.g + pixel.b) / 3;
	}
	
	function isNode() {
	    return typeof window == 'undefined';
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _CanvasWrapper = __webpack_require__(7);
	
	var _CanvasWrapper2 = _interopRequireDefault(_CanvasWrapper);
	
	var _LayerObject = __webpack_require__(11);
	
	var _LayerObject2 = _interopRequireDefault(_LayerObject);
	
	var _common = __webpack_require__(8);
	
	var _EffectsRepository = __webpack_require__(12);
	
	var _EffectsRepository2 = _interopRequireDefault(_EffectsRepository);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Layer = function () {
	    function Layer(width, height) {
	        var parameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	        _classCallCheck(this, Layer);
	
	        this.objects = [];
	        this.effects = [];
	        this.x = 0;
	        this.y = 0;
	        this.initialize(width, height, parameters);
	
	        if (parameters.background_color && parameters.background_color !== "transparent") {
	            this.applyEffect("fill-color", {
	                color: parameters.background_color
	            });
	        }
	    }
	
	    _createClass(Layer, [{
	        key: 'initialize',
	        value: function initialize(width, height, parameters) {
	            this.canvas = new _CanvasWrapper2.default(width, height);
	            this.imageData = this.canvas.getContext().createImageData(width, height);
	            this.width = width;
	            this.height = height;
	            this.parameters = parameters;
	        }
	    }, {
	        key: 'put',
	        value: function put(obj, x, y) {
	            var put = new _LayerObject2.default(obj, this, x, y, {});
	            this.objects.push(put);
	            return put;
	        }
	    }, {
	        key: 'exportTo',
	        value: function exportTo(selector) {
	            var imageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'image/png';
	
	            this.exportLayer();
	
	            var container = document.querySelector(selector),
	                exportedImage = new Image();
	
	            exportedImage.src = canvas.toDataURL(imageType);
	            container.appendChild(exportedImage);
	        }
	    }, {
	        key: 'exportLayer',
	        value: function exportLayer() {
	            var i = void 0,
	                layerObject = void 0;
	
	            for (i = 0; i < this.objects.length; i += 1) {
	                layerObject = this.objects[i];
	                this.imageData = (0, _common.mergeImageData)({
	                    width: this.width,
	                    height: this.height,
	                    imageData: this.imageData
	                }, {
	                    x: layerObject.getX(),
	                    y: layerObject.getY(),
	                    width: layerObject.getWidth(),
	                    height: layerObject.getHeight(),
	                    imageData: layerObject.exportObject()
	                }, _common.mergePixelCallback);
	            }
	
	            for (i = 0; i < this.effects.length; i++) {
	                this.imageData = this.effects[i].effect.run(this.imageData, this.effects[i].params);
	            }
	
	            return this.imageData;
	        }
	    }, {
	        key: 'applyEffect',
	        value: function applyEffect(name, parameters) {
	            this.effects.push({
	                name: name,
	                effect: new (_EffectsRepository2.default.get(name))(),
	                parameters: parameters
	            });
	        }
	    }, {
	        key: 'resize',
	        value: function resize(newWidth, newHeight, mode) {
	            var i = void 0;
	
	            this.canvas.destroy();
	            this.canvas = null;
	            this.imageData = null;
	
	            this.initialize(newWidth, newHeight, this.parameters);
	
	            for (i = 0; i < this.objects.length; i += 1) {
	                this.objects[i].resize(newWidth, newHeight, mode, true);
	            }
	
	            return this;
	        }
	    }, {
	        key: 'crop',
	        value: function crop(startX, startY, width, height) {
	            var i = void 0;
	
	            for (i = 0; i < this.objects.length; i += 1) {
	                this.objects[i].crop(startX, startY, width, height);
	            }
	
	            return this;
	        }
	    }, {
	        key: 'moveXY',
	        value: function moveXY(x, y) {
	            this.moveX(x);
	            this.moveY(y);
	            return this;
	        }
	    }, {
	        key: 'moveX',
	        value: function moveX(x) {
	            this.x += x | 0;
	            return this;
	        }
	    }, {
	        key: 'moveY',
	        value: function moveY(y) {
	            this.y += y | 0;
	            return this;
	        }
	    }, {
	        key: 'setX',
	        value: function setX(x) {
	            this.x = x;
	            return this;
	        }
	    }, {
	        key: 'setY',
	        value: function setY(y) {
	            this.y = y;
	            return this;
	        }
	    }, {
	        key: 'setBlendingMode',
	        value: function setBlendingMode(blendingMode) {
	            this.parameters.blendingMode = blendingMode;
	        }
	    }, {
	        key: 'getX',
	        value: function getX() {
	            return this.x;
	        }
	    }, {
	        key: 'getY',
	        value: function getY() {
	            return this.y;
	        }
	    }, {
	        key: 'getWidth',
	        value: function getWidth() {
	            return this.width;
	        }
	    }, {
	        key: 'getHeight',
	        value: function getHeight() {
	            return this.height;
	        }
	    }, {
	        key: 'getParameter',
	        value: function getParameter(name) {
	            return this.parameters[name];
	        }
	    }]);
	
	    return Layer;
	}();
	
	exports.default = Layer;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _CanvasWrapper = __webpack_require__(7);
	
	var _CanvasWrapper2 = _interopRequireDefault(_CanvasWrapper);
	
	var _common = __webpack_require__(8);
	
	var _EffectsRepository = __webpack_require__(12);
	
	var _EffectsRepository2 = _interopRequireDefault(_EffectsRepository);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LayerObject = function () {
	    function LayerObject(obj, layer, x, y, opts) {
	        _classCallCheck(this, LayerObject);
	
	        this.obj = obj;
	        this.layer = this;
	        this.x = x;
	        this.y = y;
	        this.opts = opts;
	        this.effects = [];
	    }
	
	    _createClass(LayerObject, [{
	        key: 'getObject',
	        value: function getObject() {
	            return this.obj;
	        }
	    }, {
	        key: 'getX',
	        value: function getX() {
	            return this.x;
	        }
	    }, {
	        key: 'getY',
	        value: function getY() {
	            return this.y;
	        }
	    }, {
	        key: 'getWidth',
	        value: function getWidth() {
	            return this.obj.getWidth();
	        }
	    }, {
	        key: 'getHeight',
	        value: function getHeight() {
	            return this.obj.getHeight();
	        }
	    }, {
	        key: 'exportObject',
	        value: function exportObject() {
	            var imageData = this.obj.getImageData();
	            for (var i = 0; i < this.effects.length; i += 1) {
	                imageData = this.effects[i].effect.run(imageData, this.effects[i].params);
	            }
	            return imageData;
	        }
	    }, {
	        key: 'applyEffect',
	        value: function applyEffect(name, parameters) {
	            this.effects.push({
	                name: name,
	                effect: new (_EffectsRepository2.default.get(name))(),
	                parameters: parameters
	            });
	        }
	    }, {
	        key: 'moveXY',
	        value: function moveXY(x, y) {
	            this.moveX(x);
	            this.moveY(y);
	            return this;
	        }
	    }, {
	        key: 'moveX',
	        value: function moveX(x) {
	            this.x += x | 0;
	            return this;
	        }
	    }, {
	        key: 'moveY',
	        value: function moveY(y) {
	            this.y += y | 0;
	            return this;
	        }
	    }, {
	        key: 'setXY',
	        value: function setXY(x, y) {
	            this.setX(x);
	            this.setY(y);
	            return this;
	        }
	    }, {
	        key: 'setX',
	        value: function setX(x) {
	            this.x = x;
	            return this;
	        }
	    }, {
	        key: 'setY',
	        value: function setY(y) {
	            this.y = y;
	            return this;
	        }
	    }, {
	        key: 'resize',
	        value: function resize(newWidth, newHeight, mode, isLayerResize) {
	            var oldWidth = this.getWidth(),
	                oldHeight = this.getHeight(),
	                ratioX = newWidth / oldWidth,
	                ratioY = newHeight / oldHeight;
	
	            if (isLayerResize) {
	                this.moveXY(-this.getX() * ratioX, -this.getY() * ratioY);
	            }
	
	            this.getObject().resize(newWidth, newHeight, mode);
	
	            return this;
	        }
	    }, {
	        key: 'crop',
	        value: function crop(startX, startY, width, height) {
	            var object = this.getObject(),
	                oldImageData = object.getImageData(),
	                canvas = new _CanvasWrapper2.default(width, height),
	                newImageData = canvas.getContext().createImageData(width, height);
	
	            newImageData = (0, _common.cropImageData)(oldImageData, newImageData, startX, startY, width, height);
	
	            object.setImageData(newImageData).setWidth(width).setHeight(height);
	
	            this.setXY(startX, startY);
	
	            return this;
	        }
	    }]);
	
	    return LayerObject;
	}();
	
	exports.default = LayerObject;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _GrayScale = __webpack_require__(13);
	
	var _GrayScale2 = _interopRequireDefault(_GrayScale);
	
	var _Sepia = __webpack_require__(17);
	
	var _Sepia2 = _interopRequireDefault(_Sepia);
	
	var _Contrast = __webpack_require__(18);
	
	var _Contrast2 = _interopRequireDefault(_Contrast);
	
	var _Brightness = __webpack_require__(19);
	
	var _Brightness2 = _interopRequireDefault(_Brightness);
	
	var _Diffusion = __webpack_require__(20);
	
	var _Diffusion2 = _interopRequireDefault(_Diffusion);
	
	var _Dither = __webpack_require__(21);
	
	var _Dither2 = _interopRequireDefault(_Dither);
	
	var _Exposure = __webpack_require__(22);
	
	var _Exposure2 = _interopRequireDefault(_Exposure);
	
	var _Gain = __webpack_require__(23);
	
	var _Gain2 = _interopRequireDefault(_Gain);
	
	var _Gamma = __webpack_require__(24);
	
	var _Gamma2 = _interopRequireDefault(_Gamma);
	
	var _HSBAdjust = __webpack_require__(25);
	
	var _HSBAdjust2 = _interopRequireDefault(_HSBAdjust);
	
	var _InvertAlpha = __webpack_require__(27);
	
	var _InvertAlpha2 = _interopRequireDefault(_InvertAlpha);
	
	var _Invert = __webpack_require__(28);
	
	var _Invert2 = _interopRequireDefault(_Invert);
	
	var _Levels = __webpack_require__(29);
	
	var _Levels2 = _interopRequireDefault(_Levels);
	
	var _Rescale = __webpack_require__(30);
	
	var _Rescale2 = _interopRequireDefault(_Rescale);
	
	var _Solarize = __webpack_require__(31);
	
	var _Solarize2 = _interopRequireDefault(_Solarize);
	
	var _Threshold = __webpack_require__(32);
	
	var _Threshold2 = _interopRequireDefault(_Threshold);
	
	var _Tritone = __webpack_require__(33);
	
	var _Tritone2 = _interopRequireDefault(_Tritone);
	
	var _Dissolve = __webpack_require__(34);
	
	var _Dissolve2 = _interopRequireDefault(_Dissolve);
	
	var _Edge = __webpack_require__(35);
	
	var _Edge2 = _interopRequireDefault(_Edge);
	
	var _ChannelMix = __webpack_require__(36);
	
	var _ChannelMix2 = _interopRequireDefault(_ChannelMix);
	
	var _AutoContrast = __webpack_require__(37);
	
	var _AutoContrast2 = _interopRequireDefault(_AutoContrast);
	
	var _Diffuse = __webpack_require__(38);
	
	var _Diffuse2 = _interopRequireDefault(_Diffuse);
	
	var _Kaleidoscope = __webpack_require__(40);
	
	var _Kaleidoscope2 = _interopRequireDefault(_Kaleidoscope);
	
	var _Marble = __webpack_require__(41);
	
	var _Marble2 = _interopRequireDefault(_Marble);
	
	var _Pinch = __webpack_require__(43);
	
	var _Pinch2 = _interopRequireDefault(_Pinch);
	
	var _Ripple = __webpack_require__(44);
	
	var _Ripple2 = _interopRequireDefault(_Ripple);
	
	var _Shear = __webpack_require__(45);
	
	var _Shear2 = _interopRequireDefault(_Shear);
	
	var _Sphere = __webpack_require__(46);
	
	var _Sphere2 = _interopRequireDefault(_Sphere);
	
	var _Swim = __webpack_require__(47);
	
	var _Swim2 = _interopRequireDefault(_Swim);
	
	var _Twirl = __webpack_require__(48);
	
	var _Twirl2 = _interopRequireDefault(_Twirl);
	
	var _Water = __webpack_require__(49);
	
	var _Water2 = _interopRequireDefault(_Water);
	
	var _Circle = __webpack_require__(50);
	
	var _Circle2 = _interopRequireDefault(_Circle);
	
	var _Rotate = __webpack_require__(51);
	
	var _Rotate2 = _interopRequireDefault(_Rotate);
	
	var _Offset = __webpack_require__(52);
	
	var _Offset2 = _interopRequireDefault(_Offset);
	
	var _Polar = __webpack_require__(53);
	
	var _Polar2 = _interopRequireDefault(_Polar);
	
	var _Perspective = __webpack_require__(54);
	
	var _Perspective2 = _interopRequireDefault(_Perspective);
	
	var _AutoWhiteBalance = __webpack_require__(55);
	
	var _AutoWhiteBalance2 = _interopRequireDefault(_AutoWhiteBalance);
	
	var _FillColor = __webpack_require__(57);
	
	var _FillColor2 = _interopRequireDefault(_FillColor);
	
	var _Flip = __webpack_require__(58);
	
	var _Flip2 = _interopRequireDefault(_Flip);
	
	var _Block = __webpack_require__(59);
	
	var _Block2 = _interopRequireDefault(_Block);
	
	var _Border = __webpack_require__(60);
	
	var _Border2 = _interopRequireDefault(_Border);
	
	var _Emboss = __webpack_require__(61);
	
	var _Emboss2 = _interopRequireDefault(_Emboss);
	
	var _ComponentStretching = __webpack_require__(62);
	
	var _ComponentStretching2 = _interopRequireDefault(_ComponentStretching);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var availableEffects = {};
	
	function add(_class) {
	    if (availableEffects[_class.getName()]) {
	        throw 'Effect: ' + _class.getName() + ' exists already!';
	    }
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
	add(_Marble2.default);
	add(_Pinch2.default);
	add(_Ripple2.default);
	add(_Shear2.default);
	add(_Sphere2.default);
	add(_Swim2.default);
	add(_Twirl2.default);
	add(_Water2.default);
	add(_Edge2.default);
	add(_ChannelMix2.default);
	add(_Circle2.default);
	add(_Rotate2.default);
	add(_Offset2.default);
	add(_Polar2.default);
	add(_Perspective2.default);
	add(_AutoContrast2.default);
	add(_AutoWhiteBalance2.default);
	add(_FillColor2.default);
	add(_Flip2.default);
	add(_Block2.default);
	add(_Border2.default);
	add(_Emboss2.default);
	add(_ComponentStretching2.default);
	
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(14);
	
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Base = __webpack_require__(15);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	var _extend = __webpack_require__(16);
	
	var _extend2 = _interopRequireDefault(_extend);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BasePointEffect = function (_BaseEffect) {
	    _inherits(BasePointEffect, _BaseEffect);
	
	    function BasePointEffect() {
	        _classCallCheck(this, BasePointEffect);
	
	        return _possibleConstructorReturn(this, (BasePointEffect.__proto__ || Object.getPrototypeOf(BasePointEffect)).apply(this, arguments));
	    }
	
	    _createClass(BasePointEffect, [{
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            throw "Extend it.";
	        }
	    }, {
	        key: 'run',
	        value: function run(imageData, parameters) {
	
	            parameters = (0, _extend2.default)(true, {}, this.getDefaultParameters(), parameters);
	
	            var x = void 0,
	                y = void 0,
	                firstPixelIndex = void 0,
	                result = void 0,
	                imageDataCopy = new Uint8ClampedArray(imageData.data),
	                // copy image data
	            /**
	             * Get ImageData array index from x and y position
	             * @param x
	             * @param y
	             * @returns {number}
	             */
	            getIndex = function getIndex(x, y) {
	                return y * imageData.width * 4 + x * 4;
	            },
	                normalizePixelValue = function normalizePixelValue(value) {
	                return Math.min(Math.max(value, 0), 255) | 0;
	            },
	                sandbox = { // object invoked as this in effect callback
	                /**
	                 * Get changed pixel
	                 * @param {int} x
	                 * @param {int} y
	                 * @returns {{r: *, g: *, b: *, a: *}}
	                 */
	                getPixel: function getPixel(x, y) {
	                    var index = getIndex(x, y);
	                    return {
	                        r: imageDataCopy[index + 0],
	                        g: imageDataCopy[index + 1],
	                        b: imageDataCopy[index + 2],
	                        a: imageDataCopy[index + 3]
	                    };
	                },
	                /**
	                 * Get original pixel.
	                 * @param {int} x
	                 * @param {int} y
	                 * @returns {{r: *, g: *, b: *, a: *}}
	                 */
	                getOriginalPixel: function getOriginalPixel(x, y) {
	                    var index = getIndex(x, y);
	                    return {
	                        r: imageData.data[index + 0],
	                        g: imageData.data[index + 1],
	                        b: imageData.data[index + 2],
	                        a: imageData.data[index + 3]
	                    };
	                },
	                /**
	                 * Set new pixel
	                 * @param {int} x
	                 * @param {int} y
	                 * @param {object} rgba
	                 */
	                setPixel: function setPixel(x, y, rgba) {
	                    var index = getIndex(x, y);
	                    imageDataCopy[index + 0] = normalizePixelValue(rgba.r);
	                    imageDataCopy[index + 1] = normalizePixelValue(rgba.g);
	                    imageDataCopy[index + 2] = normalizePixelValue(rgba.b);
	                    imageDataCopy[index + 3] = normalizePixelValue(rgba.a);
	                },
	                /**
	                 * Data created by effect init function
	                 */
	                data: null,
	                /**
	                 * ImageData width
	                 */
	                width: imageData.width,
	                /**
	                 * ImageData height
	                 */
	                height: imageData.height
	            };
	
	            sandbox.data = this.before.call(sandbox, parameters, imageData.width, imageData.height, imageData);
	
	            for (y = 0; y < imageData.height; y += 1) {
	                for (x = 0; x < imageData.width; x += 1) {
	                    firstPixelIndex = getIndex(x, y);
	
	                    result = this.callback.call(sandbox, {
	                        r: imageDataCopy[firstPixelIndex + 0],
	                        g: imageDataCopy[firstPixelIndex + 1],
	                        b: imageDataCopy[firstPixelIndex + 2],
	                        a: imageDataCopy[firstPixelIndex + 3]
	                    }, x, y, parameters, imageData.width, imageData.height);
	
	                    if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === "object") {
	                        imageDataCopy[firstPixelIndex + 0] = normalizePixelValue(result.r);
	                        imageDataCopy[firstPixelIndex + 1] = normalizePixelValue(result.g);
	                        imageDataCopy[firstPixelIndex + 2] = normalizePixelValue(result.b);
	                        imageDataCopy[firstPixelIndex + 3] = normalizePixelValue(result.a);
	                    }
	                }
	            }
	
	            imageData.data.set(imageDataCopy);
	            return imageData;
	        }
	    }]);
	
	    return BasePointEffect;
	}(_Base2.default);
	
	exports.default = BasePointEffect;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BaseEffect = function () {
	    function BaseEffect() {
	        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	        _classCallCheck(this, BaseEffect);
	
	        this.opts = opts;
	    }
	
	    _createClass(BaseEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {};
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height, imageData) {
	            return {};
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            throw 'Extend it.';
	        }
	    }]);
	
	    return BaseEffect;
	}();
	
	exports.default = BaseEffect;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	
	var isArray = function isArray(arr) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(arr);
		}
	
		return toStr.call(arr) === '[object Array]';
	};
	
	var isPlainObject = function isPlainObject(obj) {
		if (!obj || toStr.call(obj) !== '[object Object]') {
			return false;
		}
	
		var hasOwnConstructor = hasOwn.call(obj, 'constructor');
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
			return false;
		}
	
		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) {/**/}
	
		return typeof key === 'undefined' || hasOwn.call(obj, key);
	};
	
	module.exports = function extend() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0],
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
			target = {};
		}
	
		for (; i < length; ++i) {
			options = arguments[i];
			// Only deal with non-null/undefined values
			if (options != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];
	
					// Prevent never-ending loop
					if (target !== copy) {
						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && isArray(src) ? src : [];
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}
	
							// Never move original objects, clone them
							target[name] = extend(deep, clone, copy);
	
						// Don't bring in undefined values
						} else if (typeof copy !== 'undefined') {
							target[name] = copy;
						}
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	};
	


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(14);
	
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(14);
	
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

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(14);
	
	var _BasePoint2 = _interopRequireDefault(_BasePoint);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BrightnessEffect = function (_BasePointEffect) {
	    _inherits(BrightnessEffect, _BasePointEffect);
	
	    function BrightnessEffect() {
	        _classCallCheck(this, BrightnessEffect);
	
	        return _possibleConstructorReturn(this, (BrightnessEffect.__proto__ || Object.getPrototypeOf(BrightnessEffect)).apply(this, arguments));
	    }
	
	    _createClass(BrightnessEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                brightness: 0.5
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters) {
	            return {
	                brightness: 255 * parameters.brightness
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            pixel.r = pixel.r + this.data.brightness;
	            pixel.g = pixel.g + this.data.brightness;
	            pixel.b = pixel.b + this.data.brightness;
	
	            return pixel;
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'brightness';
	        }
	    }]);
	
	    return BrightnessEffect;
	}(_BasePoint2.default);
	
	exports.default = BrightnessEffect;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(14);
	
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

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(14);
	
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
	                matrices: {
	                    ditherMagic4x4Matrix: [0, 14, 3, 13, 11, 5, 8, 6, 12, 2, 15, 1, 7, 9, 4, 10],
	                    ditherOrdered4x4Matrix: [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5],
	                    ditherLines4x4Matrix: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
	                    dither90Halftone6x6Matrix: [29, 18, 12, 19, 30, 34, 17, 7, 4, 8, 20, 28, 11, 3, 0, 1, 9, 27, 16, 6, 2, 5, 13, 26, 25, 15, 10, 14, 21, 31, 33, 25, 24, 23, 33, 36],
	                    ditherOrdered6x6Matrix: [1, 59, 15, 55, 2, 56, 12, 52, 33, 17, 47, 31, 34, 18, 44, 28, 9, 49, 5, 63, 10, 50, 6, 60, 41, 25, 37, 21, 42, 26, 38, 22, 3, 57, 13, 53, 0, 58, 14, 54, 35, 19, 45, 29, 32, 16, 46, 30, 11, 51, 7, 61, 8, 48, 4, 62, 43, 27, 39, 23, 40, 24, 36, 20],
	                    ditherOrdered8x8Matrix: [1, 235, 59, 219, 15, 231, 55, 215, 2, 232, 56, 216, 12, 228, 52, 212, 129, 65, 187, 123, 143, 79, 183, 119, 130, 66, 184, 120, 140, 76, 180, 116, 33, 193, 17, 251, 47, 207, 31, 247, 34, 194, 18, 248, 44, 204, 28, 244, 161, 97, 145, 81, 175, 111, 159, 95, 162, 98, 146, 82, 172, 108, 156, 92, 9, 225, 49, 209, 5, 239, 63, 223, 10, 226, 50, 210, 6, 236, 60, 220, 137, 73, 177, 113, 133, 69, 191, 127, 138, 74, 178, 114, 134, 70, 188, 124, 41, 201, 25, 241, 37, 197, 21, 255, 42, 202, 26, 242, 38, 198, 22, 252, 169, 105, 153, 89, 165, 101, 149, 85, 170, 106, 154, 90, 166, 102, 150, 86, 3, 233, 57, 217, 13, 229, 53, 213, 0, 234, 58, 218, 14, 230, 54, 214, 131, 67, 185, 121, 141, 77, 181, 117, 128, 64, 186, 122, 142, 78, 182, 118, 35, 195, 19, 249, 45, 205, 29, 245, 32, 192, 16, 250, 46, 206, 30, 246, 163, 99, 147, 83, 173, 109, 157, 93, 160, 96, 144, 80, 174, 110, 158, 94, 11, 227, 51, 211, 7, 237, 61, 221, 8, 224, 48, 208, 4, 238, 62, 222, 139, 75, 179, 115, 135, 71, 189, 125, 136, 72, 176, 112, 132, 68, 190, 126, 43, 203, 27, 243, 39, 199, 23, 253, 40, 200, 24, 240, 36, 196, 20, 254, 171, 107, 155, 91, 167, 103, 151, 87, 168, 104, 152, 88, 164, 100, 148, 84],
	                    ditherCluster3Matrix: [9, 11, 10, 8, 6, 7, 12, 17, 16, 5, 0, 1, 13, 14, 15, 4, 3, 2, 8, 6, 7, 9, 11, 10, 5, 0, 1, 12, 17, 16, 4, 3, 2, 13, 14, 15],
	                    ditherCluster4Matrix: [18, 20, 19, 16, 13, 11, 12, 15, 27, 28, 29, 22, 4, 3, 2, 9, 26, 31, 30, 21, 5, 0, 1, 10, 23, 25, 24, 17, 8, 6, 7, 14, 13, 11, 12, 15, 18, 20, 19, 16, 4, 3, 2, 9, 27, 28, 29, 22, 5, 0, 1, 10, 26, 31, 30, 21, 8, 6, 7, 14, 23, 25, 24, 17],
	                    ditherCluster8Matrix: [64, 69, 77, 87, 86, 76, 68, 67, 63, 58, 50, 40, 41, 51, 59, 60, 70, 94, 100, 109, 108, 99, 93, 75, 57, 33, 27, 18, 19, 28, 34, 52, 78, 101, 114, 116, 115, 112, 98, 83, 49, 26, 13, 11, 12, 15, 29, 44, 88, 110, 123, 124, 125, 118, 107, 85, 39, 17, 4, 3, 2, 9, 20, 42, 89, 111, 122, 127, 126, 117, 106, 84, 38, 16, 5, 0, 1, 10, 21, 43, 79, 102, 119, 121, 120, 113, 97, 82, 48, 25, 8, 6, 7, 14, 30, 45, 71, 95, 103, 104, 105, 96, 92, 74, 56, 32, 24, 23, 22, 31, 35, 53, 65, 72, 80, 90, 91, 81, 73, 66, 62, 55, 47, 37, 36, 46, 54, 61, 63, 58, 50, 40, 41, 51, 59, 60, 64, 69, 77, 87, 86, 76, 68, 67, 57, 33, 27, 18, 19, 28, 34, 52, 70, 94, 100, 109, 108, 99, 93, 75, 49, 26, 13, 11, 12, 15, 29, 44, 78, 101, 114, 116, 115, 112, 98, 83, 39, 17, 4, 3, 2, 9, 20, 42, 88, 110, 123, 124, 125, 118, 107, 85, 38, 16, 5, 0, 1, 10, 21, 43, 89, 111, 122, 127, 126, 117, 106, 84, 48, 25, 8, 6, 7, 14, 30, 45, 79, 102, 119, 121, 120, 113, 97, 82, 56, 32, 24, 23, 22, 31, 35, 53, 71, 95, 103, 104, 105, 96, 92, 74, 62, 55, 47, 37, 36, 46, 54, 61, 65, 72, 80, 90, 91, 81, 73, 66]
	                },
	                levels: 6,
	                matrix: "ditherMagic4x4Matrix",
	                colorDither: true
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height, imageData) {
	            var matrix = parameters.matrix,
	                rows = void 0,
	                cols = void 0,
	                map = [],
	                div = [],
	                mod = [],
	                i = void 0;
	
	            if (typeof matrix === "string") {
	                matrix = parameters.matrices[matrix];
	            }
	
	            rows = Math.sqrt(matrix.length);
	            cols = Math.sqrt(matrix.length);
	
	            for (i = 0; i < parameters.levels; i += 1) {
	                map[i] = 255 * i / (parameters.levels - 1);
	            }
	
	            for (i = 0; i < 256; i += 1) {
	                div[i] = parseInt((parameters.levels - 1) * i / 256);
	                mod[i] = parseInt(i * (rows * cols + 1) / 256);
	            }
	
	            return {
	                matrix: matrix,
	                map: map,
	                div: div,
	                mod: mod,
	                cols: cols,
	                rows: rows
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            var col = x % this.data.cols,
	                row = y % this.data.rows,
	                v = parameters.matrix[row * this.data.cols + col],
	                red = pixel.r,
	                green = pixel.g,
	                blue = pixel.b,
	                result = { a: pixel.a },
	                value = void 0;
	
	            if (parameters.colorDither) {
	                result.r = this.data.map[this.data.mod[red] > v ? this.data.div[red] + 1 : this.data.div[red]];
	                result.g = this.data.map[this.data.mod[green] > v ? this.data.div[green] + 1 : this.data.div[green]];
	                result.b = this.data.map[this.data.mod[blue] > v ? this.data.div[blue] + 1 : this.data.div[blue]];
	            } else {
	                value = (red + green + blue) / 3;
	                result.r = result.g = result.b = this.data.map[this.data.mod[value] > v ? this.data.div[value] + 1 : this.data.div[value]];
	            }
	
	            return result;
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'dither';
	        }
	    }]);
	
	    return DitherEffect;
	}(_BasePoint2.default);
	
	exports.default = DitherEffect;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(14);
	
	var _BasePoint2 = _interopRequireDefault(_BasePoint);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ExposureEffect = function (_BasePointEffect) {
	    _inherits(ExposureEffect, _BasePointEffect);
	
	    function ExposureEffect() {
	        _classCallCheck(this, ExposureEffect);
	
	        return _possibleConstructorReturn(this, (ExposureEffect.__proto__ || Object.getPrototypeOf(ExposureEffect)).apply(this, arguments));
	    }
	
	    _createClass(ExposureEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                exposure: 1
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            pixel.r = (1 - Math.exp(-pixel.r / 255 * parameters.exposure)) * 255;
	            pixel.g = (1 - Math.exp(-pixel.g / 255 * parameters.exposure)) * 255;
	            pixel.b = (1 - Math.exp(-pixel.b / 255 * parameters.exposure)) * 255;
	
	            return pixel;
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'exposure';
	        }
	    }]);
	
	    return ExposureEffect;
	}(_BasePoint2.default);
	
	exports.default = ExposureEffect;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(14);
	
	var _BasePoint2 = _interopRequireDefault(_BasePoint);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GainEffect = function (_BasePointEffect) {
	    _inherits(GainEffect, _BasePointEffect);
	
	    function GainEffect() {
	        _classCallCheck(this, GainEffect);
	
	        return _possibleConstructorReturn(this, (GainEffect.__proto__ || Object.getPrototypeOf(GainEffect)).apply(this, arguments));
	    }
	
	    _createClass(GainEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                gain: 1,
	                bias: 1
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            var red = (1 / parameters.gain - 2) * (1 - 2 * pixel.r / 255),
	                green = (1 / parameters.gain - 2) * (1 - 2 * pixel.g / 255),
	                blue = (1 / parameters.gain - 2) * (1 - 2 * pixel.b / 255);
	
	            if (pixel.r / 255 < 0.5) {
	                red = pixel.r / 255 / red + 1;
	            } else {
	                red = (red - pixel.r / 255) / (red - 1);
	            }
	
	            if (pixel.g / 255 < 0.5) {
	                green = pixel.g / 255 / green + 1;
	            } else {
	                green = (green - pixel.g / 255) / (green - 1);
	            }
	
	            if (pixel.b / 255 < 0.5) {
	                blue = pixel.b / 255 / blue + 1;
	            } else {
	                blue = (blue - pixel.b / 255) / (blue - 1);
	            }
	
	            red = red / ((1 / parameters.bias - 2) * (1 - red) + 1);
	            green = green / ((1 / parameters.bias - 2) * (1 - green) + 1);
	            blue = blue / ((1 / parameters.bias - 2) * (1 - blue) + 1);
	
	            pixel.r = red * 255;
	            pixel.g = green * 255;
	            pixel.b = blue * 255;
	
	            return pixel;
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'gain';
	        }
	    }]);
	
	    return GainEffect;
	}(_BasePoint2.default);
	
	exports.default = GainEffect;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(14);
	
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

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(14);
	
	var _BasePoint2 = _interopRequireDefault(_BasePoint);
	
	var _color = __webpack_require__(26);
	
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
	
	            var result = (0, _color.HSBtoRGB)(hsb.h, hsb.s, hsb.b);
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

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RGBtoHSB = RGBtoHSB;
	exports.HSBtoRGB = HSBtoRGB;
	exports.mixColors = mixColors;
	exports.hexToRGB = hexToRGB;
	exports.RGBtoHex = RGBtoHex;
	exports.RGBtoXYZ = RGBtoXYZ;
	exports.RGBtoCIELab = RGBtoCIELab;
	exports.CIELabToXYZ = CIELabToXYZ;
	exports.CIELabToRGB = CIELabToRGB;
	/**
	 * RGB to HSB color convert.
	 * @param r
	 * @param g
	 * @param b
	 * @returns {{h: number, s: number, b: number}}
	 */
	function RGBtoHSB(r, g, b) {
	    var hue,
	        saturation,
	        brightness,
	        cmax = Math.max(r, g, b),
	        cmin = Math.min(r, g, b);
	
	    brightness = cmax / 255;
	    if (cmax !== 0) {
	        saturation = (cmax - cmin) / cmax;
	    } else {
	        saturation = 0;
	    }
	
	    if (saturation === 0) {
	        hue = 0;
	    } else {
	        var redc = (cmax - r) / (cmax - cmin),
	            greenc = (cmax - g) / (cmax - cmin),
	            bluec = (cmax - b) / (cmax - cmin);
	
	        if (r === cmax) {
	            hue = bluec - greenc;
	        } else {
	            if (g === cmax) {
	                hue = 2 + redc - bluec;
	            } else {
	                hue = 4 + greenc - redc;
	            }
	        }
	
	        hue /= 6;
	        if (hue < 0) {
	            hue += 1;
	        }
	    }
	
	    return {
	        h: hue,
	        s: saturation,
	        b: brightness
	    };
	}
	/**
	 * HSB to RGB color convert.
	 * @param hue
	 * @param saturation
	 * @param brightness
	 * @returns {{r: Number, g: Number, b: Number}}
	 */
	function HSBtoRGB(hue, saturation, brightness) {
	    var red, green, blue;
	    if (saturation === 0) {
	        red = brightness * 255 + 0.5;
	        green = brightness * 255 + 0.5;
	        blue = brightness * 255 + 0.5;
	    } else {
	        var h = (hue - Math.floor(hue)) * 6,
	            f = h - Math.floor(h),
	            p = brightness * (1 - saturation),
	            q = brightness * (1 - saturation * f),
	            t = brightness * (1 - saturation * (1 - f));
	
	        switch (parseInt(h)) {
	            case 0:
	                red = brightness * 255 + 0.5;
	                green = t * 255 + 0.5;
	                blue = p * 255 + 0.5;
	                break;
	
	            case 1:
	                red = q * 255 + 0.5;
	                green = brightness * 255 + 0.5;
	                blue = p * 255 + 0.5;
	                break;
	
	            case 2:
	                red = p * 255 + 0.5;
	                green = brightness * 255 + 0.5;
	                blue = t * 255 + 0.5;
	                break;
	
	            case 3:
	                red = p * 255 + 0.5;
	                green = q * 255 + 0.5;
	                blue = brightness * 255 + 0.5;
	                break;
	
	            case 4:
	                red = t * 255 + 0.5;
	                green = p * 255 + 0.5;
	                blue = brightness * 255 + 0.5;
	                break;
	
	            case 5:
	                red = brightness * 255 + 0.5;
	                green = p * 255 + 0.5;
	                blue = q * 255 + 0.5;
	                break;
	
	            default:
	                red = 0;
	                green = 0;
	                blue = 0;
	                break;
	        }
	    }
	    return {
	        r: parseInt(red),
	        g: parseInt(green),
	        b: parseInt(blue)
	    };
	}
	
	function mixColors(t, rgb1, rgb2) {
	    return {
	        r: rgb1.r + t * (rgb2.r - rgb1.r),
	        g: rgb1.g + t * (rgb2.g - rgb1.g),
	        b: rgb1.b + t * (rgb2.b - rgb1.b),
	        a: rgb1.a + t * (rgb2.a - rgb1.a)
	    };
	}
	
	function hexToRGB(hex) {
	    hex = parseInt(hex.replace("#", ""), 16);
	    var r = hex >> 16;
	    var g = hex >> 8 & 0xFF;
	    var b = hex & 0xFF;
	    return {
	        r: r,
	        g: g,
	        b: b
	    };
	}
	
	function RGBtoHex(pixel) {
	    var bin = pixel.r << 16 | pixel.g << 8 | pixel.b;
	    return function (h) {
	        return new Array(7 - h.length).join("0") + h;
	    }(bin.toString(16).toUpperCase());
	}
	
	function RGBtoXYZ(r, g, b) {
	    var var_R = r / 255;
	    var var_G = g / 255;
	    var var_B = b / 255;
	
	    if (var_R > 0.04045) {
	        var_R = Math.pow((var_R + 0.055) / 1.055, 2.4);
	    } else {
	        var_R = var_R / 12.92;
	    }
	
	    if (var_G > 0.04045) {
	        var_G = Math.pow((var_G + 0.055) / 1.055, 2.4);
	    } else {
	        var_G = var_G / 12.92;
	    }
	
	    if (var_B > 0.04045) {
	        var_B = Math.pow((var_B + 0.055) / 1.055, 2.4);
	    } else {
	        var_B = var_B / 12.92;
	    }
	
	    var_R = var_R * 100;
	    var_G = var_G * 100;
	    var_B = var_B * 100;
	
	    return {
	        x: var_R * 0.4124 + var_G * 0.3576 + var_B * 0.1805,
	        y: var_R * 0.2126 + var_G * 0.7152 + var_B * 0.0722,
	        z: var_R * 0.0193 + var_G * 0.1192 + var_B * 0.9505
	    };
	}
	
	function RGBtoCIELab(r, g, b) {
	    var xyz = RGBtoXYZ(r, g, b);
	
	    var var_X = xyz.x / 95.047; // ref
	    var var_Y = xyz.y / 100; // ref
	    var var_Z = xyz.z / 108.883; // ref
	
	    if (var_X > 0.008856) {
	        var_X = Math.pow(var_X, 1 / 3);
	    } else {
	        var_X = 7.787 * var_X + 16 / 116;
	    }
	
	    if (var_Y > 0.008856) {
	        var_Y = Math.pow(var_Y, 1 / 3);
	    } else {
	        var_Y = 7.787 * var_Y + 16 / 116;
	    }
	
	    if (var_Z > 0.008856) {
	        var_Z = Math.pow(var_Z, 1 / 3);
	    } else {
	        var_Z = 7.787 * var_Z + 16 / 116;
	    }
	
	    return {
	        l: 116 * var_Y - 16,
	        a: 500 * (var_X - var_Y),
	        b: 200 * (var_Y - var_Z)
	    };
	}
	
	function CIELabToXYZ(l, a, b) {
	    var var_Y = (l + 16) / 116;
	    var var_X = a / 500 + var_Y;
	    var var_Z = var_Y - b / 200;
	
	    if (Math.pow(var_Y, 3) > 0.008856) {
	        var_Y = Math.pow(var_Y, 3);
	    } else {
	        var_Y = (var_Y - 16 / 116) / 7.787;
	    }
	
	    if (Math.pow(var_X, 3) > 0.008856) {
	        var_X = Math.pow(var_X, 3);
	    } else {
	        var_X = (var_X - 16 / 116) / 7.787;
	    }
	
	    if (Math.pow(var_Z, 3) > 0.008856) {
	        var_Z = Math.pow(var_Z, 3);
	    } else {
	        var_Z = (var_Z - 16 / 116) / 7.787;
	    }
	
	    return {
	        x: 95.047 * var_X, // ref
	        y: 100 * var_Y, // ref
	        z: 108.883 * var_Z // ref
	    };
	}
	
	function CIELabToRGB(l, a, b) {
	    var xyz = CIELabToXYZ(l, a, b);
	
	    var var_X = xyz.x / 100;
	    var var_Y = xyz.y / 100;
	    var var_Z = xyz.z / 100;
	
	    var var_R = var_X * 3.2406 + var_Y * -1.5372 + var_Z * -0.4986;
	    var var_G = var_X * -0.9689 + var_Y * 1.8758 + var_Z * 0.0415;
	    var var_B = var_X * 0.0557 + var_Y * -0.2040 + var_Z * 1.0570;
	
	    if (var_R > 0.0031308) {
	        var_R = 1.055 * Math.pow(var_R, 1 / 2.4) - 0.055;
	    } else {
	        var_R = 12.92 * var_R;
	    }
	
	    if (var_G > 0.0031308) {
	        var_G = 1.055 * Math.pow(var_G, 1 / 2.4) - 0.055;
	    } else {
	        var_G = 12.92 * var_G;
	    }
	
	    if (var_B > 0.0031308) {
	        var_B = 1.055 * Math.pow(var_B, 1 / 2.4) - 0.055;
	    } else {
	        var_B = 12.92 * var_B;
	    }
	
	    return {
	        r: var_R * 255,
	        g: var_G * 255,
	        b: var_B * 255
	    };
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(14);
	
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(14);
	
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

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(14);
	
	var _BasePoint2 = _interopRequireDefault(_BasePoint);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var LevelsEffect = function (_BasePointEffect) {
	    _inherits(LevelsEffect, _BasePointEffect);
	
	    function LevelsEffect() {
	        _classCallCheck(this, LevelsEffect);
	
	        return _possibleConstructorReturn(this, (LevelsEffect.__proto__ || Object.getPrototypeOf(LevelsEffect)).apply(this, arguments));
	    }
	
	    _createClass(LevelsEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                low: 0,
	                high: 1,
	                lowOutput: 0,
	                highOutput: 1
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height, imageData) {
	            var Histogram = function Histogram(imageData, width, height, offset, stride) {
	                var i = void 0,
	                    j = void 0,
	                    index = void 0,
	                    x = void 0,
	                    y = void 0,
	                    histogram = new Array(3),
	                    minValue = new Array(4),
	                    maxValue = new Array(4),
	                    minFrequency = new Array(3),
	                    maxFrequency = new Array(3),
	                    mean = new Array(3),
	                    numSamples = width * height,
	                    isGray = true,
	                    RED = 0,
	                    GREEN = 1,
	                    BLUE = 2,
	                    GRAY = 3;
	
	                for (i = 0; i < histogram.length; i += 1) {
	                    histogram[i] = new Array(256);
	                    for (j = 0; j < 256; j += 1) {
	                        histogram[i][j] = 0;
	                    }
	                }
	
	                for (y = 0; y < height; y += 1) {
	                    for (x = 0; x < width; x += 1) {
	                        index = y * width * 4 + x * 4;
	                        histogram[RED][imageData.data[index]]++;
	                        histogram[GREEN][imageData.data[index + 1]]++;
	                        histogram[BLUE][imageData.data[index + 2]]++;
	                    }
	                }
	
	                for (i = 0; i < 256; i += 1) {
	                    if (histogram[RED][i] !== histogram[GREEN][i] || histogram[GREEN][i] !== histogram[BLUE][i]) {
	                        isGray = false;
	                        break;
	                    }
	                }
	
	                for (i = 0; i < 3; i += 1) {
	                    for (j = 0; j < 256; j += 1) {
	                        if (histogram[i][j] > 0) {
	                            minValue[i] = j;
	                            break;
	                        }
	                    }
	                    for (j = 255; j >= 0; j -= 1) {
	                        if (histogram[i][j] > 0) {
	                            maxValue[i] = j;
	                            break;
	                        }
	                    }
	                    minFrequency[i] = Infinity;
	                    maxFrequency[i] = 0;
	                    for (j = 0; j < 256; j += 1) {
	                        minFrequency[i] = Math.min(minFrequency[i], histogram[i][j]);
	                        maxFrequency[i] = Math.max(maxFrequency[i], histogram[i][j]);
	                        mean[i] += j * histogram[i][j];
	                    }
	                    mean[i] /= numSamples;
	                    minValue[GRAY] = Math.min(minValue[RED], minValue[GREEN], minValue[BLUE]);
	                    maxValue[GRAY] = Math.max(maxValue[RED], maxValue[GREEN], maxValue[BLUE]);
	                }
	
	                this.getNumSamples = function () {
	                    return numSamples;
	                };
	
	                this.isGray = function () {
	                    return isGray;
	                };
	
	                this.getFrequency = function (channel, value) {
	                    if (!value) {
	                        if (numSamples > 0 && isGray && value >= 0 && value <= 255) {
	                            return histogram[0][value];
	                        }
	                        return -1;
	                    }
	                    if (numSamples < 1 || channel < 0 || channel > 2 || value < 0 || value > 255) {
	                        return -1;
	                    }
	                    return histogram[channel][value];
	                };
	
	                this.getMinFrequency = function (channel) {
	                    if (!channel) {
	                        if (numSamples > 0 && isGray) {
	                            return minFrequency[0];
	                        }
	                        return -1;
	                    }
	                    if (numSamples < 1 || channel < 0 || channel > 2) {
	                        return -1;
	                    }
	                    return minFrequency[channel];
	                };
	
	                this.getMaxFrequency = function (channel) {
	                    if (!channel) {
	                        if (numSamples > 0 && isGray) {
	                            return maxFrequency[0];
	                        }
	                        return -1;
	                    }
	                    if (numSamples < 1 || channel < 0 || channel > 2) {
	                        return -1;
	                    }
	                    return maxFrequency[channel];
	                };
	
	                this.getMinValue = function (channel) {
	                    if (!channel) {
	                        if (numSamples > 0 && isGray) {
	                            return minValue[0];
	                        }
	                        return -1;
	                    }
	                    return minValue[channel];
	                };
	
	                this.getMaxValue = function (channel) {
	                    if (!channel) {
	                        if (numSamples > 0 && isGray) {
	                            return maxValue[0];
	                        }
	                        return -1;
	                    }
	                    return maxValue[channel];
	                };
	
	                this.getMeanValue = function (channel) {
	                    if (!channel) {
	                        if (numSamples > 0 && isGray) {
	                            return mean[0];
	                        }
	                        return -1;
	                    }
	                    return mean[channel];
	                };
	            };
	
	            var histogram = new Histogram(imageData, width, height, 0, width),
	                lut = new Array(3),
	                low = parameters.low * 255,
	                high = parameters.high * 255,
	                i = void 0,
	                j = void 0;
	
	            for (i = 0; i < lut.length; i += 1) {
	                lut[i] = new Array(256);
	            }
	            if (low === high) {
	                high++;
	            }
	
	            for (i = 0; i < 3; i += 1) {
	                for (j = 0; j < 256; j += 1) {
	                    lut[i][j] = 255 * (parameters.lowOutput + (parameters.highOutput - parameters.lowOutput) * (j - low) / (high - low));
	                }
	            }
	
	            return {
	                lut: lut
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            return {
	                r: this.data.lut[0][pixel.r],
	                g: this.data.lut[1][pixel.g],
	                b: this.data.lut[2][pixel.b],
	                a: pixel.a
	            };
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'levels';
	        }
	    }]);
	
	    return LevelsEffect;
	}(_BasePoint2.default);
	
	exports.default = LevelsEffect;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(14);
	
	var _BasePoint2 = _interopRequireDefault(_BasePoint);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RescaleEffect = function (_BasePointEffect) {
	    _inherits(RescaleEffect, _BasePointEffect);
	
	    function RescaleEffect() {
	        _classCallCheck(this, RescaleEffect);
	
	        return _possibleConstructorReturn(this, (RescaleEffect.__proto__ || Object.getPrototypeOf(RescaleEffect)).apply(this, arguments));
	    }
	
	    _createClass(RescaleEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                scale: 1
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            pixel.r = parameters.scale * pixel.r;
	            pixel.g = parameters.scale * pixel.g;
	            pixel.b = parameters.scale * pixel.b;
	
	            return pixel;
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'rescale';
	        }
	    }]);
	
	    return RescaleEffect;
	}(_BasePoint2.default);
	
	exports.default = RescaleEffect;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(14);
	
	var _BasePoint2 = _interopRequireDefault(_BasePoint);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SolarizeEffect = function (_BasePointEffect) {
	    _inherits(SolarizeEffect, _BasePointEffect);
	
	    function SolarizeEffect() {
	        _classCallCheck(this, SolarizeEffect);
	
	        return _possibleConstructorReturn(this, (SolarizeEffect.__proto__ || Object.getPrototypeOf(SolarizeEffect)).apply(this, arguments));
	    }
	
	    _createClass(SolarizeEffect, [{
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            var red = pixel.r / 255 > 0.5 ? 2 * (pixel.r / 255 - 0.5) : 2 * (0.5 - pixel.r / 255),
	                green = pixel.g / 255 > 0.5 ? 2 * (pixel.g / 255 - 0.5) : 2 * (0.5 - pixel.g / 255),
	                blue = pixel.b / 255 > 0.5 ? 2 * (pixel.b / 255 - 0.5) : 2 * (0.5 - pixel.b / 255);
	
	            return {
	                r: red * 255,
	                g: green * 255,
	                b: blue * 255,
	                a: pixel.a
	            };
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'solarize';
	        }
	    }]);
	
	    return SolarizeEffect;
	}(_BasePoint2.default);
	
	exports.default = SolarizeEffect;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(14);
	
	var _BasePoint2 = _interopRequireDefault(_BasePoint);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ThresholdEffect = function (_BasePointEffect) {
	    _inherits(ThresholdEffect, _BasePointEffect);
	
	    function ThresholdEffect() {
	        _classCallCheck(this, ThresholdEffect);
	
	        return _possibleConstructorReturn(this, (ThresholdEffect.__proto__ || Object.getPrototypeOf(ThresholdEffect)).apply(this, arguments));
	    }
	
	    _createClass(ThresholdEffect, [{
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            var grayscale = (pixel.r + pixel.g + pixel.b) / 3;
	
	            if (grayscale >= 127) {
	                return {
	                    r: 255,
	                    g: 255,
	                    b: 255,
	                    a: pixel.a
	                };
	            }
	
	            return {
	                r: 0,
	                g: 0,
	                b: 0,
	                a: pixel.a
	            };
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'threshold';
	        }
	    }]);
	
	    return ThresholdEffect;
	}(_BasePoint2.default);
	
	exports.default = ThresholdEffect;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(14);
	
	var _BasePoint2 = _interopRequireDefault(_BasePoint);
	
	var _color = __webpack_require__(26);
	
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

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(14);
	
	var _BasePoint2 = _interopRequireDefault(_BasePoint);
	
	var _common = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DissolveEffect = function (_BasePointEffect) {
	    _inherits(DissolveEffect, _BasePointEffect);
	
	    function DissolveEffect() {
	        _classCallCheck(this, DissolveEffect);
	
	        return _possibleConstructorReturn(this, (DissolveEffect.__proto__ || Object.getPrototypeOf(DissolveEffect)).apply(this, arguments));
	    }
	
	    _createClass(DissolveEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                density: 1,
	                softness: 0
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height, imageData) {
	            var d = (1 - parameters.density) * (1 + parameters.softness);
	            return {
	                minDensity: d - parameters.softness,
	                maxDensity: d
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            var v = Math.random(),
	                f = (0, _common.smoothStep)(this.data.minDensity, this.data.maxDensity, v);
	            pixel.a = pixel.a * f;
	            return pixel;
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'dissolve';
	        }
	    }]);
	
	    return DissolveEffect;
	}(_BasePoint2.default);
	
	exports.default = DissolveEffect;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(14);
	
	var _BasePoint2 = _interopRequireDefault(_BasePoint);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var EdgeEffect = function (_BasePointEffect) {
	    _inherits(EdgeEffect, _BasePointEffect);
	
	    function EdgeEffect() {
	        _classCallCheck(this, EdgeEffect);
	
	        return _possibleConstructorReturn(this, (EdgeEffect.__proto__ || Object.getPrototypeOf(EdgeEffect)).apply(this, arguments));
	    }
	
	    _createClass(EdgeEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                matrixes: {
	                    robertsV: [0, 0, -1, 0, 1, 0, 0, 0, 0],
	                    robertsH: [-1, 0, 0, 0, 1, 0, 0, 0, 0],
	                    prewittV: [-1, 0, 1, -1, 0, 1, -1, 0, 1],
	                    prewittH: [-1, -1, -1, 0, 0, 0, 1, 1, 1],
	                    sobelV: [-1, 0, 1, -2, 0, 2, -1, 0, 1],
	                    sobelH: [-1, -2, -1, 0, 0, 0, 1, 2, 1],
	                    freiChenV: [-1, 0, 1, -Math.sqrt(2), 0, Math.sqrt(2), -1, 0, 1],
	                    freiChenH: [-1, -Math.sqrt(2), -1, 0, 0, 0, 1, Math.sqrt(2), 1]
	                },
	                hEdgeMatrix: "sobelV",
	                vEdgeMatrix: "sobelH"
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height, imageData) {
	            var hEdgeMatrix = parameters.hEdgeMatrix,
	                vEdgeMatrix = parameters.vEdgeMatrix;
	
	            if (typeof hEdgeMatrix === "string") {
	                hEdgeMatrix = parameters.matrixes[parameters.hEdgeMatrix];
	            }
	            if (typeof vEdgeMatrix === "string") {
	                vEdgeMatrix = parameters.matrixes[parameters.vEdgeMatrix];
	            }
	            return {
	                hEdgeMatrix: hEdgeMatrix,
	                vEdgeMatrix: vEdgeMatrix
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            var r = 0,
	                g = 0,
	                b = 0,
	                rh = 0,
	                gh = 0,
	                bh = 0,
	                rv = 0,
	                gv = 0,
	                bv = 0,
	                row,
	                iy,
	                col,
	                ix,
	                mOffset,
	                pixel2,
	                h,
	                v;
	
	            for (row = -1; row <= 1; row += 1) {
	                iy = y + row;
	                if (!(0 <= iy && iy < height)) {
	                    iy = y;
	                }
	                mOffset = 3 * (row + 1) + 1;
	                for (col = -1; col <= 1; col += 1) {
	                    ix = x + col;
	                    if (!(0 <= ix && ix < width)) {
	                        ix = x;
	                    }
	                    pixel2 = this.getOriginalPixel(ix, iy);
	                    h = this.data.hEdgeMatrix[mOffset + col];
	                    v = this.data.vEdgeMatrix[mOffset + col];
	
	                    r = pixel2.r;
	                    g = pixel2.g;
	                    b = pixel2.b;
	
	                    rh += Math.floor(h * r);
	                    gh += Math.floor(h * g);
	                    bh += Math.floor(h * b);
	
	                    rv += Math.floor(v * r);
	                    gv += Math.floor(v * g);
	                    bv += Math.floor(v + b);
	                }
	            }
	            r = Math.floor(Math.sqrt(rh * rh + rv * rv) / 1.8);
	            g = Math.floor(Math.sqrt(gh * gh + gv * gv) / 1.8);
	            b = Math.floor(Math.sqrt(bh * bh + bv * bv) / 1.8);
	            return {
	                r: r,
	                g: g,
	                b: b,
	                a: pixel.a
	            };
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'edge';
	        }
	    }]);
	
	    return EdgeEffect;
	}(_BasePoint2.default);
	
	exports.default = EdgeEffect;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(14);
	
	var _BasePoint2 = _interopRequireDefault(_BasePoint);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ChannelMixEffect = function (_BasePointEffect) {
	    _inherits(ChannelMixEffect, _BasePointEffect);
	
	    function ChannelMixEffect() {
	        _classCallCheck(this, ChannelMixEffect);
	
	        return _possibleConstructorReturn(this, (ChannelMixEffect.__proto__ || Object.getPrototypeOf(ChannelMixEffect)).apply(this, arguments));
	    }
	
	    _createClass(ChannelMixEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                blueGreen: 1,
	                redBlue: 1,
	                greenRed: 1,
	                intoR: 1,
	                intoG: 1,
	                intoB: 1
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            var r = pixel.r,
	                g = pixel.g,
	                b = pixel.b;
	
	            return {
	                r: (parameters.intoR * (parameters.blueGreen * g + (255 - parameters.blueGreen) * b) / 255 + (255 - parameters.intoR) * r) / 255,
	                g: (parameters.intoG * (parameters.redBlue * g + (255 - parameters.redBlue) * r) / 255 + (255 - parameters.intoG) * g) / 255,
	                b: (parameters.intoB * (parameters.greenRed * g + (255 - parameters.greenRed) * g) / 255 + (255 - parameters.intoB) * b) / 255,
	                a: pixel.a
	            };
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'channel-mix';
	        }
	    }]);
	
	    return ChannelMixEffect;
	}(_BasePoint2.default);
	
	exports.default = ChannelMixEffect;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BasePoint = __webpack_require__(14);
	
	var _BasePoint2 = _interopRequireDefault(_BasePoint);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AutoContrastEffect = function (_BasePointEffect) {
	    _inherits(AutoContrastEffect, _BasePointEffect);
	
	    function AutoContrastEffect() {
	        _classCallCheck(this, AutoContrastEffect);
	
	        return _possibleConstructorReturn(this, (AutoContrastEffect.__proto__ || Object.getPrototypeOf(AutoContrastEffect)).apply(this, arguments));
	    }
	
	    _createClass(AutoContrastEffect, [{
	        key: 'before',
	        value: function before(parameters, width, height) {
	            var x,
	                y,
	                pixel,
	                min = Infinity,
	                max = -1;
	
	            for (y = 0; y < height; y += 1) {
	                for (x = 0; x < width; x += 1) {
	                    pixel = this.getPixel(x, y);
	
	                    min = Math.min((pixel.r + pixel.g + pixel.b) / 3, min);
	                    max = Math.max((pixel.r + pixel.g + pixel.b) / 3, max);
	                }
	            }
	
	            return {
	                min: min,
	                max: max,
	                remap: function remap(value) {
	                    return (value - min) * 255 / (max - min);
	                }
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            pixel.r = this.data.remap(pixel.r, this.data.min, this.data.max);
	            pixel.g = this.data.remap(pixel.g, this.data.min, this.data.max);
	            pixel.b = this.data.remap(pixel.b, this.data.min, this.data.max);
	
	            return pixel;
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'auto-contrast';
	        }
	    }]);
	
	    return AutoContrastEffect;
	}(_BasePoint2.default);
	
	exports.default = AutoContrastEffect;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseTransform = __webpack_require__(39);
	
	var _BaseTransform2 = _interopRequireDefault(_BaseTransform);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DiffuseEffect = function (_BaseTransformEffect) {
	    _inherits(DiffuseEffect, _BaseTransformEffect);
	
	    function DiffuseEffect() {
	        _classCallCheck(this, DiffuseEffect);
	
	        return _possibleConstructorReturn(this, (DiffuseEffect.__proto__ || Object.getPrototypeOf(DiffuseEffect)).apply(this, arguments));
	    }
	
	    _createClass(DiffuseEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                scale: 4
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height, imageData) {
	            var sinTable = new Array(256),
	                cosTable = new Array(256),
	                i = void 0,
	                angle = void 0;
	            for (i = 0; i < 256; i += 1) {
	                angle = Math.PI * 2 * i / 256;
	                sinTable[i] = parameters.scale * Math.sin(angle);
	                cosTable[i] = parameters.scale * Math.cos(angle);
	            }
	            return {
	                sinTable: sinTable,
	                cosTable: cosTable
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(x, y, parameters) {
	            var angle = parseInt(Math.random() * 255),
	                distance = Math.random();
	
	            return [x + distance * this.data.sinTable[angle], y + distance * this.data.cosTable[angle]];
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'diffuse';
	        }
	    }]);
	
	    return DiffuseEffect;
	}(_BaseTransform2.default);
	
	exports.default = DiffuseEffect;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Base = __webpack_require__(15);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	var _extend = __webpack_require__(16);
	
	var _extend2 = _interopRequireDefault(_extend);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BaseTransformEffect = function (_BaseEffect) {
	    _inherits(BaseTransformEffect, _BaseEffect);
	
	    function BaseTransformEffect() {
	        _classCallCheck(this, BaseTransformEffect);
	
	        return _possibleConstructorReturn(this, (BaseTransformEffect.__proto__ || Object.getPrototypeOf(BaseTransformEffect)).apply(this, arguments));
	    }
	
	    _createClass(BaseTransformEffect, [{
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            throw "Extend it.";
	        }
	    }, {
	        key: 'run',
	        value: function run(imageData, parameters) {
	
	            parameters = (0, _extend2.default)(true, {}, this.getDefaultParameters(), parameters);
	
	            var x = void 0,
	                y = void 0,
	                normalizePixelValue = function normalizePixelValue(value) {
	                return Math.min(Math.max(value, 0), 255) | 0;
	            },
	                sandbox = {
	                data: null
	            },
	                imageDataCopy = new Uint8ClampedArray(imageData.data);
	
	            sandbox.data = this.before.call(sandbox, parameters, imageData.width, imageData.height, imageData);
	
	            for (y = 0; y < imageData.height; y += 1) {
	                for (x = 0; x < imageData.width; x += 1) {
	                    var newXY = this.callback.call(sandbox, x, y, parameters, imageData.width, imageData.height),
	                        newX = normalizePixelValue(newXY[0]),
	                        newY = normalizePixelValue(newXY[1]),
	                        oldPixelIndex = y * imageData.width * 4 + x * 4,
	                        newPixelIndex = newY * imageData.width * 4 + newX * 4;
	
	                    imageDataCopy[oldPixelIndex + 0] = imageData.data[newPixelIndex + 0];
	                    imageDataCopy[oldPixelIndex + 1] = imageData.data[newPixelIndex + 1];
	                    imageDataCopy[oldPixelIndex + 2] = imageData.data[newPixelIndex + 2];
	                    imageDataCopy[oldPixelIndex + 3] = imageData.data[newPixelIndex + 3];
	                }
	            }
	
	            imageData.data.set(imageDataCopy);
	            return imageData;
	        }
	    }]);
	
	    return BaseTransformEffect;
	}(_Base2.default);
	
	exports.default = BaseTransformEffect;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseTransform = __webpack_require__(39);
	
	var _BaseTransform2 = _interopRequireDefault(_BaseTransform);
	
	var _common = __webpack_require__(8);
	
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

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseTransform = __webpack_require__(39);
	
	var _BaseTransform2 = _interopRequireDefault(_BaseTransform);
	
	var _noise = __webpack_require__(42);
	
	var _noise2 = _interopRequireDefault(_noise);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MarbleEffect = function (_BaseTransformEffect) {
	    _inherits(MarbleEffect, _BaseTransformEffect);
	
	    function MarbleEffect() {
	        _classCallCheck(this, MarbleEffect);
	
	        return _possibleConstructorReturn(this, (MarbleEffect.__proto__ || Object.getPrototypeOf(MarbleEffect)).apply(this, arguments));
	    }
	
	    _createClass(MarbleEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                xScale: 4,
	                yScale: 4,
	                amount: 1,
	                turbulence: 1
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height, imageData) {
	            var sinTable = new Array(256),
	                cosTable = new Array(256),
	                i = 0,
	                angle = void 0;
	
	            for (i = 0; i < 256; i += 1) {
	                angle = Math.PI * 2 * i / 256 * parameters.turbulence;
	                sinTable[i] = -parameters.yScale * Math.sin(angle);
	                cosTable[i] = parameters.yScale * Math.cos(angle);
	            }
	            return {
	                sinTable: sinTable,
	                cosTable: cosTable,
	                displacementMap: function displacementMap(x, y) {
	                    var result = 127 * (1 + _noise2.default.noise2(x / parameters.xScale, y / parameters.yScale));
	                    return Math.min(255, Math.max(0, result));
	                }
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(x, y, parameters) {
	            var displacement = Math.floor(this.data.displacementMap(x, y));
	            return [x + this.data.sinTable[displacement], y + this.data.cosTable[displacement]];
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'marble';
	        }
	    }]);
	
	    return MarbleEffect;
	}(_BaseTransform2.default);
	
	exports.default = MarbleEffect;

/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var parameters = {},
	    isInit = false;
	
	var noise = {
	    init: function init() {
	        if (isInit) {
	            return false;
	        }
	        isInit = true;
	
	        parameters.B = 0x100;
	        parameters.BM = 0xff;
	        parameters.N = 0x1000;
	
	        parameters.P = new Array(parameters.B + parameters.B + 2);
	        parameters.G1 = new Array(parameters.B + parameters.B + 2);
	        parameters.G2 = new Array(parameters.B + parameters.B + 2);
	        for (i = 0; i < parameters.G2.length; i += 1) {
	            parameters.G2[i] = new Array(2);
	        }
	        parameters.G3 = new Array(parameters.B + parameters.B + 2);
	        for (i = 0; i < parameters.G3.length; i += 1) {
	            parameters.G3[i] = new Array(3);
	        }
	        var i, j, k;
	
	        for (i = 0; i < parameters.B; i += 1) {
	            parameters.P[i] = i;
	            parameters.G1[i] = (this.random() % (parameters.B + parameters.B) - parameters.B) / parameters.B;
	            parameters.G2[i] = [];
	            for (j = 0; j < 2; j += 1) {
	                parameters.G2[i][j] = (this.random() % (parameters.B + parameters.B) - parameters.B) / parameters.B;
	            }
	            parameters.G2[i] = this.normalize2(parameters.G2[i]);
	
	            parameters.G3[i] = [];
	            for (j = 0; j < 3; j += 1) {
	                parameters.G3[i][j] = (this.random() % (parameters.B + parameters.B) - parameters.B) / parameters.B;
	            }
	            parameters.G3[i] = this.normalize3(parameters.G3[i]);
	        }
	
	        for (i = parameters.B - 1; i >= 0; i -= 1) {
	            k = parameters.P[i];
	            parameters.P[i] = parameters.P[j = this.random() % parameters.B];
	            parameters.P[j] = k;
	        }
	
	        for (i = 0; i < parameters.B + 2; i += 1) {
	            parameters.P[parameters.B + i] = parameters.P[i];
	            parameters.G1[parameters.B + i] = parameters.G1[i];
	            for (j = 0; j < 2; j += 1) {
	                parameters.G2[parameters.B + i][j] = parameters.G2[i][j];
	            }
	            for (j = 0; j < 3; j++) {
	                parameters.G3[parameters.B + i][j] = parameters.G3[i][j];
	            }
	        }
	    },
	    random: function random() {
	        return parseInt(Math.random() * 256 * 256) & 0x7fffffff;
	    },
	    normalize2: function normalize2(arr) {
	        var s = Math.sqrt(arr[0] * arr[0] + arr[1] * arr[1] + arr[2] * arr[2]);
	        arr[0] = arr[0] / s;
	        arr[1] = arr[1] / s;
	        arr[2] = arr[2] / s;
	        return arr;
	    },
	    normalize3: function normalize3(arr) {
	        var s = Math.sqrt(arr[0] * arr[0] + arr[1] * arr[1]);
	        arr[0] = arr[0] / s;
	        arr[1] = arr[1] / s;
	        return arr;
	    },
	    sCurve: function sCurve(t) {
	        return t * t * (3.0 - 2.0 * t);
	    },
	    lerp: function lerp(t, a, b) {
	        return a + t * (b - a);
	    },
	    /**
	     * Compute 1-dimensional Perlin noise.
	     * @param x
	     */
	    noise1: function noise1(x) {
	        var bx0, bx1, rx0, rx1, sx, t, u, v;
	
	        this.init();
	
	        t = x + parameters.N;
	        bx0 = parseInt(t) & parameters.BM;
	        bx1 = bx0 + 1 & parameters.BM;
	        rx0 = t - parseInt(t);
	        rx1 = rx0 - 1;
	
	        sx = this.sCurve(rx0);
	
	        u = rx0 * parameters.G1[parameters.P[bx0]];
	        v = rx1 * parameters.G1[parameters.P[bx1]];
	
	        return 2.3 * this.lerp(sx, u, v);
	    },
	    /**
	     * Compute 2-dimensional Perlin noise
	     * @param x
	     * @param y
	     * @returns {number}
	     */
	    noise2: function noise2(x, y) {
	        var bx0,
	            bx1,
	            by0,
	            by1,
	            b00,
	            b10,
	            b01,
	            b11,
	            rx0,
	            rx1,
	            ry0,
	            ry1,
	            q = [],
	            sx,
	            sy,
	            a,
	            b,
	            t,
	            u,
	            v,
	            i,
	            j;
	
	        this.init();
	
	        t = x + parameters.N;
	        bx0 = parseInt(t) & parameters.BM;
	        bx1 = bx0 + 1 & parameters.BM;
	        rx0 = t - parseInt(t);
	        rx1 = rx0 - 1;
	
	        t = y + parameters.N;
	        by0 = parseInt(t) & parameters.BM;
	        by1 = by0 + 1 & parameters.BM;
	        ry0 = t - parseInt(t);
	        ry1 = ry0 - 1;
	
	        i = parameters.P[bx0];
	        j = parameters.P[bx1];
	
	        b00 = parameters.P[i + by0];
	        b10 = parameters.P[j + by0];
	        b01 = parameters.P[i + by1];
	        b11 = parameters.P[j + by1];
	
	        sx = this.sCurve(rx0);
	        sy = this.sCurve(ry0);
	
	        q = parameters.G2[b00];
	        u = rx0 * q[0] + ry0 * q[1];
	        q = parameters.G2[b10];
	        v = rx1 * q[0] + ry0 * q[1];
	        a = this.lerp(sx, u, v);
	
	        q = parameters.G2[b01];
	        u = rx0 * q[0] + ry1 * q[1];
	        q = parameters.G2[b11];
	        v = rx1 * q[0] + ry1 * q[1];
	        b = this.lerp(sx, u, v);
	
	        return 1.5 * this.lerp(sy, a, b);
	    },
	    /**
	     * Compute 3-dimensional Perlin noise.
	     * @param x
	     * @param y
	     * @param z
	     */
	    noise3: function noise3(x, y, z) {
	        var bx0, bx1, by0, by1, bz0, bz1, b00, b10, b01, b11, rx0, rx1, ry0, ry1, rz0, rz1, q, sy, sz, a, b, c, d, t, u, v, i, j;
	
	        this.init();
	
	        t = x + parameters.N;
	        bx0 = parseInt(t) & parameters.BM;
	        bx1 = bx0 + 1 & parameters.BM;
	        rx0 = t - parseInt(t);
	        rx1 = rx0 - 1;
	
	        t = y + parameters.N;
	        by0 = parseInt(t) & parameters.BM;
	        by1 = by0 + 1 & parameters.BM;
	        ry0 = t - parseInt(t);
	        ry1 = ry0 - 1;
	
	        t = z + parameters.N;
	        bz0 = parseInt(t) & parameters.BM;
	        bz1 = bz0 + 1 & parameters.BM;
	        rz0 = t - parseInt(t);
	        rz1 = rz0 - 1;
	
	        i = parameters.P[bx0];
	        j = parameters.P[bx1];
	
	        b00 = parameters.P[i + by0];
	        b10 = parameters.P[j + by0];
	        b01 = parameters.P[i + by1];
	        b11 = parameters.P[j + by1];
	
	        t = this.sCurve(rx0);
	        sy = this.sCurve(ry0);
	        sz = this.sCurve(rz0);
	
	        q = parameters.G3[b00 + bz0];
	        u = rx0 * q[0] + ry0 * q[1] + rz0 * q[2];
	        q = parameters.G3[b10 + bz0];
	        v = rx1 * q[0] + ry0 * q[1] + rz0 * q[2];
	        a = this.lerp(t, u, v);
	
	        q = parameters.G3[b01 + bz0];
	        u = rx0 * q[0] + ry1 * q[1] + rz0 * q[2];
	        q = parameters.G3[b11 + bz0];
	        v = rx1 * q[0] + ry1 * q[1] + rz0 * q[2];
	        b = this.lerp(t, u, v);
	
	        c = this.lerp(sy, a, b);
	
	        q = parameters.G3[b00 + bz1];
	        u = rx0 * q[0] + ry0 * q[1] + rz1 * q[2];
	        q = parameters.G3[b10 + bz1];
	        v = rx1 * q[0] + ry0 * q[1] + rz1 * q[2];
	        a = this.lerp(t, u, v);
	
	        q = parameters.G3[b01 + bz1];
	        u = rx0 * q[0] + ry1 * q[1] + rz1 * q[2];
	        q = parameters.G3[b11 + bz1];
	        v = rx1 * q[0] + ry1 * q[1] + rz1 * q[2];
	        b = this.lerp(t, u, v);
	
	        d = this.lerp(sy, a, b);
	
	        return 1.5 * this.lerp(sz, c, d);
	    },
	    /**
	     * Compute turbulence using Perlin noise.
	     * @param x
	     * @param y
	     * @param z
	     * @param octaves
	     * @returns {*}
	     */
	    turbulence3: function turbulence3(x, y, z, octaves) {
	        var t = 0,
	            i;
	        for (i = 1; i <= octaves; i *= 2) {
	            t += Math.abs(this.noise3(i * x, i * y, i * z)) / i;
	        }
	        return t;
	    }
	};
	
	exports.default = noise;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseTransform = __webpack_require__(39);
	
	var _BaseTransform2 = _interopRequireDefault(_BaseTransform);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PinchEffect = function (_BaseTransformEffect) {
	    _inherits(PinchEffect, _BaseTransformEffect);
	
	    function PinchEffect() {
	        _classCallCheck(this, PinchEffect);
	
	        return _possibleConstructorReturn(this, (PinchEffect.__proto__ || Object.getPrototypeOf(PinchEffect)).apply(this, arguments));
	    }
	
	    _createClass(PinchEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                angle: 0,
	                centreX: 0.5,
	                centreY: 0.5,
	                radius: 100,
	                amount: 0.5
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height, imageData) {
	            var icentreX = width * parameters.centreX,
	                icentreY = height * parameters.centreY,
	                radius = parameters.radius,
	                radius2;
	            if (radius === 0) {
	                radius = Math.min(icentreX, icentreY);
	            }
	            radius2 = radius * radius;
	            return {
	                icentreX: icentreX,
	                icentreY: icentreY,
	                radius: radius,
	                radius2: radius2
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(x, y, parameters) {
	            var dx = x - this.data.icentreX,
	                dy = y - this.data.icentreY,
	                distance = dx * dx + dy * dy,
	                d,
	                t,
	                e,
	                a,
	                s,
	                c;
	
	            if (distance > this.data.radius2 || distance === 0) {
	                return [x, y];
	            }
	            d = Math.sqrt(distance / this.data.radius2);
	            t = Math.pow(Math.sin(Math.PI * 0.5 * d), -parameters.amount);
	
	            dx *= t;
	            dy *= t;
	
	            e = 1 - d;
	            a = parameters.angle * e * e;
	
	            s = Math.sin(a);
	            c = Math.cos(a);
	
	            return [this.data.icentreX + c * dx - s * dy, this.data.icentreY + s * dx + c * dy];
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'pinch';
	        }
	    }]);
	
	    return PinchEffect;
	}(_BaseTransform2.default);
	
	exports.default = PinchEffect;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseTransform = __webpack_require__(39);
	
	var _BaseTransform2 = _interopRequireDefault(_BaseTransform);
	
	var _common = __webpack_require__(8);
	
	var _noise = __webpack_require__(42);
	
	var _noise2 = _interopRequireDefault(_noise);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RippleEffect = function (_BaseTransformEffect) {
	    _inherits(RippleEffect, _BaseTransformEffect);
	
	    function RippleEffect() {
	        _classCallCheck(this, RippleEffect);
	
	        return _possibleConstructorReturn(this, (RippleEffect.__proto__ || Object.getPrototypeOf(RippleEffect)).apply(this, arguments));
	    }
	
	    _createClass(RippleEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                xAmplitude: 5,
	                yAmplitute: 0,
	                xWaveLength: 16,
	                yWaveLength: 16,
	                waveType: "SINE" // SAWTOOTH TRIANGLE NOISE
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(x, y, parameters) {
	            var nx = y / parameters.xWaveLength,
	                ny = x / parameters.yWaveLength,
	                fx,
	                fy;
	
	            switch (parameters.waveType) {
	                case "SINE":
	                default:
	                    fx = Math.sin(nx);
	                    fy = Math.sin(ny);
	                    break;
	
	                case "SAWTOOTH":
	                    fx = (0, _common.mod)(nx, 1);
	                    fy = (0, _common.mod)(ny, 1);
	                    break;
	
	                case "TRIANGLE":
	                    fx = (0, _common.triangle)(nx);
	                    fy = (0, _common.triangle)(ny);
	                    break;
	
	                case "NOISE":
	                    fx = _noise2.default.noise1(nx);
	                    fy = _noise2.default.noise1(ny);
	                    break;
	            }
	
	            return [x + parameters.xAmplitude * fx, y + parameters.yAmplitute * fy];
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'ripple';
	        }
	    }]);
	
	    return RippleEffect;
	}(_BaseTransform2.default);
	
	exports.default = RippleEffect;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseTransform = __webpack_require__(39);
	
	var _BaseTransform2 = _interopRequireDefault(_BaseTransform);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ShearEffect = function (_BaseTransformEffect) {
	    _inherits(ShearEffect, _BaseTransformEffect);
	
	    function ShearEffect() {
	        _classCallCheck(this, ShearEffect);
	
	        return _possibleConstructorReturn(this, (ShearEffect.__proto__ || Object.getPrototypeOf(ShearEffect)).apply(this, arguments));
	    }
	
	    _createClass(ShearEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                xAngle: 0,
	                yAngle: 0,
	                xOffset: 0,
	                yOffset: 0
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height) {
	            return {
	                shx: Math.sin(parameters.xAngle),
	                shy: Math.sin(parameters.yAngle)
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(x, y, parameters) {
	            return [x + parameters.xOffset + y * this.data.shx, y + parameters.yOffset + x * this.data.shy];
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'shear';
	        }
	    }]);
	
	    return ShearEffect;
	}(_BaseTransform2.default);
	
	exports.default = ShearEffect;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseTransform = __webpack_require__(39);
	
	var _BaseTransform2 = _interopRequireDefault(_BaseTransform);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SphereEffect = function (_BaseTransformEffect) {
	    _inherits(SphereEffect, _BaseTransformEffect);
	
	    function SphereEffect() {
	        _classCallCheck(this, SphereEffect);
	
	        return _possibleConstructorReturn(this, (SphereEffect.__proto__ || Object.getPrototypeOf(SphereEffect)).apply(this, arguments));
	    }
	
	    _createClass(SphereEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                a: 0,
	                b: 0,
	                centreX: 0.5,
	                centreY: 0.5,
	                refractionIndex: 1.5
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height) {
	            var icentreX = width * parameters.centreX,
	                icentreY = height * parameters.centreY,
	                a = parameters.a,
	                b = parameters.b,
	                a2,
	                b2;
	            if (a === 0) {
	                a = width / 2;
	            }
	            if (b === 0) {
	                b = height / 2;
	            }
	            a2 = a * a;
	            b2 = b * b;
	
	            return {
	                icentreX: icentreX,
	                icentreY: icentreY,
	                a: a,
	                b: b,
	                a2: a2,
	                b2: b2
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(x, y, parameters) {
	            var dx = x - this.data.icentreX,
	                dy = y - this.data.icentreY,
	                x2 = dx * dx,
	                y2 = dy * dy,
	                rRefraction = 1 / parameters.refractionIndex,
	                z = Math.sqrt((1 - x2 / this.data.a2 - y2 / this.data.b2) * (this.data.a * this.data.b)),
	                z2 = z * z,
	                xAngle = Math.acos(dx / Math.sqrt(x2 + z2)),
	                angle1 = Math.PI / 2 - xAngle,
	                angle2 = Math.asin(Math.sin(angle1) * rRefraction),
	                yAngle = Math.acos(dy / Math.sqrt(y2 + z2)),
	                ret = new Array(2);
	
	            if (y2 >= this.data.b2 - this.data.b2 / x2 / this.data.a2) {
	                return [x, y];
	            }
	
	            angle2 = Math.PI / 2 - xAngle - angle2;
	            ret[0] = x - Math.tan(angle2) * z;
	
	            angle1 = Math.PI / 2 - yAngle;
	            angle2 = Math.asin(Math.sin(angle1) * rRefraction);
	            angle2 = Math.PI / 2 - yAngle - angle2;
	            ret[1] = y - Math.tan(angle2) * z;
	            return ret;
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'sphere';
	        }
	    }]);
	
	    return SphereEffect;
	}(_BaseTransform2.default);
	
	exports.default = SphereEffect;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseTransform = __webpack_require__(39);
	
	var _BaseTransform2 = _interopRequireDefault(_BaseTransform);
	
	var _noise = __webpack_require__(42);
	
	var _noise2 = _interopRequireDefault(_noise);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SwimEffect = function (_BaseTransformEffect) {
	    _inherits(SwimEffect, _BaseTransformEffect);
	
	    function SwimEffect() {
	        _classCallCheck(this, SwimEffect);
	
	        return _possibleConstructorReturn(this, (SwimEffect.__proto__ || Object.getPrototypeOf(SwimEffect)).apply(this, arguments));
	    }
	
	    _createClass(SwimEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                scale: 32,
	                turbulence: 0,
	                amount: 1,
	                time: 0,
	                angle: 0,
	                stretch: 1
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height) {
	            var cos = Math.cos(parameters.angle),
	                sin = Math.sin(parameters.angle);
	
	            return {
	                m00: cos,
	                m01: sin,
	                m10: -sin,
	                m11: cos
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(x, y, parameters) {
	            var nx = this.data.m00 * x + this.data.m01 * y,
	                ny = this.data.m10 * x + this.data.m11 * y;
	
	            nx /= parameters.scale;
	            ny /= parameters.scale * parameters.stretch;
	
	            if (parameters.turbulence === 1) {
	                return [x + parameters.amount * _noise2.default.noise3(nx + 0.5, ny, parameters.time), y + parameters.amount * _noise2.default.noise3(nx, ny + 0.5, parameters.time)];
	            }
	            return [x + parameters.amount * _noise2.default.turbulence3(nx + 0.5, ny, parameters.turbulence, parameters.time), y + parameters.amount * _noise2.default.turbulence3(nx, ny + 0.5, parameters.turbulence, parameters.time)];
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'swim';
	        }
	    }]);
	
	    return SwimEffect;
	}(_BaseTransform2.default);
	
	exports.default = SwimEffect;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseTransform = __webpack_require__(39);
	
	var _BaseTransform2 = _interopRequireDefault(_BaseTransform);
	
	var _noise = __webpack_require__(42);
	
	var _noise2 = _interopRequireDefault(_noise);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TwirlEffect = function (_BaseTransformEffect) {
	    _inherits(TwirlEffect, _BaseTransformEffect);
	
	    function TwirlEffect() {
	        _classCallCheck(this, TwirlEffect);
	
	        return _possibleConstructorReturn(this, (TwirlEffect.__proto__ || Object.getPrototypeOf(TwirlEffect)).apply(this, arguments));
	    }
	
	    _createClass(TwirlEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                angle: 0,
	                centreX: 0.5,
	                centreY: 0.5,
	                radius: 100
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height) {
	            var iCentreX = width * parameters.centreX,
	                iCentreY = height * parameters.centreY,
	                radius = parameters.radius,
	                radius2;
	
	            if (radius === 0) {
	                radius = Math.min(iCentreX, iCentreY);
	            }
	            radius2 = radius * radius;
	
	            return {
	                iCentreX: iCentreX,
	                iCentreY: iCentreY,
	                radius: radius,
	                radius2: radius2
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(x, y, parameters) {
	            var dx = x - this.data.iCentreX,
	                dy = y - this.data.iCentreY,
	                distance = dx * dx + dy * dy,
	                a;
	
	            if (distance > parameters.radius2) {
	                return [x, y];
	            }
	
	            distance = Math.sqrt(distance);
	            a = Math.atan2(dy, dx) + parameters.angle * (parameters.radius - distance) / parameters.radius;
	
	            return [this.data.iCentreX + distance * Math.cos(a), this.data.iCentreY + distance * Math.sin(a)];
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'twirl';
	        }
	    }]);
	
	    return TwirlEffect;
	}(_BaseTransform2.default);
	
	exports.default = TwirlEffect;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseTransform = __webpack_require__(39);
	
	var _BaseTransform2 = _interopRequireDefault(_BaseTransform);
	
	var _noise = __webpack_require__(42);
	
	var _noise2 = _interopRequireDefault(_noise);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var WaterEffect = function (_BaseTransformEffect) {
	    _inherits(WaterEffect, _BaseTransformEffect);
	
	    function WaterEffect() {
	        _classCallCheck(this, WaterEffect);
	
	        return _possibleConstructorReturn(this, (WaterEffect.__proto__ || Object.getPrototypeOf(WaterEffect)).apply(this, arguments));
	    }
	
	    _createClass(WaterEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                waveLength: 16,
	                amplitude: 10,
	                phase: 0,
	                centreX: 0.5,
	                centreY: 0.5,
	                radius: 50
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height) {
	            var iCentreX = width * parameters.centreX,
	                iCentreY = height * parameters.centreY,
	                radius = parameters.radius,
	                radius2;
	
	            if (radius === 0) {
	                radius = Math.min(iCentreX, iCentreY);
	            }
	            radius2 = radius * radius;
	
	            return {
	                iCentreX: iCentreX,
	                iCentreY: iCentreY,
	                radius: radius,
	                radius2: radius2
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(x, y, parameters) {
	            var dx = x - this.data.iCentreX,
	                dy = y - this.data.iCentreY,
	                distance2 = dx * dx + dy * dy,
	                distance,
	                amount;
	
	            if (distance2 > this.data.radius2) {
	                return [x, y];
	            }
	            distance = Math.sqrt(distance2);
	            amount = parameters.amplitude * Math.sin(distance / parameters.waveLength * Math.PI * 2 - parameters.phase);
	            amount *= (parameters.radius - distance) / parameters.radius;
	            if (distance !== 0) {
	                amount *= parameters.waveLength / distance;
	            }
	            return [x + dx * amount, y + dy * amount];
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'water';
	        }
	    }]);
	
	    return WaterEffect;
	}(_BaseTransform2.default);
	
	exports.default = WaterEffect;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseTransform = __webpack_require__(39);
	
	var _BaseTransform2 = _interopRequireDefault(_BaseTransform);
	
	var _common = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CircleEffect = function (_BaseTransformEffect) {
	    _inherits(CircleEffect, _BaseTransformEffect);
	
	    function CircleEffect() {
	        _classCallCheck(this, CircleEffect);
	
	        return _possibleConstructorReturn(this, (CircleEffect.__proto__ || Object.getPrototypeOf(CircleEffect)).apply(this, arguments));
	    }
	
	    _createClass(CircleEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                radius: 10,
	                height: 20,
	                angle: 0,
	                spreadAngle: Math.PI,
	                centreX: 0.5,
	                centreY: 0.5
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height, imageData) {
	            return {
	                icentreX: width * parameters.centreX,
	                icentreY: height * parameters.centreY,
	                width: --width
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(x, y, parameters, width, height) {
	            var dx = x - this.data.icentreX,
	                dy = y - this.data.icentreX,
	                theta = Math.atan2(-dy, -dx) + parameters.angle,
	                r = Math.sqrt(dx * dx + dy * dy);
	
	            theta = (0, _common.mod)(theta, 2 * Math.PI);
	
	            return [this.data.width * theta / parameters.spreadAngle + 0.00001, height * (1 - (r - parameters.radius) / (height + 0.00001))];
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'circle';
	        }
	    }]);
	
	    return CircleEffect;
	}(_BaseTransform2.default);
	
	exports.default = CircleEffect;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseTransform = __webpack_require__(39);
	
	var _BaseTransform2 = _interopRequireDefault(_BaseTransform);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RotateEffect = function (_BaseTransformEffect) {
	    _inherits(RotateEffect, _BaseTransformEffect);
	
	    function RotateEffect() {
	        _classCallCheck(this, RotateEffect);
	
	        return _possibleConstructorReturn(this, (RotateEffect.__proto__ || Object.getPrototypeOf(RotateEffect)).apply(this, arguments));
	    }
	
	    _createClass(RotateEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                angle: Math.PI
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height, imageData) {
	            return {
	                cos: Math.cos(parameters.angle),
	                sin: Math.sin(parameters.angle),
	                icentreX: width / 2,
	                icentreY: height / 2
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(x, y, parameters, width, height) {
	            return [this.data.cos * (x - this.data.icentreX) - this.data.sin * (y - this.data.icentreY) + this.data.icentreY, this.data.sin * (x - this.data.icentreX) - this.data.cos * (y - this.data.icentreY) + this.data.icentreY];
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'rotate';
	        }
	    }]);
	
	    return RotateEffect;
	}(_BaseTransform2.default);
	
	exports.default = RotateEffect;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseTransform = __webpack_require__(39);
	
	var _BaseTransform2 = _interopRequireDefault(_BaseTransform);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RotateEffect = function (_BaseTransformEffect) {
	    _inherits(RotateEffect, _BaseTransformEffect);
	
	    function RotateEffect() {
	        _classCallCheck(this, RotateEffect);
	
	        return _possibleConstructorReturn(this, (RotateEffect.__proto__ || Object.getPrototypeOf(RotateEffect)).apply(this, arguments));
	    }
	
	    _createClass(RotateEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                xOffset: 100,
	                yOffset: 100,
	                wrap: true
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(x, y, parameters, width, height) {
	            if (parameters.wrap) {
	                return [(x + width - parameters.xOffset) % width, (y + height - parameters.yOffset) % height];
	            } else {
	                return [x - parameters.xOffset, y - parameters.yOffset];
	            }
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'offset';
	        }
	    }]);
	
	    return RotateEffect;
	}(_BaseTransform2.default);
	
	exports.default = RotateEffect;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseTransform = __webpack_require__(39);
	
	var _BaseTransform2 = _interopRequireDefault(_BaseTransform);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PolarEffect = function (_BaseTransformEffect) {
	    _inherits(PolarEffect, _BaseTransformEffect);
	
	    function PolarEffect() {
	        _classCallCheck(this, PolarEffect);
	
	        return _possibleConstructorReturn(this, (PolarEffect.__proto__ || Object.getPrototypeOf(PolarEffect)).apply(this, arguments));
	    }
	
	    _createClass(PolarEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                type: "RECT_TO_POLAR" // RECT_TO_POLAR, POLAR_TO_RECT, INVERT_IN_CIRCLE
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height, imageData) {
	            return {
	                centreX: width / 2,
	                centreY: height / 2,
	                radius: Math.max(width / 2, height / 2),
	                sqr: function sqr(x) {
	                    return x * x;
	                }
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(x, y, parameters, width, height) {
	            var theta,
	                theta2,
	                t,
	                m,
	                xMax,
	                yMax,
	                nx,
	                ny,
	                xmax,
	                ymax,
	                dx,
	                dy,
	                distance,
	                r = 0;
	
	            switch (parameters.type) {
	                case "RECT_TO_POLAR":
	                    if (x >= this.data.centreX) {
	                        if (y > this.data.centreY) {
	                            theta = Math.PI - Math.atan((x - this.data.centreX) / (y - this.data.centreY));
	                            r = Math.sqrt(this.data.sqr(x - this.data.centreX) + this.data.sqr(y - this.data.centreY));
	                        } else {
	                            if (y < this.data.centreY) {
	                                theta = Math.atan((x - this.data.centreX) / (this.data.centreY - y));
	                                r = Math.sqrt(this.data.sqr(x - this.data.centreX) + this.data.sqr(this.data.centreY - y));
	                            } else {
	                                theta = Math.PI / 2;
	                                r = x - this.data.centreX;
	                            }
	                        }
	                    } else {
	                        if (x < this.data.centreX) {
	                            if (y < this.data.centreY) {
	                                theta = Math.PI * 2 - Math.atan((this.data.centreX - x) / (this.data.centreY - y));
	                                r = Math.sqrt(this.data.sqr(this.data.centreX - x) + this.data.sqr(this.data.centreY - y));
	                            } else {
	                                if (y > this.data.centreY) {
	                                    theta = Math.PI + Math.atan((this.data.centreX - x) / (y - this.data.centreY));
	                                    r = Math.sqrt(this.data.sqr(this.data.centreX - x) + this.data.sqr(y - this.data.centreY));
	                                } else {
	                                    theta = 1.5 * Math.PI;
	                                    r = this.data.centreX - x;
	                                }
	                            }
	                        }
	                    }
	                    if (x != this.data.centreX) {
	                        m = Math.abs((y - this.data.centreY) / (x - this.data.centreX));
	                    } else {
	                        m = 0;
	                    }
	
	                    if (m <= height / width) {
	                        if (x == this.data.centreX) {
	                            xMax = 0;
	                            yMax = this.data.centreY;
	                        } else {
	                            xMax = this.data.centreX;
	                            yMax = m * xMax;
	                        }
	                    } else {
	                        yMax = this.data.centreY;
	                        xMax = yMax / m;
	                    }
	
	                    return [width - 1 - (width - 1) / (Math.PI * 2 * theta), height * r / this.data.radius];
	
	                case "POLAR_TO_RECT":
	
	                    theta = x / width * Math.PI * 2;
	
	                    if (theta >= 1.5 * Math.PI) {
	                        theta2 = Math.PI * 2 - theta;
	                    } else {
	                        if (theta >= Math.PI) {
	                            theta2 = theta - Math.PI;
	                        } else {
	                            if (theta >= 0.5 * Math.PI) {
	                                theta2 = Math.PI - theta;
	                            } else {
	                                theta2 = theta;
	                            }
	                        }
	                    }
	
	                    t = Math.tan(theta2);
	                    if (t != 0) {
	                        m = 1.0 / t;
	                    } else {
	                        m = 0;
	                    }
	
	                    if (m <= height / width) {
	                        if (theta2 == 0) {
	                            xmax = 0;
	                            ymax = this.data.centreY;
	                        } else {
	                            xmax = this.data.centreX;
	                            ymax = m * xmax;
	                        }
	                    } else {
	                        ymax = this.data.centreY;
	                        xmax = ymax / m;
	                    }
	
	                    r = this.data.radius * (y / height);
	
	                    nx = -r * Math.sin(theta2);
	                    ny = r * Math.cos(theta2);
	
	                    if (theta >= 1.5 * Math.PI) {
	                        return [this.data.centreX - nx, this.data.centreY - ny];
	                    } else {
	                        if (theta >= Math.PI) {
	                            return [this.data.centreX - nx, this.data.centreY + ny];
	                        } else {
	                            if (theta >= 0.5 * Math.PI) {
	                                return [this.data.centreX + nx, this.data.centreY + ny];
	                            } else {
	                                return [this.data.centreX + nx, this.data.centreY - ny];
	                            }
	                        }
	                    }
	                    break;
	
	                case "INVERT_IN_CIRCLE":
	                    dx = x - this.data.centreX;
	                    dy = y - this.data.centreY;
	                    distance = dx * dx + dy * dy;
	
	                    return [this.data.centreX + this.data.centreX * this.data.centreX * dx / distance, this.data.centreY + this.data.centreY * this.data.centreY * dy / distance];
	            }
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'polar';
	        }
	    }]);
	
	    return PolarEffect;
	}(_BaseTransform2.default);
	
	exports.default = PolarEffect;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseTransform = __webpack_require__(39);
	
	var _BaseTransform2 = _interopRequireDefault(_BaseTransform);
	
	var _noise = __webpack_require__(42);
	
	var _noise2 = _interopRequireDefault(_noise);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PerspectiveEffect = function (_BaseTransformEffect) {
	    _inherits(PerspectiveEffect, _BaseTransformEffect);
	
	    function PerspectiveEffect() {
	        _classCallCheck(this, PerspectiveEffect);
	
	        return _possibleConstructorReturn(this, (PerspectiveEffect.__proto__ || Object.getPrototypeOf(PerspectiveEffect)).apply(this, arguments));
	    }
	
	    _createClass(PerspectiveEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                x0: 0,
	                y0: 0,
	                x1: 1,
	                y1: 0,
	                x2: 1,
	                y2: 1,
	                x3: 0,
	                y3: 1
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height, imageData) {
	            function unitSquareToQuad() {
	                var result = {},
	                    x0 = Math.floor(width * parameters.x0),
	                    y0 = Math.floor(height * parameters.y0),
	                    x1 = Math.floor(width * parameters.x1),
	                    y1 = Math.floor(height * parameters.y1),
	                    x2 = Math.floor(width * parameters.x2),
	                    y2 = Math.floor(height * parameters.y2),
	                    x3 = Math.floor(width * parameters.x3),
	                    y3 = Math.floor(height * parameters.y3),
	                    dx1 = x1 - x2,
	                    dy1 = y1 - y2,
	                    dx2 = x3 - x2,
	                    dy2 = y3 - y2,
	                    dx3 = x0 - x1 + x2 - x3,
	                    dy3 = y0 - y1 + y2 - y3;
	
	                if (dx3 == 0 && dy3 == 0) {
	                    result.a11 = x1 - x0;
	                    result.a21 = x2 - x1;
	                    result.a31 = x0;
	                    result.a12 = y1 - y0;
	                    result.a22 = y2 - y1;
	                    result.a32 = y0;
	                    result.a13 = result.a23 = 0;
	                } else {
	                    result.a13 = (dx3 * dy2 - dx2 * dy3) / (dx1 * dy2 - dy1 * dx2);
	                    result.a23 = (dx1 * dy3 - dy1 * dx3) / (dx1 * dy2 - dy1 * dx2);
	                    result.a11 = x1 - x0 + result.a13 * x1;
	                    result.a21 = x3 - x0 + result.a23 * x3;
	                    result.a31 = x0;
	                    result.a12 = y1 - y0 + result.a13 * y1;
	                    result.a22 = y3 - y0 + result.a23 * y3;
	                    result.a32 = y0;
	                }
	
	                result.a33 = 1;
	
	                return result;
	            }
	
	            var result = unitSquareToQuad();
	
	            result.A = result.a22 * result.a33 - result.a32 * result.a23;
	            result.B = result.a31 * result.a23 - result.a21 * result.a33;
	            result.C = result.a21 * result.a32 - result.a31 * result.a22;
	            result.D = result.a32 * result.a13 - result.a12 * result.a33;
	            result.E = result.a11 * result.a33 - result.a31 * result.a13;
	            result.F = result.a31 * result.a12 - result.a11 * result.a32;
	            result.G = result.a12 * result.a23 - result.a22 * result.a13;
	            result.H = result.a21 * result.a13 - result.a11 * result.a23;
	            result.I = result.a11 * result.a22 - result.a21 * result.a12;
	
	            return result;
	        }
	    }, {
	        key: 'callback',
	        value: function callback(x, y, parameters, width, height) {
	            return [width * (this.data.A * x + this.data.B * y + this.data.C) / (this.data.G * x + this.data.H * y + this.data.I), height * (this.data.D * x + this.data.E * y + this.data.F) / (this.data.G * x + this.data.H * y + this.data.I)];
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'perspective';
	        }
	    }]);
	
	    return PerspectiveEffect;
	}(_BaseTransform2.default);
	
	exports.default = PerspectiveEffect;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseCustom = __webpack_require__(56);
	
	var _BaseCustom2 = _interopRequireDefault(_BaseCustom);
	
	var _color = __webpack_require__(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AutoWhiteBalanceEffect = function (_BaseCustomEffect) {
	    _inherits(AutoWhiteBalanceEffect, _BaseCustomEffect);
	
	    function AutoWhiteBalanceEffect() {
	        _classCallCheck(this, AutoWhiteBalanceEffect);
	
	        return _possibleConstructorReturn(this, (AutoWhiteBalanceEffect.__proto__ || Object.getPrototypeOf(AutoWhiteBalanceEffect)).apply(this, arguments));
	    }
	
	    _createClass(AutoWhiteBalanceEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                intensity: 50
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(width, height, parameters) {
	            var x,
	                y,
	                sumA = 0,
	                sumB = 0,
	                pixel,
	                lab,
	                avgSumA,
	                avgSumB,
	                aDelta,
	                bDelta;
	
	            for (y = 0; y < height; y += 1) {
	                for (x = 0; x < width; x += 1) {
	                    pixel = this.getPixel(x, y);
	                    lab = (0, _color.RGBtoCIELab)(pixel.r, pixel.g, pixel.b);
	                    sumA += lab.a;
	                    sumB += lab.b;
	                }
	            }
	
	            avgSumA = 0 - sumA / (width * height);
	            avgSumB = 0 - sumB / (width * height);
	
	            aDelta = avgSumA * (parameters.intensity / 100) * 1.1;
	            bDelta = avgSumB * (parameters.intensity / 100) * 1.1;
	
	            for (y = 0; y < height; y += 1) {
	                for (x = 0; x < width; x += 1) {
	                    pixel = this.getPixel(x, y);
	
	                    lab = (0, _color.RGBtoCIELab)(pixel.r, pixel.g, pixel.b);
	
	                    lab.a += aDelta;
	                    lab.b += bDelta;
	
	                    pixel = (0, _color.CIELabToRGB)(lab.l, lab.a, lab.b);
	                    pixel.a = this.getPixel(x, y).a;
	
	                    this.setPixel(x, y, pixel);
	                }
	            }
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'auto-white-balance';
	        }
	    }]);
	
	    return AutoWhiteBalanceEffect;
	}(_BaseCustom2.default);
	
	exports.default = AutoWhiteBalanceEffect;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Base = __webpack_require__(15);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	var _extend = __webpack_require__(16);
	
	var _extend2 = _interopRequireDefault(_extend);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BaseCustomEffect = function (_BaseEffect) {
	    _inherits(BaseCustomEffect, _BaseEffect);
	
	    function BaseCustomEffect() {
	        _classCallCheck(this, BaseCustomEffect);
	
	        return _possibleConstructorReturn(this, (BaseCustomEffect.__proto__ || Object.getPrototypeOf(BaseCustomEffect)).apply(this, arguments));
	    }
	
	    _createClass(BaseCustomEffect, [{
	        key: 'callback',
	        value: function callback(pixel, x, y, parameters, width, height) {
	            throw "Extend it.";
	        }
	    }, {
	        key: 'run',
	        value: function run(imageData, parameters) {
	
	            parameters = (0, _extend2.default)(true, {}, this.getDefaultParameters(), parameters);
	
	            var imageDataCopy = new Uint8ClampedArray(imageData.data),
	                // copy image data
	            /**
	             * Get ImageData array index from x and y position
	             * @param x
	             * @param y
	             * @returns {number}
	             */
	            getIndex = function getIndex(x, y) {
	                return y * imageData.width * 4 + x * 4;
	            },
	                normalizePixelValue = function normalizePixelValue(value) {
	                return Math.min(Math.max(value, 0), 255) | 0;
	            },
	                sandbox = { // object invoked as this in effect callback
	                /**
	                 * Get changed pixel
	                 * @param {int} x
	                 * @param {int} y
	                 * @returns {{r: *, g: *, b: *, a: *}}
	                 */
	                getPixel: function getPixel(x, y) {
	                    var index = getIndex(x, y);
	                    return {
	                        r: imageDataCopy[index + 0],
	                        g: imageDataCopy[index + 1],
	                        b: imageDataCopy[index + 2],
	                        a: imageDataCopy[index + 3]
	                    };
	                },
	                /**
	                 * Get pixel by its index
	                 * @param index
	                 */
	                getOriginalPixelByIndex: function getOriginalPixelByIndex(index) {
	                    index *= 4;
	                    return {
	                        r: imageData.data[index],
	                        g: imageData.data[index + 1],
	                        b: imageData.data[index + 2],
	                        a: imageData.data[index + 3]
	                    };
	                },
	                /**
	                 * Get original pixel.
	                 * @param {int} x
	                 * @param {int} y
	                 * @returns {{r: *, g: *, b: *, a: *}}
	                 */
	                getOriginalPixel: function getOriginalPixel(x, y) {
	                    var index = getIndex(x, y);
	                    return {
	                        r: imageData.data[index + 0],
	                        g: imageData.data[index + 1],
	                        b: imageData.data[index + 2],
	                        a: imageData.data[index + 3]
	                    };
	                },
	                /**
	                 * Set new pixel
	                 * @param {int} x
	                 * @param {int} y
	                 * @param {object} rgba
	                 */
	                setPixel: function setPixel(x, y, rgba) {
	                    var index = getIndex(x, y);
	                    imageDataCopy[index + 0] = normalizePixelValue(rgba.r);
	                    imageDataCopy[index + 1] = normalizePixelValue(rgba.g);
	                    imageDataCopy[index + 2] = normalizePixelValue(rgba.b);
	                    imageDataCopy[index + 3] = normalizePixelValue(rgba.a);
	                },
	                /**
	                 * Set pixel by index.
	                 * @param index
	                 * @param rgba
	                 */
	                setPixelByIndex: function setPixelByIndex(index, rgba) {
	                    index *= 4;
	                    imageDataCopy[index + 0] = normalizePixelValue(rgba.r);
	                    imageDataCopy[index + 1] = normalizePixelValue(rgba.g);
	                    imageDataCopy[index + 2] = normalizePixelValue(rgba.b);
	                    imageDataCopy[index + 3] = normalizePixelValue(rgba.a);
	                },
	                /**
	                 * Data created by effect init function
	                 */
	                data: null,
	                /**
	                 * ImageData width
	                 */
	                width: imageData.width,
	                /**
	                 * ImageData height
	                 */
	                height: imageData.height
	            };
	
	            sandbox.data = this.before.call(sandbox, parameters, imageData.width, imageData.height, imageData);
	
	            this.callback.call(sandbox, imageData.width, imageData.height, parameters);
	
	            imageData.data.set(imageDataCopy);
	
	            return imageData;
	        }
	    }]);
	
	    return BaseCustomEffect;
	}(_Base2.default);
	
	exports.default = BaseCustomEffect;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseCustom = __webpack_require__(56);
	
	var _BaseCustom2 = _interopRequireDefault(_BaseCustom);
	
	var _color = __webpack_require__(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var FillColorEffect = function (_BaseCustomEffect) {
	    _inherits(FillColorEffect, _BaseCustomEffect);
	
	    function FillColorEffect() {
	        _classCallCheck(this, FillColorEffect);
	
	        return _possibleConstructorReturn(this, (FillColorEffect.__proto__ || Object.getPrototypeOf(FillColorEffect)).apply(this, arguments));
	    }
	
	    _createClass(FillColorEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                color: "transparent"
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(width, height, parameters) {
	            var x, y, color;
	
	            if (parameters.color === "transparent") {
	                color = {
	                    r: 0,
	                    g: 0,
	                    b: 0,
	                    a: 0
	                };
	            } else {
	                color = (0, _color.hexToRGB)(parameters.color);
	                color.a = 255;
	            }
	
	            for (y = 0; y < height; y += 1) {
	                for (x = 0; x < width; x += 1) {
	                    this.setPixel(x, y, color);
	                }
	            }
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'fill-color';
	        }
	    }]);
	
	    return FillColorEffect;
	}(_BaseCustom2.default);
	
	exports.default = FillColorEffect;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseCustom = __webpack_require__(56);
	
	var _BaseCustom2 = _interopRequireDefault(_BaseCustom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var FlipEffect = function (_BaseCustomEffect) {
	    _inherits(FlipEffect, _BaseCustomEffect);
	
	    function FlipEffect() {
	        _classCallCheck(this, FlipEffect);
	
	        return _possibleConstructorReturn(this, (FlipEffect.__proto__ || Object.getPrototypeOf(FlipEffect)).apply(this, arguments));
	    }
	
	    _createClass(FlipEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                operation: "FLIP_H" // FLIP_H, FLIP_V, FLIP_HV, FLIP_90CW, FLIP_90CCW, FLIP_180
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(width, height, parameters) {
	            var x = 0,
	                y = 0,
	                w = width,
	                h = height,
	                newX = 0,
	                newY = 0,
	                newW = w,
	                newH = h,
	                newRow,
	                newCol;
	
	            switch (parameters.operation) {
	                case "FLIP_H":
	                    newX = width - (x + w);
	                    break;
	                case "FLIP_V":
	                    newY = height - (y + h);
	                    break;
	                case "FLIP_HV":
	                    newW = h;
	                    newH = w;
	                    newX = y;
	                    newY = x;
	                    break;
	                case "FLIP_90CW":
	                    newW = h;
	                    newH = w;
	                    newX = height - (y + h);
	                    newY = x;
	                    break;
	                case "FLIP_90CCW":
	                    newW = h;
	                    newH = w;
	                    newX = y;
	                    newY = width - (x + w);
	                    break;
	                case "FLIP_180":
	                    newX = width - (x + w);
	                    newY = height - (y + h);
	                    break;
	            }
	
	            for (y = 0; y < height; y += 1) {
	                for (x = 0; x < width; x += 1) {
	                    newRow = y;
	                    newCol = x;
	
	                    switch (parameters.operation) {
	                        case "FLIP_H":
	                            newCol = w - x - 1;
	                            break;
	                        case "FLIP_V":
	                            newRow = h - y - 1;
	                            break;
	                        case "FLIP_HV":
	                            newRow = x;
	                            newCol = y;
	                            break;
	                        case "FLIP_90CW":
	                            newRow = x;
	                            newCol = h - y - 1;
	                            break;
	                        case "FLIP_90CCW":
	                            newRow = w - x - 1;
	                            newCol = y;
	                            break;
	                        case "FLIP_180":
	                            newRow = h - y - 1;
	                            newCol = w - x - 1;
	                            break;
	                    }
	
	                    this.setPixel(newCol, newRow, this.getOriginalPixel(x, y));
	                }
	            }
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'flip';
	        }
	    }]);
	
	    return FlipEffect;
	}(_BaseCustom2.default);
	
	exports.default = FlipEffect;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseCustom = __webpack_require__(56);
	
	var _BaseCustom2 = _interopRequireDefault(_BaseCustom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BlockEffect = function (_BaseCustomEffect) {
	    _inherits(BlockEffect, _BaseCustomEffect);
	
	    function BlockEffect() {
	        _classCallCheck(this, BlockEffect);
	
	        return _possibleConstructorReturn(this, (BlockEffect.__proto__ || Object.getPrototypeOf(BlockEffect)).apply(this, arguments));
	    }
	
	    _createClass(BlockEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                blockSize: 5
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(width, height, parameters) {
	            var x, y, w, h, t, r, g, b, pixel, by, bx;
	
	            for (y = 0; y < height; y += parameters.blockSize) {
	                for (x = 0; x < width; x += parameters.blockSize) {
	                    w = Math.min(parameters.blockSize, width - x);
	                    h = Math.min(parameters.blockSize, height - y);
	                    t = w * h;
	
	                    r = 0;
	                    g = 0;
	                    b = 0;
	
	                    for (by = 0; by < h; by += 1) {
	                        for (bx = 0; bx < w; bx += 1) {
	                            pixel = this.getOriginalPixel(x + bx, y + by);
	
	                            r += pixel.r & 0xFF;
	                            g += pixel.g & 0XFF;
	                            b += pixel.b & 0xFF;
	                        }
	                    }
	
	                    r = r / t;
	                    g = g / t;
	                    b = b / t;
	
	                    for (by = 0; by < h; by += 1) {
	                        for (bx = 0; bx < w; bx += 1) {
	                            this.setPixel(x + bx, y + by, {
	                                r: r,
	                                g: g,
	                                b: b,
	                                a: 255
	                            });
	                        }
	                    }
	                }
	            }
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'block';
	        }
	    }]);
	
	    return BlockEffect;
	}(_BaseCustom2.default);
	
	exports.default = BlockEffect;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseCustom = __webpack_require__(56);
	
	var _BaseCustom2 = _interopRequireDefault(_BaseCustom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BorderEffect = function (_BaseCustomEffect) {
	    _inherits(BorderEffect, _BaseCustomEffect);
	
	    function BorderEffect() {
	        _classCallCheck(this, BorderEffect);
	
	        return _possibleConstructorReturn(this, (BorderEffect.__proto__ || Object.getPrototypeOf(BorderEffect)).apply(this, arguments));
	    }
	
	    _createClass(BorderEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                leftBorder: 10,
	                rightBorder: 10,
	                topBorder: 10,
	                bottomBorder: 10,
	                borderColor: {
	                    r: 0,
	                    b: 0,
	                    g: 0,
	                    a: 255
	                }
	            };
	        }
	    }, {
	        key: 'before',
	        value: function before(parameters, width, height, imageData) {
	            return {
	                leftBorder: parameters.leftBorder | 0,
	                rightBorder: parameters.rightBorder | 0,
	                topBorder: parameters.rightBorder | 0,
	                bottomBorder: parameters.bottomBorder | 0
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(width, height, parameters) {
	            var x, y;
	
	            for (y = 0; y < height; y += 1) {
	                for (x = 0; x < width; x += 1) {
	                    if (this.data.leftBorder > 0 && x < this.data.leftBorder) {
	                        this.setPixel(x, y, parameters.borderColor);
	                    }
	                    if (this.data.rightBorder > 0 && width - this.data.rightBorder < x) {
	                        this.setPixel(x, y, parameters.borderColor);
	                    }
	                    if (this.data.topBorder > 0 && y < this.data.topBorder) {
	                        this.setPixel(x, y, parameters.borderColor);
	                    }
	                    if (this.data.bottomBorder > 0 && height - this.data.bottomBorder < y) {
	                        this.setPixel(x, y, parameters.borderColor);
	                    }
	                }
	            }
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'border';
	        }
	    }]);
	
	    return BorderEffect;
	}(_BaseCustom2.default);
	
	exports.default = BorderEffect;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseCustom = __webpack_require__(56);
	
	var _BaseCustom2 = _interopRequireDefault(_BaseCustom);
	
	var _common = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var EmbossEffect = function (_BaseCustomEffect) {
	    _inherits(EmbossEffect, _BaseCustomEffect);
	
	    function EmbossEffect() {
	        _classCallCheck(this, EmbossEffect);
	
	        return _possibleConstructorReturn(this, (EmbossEffect.__proto__ || Object.getPrototypeOf(EmbossEffect)).apply(this, arguments));
	    }
	
	    _createClass(EmbossEffect, [{
	        key: 'getDefaultParameters',
	        value: function getDefaultParameters() {
	            return {
	                azimuth: 135 * Math.PI / 180,
	                elevation: 30 * Math.PI / 180,
	                width45: 3,
	                emboss: true
	            };
	        }
	    }, {
	        key: 'callback',
	        value: function callback(width, height, parameters) {
	            var x,
	                y,
	                bumpMapWidth = width,
	                bumpPixels = [],
	                Nx,
	                Ny,
	                Nz,
	                Lx,
	                Ly,
	                Lz,
	                Nz2,
	                NzLz,
	                NdotL,
	                s1,
	                s2,
	                s3,
	                shade,
	                background,
	                pixelScale = 255.9,
	                bumpIndex = 0,
	                index = 0,
	                pixel,
	                r,
	                g,
	                b;
	
	            Lx = Math.cos(parameters.azimuth) * Math.cos(parameters.elevation) * pixelScale | 0;
	            Ly = Math.sin(parameters.azimuth) * Math.cos(parameters.elevation) * pixelScale | 0;
	            Lz = Math.sin(parameters.elevation) * pixelScale | 0;
	
	            Nz = 6 * 255 / parameters.width45 | 0;
	            Nz2 = Nz * Nz;
	            NzLz = Nz * Lz;
	
	            background = Lz;
	
	            for (y = 0; y < height; y += 1) {
	                for (x = 0; x < width; x += 1) {
	                    bumpPixels.push((0, _common.brightness)(this.getOriginalPixel(x, y)) | 0);
	                }
	            }
	
	            for (y = 0; y < height; y += 1, bumpIndex += bumpMapWidth) {
	                s1 = bumpIndex;
	                s2 = s1 + bumpMapWidth;
	                s3 = s2 + bumpMapWidth;
	
	                for (x = 0; x < width; x += 1, s1 += 1, s2 += 1, s3 += 1) {
	                    if (y != 0 && y < height - 2 && x != 0 && x < width - 2) {
	                        Nx = bumpPixels[s1 - 1] + bumpPixels[s2 - 1] + bumpPixels[s3 - 1] - bumpPixels[s1 + 1] - bumpPixels[s2 + 1] - bumpPixels[s3 + 1];
	                        Ny = bumpPixels[s3 - 1] + bumpPixels[s3] + bumpPixels[s3 + 1] - bumpPixels[s1 - 1] - bumpPixels[s1] - bumpPixels[s1 + 1];
	
	                        if (Nx == 0 && Ny == 0) {
	                            shade = background;
	                        } else {
	                            if ((NdotL = Nx * Lx + Ny * Ly + NzLz) < 0) {
	                                shade = 0;
	                            } else {
	                                shade = NdotL / Math.sqrt(Nx * Nx + Ny * Ny + Nz2);
	                            }
	                        }
	                    } else {
	                        shade = background;
	                    }
	
	                    if (parameters.emboss) {
	                        pixel = this.getOriginalPixelByIndex(index);
	                        r = pixel.r * shade >> 8;
	                        g = pixel.g * shade >> 8;
	                        b = pixel.b * shade >> 8;
	                        this.setPixelByIndex(index++, {
	                            r: r,
	                            g: g,
	                            b: b,
	                            a: pixel.a
	                        });
	                    } else {
	                        this.setPixelByIndex(index++, {
	                            r: shade,
	                            g: shade << 8,
	                            b: shade << 16,
	                            a: 255
	                        });
	                    }
	                }
	            }
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'emboss';
	        }
	    }]);
	
	    return EmbossEffect;
	}(_BaseCustom2.default);
	
	exports.default = EmbossEffect;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseCustom = __webpack_require__(56);
	
	var _BaseCustom2 = _interopRequireDefault(_BaseCustom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ComponentStretchingEffect = function (_BaseCustomEffect) {
	    _inherits(ComponentStretchingEffect, _BaseCustomEffect);
	
	    function ComponentStretchingEffect() {
	        _classCallCheck(this, ComponentStretchingEffect);
	
	        return _possibleConstructorReturn(this, (ComponentStretchingEffect.__proto__ || Object.getPrototypeOf(ComponentStretchingEffect)).apply(this, arguments));
	    }
	
	    _createClass(ComponentStretchingEffect, [{
	        key: 'callback',
	        value: function callback(width, height, parameters) {
	            var x,
	                y,
	                minR = Infinity,
	                minG = Infinity,
	                minB = Infinity,
	                maxR = -1,
	                maxG = -1,
	                maxB = -1,
	                pixel,
	                remap = function remap(value, min, max) {
	                return (value - min) * 255 / (max - min);
	            };
	
	            for (y = 0; y < height; y += 1) {
	                for (x = 0; x < width; x += 1) {
	                    pixel = this.getPixel(x, y);
	
	                    minR = Math.min(pixel.r, minR);
	                    minG = Math.min(pixel.g, minG);
	                    minB = Math.min(pixel.b, minB);
	
	                    maxR = Math.max(pixel.r, maxR);
	                    maxG = Math.max(pixel.g, maxG);
	                    maxB = Math.max(pixel.b, maxB);
	                }
	            }
	
	            for (y = 0; y < height; y += 1) {
	                for (x = 0; x < width; x += 1) {
	                    pixel = this.getPixel(x, y);
	
	                    pixel.r = remap(pixel.r, minR, maxR);
	                    pixel.g = remap(pixel.g, minG, maxG);
	                    pixel.b = remap(pixel.b, minB, maxB);
	
	                    this.setPixel(x, y, pixel);
	                }
	            }
	        }
	    }], [{
	        key: 'getName',
	        value: function getName() {
	            return 'component-stretching';
	        }
	    }]);
	
	    return ComponentStretchingEffect;
	}(_BaseCustom2.default);
	
	exports.default = ComponentStretchingEffect;

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_63__;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseOnLayer = __webpack_require__(65);
	
	var _BaseOnLayer2 = _interopRequireDefault(_BaseOnLayer);
	
	var _CanvasWrapper = __webpack_require__(7);
	
	var _CanvasWrapper2 = _interopRequireDefault(_CanvasWrapper);
	
	var _common = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Image = function (_BaseOnLayerObject) {
	    _inherits(Image, _BaseOnLayerObject);
	
	    function Image() {
	        _classCallCheck(this, Image);
	
	        var _this = _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this));
	
	        _this.url = null;
	
	        if ((0, _common.isNode)()) {
	            var canvas = __webpack_require__(9);
	            _this.image = new canvas.Image();
	        } else {
	            _this.image = new window.Image();
	
	            // hide from viewport
	            _this.image.style.position = "absolute";
	            _this.image.style.left = "-99999px";
	            _this.image.style.top = "-99999px";
	        }
	        return _this;
	    }
	
	    _createClass(Image, [{
	        key: 'load',
	        value: function load(url, callback) {
	            var _this2 = this;
	
	            var load = function load() {
	                _this2.setWidth((0, _common.isNode)() ? _this2.image.width : _this2.image.clientWidth);
	                _this2.setHeight((0, _common.isNode)() ? _this2.image.height : _this2.image.clientHeight);
	
	                // get image data
	                _this2.canvas = new _CanvasWrapper2.default(_this2.getWidth(), _this2.getHeight());
	                _this2.canvas.getContext().drawImage(_this2.image, 0, 0, _this2.getWidth(), _this2.getHeight());
	
	                if (!(0, _common.isNode)()) {
	                    document.body.removeChild(_this2.image);
	                }
	
	                if (typeof callback === "function") {
	                    callback.call(_this2);
	                }
	            };
	
	            this.url = url;
	
	            if (!(0, _common.isNode)()) {
	                document.body.appendChild(this.image);
	                this.image.onload = function () {
	                    load();
	                };
	                this.image.src = url;
	            } else {
	                var fs = __webpack_require__(63);
	                this.image.src = fs.readFileSync(url);
	                load();
	            }
	        }
	    }]);
	
	    return Image;
	}(_BaseOnLayer2.default);
	
	exports.default = Image;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _CanvasWrapper = __webpack_require__(7);
	
	var _CanvasWrapper2 = _interopRequireDefault(_CanvasWrapper);
	
	var _resize = __webpack_require__(66);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BaseOnLayerObject = function () {
	    function BaseOnLayerObject() {
	        _classCallCheck(this, BaseOnLayerObject);
	
	        this.imageData = null;
	        this.canvas = null;
	        this.width = 0;
	        this.height = 0;
	    }
	
	    _createClass(BaseOnLayerObject, [{
	        key: 'getWidth',
	        value: function getWidth() {
	            return this.width;
	        }
	    }, {
	        key: 'getHeight',
	        value: function getHeight() {
	            return this.height;
	        }
	    }, {
	        key: 'setWidth',
	        value: function setWidth(value) {
	            this.width = value;
	            return this;
	        }
	    }, {
	        key: 'setHeight',
	        value: function setHeight(value) {
	            this.height = value;
	            return this;
	        }
	    }, {
	        key: 'getImageData',
	        value: function getImageData() {
	            if (!this.imageData) {
	                this.imageData = this.canvas.getContext().getImageData(0, 0, this.getWidth(), this.getHeight());
	            }
	            return this.imageData;
	        }
	    }, {
	        key: 'setImageData',
	        value: function setImageData(value) {
	            this.imageData = value;
	            return this;
	        }
	    }, {
	        key: 'resize',
	        value: function resize(newWidth, newHeight) {
	            var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'nearest-neighbour';
	
	            var oldImageData = this.getImageData(),
	                canvas = new _CanvasWrapper2.default(newWidth, newHeight),
	                newImageData = canvas.getContext().createImageData(newWidth, newHeight);
	
	            switch (mode) {
	                case "nearest-neighbour":
	                    newImageData = (0, _resize.resizeNearestNeighbour)(oldImageData, newImageData, newWidth, newHeight);
	                    break;
	
	                case "bilinear-interpolation":
	                    newImageData = (0, _resize.resizeBilinearInterpolation)(oldImageData, newImageData, newWidth, newHeight);
	                    break;
	
	                case "biquadratic-interpolation":
	                    newImageData = (0, _resize.resizeBiquadraticInterpolation)(oldImageData, newImageData, newWidth, newHeight);
	                    break;
	
	                default:
	                    canvas.destroy();
	                    return this;
	            }
	
	            canvas.destroy();
	
	            return this.setWidth(newWidth).setHeight(newHeight).setImageData(newImageData);
	        }
	    }]);
	
	    return BaseOnLayerObject;
	}();
	
	exports.default = BaseOnLayerObject;

/***/ },
/* 66 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.resizeNearestNeighbour = resizeNearestNeighbour;
	exports.resizeBilinearInterpolation = resizeBilinearInterpolation;
	exports.resizeBiquadraticInterpolation = resizeBiquadraticInterpolation;
	function resizeNearestNeighbour(oldImageData, newImageData, newWidth, newHeight) {
	    var oldWidth = oldImageData.width,
	        oldHeight = oldImageData.height,
	        ratioX = oldWidth / newWidth,
	        ratioY = oldHeight / newHeight,
	        oldPixelIndex = void 0,
	        newPixelIndex = void 0,
	        x = void 0,
	        y = void 0;
	
	    for (y = 0; y < newHeight; y += 1) {
	        for (x = 0; x < newWidth; x += 1) {
	            oldPixelIndex = Math.floor(y * ratioY) * oldWidth * 4 + Math.floor(x * ratioX) * 4;
	            newPixelIndex = y * newWidth * 4 + x * 4;
	
	            newImageData.data[newPixelIndex + 0] = oldImageData.data[oldPixelIndex + 0];
	            newImageData.data[newPixelIndex + 1] = oldImageData.data[oldPixelIndex + 1];
	            newImageData.data[newPixelIndex + 2] = oldImageData.data[oldPixelIndex + 2];
	            newImageData.data[newPixelIndex + 3] = oldImageData.data[oldPixelIndex + 3];
	        }
	    }
	
	    return newImageData;
	}
	
	function resizeBilinearInterpolation(oldImageData, newImageData, newWidth, newHeight) {
	    var oldWidth = oldImageData.width,
	        oldHeight = oldImageData.height,
	        ratioX = oldWidth / newWidth,
	        ratioY = oldHeight / newHeight,
	        newPixelIndex = void 0,
	        x = void 0,
	        y = void 0,
	        x0 = void 0,
	        y0 = void 0,
	        dx = void 0,
	        dy = void 0,
	        x1 = void 0,
	        y1 = void 0,
	        oldPixelIndex00 = void 0,
	        oldPixelIndex01 = void 0,
	        oldPixelIndex10 = void 0,
	        oldPixelIndex11 = void 0,
	        i = void 0,
	        j = void 0;
	
	    for (i = 0; i < newHeight; i += 1) {
	        for (j = 0; j < newWidth; j += 1) {
	            x = j * ratioX;
	            y = i * ratioY;
	            x0 = Math.floor(x);
	            y0 = Math.floor(y);
	            dx = x - x0;
	            dy = y - y0;
	            x1 = x0 + 1;
	            y1 = y0 + 1;
	
	            if (x1 >= oldWidth) {
	                x1 = x0;
	            }
	            if (y1 >= oldHeight) {
	                y1 = y0;
	            }
	
	            oldPixelIndex00 = (y0 * oldWidth + x0) * 4;
	            oldPixelIndex01 = (y0 * oldWidth + x1) * 4;
	            oldPixelIndex10 = (y1 * oldWidth + x0) * 4;
	            oldPixelIndex11 = (y1 * oldWidth + x1) * 4;
	            newPixelIndex = (i * newWidth + j) * 4;
	
	            newImageData.data[newPixelIndex] = (1.0 - dy) * ((1.0 - dx) * oldImageData.data[oldPixelIndex00] + dx * oldImageData.data[oldPixelIndex01]) + dy * ((1.0 - dx) * oldImageData.data[oldPixelIndex10] + dx * oldImageData.data[oldPixelIndex11]);
	            newImageData.data[newPixelIndex + 1] = (1.0 - dy) * ((1.0 - dx) * oldImageData.data[oldPixelIndex00 + 1] + dx * oldImageData.data[oldPixelIndex01 + 1]) + dy * ((1.0 - dx) * oldImageData.data[oldPixelIndex10 + 1] + dx * oldImageData.data[oldPixelIndex11 + 1]);
	            newImageData.data[newPixelIndex + 2] = (1.0 - dy) * ((1.0 - dx) * oldImageData.data[oldPixelIndex00 + 2] + dx * oldImageData.data[oldPixelIndex01 + 2]) + dy * ((1.0 - dx) * oldImageData.data[oldPixelIndex10 + 2] + dx * oldImageData.data[oldPixelIndex11 + 2]);
	            newImageData.data[newPixelIndex + 3] = (1.0 - dy) * ((1.0 - dx) * oldImageData.data[oldPixelIndex00 + 3] + dx * oldImageData.data[oldPixelIndex01 + 3]) + dy * ((1.0 - dx) * oldImageData.data[oldPixelIndex10 + 3] + dx * oldImageData.data[oldPixelIndex11 + 3]);
	        }
	    }
	
	    return newImageData;
	}
	
	function resizeBiquadraticInterpolation(oldImageData, newImageData, newWidth, newHeight) {
	    var interpolate = function interpolate(f1, f2, f3, d) {
	        return f2 + (f3 - f1) * d + (f1 - 2 * f2 + f3) * d * d;
	    },
	        interpolateNormalize = function interpolateNormalize(f1, f2, f3, d) {
	        var result = interpolate(f1, f2, f3, d);
	        if (result > 255) {
	            return 255;
	        }
	        if (result < 0) {
	            return 0;
	        }
	        return Math.floor(result);
	    },
	        oldWidth = oldImageData.width,
	        oldHeight = oldImageData.height,
	        ratioX = oldWidth / newWidth,
	        ratioY = oldHeight / newHeight,
	        x = void 0,
	        y = void 0,
	        x0 = void 0,
	        y0 = void 0,
	        x1 = void 0,
	        y1 = void 0,
	        x2 = void 0,
	        y2 = void 0,
	        dx = void 0,
	        dy = void 0,
	        oldPixelIndex00 = void 0,
	        oldPixelIndex01 = void 0,
	        oldPixelIndex02 = void 0,
	        oldPixelIndex10 = void 0,
	        oldPixelIndex11 = void 0,
	        oldPixelIndex12 = void 0,
	        oldPixelIndex20 = void 0,
	        oldPixelIndex21 = void 0,
	        oldPixelIndex22 = void 0,
	        newPixelIndex = void 0,
	        i = void 0,
	        j = void 0;
	
	    for (i = 0; i < newHeight; i += 1) {
	        for (j = 0; j < newWidth; j += 1) {
	            x = j * ratioX;
	            y = i * ratioY;
	
	            x1 = Math.floor(x);
	            y1 = Math.floor(y);
	            dx = (x - x1) * 0.5;
	            dy = (y - y1) * 0.5;
	
	            if (x1 - 1 >= 0) {
	                x0 = x1 - 1;
	            } else {
	                x0 = x1;
	            }
	
	            if (y1 - 1 >= 0) {
	                y0 = y1 - 1;
	            } else {
	                y0 = y1;
	            }
	
	            if (x1 + 1 >= oldWidth) {
	                x2 = x1;
	            } else {
	                x2 = x1 + 1;
	            }
	
	            if (y1 + 1 >= oldWidth) {
	                y2 = y1;
	            } else {
	                y2 = y1 + 1;
	            }
	
	            oldPixelIndex00 = (y0 * oldWidth + x0) * 4;
	            oldPixelIndex01 = (y0 * oldWidth + x1) * 4;
	            oldPixelIndex02 = (y0 * oldWidth + x2) * 4;
	            oldPixelIndex10 = (y1 * oldWidth + x0) * 4;
	            oldPixelIndex11 = (y1 * oldWidth + x1) * 4;
	            oldPixelIndex12 = (y1 * oldWidth + x2) * 4;
	            oldPixelIndex20 = (y2 * oldWidth + x0) * 4;
	            oldPixelIndex21 = (y2 * oldWidth + x1) * 4;
	            oldPixelIndex22 = (y2 * oldWidth + x2) * 4;
	
	            newPixelIndex = (i * newWidth + j) * 4;
	
	            newImageData.data[newPixelIndex] = interpolateNormalize(interpolate(oldImageData.data[oldPixelIndex00], oldImageData.data[oldPixelIndex01], oldImageData.data[oldPixelIndex02], dx), interpolate(oldImageData.data[oldPixelIndex10], oldImageData.data[oldPixelIndex11], oldImageData.data[oldPixelIndex12], dx), interpolate(oldImageData.data[oldPixelIndex20], oldImageData.data[oldPixelIndex21], oldImageData.data[oldPixelIndex22], dx), dy);
	
	            newImageData.data[newPixelIndex + 1] = interpolateNormalize(interpolate(oldImageData.data[oldPixelIndex00 + 1], oldImageData.data[oldPixelIndex01 + 1], oldImageData.data[oldPixelIndex02 + 1], dx), interpolate(oldImageData.data[oldPixelIndex10 + 1], oldImageData.data[oldPixelIndex11 + 1], oldImageData.data[oldPixelIndex12 + 1], dx), interpolate(oldImageData.data[oldPixelIndex20 + 1], oldImageData.data[oldPixelIndex21 + 1], oldImageData.data[oldPixelIndex22 + 1], dx), dy);
	
	            newImageData.data[newPixelIndex + 2] = interpolateNormalize(interpolate(oldImageData.data[oldPixelIndex00 + 2], oldImageData.data[oldPixelIndex01 + 2], oldImageData.data[oldPixelIndex02 + 2], dx), interpolate(oldImageData.data[oldPixelIndex10 + 2], oldImageData.data[oldPixelIndex11 + 2], oldImageData.data[oldPixelIndex12 + 2], dx), interpolate(oldImageData.data[oldPixelIndex20 + 2], oldImageData.data[oldPixelIndex21 + 2], oldImageData.data[oldPixelIndex22 + 2], dx), dy);
	
	            newImageData.data[newPixelIndex + 3] = interpolateNormalize(interpolate(oldImageData.data[oldPixelIndex00 + 3], oldImageData.data[oldPixelIndex01 + 3], oldImageData.data[oldPixelIndex02 + 3], dx), interpolate(oldImageData.data[oldPixelIndex10 + 3], oldImageData.data[oldPixelIndex11 + 3], oldImageData.data[oldPixelIndex12 + 3], dx), interpolate(oldImageData.data[oldPixelIndex20 + 3], oldImageData.data[oldPixelIndex21 + 3], oldImageData.data[oldPixelIndex22 + 3], dx), dy);
	        }
	    }
	
	    return newImageData;
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=imagizer.node.js.map