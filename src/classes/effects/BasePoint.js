import BaseEffect from './Base';
import extend from 'extend';

class BasePointEffect extends BaseEffect {
    callback(pixel, x, y, parameters, width, height) {
        throw "Extend it."
    }

    run(imageData, parameters) {

        parameters = extend(true, {}, this.getDefaultParameters(), parameters);

        let x, y,
            firstPixelIndex,
            result,
            imageDataCopy = new Uint8ClampedArray(imageData.data), // copy image data
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
                    let index = getIndex(x, y);
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
                    let index = getIndex(x, y);
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
                    let index = getIndex(x, y);
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

                result = this.callback.call(sandbox,
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

        imageData.data.set(imageDataCopy);
        return imageData;
    }
}

export default BasePointEffect;