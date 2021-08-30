import BaseCustomEffect from "../BaseCustom";

export interface BlockParameters {
  blockSize: number;
}

class BlockEffect extends BaseCustomEffect {
  static getName(): string {
    return "block";
  }

  getDefaultParameters(): BlockParameters {
    return {
      blockSize: 5,
    };
  }

  callback(width: number, height: number, parameters: BlockParameters) {
    let w, h, t, r, g, b, pixel;

    for (let y = 0; y < height; y += parameters.blockSize) {
      for (let x = 0; x < width; x += parameters.blockSize) {
        w = Math.min(parameters.blockSize, width - x);
        h = Math.min(parameters.blockSize, height - y);
        t = w * h;

        r = 0;
        g = 0;
        b = 0;

        for (let by = 0; by < h; by += 1) {
          for (let bx = 0; bx < w; bx += 1) {
            pixel = this.getOriginalPixel(x + bx, y + by);

            r += pixel.r & 0xff;
            g += pixel.g & 0xff;
            b += pixel.b & 0xff;
          }
        }

        r = r / t;
        g = g / t;
        b = b / t;

        for (let by = 0; by < h; by += 1) {
          for (let bx = 0; bx < w; bx += 1) {
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
