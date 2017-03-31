import CanvasWrapper from './CanvasWrapper';
import {cropImageData} from '../helpers/common';
import EffectsRepository from './EffectsRepository';

class LayerObject {
    constructor(obj, layer, x, y, opts) {
        this.obj = obj;
        this.layer = this;
        this.x = x;
        this.y = y;
        this.opts = opts;
        this.effects = [];
    }

    getObject() {
        return this.obj;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y
    }

    getWidth() {
        return this.obj.getWidth();
    }

    getHeight() {
        return this.obj.getHeight();
    }

    exportObject() {
        let imageData = this.obj.getImageData();
        for (let i = 0; i < this.effects.length; i += 1) {
            imageData = this.effects[i].effect.run(imageData, this.effects[i].params);
        }
        return imageData;
    }

    applyEffect(name, parameters) {
        this.effects.push({
            name,
            effect: new (EffectsRepository.get(name)),
            parameters
        });
    }

    moveXY(x, y) {
        this.moveX(x);
        this.moveY(y);
        return this;
    }

    moveX(x) {
        this.x += (x | 0);
        return this;
    }

    moveY(y) {
        this.y += (y | 0);
        return this;
    }

    setXY(x, y) {
        this.setX(x);
        this.setY(y);
        return this;
    }

    setX(x) {
        this.x = x;
        return this;
    }

    setY(y) {
        this.y = y;
        return this;
    }

    resize(newWidth, newHeight, mode, isLayerResize) {
        let oldWidth = this.getWidth(),
            oldHeight = this.getHeight(),
            ratioX = newWidth / oldWidth,
            ratioY = newHeight / oldHeight;

        if (isLayerResize) {
            this.moveXY(-this.getX() * ratioX, -this.getY() * ratioY);
        }

        this.getObject().resize(newWidth, newHeight, mode);

        return this;
    }

    crop(startX, startY, width, height) {
        let object = this.getObject(),
            oldImageData = object.getImageData(),
            canvas = new CanvasWrapper(width, height),
            newImageData = canvas.getContext().createImageData(width, height);

        newImageData = cropImageData(oldImageData, newImageData, startX, startY, width, height);

        object
            .setImageData(newImageData)
            .setWidth(width)
            .setHeight(height);

        this.setXY(startX, startY);

        return this;
    };
}

export default LayerObject;