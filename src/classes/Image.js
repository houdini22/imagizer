import BaseOnLayerObject from './BaseOnLayer';
import CanvasWrapper from './CanvasWrapper';

class Image extends BaseOnLayerObject {
    constructor() {
        super();
        this.url = null;

        this.image = new window.Image();

        // hide from viewport
        this.image.style.position = "absolute";
        this.image.style.left = "-99999px";
        this.image.style.top = "-99999px";
    }

    load(url, callback) {
        let load = () => {
            this.setWidth(this.image.clientWidth);
            this.setHeight(this.image.clientHeight);

            // get image data
            this.canvas = new CanvasWrapper(this.getWidth(), this.getHeight());
            this.canvas.getContext().drawImage(this.image, 0, 0, this.getWidth(), this.getHeight());

            document.body.removeChild(this.image);

            if (typeof callback === "function") {
                callback.call(this);
            }
        };

        this.url = url;

        document.body.appendChild(this.image);
        this.image.onload = function () {
            load();
        };
        this.image.src = url;
    }
}

export default Image;