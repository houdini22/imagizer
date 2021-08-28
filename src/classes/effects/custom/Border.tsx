import BaseCustomEffect from "../BaseCustom";

interface Parameters {
  leftBorder: number;
  rightBorder: number;
  topBorder: number;
  bottomBorder: number;
  borderColor?: {
    r: number;
    b: number;
    g: number;
    a: number;
  };
}

class BorderEffect extends BaseCustomEffect {
  static getName(): string {
    return "border";
  }

  data = {
    leftBorder: 0,
    rightBorder: 0,
    topBorder: 0,
    bottomBorder: 0,
  };

  getDefaultParameters(): Parameters {
    return {
      leftBorder: 10,
      rightBorder: 10,
      topBorder: 10,
      bottomBorder: 10,
      borderColor: {
        r: 0,
        b: 0,
        g: 0,
        a: 255,
      },
    };
  }

  before(
    parameters: Parameters,
    width: number,
    height: number,
    imageData: ImageData
  ): Parameters {
    return {
      leftBorder: parameters.leftBorder | 0,
      rightBorder: parameters.rightBorder | 0,
      topBorder: parameters.rightBorder | 0,
      bottomBorder: parameters.bottomBorder | 0,
    };
  }

  callback(width, height, parameters) {
    let x, y;

    for (y = 0; y < height; y += 1) {
      for (x = 0; x < width; x += 1) {
        if (this.data.leftBorder > 0 && x < this.data.leftBorder) {
          this.setPixel(x, y, parameters.borderColor);
        }
        if (this.data.rightBorder > 0 && width - this.data.rightBorder < x) {
          this.setPixel(x, y, parameters.borderColor);
        }
        if (this.data.topBorder > 0 && y < this.data.topBorder) {
          this.setPixel(x, y, parameters.borderColor);
        }
        if (this.data.bottomBorder > 0 && height - this.data.bottomBorder < y) {
          this.setPixel(x, y, parameters.borderColor);
        }
      }
    }
  }
}

export default BorderEffect;
