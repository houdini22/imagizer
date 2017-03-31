import {isNode} from '../helpers/common';

class CanvasWrapper {
    constructor(width, height) {
        this.canvas = null;
        this.context = null;
        this.width = 0;
        this.height = 0;
        this.initialize(width, height);
    }

    initialize(width = 0, height = 0) {
        if (isNode()) {
            let Canvas = require('canvas');
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

    setWidth(value) {
        this.canvas.setAttribute("width", "" + value);
        this.width = value;
        return this;
    }

    setHeight(value) {
        this.canvas.setAttribute("height", "" + value);
        this.height = value;
        return this;
    }

    getContext() {
        if (!this.context) {
            this.context = this.canvas.getContext("2d");
        }
        return this.context;
    }

    getCanvas() {
        return this.canvas;
    }

    toDataURL(type) {
        return this.canvas.toDataURL(type);
    }

    destroy() {
        if (!isNode()) {
            document.body.removeChild(this.canvas);
        }
        this.canvas = null;
        this.context = null;
    }
}

export default CanvasWrapper;