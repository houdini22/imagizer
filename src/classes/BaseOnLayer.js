import CanvasWrapper from './CanvasWrapper'
import {
    resizeNearestNeighbour,
    resizeBilinearInterpolation,
    resizeBiquadraticInterpolation
} from '../helpers/resize'

class BaseOnLayerObject {
    constructor() {
        this.imageData = null;
        this.canvas = null;
        this.width = 0;
        this.height = 0;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    setWidth(value) {
        this.width = value;
        return this;
    }

    setHeight(value) {
        this.height = value;
        return this;
    }

    getImageData() {
        if (!this.imageData) {
            this.imageData = this.canvas.getContext().getImageData(0, 0, this.getWidth(), this.getHeight());
        }
        return this.imageData;
    }

    setImageData(value) {
        this.imageData = value;
        return this;
    }

    resize(newWidth, newHeight, mode = 'nearest-neighbour') {
        let oldImageData = this.getImageData(),
            canvas = new CanvasWrapper(newWidth, newHeight),
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
}

export default BaseOnLayerObject;