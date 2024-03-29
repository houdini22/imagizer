import BasePointEffect from "../BasePoint";

interface BeforeData {
  cols: number;
  rows: number;
  map: object;
  mod: object;
  div: object;
}

export interface DitherParameters {
  matrices: {
    ditherMagic4x4Matrix: Array<number>;
    ditherOrdered4x4Matrix: Array<number>;
    ditherLines4x4Matrix: Array<number>;
    dither90Halftone6x6Matrix: Array<number>;
    ditherOrdered6x6Matrix: Array<number>;
    ditherOrdered8x8Matrix: Array<number>;
    ditherCluster3Matrix: Array<number>;
    ditherCluster4Matrix: Array<number>;
    ditherCluster8Matrix: Array<number>;
  };
  levels: number;
  matrix: string | Array<number>;
  colorDither: boolean;
}

class DitherEffect extends BasePointEffect {
  static getName(): string {
    return "dither";
  }

  data: BeforeData = {
    cols: 0,
    rows: 0,
    map: {},
    mod: {},
    div: {},
  };

  getDefaultParameters(): DitherParameters {
    return {
      matrices: {
        ditherMagic4x4Matrix: [
          0, 14, 3, 13, 11, 5, 8, 6, 12, 2, 15, 1, 7, 9, 4, 10,
        ],
        ditherOrdered4x4Matrix: [
          0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5,
        ],
        ditherLines4x4Matrix: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        ],
        dither90Halftone6x6Matrix: [
          29, 18, 12, 19, 30, 34, 17, 7, 4, 8, 20, 28, 11, 3, 0, 1, 9, 27, 16,
          6, 2, 5, 13, 26, 25, 15, 10, 14, 21, 31, 33, 25, 24, 23, 33, 36,
        ],
        ditherOrdered6x6Matrix: [
          1, 59, 15, 55, 2, 56, 12, 52, 33, 17, 47, 31, 34, 18, 44, 28, 9, 49,
          5, 63, 10, 50, 6, 60, 41, 25, 37, 21, 42, 26, 38, 22, 3, 57, 13, 53,
          0, 58, 14, 54, 35, 19, 45, 29, 32, 16, 46, 30, 11, 51, 7, 61, 8, 48,
          4, 62, 43, 27, 39, 23, 40, 24, 36, 20,
        ],
        ditherOrdered8x8Matrix: [
          1, 235, 59, 219, 15, 231, 55, 215, 2, 232, 56, 216, 12, 228, 52, 212,
          129, 65, 187, 123, 143, 79, 183, 119, 130, 66, 184, 120, 140, 76, 180,
          116, 33, 193, 17, 251, 47, 207, 31, 247, 34, 194, 18, 248, 44, 204,
          28, 244, 161, 97, 145, 81, 175, 111, 159, 95, 162, 98, 146, 82, 172,
          108, 156, 92, 9, 225, 49, 209, 5, 239, 63, 223, 10, 226, 50, 210, 6,
          236, 60, 220, 137, 73, 177, 113, 133, 69, 191, 127, 138, 74, 178, 114,
          134, 70, 188, 124, 41, 201, 25, 241, 37, 197, 21, 255, 42, 202, 26,
          242, 38, 198, 22, 252, 169, 105, 153, 89, 165, 101, 149, 85, 170, 106,
          154, 90, 166, 102, 150, 86, 3, 233, 57, 217, 13, 229, 53, 213, 0, 234,
          58, 218, 14, 230, 54, 214, 131, 67, 185, 121, 141, 77, 181, 117, 128,
          64, 186, 122, 142, 78, 182, 118, 35, 195, 19, 249, 45, 205, 29, 245,
          32, 192, 16, 250, 46, 206, 30, 246, 163, 99, 147, 83, 173, 109, 157,
          93, 160, 96, 144, 80, 174, 110, 158, 94, 11, 227, 51, 211, 7, 237, 61,
          221, 8, 224, 48, 208, 4, 238, 62, 222, 139, 75, 179, 115, 135, 71,
          189, 125, 136, 72, 176, 112, 132, 68, 190, 126, 43, 203, 27, 243, 39,
          199, 23, 253, 40, 200, 24, 240, 36, 196, 20, 254, 171, 107, 155, 91,
          167, 103, 151, 87, 168, 104, 152, 88, 164, 100, 148, 84,
        ],
        ditherCluster3Matrix: [
          9, 11, 10, 8, 6, 7, 12, 17, 16, 5, 0, 1, 13, 14, 15, 4, 3, 2, 8, 6, 7,
          9, 11, 10, 5, 0, 1, 12, 17, 16, 4, 3, 2, 13, 14, 15,
        ],
        ditherCluster4Matrix: [
          18, 20, 19, 16, 13, 11, 12, 15, 27, 28, 29, 22, 4, 3, 2, 9, 26, 31,
          30, 21, 5, 0, 1, 10, 23, 25, 24, 17, 8, 6, 7, 14, 13, 11, 12, 15, 18,
          20, 19, 16, 4, 3, 2, 9, 27, 28, 29, 22, 5, 0, 1, 10, 26, 31, 30, 21,
          8, 6, 7, 14, 23, 25, 24, 17,
        ],
        ditherCluster8Matrix: [
          64, 69, 77, 87, 86, 76, 68, 67, 63, 58, 50, 40, 41, 51, 59, 60, 70,
          94, 100, 109, 108, 99, 93, 75, 57, 33, 27, 18, 19, 28, 34, 52, 78,
          101, 114, 116, 115, 112, 98, 83, 49, 26, 13, 11, 12, 15, 29, 44, 88,
          110, 123, 124, 125, 118, 107, 85, 39, 17, 4, 3, 2, 9, 20, 42, 89, 111,
          122, 127, 126, 117, 106, 84, 38, 16, 5, 0, 1, 10, 21, 43, 79, 102,
          119, 121, 120, 113, 97, 82, 48, 25, 8, 6, 7, 14, 30, 45, 71, 95, 103,
          104, 105, 96, 92, 74, 56, 32, 24, 23, 22, 31, 35, 53, 65, 72, 80, 90,
          91, 81, 73, 66, 62, 55, 47, 37, 36, 46, 54, 61, 63, 58, 50, 40, 41,
          51, 59, 60, 64, 69, 77, 87, 86, 76, 68, 67, 57, 33, 27, 18, 19, 28,
          34, 52, 70, 94, 100, 109, 108, 99, 93, 75, 49, 26, 13, 11, 12, 15, 29,
          44, 78, 101, 114, 116, 115, 112, 98, 83, 39, 17, 4, 3, 2, 9, 20, 42,
          88, 110, 123, 124, 125, 118, 107, 85, 38, 16, 5, 0, 1, 10, 21, 43, 89,
          111, 122, 127, 126, 117, 106, 84, 48, 25, 8, 6, 7, 14, 30, 45, 79,
          102, 119, 121, 120, 113, 97, 82, 56, 32, 24, 23, 22, 31, 35, 53, 71,
          95, 103, 104, 105, 96, 92, 74, 62, 55, 47, 37, 36, 46, 54, 61, 65, 72,
          80, 90, 91, 81, 73, 66,
        ],
      },
      levels: 6,
      matrix: "ditherMagic4x4Matrix",
      colorDither: true,
    };
  }

  before(
    parameters: DitherParameters,
    width: number,
    height: number,
    imageData: ImageData
  ): BeforeData {
    let matrix = parameters.matrix,
      rows,
      cols,
      map = [],
      div = [],
      mod = [];

    if (typeof matrix === "string") {
      matrix = parameters.matrices[matrix];
    }

    rows = Math.sqrt(matrix.length);
    cols = Math.sqrt(matrix.length);

    for (let i = 0; i < parameters.levels; i += 1) {
      map[i] = (255 * i) / (parameters.levels - 1);
    }

    for (let i = 0; i < 256; i += 1) {
      div[i] = (((parameters.levels - 1) * i) / 256) | 0;
      mod[i] = ((i * (rows * cols + 1)) / 256) | 0;
    }

    return {
      matrix,
      map,
      div,
      mod,
      cols,
      rows,
    };
  }

  callback(
    pixel: {
      r: number;
      g: number;
      b: number;
      a: number;
    },
    x: number,
    y: number,
    parameters: DitherParameters,
    width: number,
    height: number
  ): {
    r: number;
    g: number;
    b: number;
    a: number;
  } {
    let col = x % this.data.cols,
      row = y % this.data.rows,
      v = parameters.matrix[row * this.data.cols + col],
      red = pixel.r,
      green = pixel.g,
      blue = pixel.b,
      result = { a: pixel.a, r: 0, g: 0, b: 0 },
      value;

    if (parameters.colorDither) {
      result.r =
        this.data.map[
          this.data.mod[red] > v ? this.data.div[red] + 1 : this.data.div[red]
        ];
      result.g =
        this.data.map[
          this.data.mod[green] > v
            ? this.data.div[green] + 1
            : this.data.div[green]
        ];
      result.b =
        this.data.map[
          this.data.mod[blue] > v
            ? this.data.div[blue] + 1
            : this.data.div[blue]
        ];
    } else {
      value = (red + green + blue) / 3;
      result.r =
        result.g =
        result.b =
          this.data.map[
            this.data.mod[value] > v
              ? this.data.div[value] + 1
              : this.data.div[value]
          ];
    }

    return result;
  }
}

export default DitherEffect;
