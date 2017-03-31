/**
 * @author baniczek@gmail.com
 * @version 0.1.0
 */
;
(function () {
    var isNode = typeof window === 'undefined';
    var publish;
    var nodeCanvas;

    if (isNode) {
        publish = function (val) {
            module.exports = val;
        };
        nodeCanvas = require("canvas");
    }
    else {
        publish = function (val) {
            window.Imagizer = val;
        };
    }

    /**
     * Helper functions
     * @type {Object}
     */
    var helpers = {
        /**
         * Simple class inheriting
         * @returns {Function}
         * @constructor
         */
        inherit: function () {
            var name, i,
                args = arguments,
                Class = function () {
                    if (this.__constructor) {
                        this.__constructor.apply(this, arguments);
                    }
                };

            for (i = 0; i < args.length; i += 1) {
                for (name in args[i]) {
                    if (args[i].hasOwnProperty(name)) {
                        if (typeof Class.prototype[name] === "function") {
                            Class.prototype[name] = (function (superMethod, childMethod) {
                                return function () {
                                    var tmp = this.__super;
                                    this.__super = superMethod;
                                    var result = childMethod.apply(this, arguments);
                                    this.__super = tmp;
                                    if (!this.__super) {
                                        delete this.__super;
                                    }
                                    return result;
                                }
                            }(Class.prototype[name], args[i][name]))
                        }
                        else {
                            Class.prototype[name] = args[i][name];
                        }
                    }
                }
            }
            return Class;
        },
        /**
         * Merge two or more objects or arrays.
         * @param obj1
         * @param obj2
         * @returns {Array|Object}
         */
        extend: function (obj1, obj2) {
            var result = Object.prototype.toString.call(obj1) === "[object Array]" ? [] : {},
                i, j;

            for (i = 0; i < arguments.length; i += 1) {
                for (j in arguments[i]) {
                    if (Object.prototype.toString.call(arguments[i][j]) === "[object Object]") {
                        if (arguments[i].hasOwnProperty(j)) {
                            result[j] = helpers.extend({}, arguments[i][j]);
                        }
                    }
                    else {
                        if (Object.prototype.toString.call(arguments[i][j]) === "[object Array]") {
                            result[j] = helpers.extend([], arguments[i][j]);
                        }
                        else {
                            result[j] = arguments[i][j];
                        }
                    }
                }
            }
            return result;
        },
        /**
         * color Helpers
         */
        color: {
            /**
             * RGB to HSB color convert.
             * @param r
             * @param g
             * @param b
             * @returns {{h: number, s: number, b: number}}
             */
            RGBtoHSB: function (r, g, b) {
                var hue, saturation, brightness,
                    cmax = Math.max(r, g, b),
                    cmin = Math.min(r, g, b);

                brightness = cmax / 255;
                if (cmax !== 0) {
                    saturation = (cmax - cmin) / cmax;
                }
                else {
                    saturation = 0;
                }

                if (saturation === 0) {
                    hue = 0;
                }
                else {
                    var redc = (cmax - r) / (cmax - cmin),
                        greenc = (cmax - g) / (cmax - cmin),
                        bluec = (cmax - b) / (cmax - cmin);

                    if (r === cmax) {
                        hue = bluec - greenc;
                    }
                    else {
                        if (g === cmax) {
                            hue = 2 + redc - bluec;
                        }
                        else {
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
            },
            /**
             * HSB to RGB color convert.
             * @param hue
             * @param saturation
             * @param brightness
             * @returns {{r: Number, g: Number, b: Number}}
             */
            HSBtoRGB: function (hue, saturation, brightness) {
                var red, green, blue;
                if (saturation === 0) {
                    red = brightness * 255 + 0.5;
                    green = brightness * 255 + 0.5;
                    blue = brightness * 255 + 0.5;
                }
                else {
                    var h = (hue - Math.floor(hue)) * 6,
                        f = h - Math.floor(h),
                        p = brightness * (1 - saturation),
                        q = brightness * (1 - saturation * f),
                        t = brightness * (1 - (saturation * (1 - f)));

                    switch (parseInt(h)) {
                        case 0:
                            red = (brightness * 255 + 0.5);
                            green = (t * 255 + 0.5);
                            blue = (p * 255 + 0.5);
                            break;

                        case 1:
                            red = (q * 255 + 0.5);
                            green = (brightness * 255 + 0.5);
                            blue = (p * 255 + 0.5);
                            break;

                        case 2:
                            red = (p * 255 + 0.5);
                            green = (brightness * 255 + 0.5);
                            blue = (t * 255 + 0.5);
                            break;

                        case 3:
                            red = (p * 255 + 0.5);
                            green = (q * 255 + 0.5);
                            blue = (brightness * 255 + 0.5);
                            break;

                        case 4:
                            red = (t * 255 + 0.5);
                            green = (p * 255 + 0.5);
                            blue = (brightness * 255 + 0.5);
                            break;

                        case 5:
                            red = (brightness * 255 + 0.5);
                            green = (p * 255 + 0.5);
                            blue = (q * 255 + 0.5);
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
            },
            mixColors: function (t, rgb1, rgb2) {
                return {
                    r: rgb1.r + t * (rgb2.r - rgb1.r),
                    g: rgb1.g + t * (rgb2.g - rgb1.g),
                    b: rgb1.b + t * (rgb2.b - rgb1.b),
                    a: rgb1.a + t * (rgb2.a - rgb1.a)
                }
            },
            hexToRGB: function (hex) {
                hex = parseInt(hex.replace("#", ""), 16);
                var r = hex >> 16;
                var g = hex >> 8 & 0xFF;
                var b = hex & 0xFF;
                return {
                    r: r,
                    g: g,
                    b: b
                };
            },
            RGBtoHex: function (pixel) {
                var bin = pixel.r << 16 | pixel.g << 8 | pixel.b;
                return (function (h) {
                    return new Array(7 - h.length).join("0") + h
                })(bin.toString(16).toUpperCase())
            },
            RGBtoXYZ: function (r, g, b) {
                var var_R = ( r / 255 );
                var var_G = ( g / 255 );
                var var_B = ( b / 255 );

                if (var_R > 0.04045) {
                    var_R = Math.pow(( var_R + 0.055 ) / 1.055, 2.4);
                }
                else {
                    var_R = var_R / 12.92;
                }

                if (var_G > 0.04045) {
                    var_G = Math.pow(( var_G + 0.055 ) / 1.055, 2.4);
                }
                else {
                    var_G = var_G / 12.92;
                }

                if (var_B > 0.04045) {
                    var_B = Math.pow(( var_B + 0.055 ) / 1.055, 2.4);
                }
                else {
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
            },
            RGBtoCIELab: function (r, g, b) {
                var xyz = helpers.color.RGBtoXYZ(r, g, b);

                var var_X = xyz.x / 95.047; // ref
                var var_Y = xyz.y / 100; // ref
                var var_Z = xyz.z / 108.883; // ref

                if (var_X > 0.008856) {
                    var_X = Math.pow(var_X, ( 1 / 3 ));
                }
                else {
                    var_X = ( 7.787 * var_X ) + ( 16 / 116 );
                }

                if (var_Y > 0.008856) {
                    var_Y = Math.pow(var_Y, ( 1 / 3 ));
                }
                else {
                    var_Y = ( 7.787 * var_Y ) + ( 16 / 116 );
                }

                if (var_Z > 0.008856) {
                    var_Z = Math.pow(var_Z, ( 1 / 3 ));
                }
                else {
                    var_Z = ( 7.787 * var_Z ) + ( 16 / 116 );
                }

                return {
                    l: ( 116 * var_Y ) - 16,
                    a: 500 * ( var_X - var_Y ),
                    b: 200 * ( var_Y - var_Z )
                };
            },
            CIELabToXYZ: function (l, a, b) {
                var var_Y = ( l + 16 ) / 116;
                var var_X = a / 500 + var_Y;
                var var_Z = var_Y - b / 200;

                if (Math.pow(var_Y, 3) > 0.008856) {
                    var_Y = Math.pow(var_Y, 3);
                }
                else {
                    var_Y = ( var_Y - 16 / 116 ) / 7.787;
                }

                if (Math.pow(var_X, 3) > 0.008856) {
                    var_X = Math.pow(var_X, 3);
                }
                else {
                    var_X = ( var_X - 16 / 116 ) / 7.787;
                }

                if (Math.pow(var_Z, 3) > 0.008856) {
                    var_Z = Math.pow(var_Z, 3);
                }
                else {
                    var_Z = ( var_Z - 16 / 116 ) / 7.787;
                }

                return {
                    x: 95.047 * var_X, // ref
                    y: 100 * var_Y, // ref
                    z: 108.883 * var_Z // ref
                };
            },
            CIELabToRGB: function (l, a, b) {
                var xyz = helpers.color.CIELabToXYZ(l, a, b);

                var var_X = xyz.x / 100;
                var var_Y = xyz.y / 100;
                var var_Z = xyz.z / 100;

                var var_R = var_X * 3.2406 + var_Y * -1.5372 + var_Z * -0.4986;
                var var_G = var_X * -0.9689 + var_Y * 1.8758 + var_Z * 0.0415;
                var var_B = var_X * 0.0557 + var_Y * -0.2040 + var_Z * 1.0570;

                if (var_R > 0.0031308) {
                    var_R = 1.055 * ( Math.pow(var_R, ( 1 / 2.4 )) ) - 0.055;
                }
                else {
                    var_R = 12.92 * var_R;
                }

                if (var_G > 0.0031308) {
                    var_G = 1.055 * ( Math.pow(var_G, ( 1 / 2.4 )) ) - 0.055;
                }
                else {
                    var_G = 12.92 * var_G;
                }

                if (var_B > 0.0031308) {
                    var_B = 1.055 * ( Math.pow(var_B, ( 1 / 2.4 )) ) - 0.055;
                }
                else {
                    var_B = 12.92 * var_B;
                }

                return {
                    r: var_R * 255,
                    g: var_G * 255,
                    b: var_B * 255
                };
            }
        },
        /**
         * noise generator
         */
        noise: (function () {
            var parameters = {},
                isInit = false;

            return {
                init: function () {
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
                        parameters.G1[i] = ((this.random() % (parameters.B + parameters.B)) - parameters.B) / parameters.B;
                        parameters.G2[i] = [];
                        for (j = 0; j < 2; j += 1) {
                            parameters.G2[i][j] = ((this.random() % (parameters.B + parameters.B)) - parameters.B) / parameters.B;
                        }
                        parameters.G2[i] = this.normalize2(parameters.G2[i]);

                        parameters.G3[i] = [];
                        for (j = 0; j < 3; j += 1) {
                            parameters.G3[i][j] = ((this.random() % (parameters.B + parameters.B)) - parameters.B) / parameters.B;
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
                random: function () {
                    return parseInt(Math.random() * 256 * 256) & 0x7fffffff;
                },
                normalize2: function (arr) {
                    var s = Math.sqrt(arr[0] * arr[0] + arr[1] * arr[1] + arr[2] * arr[2]);
                    arr[0] = arr[0] / s;
                    arr[1] = arr[1] / s;
                    arr[2] = arr[2] / s;
                    return arr;
                },
                normalize3: function (arr) {
                    var s = Math.sqrt(arr[0] * arr[0] + arr[1] * arr[1]);
                    arr[0] = arr[0] / s;
                    arr[1] = arr[1] / s;
                    return arr;
                },
                sCurve: function (t) {
                    return t * t * (3.0 - 2.0 * t);
                },
                lerp: function (t, a, b) {
                    return a + t * (b - a);
                },
                /**
                 * Compute 1-dimensional Perlin noise.
                 * @param x
                 */
                noise1: function (x) {
                    var bx0, bx1,
                        rx0, rx1, sx, t, u, v;

                    this.init();

                    t = x + parameters.N;
                    bx0 = parseInt(t) & parameters.BM;
                    bx1 = (bx0 + 1) & parameters.BM;
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
                noise2: function (x, y) {
                    var bx0, bx1, by0, by1, b00, b10, b01, b11,
                        rx0, rx1, ry0, ry1, q = [], sx, sy, a, b, t, u, v,
                        i, j;

                    this.init();

                    t = x + parameters.N;
                    bx0 = parseInt(t) & parameters.BM;
                    bx1 = (bx0 + 1) & parameters.BM;
                    rx0 = t - parseInt(t);
                    rx1 = rx0 - 1;

                    t = y + parameters.N;
                    by0 = parseInt(t) & parameters.BM;
                    by1 = (by0 + 1) & parameters.BM;
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
                noise3: function (x, y, z) {
                    var bx0, bx1, by0, by1, bz0, bz1, b00, b10, b01, b11,
                        rx0, rx1, ry0, ry1, rz0, rz1, q, sy, sz, a, b, c, d, t, u, v,
                        i, j;

                    this.init();

                    t = x + parameters.N;
                    bx0 = parseInt(t) & parameters.BM;
                    bx1 = (bx0 + 1) & parameters.BM;
                    rx0 = t - parseInt(t);
                    rx1 = rx0 - 1;

                    t = y + parameters.N;
                    by0 = parseInt(t) & parameters.BM;
                    by1 = (by0 + 1) & parameters.BM;
                    ry0 = t - parseInt(t);
                    ry1 = ry0 - 1;

                    t = z + parameters.N;
                    bz0 = parseInt(t) & parameters.BM;
                    bz1 = (bz0 + 1) & parameters.BM;
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
                turbulence3: function (x, y, z, octaves) {
                    var t = 0,
                        i;
                    for (i = 1; i <= octaves; i *= 2) {
                        t += Math.abs(this.noise3(i * x, i * y, i * z)) / i;
                    }
                    return t;
                }
            }
        }()),
        mod: function (a, b) {
            var n = Math.floor(a / b);
            a -= n * b;
            if (a < 0) {
                return a + b;
            }
            return a;
        },
        triangle: function (x) {
            var r = helpers.mod(x, 1);
            return 2 * (r < 0.5 ? r : 1 - r);
        },
        smoothStep: function (a, b, x) {
            if (x < a) {
                return 0;
            }
            if (x >= b) {
                return 1;
            }
            x = (x - a) / (b - a);
            return x * x * (3 - 2 * x);
        },
        math: {
            toRadians: function (deg) {
                return deg * Math.PI / 180
            },
            toDegrees: function (radians) {
                return radians * 180 / Math.PI
            }
        },
        pixel: {
            brightness: function (pixel) {
                return (pixel.r + pixel.g + pixel.b) / 3;
            }
        }
    };

    /**
     * Function used to merge layers and layer objects.
     * @param {object} bottom Result layer.
     * @param {object} top Layer to merge on
     * @param {function} pixelCallback
     * @returns {ImageData}
     */
    var mergeImageData = function mergeImageData(bottom, top, pixelCallback) {
        var x, y,
            xx, yy,
            firstOldPixelIndex, firstNewPixelIndex,
            pixelResult;

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
    };

    /**
     * Pixel callback for merging layers and layer objects.
     * rootPixel and mergedPixel is object literal with r, g, b and a properties.
     * @param {object} bottomPixel Pixel placed on result layer
     * @param {object} topPixel Pixel to merge on
     * @param {int} x Current x position
     * @param {int} y Current y position
     * @param {Object} parameters
     * @returns {object|boolean}
     */
    var mergePixelCallback = function mergePixelCallback(bottomPixel, topPixel, x, y, parameters) {
        if (topPixel.a === 0) {
            return false; // skip change - opacity is full
        }

        // alpha compositing
        var mergedR,
            mergedG,
            mergedB,
            mergedA = topPixel.a / 255,
            rootA = bottomPixel.a / 255 * (1 - mergedA),
            outA = (mergedA + bottomPixel.a * (1 - mergedA) / 255);

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
            a: (255 * outA) | 0
        }
    };

    /**
     * Object with blending modes definitions.
     * @type {Object}
     */
    var blendingModes = {
        lighten: function (bottomPixel, topPixel) {
            return topPixel > bottomPixel ? topPixel : bottomPixel;
        },
        darken: function (bottomPixel, topPixel) {
            return topPixel > bottomPixel ? bottomPixel : topPixel;
        },
        multiply: function (bottomPixel, topPixel) {
            return bottomPixel * topPixel / 255;
        },
        average: function (bottomPixel, topPixel) {
            return bottomPixel + topPixel / 2;
        },
        add: function (bottomPixel, topPixel) {
            return Math.min(255, bottomPixel + topPixel);
        },
        subtract: function (bottomPixel, topPixel) {
            return bottomPixel + topPixel < 255 ? 0 : bottomPixel + topPixel - 255;
        },
        difference: function (bottomPixel, topPixel) {
            return Math.abs(bottomPixel - topPixel);
        },
        negation: function (bottomPixel, topPixel) {
            return 255 - Math.abs(255 - bottomPixel - topPixel);
        },
        screen: function (bottomPixel, topPixel) {
            return 255 - (((255 - bottomPixel) * (255 - topPixel)) >> 8);
        },
        exclusion: function (bottomPixel, topPixel) {
            return bottomPixel + topPixel - 2 * bottomPixel * topPixel / 255;
        },
        overlay: function (bottomPixel, topPixel) {
            return topPixel < 128
                ? (2 * bottomPixel * topPixel / 255)
                : (255 - 2 * (255 - bottomPixel) * (255 - topPixel) / 255);
        },
        softLight: function (bottomPixel, topPixel) {
            return topPixel < 128
                ? (2 * ((bottomPixel >> 1) + 64)) * (topPixel / 255)
                : 255 - (2 * (255 - (( bottomPixel >> 1) + 64)) * (255 - topPixel) / 255);
        },
        hardLight: function (bottomPixel, topPixel) {
            return blendingModes.softLight(topPixel, bottomPixel);
        },
        colorDodge: function (bottomPixel, topPixel) {
            return topPixel == 255 ? topPixel : Math.min(255, ((bottomPixel << 8 ) / (255 - topPixel)));
        },
        colorBurn: function (bottomPixel, topPixel) {
            return topPixel == 0 ? topPixel : Math.max(0, (255 - ((255 - bottomPixel) << 8 ) / topPixel));
        },
        linearDodge: function (bottomPixel, topPixel) {
            return blendingModes.add(bottomPixel, topPixel);
        },
        linearBurn: function (bottomPixel, topPixel) {
            return blendingModes.subtract(bottomPixel, topPixel);
        },
        linearLight: function (bottomPixel, topPixel) {
            return topPixel < 128
                ? blendingModes.linearBurn(bottomPixel, 2 * topPixel)
                : blendingModes.linearDodge(bottomPixel, (2 * (topPixel - 128)));
        },
        vividLight: function (bottomPixel, topPixel) {
            return topPixel < 128
                ? blendingModes.colorBurn(bottomPixel, 2 * topPixel)
                : blendingModes.colorDodge(bottomPixel, (2 * (topPixel - 128)));
        },
        pinLight: function (bottomPixel, topPixel) {
            return topPixel < 128
                ? blendingModes.darken(bottomPixel, 2 * topPixel)
                : blendingModes.lighten(bottomPixel, (2 * (topPixel - 128)));
        },
        hardMix: function (bottomPixel, topPixel) {
            return blendingModes.vividLight(bottomPixel, topPixel) < 128 ? 0 : 255;
        },
        reflect: function (bottomPixel, topPixel) {
            return topPixel == 255 ? topPixel : Math.min(255, (bottomPixel * bottomPixel / (255 - topPixel)))
        },
        glow: function (bottomPixel, topPixel) {
            return blendingModes.reflect(topPixel, bottomPixel);
        },
        phoenix: function (bottomPixel, topPixel) {
            return Math.min(bottomPixel, topPixel) - Math.max(bottomPixel, topPixel) + 255
        }
    };

    /**
     * Simple resize.
     * @param oldImageData
     * @param newImageData
     * @param newWidth
     * @param newHeight
     * @returns {*}
     */
    var resizeNearestNeighbour = function resizeNearestNeighbour(oldImageData, newImageData, newWidth, newHeight) {
        var oldWidth = oldImageData.width,
            oldHeight = oldImageData.height,
            ratioX = oldWidth / newWidth,
            ratioY = oldHeight / newHeight,
            oldPixelIndex,
            newPixelIndex,
            x, y;

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
    };

    /**
     * Bilinear interpolation resize.
     * @param oldImageData
     * @param newImageData
     * @param newWidth
     * @param newHeight
     * @returns {*}
     */
    var resizeBilinearInterpolation = function resizeBilinearInterpolation(oldImageData, newImageData, newWidth, newHeight) {
        var oldWidth = oldImageData.width,
            oldHeight = oldImageData.height,
            ratioX = oldWidth / newWidth,
            ratioY = oldHeight / newHeight,
            newPixelIndex,
            x, y,
            x0, y0,
            dx, dy,
            x1, y1,
            oldPixelIndex00, oldPixelIndex01, oldPixelIndex10, oldPixelIndex11,
            i, j;

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

                newImageData.data[newPixelIndex] =
                    (1.0 - dy) * ((1.0 - dx) * oldImageData.data[oldPixelIndex00] + dx * oldImageData.data[oldPixelIndex01]) +
                    dy * ((1.0 - dx) * oldImageData.data[oldPixelIndex10] + dx * oldImageData.data[oldPixelIndex11]);
                newImageData.data[newPixelIndex + 1] =
                    (1.0 - dy) * ((1.0 - dx) * oldImageData.data[oldPixelIndex00 + 1] + dx * oldImageData.data[oldPixelIndex01 + 1]) +
                    dy * ((1.0 - dx) * oldImageData.data[oldPixelIndex10 + 1] + dx * oldImageData.data[oldPixelIndex11 + 1]);
                newImageData.data[newPixelIndex + 2] =
                    (1.0 - dy) * ((1.0 - dx) * oldImageData.data[oldPixelIndex00 + 2] + dx * oldImageData.data[oldPixelIndex01 + 2]) +
                    dy * ((1.0 - dx) * oldImageData.data[oldPixelIndex10 + 2] + dx * oldImageData.data[oldPixelIndex11 + 2]);
                newImageData.data[newPixelIndex + 3] =
                    (1.0 - dy) * ((1.0 - dx) * oldImageData.data[oldPixelIndex00 + 3] + dx * oldImageData.data[oldPixelIndex01 + 3]) +
                    dy * ((1.0 - dx) * oldImageData.data[oldPixelIndex10 + 3] + dx * oldImageData.data[oldPixelIndex11 + 3]);
            }
        }

        return newImageData;
    };

    /**
     * Biquadratic interpolation resize.
     * @param oldImageData
     * @param newImageData
     * @param newWidth
     * @param newHeight
     * @returns {*}
     */
    var resizeBiquadraticInterpolation = function resizeBiquadraticInterpolation(oldImageData, newImageData, newWidth, newHeight) {
        var interpolate = function interpolate(f1, f2, f3, d) {
                return (f2 + (f3 - f1) * d + (f1 - 2 * f2 + f3) * d * d);
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
            x, y,
            x0, y0, x1, y1, x2, y2,
            dx, dy,
            oldPixelIndex00, oldPixelIndex01, oldPixelIndex02,
            oldPixelIndex10, oldPixelIndex11, oldPixelIndex12,
            oldPixelIndex20, oldPixelIndex21, oldPixelIndex22,
            newPixelIndex,
            i, j;

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
                }
                else {
                    x0 = x1;
                }

                if (y1 - 1 >= 0) {
                    y0 = y1 - 1;
                }
                else {
                    y0 = y1;
                }

                if (x1 + 1 >= oldWidth) {
                    x2 = x1;
                }
                else {
                    x2 = x1 + 1;
                }

                if (y1 + 1 >= oldWidth) {
                    y2 = y1;
                }
                else {
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

                newImageData.data[newPixelIndex] = (
                    interpolateNormalize(
                        interpolate(oldImageData.data[oldPixelIndex00], oldImageData.data[oldPixelIndex01], oldImageData.data[oldPixelIndex02], dx),
                        interpolate(oldImageData.data[oldPixelIndex10], oldImageData.data[oldPixelIndex11], oldImageData.data[oldPixelIndex12], dx),
                        interpolate(oldImageData.data[oldPixelIndex20], oldImageData.data[oldPixelIndex21], oldImageData.data[oldPixelIndex22], dx),
                        dy)
                );

                newImageData.data[newPixelIndex + 1] = (
                    interpolateNormalize(
                        interpolate(oldImageData.data[oldPixelIndex00 + 1], oldImageData.data[oldPixelIndex01 + 1], oldImageData.data[oldPixelIndex02 + 1], dx),
                        interpolate(oldImageData.data[oldPixelIndex10 + 1], oldImageData.data[oldPixelIndex11 + 1], oldImageData.data[oldPixelIndex12 + 1], dx),
                        interpolate(oldImageData.data[oldPixelIndex20 + 1], oldImageData.data[oldPixelIndex21 + 1], oldImageData.data[oldPixelIndex22 + 1], dx),
                        dy)
                );

                newImageData.data[newPixelIndex + 2] = (
                    interpolateNormalize(
                        interpolate(oldImageData.data[oldPixelIndex00 + 2], oldImageData.data[oldPixelIndex01 + 2], oldImageData.data[oldPixelIndex02 + 2], dx),
                        interpolate(oldImageData.data[oldPixelIndex10 + 2], oldImageData.data[oldPixelIndex11 + 2], oldImageData.data[oldPixelIndex12 + 2], dx),
                        interpolate(oldImageData.data[oldPixelIndex20 + 2], oldImageData.data[oldPixelIndex21 + 2], oldImageData.data[oldPixelIndex22 + 2], dx),
                        dy)
                );

                newImageData.data[newPixelIndex + 3] = (
                    interpolateNormalize(
                        interpolate(oldImageData.data[oldPixelIndex00 + 3], oldImageData.data[oldPixelIndex01 + 3], oldImageData.data[oldPixelIndex02 + 3], dx),
                        interpolate(oldImageData.data[oldPixelIndex10 + 3], oldImageData.data[oldPixelIndex11 + 3], oldImageData.data[oldPixelIndex12 + 3], dx),
                        interpolate(oldImageData.data[oldPixelIndex20 + 3], oldImageData.data[oldPixelIndex21 + 3], oldImageData.data[oldPixelIndex22 + 3], dx),
                        dy)
                );
            }
        }

        return newImageData;
    };

    /**
     * Crop given image data.
     * @param oldImageData
     * @param newImageData
     * @param startX
     * @param startY
     * @param width
     * @param height
     */
    var cropImageData = function (oldImageData, newImageData, startX, startY, width, height) {
        var oldWidth = oldImageData.width,
            newWidth = newImageData.width,
            x, y, xx, yy,
            firstOldPixelIndex, firstNewPixelIndex;

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
    };

    /**
     * HTML canvas wrapper
     * @constructor
     */
    var Canvas = function () {
        var canvas = null,
            context = null,
            width = 0,
            height = 0;

        /**
         * Initializer.
         * @param {int} width
         * @param {int} height
         */
        this.initialize = function (width, height) {
            if (isNode) {
                canvas = new nodeCanvas(width, height);
            }
            else {
                canvas = document.createElement("canvas");

                // hide from viewport
                canvas.style.position = "absolute";
                canvas.style.left = "-99999px";
                canvas.style.top = "-99999px";

                width && this.setWidth(width);
                height && this.setHeight(height);

                document.body.appendChild(canvas);
            }
        };

        /**
         * Setter for width.
         * @param {int} value
         * @returns {Canvas}
         */
        this.setWidth = function (value) {
            canvas.setAttribute("width", "" + value);
            width = value;
            return this;
        };

        /**
         * Setter for height.
         * @param {int} value
         * @returns {Canvas}
         */
        this.setHeight = function (value) {
            canvas.setAttribute("height", "" + value);
            height = value;
            return this;
        };

        /**
         * Getter for context.
         * @returns {*}
         */
        this.getContext = function () {
            if (!context) {
                context = canvas.getContext("2d");
            }
            return context;
        };

        /**
         * Get HTML element.
         */
        this.getCanvas = function () {
            return canvas;
        };

        /**
         * Export canvas to data url
         * @param {string} type
         * @returns {string|*}
         */
        this.toDataURL = function (type) {
            return canvas.toDataURL(type);
        };

        /**
         * Removes canvas from DOM.
         */
        this.destroy = function () {
            if (!isNode) {
                document.body.removeChild(canvas);
            }
        };

        // call initializer
        this.initialize.apply(this, arguments);
    };

    /**
     * Parent class for object put on layer.
     * @type {Object}
     */
    var baseOnLayerObject = {
        __constructor: function () {
            this.imageData = null;
            this.canvas = null;
            this.width = 0;
            this.height = 0;
        },

        /**
         * Width getter.
         * @returns {number}
         */
        getWidth: function () {
            return this.width;
        },

        /**
         * Width setter
         * @param {int} val
         * @returns {baseOnLayerObject}
         */
        setWidth: function (val) {
            this.width = val;
            return this;
        },

        /**
         * Height getter.
         * @returns {number}
         */
        getHeight: function () {
            return this.height;
        },

        /**
         * Height setter;
         * @param val
         * @returns {baseOnLayerObject}
         */
        setHeight: function (val) {
            this.height = val;
            return this;
        },

        /**
         * Get ImageData of *loaded* image.
         * @returns {ImageData}
         */
        getImageData: function () {
            if (!this.imageData) {
                this.imageData = this.canvas.getContext().getImageData(0, 0, this.getWidth(), this.getHeight());
            }
            return this.imageData;
        },

        /**
         * Set image data
         * @param {ImageData} val
         */
        setImageData: function (val) {
            this.imageData = val;
            return this;
        },

        /**
         * Resize by given mode
         */
        resize: function (newWidth, newHeight, mode) {
            mode = mode || "nearest-neighbour";

            var oldImageData = this.getImageData(),
                canvas = new Canvas(newWidth, newHeight),
                newImageData = canvas.getContext().createImageData(newWidth, newHeight);

            switch (mode) {
                case "nearest-neighbour":
                    newImageData = resizeNearestNeighbour(oldImageData, newImageData, newWidth, newHeight);
                    break;

                case "bilinear-interpolation":
                    newImageData = resizeBilinearInterpolation(oldImageData, newImageData, newWidth, newHeight);
                    break;

                case "biquadratic-interpolation":
                    newImageData = resizeBiquadraticInterpolation(oldImageData, newImageData, newWidth, newHeight);
                    break;

                default:
                    canvas.destroy();
                    return this;
            }

            canvas.destroy();

            return this.setWidth(newWidth)
                .setHeight(newHeight)
                .setImageData(newImageData);
        }
    };

    /**
     * Image object on layer.
     * @type {Function}
     * @constructor
     */
    var ImageObj = helpers.inherit(baseOnLayerObject, {
        __constructor: function () {
            this.__super();
            this.url = null;

            if (isNode) {
                this.image = new nodeCanvas.Image();
            }
            else {
                this.image = new Image();

                // hide from viewport
                this.image.style.position = "absolute";
                this.image.style.left = "-99999px";
                this.image.style.top = "-99999px";
            }
        },
        /**
         * Load image and execute callback on load.
         * @param {string} url
         * @param {function} callback
         */
        load: function (url, callback) {
            var _this = this,
                fs,
                load = function load() {
                    _this.setWidth(isNode ? _this.image.width : _this.image.clientWidth);
                    _this.setHeight(isNode ? _this.image.height : _this.image.clientHeight);

                    // get image data
                    _this.canvas = new Canvas(_this.getWidth(), _this.getHeight());
                    _this.canvas.getContext().drawImage(_this.image, 0, 0, _this.getWidth(), _this.getHeight());

                    if (typeof callback === "function") {
                        callback.call(_this);
                    }

                    // clean
                    if (!isNode) {
                        document.body.removeChild(_this.image);
                    }
                    _this.canvas.destroy();
                };

            this.url = url;

            if (!isNode) {
                document.body.appendChild(this.image);
                this.image.src = url;
                this.image.onload = function () {
                    load();
                };
            }
            else {
                fs = require("fs");
                this.image.src = fs.readFileSync(url);
                load();
            }
        }
    });

    /**
     * Style object for text.
     * @constructor
     */
    var StyleObj = function () {
        this.fontFamily = "Arial";
        this.fontSize = "12px";
        this.fontStyle = "normal";
        this.fillStyle = "black";

        /**
         *
         * @param val
         * @returns {StyleObj}
         */
        this.setFontStyle = function (val) {
            this.fontStyle = val;
            return this;
        };
        /**
         *
         * @param val
         * @returns {StyleObj}
         */
        this.setFontSize = function (val) {
            this.fontSize = val;
            return this;
        };
        /**
         *
         * @param val
         * @returns {StyleObj}
         */
        this.setFontFamily = function (val) {
            this.fontFamily = val;
            return this;
        };

        /**
         *
         * @returns {string}
         */
        this.getFontStyle = function () {
            return this.fontStyle + " " + this.fontSize + " " + this.fontFamily;
        };

        /**
         *
         * @returns {String}
         */
        this.getFillStyle = function () {
            return this.fillStyle;
        };
    };

    /**
     * Text object put on layer.
     * @type {Function}
     */
    var TextObj = helpers.inherit(baseOnLayerObject, {
        __constructor: function (width, height) {
            this.__super();

            this.width = width;
            this.height = height;
            this.canvas = new Canvas(width, height);
            this.context = this.canvas.getContext();

            this.style = (new StyleObj());
        },
        /**
         * Getter for style object. If createNew is true then get the new style.
         * @param {Boolean} [createNew]
         * @returns {StyleObj}
         */
        getStyle: function (createNew) {
            if (createNew) {
                return (new StyleObj());
            }
            return this.style;
        },
        /**
         *
         * @param {String} text
         * @param {int} x
         * @param {int} y
         * @param {StyleObj} style
         * @returns {TextObj}
         */
        write: function (text, x, y, style) {
            style = style || this.getStyle();
            this.canvas.getContext().font = style.getFontStyle();
            this.canvas.getContext().fillStyle = style.getFillStyle();
            this.canvas.getContext().fillText(text, x, y);
            return this;
        }
    });

    /**
     * Project object. Holds dimensions and layers.
     * @param {int} paramWidth
     * @param {int} paramHeight
     * @param {Object} params
     * @constructor
     */
    var Project = function (paramWidth, paramHeight, params) {
        params = params || {};

        var canvas = null,
            imageData = null,
            effects = [],
            layers = [],
            startTime = new Date(),
            parameters = {},
            width,
            height;

        /**
         * Initializer.
         * @param {int} width
         * @param {int} height
         * @param params
         */
        this.initialize = function (paramWidth, paramHeight, params) {
            width = paramWidth;
            height = paramHeight;

            // create tmp canvas
            canvas = new Canvas(width, height);
            imageData = canvas.getContext().getImageData(0, 0, width, height);

            parameters = params;
        };

        /**
         * Create new layer.
         * @params {Object} [params] Additional parameters such as: blending mode
         * @returns {Imagizer.Layer}
         */
        this.createLayer = function (params) {
            var layer = new Imagizer.Layer(width, height, params);
            layers.push(layer);
            return layer;
        };

        /**
         * Get time diff. Debug method.
         * @returns {number}
         */
        this.getTime = function () {
            var end = new Date();
            return end.getTime() - startTime.getTime();
        };

        /**
         * Export project to image and append result image to object chosen by selector..
         * @param {string} selector
         * @param {string} imageType
         */
        this.exportTo = function (selector, imageType) {
            imageType = imageType || "image/png";

            var i,
                container,
                exportedImage = isNode ? null : new Image();

            for (i = 0; i < layers.length; i++) {
                imageData = mergeImageData({
                    width: width,
                    height: height,
                    imageData: imageData
                }, {
                    x: layers[i].getX(),
                    y: layers[i].getY(),
                    width: layers[i].getWidth(),
                    height: layers[i].getHeight(),
                    imageData: layers[i].exportLayer(),
                    blendingMode: layers[i].getParameter("blendingMode")
                }, mergePixelCallback);
            }

            for (i = 0; i < effects.length; i++) {
                imageData = effects[i].effect.run(imageData, effects[i].params);
            }

            canvas.getContext().putImageData(imageData, 0, 0);

            if (isNode) {
                var fs = require("fs"),
                    img = canvas.toDataURL(),
                    data = img.replace(/^data:image\/\w+;base64,/, ""),
                    buff = new Buffer(data, 'base64');

                fs.writeFile(selector, buff);
            }
            else {
                container = document.querySelector(selector);
                exportedImage.src = canvas.toDataURL(imageType);
                container.appendChild(exportedImage);
            }
        };

        /**
         * Apply effect on whole project.
         */
        this.applyEffect = function () {
            effects.push({
                name: arguments[0],
                effect: Effects.get(arguments[0]),
                params: arguments[1]
            });
        };

        /**
         * Resize project. Its converts all canvases in layers to new canvases.
         * @param {int} newWidth
         * @param {int} newHeight
         * @param {string} mode
         * @returns {Project}
         */
        this.resize = function (newWidth, newHeight, mode) {
            var i;

            canvas.destroy();

            this.initialize(newWidth, newHeight, parameters);

            for (i = 0; i < layers.length; i += 1) {
                layers[i].resize(width, height, mode);
            }

            return this;
        };

        // call initializer
        this.initialize(paramWidth, paramHeight, params);
    };

    /**
     * Wrapper for object placed on layer.
     * @param {Window.Imagizer.Image} obj
     * @param {Layer} layer
     * @param {int} x
     * @param {int} y
     * @param {object} opts
     * @constructor
     */
    var LayerObject = function (obj, layer, x, y, opts) {
        var data = {
            obj: obj,
            x: x,
            y: y,
            opts: opts,
            layer: layer,
            effects: []
        };

        /**
         * Getter for object placed on layer.
         * @returns {*}
         */
        this.getObject = function () {
            return data.obj;
        };

        /**
         * Get start x position of placed object.
         * @returns {int}
         */
        this.getX = function () {
            return data.x;
        };

        /**
         * Get start y position of placed object.
         * @returns {int}
         */
        this.getY = function () {
            return data.y;
        };

        /**
         * Get width of wrapped object.
         * @returns {int}
         */
        this.getWidth = function () {
            return data.obj.getWidth();
        };

        /**
         * Get height of wrapped object.
         * @returns {int}
         */
        this.getHeight = function () {
            return data.obj.getHeight();
        };

        /**
         * Get ImageData array of placed object.
         * @returns {ImageData}
         */
        this.exportObject = function () {
            var imageData = data.obj.getImageData(), i;
            for (i = 0; i < data.effects.length; i++) {
                imageData = data.effects[i].effect.run(imageData, data.effects[i].params);
            }
            return imageData;
        };

        /**
         * Apply effect object put on layer.
         */
        this.applyEffect = function () {
            data.effects.push({
                name: arguments[0],
                effect: Effects.get(arguments[0]),
                params: arguments[1]
            });
        };

        /**
         * Move object.
         * @param x
         * @param y
         * @returns {LayerObject}
         */
        this.moveXY = function (x, y) {
            this.moveX(x);
            this.moveY(y);
            return this;
        };

        /**
         * Move horizontal object.
         * @param x
         * @returns {LayerObject}
         */
        this.moveX = function (x) {
            data.x += (x | 0);
            return this;
        };

        /**
         * Move horizontal object.
         * @param y
         * @returns {LayerObject}
         */
        this.moveY = function (y) {
            data.y += (y | 0);
            return this;
        };

        /**
         * Set position.
         * @param x
         * @param y
         */
        this.setXY = function (x, y) {
            this.setX(x);
            this.setY(y);
            return this;
        };

        /**
         * Set horizontal position
         * @param x
         * @returns {LayerObject}
         */
        this.setX = function (x) {
            data.x = x;
            return this;
        };

        /**
         * Set vertical position
         * @param y
         * @returns {LayerObject}
         */
        this.setY = function (y) {
            data.y = y;
            return this;
        };

        /**
         * Resize wrapped object.
         * @param {int} newWidth
         * @param {int} newHeight
         * @param {string} mode
         * @param {boolean} isLayerResize
         * @returns {LayerObject}
         */
        this.resize = function (newWidth, newHeight, mode, isLayerResize) {
            var oldWidth = this.getWidth(),
                oldHeight = this.getHeight(),
                ratioX = newWidth / oldWidth,
                ratioY = newHeight / oldHeight;

            if (isLayerResize) {
                this.moveXY(-this.getX() * ratioX, -this.getY() * ratioY);
            }

            this.getObject().resize(newWidth, newHeight, mode);

            return this;
        };

        /**
         * Crop an object,
         * @param {int} startX
         * @param {int} startY
         * @param {int} width
         * @param {int} height
         */
        this.crop = function (startX, startY, width, height) {
            var object = this.getObject(),
                oldImageData = object.getImageData(),
                canvas = new Canvas(width, height),
                newImageData = canvas.getContext().createImageData(width, height);

            newImageData = cropImageData(oldImageData, newImageData, startX, startY, width, height);

            object
                .setImageData(newImageData)
                .setWidth(width)
                .setHeight(height);

            this.setXY(startX, startY);

            return this;
        };
    };

    /**
     * Layer object. Holds object and effects.
     * @constructor
     */
    var Layer = function () {
        var canvas = null,
            imageData = null,
            objects = [],
            effects = [],
            width = 0,
            height = 0,
            parameters = {},
            x = 0,
            y = 0;

        /**
         * Initializer.
         */
        this.initialize = function () {
            width = arguments[0];
            height = arguments[1];

            parameters = arguments[2] || {};

            canvas = new Canvas(width, height);
            imageData = canvas.getContext().createImageData(width, height);

            if (parameters.background_color && parameters.background_color !== "transparent") {
                this.applyEffect("fill-color", {
                    color: parameters.background_color
                });
            }
        };

        /**
         * Put object on layer
         * @param {Window.Imagizer.Image|Window.Imagizer.SimpleText} obj Object that we want to put on layer
         * @param {int} startX Start x position of object on layer
         * @param {int} startY Start y position of object on layer
         */
        this.put = function (obj, startX, startY) {
            var put = new LayerObject(obj, this, startX, startY, {});
            objects.push(put);
            return put;
        };

        /**
         * Exports layer to container -> selector.
         * @param selector
         * @param imageType
         */
        this.exportTo = function (selector, imageType) {
            imageType = imageType || "image/png";

            this.exportLayer();

            var container = document.querySelector(selector),
                exportedImage = isNode ? new nodeCanvas.Image() : new Image();

            exportedImage.src = canvas.toDataURL(imageType);
            container.appendChild(exportedImage);
        };

        /**
         * Merge all object on layer to one ImageData array.
         * @returns {ImageData}
         */
        this.exportLayer = function () {
            var i,
                layerObject;

            for (i = 0; i < objects.length; i += 1) {
                layerObject = objects[i];
                imageData = mergeImageData({
                    width: width,
                    height: height,
                    imageData: imageData
                }, {
                    x: layerObject.getX(),
                    y: layerObject.getY(),
                    width: layerObject.getWidth(),
                    height: layerObject.getHeight(),
                    imageData: layerObject.exportObject()
                }, mergePixelCallback);
            }

            for (i = 0; i < effects.length; i++) {
                imageData = effects[i].effect.run(imageData, effects[i].params);
            }

            return imageData;
        };

        /**
         * Apply effect on whole layer.
         */
        this.applyEffect = function () {
            effects.push({
                name: arguments[0],
                effect: Effects.get(arguments[0]),
                params: arguments[1]
            });
        };

        /**
         * Resize all objects on layer.
         */
        this.resize = function (newWidth, newHeight, mode) {
            var i;

            canvas.destroy();

            this.initialize(newWidth, newHeight, parameters);

            for (i = 0; i < objects.length; i += 1) {
                objects[i].resize(newWidth, newHeight, mode, true);
            }

            return this;
        };

        /**
         * Crop all objects on layer.
         */
        this.crop = function (startX, startY, width, height) {
            var i;

            for (i = 0; i < objects.length; i += 1) {
                objects[i].crop(startX, startY, width, height);
            }

            return this;
        };

        /**
         * Move all objects on layer.
         * @param {int} x
         * @param {int} y
         * @returns {Layer}
         */
        this.moveXY = function (x, y) {
            this.moveX(x);
            this.moveY(y);
            return this;
        };

        /**
         * Move horizontal all objects on layer.
         * @param x
         */
        this.moveX = function (xParam) {
            x += (xParam | 0);
            return this;
        };

        /**
         * Move vertical all objects on layer.
         * @param y
         */
        this.moveY = function (yParam) {
            y += (yParam | 0);
            return this;
        };

        /**
         * Setter for x.
         * @param x
         * @returns {Layer}
         */
        this.setX = function (xParam) {
            x = xParam | 0;
            return this;
        };

        /**
         * Setter for y.
         * @param y
         * @returns {Layer}
         */
        this.setY = function (yParam) {
            y = yParam | 0;
            return this;
        };

        /**
         * Sets blending mode on layer.
         * @param blendingMode
         * @returns {Layer}
         */
        this.setBlendingMode = function (blendingMode) {
            parameters.blendingMode = blendingMode;
            return this;
        };

        /**
         * Getter for x.
         * @returns {number}
         */
        this.getX = function () {
            return x;
        };

        /**
         * Getter for y.
         * @returns {number}
         */
        this.getY = function () {
            return y;
        };

        /**
         * Getter for width.
         * @returns {number}
         */
        this.getWidth = function () {
            return width;
        };

        /**
         * Getter for height.
         * @returns {number}
         */
        this.getHeight = function () {
            return height;
        };

        /**
         * Getter for parameter with given name.
         * @param name
         * @returns {*}
         */
        this.getParameter = function (name) {
            return parameters[name];
        };

        // call initializer
        this.initialize.apply(this, arguments);
    };

    /**
     * PointEffect - wrapper for callback function executed on each pixel
     * @constructor
     */
    var PointEffect = function (params) {
        var callback = params.callback,
            additionalParameters = params.opts;

        /**
         * Run effect
         * @param {ImageData} imageData
         * @param {Array} parameters
         * @returns {ImageData}
         */
        this.run = function (imageData, parameters) {
            additionalParameters && additionalParameters.defaults && (parameters = helpers.extend(additionalParameters.defaults, parameters));

            var x, y,
                firstPixelIndex,
                result,
                imageDataCopy = new Uint8ClampedArray(imageData.data), // copy image data
                i,
                /**
                 * Get ImageData array index from x and y position
                 * @param x
                 * @param y
                 * @returns {number}
                 */
                getIndex = function getIndex(x, y) {
                    return y * imageData.width * 4 + x * 4;
                },
                normalizePixelValue = function (value) {
                    return Math.min(Math.max(value, 0), 255) | 0;
                },
                sandbox = { // object invoked as this in effect callback
                    /**
                     * Get changed pixel
                     * @param {int} x
                     * @param {int} y
                     * @returns {{r: *, g: *, b: *, a: *}}
                     */
                    getPixel: function (x, y) {
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
                    getOriginalPixel: function (x, y) {
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
                    setPixel: function (x, y, rgba) {
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

            sandbox.data = (additionalParameters && typeof additionalParameters.before === "function")
                ? additionalParameters.before.call(sandbox, parameters, imageData.width, imageData.height, imageData)
                : {};

            for (y = 0; y < imageData.height; y += 1) {
                for (x = 0; x < imageData.width; x += 1) {
                    firstPixelIndex = getIndex(x, y);

                    result = callback.call(sandbox,
                        {
                            r: imageDataCopy[firstPixelIndex + 0],
                            g: imageDataCopy[firstPixelIndex + 1],
                            b: imageDataCopy[firstPixelIndex + 2],
                            a: imageDataCopy[firstPixelIndex + 3]
                        },
                        x,
                        y,
                        parameters,
                        imageData.width,
                        imageData.height
                    );

                    if (typeof result === "object") {
                        imageDataCopy[firstPixelIndex + 0] = normalizePixelValue(result.r);
                        imageDataCopy[firstPixelIndex + 1] = normalizePixelValue(result.g);
                        imageDataCopy[firstPixelIndex + 2] = normalizePixelValue(result.b);
                        imageDataCopy[firstPixelIndex + 3] = normalizePixelValue(result.a);
                    }
                }
            }

            // node canvas fix
            if (isNode) {
                for (i = 0; i < imageDataCopy.length; i += 1) {
                    imageData.data[i] = imageDataCopy[i];
                }
            }
            else {
                imageData.data.set(imageDataCopy);
            }
            return imageData;
        };
    };

    /**
     * TransformEffect - used in effects where we move pixels
     * @param params
     * @constructor
     */
    var TransformEffect = function (params) {
        var callback = params.callback,
            additionalParameters = params.opts;

        /**
         * Run effect
         * @param {ImageData} imageData
         * @param {Array} parameters
         * @returns {ImageData}
         */
        this.run = function (imageData, parameters) {
            additionalParameters && additionalParameters.defaults && (parameters = helpers.extend(additionalParameters.defaults, parameters));

            var x, y,
                i,
                normalizePixelValue = function (value) {
                    return Math.min(Math.max(value, 0), 255) | 0;
                },
                sandbox = {
                    data: null
                },
                imageDataCopy = new Uint8ClampedArray(imageData.data);

            sandbox.data = (additionalParameters && typeof additionalParameters.before === "function")
                ? additionalParameters.before.call(null, parameters, imageData.width, imageData.height, imageData)
                : {};

            for (y = 0; y < imageData.height; y += 1) {
                for (x = 0; x < imageData.width; x += 1) {
                    var newXY = callback.call(sandbox, x, y, parameters, imageData.width, imageData.height),
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

            if (isNode) {
                for (i = 0; i < imageDataCopy.length; i += 1) {
                    imageData.data[i] = imageDataCopy[i];
                }
            }
            else {
                imageData.data.set(imageDataCopy);
            }
            return imageData;
        };

    };

    var CustomEffect = function (params) {
        var callback = params.callback,
            additionalParameters = params.opts;

        /**
         * Run effect
         * @param {ImageData} imageData
         * @param {Array} parameters
         * @returns {ImageData}
         */
        this.run = function (imageData, parameters) {
            additionalParameters && additionalParameters.defaults && (parameters = helpers.extend(additionalParameters.defaults, parameters));

            var x, y,
                firstPixelIndex,
                result,
                pixelMap = [],
                imageDataCopy = new Uint8ClampedArray(imageData.data), // copy image data
                i,
                /**
                 * Get ImageData array index from x and y position
                 * @param x
                 * @param y
                 * @returns {number}
                 */
                getIndex = function getIndex(x, y) {
                    return y * imageData.width * 4 + x * 4;
                },
                normalizePixelValue = function (value) {
                    return Math.min(Math.max(value, 0), 255) | 0;
                },
                sandbox = { // object invoked as this in effect callback
                    /**
                     * Get changed pixel
                     * @param {int} x
                     * @param {int} y
                     * @returns {{r: *, g: *, b: *, a: *}}
                     */
                    getPixel: function (x, y) {
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
                    getOriginalPixelByIndex: function (index) {
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
                    getOriginalPixel: function (x, y) {
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
                    setPixel: function (x, y, rgba) {
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
                    setPixelByIndex: function (index, rgba) {
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

            sandbox.data = (additionalParameters && typeof additionalParameters.before === "function")
                ? additionalParameters.before.call(sandbox, parameters, imageData.width, imageData.height, imageData)
                : {};

            callback.call(sandbox, imageData.width, imageData.height, parameters);

            if (isNode) {
                for (i = 0; i < imageDataCopy.length; i += 1) {
                    imageData.data[i] = imageDataCopy[i];
                }
            }
            else {
                imageData.data.set(imageDataCopy);
            }

            return imageData;
        };
    };

    /**
     * Helper for creating effect object.
     */
    var Effects = new function () {
        var effects = {};

        /**
         * Defines a single pixel effects. Most used by filters.
         * @param name
         * @param pixelCallback
         * @param [opts]
         */
        this.definePoint = function (name, pixelCallback, opts) {
            effects[name] = new PointEffect({
                callback: pixelCallback,
                opts: opts
            });
        };

        /**
         * Define effect that distort image in some way.
         * @param name
         * @param callback
         * @param opts
         */
        this.defineTransform = function (name, callback, opts) {
            effects[name] = new TransformEffect({
                callback: callback,
                opts: opts
            });
        };

        /**
         * Define custom effect - own loop on pixel map.
         * @param name
         * @param callback
         * @param opts
         */
        this.defineCustom = function (name, callback, opts) {
            effects[name] = new CustomEffect({
                callback: callback,
                opts: opts
            });
        };

        /**
         * Getter for effect - get by given name
         * @param {string} name
         * @returns {Effect}
         */
        this.get = function (name) {
            if (!effects[name]) {
                throw "Effect '" + name + "' doesn't exists."
            }
            return effects[name];
        };
    };

    /*
     EFFECTS DEFINITIONS
     Thanks to Jerry and his Java Image Filters.
     http://www.jhlabs.com/ip/filters/index.html
     */

    Effects.definePoint("gray-scale", function (pixel, x, y) {
        var newRGB = 0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b;
        return {
            r: newRGB,
            g: newRGB,
            b: newRGB,
            a: pixel.a
        };
    });

    Effects.definePoint("sepia", function (pixel, x, y, parameters) {
        var tmp = 0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b;

        pixel.r = tmp + 2 * parameters.sepiaValue;
        pixel.g = tmp + parameters.sepiaValue;
        pixel.b = tmp;

        return pixel;
    }, {
        defaults: {
            sepiaValue: 1
        }
    });

    Effects.definePoint("contrast", function (pixel) {
        pixel.r = this.data.factor * (pixel.r - 128) + 128;
        pixel.g = this.data.factor * (pixel.g - 128) + 128;
        pixel.b = this.data.factor * (pixel.b - 128) + 128;

        return pixel;
    }, {
        defaults: {
            contrast: 0.5
        },
        before: function (parameters) {
            return {
                factor: (259 * ((parameters.contrast * 255) + 255)) / (255 * (259 - (parameters.contrast * 255)))
            };
        }
    });

    Effects.definePoint("brightness", function (pixel) {
        pixel.r = pixel.r + this.data.brightness;
        pixel.g = pixel.g + this.data.brightness;
        pixel.b = pixel.b + this.data.brightness;

        return pixel;
    }, {
        defaults: {
            brightness: 0.5
        },
        before: function (parameters) {
            return {
                brightness: 255 * parameters.brightness
            };
        }
    });

    Effects.definePoint("diffusion", function (pixel, x, y, parameters, width, height) {
        var red1 = pixel.r,
            green1 = pixel.g,
            blue1 = pixel.b,
            red2, green2, blue2,
            data = this.data,
            tmpPixel,
            tmpRed, tmpGreen, tmpBlue,
            i, j,
            iy, jx,
            w;

        if (!parameters.colorDither) {
            var grayScale = (red1 + green1 + blue1) / 3;
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
                        tmpPixel.r += (tmpRed * w / data.sum);
                        tmpPixel.g += (tmpGreen * w / data.sum);
                        tmpPixel.b += (tmpBlue * w / data.sum);
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
    }, {
        defaults: {
            matrix: [0, 0, 0, 0, 0, 7, 3, 5, 1],
            levels: 6,
            colorDither: true,
            granulate: true
        },
        before: function (parameters, width, height) {
            var i, sum = 0, map = [], div = [];

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
    });

    Effects.definePoint("dither", function (pixel, x, y, parameters, width, height) {
        var col = x % this.data.cols,
            row = y % this.data.rows,
            v = parameters.matrix[row * this.data.cols + col],
            red = pixel.r, green = pixel.g, blue = pixel.b,
            result = {a: pixel.a};

        if (parameters.colorDither) {
            result.r = this.data.map[this.data.mod[red] > v ? this.data.div[red] + 1 : this.data.div[red]];
            result.g = this.data.map[this.data.mod[green] > v ? this.data.div[green] + 1 : this.data.div[green]];
            result.b = this.data.map[this.data.mod[blue] > v ? this.data.div[blue] + 1 : this.data.div[blue]];
        }
        else {
            var value = (red + green + blue) / 3;
            result.r = result.g = result.b = this.data.map[this.data.mod[value] > v ? this.data.div[value] + 1 : this.data.div[value]];
        }

        return result;
    }, {
        before: function (parameters, width, height) {
            var matrix = parameters.matrix,
                rows, cols,
                map = [], div = [], mod = [],
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
        },
        defaults: {
            matrices: {
                ditherMagic4x4Matrix: [
                    0, 14, 3, 13,
                    11, 5, 8, 6,
                    12, 2, 15, 1,
                    7, 9, 4, 10
                ],
                ditherOrdered4x4Matrix: [
                    0, 8, 2, 10,
                    12, 4, 14, 6,
                    3, 11, 1, 9,
                    15, 7, 13, 5
                ],
                ditherLines4x4Matrix: [
                    0, 1, 2, 3,
                    4, 5, 6, 7,
                    8, 9, 10, 11,
                    12, 13, 14, 15
                ],
                dither90Halftone6x6Matrix: [
                    29, 18, 12, 19, 30, 34,
                    17, 7, 4, 8, 20, 28,
                    11, 3, 0, 1, 9, 27,
                    16, 6, 2, 5, 13, 26,
                    25, 15, 10, 14, 21, 31,
                    33, 25, 24, 23, 33, 36
                ],
                ditherOrdered6x6Matrix: [
                    1, 59, 15, 55, 2, 56, 12, 52,
                    33, 17, 47, 31, 34, 18, 44, 28,
                    9, 49, 5, 63, 10, 50, 6, 60,
                    41, 25, 37, 21, 42, 26, 38, 22,
                    3, 57, 13, 53, 0, 58, 14, 54,
                    35, 19, 45, 29, 32, 16, 46, 30,
                    11, 51, 7, 61, 8, 48, 4, 62,
                    43, 27, 39, 23, 40, 24, 36, 20
                ],
                ditherOrdered8x8Matrix: [
                    1, 235, 59, 219, 15, 231, 55, 215, 2, 232, 56, 216, 12, 228, 52, 212,
                    129, 65, 187, 123, 143, 79, 183, 119, 130, 66, 184, 120, 140, 76, 180, 116,
                    33, 193, 17, 251, 47, 207, 31, 247, 34, 194, 18, 248, 44, 204, 28, 244,
                    161, 97, 145, 81, 175, 111, 159, 95, 162, 98, 146, 82, 172, 108, 156, 92,
                    9, 225, 49, 209, 5, 239, 63, 223, 10, 226, 50, 210, 6, 236, 60, 220,
                    137, 73, 177, 113, 133, 69, 191, 127, 138, 74, 178, 114, 134, 70, 188, 124,
                    41, 201, 25, 241, 37, 197, 21, 255, 42, 202, 26, 242, 38, 198, 22, 252,
                    169, 105, 153, 89, 165, 101, 149, 85, 170, 106, 154, 90, 166, 102, 150, 86,
                    3, 233, 57, 217, 13, 229, 53, 213, 0, 234, 58, 218, 14, 230, 54, 214,
                    131, 67, 185, 121, 141, 77, 181, 117, 128, 64, 186, 122, 142, 78, 182, 118,
                    35, 195, 19, 249, 45, 205, 29, 245, 32, 192, 16, 250, 46, 206, 30, 246,
                    163, 99, 147, 83, 173, 109, 157, 93, 160, 96, 144, 80, 174, 110, 158, 94,
                    11, 227, 51, 211, 7, 237, 61, 221, 8, 224, 48, 208, 4, 238, 62, 222,
                    139, 75, 179, 115, 135, 71, 189, 125, 136, 72, 176, 112, 132, 68, 190, 126,
                    43, 203, 27, 243, 39, 199, 23, 253, 40, 200, 24, 240, 36, 196, 20, 254,
                    171, 107, 155, 91, 167, 103, 151, 87, 168, 104, 152, 88, 164, 100, 148, 84
                ],
                ditherCluster3Matrix: [
                    9, 11, 10, 8, 6, 7,
                    12, 17, 16, 5, 0, 1,
                    13, 14, 15, 4, 3, 2,
                    8, 6, 7, 9, 11, 10,
                    5, 0, 1, 12, 17, 16,
                    4, 3, 2, 13, 14, 15
                ],
                ditherCluster4Matrix: [
                    18, 20, 19, 16, 13, 11, 12, 15,
                    27, 28, 29, 22, 4, 3, 2, 9,
                    26, 31, 30, 21, 5, 0, 1, 10,
                    23, 25, 24, 17, 8, 6, 7, 14,
                    13, 11, 12, 15, 18, 20, 19, 16,
                    4, 3, 2, 9, 27, 28, 29, 22,
                    5, 0, 1, 10, 26, 31, 30, 21,
                    8, 6, 7, 14, 23, 25, 24, 17
                ],
                ditherCluster8Matrix: [
                    64, 69, 77, 87, 86, 76, 68, 67, 63, 58, 50, 40, 41, 51, 59, 60,
                    70, 94, 100, 109, 108, 99, 93, 75, 57, 33, 27, 18, 19, 28, 34, 52,
                    78, 101, 114, 116, 115, 112, 98, 83, 49, 26, 13, 11, 12, 15, 29, 44,
                    88, 110, 123, 124, 125, 118, 107, 85, 39, 17, 4, 3, 2, 9, 20, 42,
                    89, 111, 122, 127, 126, 117, 106, 84, 38, 16, 5, 0, 1, 10, 21, 43,
                    79, 102, 119, 121, 120, 113, 97, 82, 48, 25, 8, 6, 7, 14, 30, 45,
                    71, 95, 103, 104, 105, 96, 92, 74, 56, 32, 24, 23, 22, 31, 35, 53,
                    65, 72, 80, 90, 91, 81, 73, 66, 62, 55, 47, 37, 36, 46, 54, 61,
                    63, 58, 50, 40, 41, 51, 59, 60, 64, 69, 77, 87, 86, 76, 68, 67,
                    57, 33, 27, 18, 19, 28, 34, 52, 70, 94, 100, 109, 108, 99, 93, 75,
                    49, 26, 13, 11, 12, 15, 29, 44, 78, 101, 114, 116, 115, 112, 98, 83,
                    39, 17, 4, 3, 2, 9, 20, 42, 88, 110, 123, 124, 125, 118, 107, 85,
                    38, 16, 5, 0, 1, 10, 21, 43, 89, 111, 122, 127, 126, 117, 106, 84,
                    48, 25, 8, 6, 7, 14, 30, 45, 79, 102, 119, 121, 120, 113, 97, 82,
                    56, 32, 24, 23, 22, 31, 35, 53, 71, 95, 103, 104, 105, 96, 92, 74,
                    62, 55, 47, 37, 36, 46, 54, 61, 65, 72, 80, 90, 91, 81, 73, 66
                ]
            },
            levels: 6,
            matrix: "ditherMagic4x4Matrix",
            colorDither: true
        }
    });

    Effects.definePoint("exposure", function (pixel, x, y, parameters, width, height) {
        pixel.r = (1 - Math.exp(-pixel.r / 255 * parameters.exposure)) * 255;
        pixel.g = (1 - Math.exp(-pixel.g / 255 * parameters.exposure)) * 255;
        pixel.b = (1 - Math.exp(-pixel.b / 255 * parameters.exposure)) * 255;

        return pixel;
    }, {
        defaults: {
            exposure: 1
        }
    });

    Effects.definePoint("gain", function (pixel, x, y, parameters, width, height) {
        var red = (1 / parameters.gain - 2) * (1 - 2 * pixel.r / 255),
            green = (1 / parameters.gain - 2) * (1 - 2 * pixel.g / 255),
            blue = (1 / parameters.gain - 2) * (1 - 2 * pixel.b / 255);

        if (pixel.r / 255 < 0.5) {
            red = (pixel.r / 255) / red + 1;
        }
        else {
            red = (red - (pixel.r / 255)) / (red - 1);
        }

        if (pixel.g / 255 < 0.5) {
            green = (pixel.g / 255) / green + 1;
        }
        else {
            green = (green - (pixel.g / 255)) / (green - 1);
        }

        if (pixel.b / 255 < 0.5) {
            blue = (pixel.b / 255) / blue + 1;
        }
        else {
            blue = (blue - (pixel.b / 255)) / (blue - 1);
        }

        red = red / ((1 / parameters.bias - 2) * (1 - red) + 1);
        green = green / ((1 / parameters.bias - 2) * (1 - green) + 1);
        blue = blue / ((1 / parameters.bias - 2) * (1 - blue) + 1);

        pixel.r = red * 255;
        pixel.g = green * 255;
        pixel.b = blue * 255;

        return pixel;
    }, {
        defaults: {
            gain: 1,
            bias: 1
        }
    });

    Effects.definePoint("gamma", function (pixel, x, y, parameters, width, height) {
        return {
            r: this.data.table.r[pixel.r],
            g: this.data.table.g[pixel.g],
            b: this.data.table.b[pixel.b],
            a: pixel.a
        };
    }, {
        defaults: {
            gammaRed: 1,
            gammaGreen: 1,
            gammaBlue: 1
        },
        before: function (parameters, width, height) {
            var table = {
                r: [],
                g: [],
                b: []
            }, i;

            for (i = 0; i < 256; i += 1) {
                table.r[i] = parseInt(((255 * Math.pow(i / 255, 1 / parameters.gammaRed)) + 0.5));
                table.g[i] = parseInt(((255 * Math.pow(i / 255, 1 / parameters.gammaGreen)) + 0.5));
                table.b[i] = parseInt(((255 * Math.pow(i / 255, 1 / parameters.gammaBlue)) + 0.5));
            }

            return {
                table: table
            };
        }
    });

    Effects.definePoint("gray", function (pixel, x, y, parameters, width, height) {
        return {
            r: (pixel.r + 255) / 2,
            g: (pixel.g + 255) / 2,
            b: (pixel.b + 255) / 2,
            a: pixel.a
        }
    }, {
        defaults: {}
    });

    Effects.definePoint("hsb-adjust", function (pixel, x, y, parameters, width, height) {
        var hsb = helpers.color.RGBtoHSB(pixel.r, pixel.g, pixel.b);

        hsb.h += parameters.h;
        while (hsb.h < 0) {
            hsb.h += Math.PI * 2;
        }

        hsb.s += parameters.s;
        hsb.s = Math.max(Math.min(hsb.s, 1), 0);

        hsb.b += parameters.b;
        hsb.b = Math.max(Math.min(hsb.b, 1), 0);

        var result = helpers.color.HSBtoRGB(hsb.h, hsb.s, hsb.b);
        pixel.r = result.r;
        pixel.g = result.g;
        pixel.b = result.b;

        return pixel;
    }, {
        defaults: {
            h: 1,
            s: 1,
            b: 1
        }
    });

    Effects.definePoint("invert-alpha", function (pixel) {
        pixel.a = 255 - pixel.a;
        return pixel;
    });

    Effects.definePoint("invert", function (pixel) {
        pixel.r = 255 - pixel.r;
        pixel.g = 255 - pixel.g;
        pixel.b = 255 - pixel.b;
        return pixel;
    });

    Effects.definePoint("levels", function (pixel, x, y, parameters) {
        return {
            r: this.data.lut[0][pixel.r],
            g: this.data.lut[1][pixel.g],
            b: this.data.lut[2][pixel.b],
            a: pixel.a
        }
    }, {
        defaults: {
            low: 0,
            high: 1,
            lowOutput: 0,
            highOutput: 1
        },
        before: function (parameters, width, height, pixels) {
            var Histogram = function (imageData, width, height, offset, stride) {
                var i, j, index,
                    x, y,
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
                }
            };

            var histogram = new Histogram(pixels, width, height, 0, width),
                scale = 255 / histogram.getNumSamples(),
                lut = new Array(3),
                low = parameters.low * 255,
                high = parameters.high * 255,
                i, j;

            for (i = 0; i < lut.length; i += 1) {
                lut[i] = new Array(256);
            }
            if (low === high) {
                high++;
            }

            for (i = 0; i < 3; i += 1) {
                for (j = 0; j < 256; j += 1) {
                    lut[i][j] = (255 * (parameters.lowOutput + (parameters.highOutput - parameters.lowOutput) * (j - low) / (high - low)))
                }
            }

            return {
                lut: lut
            }
        }
    });

    Effects.definePoint("lookup", function (pixel, x, y, parameters) {
        // TODO
    }, {
        defaults: {},
        before: function (parameters, width, height) {

        }
    });

    Effects.definePoint("map-colors", function (pixel, x, y, parameters) {
        // TODO
    }, {
        defaults: {},
        before: function (parameters, width, height) {

        }
    });

    Effects.definePoint("posterize", function (pixel, x, y, parameters) {
        // TODO
        return {
            r: this.data.levels[pixel.r],
            g: this.data.levels[pixel.g],
            b: this.data.levels[pixel.b],
            a: pixel.a
        };
    }, {
        defaults: {
            levels: 6
        },
        before: function (parameters, width, height) {
            var levels = [],
                i;

            for (i = 0; i < 256; i += 1) {
                levels[i] = parseInt(255 * (parameters.levels * i / 256) / (parameters.levels - 1));
            }

            return {
                levels: levels
            };
        }
    });

    Effects.definePoint("quantize", function (pixel, x, y, parameters) {
        // TODO
    }, {
        defaults: {
            matrix: [
                0, 0, 0,
                0, 0, 7,
                3, 5, 1
            ],
            dither: true,
            numColors: 256,
            serpentine: true
        },
        before: function (parameters, width, height, imageData) {
            var sum = 0,
                i = parameters.matrix.length;

            while (i--) {
                sum += parameters.matrix[i]
            }

            return {
                sum: sum
            };
        }
    });

    Effects.definePoint("rescale", function (pixel, x, y, parameters) {
        pixel.r = parameters.scale * pixel.r;
        pixel.g = parameters.scale * pixel.g;
        pixel.b = parameters.scale * pixel.b;

        return pixel;
    }, {
        defaults: {
            scale: 1
        }
    });

    Effects.definePoint("solarize", function (pixel, x, y, parameters) {
        var red = pixel.r / 255 > 0.5 ? 2 * ((pixel.r / 255) - 0.5) : 2 * (0.5 - (pixel.r / 255)),
            green = pixel.g / 255 > 0.5 ? 2 * ((pixel.g / 255) - 0.5) : 2 * (0.5 - (pixel.g / 255)),
            blue = pixel.b / 255 > 0.5 ? 2 * ((pixel.b / 255) - 0.5) : 2 * (0.5 - (pixel.b / 255));

        return {
            r: red * 255,
            g: green * 255,
            b: blue * 255,
            a: pixel.a
        }
    }, {
        defaults: {}
    });

    Effects.definePoint("threshold", function (pixel, x, y, parameters) {
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
    }, {
        defaults: {}
    });

    Effects.definePoint("tritone", function (pixel, x, y, parameters) {
        var brightness = Math.floor((pixel.r + pixel.g + pixel.b) / 3);
        return this.data.lut[brightness];
    }, {
        defaults: {
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
        },
        before: function (parameters) {
            var lut = [],
                i, t;

            for (i = 0; i < 128; i += 1) {
                t = i / 127;
                lut[i] = helpers.color.mixColors(t, parameters.shadowColor, parameters.midColor);
            }
            for (i = 128; i < 256; i += 1) {
                t = (i - 127) / 128;
                lut[i] = helpers.color.mixColors(t, parameters.midColor, parameters.highColor);
            }
            return {
                lut: lut
            };
        }
    });

    // Distortion and Warping Filters
    Effects.defineTransform("diffuse", function (x, y, parameters) {
        var angle = parseInt(Math.random() * 255),
            distance = Math.random();

        return [
            x + distance * this.data.sinTable[angle],
            y + distance * this.data.cosTable[angle]
        ];
    }, {
        defaults: {
            scale: 4
        },
        before: function (parameters, width, height) {
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
    });

    Effects.definePoint("dissolve", function (pixel, x, y, parameters) {
        var v = Math.random(),
            f = helpers.smoothStep(this.data.minDensity, this.data.maxDensity, v);
        pixel.a = pixel.a * f;
        return pixel;
    }, {
        defaults: {
            density: 1,
            softness: 0
        },
        before: function (parameters, width, height) {
            var d = (1 - parameters.density) * (1 + parameters.softness);
            return {
                minDensity: d - parameters.softness,
                maxDensity: d
            };
        }
    });

    Effects.defineTransform("kaleidoscope", function (x, y, parameters) {
        var dx = x - this.data.icentreX,
            dy = y - this.data.icentreY,
            r = Math.sqrt(dx * dx + dy * dy),
            theta = Math.atan2(dy, dx) - parameters.angle - parameters.angle2;

        theta = helpers.triangle(theta / Math.PI * parameters.sides * 0.5);

        if (parameters.radius !== 0) {
            var c = Math.cos(theta),
                radiusC = parameters.radius / c;
            r = radiusC * helpers.triangle(r / radiusC);
        }

        theta += parameters.angle;

        return [
            this.data.icentreX + r * Math.cos(theta),
            this.data.icentreY + r * Math.sin(theta)
        ];
    }, {
        defaults: {
            centreX: 0.5,
            centreY: 0.5,
            angle: 0,
            angle2: 0,
            sides: 3,
            radius: 0
        },
        before: function (parameters, width, height) {
            return {
                icentreX: width * parameters.centreX,
                icentreY: height * parameters.centreY
            };
        }
    });

    Effects.defineTransform("marble", function (x, y, parameters) {
        var displacement = Math.floor(this.data.displacementMap(x, y));
        return [
            x + this.data.sinTable[displacement],
            y + this.data.cosTable[displacement]
        ];
    }, {
        defaults: {
            xScale: 4,
            yScale: 4,
            amount: 1,
            turbulence: 1
        },
        before: function (parameters, width, height) {
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
                displacementMap: function (x, y) {
                    var result = 127 * (1 + helpers.noise.noise2(x / parameters.xScale, y / parameters.yScale));
                    return Math.min(255, Math.max(0, result));
                }
            };
        }
    });

    Effects.defineTransform("pinch", function (x, y, parameters) {
        var dx = x - this.data.icentreX,
            dy = y - this.data.icentreY,
            distance = dx * dx + dy * dy,
            d, t, e, a, s, c;

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

        return [
            this.data.icentreX + c * dx - s * dy,
            this.data.icentreY + s * dx + c * dy
        ];
    }, {
        defaults: {
            angle: 0,
            centreX: 0.5,
            centreY: 0.5,
            radius: 100,
            amount: 0.5
        },
        before: function (parameters, width, height) {
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
    });

    Effects.defineTransform("polar", function (x, y, parameters) {
        // TODO
    }, {
        defaults: {},
        before: function (parameters, width, height) {

        }
    });

    Effects.defineTransform("ripple", function (x, y, parameters) {
        var nx = y / parameters.xWaveLength,
            ny = x / parameters.yWaveLength,
            fx, fy;

        switch (parameters.waveType) {
            case "SINE":
            default:
                fx = Math.sin(nx);
                fy = Math.sin(ny);
                break;

            case "SAWTOOTH":
                fx = helpers.mod(nx, 1);
                fy = helpers.mod(ny, 1);
                break;

            case "TRIANGLE":
                fx = helpers.triangle(nx);
                fy = helpers.triangle(ny);
                break;

            case "NOISE":
                fx = helpers.noise.noise1(nx);
                fy = helpers.noise.noise1(ny);
                break;
        }

        return [
            x + parameters.xAmplitude * fx,
            y + parameters.yAmplitute * fy
        ];
    }, {
        defaults: {
            xAmplitude: 5,
            yAmplitute: 0,
            xWaveLength: 16,
            yWaveLength: 16,
            waveType: "SINE" // SAWTOOTH TRIANGLE NOISE
        }
    });

    Effects.defineTransform("shear", function (x, y, parameters) {
        return [
            x + parameters.xOffset + (y * this.data.shx),
            y + parameters.yOffset + (x * this.data.shy)
        ];
    }, {
        defaults: {
            xAngle: 0,
            yAngle: 0,
            xOffset: 0,
            yOffset: 0
        },
        before: function (parameters, width, height) {
            return {
                shx: Math.sin(parameters.xAngle),
                shy: Math.sin(parameters.yAngle)
            };
        }
    });

    Effects.defineTransform("sphere", function (x, y, parameters) {
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

        if (y2 >= (this.data.b2 - (this.data.b2 / x2) / this.data.a2)) {
            return [x, y];
        }

        angle2 = (Math.PI / 2) - xAngle - angle2;
        ret[0] = x - Math.tan(angle2) * z;

        angle1 = (Math.PI / 2) - yAngle;
        angle2 = Math.asin(Math.sin(angle1) * rRefraction);
        angle2 = (Math.PI / 2) - yAngle - angle2;
        ret[1] = y - Math.tan(angle2) * z;
        return ret;
    }, {
        defaults: {
            a: 0,
            b: 0,
            centreX: 0.5,
            centreY: 0.5,
            refractionIndex: 1.5
        },
        before: function (parameters, width, height) {
            var icentreX = width * parameters.centreX,
                icentreY = height * parameters.centreY,
                a = parameters.a,
                b = parameters.b,
                a2, b2;
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
    });

    Effects.defineTransform("swim", function (x, y, parameters) {
        var nx = this.data.m00 * x + this.data.m01 * y,
            ny = this.data.m10 * x + this.data.m11 * y;

        nx /= parameters.scale;
        ny /= parameters.scale * parameters.stretch;

        if (parameters.turbulence === 1) {
            return [
                x + parameters.amount * helpers.noise.noise3(nx + 0.5, ny, parameters.time),
                y + parameters.amount * helpers.noise.noise3(nx, ny + 0.5, parameters.time)
            ];
        }
        return [
            x + parameters.amount * helpers.noise.turbulence3(nx + 0.5, ny, parameters.turbulence, parameters.time),
            y + parameters.amount * helpers.noise.turbulence3(nx, ny + 0.5, parameters.turbulence, parameters.time)
        ];
    }, {
        defaults: {
            scale: 32,
            turbulence: 0,
            amount: 1,
            time: 0,
            angle: 0,
            stretch: 1
        },
        before: function (parameters) {
            var cos = Math.cos(parameters.angle),
                sin = Math.sin(parameters.angle);

            return {
                m00: cos,
                m01: sin,
                m10: -sin,
                m11: cos
            };
        }
    });

    Effects.defineTransform("twirl", function (x, y, parameters) {
        var dx = x - this.data.iCentreX,
            dy = y - this.data.iCentreY,
            distance = dx * dx + dy * dy,
            a;

        if (distance > parameters.radius2) {
            return [x, y];
        }

        distance = Math.sqrt(distance);
        a = Math.atan2(dy, dx) + parameters.angle * (parameters.radius - distance) / parameters.radius;

        return [
            this.data.iCentreX + distance * Math.cos(a),
            this.data.iCentreY + distance * Math.sin(a)
        ];
    }, {
        defaults: {
            angle: 0,
            centreX: 0.5,
            centreY: 0.5,
            radius: 100
        },
        before: function (parameters, width, height) {
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
    });

    Effects.defineTransform("water", function (x, y, parameters) {
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
    }, {
        defaults: {
            waveLength: 16,
            amplitude: 10,
            phase: 0,
            centreX: 0.5,
            centreY: 0.5,
            radius: 50
        },
        before: function (parameters, width, height) {
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
    });

    Effects.definePoint("edge", function (pixel, x, y, parameters, width, height) {
        var r = 0, g = 0, b = 0,
            rh = 0, gh = 0, bh = 0,
            rv = 0, gv = 0, bv = 0,
            row, iy, col, ix, iOffset, mOffset,
            pixel2, h, v;

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
    }, {
        defaults: {
            matrixes: {
                robertsV: [
                    0, 0, -1,
                    0, 1, 0,
                    0, 0, 0
                ],
                robertsH: [
                    -1, 0, 0,
                    0, 1, 0,
                    0, 0, 0
                ],
                prewittV: [
                    -1, 0, 1,
                    -1, 0, 1,
                    -1, 0, 1
                ],
                prewittH: [
                    -1, -1, -1,
                    0, 0, 0,
                    1, 1, 1
                ],
                sobelV: [
                    -1, 0, 1,
                    -2, 0, 2,
                    -1, 0, 1
                ],
                sobelH: [
                    -1, -2, -1,
                    0, 0, 0,
                    1, 2, 1
                ],
                freiChenV: [
                    -1, 0, 1,
                    -Math.sqrt(2), 0, Math.sqrt(2),
                    -1, 0, 1
                ],
                freiChenH: [
                    -1, -Math.sqrt(2), -1,
                    0, 0, 0,
                    1, Math.sqrt(2), 1
                ]
            },
            hEdgeMatrix: "sobelV",
            vEdgeMatrix: "sobelH"
        },
        before: function (parameters, width, height) {
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
            }
        }
    });

    Effects.defineCustom("fill-color", function (width, height, parameters) {
        var x, y, color;

        if (parameters.color === "transparent") {
            color = {
                r: 0,
                g: 0,
                b: 0,
                a: 0
            };
        }
        else {
            color = helpers.color.hexToRGB(parameters.color);
            color.a = 255;
        }

        for (y = 0; y < height; y += 1) {
            for (x = 0; x < width; x += 1) {
                this.setPixel(x, y, color);
            }
        }
    }, {
        defaults: {
            color: "transparent"
        }
    });

    Effects.definePoint("channel-mix", function (pixel, x, y, parameters) {
        var r = pixel.r,
            g = pixel.g,
            b = pixel.b,
            a = pixel.a;

        return {
            r: ((parameters.intoR * (parameters.blueGreen * g + (255 - parameters.blueGreen) * b) / 255 + (255 - parameters.intoR) * r) / 255),
            g: ((parameters.intoG * (parameters.redBlue * g + (255 - parameters.redBlue) * r) / 255 + (255 - parameters.intoG) * g) / 255),
            b: ((parameters.intoB * (parameters.greenRed * g + (255 - parameters.greenRed) * g) / 255 + (255 - parameters.intoB) * b) / 255),
            a: pixel.a
        };

    }, {
        defaults: {
            blueGreen: 1,
            redBlue: 1,
            greenRed: 1,
            intoR: 1,
            intoG: 1,
            intoB: 1
        }
    });

    Effects.defineTransform("circle", function (x, y, parameters, width, height) {
        var dx = x - this.data.icentreX,
            dy = y - this.data.icentreX,
            theta = Math.atan2(-dy, -dx) + parameters.angle,
            r = Math.sqrt(dx * dx + dy * dy);

        theta = helpers.mod(theta, 2 * Math.PI);

        return [
            this.data.width * theta / parameters.spreadAngle + 0.00001,
            height * (1 - (r - parameters.radius) / (height + 0.00001))
        ];
    }, {
        defaults: {
            radius: 10,
            height: 20,
            angle: 0,
            spreadAngle: Math.PI,
            centreX: 0.5,
            centreY: 0.5
        },
        before: function (parameters, width, height) {
            return {
                icentreX: width * parameters.centreX,
                icentreY: height * parameters.centreY,
                width: --width
            };
        }
    });

    Effects.defineTransform("rotate", function (x, y, parameters, width, height) {
        return [
            ((this.data.cos * (x - this.data.icentreX)) - (this.data.sin * (y - this.data.icentreY)) + this.data.icentreY),
            ((this.data.sin * (x - this.data.icentreX)) - (this.data.cos * (y - this.data.icentreY)) + this.data.icentreY)
        ];
    }, {
        defaults: {
            angle: Math.PI
        },
        before: function (parameters, width, height) {
            return {
                cos: Math.cos(parameters.angle),
                sin: Math.sin(parameters.angle),
                icentreX: width / 2,
                icentreY: height / 2
            };
        }
    });

    Effects.defineCustom("flip", function (width, height, parameters) {
        var x = 0, y = 0,
            w = width,
            h = height,
            newX = 0,
            newY = 0,
            newW = w,
            newH = h,
            newRow, newCol;

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
    }, {
        defaults: {
            operation: "FLIP_H" // FLIP_H, FLIP_V, FLIP_HV, FLIP_90CW, FLIP_90CCW, FLIP_180
        }
    });

    Effects.defineTransform("offset", function (x, y, parameters, width, height) {
        if (parameters.wrap) {
            return [
                (x + width - parameters.xOffset) % width,
                (y + height - parameters.yOffset) % height
            ];
        }
        else {
            return [
                x - parameters.xOffset,
                y - parameters.yOffset
            ];
        }
    }, {
        defaults: {
            xOffset: 100,
            yOffset: 100,
            wrap: true
        },
        before: function (parameters, width, height) {

        }
    });

    Effects.defineTransform("polar", function (x, y, parameters, width, height) {
        var theta, theta2, t,
            m, xMax, yMax, nx, ny, xmax, ymax,
            dx, dy, distance,
            r = 0;

        switch (parameters.type) {
            case "RECT_TO_POLAR":
                if (x >= this.data.centreX) {
                    if (y > this.data.centreY) {
                        theta = Math.PI - Math.atan(((x - this.data.centreX)) / ((y - this.data.centreY)));
                        r = Math.sqrt(this.data.sqr(x - this.data.centreX) + this.data.sqr(y - this.data.centreY));
                    }
                    else {
                        if (y < this.data.centreY) {
                            theta = Math.atan(((x - this.data.centreX)) / ((this.data.centreY - y)));
                            r = Math.sqrt(this.data.sqr(x - this.data.centreX) + this.data.sqr(this.data.centreY - y));
                        }
                        else {
                            theta = Math.PI / 2;
                            r = x - this.data.centreX;
                        }
                    }
                }
                else {
                    if (x < this.data.centreX) {
                        if (y < this.data.centreY) {
                            theta = (Math.PI * 2) - Math.atan(((this.data.centreX - x)) / ((this.data.centreY - y)));
                            r = Math.sqrt(this.data.sqr(this.data.centreX - x) + this.data.sqr(this.data.centreY - y));
                        }
                        else {
                            if (y > this.data.centreY) {
                                theta = Math.PI + Math.atan(((this.data.centreX - x)) / ((y - this.data.centreY)));
                                r = Math.sqrt(this.data.sqr(this.data.centreX - x) + this.data.sqr(y - this.data.centreY));
                            }
                            else {
                                theta = 1.5 * Math.PI;
                                r = this.data.centreX - x;
                            }
                        }
                    }
                }
                if (x != this.data.centreX) {
                    m = Math.abs(((y - this.data.centreY)) / ((x - this.data.centreX)));
                }
                else {
                    m = 0;
                }

                if (m <= ((height / width))) {
                    if (x == this.data.centreX) {
                        xMax = 0;
                        yMax = this.data.centreY;
                    }
                    else {
                        xMax = this.data.centreX;
                        yMax = m * xMax;
                    }
                }
                else {
                    yMax = this.data.centreY;
                    xMax = yMax / m;
                }

                return [
                    (width - 1) - (width - 1) / (Math.PI * 2 * theta),
                    height * r / this.data.radius
                ];

            case "POLAR_TO_RECT":

                theta = x / width * Math.PI * 2;

                if (theta >= 1.5 * Math.PI) {
                    theta2 = Math.PI * 2 - theta;
                }
                else {
                    if (theta >= Math.PI) {
                        theta2 = theta - Math.PI;
                    }
                    else {
                        if (theta >= 0.5 * Math.PI
                        ) {
                            theta2 = Math.PI - theta;
                        }
                        else {
                            theta2 = theta;
                        }
                    }
                }

                t = Math.tan(theta2);
                if (t != 0) {
                    m = 1.0 / t;
                }
                else {
                    m = 0;
                }

                if (m <= ((height) / (width))) {
                    if (theta2 == 0) {
                        xmax = 0;
                        ymax = this.data.centreY;
                    }
                    else {
                        xmax = this.data.centreX;
                        ymax = m * xmax;
                    }
                }
                else {
                    ymax = this.data.centreY;
                    xmax = ymax / m;
                }

                r = this.data.radius * (y / (height));

                nx = -r * Math.sin(theta2);
                ny = r * Math.cos(theta2);

                if (theta >= 1.5 * Math.PI) {
                    return [
                        this.data.centreX - nx,
                        this.data.centreY - ny
                    ];
                }
                else {
                    if (theta >= Math.PI) {
                        return [
                            this.data.centreX - nx,
                            this.data.centreY + ny
                        ];
                    }
                    else {
                        if (theta >= 0.5 * Math.PI) {
                            return [
                                this.data.centreX + nx,
                                this.data.centreY + ny
                            ];
                        }
                        else {
                            return [
                                this.data.centreX + nx,
                                this.data.centreY - ny
                            ];
                        }
                    }
                }
                break;

            case "INVERT_IN_CIRCLE":
                dx = x - this.data.centreX;
                dy = y - this.data.centreY;
                distance = dx * dx + dy * dy;

                return [
                    this.data.centreX + this.data.centreX * this.data.centreX * dx / distance,
                    this.data.centreY + this.data.centreY * this.data.centreY * dy / distance
                ];
        }
    }, {
        defaults: {
            type: "RECT_TO_POLAR" // RECT_TO_POLAR, POLAR_TO_RECT, INVERT_IN_CIRCLE
        },
        before: function (parameters, width, height) {
            return {
                centreX: width / 2,
                centreY: height / 2,
                radius: Math.max(width / 2, height / 2),
                sqr: function (x) {
                    return x * x;
                }
            };
        }
    });

    Effects.defineCustom("block", function (width, height, parameters) {
        var x, y,
            w, h,
            t,
            r, g, b,
            pixel,
            by, bx;

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
    }, {
        defaults: {
            blockSize: 5
        }
    });

    Effects.defineCustom("border", function (width, height, parameters) {
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
    }, {
        defaults: {
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
        },
        before: function (parameters, width, height) {
            return {
                leftBorder: parameters.leftBorder | 0,
                rightBorder: parameters.rightBorder | 0,
                topBorder: parameters.rightBorder | 0,
                bottomBorder: parameters.bottomBorder | 0
            };
        }
    });

    Effects.defineCustom("color-halftone", function (width, height, parameters) {
        var gridSize = 2 * parameters.dotRadius * 1.414,
            angles = [this.data.cyanScreenAngle, this.data.magentaScreenAngle, this.data.yellowScreenAngle],
            mx = [0, -1, 1, 0, 0],
            my = [0, 0, 0, -1, 1],
            halfGridSize = gridSize / 2,
            x, y, ix,
            originalPixel,
            newPixel;

        for (y = 0; y < height; y += 1) {
            for (x = 0, ix = y * width; x < width; x += 1, ix += 1) {
                // TODO
            }
        }
    }, {
        defaults: {
            dotRadius: 2,
            cyanScreenAngle: 108,
            magentaScreenAngle: 162,
            yellowScreenAngle: 90
        },
        before: function (parameters, width, height) {
            return {
                cyanScreenAngle: helpers.math.toRadians(parameters.cyanScreenAngle),
                magentaScreenAngle: helpers.math.toRadians(parameters.magentaScreenAngle),
                yellowScreenAngle: helpers.math.toRadians(parameters.yellowScreenAngle)
            };
        }
    });

    Effects.defineCustom("emboss", function (width, height, parameters) {
        var x, y,
            bumpMapWidth = width,
            bumpMapHeight = height,
            bumpPixels = [],
            Nx, Ny, Nz, Lx, Ly, Lz, Nz2, NzLz, NdotL,
            s1, s2, s3,
            shade, background,
            pixelScale = 255.9,
            bumpIndex = 0,
            index = 0,
            pixel,
            r, g, b;

        Lx = (Math.cos(parameters.azimuth) * Math.cos(parameters.elevation) * pixelScale) | 0;
        Ly = (Math.sin(parameters.azimuth) * Math.cos(parameters.elevation) * pixelScale) | 0;
        Lz = (Math.sin(parameters.elevation) * pixelScale) | 0;

        Nz = (6 * 255 / parameters.width45) | 0;
        Nz2 = Nz * Nz;
        NzLz = Nz * Lz;

        background = Lz;

        for (y = 0; y < height; y += 1) {
            for (x = 0; x < width; x += 1) {
                bumpPixels.push(helpers.pixel.brightness(this.getOriginalPixel(x, y)) | 0);
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
                    }
                    else {
                        if ((NdotL = Nx * Lx + Ny * Ly + NzLz) < 0) {
                            shade = 0;
                        }
                        else {
                            shade = (NdotL / Math.sqrt(Nx * Nx + Ny * Ny + Nz2));
                        }
                    }
                }
                else {
                    shade = background;
                }

                if (parameters.emboss) {
                    pixel = this.getOriginalPixelByIndex(index);
                    r = (pixel.r * shade) >> 8;
                    g = (pixel.g * shade) >> 8;
                    b = (pixel.b * shade) >> 8;
                    this.setPixelByIndex(index++, {
                        r: r,
                        g: g,
                        b: b,
                        a: pixel.a
                    });
                }
                else {
                    this.setPixelByIndex(index++, {
                        r: shade,
                        g: shade << 8,
                        b: shade << 16,
                        a: 255
                    });
                }
            }
        }
    }, {
        defaults: {
            azimuth: 135 * Math.PI / 180,
            elevation: 30 * Math.PI / 180,
            width45: 3,
            emboss: true
        },
        before: function (parameters, width, height) {

        }
    });

    Effects.defineTransform("perspective", function (x, y, parameters, width, height) {
        return [
            width * (this.data.A * x + this.data.B * y + this.data.C) / (this.data.G * x + this.data.H * y + this.data.I),
            height * (this.data.D * x + this.data.E * y + this.data.F) / (this.data.G * x + this.data.H * y + this.data.I)
        ];
    }, {
        defaults: {
            x0: 0,
            y0: 0,
            x1: 1,
            y1: 0,
            x2: 1,
            y2: 1,
            x3: 0,
            y3: 1
        },
        before: function (parameters, width, height) {
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
                }
                else {
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
    });

    Effects.definePoint("auto-contrast", function (pixel, x, y, width, height) {
        pixel.r = this.data.remap(pixel.r, this.data.min, this.data.max);
        pixel.g = this.data.remap(pixel.g, this.data.min, this.data.max);
        pixel.b = this.data.remap(pixel.b, this.data.min, this.data.max);

        return pixel;
    }, {
        before: function (parameters, width, height) {
            var x, y,
                pixel,
                min = Infinity, max = -1;

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
                remap: function (value) {
                    return ((value) - min) * 255 / (max - min);
                }
            };
        }
    });

    Effects.defineCustom("auto-white-balance", function (width, height, parameters) {
        var x, y,
            sumA = 0, sumB = 0,
            pixel,
            lab,
            avgSumA, avgSumB,
            aDelta, bDelta;

        for (y = 0; y < height; y += 1) {
            for (x = 0; x < width; x += 1) {
                pixel = this.getPixel(x, y);
                lab = helpers.color.RGBtoCIELab(pixel.r, pixel.g, pixel.b);
                sumA += lab.a;
                sumB += lab.b;
            }
        }

        avgSumA = 0 - (sumA / (width * height));
        avgSumB = 0 - (sumB / (width * height));

        aDelta = avgSumA * (parameters.intensity / 100) * 1.1;
        bDelta = avgSumB * (parameters.intensity / 100) * 1.1;

        for (y = 0; y < height; y += 1) {
            for (x = 0; x < width; x += 1) {
                pixel = this.getPixel(x, y);

                lab = helpers.color.RGBtoCIELab(pixel.r, pixel.g, pixel.b);

                lab.a += aDelta;
                lab.b += bDelta;

                pixel = helpers.color.CIELabToRGB(lab.l, lab.a, lab.b);
                pixel.a = this.getPixel(x, y).a;

                this.setPixel(x, y, pixel);
            }
        }
    }, {
        defaults: {
            intensity: 50
        }
    });

    Effects.defineCustom("component-stretching", function (width, height, parameters) {
        var x, y,
            minR = Infinity, minG = Infinity, minB = Infinity,
            maxR = -1, maxG = -1, maxB = -1,
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
    });

    var Imagizer = {};
    Imagizer.Project = Project;
    Imagizer.Layer = Layer;
    Imagizer.Image = ImageObj;
    Imagizer.SimpleText = TextObj;
    Imagizer.Effects = Effects;
    Imagizer.helpers = helpers;
    Imagizer.BaseOnLayerObject = baseOnLayerObject;

    publish(Imagizer);

}());