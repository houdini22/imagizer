import BaseCustomEffect from "../BaseCustom";

interface Parameters {
  operation: string;
}

class FlipEffect extends BaseCustomEffect {
  static getName(): string {
    return "flip";
  }

  getDefaultParameters() {
    return {
      operation: "FLIP_H", // FLIP_H, FLIP_V, FLIP_HV, FLIP_90CW, FLIP_90CCW, FLIP_180
    };
  }

  callback(width: number, height: number, parameters: Parameters) {
    let x = 0,
      y = 0,
      w = width,
      h = height,
      newX = 0,
      newY = 0,
      newW = w,
      newH = h,
      newRow,
      newCol;

    switch (parameters.operation) {
      case "FLIP_H":
        newX = width - (x + w);
        break;
      case "FLIP_V":
        newY = height - (y + h);
        break;
      case "FLIP_HV":
        newW = h;
        newH = w;
        newX = y;
        newY = x;
        break;
      case "FLIP_90CW":
        newW = h;
        newH = w;
        newX = height - (y + h);
        newY = x;
        break;
      case "FLIP_90CCW":
        newW = h;
        newH = w;
        newX = y;
        newY = width - (x + w);
        break;
      case "FLIP_180":
        newX = width - (x + w);
        newY = height - (y + h);
        break;
    }

    for (y = 0; y < height; y += 1) {
      for (x = 0; x < width; x += 1) {
        newRow = y;
        newCol = x;

        switch (parameters.operation) {
          case "FLIP_H":
            newCol = w - x - 1;
            break;
          case "FLIP_V":
            newRow = h - y - 1;
            break;
          case "FLIP_HV":
            newRow = x;
            newCol = y;
            break;
          case "FLIP_90CW":
            newRow = x;
            newCol = h - y - 1;
            break;
          case "FLIP_90CCW":
            newRow = w - x - 1;
            newCol = y;
            break;
          case "FLIP_180":
            newRow = h - y - 1;
            newCol = w - x - 1;
            break;
        }

        this.setPixel(newCol, newRow, this.getOriginalPixel(x, y));
      }
    }
  }
}

export default FlipEffect;
