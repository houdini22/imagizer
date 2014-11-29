/**
 * @author Michał Baniowski michal.baniowski@gmail.com
 * @version 0.0.3
 */
;
(function(win, doc)
{
    win.Imagizer = {};

    /**
     * Function used to merge layers and layer objects.
     * @param {object} root Result layer.
     * @param {object} toMerge Layer to merge on
     * @param {function} pixelCallback
     * @returns {*|Window.Imagizer.imageData}
     */
    var mergeImageData = function mergeImageData(root, toMerge, pixelCallback)
    {
        var x, y,
            xx, yy,
            firstOldPixelIndex, firstNewPixelIndex,
            pixelResult;

        for(y = toMerge.y, yy = 0; y < root.height && yy < toMerge.height; y += 1, yy += 1)
        {
            for(x = toMerge.x, xx = 0; x < root.width && xx < toMerge.width; x += 1, xx += 1)
            {
                if(xx < toMerge.width && yy < toMerge.height) // overwrite only rect-size of current layer
                {
                    firstOldPixelIndex = y * root.width * 4 + x * 4;
                    firstNewPixelIndex = yy * toMerge.width * 4 + xx * 4;

                    pixelResult = pixelCallback({
                        r: root.imageData.data[firstOldPixelIndex],
                        g: root.imageData.data[firstOldPixelIndex + 1],
                        b: root.imageData.data[firstOldPixelIndex + 2],
                        a: root.imageData.data[firstOldPixelIndex + 3]
                    }, {
                        r: toMerge.imageData.data[firstNewPixelIndex],
                        g: toMerge.imageData.data[firstNewPixelIndex + 1],
                        b: toMerge.imageData.data[firstNewPixelIndex + 2],
                        a: toMerge.imageData.data[firstNewPixelIndex + 3]
                    }, x, y);

                    if(pixelResult !== false) // skip change
                    {
                        root.imageData.data[firstOldPixelIndex] = pixelResult.r;
                        root.imageData.data[firstOldPixelIndex + 1] = pixelResult.g;
                        root.imageData.data[firstOldPixelIndex + 2] = pixelResult.b;
                        root.imageData.data[firstOldPixelIndex + 3] = pixelResult.a;
                    }
                }
            }
        }
        return root.imageData;
    };

    /**
     * Pixel callback for merging layers and layer objects.
     * rootPixel and mergedPixel is object literal with r, g, b and a properties.
     * @param {object} rootPixel Pixel placed on result layer
     * @param {object} mergedPixel Pixel to merge on
     * @param {int} x Current x position
     * @param {int} y Current y position
     * @returns {object|boolean}
     */
    var mergeCallback = function mergeCallback(rootPixel, mergedPixel, x, y)
    {
        if(mergedPixel.a === 0)
        {
            return false; // skip change - opacity is full
        }
        // alpha compositing
        var mergedA = mergedPixel.a / 255;
        var rootA = rootPixel.a / 255 * (1 - mergedA);
        var outA = (mergedA + rootPixel.a * (1 - mergedA) / 255);

        var rootR = rootPixel.r;
        var rootG = rootPixel.g;
        var rootB = rootPixel.b;

        // todo: blending modes
        var mergedR = mergedPixel.r;
        var mergedG = mergedPixel.g;
        var mergedB = mergedPixel.b;

        mergedR = mergedR * mergedA + rootR * rootA;
        mergedG = mergedG * mergedA + rootG * rootA;
        mergedB = mergedB * mergedA + rootB * rootA;

        mergedR = outA == 0 ? 0 : mergedR / outA;
        mergedG = outA == 0 ? 0 : mergedG / outA;
        mergedB = outA == 0 ? 0 : mergedB / outA;

        return {
            r: (mergedR > 255) ? 255 : ( (mergedR < 0) ? 0 : mergedR ) | 0,
            g: (mergedG > 255) ? 255 : ( (mergedG < 0) ? 0 : mergedG ) | 0,
            b: (mergedB > 255) ? 255 : ( (mergedB < 0) ? 0 : mergedB ) | 0,
            a: (255 * outA) | 0
        }
    };

    /**
     * HTML canvas wrapper
     * @constructor
     */
    var Canvas = function()
    {
        var canvas,
            context,
            width,
            height;

        /**
         * Initializer.
         * @param {int} width
         * @param {int} height
         */
        this.initialize = function(width, height)
        {
            canvas = doc.createElement("canvas");

            // hide from viewport
            canvas.style.position = "absolute";
            canvas.style.left = "-9999px";
            canvas.style.top = "-9999px";

            if(width && height)
            {
                this.setWidth(width);
                this.setHeight(height);
            }

            doc.body.appendChild(canvas);
        };

        /**
         * Setter for width.
         * @param {int} value
         * @returns {Canvas}
         */
        this.setWidth = function(value)
        {
            canvas.setAttribute("width", "" + value);
            width = value;
            return this;
        };

        /**
         * Setter for height.
         * @param {int} value
         * @returns {Canvas}
         */
        this.setHeight = function(value)
        {
            canvas.setAttribute("height", "" + value);
            height = value;
            return this;
        };

        /**
         * Getter for context.
         * @returns {*}
         */
        this.getContext = function()
        {
            if(!context)
            {
                context = canvas.getContext("2d");
            }
            return context;
        };

        /**
         * Export canvas to data url
         * @param {string} type
         * @returns {string|*}
         */
        this.toDataURL = function(type)
        {
            return canvas.toDataURL(type);
        };

        /**
         * Removes canvas from DOM.
         */
        this.destroy = function()
        {
            doc.body.removeChild(canvas);
        };

        // call initializer
        this.initialize.apply(this, arguments);
    };

    /**
     * Image object.
     * @constructor
     */
    var ImageObj = function()
    {
        var image = new Image(),
            imageData = null,
            width = 0,
            height = 0;

        /**
         * Initializer
         */
        this.initialize = function()
        {
            this.url = null;

            // hide from viewport
            image.style.position = "absolute";
            image.style.left = "-9999px";
            image.style.top = "-9999px";
        };

        /**
         * Width getter.
         * @returns {number}
         */
        this.getWidth = function()
        {
            return width;
        };

        /**
         * Height getter.
         * @returns {number}
         */
        this.getHeight = function()
        {
            return height;
        };

        /**
         * Load image and execute callback on load.
         * @param {string} url
         * @param {function} callback
         */
        this.load = function(url, callback)
        {
            var _this = this;

            this.url = url;
            image.src = url;

            doc.body.appendChild(image);

            image.onload = function()
            {
                var canvas;

                width = image.clientWidth;
                height = image.clientHeight;

                // get image data
                canvas = new Canvas(width, height);
                canvas.getContext().drawImage(image, 0, 0, width, height);
                imageData = canvas.getContext().getImageData(0, 0, width, height);

                if(typeof callback === "function")
                {
                    callback.call(_this);
                }

                // clean
                doc.body.removeChild(image);
                canvas.destroy();
            };
        };

        /**
         * Get ImageData of *loaded* image.
         * @returns {ImageData}
         */
        this.getImageData = function()
        {
            return imageData;
        };

        // call initializer
        this.initialize.apply(this, arguments);
    };

    /**
     * Project object. Holds dimensions and layers.
     * @param {int} width
     * @param {int} height
     * @constructor
     */
    var Project = function(width, height)
    {
        var layers = [],
            effects = [],
            startTime = new Date(),
            canvas,
            ctx,
            imageData;

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
            canvas = new Canvas(width, height);
            imageData = canvas.getContext().getImageData(0, 0, width, height);
        };

        /**
         * Create new layer.
         * @returns {Window.Imagizer.Layer}
         */
        this.createLayer = function()
        {
            var layer = new Imagizer.Layer(this.width, this.height);
            layers.push(layer);
            return layer;
        };

        /**
         * Get time diff. Debug method.
         * @returns {number}
         */
        this.getTime = function()
        {
            var end = new Date();
            return end.getTime() - startTime.getTime();
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

            for(i = 0; i < layers.length; i++)
            {
                imageData = mergeImageData({
                    width: this.width,
                    height: this.height,
                    imageData: imageData
                }, {
                    x: 0,
                    y: 0,
                    width: this.width,
                    height: this.height,
                    imageData: layers[i].exportLayer()
                }, mergeCallback);
            }

            for(i = 0; i < effects.length; i++)
            {
                imageData = effects[i].effect.run(imageData, effects[i].params);
            }

            canvas.getContext().putImageData(imageData, 0, 0);
            exportedImage.src = canvas.toDataURL(imageType);
            container.appendChild(exportedImage);
        };

        /**
         * Apply effect on whole project.
         * @param effectName
         */
        this.applyEffect = function(effectName)
        {
            effects.push({
                effect: Effects.get(effectName),
                params: Array.prototype.slice.call(arguments, 1, arguments.length)
            });
        };

        // call initializer
        this.initialize(width, height);
    };

    /**
     * Wrapper for object placed on layer.
     * @param {Window.Imagizer.Image} obj
     * @param {int} x
     * @param {int} y
     * @param {object} opts
     * @constructor
     */
    var LayerObject = function(obj, x, y, opts)
    {
        var data = {
                obj: obj,
                x: x,
                y: y,
                opts: opts
            },
            effects = [];

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
            for(i = 0; i < effects.length; i++)
            {
                imageData = effects[i].effect.run(imageData, effects[i].params);
            }
            return imageData;
        };

        /**
         * Apply effect object put on layer.
         * @param effectName
         */
        this.applyEffect = function(effectName)
        {
            effects.push({
                effect: Effects.get(effectName),
                params: Array.prototype.slice.call(arguments, 1, arguments.length)
            });
        };
    };

    /**
     * Layer object. Holds object and effect (TODO)
     * @constructor
     */
    var Layer = function()
    {
        var canvas,
            imageData,
            objects = [],
            effects = [];

        /**
         * Initializer.
         */
        this.initialize = function()
        {
            this.width = arguments[0];
            this.height = arguments[1];

            canvas = new Canvas(this.width, this.height);
            imageData = canvas.getContext().createImageData(this.width, this.height);
        };

        /**
         * Put object on layer
         * @param {Window.Imagizer.Image} obj Object that we want to put on layer
         * @param {int} startX Start x position of object on layer
         * @param {int} startY Start y position of object on layer
         */
        this.put = function(obj, startX, startY)
        {
            var put = new LayerObject(obj, startX, startY, {});
            objects.push(put);
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

            exportedImage.src = canvas.toDataURL(imageType);
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

            for(i = 0; i < objects.length; i += 1)
            {
                layerObject = objects[i];
                imageData = mergeImageData({
                    width: this.width,
                    height: this.height,
                    imageData: imageData
                }, {
                    x: layerObject.getX(),
                    y: layerObject.getY(),
                    width: layerObject.getWidth(),
                    height: layerObject.getHeight(),
                    imageData: layerObject.exportObject() // TODO?
                }, mergeCallback);
            }

            for(i = 0; i < effects.length; i++)
            {
                imageData = effects[i].effect.run(imageData, effects[i].params);
            }

            return imageData;
        };

        /**
         * Apply effect on whole layer.
         * @param effectName
         */
        this.applyEffect = function(effectName)
        {
            effects.push({
                effect: Effects.get(effectName),
                params: Array.prototype.slice.call(arguments, 1, arguments.length)
            });
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
                        imageDataCopy[index] = rgba.r;
                        imageDataCopy[index + 1] = rgba.g;
                        imageDataCopy[index + 2] = rgba.b;
                        imageDataCopy[index + 3] = rgba.a;
                    },
                    /**
                     * Data created by effect init function
                     */
                    data: (additionalParameters && typeof additionalParameters.before === "function") ? additionalParameters.before.call(this, parameters, imageData.width, imageData.height) : {},
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
                    firstPixelIndex = y * imageData.width * 4 + x * 4;

                    result = callback.apply(sandbox, [
                        {
                            r: imageData.data[firstPixelIndex],
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
                        imageDataCopy[firstPixelIndex] = result.r;
                        imageDataCopy[firstPixelIndex + 1] = result.g;
                        imageDataCopy[firstPixelIndex + 2] = result.b;
                        imageDataCopy[firstPixelIndex + 3] = result.a;
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
         * @param {Object} opts
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
                throw "Effect: " + name + " doesn't exists."
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

        pixel.r = Math.min(pixel.r, 255);
        pixel.g = Math.min(pixel.g, 255);
        pixel.b = Math.min(pixel.b, 255);

        return pixel;
    });

    /*
     FILTERS DEFINITIONS
     */

    Effects.define("filter-linear", function(pixel, x, y, parameters, width, height)
    {
        var filter = this.data,
            i, j,
            sumR = 0, sumG = 0, sumB = 0;

        if(x < filter.margin || y < filter.margin)
        {
            return false;
        }
        if(x > width - filter.margin || y > height - filter.margin)
        {
            return false;
        }

        for(i = 0; i < filter.size; i += 1)
        {
            for(j = 0; j < filter.size; j += 1)
            {
                sumR += (filter.matrix[i + j * filter.size] * this.getPixel(x + j - filter.margin, y + i - filter.margin).r);
                sumG += (filter.matrix[i + j * filter.size] * this.getPixel(x + j - filter.margin, y + i - filter.margin).g);
                sumB += (filter.matrix[i + j * filter.size] * this.getPixel(x + j - filter.margin, y + i - filter.margin).b);
            }
        }

        sumR /= filter.norm;
        sumG /= filter.norm;
        sumB /= filter.norm;

        sumR = Math.min(sumR, 255);
        sumR = Math.max(sumR, 0);
        sumG = Math.min(sumG, 255);
        sumG = Math.max(sumG, 0);
        sumB = Math.min(sumB, 255);
        sumB = Math.max(sumB, 0);

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
    win.Imagizer.Effects = Effects;

}(window, document));