/**
 * @author Michał Baniowski michal.baniowski@gmail.com
 * @version 0.0.4
 */
;
(function(win, doc)
{
    win.Imagizer = {};

    /**
     * Helper functions
     * @type {Object}
     */
    var Helpers = {
        Inherit: function()
        {
            var name, i,
                args = arguments,
                Class = function()
                {
                    if(this.__constructor)
                    {
                        this.__constructor.apply(this, arguments);
                    }
                };

            for(i = 0; i < args.length; i += 1)
            {
                for(name in args[i])
                {
                    if(args[i].hasOwnProperty(name))
                    {
                        if(typeof Class.prototype[name] === "function")
                        {

                            Class.prototype[name] = (function(superMethod, childMethod)
                            {
                                return function()
                                {
                                    this.__super = superMethod;
                                    var result = childMethod.apply(this, arguments);
                                    delete this.__super;
                                    return result;
                                }
                            }(Class.prototype[name], args[i][name]))
                        }
                        else
                        {
                            if(typeof args[i][name] === "function")
                            {
                                Class.prototype[name] = (function(method)
                                {
                                    return function()
                                    {
                                        delete this.__super;
                                        return method.apply(this, arguments);
                                    }
                                }(args[i][name]))
                            }
                            else
                            {
                                Class.prototype[name] = args[i][name];
                            }
                        }
                    }
                }
            }
            return Class;
        },
        extend: function(obj1, obj2)
        {
            var result = Object.prototype.toString.call(obj1) === "[object Array]" ? [] : {},
                i, j;

            for(i = 0; i < arguments.length; i += 1)
            {
                for(j in arguments[i])
                {
                    if(arguments[i].hasOwnProperty(j))
                    {
                        if(Object.prototype.toString.call(arguments[i][j]) === "[object Object]")
                        {
                            result[j] = Helpers.extend({}, arguments[i][j]);
                        }
                        else
                        {
                            if(Object.prototype.toString.call(arguments[i][j]) === "[object Array]")
                            {
                                result[j] = Helpers.extend([], arguments[i][j]);
                            }
                            else
                            {
                                result[j] = arguments[i][j];
                            }
                        }
                    }
                }
            }
            return result;
        },
        Color: {
            RGBtoHSB: function(r, g, b)
            {
                var hue, saturation, brightness,
                    cmax = Math.max(r, g, b),
                    cmin = Math.min(r, g, b);

                brightness = cmax / 255;
                if(cmax !== 0)
                {
                    saturation = (cmax - cmin) / cmax;
                }
                else
                {
                    saturation = 0;
                }

                if(saturation === 0)
                {
                    hue = 0;
                }
                else
                {
                    var redc = (cmax - r) / (cmax - cmin),
                        greenc = (cmax - g) / (cmax - cmin),
                        bluec = (cmax - b) / (cmax - cmin);

                    if(r === cmax)
                    {
                        hue = bluec - greenc;
                    }
                    else
                    {
                        if(g === cmax)
                        {
                            hue = 2 + redc - bluec;
                        }
                        else
                        {
                            hue = 4 + greenc - redc;
                        }
                    }

                    hue /= 6;
                    if(hue < 0)
                    {
                        hue += 1;
                    }
                }

                return {
                    h: hue,
                    s: saturation,
                    b: brightness
                };
            },
            HSBtoRGB: function(hue, saturation, brightness)
            {
                var red, green, blue;
                if(saturation === 0)
                {
                    red = brightness * 255 + 0.5;
                    green = brightness * 255 + 0.5;
                    blue = brightness * 255 + 0.5;
                }
                else
                {
                    var h = (hue - Math.floor(hue)) * 6,
                        f = h - Math.floor(h),
                        p = brightness * (1 - saturation),
                        q = brightness * (1 - saturation * f),
                        t = brightness * (1 - (saturation * (1 - f)));

                    switch(parseInt(h))
                    {
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
            mixColors: function(t, rgb1, rgb2)
            {
                return {
                    r: rgb1.r + t * (rgb2.r - rgb1.r),
                    g: rgb1.g + t * (rgb2.g - rgb1.g),
                    b: rgb1.b + t * (rgb2.b - rgb1.b),
                    a: rgb1.a + t * (rgb2.a - rgb1.a)
                }
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
    var mergeImageData = function mergeImageData(bottom, top, pixelCallback)
    {
        var x, y,
            xx, yy,
            firstOldPixelIndex, firstNewPixelIndex,
            pixelResult;

        for(y = top.y, yy = 0; y < bottom.height && yy < top.height; y += 1, yy += 1)
        {
            for(x = top.x, xx = 0; x < bottom.width && xx < top.width; x += 1, xx += 1)
            {
                if(xx < top.width && yy < top.height) // overwrite only rect-size of current layer
                {
                    firstOldPixelIndex = y * bottom.width * 4 + x * 4;
                    firstNewPixelIndex = yy * top.width * 4 + xx * 4;

                    pixelResult = pixelCallback({
                        r: bottom.imageData.data[firstOldPixelIndex],
                        g: bottom.imageData.data[firstOldPixelIndex + 1],
                        b: bottom.imageData.data[firstOldPixelIndex + 2],
                        a: bottom.imageData.data[firstOldPixelIndex + 3]
                    }, {
                        r: top.imageData.data[firstNewPixelIndex],
                        g: top.imageData.data[firstNewPixelIndex + 1],
                        b: top.imageData.data[firstNewPixelIndex + 2],
                        a: top.imageData.data[firstNewPixelIndex + 3]
                    }, x, y, {
                        blendingMode: top.blendingMode
                    });

                    if(pixelResult !== false) // if skip change
                    {
                        bottom.imageData.data[firstOldPixelIndex] = pixelResult.r;
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
     * Object with blending modes definitions.
     * @type {Object}
     */
    var blendingModes = {
        lighten: function(bottomPixel, topPixel)
        {
            return topPixel > bottomPixel ? topPixel : bottomPixel;
        },
        darken: function(bottomPixel, topPixel)
        {
            return topPixel > bottomPixel ? bottomPixel : topPixel;
        },
        multiply: function(bottomPixel, topPixel)
        {
            return bottomPixel * topPixel / 255;
        },
        average: function(bottomPixel, topPixel)
        {
            return bottomPixel + topPixel / 2;
        },
        add: function(bottomPixel, topPixel)
        {
            return Math.min(255, bottomPixel + topPixel);
        },
        subtract: function(bottomPixel, topPixel)
        {
            return bottomPixel + topPixel < 255 ? 0 : bottomPixel + topPixel - 255;
        },
        difference: function(bottomPixel, topPixel)
        {
            return Math.abs(bottomPixel - topPixel);
        },
        negation: function(bottomPixel, topPixel)
        {
            return 255 - Math.abs(255 - bottomPixel - topPixel);
        },
        screen: function(bottomPixel, topPixel)
        {
            return 255 - (((255 - bottomPixel) * (255 - topPixel)) >> 8);
        },
        exclusion: function(bottomPixel, topPixel)
        {
            return bottomPixel + topPixel - 2 * bottomPixel * topPixel / 255;
        },
        overlay: function(bottomPixel, topPixel)
        {
            return topPixel < 128
                ? (2 * bottomPixel * topPixel / 255)
                : (255 - 2 * (255 - bottomPixel) * (255 - topPixel) / 255);
        },
        softLight: function(bottomPixel, topPixel)
        {
            return topPixel < 128
                ? (2 * ((bottomPixel >> 1) + 64)) * (topPixel / 255)
                : 255 - (2 * (255 - (( bottomPixel >> 1) + 64)) * (255 - topPixel) / 255);
        },
        hardLight: function(bottomPixel, topPixel)
        {
            return blendingModes.softLight(topPixel, bottomPixel);
        },
        colorDodge: function(bottomPixel, topPixel)
        {
            return topPixel == 255 ? topPixel : Math.min(255, ((bottomPixel << 8 ) / (255 - topPixel)));
        },
        colorBurn: function(bottomPixel, topPixel)
        {
            return topPixel == 0 ? topPixel : Math.max(0, (255 - ((255 - bottomPixel) << 8 ) / topPixel));
        },
        linearDodge: function(bottomPixel, topPixel)
        {
            return blendingModes.add(bottomPixel, topPixel);
        },
        linearBurn: function(bottomPixel, topPixel)
        {
            return blendingModes.subtract(bottomPixel, topPixel);
        },
        linearLight: function(bottomPixel, topPixel)
        {
            return topPixel < 128
                ? blendingModes.linearBurn(bottomPixel, 2 * topPixel)
                : blendingModes.linearDodge(bottomPixel, (2 * (topPixel - 128)));
        },
        vividLight: function(bottomPixel, topPixel)
        {
            return topPixel < 128
                ? blendingModes.colorBurn(bottomPixel, 2 * topPixel)
                : blendingModes.colorDodge(bottomPixel, (2 * (topPixel - 128)));
        },
        pinLight: function(bottomPixel, topPixel)
        {
            return topPixel < 128
                ? blendingModes.darken(bottomPixel, 2 * topPixel)
                : blendingModes.lighten(bottomPixel, (2 * (topPixel - 128)));
        },
        hardMix: function(bottomPixel, topPixel)
        {
            return blendingModes.vividLight(bottomPixel, topPixel) < 128 ? 0 : 255;
        },
        reflect: function(bottomPixel, topPixel)
        {
            return topPixel == 255 ? topPixel : Math.min(255, (bottomPixel * bottomPixel / (255 - topPixel)))
        },
        glow: function(bottomPixel, topPixel)
        {
            return blendingModes.reflect(topPixel, bottomPixel);
        },
        phoenix: function(bottomPixel, topPixel)
        {
            return Math.min(bottomPixel, topPixel) - Math.max(bottomPixel, topPixel) + 255
        }
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
    var mergeCallback = function mergeCallback(bottomPixel, topPixel, x, y, parameters)
    {
        if(topPixel.a === 0)
        {
            return false; // skip change - opacity is full
        }

        // alpha compositing
        var mergedR,
            mergedG,
            mergedB,
            mergedA = topPixel.a / 255,
            rootA = bottomPixel.a / 255 * (1 - mergedA),
            outA = (mergedA + bottomPixel.a * (1 - mergedA) / 255);

        switch(parameters.blendingMode)
        {
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
     * Simple resize.
     * @param oldImageData
     * @param newImageData
     * @param newWidth
     * @param newHeight
     * @returns {*}
     */
    var resizeNearestNeighbour = function(oldImageData, newImageData, newWidth, newHeight)
    {
        var oldWidth = oldImageData.width,
            oldHeight = oldImageData.height,
            ratioX = newWidth / oldWidth,
            ratioY = newHeight / oldHeight,
            oldPixelIndex,
            newPixelIndex,
            x, y;

        for(y = 0; y < newHeight; y += 1)
        {
            for(x = 0; x < newWidth; x += 1)
            {
                oldPixelIndex = Math.floor(y / ratioY) * oldWidth * 4 + Math.floor(x / ratioX) * 4;
                newPixelIndex = y * newWidth * 4 + x * 4;

                newImageData.data[newPixelIndex] = oldImageData.data[oldPixelIndex];
                newImageData.data[newPixelIndex + 1] = oldImageData.data[oldPixelIndex + 1];
                newImageData.data[newPixelIndex + 2] = oldImageData.data[oldPixelIndex + 2];
                newImageData.data[newPixelIndex + 3] = oldImageData.data[oldPixelIndex + 3];
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
    var cropImageData = function(oldImageData, newImageData, startX, startY, width, height)
    {
        var oldWidth = oldImageData.width,
            newWidth = newImageData.width,
            x, y, xx, yy,
            firstOldPixelIndex, firstNewPixelIndex;

        for(y = startY, yy = 0; y < startY + height && yy < height; y += 1, yy += 1)
        {
            for(x = startX, xx = 0; x < startX + width && xx < width; x += 1, xx += 1)
            {
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
     * Shared method. Adds effect to an array.
     * @type {Object}
     */
    var applyEffect = function()
    {
        this.effects.push({
            name: arguments[0],
            effect: Effects.get(arguments[0]),
            params: arguments[1]
        });
    };

    /**
     * HTML canvas wrapper
     * @constructor
     */
    var Canvas = function()
    {
        this.canvas = null;
        this.context = null;
        this.width = 0;
        this.height = 0;

        /**
         * Initializer.
         * @param {int} width
         * @param {int} height
         */
        this.initialize = function(width, height)
        {
            this.canvas = doc.createElement("canvas");

            // hide from viewport
            this.canvas.style.position = "absolute";
            this.canvas.style.left = "-99999px";
            this.canvas.style.top = "-99999px";

            width && this.setWidth(width);
            height && this.setHeight(height);

            doc.body.appendChild(this.canvas);
        };

        /**
         * Setter for width.
         * @param {int} value
         * @returns {Canvas}
         */
        this.setWidth = function(value)
        {
            this.canvas.setAttribute("width", "" + value);
            this.width = value;
            return this;
        };

        /**
         * Setter for height.
         * @param {int} value
         * @returns {Canvas}
         */
        this.setHeight = function(value)
        {
            this.canvas.setAttribute("height", "" + value);
            this.height = value;
            return this;
        };

        /**
         * Getter for context.
         * @returns {*}
         */
        this.getContext = function()
        {
            if(!this.context)
            {
                this.context = this.canvas.getContext("2d");
            }
            return this.context;
        };

        /**
         * Get HTML element.
         */
        this.getCanvas = function()
        {
            return this.canvas;
        };

        /**
         * Export canvas to data url
         * @param {string} type
         * @returns {string|*}
         */
        this.toDataURL = function(type)
        {
            return this.canvas.toDataURL(type);
        };

        /**
         * Removes canvas from DOM.
         */
        this.destroy = function()
        {
            doc.body.removeChild(this.canvas);
        };

        // call initializer
        this.initialize.apply(this, arguments);
    };

    var baseOnLayerObject = {
        __constructor: function()
        {
            this.imageData = null;
            this.canvas = null;
            this.width = 0;
            this.height = 0;
        },

        /**
         * Width getter.
         * @returns {number}
         */
        getWidth: function()
        {
            return this.width;
        },

        /**
         * Width setter
         * @param {int} val
         * @returns {baseOnLayerObject}
         */
        setWidth: function(val)
        {
            this.width = val;
            return this;
        },

        /**
         * Height getter.
         * @returns {number}
         */
        getHeight: function()
        {
            return this.height;
        },

        /**
         * Height setter;
         * @param val
         * @returns {baseOnLayerObject}
         */
        setHeight: function(val)
        {
            this.height = val;
            return this;
        },

        /**
         * Get ImageData of *loaded* image.
         * @returns {ImageData}
         */
        getImageData: function()
        {
            this.imageData = this.canvas.getContext().getImageData(0, 0, this.getWidth(), this.getHeight());
            return this.imageData;
        },

        /**
         * Set image data
         * @param {ImageData} val
         */
        setImageData: function(val)
        {
            this.imageData = val;
            return this;
        },

        /**
         * Resize by given mode
         */
        resize: function(newWidth, newHeight, mode)
        {
            mode = mode || "nearest-neighbour";

            var oldImageData = this.getImageData(),
                canvas = new Canvas(newWidth, newHeight),
                newImageData = canvas.getContext().createImageData(newWidth, newHeight);

            switch(mode)
            {
                case "nearest-neighbour":
                    newImageData = resizeNearestNeighbour(oldImageData, newImageData, newWidth, newHeight);
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

    var ImageObj = Helpers.Inherit(baseOnLayerObject, {
        __constructor: function()
        {
            this.__super();

            this.image = new Image();
            this.url = null;

            // hide from viewport
            this.image.style.position = "absolute";
            this.image.style.left = "-99999px";
            this.image.style.top = "-99999px";
        },
        /**
         * Load image and execute callback on load.
         * @param {string} url
         * @param {function} callback
         */
        load: function(url, callback)
        {
            var _this = this;

            this.url = url;
            this.image.src = url;

            doc.body.appendChild(this.image);

            this.image.onload = function()
            {
                _this.setWidth(_this.image.clientWidth);
                _this.setHeight(_this.image.clientHeight);

                // get image data
                _this.canvas = new Canvas(_this.getWidth(), _this.getHeight());
                _this.canvas.getContext().drawImage(_this.image, 0, 0, _this.getWidth(), _this.getHeight());

                if(typeof callback === "function")
                {
                    callback.call(_this);
                }

                // clean
                doc.body.removeChild(_this.image);
                _this.canvas.destroy();
            };
        }
    });

    /**
     * Style object for text.
     * @constructor
     */
    var StyleObj = function()
    {
        this.fontFamily = "Arial";
        this.fontSize = "12px";
        this.fontStyle = "normal";
        this.fillStyle = "black";

        /**
         *
         * @param val
         * @returns {StyleObj}
         */
        this.setFontStyle = function(val)
        {
            this.fontStyle = val;
            return this;
        };
        /**
         *
         * @param val
         * @returns {StyleObj}
         */
        this.setFontSize = function(val)
        {
            this.fontSize = val;
            return this;
        };
        /**
         *
         * @param val
         * @returns {StyleObj}
         */
        this.setFontFamily = function(val)
        {
            this.fontFamily = val;
            return this;
        };

        /**
         *
         * @returns {string}
         */
        this.getFontStyle = function()
        {
            return this.fontStyle + " " + this.fontSize + " " + this.fontFamily;
        };

        /**
         *
         * @returns {String}
         */
        this.getFillStyle = function()
        {
            return this.fillStyle;
        };
    };

    var TextObj = Helpers.Inherit(baseOnLayerObject, {
        __constructor: function(width, height)
        {
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
        getStyle: function(createNew)
        {
            if(createNew)
            {
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
        write: function(text, x, y, style)
        {
            style = style || this.getStyle();
            this.canvas.getContext().font = style.getFontStyle();
            this.canvas.getContext().fillStyle = style.getFillStyle();
            this.canvas.getContext().fillText(text, x, y);
            return this;
        }
    });

    /**
     * Project object. Holds dimensions and layers.
     * @param {int} width
     * @param {int} height
     * @constructor
     */
    var Project = function(width, height)
    {
        this.canvas = null;
        this.imageData = null;
        this.effects = [];
        this.layers = [];
        this.startTime = new Date();

        /**
         * Initializer.
         * @param {int} width
         * @param {int} height
         */
        this.initialize = function(width, height)
        {
            this.width = width;
            this.height = height;

            // create tmp canvas
            this.canvas = new Canvas(width, height);
            this.imageData = this.canvas.getContext().getImageData(0, 0, width, height);
        };

        /**
         * Create new layer.
         * @params {Object} [params] Additional parameters such as: blending mode
         * @returns {Window.Imagizer.Layer}
         */
        this.createLayer = function(params)
        {
            var layer = new Imagizer.Layer(this.width, this.height, params);
            this.layers.push(layer);
            return layer;
        };

        /**
         * Get time diff. Debug method.
         * @returns {number}
         */
        this.getTime = function()
        {
            var end = new Date();
            return end.getTime() - this.startTime.getTime();
        };

        /**
         * Export project to image and append result image to object chosen by selector..
         * @param {string} selector
         * @param {string} imageType
         */
        this.exportTo = function(selector, imageType)
        {
            imageType = imageType || "image/png";

            var i,
                container = doc.querySelector(selector),
                exportedImage = new Image(),
                args;

            for(i = 0; i < this.layers.length; i++)
            {
                this.imageData = mergeImageData({
                    width: this.width,
                    height: this.height,
                    imageData: this.imageData
                }, {
                    x: 0,
                    y: 0,
                    width: this.width,
                    height: this.height,
                    imageData: this.layers[i].exportLayer(),
                    blendingMode: this.layers[i].parameters.blendingMode
                }, mergeCallback);
            }

            for(i = 0; i < this.effects.length; i++)
            {
                this.imageData = this.effects[i].effect.run(this.imageData, this.effects[i].params);
            }

            this.canvas.getContext().putImageData(this.imageData, 0, 0);
            exportedImage.src = this.canvas.toDataURL(imageType);
            container.appendChild(exportedImage);
        };

        /**
         * Apply effect on whole project.
         */
        this.applyEffect = function()
        {
            applyEffect.apply(this, arguments);
        };

        // call initializer
        this.initialize(width, height);
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
    var LayerObject = function(obj, layer, x, y, opts)
    {
        var data = {
            obj: obj,
            x: x,
            y: y,
            opts: opts,
            layer: layer
        };

        this.effects = [];

        /**
         * Getter for object placed on layer.
         * @returns {*}
         */
        this.getObject = function()
        {
            return data.obj;
        };

        /**
         * Get start x position of placed object.
         * @returns {int}
         */
        this.getX = function()
        {
            return data.x;
        };

        /**
         * Get start y position of placed object.
         * @returns {int}
         */
        this.getY = function()
        {
            return data.y;
        };

        /**
         * Get width of wrapped object.
         * @returns {int}
         */
        this.getWidth = function()
        {
            return data.obj.getWidth();
        };

        /**
         * Get height of wrapped object.
         * @returns {int}
         */
        this.getHeight = function()
        {
            return data.obj.getHeight();
        };

        /**
         * Get ImageData array of placed object.
         * @returns {ImageData}
         */
        this.exportObject = function()
        {
            var imageData = data.obj.getImageData(), i;
            for(i = 0; i < this.effects.length; i++)
            {
                imageData = this.effects[i].effect.run(imageData, this.effects[i].params);
            }
            return imageData;
        };

        /**
         * Apply effect object put on layer.
         * @param
         */
        this.applyEffect = function()
        {
            applyEffect.apply(this, arguments);
        };

        /**
         * Move object.
         * @param x
         * @param y
         * @returns {LayerObject}
         */
        this.moveXY = function(x, y)
        {
            this.moveX(x);
            this.moveY(y);
            return this;
        };

        /**
         * Move horizontal object.
         * @param x
         * @returns {LayerObject}
         */
        this.moveX = function(x)
        {
            data.x += (x | 0);
            return this;
        };

        /**
         * Move horizontal object.
         * @param y
         * @returns {LayerObject}
         */
        this.moveY = function(y)
        {
            data.y += (y | 0);
            return this;
        };

        /**
         * Set position.
         * @param x
         * @param y
         */
        this.setXY = function(x, y)
        {
            this.setX(x);
            this.setY(y);
            return this;
        };

        /**
         * Set horizontal position
         * @param x
         * @returns {LayerObject}
         */
        this.setX = function(x)
        {
            data.x = x;
            return this;
        };

        /**
         * Set vertical position
         * @param y
         * @returns {LayerObject}
         */
        this.setY = function(y)
        {
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
        this.resize = function(newWidth, newHeight, mode, isLayerResize)
        {
            var oldWidth = this.getWidth(),
                oldHeight = this.getHeight(),
                ratioX = newWidth / oldWidth,
                ratioY = newHeight / oldHeight;

            if(isLayerResize)
            {
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
        this.crop = function(startX, startY, width, height)
        {
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
    var Layer = function()
    {
        this.canvas = null;
        this.imageData = null;
        this.objects = [];
        this.effects = [];
        this.width = 0;
        this.height = 0;
        this.parameters = {};

        /**
         * Initializer.
         */
        this.initialize = function()
        {
            this.width = arguments[0];
            this.height = arguments[1];

            this.parameters = arguments[2] || {};

            this.canvas = new Canvas(this.width, this.height);
            this.imageData = this.canvas.getContext().createImageData(this.width, this.height);
        };

        /**
         * Put object on layer
         * @param {Window.Imagizer.Image|Window.Imagizer.SimpleText} obj Object that we want to put on layer
         * @param {int} startX Start x position of object on layer
         * @param {int} startY Start y position of object on layer
         */
        this.put = function(obj, startX, startY)
        {
            var put = new LayerObject(obj, this, startX, startY, {});
            this.objects.push(put);
            return put;
        };

        /**
         * Exports layer to container -> selector.
         * @param selector
         * @param imageType
         */
        this.exportTo = function(selector, imageType)
        {
            imageType = imageType || "image/png";

            this.exportLayer();

            var container = doc.querySelector(selector),
                exportedImage = new Image();

            exportedImage.src = this.canvas.toDataURL(imageType);
            container.appendChild(exportedImage);
        };

        /**
         * Merge all object on layer to one ImageData array.
         * @returns {ImageData}
         */
        this.exportLayer = function()
        {
            var i,
                layerObject;

            for(i = 0; i < this.objects.length; i += 1)
            {
                layerObject = this.objects[i];
                this.imageData = mergeImageData({
                    width: this.width,
                    height: this.height,
                    imageData: this.imageData
                }, {
                    x: layerObject.getX(),
                    y: layerObject.getY(),
                    width: layerObject.getWidth(),
                    height: layerObject.getHeight(),
                    imageData: layerObject.exportObject()
                }, mergeCallback);
            }

            for(i = 0; i < this.effects.length; i++)
            {
                this.imageData = this.effects[i].effect.run(this.imageData, this.effects[i].params);
            }

            return this.imageData;
        };

        /**
         * Apply effect on whole layer.
         */
        this.applyEffect = function()
        {
            applyEffect.apply(this, arguments);
        };

        /**
         * Resize all objects on layer.
         */
        this.resize = function(newWidth, newHeight, mode)
        {
            var i;

            for(i = 0; i < this.objects.length; i += 1)
            {
                this.objects[i].resize(newWidth, newHeight, mode, true);
            }

            return this;
        };

        /**
         * Move all objects on layer.
         * @param {int} x
         * @param {int} y
         * @returns {Layer}
         */
        this.moveXY = function(x, y)
        {
            this.moveX(x);
            this.moveY(y);
            return this;
        };

        /**
         * Move horizontal all objects on layer.
         * @param x
         */
        this.moveX = function(x)
        {
            var i;
            for(i = 0; i < this.objects.length; i += 1)
            {
                this.objects[i].moveX(x);
            }
            return this;
        };

        /**
         * Move vertical all objects on layer.
         * @param y
         */
        this.moveY = function(y)
        {
            var i;
            for(i = 0; i < this.objects.length; i += 1)
            {
                this.objects[i].moveY(y);
            }
            return this;
        };

        // call initializer
        this.initialize.apply(this, arguments);
    };

    /**
     * PointEffect - wrapper for callback function executed on each pixel
     * @constructor
     */
    var PointEffect = function(params)
    {
        var callback = params.callback,
            additionalParameters = params.opts;

        /**
         * Run effect
         * @param {ImageData} imageData
         * @param {Array} parameters
         * @returns {ImageData}
         */
        this.run = function(imageData, parameters)
        {
            additionalParameters && additionalParameters.defaults && (parameters = Helpers.extend(additionalParameters.defaults, parameters));

            var x, y,
                firstPixelIndex,
                result,
                args,
                imageDataCopy = new Uint8ClampedArray(imageData.data), // copy image data
                i,
                /**
                 * Get ImageData array index from x and y position
                 * @param x
                 * @param y
                 * @returns {number}
                 */
                getIndex = function getIndex(x, y)
                {
                    return y * imageData.width * 4 + x * 4;
                },
                normalizePixelValue = function(value)
                {
                    return Math.min(Math.max(value, 0), 255) | 0;
                },
                sandbox = { // object invoked as this in effect callback
                    /**
                     * Get changed pixel
                     * @param {int} x
                     * @param {int} y
                     * @returns {{r: *, g: *, b: *, a: *}}
                     */
                    getPixel: function(x, y)
                    {
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
                    getOriginalPixel: function(x, y)
                    {
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
                    setPixel: function(x, y, rgba)
                    {
                        var index = getIndex(x, y);
                        imageDataCopy[index + 0] = normalizePixelValue(rgba.r);
                        imageDataCopy[index + 1] = normalizePixelValue(rgba.g);
                        imageDataCopy[index + 2] = normalizePixelValue(rgba.b);
                        imageDataCopy[index + 3] = normalizePixelValue(rgba.a);
                    },
                    /**
                     * Data created by effect init function
                     */
                    data: (additionalParameters && typeof additionalParameters.before === "function")
                        ? additionalParameters.before.call(this, parameters, imageData.width, imageData.height, imageData)
                        : {},
                    /**
                     * ImageData width
                     */
                    width: imageData.width,
                    /**
                     * ImageData height
                     */
                    height: imageData.height
                };

            for(y = 0; y < imageData.height; y += 1)
            {
                for(x = 0; x < imageData.width; x += 1)
                {
                    firstPixelIndex = getIndex(x, y);

                    result = callback.apply(sandbox, [
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
                    ]);

                    if(typeof result === "object")
                    {
                        imageDataCopy[firstPixelIndex + 0] = normalizePixelValue(result.r);
                        imageDataCopy[firstPixelIndex + 1] = normalizePixelValue(result.g);
                        imageDataCopy[firstPixelIndex + 2] = normalizePixelValue(result.b);
                        imageDataCopy[firstPixelIndex + 3] = normalizePixelValue(result.a);
                    }
                }
            }
            imageData.data.set(imageDataCopy);
            return imageData;
        };
    };

    /**
     * TransformEffect - used in effects where we move pixels
     * @param params
     * @constructor
     */
    var TransformEffect = function(params)
    {
        var callback = params.callback,
            additionalParameters = params.opts;

        /**
         * Run effect
         * @param {ImageData} imageData
         * @param {Array} parameters
         * @returns {ImageData}
         */
        this.run = function(imageData, parameters)
        {
            additionalParameters && additionalParameters.defaults && (parameters = Helpers.extend(additionalParameters.defaults, parameters));

            var x, y,
                sandbox = {
                    data: (additionalParameters && typeof additionalParameters.before === "function")
                        ? additionalParameters.before.call(null, parameters, imageData.width, imageData.height, imageData)
                        : {}
                },
                imageDataCopy = new Uint8ClampedArray(imageData.data);

            for(y = 0; y < imageData.height; y += 1)
            {
                for(x = 0; x < imageData.width; x += 1)
                {
                    var newXY = callback.call(sandbox, x, y),
                        newX = Math.floor(newXY[0]),
                        newY = Math.floor(newXY[1]),
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
        };

    };

    /**
     * Helper for creating effect object.
     */
    var Effects = new function()
    {
        var effects = {};

        /**
         * Defines a single pixel effects. Most used by filters.
         * @param name
         * @param pixelCallback
         * @param [opts]
         */
        this.definePoint = function(name, pixelCallback, opts)
        {
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
        this.defineTransform = function(name, callback, opts)
        {
            effects[name] = new TransformEffect({
                callback: callback,
                opts: opts
            });
        };

        /**
         * Getter for effect - get by given name
         * @param {string} name
         * @returns {Effect}
         */
        this.get = function(name)
        {
            if(!effects[name])
            {
                throw "Effect '" + name + "' doesn't exists."
            }
            return effects[name];
        };

        /**
         * Computes filter data by given array
         * @param matrix
         * @returns {{matrix: *, norm: number, size: number, margin: number}}
         */
        this.createFilterData = function(matrix)
        {
            var norm = 0,
                i, j;

            for(i = 0; i < matrix.length; i += 1)
            {
                norm += matrix[i];
            }
            if(norm === 0)
            {
                norm = 1;
            }

            return {
                matrix: matrix,
                norm: norm,
                size: Math.sqrt(matrix.length),
                margin: (Math.sqrt(matrix.length) - 1) / 2
            };
        };

        /**
         * Filter matrixes definitions.
         * @type {Object}}
         */
        this.filterDefinitions = {
            "averaging": [1, 1, 1, 1, 1, 1, 1, 1, 1],
            "averaging-square": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            "averaging-circle": [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
            "averaging-lp1": [1, 1, 1, 1, 2, 1, 1, 1, 1],
            "averaging-lp2": [1, 1, 1, 1, 4, 1, 1, 1, 1],
            "averaging-lp3": [1, 1, 1, 1, 12, 1, 1, 1, 1],
            "averaging-pyramidal": [1, 2, 3, 2, 1, 2, 4, 6, 4, 2, 3, 6, 9, 6, 3, 2, 4, 6, 4, 2, 1, 2, 3, 2, 1]
        };
    };

    /*
     EFFECTS DEFINITIONS
     Thanks to Jerry and his Java Image Filters.
     http://www.jhlabs.com/ip/filters/index.html
     */

    Effects.definePoint("gray-scale", function(pixel, x, y)
    {
        var newRGB = 0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b;
        return {
            r: newRGB,
            g: newRGB,
            b: newRGB,
            a: pixel.a
        };
    });

    Effects.definePoint("sepia", function(pixel, x, y, parameters)
    {
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

    Effects.definePoint("adjust-contrast-brightness", function(pixel, x, y, parameters)
    {
        pixel.r = pixel.r * parameters.brightness;
        pixel.r = (pixel.r - 0.5) * parameters.contrast + 0.5;

        pixel.g = pixel.g * parameters.brightness;
        pixel.g = (pixel.g - 0.5) * parameters.contrast + 0.5;

        pixel.b = pixel.b * parameters.brightness;
        pixel.b = (pixel.b - 0.5) * parameters.contrast + 0.5;

        return pixel
    }, {
        defaults: {
            contrast: 1,
            brightness: 1
        }
    });

    Effects.definePoint("diffusion", function(pixel, x, y, parameters, width, height)
    {
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

        if(!parameters.colorDither)
        {
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

        if(parameters.granulate)
        {
            for(i = -1; i <= 1; i += 1)
            {
                iy = i + y;
                if(iy < 0 || iy >= height)
                {
                    continue;
                }
                for(j = -1; j <= 1; j += 1)
                {
                    jx = j + x;
                    if(jx < 0 || jx >= width)
                    {
                        continue;
                    }
                    w = parameters.matrix[(i + 1) * 3 + j + 1];
                    if(w !== 0)
                    {
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
        before: function(parameters, width, height)
        {
            var i, sum = 0, map = [], div = [];

            for(i = 0; i < parameters.matrix.length; i += 1)
            {
                sum += parameters.matrix[i];
            }

            for(i = 0; i < parameters.levels; i += 1)
            {
                map[i] = parseInt(255 * i / (parameters.levels - 1));
            }

            for(i = 0; i < 256; i += 1)
            {
                div[i] = parseInt(parameters.levels * i / 256);
            }

            return {
                sum: sum,
                map: map,
                div: div
            };
        }
    });

    Effects.definePoint("dither", function(pixel, x, y, parameters, width, height)
    {
        var col = x % this.data.cols,
            row = y % this.data.rows,
            v = parameters.matrix[row * this.data.cols + col],
            red = pixel.r, green = pixel.g, blue = pixel.b,
            result = {a: pixel.a};

        if(parameters.colorDither)
        {
            result.r = this.data.map[this.data.mod[red] > v ? this.data.div[red] + 1 : this.data.div[red]];
            result.g = this.data.map[this.data.mod[green] > v ? this.data.div[green] + 1 : this.data.div[green]];
            result.b = this.data.map[this.data.mod[blue] > v ? this.data.div[blue] + 1 : this.data.div[blue]];
        }
        else
        {
            var value = (red + green + blue) / 3;
            result.r = result.g = result.b = this.data.map[this.data.mod[value] > v ? this.data.div[value] + 1 : this.data.div[value]];
        }

        return result;
    }, {
        before: function(parameters, width, height)
        {
            var matrix = parameters.matrix,
                rows, cols,
                map = [], div = [], mod = [],
                i;

            if(typeof matrix === "string")
            {
                matrix = parameters.matrices[matrix];
            }

            rows = Math.sqrt(matrix.length);
            cols = Math.sqrt(matrix.length);

            for(i = 0; i < parameters.levels; i += 1)
            {
                map[i] = 255 * i / (parameters.levels - 1);
            }

            for(i = 0; i < 256; i += 1)
            {
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

    Effects.definePoint("exposure", function(pixel, x, y, parameters, width, height)
    {
        pixel.r = (1 - Math.exp(-pixel.r / 255 * parameters.exposure)) * 255;
        pixel.g = (1 - Math.exp(-pixel.g / 255 * parameters.exposure)) * 255;
        pixel.b = (1 - Math.exp(-pixel.b / 255 * parameters.exposure)) * 255;

        return pixel;
    }, {
        defaults: {
            exposure: 1
        }
    });

    Effects.definePoint("gain", function(pixel, x, y, parameters, width, height)
    {
        var red = (1 / parameters.gain - 2) * (1 - 2 * pixel.r / 255),
            green = (1 / parameters.gain - 2) * (1 - 2 * pixel.g / 255),
            blue = (1 / parameters.gain - 2) * (1 - 2 * pixel.b / 255);

        if(pixel.r / 255 < 0.5)
        {
            red = (pixel.r / 255) / red + 1;
        }
        else
        {
            red = (red - (pixel.r / 255)) / (red - 1);
        }

        if(pixel.g / 255 < 0.5)
        {
            green = (pixel.g / 255) / green + 1;
        }
        else
        {
            green = (green - (pixel.g / 255)) / (green - 1);
        }

        if(pixel.b / 255 < 0.5)
        {
            blue = (pixel.b / 255) / blue + 1;
        }
        else
        {
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

    Effects.definePoint("gamma", function(pixel, x, y, parameters, width, height)
    {
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
        before: function(parameters, width, height)
        {
            var table = {
                r: [],
                g: [],
                b: []
            }, i;

            for(i = 0; i < 256; i += 1)
            {
                table.r[i] = parseInt(((255 * Math.pow(i / 255, 1 / parameters.gammaRed)) + 0.5));
                table.g[i] = parseInt(((255 * Math.pow(i / 255, 1 / parameters.gammaGreen)) + 0.5));
                table.b[i] = parseInt(((255 * Math.pow(i / 255, 1 / parameters.gammaBlue)) + 0.5));
            }

            return {
                table: table
            };
        }
    });

    Effects.definePoint("gray", function(pixel, x, y, parameters, width, height)
    {
        return {
            r: (pixel.r + 255) / 2,
            g: (pixel.g + 255) / 2,
            b: (pixel.b + 255) / 2,
            a: pixel.a
        }
    }, {
        defaults: {}
    });

    Effects.definePoint("HSBAdjust", function(pixel, x, y, parameters, width, height)
    {
        var hsb = Helpers.Color.RGBtoHSB(pixel.r, pixel.g, pixel.b);

        hsb.h += parameters.h;
        while(hsb.h < 0)
        {
            hsb.h += Math.PI * 2;
        }

        hsb.s += parameters.s;
        hsb.s = Math.max(Math.min(hsb.s, 1), 0);

        hsb.b += parameters.b;
        hsb.b = Math.max(Math.min(hsb.b, 1), 0);

        var result = Helpers.Color.HSBtoRGB(hsb.h, hsb.s, hsb.b);
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

    Effects.definePoint("invertAlpha", function(pixel)
    {
        pixel.a = 255 - pixel.a;
        return pixel;
    });

    Effects.definePoint("invert", function(pixel)
    {
        pixel.r = 255 - pixel.r;
        pixel.g = 255 - pixel.g;
        pixel.b = 255 - pixel.b;
        return pixel;
    });

    Effects.definePoint("levels", function(pixel, x, y, parameters)
    {
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
        before: function(parameters, width, height, pixels)
        {
            var Histogram = function(imageData, width, height, offset, stride)
            {
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

                for(i = 0; i < histogram.length; i += 1)
                {
                    histogram[i] = new Array(256);
                    for(j = 0; j < 256; j += 1)
                    {
                        histogram[i][j] = 0;
                    }
                }

                for(y = 0; y < height; y += 1)
                {
                    for(x = 0; x < width; x += 1)
                    {
                        index = y * width * 4 + x * 4;
                        histogram[RED][imageData.data[index]]++;
                        histogram[GREEN][imageData.data[index + 1]]++;
                        histogram[BLUE][imageData.data[index + 2]]++;
                    }
                }

                for(i = 0; i < 256; i += 1)
                {
                    if(histogram[RED][i] !== histogram[GREEN][i] || histogram[GREEN][i] !== histogram[BLUE][i])
                    {
                        isGray = false;
                        break;
                    }
                }

                for(i = 0; i < 3; i += 1)
                {
                    for(j = 0; j < 256; j += 1)
                    {
                        if(histogram[i][j] > 0)
                        {
                            minValue[i] = j;
                            break;
                        }
                    }
                    for(j = 255; j >= 0; j -= 1)
                    {
                        if(histogram[i][j] > 0)
                        {
                            maxValue[i] = j;
                            break;
                        }
                    }
                    minFrequency[i] = Infinity;
                    maxFrequency[i] = 0;
                    for(j = 0; j < 256; j += 1)
                    {
                        minFrequency[i] = Math.min(minFrequency[i], histogram[i][j]);
                        maxFrequency[i] = Math.max(maxFrequency[i], histogram[i][j]);
                        mean[i] += j * histogram[i][j];
                    }
                    mean[i] /= numSamples;
                    minValue[GRAY] = Math.min(minValue[RED], minValue[GREEN], minValue[BLUE]);
                    maxValue[GRAY] = Math.max(maxValue[RED], maxValue[GREEN], maxValue[BLUE]);
                }

                this.getNumSamples = function()
                {
                    return numSamples;
                };

                this.isGray = function()
                {
                    return isGray;
                };

                this.getFrequency = function(channel, value)
                {
                    if(!value)
                    {
                        if(numSamples > 0 && isGray && value >= 0 && value <= 255)
                        {
                            return histogram[0][value];
                        }
                        return -1;
                    }
                    if(numSamples < 1 || channel < 0 || channel > 2 || value < 0 || value > 255)
                    {
                        return -1;
                    }
                    return histogram[channel][value];
                };

                this.getMinFrequency = function(channel)
                {
                    if(!channel)
                    {
                        if(numSamples > 0 && isGray)
                        {
                            return minFrequency[0];
                        }
                        return -1;
                    }
                    if(numSamples < 1 || channel < 0 || channel > 2)
                    {
                        return -1;
                    }
                    return minFrequency[channel];
                };

                this.getMaxFrequency = function(channel)
                {
                    if(!channel)
                    {
                        if(numSamples > 0 && isGray)
                        {
                            return maxFrequency[0];
                        }
                        return -1;
                    }
                    if(numSamples < 1 || channel < 0 || channel > 2)
                    {
                        return -1;
                    }
                    return maxFrequency[channel];
                };

                this.getMinValue = function(channel)
                {
                    if(!channel)
                    {
                        if(numSamples > 0 && isGray)
                        {
                            return minValue[0];
                        }
                        return -1;
                    }
                    return minValue[channel];
                };

                this.getMaxValue = function(channel)
                {
                    if(!channel)
                    {
                        if(numSamples > 0 && isGray)
                        {
                            return maxValue[0];
                        }
                        return -1;
                    }
                    return maxValue[channel];
                };

                this.getMeanValue = function(channel)
                {
                    if(!channel)
                    {
                        if(numSamples > 0 && isGray)
                        {
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

            for(i = 0; i < lut.length; i += 1)
            {
                lut[i] = new Array(256);
            }
            if(low === high)
            {
                high++;
            }

            for(i = 0; i < 3; i += 1)
            {
                for(j = 0; j < 256; j += 1)
                {
                    lut[i][j] = (255 * (parameters.lowOutput + (parameters.highOutput - parameters.lowOutput) * (j - low) / (high - low)))
                }
            }

            return {
                lut: lut
            }
        }
    });

    Effects.definePoint("lookup", function(pixel, x, y, parameters)
    {
        // TODO
    }, {
        defaults: {},
        before: function(parameters, width, height)
        {

        }
    });

    Effects.definePoint("mapColors", function(pixel, x, y, parameters)
    {
        // TODO
    }, {
        defaults: {},
        before: function(parameters, width, height)
        {

        }
    });

    Effects.definePoint("posterize", function(pixel, x, y, parameters)
    {
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
        before: function(parameters, width, height)
        {
            var levels = [],
                i;

            for(i = 0; i < 256; i += 1)
            {
                levels[i] = parseInt(255 * (parameters.levels * i / 256) / (parameters.levels - 1));
            }

            return {
                levels: levels
            };
        }
    });

    Effects.definePoint("quantize", function(pixel, x, y, parameters)
    {
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
        before: function(parameters, width, height, imageData)
        {
            var sum = 0,
                i = parameters.matrix.length;

            while(i--)
            {
                sum += parameters.matrix[i]
            }

            return {
                sum: sum
            };
        }
    });

    Effects.definePoint("rescale", function(pixel, x, y, parameters)
    {
        pixel.r = parameters.scale * pixel.r;
        pixel.g = parameters.scale * pixel.g;
        pixel.b = parameters.scale * pixel.b;

        return pixel;
    }, {
        defaults: {
            scale: 1
        }
    });

    Effects.definePoint("solarize", function(pixel, x, y, parameters)
    {
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

    Effects.definePoint("threshold", function(pixel, x, y, parameters)
    {
        var grayscale = (pixel.r + pixel.g + pixel.b) / 3;

        if(grayscale >= 127)
        {
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

    Effects.definePoint("tritone", function(pixel, x, y, parameters)
    {
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
        before: function(parameters)
        {
            var lut = [],
                i, t;

            for(i = 0; i < 128; i += 1)
            {
                t = i / 127;
                lut[i] = Helpers.Color.mixColors(t, parameters.shadowColor, parameters.midColor);
            }
            for(i = 128; i < 256; i += 1)
            {
                t = (i - 127) / 128;
                lut[i] = Helpers.Color.mixColors(t, parameters.midColor, parameters.highColor);
            }
            return {
                lut: lut
            };
        }
    });

    Effects.definePoint("filter-linear", function(pixel, x, y, parameters, width, height)
    {
        var filter = this.data,
            i, j,
            sumR = 0, sumG = 0, sumB = 0,
            tmpPixel;

        if(x < filter.margin || y < filter.margin || x > width - filter.margin || y > height - filter.margin)
        {
            return false;
        }

        for(i = 0; i < filter.size; i += 1)
        {
            for(j = 0; j < filter.size; j += 1)
            {
                tmpPixel = this.getPixel(x + j - filter.margin, y + i - filter.margin);
                sumR += (filter.matrix[i + j * filter.size] * tmpPixel.r);
                sumG += (filter.matrix[i + j * filter.size] * tmpPixel.g);
                sumB += (filter.matrix[i + j * filter.size] * tmpPixel.b);
            }
        }

        sumR /= filter.norm;
        sumG /= filter.norm;
        sumB /= filter.norm;

        pixel.r = sumR;
        pixel.g = sumG;
        pixel.b = sumB;

        return pixel;
    }, {
        before: function(parameters, width, height)
        {
            var matrix = parameters;
            if(typeof matrix === "string")
            {
                matrix = win.Imagizer.Effects.filterDefinitions[matrix];
            }
            return win.Imagizer.Effects.createFilterData(matrix);
        }
    });

    // Distortion and Warping Filters
    Effects.defineTransform("diffuse", function(x, y, parameters)
    {
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
        before: function(parameters, x, y)
        {
            var sinTable = new Array(256),
                cosTable = new Array(256),
                i,
                angle;
            for(i = 0; i < 256; i += 1)
            {
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

    win.Imagizer.Project = Project;
    win.Imagizer.Layer = Layer;
    win.Imagizer.Image = ImageObj;
    win.Imagizer.SimpleText = TextObj;
    win.Imagizer.Effects = Effects;
    win.Imagizer.Helpers = Helpers;
    win.Imagizer.BaseOnLayerObject = baseOnLayerObject;

}(window, document));