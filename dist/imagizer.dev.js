/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/classes/BaseOnLayer.tsx":
/*!*************************************!*\
  !*** ./src/classes/BaseOnLayer.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CanvasWrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasWrapper */ "./src/classes/CanvasWrapper.tsx");
/* harmony import */ var _helpers_resize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/resize */ "./src/helpers/resize.tsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var BaseOnLayerObject = /*#__PURE__*/function () {
  function BaseOnLayerObject() {
    _classCallCheck(this, BaseOnLayerObject);

    _defineProperty(this, "imageData", null);

    _defineProperty(this, "canvas", null);

    _defineProperty(this, "width", 0);

    _defineProperty(this, "height", 0);
  }

  _createClass(BaseOnLayerObject, [{
    key: "getWidth",
    value: function getWidth() {
      return this.width;
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      return this.height;
    }
  }, {
    key: "setWidth",
    value: function setWidth(value) {
      this.width = value;
      return this;
    }
  }, {
    key: "setHeight",
    value: function setHeight(value) {
      this.height = value;
      return this;
    }
  }, {
    key: "getImageData",
    value: function getImageData() {
      if (!this.imageData) {
        this.imageData = this.canvas.getContext().getImageData(0, 0, this.getWidth(), this.getHeight());
      }

      return this.imageData;
    }
  }, {
    key: "setImageData",
    value: function setImageData(value) {
      this.imageData = value;
      return this;
    }
  }, {
    key: "resize",
    value: function resize(newWidth, newHeight) {
      var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "nearest-neighbour";
      var oldImageData = this.getImageData(),
          canvas = new _CanvasWrapper__WEBPACK_IMPORTED_MODULE_0__.default(newWidth, newHeight),
          newImageData = canvas.getContext().createImageData(newWidth, newHeight);

      switch (mode) {
        case "nearest-neighbour":
          newImageData = (0,_helpers_resize__WEBPACK_IMPORTED_MODULE_1__.resizeNearestNeighbour)(oldImageData, newImageData, newWidth, newHeight);
          break;

        case "bilinear-interpolation":
          newImageData = (0,_helpers_resize__WEBPACK_IMPORTED_MODULE_1__.resizeBilinearInterpolation)(oldImageData, newImageData, newWidth, newHeight);
          break;

        case "biquadratic-interpolation":
          newImageData = (0,_helpers_resize__WEBPACK_IMPORTED_MODULE_1__.resizeBiquadraticInterpolation)(oldImageData, newImageData, newWidth, newHeight);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseOnLayerObject);

/***/ }),

/***/ "./src/classes/CanvasWrapper.tsx":
/*!***************************************!*\
  !*** ./src/classes/CanvasWrapper.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/common */ "./src/helpers/common.tsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var CanvasWrapper = /*#__PURE__*/function () {
  function CanvasWrapper(width, height) {
    _classCallCheck(this, CanvasWrapper);

    _defineProperty(this, "canvas", null);

    _defineProperty(this, "context", null);

    _defineProperty(this, "width", 0);

    _defineProperty(this, "height", 0);

    this.initialize(width, height);
  }

  _createClass(CanvasWrapper, [{
    key: "initialize",
    value: function initialize() {
      var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (!(0,_helpers_common__WEBPACK_IMPORTED_MODULE_0__.isBrowser)()) {
        var Canvas = __webpack_require__(/*! canvas */ "canvas");

        this.canvas = new Canvas(width, height);
      } else {
        this.canvas = document.createElement("canvas"); // hide from viewport

        this.canvas.style.position = "absolute";
        this.canvas.style.left = "-99999px";
        this.canvas.style.top = "-99999px";
        this.setWidth(width);
        this.setHeight(height);
        document.body.appendChild(this.canvas);
      }
    }
  }, {
    key: "setWidth",
    value: function setWidth(value) {
      this.canvas.setAttribute("width", "" + value);
      this.width = value;
      return this;
    }
  }, {
    key: "setHeight",
    value: function setHeight(value) {
      this.canvas.setAttribute("height", "" + value);
      this.height = value;
      return this;
    }
  }, {
    key: "getContext",
    value: function getContext() {
      if (!this.context) {
        this.context = this.canvas.getContext("2d");
      }

      return this.context;
    }
  }, {
    key: "getCanvas",
    value: function getCanvas() {
      return this.canvas;
    }
  }, {
    key: "toDataURL",
    value: function toDataURL(type) {
      return this.canvas.toDataURL(type);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if ((0,_helpers_common__WEBPACK_IMPORTED_MODULE_0__.isBrowser)()) {
        document.body.removeChild(this.canvas);
      }

      this.canvas = null;
      this.context = null;
    }
  }]);

  return CanvasWrapper;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanvasWrapper);

/***/ }),

/***/ "./src/classes/EffectsRepository.tsx":
/*!*******************************************!*\
  !*** ./src/classes/EffectsRepository.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _effects_point_GrayScale__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./effects/point/GrayScale */ "./src/classes/effects/point/GrayScale.tsx");
/* harmony import */ var _effects_point_Sepia__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./effects/point/Sepia */ "./src/classes/effects/point/Sepia.tsx");
/* harmony import */ var _effects_point_Contrast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./effects/point/Contrast */ "./src/classes/effects/point/Contrast.tsx");
/* harmony import */ var _effects_point_Brightness__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./effects/point/Brightness */ "./src/classes/effects/point/Brightness.tsx");
/* harmony import */ var _effects_point_Diffusion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./effects/point/Diffusion */ "./src/classes/effects/point/Diffusion.tsx");
/* harmony import */ var _effects_point_Dither__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./effects/point/Dither */ "./src/classes/effects/point/Dither.tsx");
/* harmony import */ var _effects_point_Exposure__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./effects/point/Exposure */ "./src/classes/effects/point/Exposure.tsx");
/* harmony import */ var _effects_point_Gain__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./effects/point/Gain */ "./src/classes/effects/point/Gain.tsx");
/* harmony import */ var _effects_point_Gamma__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./effects/point/Gamma */ "./src/classes/effects/point/Gamma.tsx");
/* harmony import */ var _effects_point_HSBAdjust__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./effects/point/HSBAdjust */ "./src/classes/effects/point/HSBAdjust.tsx");
/* harmony import */ var _effects_point_InvertAlpha__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./effects/point/InvertAlpha */ "./src/classes/effects/point/InvertAlpha.tsx");
/* harmony import */ var _effects_point_Invert__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./effects/point/Invert */ "./src/classes/effects/point/Invert.tsx");
/* harmony import */ var _effects_point_Levels__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./effects/point/Levels */ "./src/classes/effects/point/Levels.tsx");
/* harmony import */ var _effects_point_Rescale__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./effects/point/Rescale */ "./src/classes/effects/point/Rescale.tsx");
/* harmony import */ var _effects_point_Solarize__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./effects/point/Solarize */ "./src/classes/effects/point/Solarize.tsx");
/* harmony import */ var _effects_point_Threshold__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./effects/point/Threshold */ "./src/classes/effects/point/Threshold.tsx");
/* harmony import */ var _effects_point_Tritone__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./effects/point/Tritone */ "./src/classes/effects/point/Tritone.tsx");
/* harmony import */ var _effects_point_Dissolve__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./effects/point/Dissolve */ "./src/classes/effects/point/Dissolve.tsx");
/* harmony import */ var _effects_point_Edge__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./effects/point/Edge */ "./src/classes/effects/point/Edge.tsx");
/* harmony import */ var _effects_point_ChannelMix__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./effects/point/ChannelMix */ "./src/classes/effects/point/ChannelMix.tsx");
/* harmony import */ var _effects_point_AutoContrast__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./effects/point/AutoContrast */ "./src/classes/effects/point/AutoContrast.tsx");
/* harmony import */ var _effects_transform_Diffuse__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./effects/transform/Diffuse */ "./src/classes/effects/transform/Diffuse.tsx");
/* harmony import */ var _effects_transform_Kaleidoscope__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./effects/transform/Kaleidoscope */ "./src/classes/effects/transform/Kaleidoscope.tsx");
/* harmony import */ var _effects_transform_Marble__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./effects/transform/Marble */ "./src/classes/effects/transform/Marble.tsx");
/* harmony import */ var _effects_transform_Pinch__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./effects/transform/Pinch */ "./src/classes/effects/transform/Pinch.tsx");
/* harmony import */ var _effects_transform_Ripple__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./effects/transform/Ripple */ "./src/classes/effects/transform/Ripple.tsx");
/* harmony import */ var _effects_transform_Shear__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./effects/transform/Shear */ "./src/classes/effects/transform/Shear.tsx");
/* harmony import */ var _effects_transform_Sphere__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./effects/transform/Sphere */ "./src/classes/effects/transform/Sphere.tsx");
/* harmony import */ var _effects_transform_Swim__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./effects/transform/Swim */ "./src/classes/effects/transform/Swim.tsx");
/* harmony import */ var _effects_transform_Twirl__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./effects/transform/Twirl */ "./src/classes/effects/transform/Twirl.tsx");
/* harmony import */ var _effects_transform_Water__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./effects/transform/Water */ "./src/classes/effects/transform/Water.tsx");
/* harmony import */ var _effects_transform_Circle__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./effects/transform/Circle */ "./src/classes/effects/transform/Circle.tsx");
/* harmony import */ var _effects_transform_Rotate__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./effects/transform/Rotate */ "./src/classes/effects/transform/Rotate.tsx");
/* harmony import */ var _effects_transform_Offset__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./effects/transform/Offset */ "./src/classes/effects/transform/Offset.tsx");
/* harmony import */ var _effects_transform_Polar__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./effects/transform/Polar */ "./src/classes/effects/transform/Polar.tsx");
/* harmony import */ var _effects_transform_Perspective__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./effects/transform/Perspective */ "./src/classes/effects/transform/Perspective.tsx");
/* harmony import */ var _effects_custom_AutoWhiteBalance__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./effects/custom/AutoWhiteBalance */ "./src/classes/effects/custom/AutoWhiteBalance.tsx");
/* harmony import */ var _effects_custom_FillColor__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./effects/custom/FillColor */ "./src/classes/effects/custom/FillColor.tsx");
/* harmony import */ var _effects_custom_Flip__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./effects/custom/Flip */ "./src/classes/effects/custom/Flip.tsx");
/* harmony import */ var _effects_custom_Block__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./effects/custom/Block */ "./src/classes/effects/custom/Block.tsx");
/* harmony import */ var _effects_custom_Border__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./effects/custom/Border */ "./src/classes/effects/custom/Border.tsx");
/* harmony import */ var _effects_custom_Emboss__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./effects/custom/Emboss */ "./src/classes/effects/custom/Emboss.tsx");
/* harmony import */ var _effects_custom_ComponentStretching__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./effects/custom/ComponentStretching */ "./src/classes/effects/custom/ComponentStretching.tsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }












































var availableEffects = {};

function add(_class) {
  if (availableEffects[_class.getName()]) {
    throw "Effect: ".concat(_class.getName(), " exists already!");
  }

  availableEffects[_class.getName()] = _class;
}

add(_effects_point_GrayScale__WEBPACK_IMPORTED_MODULE_0__.default);
add(_effects_point_Sepia__WEBPACK_IMPORTED_MODULE_1__.default);
add(_effects_point_Contrast__WEBPACK_IMPORTED_MODULE_2__.default);
add(_effects_point_Brightness__WEBPACK_IMPORTED_MODULE_3__.default);
add(_effects_point_Diffusion__WEBPACK_IMPORTED_MODULE_4__.default);
add(_effects_point_Dither__WEBPACK_IMPORTED_MODULE_5__.default);
add(_effects_point_Exposure__WEBPACK_IMPORTED_MODULE_6__.default);
add(_effects_point_Gain__WEBPACK_IMPORTED_MODULE_7__.default);
add(_effects_point_Gamma__WEBPACK_IMPORTED_MODULE_8__.default);
add(_effects_point_HSBAdjust__WEBPACK_IMPORTED_MODULE_9__.default);
add(_effects_point_InvertAlpha__WEBPACK_IMPORTED_MODULE_10__.default);
add(_effects_point_Invert__WEBPACK_IMPORTED_MODULE_11__.default);
add(_effects_point_Levels__WEBPACK_IMPORTED_MODULE_12__.default);
add(_effects_point_Rescale__WEBPACK_IMPORTED_MODULE_13__.default);
add(_effects_point_Solarize__WEBPACK_IMPORTED_MODULE_14__.default);
add(_effects_point_Threshold__WEBPACK_IMPORTED_MODULE_15__.default);
add(_effects_point_Tritone__WEBPACK_IMPORTED_MODULE_16__.default);
add(_effects_transform_Diffuse__WEBPACK_IMPORTED_MODULE_21__.default);
add(_effects_point_Dissolve__WEBPACK_IMPORTED_MODULE_17__.default);
add(_effects_transform_Kaleidoscope__WEBPACK_IMPORTED_MODULE_22__.default);
add(_effects_transform_Marble__WEBPACK_IMPORTED_MODULE_23__.default);
add(_effects_transform_Pinch__WEBPACK_IMPORTED_MODULE_24__.default);
add(_effects_transform_Ripple__WEBPACK_IMPORTED_MODULE_25__.default);
add(_effects_transform_Shear__WEBPACK_IMPORTED_MODULE_26__.default);
add(_effects_transform_Sphere__WEBPACK_IMPORTED_MODULE_27__.default);
add(_effects_transform_Swim__WEBPACK_IMPORTED_MODULE_28__.default);
add(_effects_transform_Twirl__WEBPACK_IMPORTED_MODULE_29__.default);
add(_effects_transform_Water__WEBPACK_IMPORTED_MODULE_30__.default);
add(_effects_point_Edge__WEBPACK_IMPORTED_MODULE_18__.default);
add(_effects_point_ChannelMix__WEBPACK_IMPORTED_MODULE_19__.default);
add(_effects_transform_Circle__WEBPACK_IMPORTED_MODULE_31__.default);
add(_effects_transform_Rotate__WEBPACK_IMPORTED_MODULE_32__.default);
add(_effects_transform_Offset__WEBPACK_IMPORTED_MODULE_33__.default);
add(_effects_transform_Polar__WEBPACK_IMPORTED_MODULE_34__.default);
add(_effects_transform_Perspective__WEBPACK_IMPORTED_MODULE_35__.default);
add(_effects_point_AutoContrast__WEBPACK_IMPORTED_MODULE_20__.default);
add(_effects_custom_AutoWhiteBalance__WEBPACK_IMPORTED_MODULE_36__.default);
add(_effects_custom_FillColor__WEBPACK_IMPORTED_MODULE_37__.default);
add(_effects_custom_Flip__WEBPACK_IMPORTED_MODULE_38__.default);
add(_effects_custom_Block__WEBPACK_IMPORTED_MODULE_39__.default);
add(_effects_custom_Border__WEBPACK_IMPORTED_MODULE_40__.default);
add(_effects_custom_Emboss__WEBPACK_IMPORTED_MODULE_41__.default);
add(_effects_custom_ComponentStretching__WEBPACK_IMPORTED_MODULE_42__.default);

var EffectsRepository = /*#__PURE__*/function () {
  function EffectsRepository() {
    _classCallCheck(this, EffectsRepository);
  }

  _createClass(EffectsRepository, null, [{
    key: "get",
    value: function get(name) {
      return availableEffects[name];
    }
  }]);

  return EffectsRepository;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EffectsRepository);

/***/ }),

/***/ "./src/classes/Image.tsx":
/*!*******************************!*\
  !*** ./src/classes/Image.tsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseOnLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseOnLayer */ "./src/classes/BaseOnLayer.tsx");
/* harmony import */ var _CanvasWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CanvasWrapper */ "./src/classes/CanvasWrapper.tsx");
/* harmony import */ var _helpers_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/common */ "./src/helpers/common.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Image = /*#__PURE__*/function (_BaseOnLayerObject) {
  _inherits(Image, _BaseOnLayerObject);

  var _super = _createSuper(Image);

  function Image() {
    var _this;

    _classCallCheck(this, Image);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "url", null);

    _defineProperty(_assertThisInitialized(_this), "image", null);

    if (!(0,_helpers_common__WEBPACK_IMPORTED_MODULE_2__.isBrowser)()) {
      var canvas = __webpack_require__(/*! canvas */ "canvas");

      _this.image = new canvas.Image();
    } else {
      _this.image = new window.Image(); // hide from viewport

      _this.image.style.position = "absolute";
      _this.image.style.left = "-99999px";
      _this.image.style.top = "-99999px";
    }

    return _this;
  }

  _createClass(Image, [{
    key: "load",
    value: function load(url, callback) {
      var _this2 = this;

      var load = function load() {
        _this2.setWidth(!(0,_helpers_common__WEBPACK_IMPORTED_MODULE_2__.isBrowser)() ? _this2.image.width : _this2.image.clientWidth);

        _this2.setHeight(!(0,_helpers_common__WEBPACK_IMPORTED_MODULE_2__.isBrowser)() ? _this2.image.height : _this2.image.clientHeight); // get image data


        _this2.canvas = new _CanvasWrapper__WEBPACK_IMPORTED_MODULE_1__.default(_this2.getWidth(), _this2.getHeight());

        _this2.canvas.getContext().drawImage(_this2.image, 0, 0, _this2.getWidth(), _this2.getHeight());

        if ((0,_helpers_common__WEBPACK_IMPORTED_MODULE_2__.isBrowser)()) {
          document.body.removeChild(_this2.image);
        }

        if (typeof callback === "function") {
          callback.call(_this2);
        }
      };

      this.url = url;

      if ((0,_helpers_common__WEBPACK_IMPORTED_MODULE_2__.isBrowser)()) {
        document.body.appendChild(this.image);

        this.image.onload = function () {
          load();
        };

        this.image.src = url;
      } else {
        var fs = __webpack_require__(/*! fs */ "fs");

        this.image.src = fs.readFileSync(url);
        load();
      }
    }
  }]);

  return Image;
}(_BaseOnLayer__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Image);

/***/ }),

/***/ "./src/classes/Layer.tsx":
/*!*******************************!*\
  !*** ./src/classes/Layer.tsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CanvasWrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasWrapper */ "./src/classes/CanvasWrapper.tsx");
/* harmony import */ var _LayerObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LayerObject */ "./src/classes/LayerObject.tsx");
/* harmony import */ var _helpers_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/common */ "./src/helpers/common.tsx");
/* harmony import */ var _EffectsRepository__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EffectsRepository */ "./src/classes/EffectsRepository.tsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var Layer = /*#__PURE__*/function () {
  function Layer(width, height) {
    var parameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      background_color: "transparent",
      blendingMode: ""
    };

    _classCallCheck(this, Layer);

    _defineProperty(this, "objects", []);

    _defineProperty(this, "effects", []);

    _defineProperty(this, "x", 0);

    _defineProperty(this, "y", 0);

    _defineProperty(this, "canvas", null);

    _defineProperty(this, "imageData", null);

    _defineProperty(this, "width", 0);

    _defineProperty(this, "height", 0);

    _defineProperty(this, "parameters", {
      background_color: "",
      blendingMode: ""
    });

    this.initialize(width, height, parameters);

    if (parameters.background_color && parameters.background_color !== "transparent") {
      this.applyEffect("fill-color", {
        color: parameters.background_color
      });
    }
  }

  _createClass(Layer, [{
    key: "initialize",
    value: function initialize(width, height, parameters) {
      this.canvas = new _CanvasWrapper__WEBPACK_IMPORTED_MODULE_0__.default(width, height);
      this.imageData = this.canvas.getContext().createImageData(width, height);
      this.width = width;
      this.height = height;
      this.parameters = parameters;
    }
  }, {
    key: "put",
    value: function put(obj, x, y) {
      var put = new _LayerObject__WEBPACK_IMPORTED_MODULE_1__.default(obj, this, x, y, {});
      this.objects.push(put);
      return put;
    }
    /*exportTo(selector, imageType = "image/png") {
      this.exportLayer();
       let container = document.querySelector(selector),
        exportedImage = new Image();
       exportedImage.src = canvas.toDataURL(imageType);
      container.appendChild(exportedImage);
    }*/

  }, {
    key: "exportLayer",
    value: function exportLayer() {
      var i, layerObject;

      for (i = 0; i < this.objects.length; i += 1) {
        layerObject = this.objects[i];
        this.imageData = (0,_helpers_common__WEBPACK_IMPORTED_MODULE_2__.mergeImageData)({
          width: this.width,
          height: this.height,
          imageData: this.imageData
        }, {
          x: layerObject.getX(),
          y: layerObject.getY(),
          width: layerObject.getWidth(),
          height: layerObject.getHeight(),
          imageData: layerObject.exportObject()
        }, _helpers_common__WEBPACK_IMPORTED_MODULE_2__.mergePixelCallback);
      }

      for (i = 0; i < this.effects.length; i++) {
        this.imageData = this.effects[i].effect.run(this.imageData, this.effects[i].params);
      }

      return this.imageData;
    }
  }, {
    key: "applyEffect",
    value: function applyEffect(name, parameters) {
      this.effects.push({
        name: name,
        effect: new (_EffectsRepository__WEBPACK_IMPORTED_MODULE_3__.default.get(name))(),
        parameters: parameters
      });
    }
  }, {
    key: "resize",
    value: function resize(newWidth, newHeight, mode) {
      var i;
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
    key: "crop",
    value: function crop(startX, startY, width, height) {
      var i;

      for (i = 0; i < this.objects.length; i += 1) {
        this.objects[i].crop(startX, startY, width, height);
      }

      return this;
    }
  }, {
    key: "moveXY",
    value: function moveXY(x, y) {
      this.moveX(x);
      this.moveY(y);
      return this;
    }
  }, {
    key: "moveX",
    value: function moveX(x) {
      this.x += x | 0;
      return this;
    }
  }, {
    key: "moveY",
    value: function moveY(y) {
      this.y += y | 0;
      return this;
    }
  }, {
    key: "setX",
    value: function setX(x) {
      this.x = x;
      return this;
    }
  }, {
    key: "setY",
    value: function setY(y) {
      this.y = y;
      return this;
    }
  }, {
    key: "setBlendingMode",
    value: function setBlendingMode(blendingMode) {
      this.parameters.blendingMode = blendingMode;
    }
  }, {
    key: "getX",
    value: function getX() {
      return this.x;
    }
  }, {
    key: "getY",
    value: function getY() {
      return this.y;
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      return this.width;
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      return this.height;
    }
  }, {
    key: "getParameter",
    value: function getParameter(name) {
      return this.parameters[name];
    }
  }]);

  return Layer;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layer);

/***/ }),

/***/ "./src/classes/LayerObject.tsx":
/*!*************************************!*\
  !*** ./src/classes/LayerObject.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CanvasWrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasWrapper */ "./src/classes/CanvasWrapper.tsx");
/* harmony import */ var _helpers_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/common */ "./src/helpers/common.tsx");
/* harmony import */ var _EffectsRepository__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EffectsRepository */ "./src/classes/EffectsRepository.tsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var LayerObject = /*#__PURE__*/function () {
  function LayerObject(obj, layer, x, y, opts) {
    _classCallCheck(this, LayerObject);

    _defineProperty(this, "obj", null);

    _defineProperty(this, "layer", null);

    _defineProperty(this, "x", 0);

    _defineProperty(this, "y", 0);

    _defineProperty(this, "opts", {});

    _defineProperty(this, "effects", []);

    this.obj = obj;
    this.layer = this;
    this.x = x;
    this.y = y;
    this.opts = opts;
    this.effects = [];
  }

  _createClass(LayerObject, [{
    key: "getObject",
    value: function getObject() {
      return this.obj;
    }
  }, {
    key: "getX",
    value: function getX() {
      return this.x;
    }
  }, {
    key: "getY",
    value: function getY() {
      return this.y;
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      return this.obj.getWidth();
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      return this.obj.getHeight();
    }
  }, {
    key: "exportObject",
    value: function exportObject() {
      var imageData = this.obj.getImageData();

      for (var i = 0; i < this.effects.length; i += 1) {
        imageData = this.effects[i].effect.run(imageData, this.effects[i].params);
      }

      return imageData;
    }
  }, {
    key: "applyEffect",
    value: function applyEffect(name, parameters) {
      this.effects.push({
        name: name,
        effect: new (_EffectsRepository__WEBPACK_IMPORTED_MODULE_2__.default.get(name))(),
        parameters: parameters
      });
    }
  }, {
    key: "moveXY",
    value: function moveXY(x, y) {
      this.moveX(x);
      this.moveY(y);
      return this;
    }
  }, {
    key: "moveX",
    value: function moveX(x) {
      this.x += x | 0;
      return this;
    }
  }, {
    key: "moveY",
    value: function moveY(y) {
      this.y += y | 0;
      return this;
    }
  }, {
    key: "setXY",
    value: function setXY(x, y) {
      this.setX(x);
      this.setY(y);
      return this;
    }
  }, {
    key: "setX",
    value: function setX(x) {
      this.x = x;
      return this;
    }
  }, {
    key: "setY",
    value: function setY(y) {
      this.y = y;
      return this;
    }
  }, {
    key: "resize",
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
    key: "crop",
    value: function crop(startX, startY, width, height) {
      var object = this.getObject(),
          oldImageData = object.getImageData(),
          canvas = new _CanvasWrapper__WEBPACK_IMPORTED_MODULE_0__.default(width, height),
          newImageData = canvas.getContext().createImageData(width, height);
      newImageData = (0,_helpers_common__WEBPACK_IMPORTED_MODULE_1__.cropImageData)(oldImageData, newImageData, startX, startY, width, height);
      object.setImageData(newImageData).setWidth(width).setHeight(height);
      this.setXY(startX, startY);
      return this;
    }
  }]);

  return LayerObject;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LayerObject);

/***/ }),

/***/ "./src/classes/Project.tsx":
/*!*********************************!*\
  !*** ./src/classes/Project.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CanvasWrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasWrapper */ "./src/classes/CanvasWrapper.tsx");
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layer */ "./src/classes/Layer.tsx");
/* harmony import */ var _helpers_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/common */ "./src/helpers/common.tsx");
/* harmony import */ var _EffectsRepository__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EffectsRepository */ "./src/classes/EffectsRepository.tsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var Project = /*#__PURE__*/function () {
  function Project(width, height) {
    var parameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Project);

    _defineProperty(this, "imageData", null);

    _defineProperty(this, "effects", []);

    _defineProperty(this, "layers", []);

    _defineProperty(this, "startTime", new Date());

    _defineProperty(this, "parameters", {});

    _defineProperty(this, "width", 0);

    _defineProperty(this, "height", 0);

    _defineProperty(this, "canvas", null);

    this.initialize(width, height, parameters);
  }

  _createClass(Project, [{
    key: "initialize",
    value: function initialize(width, height, parameters) {
      this.parameters = parameters;
      this.width = width;
      this.height = height;
      this.canvas = new _CanvasWrapper__WEBPACK_IMPORTED_MODULE_0__.default(width, height);
      this.imageData = this.canvas.getContext().getImageData(0, 0, width, height);
    }
  }, {
    key: "createLayer",
    value: function createLayer(parameters) {
      var layer = new _Layer__WEBPACK_IMPORTED_MODULE_1__.default(this.width, this.height, parameters);
      this.layers.push(layer);
      return layer;
    }
  }, {
    key: "getTime",
    value: function getTime() {
      var end = new Date();
      return end.getTime() - this.startTime.getTime();
    }
  }, {
    key: "save",
    value: function save(selector) {
      var imageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "image/png";

      if ((0,_helpers_common__WEBPACK_IMPORTED_MODULE_2__.isBrowser)()) {
        throw new Error("Available only in node.js environment");
      }

      for (var i = 0; i < this.layers.length; i++) {
        this.imageData = (0,_helpers_common__WEBPACK_IMPORTED_MODULE_2__.mergeImageData)({
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
        }, _helpers_common__WEBPACK_IMPORTED_MODULE_2__.mergePixelCallback);
      }

      for (var _i = 0; _i < this.effects.length; _i++) {
        this.imageData = this.effects[_i].effect.run(this.imageData, this.effects[_i].parameters);
      }

      this.canvas.getContext().putImageData(this.imageData, 0, 0);

      var fs = __webpack_require__(/*! fs */ "fs"),
          img = this.canvas.toDataURL(),
          data = img.replace(/^data:image\/\w+;base64,/, ""),
          buff = new Buffer(data, "base64");

      fs.writeFile(selector, buff);
    }
  }, {
    key: "render",
    value: function render() {
      var imageType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "image/png";

      if (!(0,_helpers_common__WEBPACK_IMPORTED_MODULE_2__.isBrowser)()) {
        throw new Error("Available only in browser environment");
      }

      var i,
          exportedImage = new window.Image();

      for (i = 0; i < this.layers.length; i++) {
        this.imageData = (0,_helpers_common__WEBPACK_IMPORTED_MODULE_2__.mergeImageData)({
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
        }, _helpers_common__WEBPACK_IMPORTED_MODULE_2__.mergePixelCallback);
      }

      for (i = 0; i < this.effects.length; i++) {
        this.imageData = this.effects[i].effect.run(this.imageData, this.effects[i].parameters);
      }

      this.canvas.getContext().putImageData(this.imageData, 0, 0);
      exportedImage.src = this.canvas.toDataURL(imageType);
      return exportedImage;
    }
  }, {
    key: "applyEffect",
    value: function applyEffect(name) {
      var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.effects.push({
        name: name,
        effect: new (_EffectsRepository__WEBPACK_IMPORTED_MODULE_3__.default.get(name))(),
        parameters: parameters
      });
    }
  }, {
    key: "resize",
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);

/***/ }),

/***/ "./src/classes/effects/Base.tsx":
/*!**************************************!*\
  !*** ./src/classes/effects/Base.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BaseEffect = /*#__PURE__*/function () {
  function BaseEffect() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BaseEffect);

    _defineProperty(this, "opts", {});

    this.opts = opts;
  }

  _createClass(BaseEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {};
    }
  }, {
    key: "before",
    value: function before(parameters, width, height, imageData) {
      return {};
    }
  }], [{
    key: "getName",
    value: function getName() {
      throw "Extend it.";
    }
  }]);

  return BaseEffect;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseEffect);

/***/ }),

/***/ "./src/classes/effects/BaseCustom.tsx":
/*!********************************************!*\
  !*** ./src/classes/effects/BaseCustom.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base */ "./src/classes/effects/Base.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var BaseCustomEffect = /*#__PURE__*/function (_BaseEffect) {
  _inherits(BaseCustomEffect, _BaseEffect);

  var _super = _createSuper(BaseCustomEffect);

  function BaseCustomEffect() {
    _classCallCheck(this, BaseCustomEffect);

    return _super.apply(this, arguments);
  }

  _createClass(BaseCustomEffect, [{
    key: "callback",
    value: function callback(pixel, x, y, parameters, width, height) {
      throw "Extend it.";
    }
  }, {
    key: "run",
    value: function run(imageData, parameters) {
      parameters = _objectSpread(_objectSpread({}, this.getDefaultParameters()), parameters);

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
          sandbox = {
        // object invoked as this in effect callback

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
}(_Base__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseCustomEffect);

/***/ }),

/***/ "./src/classes/effects/BasePoint.tsx":
/*!*******************************************!*\
  !*** ./src/classes/effects/BasePoint.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base */ "./src/classes/effects/Base.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var BasePointEffect = /*#__PURE__*/function (_BaseEffect) {
  _inherits(BasePointEffect, _BaseEffect);

  var _super = _createSuper(BasePointEffect);

  function BasePointEffect() {
    _classCallCheck(this, BasePointEffect);

    return _super.apply(this, arguments);
  }

  _createClass(BasePointEffect, [{
    key: "callback",
    value: function callback(pixel, x, y, parameters, width, height) {
      throw "Extend it.";
    }
  }, {
    key: "run",
    value: function run(imageData, parameters) {
      parameters = parameters = _objectSpread(_objectSpread({}, this.getDefaultParameters()), parameters);

      var x,
          y,
          firstPixelIndex,
          result,
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
          sandbox = {
        // object invoked as this in effect callback

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

          if (_typeof(result) === "object") {
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
}(_Base__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BasePointEffect);

/***/ }),

/***/ "./src/classes/effects/BaseTransform.tsx":
/*!***********************************************!*\
  !*** ./src/classes/effects/BaseTransform.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base */ "./src/classes/effects/Base.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var BaseTransformEffect = /*#__PURE__*/function (_BaseEffect) {
  _inherits(BaseTransformEffect, _BaseEffect);

  var _super = _createSuper(BaseTransformEffect);

  function BaseTransformEffect() {
    _classCallCheck(this, BaseTransformEffect);

    return _super.apply(this, arguments);
  }

  _createClass(BaseTransformEffect, [{
    key: "callback",
    value: function callback(pixel, x, y, parameters, width, height) {
      throw "Extend it.";
    }
  }, {
    key: "run",
    value: function run(imageData, parameters) {
      parameters = _objectSpread(_objectSpread({}, this.getDefaultParameters()), parameters);

      var x,
          y,
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
}(_Base__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseTransformEffect);

/***/ }),

/***/ "./src/classes/effects/custom/AutoWhiteBalance.tsx":
/*!*********************************************************!*\
  !*** ./src/classes/effects/custom/AutoWhiteBalance.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseCustom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseCustom */ "./src/classes/effects/BaseCustom.tsx");
/* harmony import */ var _helpers_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../helpers/color */ "./src/helpers/color.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var AutoWhiteBalanceEffect = /*#__PURE__*/function (_BaseCustomEffect) {
  _inherits(AutoWhiteBalanceEffect, _BaseCustomEffect);

  var _super = _createSuper(AutoWhiteBalanceEffect);

  function AutoWhiteBalanceEffect() {
    _classCallCheck(this, AutoWhiteBalanceEffect);

    return _super.apply(this, arguments);
  }

  _createClass(AutoWhiteBalanceEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        intensity: 50
      };
    }
  }, {
    key: "callback",
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
          lab = (0,_helpers_color__WEBPACK_IMPORTED_MODULE_1__.RGBtoCIELab)(pixel.r, pixel.g, pixel.b);
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
          lab = (0,_helpers_color__WEBPACK_IMPORTED_MODULE_1__.RGBtoCIELab)(pixel.r, pixel.g, pixel.b);
          lab.a += aDelta;
          lab.b += bDelta;
          pixel = (0,_helpers_color__WEBPACK_IMPORTED_MODULE_1__.CIELabToRGB)(lab.l, lab.a, lab.b);
          pixel.a = this.getPixel(x, y).a;
          this.setPixel(x, y, pixel);
        }
      }
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "auto-white-balance";
    }
  }]);

  return AutoWhiteBalanceEffect;
}(_BaseCustom__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AutoWhiteBalanceEffect);

/***/ }),

/***/ "./src/classes/effects/custom/Block.tsx":
/*!**********************************************!*\
  !*** ./src/classes/effects/custom/Block.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseCustom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseCustom */ "./src/classes/effects/BaseCustom.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var BlockEffect = /*#__PURE__*/function (_BaseCustomEffect) {
  _inherits(BlockEffect, _BaseCustomEffect);

  var _super = _createSuper(BlockEffect);

  function BlockEffect() {
    _classCallCheck(this, BlockEffect);

    return _super.apply(this, arguments);
  }

  _createClass(BlockEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        blockSize: 5
      };
    }
  }, {
    key: "callback",
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
              r += pixel.r & 0xff;
              g += pixel.g & 0xff;
              b += pixel.b & 0xff;
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
    key: "getName",
    value: function getName() {
      return "block";
    }
  }]);

  return BlockEffect;
}(_BaseCustom__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlockEffect);

/***/ }),

/***/ "./src/classes/effects/custom/Border.tsx":
/*!***********************************************!*\
  !*** ./src/classes/effects/custom/Border.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseCustom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseCustom */ "./src/classes/effects/BaseCustom.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var BorderEffect = /*#__PURE__*/function (_BaseCustomEffect) {
  _inherits(BorderEffect, _BaseCustomEffect);

  var _super = _createSuper(BorderEffect);

  function BorderEffect() {
    var _this;

    _classCallCheck(this, BorderEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      leftBorder: 0,
      rightBorder: 0,
      topBorder: 0,
      bottomBorder: 0
    });

    return _this;
  }

  _createClass(BorderEffect, [{
    key: "getDefaultParameters",
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
    key: "before",
    value: function before(parameters, width, height, imageData) {
      return {
        leftBorder: parameters.leftBorder | 0,
        rightBorder: parameters.rightBorder | 0,
        topBorder: parameters.rightBorder | 0,
        bottomBorder: parameters.bottomBorder | 0
      };
    }
  }, {
    key: "callback",
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
    key: "getName",
    value: function getName() {
      return "border";
    }
  }]);

  return BorderEffect;
}(_BaseCustom__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BorderEffect);

/***/ }),

/***/ "./src/classes/effects/custom/ComponentStretching.tsx":
/*!************************************************************!*\
  !*** ./src/classes/effects/custom/ComponentStretching.tsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseCustom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseCustom */ "./src/classes/effects/BaseCustom.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var ComponentStretchingEffect = /*#__PURE__*/function (_BaseCustomEffect) {
  _inherits(ComponentStretchingEffect, _BaseCustomEffect);

  var _super = _createSuper(ComponentStretchingEffect);

  function ComponentStretchingEffect() {
    _classCallCheck(this, ComponentStretchingEffect);

    return _super.apply(this, arguments);
  }

  _createClass(ComponentStretchingEffect, [{
    key: "callback",
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
    key: "getName",
    value: function getName() {
      return "component-stretching";
    }
  }]);

  return ComponentStretchingEffect;
}(_BaseCustom__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ComponentStretchingEffect);

/***/ }),

/***/ "./src/classes/effects/custom/Emboss.tsx":
/*!***********************************************!*\
  !*** ./src/classes/effects/custom/Emboss.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseCustom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseCustom */ "./src/classes/effects/BaseCustom.tsx");
/* harmony import */ var _helpers_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../helpers/common */ "./src/helpers/common.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var EmbossEffect = /*#__PURE__*/function (_BaseCustomEffect) {
  _inherits(EmbossEffect, _BaseCustomEffect);

  var _super = _createSuper(EmbossEffect);

  function EmbossEffect() {
    _classCallCheck(this, EmbossEffect);

    return _super.apply(this, arguments);
  }

  _createClass(EmbossEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        azimuth: 135 * Math.PI / 180,
        elevation: 30 * Math.PI / 180,
        width45: 3,
        emboss: true
      };
    }
  }, {
    key: "callback",
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
          bumpPixels.push((0,_helpers_common__WEBPACK_IMPORTED_MODULE_1__.brightness)(this.getOriginalPixel(x, y)) | 0);
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
    key: "getName",
    value: function getName() {
      return "emboss";
    }
  }]);

  return EmbossEffect;
}(_BaseCustom__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmbossEffect);

/***/ }),

/***/ "./src/classes/effects/custom/FillColor.tsx":
/*!**************************************************!*\
  !*** ./src/classes/effects/custom/FillColor.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseCustom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseCustom */ "./src/classes/effects/BaseCustom.tsx");
/* harmony import */ var _helpers_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../helpers/color */ "./src/helpers/color.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var FillColorEffect = /*#__PURE__*/function (_BaseCustomEffect) {
  _inherits(FillColorEffect, _BaseCustomEffect);

  var _super = _createSuper(FillColorEffect);

  function FillColorEffect() {
    _classCallCheck(this, FillColorEffect);

    return _super.apply(this, arguments);
  }

  _createClass(FillColorEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        color: "transparent"
      };
    }
  }, {
    key: "callback",
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
        color = (0,_helpers_color__WEBPACK_IMPORTED_MODULE_1__.hexToRGB)(parameters.color);
        color.a = 255;
      }

      for (y = 0; y < height; y += 1) {
        for (x = 0; x < width; x += 1) {
          this.setPixel(x, y, color);
        }
      }
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "fill-color";
    }
  }]);

  return FillColorEffect;
}(_BaseCustom__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FillColorEffect);

/***/ }),

/***/ "./src/classes/effects/custom/Flip.tsx":
/*!*********************************************!*\
  !*** ./src/classes/effects/custom/Flip.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseCustom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseCustom */ "./src/classes/effects/BaseCustom.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var FlipEffect = /*#__PURE__*/function (_BaseCustomEffect) {
  _inherits(FlipEffect, _BaseCustomEffect);

  var _super = _createSuper(FlipEffect);

  function FlipEffect() {
    _classCallCheck(this, FlipEffect);

    return _super.apply(this, arguments);
  }

  _createClass(FlipEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        operation: "FLIP_H" // FLIP_H, FLIP_V, FLIP_HV, FLIP_90CW, FLIP_90CCW, FLIP_180

      };
    }
  }, {
    key: "callback",
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
    key: "getName",
    value: function getName() {
      return "flip";
    }
  }]);

  return FlipEffect;
}(_BaseCustom__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FlipEffect);

/***/ }),

/***/ "./src/classes/effects/point/AutoContrast.tsx":
/*!****************************************************!*\
  !*** ./src/classes/effects/point/AutoContrast.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BasePoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePoint */ "./src/classes/effects/BasePoint.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var AutoContrastEffect = /*#__PURE__*/function (_BasePointEffect) {
  _inherits(AutoContrastEffect, _BasePointEffect);

  var _super = _createSuper(AutoContrastEffect);

  function AutoContrastEffect() {
    var _this;

    _classCallCheck(this, AutoContrastEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      remap: function remap(value, min, max) {
        return 0;
      },
      min: 0,
      max: 0
    });

    return _this;
  }

  _createClass(AutoContrastEffect, [{
    key: "before",
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
    key: "callback",
    value: function callback(pixel, x, y, parameters, width, height) {
      pixel.r = this.data.remap(pixel.r, this.data.min, this.data.max);
      pixel.g = this.data.remap(pixel.g, this.data.min, this.data.max);
      pixel.b = this.data.remap(pixel.b, this.data.min, this.data.max);
      return pixel;
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "auto-contrast";
    }
  }]);

  return AutoContrastEffect;
}(_BasePoint__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AutoContrastEffect);

/***/ }),

/***/ "./src/classes/effects/point/Brightness.tsx":
/*!**************************************************!*\
  !*** ./src/classes/effects/point/Brightness.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BasePoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePoint */ "./src/classes/effects/BasePoint.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var BrightnessEffect = /*#__PURE__*/function (_BasePointEffect) {
  _inherits(BrightnessEffect, _BasePointEffect);

  var _super = _createSuper(BrightnessEffect);

  function BrightnessEffect() {
    var _this;

    _classCallCheck(this, BrightnessEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      brightness: 0
    });

    return _this;
  }

  _createClass(BrightnessEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        brightness: 0.5
      };
    }
  }, {
    key: "before",
    value: function before(parameters) {
      return {
        brightness: 255 * parameters.brightness
      };
    }
  }, {
    key: "callback",
    value: function callback(pixel, x, y, parameters, width, height) {
      pixel.r = pixel.r + this.data.brightness;
      pixel.g = pixel.g + this.data.brightness;
      pixel.b = pixel.b + this.data.brightness;
      return pixel;
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "brightness";
    }
  }]);

  return BrightnessEffect;
}(_BasePoint__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BrightnessEffect);

/***/ }),

/***/ "./src/classes/effects/point/ChannelMix.tsx":
/*!**************************************************!*\
  !*** ./src/classes/effects/point/ChannelMix.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BasePoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePoint */ "./src/classes/effects/BasePoint.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var ChannelMixEffect = /*#__PURE__*/function (_BasePointEffect) {
  _inherits(ChannelMixEffect, _BasePointEffect);

  var _super = _createSuper(ChannelMixEffect);

  function ChannelMixEffect() {
    _classCallCheck(this, ChannelMixEffect);

    return _super.apply(this, arguments);
  }

  _createClass(ChannelMixEffect, [{
    key: "getDefaultParameters",
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
    key: "callback",
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
    key: "getName",
    value: function getName() {
      return "channel-mix";
    }
  }]);

  return ChannelMixEffect;
}(_BasePoint__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChannelMixEffect);

/***/ }),

/***/ "./src/classes/effects/point/Contrast.tsx":
/*!************************************************!*\
  !*** ./src/classes/effects/point/Contrast.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BasePoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePoint */ "./src/classes/effects/BasePoint.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var ContrastEffect = /*#__PURE__*/function (_BasePointEffect) {
  _inherits(ContrastEffect, _BasePointEffect);

  var _super = _createSuper(ContrastEffect);

  function ContrastEffect() {
    var _this;

    _classCallCheck(this, ContrastEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      factor: 1
    });

    return _this;
  }

  _createClass(ContrastEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        contrast: 0.5
      };
    }
  }, {
    key: "before",
    value: function before(parameters) {
      return {
        factor: 259 * (parameters.contrast * 255 + 255) / (255 * (259 - parameters.contrast * 255))
      };
    }
  }, {
    key: "callback",
    value: function callback(pixel, x, y, parameters, width, height) {
      pixel.r = this.data.factor * (pixel.r - 128) + 128;
      pixel.g = this.data.factor * (pixel.g - 128) + 128;
      pixel.b = this.data.factor * (pixel.b - 128) + 128;
      return pixel;
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "contrast";
    }
  }]);

  return ContrastEffect;
}(_BasePoint__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContrastEffect);

/***/ }),

/***/ "./src/classes/effects/point/Diffusion.tsx":
/*!*************************************************!*\
  !*** ./src/classes/effects/point/Diffusion.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BasePoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePoint */ "./src/classes/effects/BasePoint.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var DiffusionEffect = /*#__PURE__*/function (_BasePointEffect) {
  _inherits(DiffusionEffect, _BasePointEffect);

  var _super = _createSuper(DiffusionEffect);

  function DiffusionEffect() {
    var _this;

    _classCallCheck(this, DiffusionEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      map: {},
      div: {},
      sum: 0
    });

    return _this;
  }

  _createClass(DiffusionEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        matrix: [0, 0, 0, 0, 0, 7, 3, 5, 1],
        levels: 6,
        colorDither: true,
        granulate: true
      };
    }
  }, {
    key: "before",
    value: function before() {
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        levels: 0,
        matrix: []
      };
      var width = arguments.length > 1 ? arguments[1] : undefined;
      var height = arguments.length > 2 ? arguments[2] : undefined;
      var imageData = arguments.length > 3 ? arguments[3] : undefined;
      var i,
          sum = 0,
          map = [],
          div = [];

      for (i = 0; i < parameters.matrix.length; i += 1) {
        sum += parameters.matrix[i];
      }

      for (i = 0; i < parameters.levels; i += 1) {
        map[i] = 255 * i / (parameters.levels - 1) | 0;
      }

      for (i = 0; i < 256; i += 1) {
        div[i] = parameters.levels * i / 256 | 0;
      }

      return {
        sum: sum,
        map: map,
        div: div
      };
    }
  }, {
    key: "callback",
    value: function callback(pixel, x, y, parameters, width, height) {
      var red1 = pixel.r,
          green1 = pixel.g,
          blue1 = pixel.b,
          red2,
          green2,
          blue2,
          data = this.data,
          tmpPixel,
          tmpRed,
          tmpGreen,
          tmpBlue,
          i,
          j,
          iy,
          jx,
          w,
          grayScale;

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
    key: "getName",
    value: function getName() {
      return "diffusion";
    }
  }]);

  return DiffusionEffect;
}(_BasePoint__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DiffusionEffect);

/***/ }),

/***/ "./src/classes/effects/point/Dissolve.tsx":
/*!************************************************!*\
  !*** ./src/classes/effects/point/Dissolve.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BasePoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePoint */ "./src/classes/effects/BasePoint.tsx");
/* harmony import */ var _helpers_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../helpers/common */ "./src/helpers/common.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var DissolveEffect = /*#__PURE__*/function (_BasePointEffect) {
  _inherits(DissolveEffect, _BasePointEffect);

  var _super = _createSuper(DissolveEffect);

  function DissolveEffect() {
    var _this;

    _classCallCheck(this, DissolveEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      minDensity: 0,
      maxDensity: 0
    });

    return _this;
  }

  _createClass(DissolveEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        density: 1,
        softness: 0
      };
    }
  }, {
    key: "before",
    value: function before(parameters, width, height, imageData) {
      var d = (1 - parameters.density) * (1 + parameters.softness);
      return {
        minDensity: d - parameters.softness,
        maxDensity: d
      };
    }
  }, {
    key: "callback",
    value: function callback(pixel, x, y, parameters, width, height) {
      var v = Math.random(),
          f = (0,_helpers_common__WEBPACK_IMPORTED_MODULE_1__.smoothStep)(this.data.minDensity, this.data.maxDensity, v);
      pixel.a = pixel.a * f;
      return pixel;
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "dissolve";
    }
  }]);

  return DissolveEffect;
}(_BasePoint__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DissolveEffect);

/***/ }),

/***/ "./src/classes/effects/point/Dither.tsx":
/*!**********************************************!*\
  !*** ./src/classes/effects/point/Dither.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BasePoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePoint */ "./src/classes/effects/BasePoint.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var DitherEffect = /*#__PURE__*/function (_BasePointEffect) {
  _inherits(DitherEffect, _BasePointEffect);

  var _super = _createSuper(DitherEffect);

  function DitherEffect() {
    _classCallCheck(this, DitherEffect);

    return _super.apply(this, arguments);
  }

  _createClass(DitherEffect, [{
    key: "getDefaultParameters",
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
    key: "before",
    value: function before(parameters, width, height, imageData) {
      var matrix = parameters.matrix,
          rows,
          cols,
          map = [],
          div = [],
          mod = [],
          i;

      if (typeof matrix === "string") {
        matrix = parameters.matrices[matrix];
      }

      rows = Math.sqrt(matrix.length);
      cols = Math.sqrt(matrix.length);

      for (i = 0; i < parameters.levels; i += 1) {
        map[i] = 255 * i / (parameters.levels - 1);
      }

      for (i = 0; i < 256; i += 1) {
        div[i] = (parameters.levels - 1) * i / 256 | 0;
        mod[i] = i * (rows * cols + 1) / 256 | 0;
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
    key: "callback",
    value: function callback(pixel, x, y, parameters, width, height) {
      var col = x % this.data.cols,
          row = y % this.data.rows,
          v = parameters.matrix[row * this.data.cols + col],
          red = pixel.r,
          green = pixel.g,
          blue = pixel.b,
          result = {
        a: pixel.a,
        r: 0,
        g: 0,
        b: 0
      },
          value;

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
    key: "getName",
    value: function getName() {
      return "dither";
    }
  }]);

  return DitherEffect;
}(_BasePoint__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DitherEffect);

/***/ }),

/***/ "./src/classes/effects/point/Edge.tsx":
/*!********************************************!*\
  !*** ./src/classes/effects/point/Edge.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BasePoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePoint */ "./src/classes/effects/BasePoint.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var EdgeEffect = /*#__PURE__*/function (_BasePointEffect) {
  _inherits(EdgeEffect, _BasePointEffect);

  var _super = _createSuper(EdgeEffect);

  function EdgeEffect() {
    var _this;

    _classCallCheck(this, EdgeEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      hEdgeMatrix: [],
      vEdgeMatrix: []
    });

    return _this;
  }

  _createClass(EdgeEffect, [{
    key: "getDefaultParameters",
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
    key: "before",
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
    key: "callback",
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
    key: "getName",
    value: function getName() {
      return "edge";
    }
  }]);

  return EdgeEffect;
}(_BasePoint__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EdgeEffect);

/***/ }),

/***/ "./src/classes/effects/point/Exposure.tsx":
/*!************************************************!*\
  !*** ./src/classes/effects/point/Exposure.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BasePoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePoint */ "./src/classes/effects/BasePoint.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var ExposureEffect = /*#__PURE__*/function (_BasePointEffect) {
  _inherits(ExposureEffect, _BasePointEffect);

  var _super = _createSuper(ExposureEffect);

  function ExposureEffect() {
    _classCallCheck(this, ExposureEffect);

    return _super.apply(this, arguments);
  }

  _createClass(ExposureEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        exposure: 1
      };
    }
  }, {
    key: "callback",
    value: function callback(pixel, x, y, parameters, width, height) {
      pixel.r = (1 - Math.exp(-pixel.r / 255 * parameters.exposure)) * 255;
      pixel.g = (1 - Math.exp(-pixel.g / 255 * parameters.exposure)) * 255;
      pixel.b = (1 - Math.exp(-pixel.b / 255 * parameters.exposure)) * 255;
      return pixel;
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "exposure";
    }
  }]);

  return ExposureEffect;
}(_BasePoint__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ExposureEffect);

/***/ }),

/***/ "./src/classes/effects/point/Gain.tsx":
/*!********************************************!*\
  !*** ./src/classes/effects/point/Gain.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BasePoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePoint */ "./src/classes/effects/BasePoint.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var GainEffect = /*#__PURE__*/function (_BasePointEffect) {
  _inherits(GainEffect, _BasePointEffect);

  var _super = _createSuper(GainEffect);

  function GainEffect() {
    _classCallCheck(this, GainEffect);

    return _super.apply(this, arguments);
  }

  _createClass(GainEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        gain: 1,
        bias: 1
      };
    }
  }, {
    key: "callback",
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
    key: "getName",
    value: function getName() {
      return "gain";
    }
  }]);

  return GainEffect;
}(_BasePoint__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GainEffect);

/***/ }),

/***/ "./src/classes/effects/point/Gamma.tsx":
/*!*********************************************!*\
  !*** ./src/classes/effects/point/Gamma.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BasePoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePoint */ "./src/classes/effects/BasePoint.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var GammaEffect = /*#__PURE__*/function (_BasePointEffect) {
  _inherits(GammaEffect, _BasePointEffect);

  var _super = _createSuper(GammaEffect);

  function GammaEffect() {
    var _this;

    _classCallCheck(this, GammaEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      table: {
        r: {},
        g: {},
        b: {}
      }
    });

    return _this;
  }

  _createClass(GammaEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        gammaRed: 1,
        gammaGreen: 1,
        gammaBlue: 1
      };
    }
  }, {
    key: "before",
    value: function before() {
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        gammaRed: 1,
        gammaGreen: 1,
        gammaBlue: 1
      };
      var width = arguments.length > 1 ? arguments[1] : undefined;
      var height = arguments.length > 2 ? arguments[2] : undefined;
      var imageData = arguments.length > 3 ? arguments[3] : undefined;
      var table = {
        r: [],
        g: [],
        b: []
      },
          i;

      for (i = 0; i < 256; i += 1) {
        table.r[i] = 255 * Math.pow(i / 255, 1 / parameters.gammaRed) + 0.5 | 0;
        table.g[i] = 255 * Math.pow(i / 255, 1 / parameters.gammaGreen) + 0.5 | 0;
        table.b[i] = 255 * Math.pow(i / 255, 1 / parameters.gammaBlue) + 0.5 | 0;
      }

      return {
        table: table
      };
    }
  }, {
    key: "callback",
    value: function callback(pixel, x, y, parameters, width, height) {
      return {
        r: this.data.table.r[pixel.r],
        g: this.data.table.g[pixel.g],
        b: this.data.table.b[pixel.b],
        a: pixel.a
      };
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "gamma";
    }
  }]);

  return GammaEffect;
}(_BasePoint__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GammaEffect);

/***/ }),

/***/ "./src/classes/effects/point/GrayScale.tsx":
/*!*************************************************!*\
  !*** ./src/classes/effects/point/GrayScale.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BasePoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePoint */ "./src/classes/effects/BasePoint.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var GrayScaleEffect = /*#__PURE__*/function (_BasePointEffect) {
  _inherits(GrayScaleEffect, _BasePointEffect);

  var _super = _createSuper(GrayScaleEffect);

  function GrayScaleEffect() {
    _classCallCheck(this, GrayScaleEffect);

    return _super.apply(this, arguments);
  }

  _createClass(GrayScaleEffect, [{
    key: "callback",
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
    key: "getName",
    value: function getName() {
      return "gray-scale";
    }
  }]);

  return GrayScaleEffect;
}(_BasePoint__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GrayScaleEffect);

/***/ }),

/***/ "./src/classes/effects/point/HSBAdjust.tsx":
/*!*************************************************!*\
  !*** ./src/classes/effects/point/HSBAdjust.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BasePoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePoint */ "./src/classes/effects/BasePoint.tsx");
/* harmony import */ var _helpers_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../helpers/color */ "./src/helpers/color.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var HSBAdjustEffect = /*#__PURE__*/function (_BasePointEffect) {
  _inherits(HSBAdjustEffect, _BasePointEffect);

  var _super = _createSuper(HSBAdjustEffect);

  function HSBAdjustEffect() {
    _classCallCheck(this, HSBAdjustEffect);

    return _super.apply(this, arguments);
  }

  _createClass(HSBAdjustEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        h: 1,
        s: 1,
        b: 1
      };
    }
  }, {
    key: "callback",
    value: function callback(pixel, x, y, parameters, width, height) {
      var hsb = (0,_helpers_color__WEBPACK_IMPORTED_MODULE_1__.RGBtoHSB)(pixel.r, pixel.g, pixel.b);
      hsb.h += parameters.h;

      while (hsb.h < 0) {
        hsb.h += Math.PI * 2;
      }

      hsb.s += parameters.s;
      hsb.s = Math.max(Math.min(hsb.s, 1), 0);
      hsb.b += parameters.b;
      hsb.b = Math.max(Math.min(hsb.b, 1), 0);
      var result = (0,_helpers_color__WEBPACK_IMPORTED_MODULE_1__.HSBtoRGB)(hsb.h, hsb.s, hsb.b);
      pixel.r = result.r;
      pixel.g = result.g;
      pixel.b = result.b;
      return pixel;
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "hsb-adjust";
    }
  }]);

  return HSBAdjustEffect;
}(_BasePoint__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HSBAdjustEffect);

/***/ }),

/***/ "./src/classes/effects/point/Invert.tsx":
/*!**********************************************!*\
  !*** ./src/classes/effects/point/Invert.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BasePoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePoint */ "./src/classes/effects/BasePoint.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var InvertEffect = /*#__PURE__*/function (_BasePointEffect) {
  _inherits(InvertEffect, _BasePointEffect);

  var _super = _createSuper(InvertEffect);

  function InvertEffect() {
    _classCallCheck(this, InvertEffect);

    return _super.apply(this, arguments);
  }

  _createClass(InvertEffect, [{
    key: "callback",
    value: function callback(pixel, x, y, parameters, width, height) {
      pixel.r = 255 - pixel.r;
      pixel.g = 255 - pixel.g;
      pixel.b = 255 - pixel.b;
      return pixel;
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "invert";
    }
  }]);

  return InvertEffect;
}(_BasePoint__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InvertEffect);

/***/ }),

/***/ "./src/classes/effects/point/InvertAlpha.tsx":
/*!***************************************************!*\
  !*** ./src/classes/effects/point/InvertAlpha.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BasePoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePoint */ "./src/classes/effects/BasePoint.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var InvertAlphaEffect = /*#__PURE__*/function (_BasePointEffect) {
  _inherits(InvertAlphaEffect, _BasePointEffect);

  var _super = _createSuper(InvertAlphaEffect);

  function InvertAlphaEffect() {
    _classCallCheck(this, InvertAlphaEffect);

    return _super.apply(this, arguments);
  }

  _createClass(InvertAlphaEffect, [{
    key: "callback",
    value: function callback(pixel, x, y, parameters, width, height) {
      pixel.a = 255 - pixel.a;
      return pixel;
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "invert-alpha";
    }
  }]);

  return InvertAlphaEffect;
}(_BasePoint__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InvertAlphaEffect);

/***/ }),

/***/ "./src/classes/effects/point/Levels.tsx":
/*!**********************************************!*\
  !*** ./src/classes/effects/point/Levels.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BasePoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePoint */ "./src/classes/effects/BasePoint.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var LevelsEffect = /*#__PURE__*/function (_BasePointEffect) {
  _inherits(LevelsEffect, _BasePointEffect);

  var _super = _createSuper(LevelsEffect);

  function LevelsEffect() {
    var _this;

    _classCallCheck(this, LevelsEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      lut: {
        0: {},
        1: {},
        2: {}
      }
    });

    return _this;
  }

  _createClass(LevelsEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        low: 0,
        high: 1,
        lowOutput: 0,
        highOutput: 1
      };
    }
  }, {
    key: "before",
    value: function before(parameters, width, height, imageData) {
      var Histogram = function Histogram(imageData, width, height, offset, stride) {
        var i,
            j,
            index,
            x,
            y,
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
          i,
          j;

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

      histogram.isGray(); // uglify fix - "Side effects in initialization of unused letiable histogram" warning

      return {
        lut: lut
      };
    }
  }, {
    key: "callback",
    value: function callback(pixel, x, y, parameters, width, height) {
      return {
        r: this.data.lut[0][pixel.r],
        g: this.data.lut[1][pixel.g],
        b: this.data.lut[2][pixel.b],
        a: pixel.a
      };
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "levels";
    }
  }]);

  return LevelsEffect;
}(_BasePoint__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LevelsEffect);

/***/ }),

/***/ "./src/classes/effects/point/Rescale.tsx":
/*!***********************************************!*\
  !*** ./src/classes/effects/point/Rescale.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BasePoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePoint */ "./src/classes/effects/BasePoint.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var RescaleEffect = /*#__PURE__*/function (_BasePointEffect) {
  _inherits(RescaleEffect, _BasePointEffect);

  var _super = _createSuper(RescaleEffect);

  function RescaleEffect() {
    _classCallCheck(this, RescaleEffect);

    return _super.apply(this, arguments);
  }

  _createClass(RescaleEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        scale: 1
      };
    }
  }, {
    key: "callback",
    value: function callback(pixel, x, y, parameters, width, height) {
      pixel.r = parameters.scale * pixel.r;
      pixel.g = parameters.scale * pixel.g;
      pixel.b = parameters.scale * pixel.b;
      return pixel;
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "rescale";
    }
  }]);

  return RescaleEffect;
}(_BasePoint__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RescaleEffect);

/***/ }),

/***/ "./src/classes/effects/point/Sepia.tsx":
/*!*********************************************!*\
  !*** ./src/classes/effects/point/Sepia.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BasePoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePoint */ "./src/classes/effects/BasePoint.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var GrayScaleEffect = /*#__PURE__*/function (_BasePointEffect) {
  _inherits(GrayScaleEffect, _BasePointEffect);

  var _super = _createSuper(GrayScaleEffect);

  function GrayScaleEffect() {
    _classCallCheck(this, GrayScaleEffect);

    return _super.apply(this, arguments);
  }

  _createClass(GrayScaleEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        sepiaValue: 1
      };
    }
  }, {
    key: "callback",
    value: function callback(pixel, x, y, parameters, width, height) {
      var tmp = 0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b;
      pixel.r = tmp + 2 * parameters.sepiaValue;
      pixel.g = tmp + parameters.sepiaValue;
      pixel.b = tmp;
      return pixel;
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "sepia";
    }
  }]);

  return GrayScaleEffect;
}(_BasePoint__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GrayScaleEffect);

/***/ }),

/***/ "./src/classes/effects/point/Solarize.tsx":
/*!************************************************!*\
  !*** ./src/classes/effects/point/Solarize.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BasePoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePoint */ "./src/classes/effects/BasePoint.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var SolarizeEffect = /*#__PURE__*/function (_BasePointEffect) {
  _inherits(SolarizeEffect, _BasePointEffect);

  var _super = _createSuper(SolarizeEffect);

  function SolarizeEffect() {
    _classCallCheck(this, SolarizeEffect);

    return _super.apply(this, arguments);
  }

  _createClass(SolarizeEffect, [{
    key: "callback",
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
    key: "getName",
    value: function getName() {
      return "solarize";
    }
  }]);

  return SolarizeEffect;
}(_BasePoint__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SolarizeEffect);

/***/ }),

/***/ "./src/classes/effects/point/Threshold.tsx":
/*!*************************************************!*\
  !*** ./src/classes/effects/point/Threshold.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BasePoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePoint */ "./src/classes/effects/BasePoint.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var ThresholdEffect = /*#__PURE__*/function (_BasePointEffect) {
  _inherits(ThresholdEffect, _BasePointEffect);

  var _super = _createSuper(ThresholdEffect);

  function ThresholdEffect() {
    _classCallCheck(this, ThresholdEffect);

    return _super.apply(this, arguments);
  }

  _createClass(ThresholdEffect, [{
    key: "callback",
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
    key: "getName",
    value: function getName() {
      return "threshold";
    }
  }]);

  return ThresholdEffect;
}(_BasePoint__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThresholdEffect);

/***/ }),

/***/ "./src/classes/effects/point/Tritone.tsx":
/*!***********************************************!*\
  !*** ./src/classes/effects/point/Tritone.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BasePoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePoint */ "./src/classes/effects/BasePoint.tsx");
/* harmony import */ var _helpers_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../helpers/color */ "./src/helpers/color.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var TritoneEffect = /*#__PURE__*/function (_BasePointEffect) {
  _inherits(TritoneEffect, _BasePointEffect);

  var _super = _createSuper(TritoneEffect);

  function TritoneEffect() {
    var _this;

    _classCallCheck(this, TritoneEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      lut: {}
    });

    return _this;
  }

  _createClass(TritoneEffect, [{
    key: "getDefaultParameters",
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
    key: "before",
    value: function before(parameters) {
      var lut = [],
          i,
          t;

      for (i = 0; i < 128; i += 1) {
        t = i / 127;
        lut[i] = (0,_helpers_color__WEBPACK_IMPORTED_MODULE_1__.mixColors)(t, parameters.shadowColor, parameters.midColor);
      }

      for (i = 128; i < 256; i += 1) {
        t = (i - 127) / 128;
        lut[i] = (0,_helpers_color__WEBPACK_IMPORTED_MODULE_1__.mixColors)(t, parameters.midColor, parameters.highColor);
      }

      return {
        lut: lut
      };
    }
  }, {
    key: "callback",
    value: function callback(pixel, x, y, parameters, width, height) {
      var brightness = Math.floor((pixel.r + pixel.g + pixel.b) / 3);
      return this.data.lut[brightness];
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "tritone";
    }
  }]);

  return TritoneEffect;
}(_BasePoint__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TritoneEffect);

/***/ }),

/***/ "./src/classes/effects/transform/Circle.tsx":
/*!**************************************************!*\
  !*** ./src/classes/effects/transform/Circle.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseTransform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseTransform */ "./src/classes/effects/BaseTransform.tsx");
/* harmony import */ var _helpers_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../helpers/common */ "./src/helpers/common.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var CircleEffect = /*#__PURE__*/function (_BaseTransformEffect) {
  _inherits(CircleEffect, _BaseTransformEffect);

  var _super = _createSuper(CircleEffect);

  function CircleEffect() {
    var _this;

    _classCallCheck(this, CircleEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      icentreX: 0,
      width: 0
    });

    return _this;
  }

  _createClass(CircleEffect, [{
    key: "getDefaultParameters",
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
    key: "before",
    value: function before(parameters, width, height, imageData) {
      return {
        icentreX: width * parameters.centreX,
        icentreY: height * parameters.centreY,
        width: --width
      };
    }
  }, {
    key: "callback",
    value: function callback(x, y, parameters, width, height) {
      var dx = x - this.data.icentreX,
          dy = y - this.data.icentreX,
          theta = Math.atan2(-dy, -dx) + parameters.angle,
          r = Math.sqrt(dx * dx + dy * dy);
      theta = (0,_helpers_common__WEBPACK_IMPORTED_MODULE_1__.mod)(theta, 2 * Math.PI);
      return [this.data.width * theta / parameters.spreadAngle + 0.00001, height * (1 - (r - parameters.radius) / (height + 0.00001))];
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "circle";
    }
  }]);

  return CircleEffect;
}(_BaseTransform__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CircleEffect);

/***/ }),

/***/ "./src/classes/effects/transform/Diffuse.tsx":
/*!***************************************************!*\
  !*** ./src/classes/effects/transform/Diffuse.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseTransform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseTransform */ "./src/classes/effects/BaseTransform.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var DiffuseEffect = /*#__PURE__*/function (_BaseTransformEffect) {
  _inherits(DiffuseEffect, _BaseTransformEffect);

  var _super = _createSuper(DiffuseEffect);

  function DiffuseEffect() {
    var _this;

    _classCallCheck(this, DiffuseEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      sinTable: {},
      cosTable: {}
    });

    return _this;
  }

  _createClass(DiffuseEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        scale: 4
      };
    }
  }, {
    key: "before",
    value: function before(parameters, width, height, imageData) {
      var sinTable = new Array(256),
          cosTable = new Array(256),
          i,
          angle;

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
    key: "callback",
    value: function callback(x, y, parameters) {
      var angle = Math.random() * 255 | 0,
          distance = Math.random();
      return [x + distance * this.data.sinTable[angle], y + distance * this.data.cosTable[angle]];
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "diffuse";
    }
  }]);

  return DiffuseEffect;
}(_BaseTransform__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DiffuseEffect);

/***/ }),

/***/ "./src/classes/effects/transform/Kaleidoscope.tsx":
/*!********************************************************!*\
  !*** ./src/classes/effects/transform/Kaleidoscope.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseTransform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseTransform */ "./src/classes/effects/BaseTransform.tsx");
/* harmony import */ var _helpers_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../helpers/common */ "./src/helpers/common.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var KaleidoscopeEffect = /*#__PURE__*/function (_BaseTransformEffect) {
  _inherits(KaleidoscopeEffect, _BaseTransformEffect);

  var _super = _createSuper(KaleidoscopeEffect);

  function KaleidoscopeEffect() {
    var _this;

    _classCallCheck(this, KaleidoscopeEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      icentreX: 0,
      icentreY: 0
    });

    return _this;
  }

  _createClass(KaleidoscopeEffect, [{
    key: "getDefaultParameters",
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
    key: "before",
    value: function before(parameters, width, height, imageData) {
      return {
        icentreX: width * parameters.centreX,
        icentreY: height * parameters.centreY
      };
    }
  }, {
    key: "callback",
    value: function callback(x, y, parameters) {
      var dx = x - this.data.icentreX,
          dy = y - this.data.icentreY,
          r = Math.sqrt(dx * dx + dy * dy),
          theta = Math.atan2(dy, dx) - parameters.angle - parameters.angle2;
      theta = (0,_helpers_common__WEBPACK_IMPORTED_MODULE_1__.triangle)(theta / Math.PI * parameters.sides * 0.5);

      if (parameters.radius !== 0) {
        var c = Math.cos(theta),
            radiusC = parameters.radius / c;
        r = radiusC * (0,_helpers_common__WEBPACK_IMPORTED_MODULE_1__.triangle)(r / radiusC);
      }

      theta += parameters.angle;
      return [this.data.icentreX + r * Math.cos(theta), this.data.icentreY + r * Math.sin(theta)];
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "kaleidoscope";
    }
  }]);

  return KaleidoscopeEffect;
}(_BaseTransform__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (KaleidoscopeEffect);

/***/ }),

/***/ "./src/classes/effects/transform/Marble.tsx":
/*!**************************************************!*\
  !*** ./src/classes/effects/transform/Marble.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseTransform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseTransform */ "./src/classes/effects/BaseTransform.tsx");
/* harmony import */ var _helpers_noise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../helpers/noise */ "./src/helpers/noise.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var MarbleEffect = /*#__PURE__*/function (_BaseTransformEffect) {
  _inherits(MarbleEffect, _BaseTransformEffect);

  var _super = _createSuper(MarbleEffect);

  function MarbleEffect() {
    var _this;

    _classCallCheck(this, MarbleEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      sinTable: {},
      cosTable: {},
      displacementMap: function displacementMap(x, y) {
        return 0;
      }
    });

    return _this;
  }

  _createClass(MarbleEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        xScale: 4,
        yScale: 4,
        amount: 1,
        turbulence: 1
      };
    }
  }, {
    key: "before",
    value: function before(parameters, width, height, imageData) {
      var sinTable = new Array(256),
          cosTable = new Array(256),
          i = 0,
          angle;

      for (i = 0; i < 256; i += 1) {
        angle = Math.PI * 2 * i / 256 * parameters.turbulence;
        sinTable[i] = -parameters.yScale * Math.sin(angle);
        cosTable[i] = parameters.yScale * Math.cos(angle);
      }

      return {
        sinTable: sinTable,
        cosTable: cosTable,
        displacementMap: function displacementMap(x, y) {
          var result = 127 * (1 + _helpers_noise__WEBPACK_IMPORTED_MODULE_1__.default.noise2(x / parameters.xScale, y / parameters.yScale));
          return Math.min(255, Math.max(0, result));
        }
      };
    }
  }, {
    key: "callback",
    value: function callback(x, y, parameters) {
      var displacement = Math.floor(this.data.displacementMap(x, y));
      return [x + this.data.sinTable[displacement], y + this.data.cosTable[displacement]];
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "marble";
    }
  }]);

  return MarbleEffect;
}(_BaseTransform__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MarbleEffect);

/***/ }),

/***/ "./src/classes/effects/transform/Offset.tsx":
/*!**************************************************!*\
  !*** ./src/classes/effects/transform/Offset.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseTransform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseTransform */ "./src/classes/effects/BaseTransform.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var RotateEffect = /*#__PURE__*/function (_BaseTransformEffect) {
  _inherits(RotateEffect, _BaseTransformEffect);

  var _super = _createSuper(RotateEffect);

  function RotateEffect() {
    _classCallCheck(this, RotateEffect);

    return _super.apply(this, arguments);
  }

  _createClass(RotateEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        xOffset: 100,
        yOffset: 100,
        wrap: true
      };
    }
  }, {
    key: "callback",
    value: function callback(x, y, parameters, width, height) {
      if (parameters.wrap) {
        return [(x + width - parameters.xOffset) % width, (y + height - parameters.yOffset) % height];
      } else {
        return [x - parameters.xOffset, y - parameters.yOffset];
      }
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "offset";
    }
  }]);

  return RotateEffect;
}(_BaseTransform__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RotateEffect);

/***/ }),

/***/ "./src/classes/effects/transform/Perspective.tsx":
/*!*******************************************************!*\
  !*** ./src/classes/effects/transform/Perspective.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseTransform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseTransform */ "./src/classes/effects/BaseTransform.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var PerspectiveEffect = /*#__PURE__*/function (_BaseTransformEffect) {
  _inherits(PerspectiveEffect, _BaseTransformEffect);

  var _super = _createSuper(PerspectiveEffect);

  function PerspectiveEffect() {
    var _this;

    _classCallCheck(this, PerspectiveEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      F: 0,
      G: 0,
      H: 0,
      I: 0
    });

    return _this;
  }

  _createClass(PerspectiveEffect, [{
    key: "getDefaultParameters",
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
    key: "before",
    value: function before(parameters, width, height, imageData) {
      function unitSquareToQuad() {
        var result = {
          a11: 0,
          a21: 0,
          a31: 0,
          a12: 0,
          a22: 0,
          a32: 0,
          a13: 0,
          a23: 0,
          a33: 0,
          A: 0,
          B: 0,
          C: 0,
          D: 0,
          E: 0,
          F: 0,
          G: 0,
          H: 0,
          I: 0
        },
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
    key: "callback",
    value: function callback(x, y, parameters, width, height) {
      return [width * (this.data.A * x + this.data.B * y + this.data.C) / (this.data.G * x + this.data.H * y + this.data.I), height * (this.data.D * x + this.data.E * y + this.data.F) / (this.data.G * x + this.data.H * y + this.data.I)];
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "perspective";
    }
  }]);

  return PerspectiveEffect;
}(_BaseTransform__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PerspectiveEffect);

/***/ }),

/***/ "./src/classes/effects/transform/Pinch.tsx":
/*!*************************************************!*\
  !*** ./src/classes/effects/transform/Pinch.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseTransform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseTransform */ "./src/classes/effects/BaseTransform.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var PinchEffect = /*#__PURE__*/function (_BaseTransformEffect) {
  _inherits(PinchEffect, _BaseTransformEffect);

  var _super = _createSuper(PinchEffect);

  function PinchEffect() {
    var _this;

    _classCallCheck(this, PinchEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      icentreX: 0,
      icentreY: 0,
      radius2: 0
    });

    return _this;
  }

  _createClass(PinchEffect, [{
    key: "getDefaultParameters",
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
    key: "before",
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
    key: "callback",
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
    key: "getName",
    value: function getName() {
      return "pinch";
    }
  }]);

  return PinchEffect;
}(_BaseTransform__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PinchEffect);

/***/ }),

/***/ "./src/classes/effects/transform/Polar.tsx":
/*!*************************************************!*\
  !*** ./src/classes/effects/transform/Polar.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseTransform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseTransform */ "./src/classes/effects/BaseTransform.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var PolarEffect = /*#__PURE__*/function (_BaseTransformEffect) {
  _inherits(PolarEffect, _BaseTransformEffect);

  var _super = _createSuper(PolarEffect);

  function PolarEffect() {
    var _this;

    _classCallCheck(this, PolarEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      centreX: 0,
      centreY: 0,
      sqr: function sqr(value) {
        return 0;
      },
      radius: 0
    });

    return _this;
  }

  _createClass(PolarEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        type: "RECT_TO_POLAR" // RECT_TO_POLAR, POLAR_TO_RECT, INVERT_IN_CIRCLE

      };
    }
  }, {
    key: "before",
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
    key: "callback",
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
        // TODO: ???

        case "INVERT_IN_CIRCLE":
          dx = x - this.data.centreX;
          dy = y - this.data.centreY;
          distance = dx * dx + dy * dy;
          return [this.data.centreX + this.data.centreX * this.data.centreX * dx / distance, this.data.centreY + this.data.centreY * this.data.centreY * dy / distance];
      }
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "polar";
    }
  }]);

  return PolarEffect;
}(_BaseTransform__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PolarEffect);

/***/ }),

/***/ "./src/classes/effects/transform/Ripple.tsx":
/*!**************************************************!*\
  !*** ./src/classes/effects/transform/Ripple.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseTransform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseTransform */ "./src/classes/effects/BaseTransform.tsx");
/* harmony import */ var _helpers_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../helpers/common */ "./src/helpers/common.tsx");
/* harmony import */ var _helpers_noise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../helpers/noise */ "./src/helpers/noise.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var RippleEffect = /*#__PURE__*/function (_BaseTransformEffect) {
  _inherits(RippleEffect, _BaseTransformEffect);

  var _super = _createSuper(RippleEffect);

  function RippleEffect() {
    _classCallCheck(this, RippleEffect);

    return _super.apply(this, arguments);
  }

  _createClass(RippleEffect, [{
    key: "getDefaultParameters",
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
    key: "callback",
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
          fx = (0,_helpers_common__WEBPACK_IMPORTED_MODULE_1__.mod)(nx, 1);
          fy = (0,_helpers_common__WEBPACK_IMPORTED_MODULE_1__.mod)(ny, 1);
          break;

        case "TRIANGLE":
          fx = (0,_helpers_common__WEBPACK_IMPORTED_MODULE_1__.triangle)(nx);
          fy = (0,_helpers_common__WEBPACK_IMPORTED_MODULE_1__.triangle)(ny);
          break;

        case "NOISE":
          fx = _helpers_noise__WEBPACK_IMPORTED_MODULE_2__.default.noise1(nx);
          fy = _helpers_noise__WEBPACK_IMPORTED_MODULE_2__.default.noise1(ny);
          break;
      }

      return [x + parameters.xAmplitude * fx, y + parameters.yAmplitute * fy];
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "ripple";
    }
  }]);

  return RippleEffect;
}(_BaseTransform__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RippleEffect);

/***/ }),

/***/ "./src/classes/effects/transform/Rotate.tsx":
/*!**************************************************!*\
  !*** ./src/classes/effects/transform/Rotate.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseTransform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseTransform */ "./src/classes/effects/BaseTransform.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var RotateEffect = /*#__PURE__*/function (_BaseTransformEffect) {
  _inherits(RotateEffect, _BaseTransformEffect);

  var _super = _createSuper(RotateEffect);

  function RotateEffect() {
    var _this;

    _classCallCheck(this, RotateEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      sin: 0,
      cos: 0,
      icentreX: 0,
      icentreY: 0
    });

    return _this;
  }

  _createClass(RotateEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        angle: Math.PI
      };
    }
  }, {
    key: "before",
    value: function before(parameters, width, height, imageData) {
      return {
        cos: Math.cos(parameters.angle),
        sin: Math.sin(parameters.angle),
        icentreX: width / 2,
        icentreY: height / 2
      };
    }
  }, {
    key: "callback",
    value: function callback(x, y, parameters, width, height) {
      return [this.data.cos * (x - this.data.icentreX) - this.data.sin * (y - this.data.icentreY) + this.data.icentreY, this.data.sin * (x - this.data.icentreX) - this.data.cos * (y - this.data.icentreY) + this.data.icentreY];
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "rotate";
    }
  }]);

  return RotateEffect;
}(_BaseTransform__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RotateEffect);

/***/ }),

/***/ "./src/classes/effects/transform/Shear.tsx":
/*!*************************************************!*\
  !*** ./src/classes/effects/transform/Shear.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseTransform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseTransform */ "./src/classes/effects/BaseTransform.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var ShearEffect = /*#__PURE__*/function (_BaseTransformEffect) {
  _inherits(ShearEffect, _BaseTransformEffect);

  var _super = _createSuper(ShearEffect);

  function ShearEffect() {
    var _this;

    _classCallCheck(this, ShearEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      shx: 0,
      shy: 0
    });

    return _this;
  }

  _createClass(ShearEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        xAngle: 0,
        yAngle: 0,
        xOffset: 0,
        yOffset: 0
      };
    }
  }, {
    key: "before",
    value: function before(parameters, width, height) {
      return {
        shx: Math.sin(parameters.xAngle),
        shy: Math.sin(parameters.yAngle)
      };
    }
  }, {
    key: "callback",
    value: function callback(x, y, parameters) {
      return [x + parameters.xOffset + y * this.data.shx, y + parameters.yOffset + x * this.data.shy];
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "shear";
    }
  }]);

  return ShearEffect;
}(_BaseTransform__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShearEffect);

/***/ }),

/***/ "./src/classes/effects/transform/Sphere.tsx":
/*!**************************************************!*\
  !*** ./src/classes/effects/transform/Sphere.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseTransform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseTransform */ "./src/classes/effects/BaseTransform.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var SphereEffect = /*#__PURE__*/function (_BaseTransformEffect) {
  _inherits(SphereEffect, _BaseTransformEffect);

  var _super = _createSuper(SphereEffect);

  function SphereEffect() {
    var _this;

    _classCallCheck(this, SphereEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      icentreX: 0,
      icentreY: 0,
      a2: 0,
      b2: 0,
      a: 0,
      b: 0
    });

    return _this;
  }

  _createClass(SphereEffect, [{
    key: "getDefaultParameters",
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
    key: "before",
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
    key: "callback",
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
    key: "getName",
    value: function getName() {
      return "sphere";
    }
  }]);

  return SphereEffect;
}(_BaseTransform__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SphereEffect);

/***/ }),

/***/ "./src/classes/effects/transform/Swim.tsx":
/*!************************************************!*\
  !*** ./src/classes/effects/transform/Swim.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseTransform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseTransform */ "./src/classes/effects/BaseTransform.tsx");
/* harmony import */ var _helpers_noise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../helpers/noise */ "./src/helpers/noise.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var SwimEffect = /*#__PURE__*/function (_BaseTransformEffect) {
  _inherits(SwimEffect, _BaseTransformEffect);

  var _super = _createSuper(SwimEffect);

  function SwimEffect() {
    var _this;

    _classCallCheck(this, SwimEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      m00: 0,
      m01: 0,
      m10: 0,
      m11: 0
    });

    return _this;
  }

  _createClass(SwimEffect, [{
    key: "getDefaultParameters",
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
    key: "before",
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
    key: "callback",
    value: function callback(x, y, parameters) {
      var nx = this.data.m00 * x + this.data.m01 * y,
          ny = this.data.m10 * x + this.data.m11 * y;
      nx /= parameters.scale;
      ny /= parameters.scale * parameters.stretch;

      if (parameters.turbulence === 1) {
        return [x + parameters.amount * _helpers_noise__WEBPACK_IMPORTED_MODULE_1__.default.noise3(nx + 0.5, ny, parameters.time), y + parameters.amount * _helpers_noise__WEBPACK_IMPORTED_MODULE_1__.default.noise3(nx, ny + 0.5, parameters.time)];
      }

      return [x + parameters.amount * _helpers_noise__WEBPACK_IMPORTED_MODULE_1__.default.turbulence3(nx + 0.5, ny, parameters.turbulence, parameters.time), y + parameters.amount * _helpers_noise__WEBPACK_IMPORTED_MODULE_1__.default.turbulence3(nx, ny + 0.5, parameters.turbulence, parameters.time)];
    }
  }], [{
    key: "getName",
    value: function getName() {
      return "swim";
    }
  }]);

  return SwimEffect;
}(_BaseTransform__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SwimEffect);

/***/ }),

/***/ "./src/classes/effects/transform/Twirl.tsx":
/*!*************************************************!*\
  !*** ./src/classes/effects/transform/Twirl.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseTransform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseTransform */ "./src/classes/effects/BaseTransform.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var TwirlEffect = /*#__PURE__*/function (_BaseTransformEffect) {
  _inherits(TwirlEffect, _BaseTransformEffect);

  var _super = _createSuper(TwirlEffect);

  function TwirlEffect() {
    var _this;

    _classCallCheck(this, TwirlEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      iCentreX: 0,
      iCentreY: 0
    });

    return _this;
  }

  _createClass(TwirlEffect, [{
    key: "getDefaultParameters",
    value: function getDefaultParameters() {
      return {
        angle: 0,
        centreX: 0.5,
        centreY: 0.5,
        radius: 100
      };
    }
  }, {
    key: "before",
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
    key: "callback",
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
    key: "getName",
    value: function getName() {
      return "twirl";
    }
  }]);

  return TwirlEffect;
}(_BaseTransform__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TwirlEffect);

/***/ }),

/***/ "./src/classes/effects/transform/Water.tsx":
/*!*************************************************!*\
  !*** ./src/classes/effects/transform/Water.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseTransform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseTransform */ "./src/classes/effects/BaseTransform.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var WaterEffect = /*#__PURE__*/function (_BaseTransformEffect) {
  _inherits(WaterEffect, _BaseTransformEffect);

  var _super = _createSuper(WaterEffect);

  function WaterEffect() {
    var _this;

    _classCallCheck(this, WaterEffect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "data", {
      iCentreX: 0,
      iCentreY: 0,
      radius2: 0
    });

    return _this;
  }

  _createClass(WaterEffect, [{
    key: "getDefaultParameters",
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
    key: "before",
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
    key: "callback",
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
    key: "getName",
    value: function getName() {
      return "water";
    }
  }]);

  return WaterEffect;
}(_BaseTransform__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WaterEffect);

/***/ }),

/***/ "./src/helpers/color.tsx":
/*!*******************************!*\
  !*** ./src/helpers/color.tsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RGBtoHSB": () => (/* binding */ RGBtoHSB),
/* harmony export */   "HSBtoRGB": () => (/* binding */ HSBtoRGB),
/* harmony export */   "mixColors": () => (/* binding */ mixColors),
/* harmony export */   "hexToRGB": () => (/* binding */ hexToRGB),
/* harmony export */   "RGBtoHex": () => (/* binding */ RGBtoHex),
/* harmony export */   "RGBtoXYZ": () => (/* binding */ RGBtoXYZ),
/* harmony export */   "RGBtoCIELab": () => (/* binding */ RGBtoCIELab),
/* harmony export */   "CIELabToXYZ": () => (/* binding */ CIELabToXYZ),
/* harmony export */   "CIELabToRGB": () => (/* binding */ CIELabToRGB)
/* harmony export */ });
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

    switch (h | 0) {
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
  var g = hex >> 8 & 0xff;
  var b = hex & 0xff;
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
  var let_R = r / 255;
  var let_G = g / 255;
  var let_B = b / 255;

  if (let_R > 0.04045) {
    let_R = Math.pow((let_R + 0.055) / 1.055, 2.4);
  } else {
    let_R = let_R / 12.92;
  }

  if (let_G > 0.04045) {
    let_G = Math.pow((let_G + 0.055) / 1.055, 2.4);
  } else {
    let_G = let_G / 12.92;
  }

  if (let_B > 0.04045) {
    let_B = Math.pow((let_B + 0.055) / 1.055, 2.4);
  } else {
    let_B = let_B / 12.92;
  }

  let_R = let_R * 100;
  let_G = let_G * 100;
  let_B = let_B * 100;
  return {
    x: let_R * 0.4124 + let_G * 0.3576 + let_B * 0.1805,
    y: let_R * 0.2126 + let_G * 0.7152 + let_B * 0.0722,
    z: let_R * 0.0193 + let_G * 0.1192 + let_B * 0.9505
  };
}
function RGBtoCIELab(r, g, b) {
  var xyz = RGBtoXYZ(r, g, b);
  var let_X = xyz.x / 95.047; // ref

  var let_Y = xyz.y / 100; // ref

  var let_Z = xyz.z / 108.883; // ref

  if (let_X > 0.008856) {
    let_X = Math.pow(let_X, 1 / 3);
  } else {
    let_X = 7.787 * let_X + 16 / 116;
  }

  if (let_Y > 0.008856) {
    let_Y = Math.pow(let_Y, 1 / 3);
  } else {
    let_Y = 7.787 * let_Y + 16 / 116;
  }

  if (let_Z > 0.008856) {
    let_Z = Math.pow(let_Z, 1 / 3);
  } else {
    let_Z = 7.787 * let_Z + 16 / 116;
  }

  return {
    l: 116 * let_Y - 16,
    a: 500 * (let_X - let_Y),
    b: 200 * (let_Y - let_Z)
  };
}
function CIELabToXYZ(l, a, b) {
  var let_Y = (l + 16) / 116;
  var let_X = a / 500 + let_Y;
  var let_Z = let_Y - b / 200;

  if (Math.pow(let_Y, 3) > 0.008856) {
    let_Y = Math.pow(let_Y, 3);
  } else {
    let_Y = (let_Y - 16 / 116) / 7.787;
  }

  if (Math.pow(let_X, 3) > 0.008856) {
    let_X = Math.pow(let_X, 3);
  } else {
    let_X = (let_X - 16 / 116) / 7.787;
  }

  if (Math.pow(let_Z, 3) > 0.008856) {
    let_Z = Math.pow(let_Z, 3);
  } else {
    let_Z = (let_Z - 16 / 116) / 7.787;
  }

  return {
    x: 95.047 * let_X,
    // ref
    y: 100 * let_Y,
    // ref
    z: 108.883 * let_Z // ref

  };
}
function CIELabToRGB(l, a, b) {
  var xyz = CIELabToXYZ(l, a, b);
  var let_X = xyz.x / 100;
  var let_Y = xyz.y / 100;
  var let_Z = xyz.z / 100;
  var let_R = let_X * 3.2406 + let_Y * -1.5372 + let_Z * -0.4986;
  var let_G = let_X * -0.9689 + let_Y * 1.8758 + let_Z * 0.0415;
  var let_B = let_X * 0.0557 + let_Y * -0.204 + let_Z * 1.057;

  if (let_R > 0.0031308) {
    let_R = 1.055 * Math.pow(let_R, 1 / 2.4) - 0.055;
  } else {
    let_R = 12.92 * let_R;
  }

  if (let_G > 0.0031308) {
    let_G = 1.055 * Math.pow(let_G, 1 / 2.4) - 0.055;
  } else {
    let_G = 12.92 * let_G;
  }

  if (let_B > 0.0031308) {
    let_B = 1.055 * Math.pow(let_B, 1 / 2.4) - 0.055;
  } else {
    let_B = 12.92 * let_B;
  }

  return {
    r: let_R * 255,
    g: let_G * 255,
    b: let_B * 255
  };
}

/***/ }),

/***/ "./src/helpers/common.tsx":
/*!********************************!*\
  !*** ./src/helpers/common.tsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeImageData": () => (/* binding */ mergeImageData),
/* harmony export */   "mergePixelCallback": () => (/* binding */ mergePixelCallback),
/* harmony export */   "cropImageData": () => (/* binding */ cropImageData),
/* harmony export */   "mod": () => (/* binding */ mod),
/* harmony export */   "triangle": () => (/* binding */ triangle),
/* harmony export */   "smoothStep": () => (/* binding */ smoothStep),
/* harmony export */   "brightness": () => (/* binding */ brightness),
/* harmony export */   "isBrowser": () => (/* binding */ isBrowser)
/* harmony export */ });
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
    return topPixel === 255 ? topPixel : Math.min(255, (bottomPixel << 8) / (255 - topPixel));
  },
  colorBurn: function colorBurn(bottomPixel, topPixel) {
    return topPixel === 0 ? topPixel : Math.max(0, 255 - (255 - bottomPixel << 8) / topPixel);
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
    return topPixel === 255 ? topPixel : Math.min(255, bottomPixel * bottomPixel / (255 - topPixel));
  },
  glow: function glow(bottomPixel, topPixel) {
    return blendingModes.reflect(topPixel, bottomPixel);
  },
  phoenix: function phoenix(bottomPixel, topPixel) {
    return Math.min(bottomPixel, topPixel) - Math.max(bottomPixel, topPixel) + 255;
  }
};
function mergeImageData(bottom, top, pixelCallback) {
  var x, y, xx, yy, firstOldPixelIndex, firstNewPixelIndex, pixelResult;

  for (y = top.y, yy = 0; y < bottom.height && yy < top.height; y += 1, yy += 1) {
    for (x = top.x, xx = 0; x < bottom.width && xx < top.width; x += 1, xx += 1) {
      if (xx < top.width && yy < top.height) {
        // overwrite only rect-size of current layer
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

        if (pixelResult !== false) {
          // if skip change
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
  } // alpha compositing


  var mergedR,
      mergedG,
      mergedB,
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
  mergedR = outA === 0 ? 0 : mergedR / outA;
  mergedG = outA === 0 ? 0 : mergedG / outA;
  mergedB = outA === 0 ? 0 : mergedB / outA;
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
      x,
      y,
      xx,
      yy,
      firstOldPixelIndex,
      firstNewPixelIndex;

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
function isBrowser() {
  return typeof window !== "undefined";
}

/***/ }),

/***/ "./src/helpers/noise.tsx":
/*!*******************************!*\
  !*** ./src/helpers/noise.tsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (noise);

/***/ }),

/***/ "./src/helpers/resize.tsx":
/*!********************************!*\
  !*** ./src/helpers/resize.tsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resizeNearestNeighbour": () => (/* binding */ resizeNearestNeighbour),
/* harmony export */   "resizeBilinearInterpolation": () => (/* binding */ resizeBilinearInterpolation),
/* harmony export */   "resizeBiquadraticInterpolation": () => (/* binding */ resizeBiquadraticInterpolation)
/* harmony export */ });
function resizeNearestNeighbour(oldImageData, newImageData, newWidth, newHeight) {
  var oldWidth = oldImageData.width,
      oldHeight = oldImageData.height,
      ratioX = oldWidth / newWidth,
      ratioY = oldHeight / newHeight,
      oldPixelIndex,
      newPixelIndex,
      x,
      y;

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
      newPixelIndex,
      x,
      y,
      x0,
      y0,
      dx,
      dy,
      x1,
      y1,
      oldPixelIndex00,
      oldPixelIndex01,
      oldPixelIndex10,
      oldPixelIndex11,
      i,
      j;

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
      x,
      y,
      x0,
      y0,
      x1,
      y1,
      x2,
      y2,
      dx,
      dy,
      oldPixelIndex00,
      oldPixelIndex01,
      oldPixelIndex02,
      oldPixelIndex10,
      oldPixelIndex11,
      oldPixelIndex12,
      oldPixelIndex20,
      oldPixelIndex21,
      oldPixelIndex22,
      newPixelIndex,
      i,
      j;

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

/***/ }),

/***/ "canvas":
/*!*************************!*\
  !*** external "canvas" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("canvas");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/main.tsx ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => (/* reexport safe */ _classes_Project__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "Image": () => (/* reexport safe */ _classes_Image__WEBPACK_IMPORTED_MODULE_1__.default)
/* harmony export */ });
/* harmony import */ var _classes_Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Project */ "./src/classes/Project.tsx");
/* harmony import */ var _classes_Image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Image */ "./src/classes/Image.tsx");



})();

exports.imagizer = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=imagizer.dev.js.map