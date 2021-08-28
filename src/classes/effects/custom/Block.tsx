import BaseCustomEffect from "../BaseCustom";

interface Parameters {
  blockSize: number;
}

class BlockEffect extends BaseCustomEffect {
  static getName() {
    return "block";
  }

  getDefaultParameters(): Parameters {
    return {
      blockSize: 5,
    };
  }

  callback(width: number, height: number, parameters: Parameters) {
    let x, y, w, h, t, r, g, b, pixel, by, bx;

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

            r += pixel.r & 0xff;
            g += pixel.g & 0xff;
            b += pixel.b & 0xff;
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
              a: 255,
            });
          }
        }
      }
    }
  }
}

export default BlockEffect;
