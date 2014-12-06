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
        var mergedA = topPixel.a / 255;
        var rootA = bottomPixel.a / 255 * (1 - mergedA);
        var outA = (mergedA + bottomPixel.a * (1 - mergedA) / 255);

        switch (parameters.blendingMode)
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

        var mergedR = topPixel.r;
        var mergedG = topPixel.g;
        var mergedB = topPixel.b;

        mergedR = mergedR * mergedA + rootR * rootA;
        mergedG = mergedG * mergedA + rootG * rootA;
        mergedB = mergedB * mergedA + rootB * rootA;

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
            params: Array.prototype.slice.call(arguments, 1, arguments.length)
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
            if (createNew)
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
     * Effect - wrapper for callback function
     * @constructor
     */
    var Effect = function(params)
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
                    return Math.min(Math.max(value, 0), 255);
                },
                sandbox = { // object invoked as this in effect callback
                    /**
                     * Get original pixel
                     * @param {int} x
                     * @param {int} y
                     * @returns {{r: *, g: *, b: *, a: *}}
                     */
                    getPixel: function(x, y)
                    {
                        var index = getIndex(x, y);
                        return {
                            r: imageData.data[index],
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
                        ? additionalParameters.before.call(this, parameters, imageData.width, imageData.height)
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
                            r: imageData.data[firstPixelIndex + 0],
                            g: imageData.data[firstPixelIndex + 1],
                            b: imageData.data[firstPixelIndex + 2],
                            a: imageData.data[firstPixelIndex + 3]
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
     * Helper for creating effect object.
     */
    var Effects = new function()
    {
        var effects = {};

        /**
         * Creates effect
         * @param {string} name
         * @param {function} pixelCallback
         * @param {Object} [opts]
         */
        this.define = function(name, pixelCallback, opts)
        {
            effects[name] = new Effect({
                callback: pixelCallback,
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
     */

    // gray scale
    Effects.define("gray-scale", function(pixel, x, y)
    {
        var newRGB = 0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b;
        return {
            r: newRGB,
            g: newRGB,
            b: newRGB,
            a: pixel.a
        };
    });

    // sepia
    Effects.define("sepia", function(pixel, x, y, parameters)
    {
        var tmp = 0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b;

        pixel.r = tmp + 2 * parameters[0];
        pixel.g = tmp + parameters[0];
        pixel.b = tmp;

        return pixel;
    });

    /*
     FILTERS DEFINITIONS
     */

    // linear filter
    Effects.define("filter-linear", function(pixel, x, y, parameters, width, height)
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
            var matrix = parameters[0];
            if(typeof matrix === "string")
            {
                matrix = win.Imagizer.Effects.filterDefinitions[matrix];
            }
            return win.Imagizer.Effects.createFilterData(matrix);
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