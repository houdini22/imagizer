(function(win, doc)
{
    /**
     * @author Michał Baniowski michal.baniowski@gmail.com
     * @version 0.0.1
     */

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
            var canvas = doc.createElement("canvas"),
                _this = this;

            this.url = url;
            image.src = url;

            doc.body.appendChild(canvas);
            doc.body.appendChild(image);

            image.onload = function()
            {
                var ctx;

                width = image.clientWidth;
                height = image.clientHeight;

                canvas.setAttribute("width", "" + width);
                canvas.setAttribute("height", "" + height);
                doc.body.appendChild(canvas);

                // get image data
                ctx = canvas.getContext("2d");
                ctx.drawImage(image, 0, 0, width, height);
                imageData = ctx.getImageData(0, 0, width, height);

                if(typeof callback === "function")
                {
                    callback.call(_this);
                }

                // remove, we don't need this
                doc.body.removeChild(image);
                doc.body.removeChild(canvas);
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
            canvas = doc.createElement("canvas");
            canvas.setAttribute("width", "" + this.width);
            canvas.setAttribute("height", "" + this.height);

            doc.body.appendChild(canvas);
            canvas.style.display = "none";

            ctx = canvas.getContext("2d");
            imageData = ctx.getImageData(0, 0, this.width, this.height);
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
                exportedImage = new Image();


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

            ctx.putImageData(imageData, 0, 0);
            exportedImage.src = canvas.toDataURL(imageType);
            container.appendChild(exportedImage);
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
        };

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
            // TODO: apply effects
            return data.obj.getImageData();
        };
    };

    /**
     * Layer object. Holds object and effect (TODO)
     * @constructor
     */
    var Layer = function()
    {
        var canvas,
            ctx,
            imageData,
            objects = [];

        /**
         * Initializer.
         */
        this.initialize = function()
        {
            this.width = arguments[0];
            this.height = arguments[1];

            canvas = doc.createElement("canvas");
            canvas.setAttribute("width", "" + this.width);
            canvas.setAttribute("height", "" + this.height);

            doc.body.appendChild(canvas);
            canvas.style.display = "none";

            ctx = canvas.getContext("2d");
            imageData = ctx.createImageData(this.width, this.height);
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

            return imageData;
        };

        // call initializer
        this.initialize.apply(this, arguments);
    };

    win.Imagizer.Project = Project;
    win.Imagizer.Layer = Layer;
    win.Imagizer.Image = ImageObj;

}(window, document));