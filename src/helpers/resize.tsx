export function resizeNearestNeighbour(
  oldImageData: ImageData,
  newImageData: ImageData,
  newWidth: number,
  newHeight: number
): ImageData {
  let oldWidth = oldImageData.width,
    oldHeight = oldImageData.height,
    ratioX = oldWidth / newWidth,
    ratioY = oldHeight / newHeight,
    oldPixelIndex,
    newPixelIndex,
    x,
    y;

  for (y = 0; y < newHeight; y += 1) {
    for (x = 0; x < newWidth; x += 1) {
      oldPixelIndex =
        Math.floor(y * ratioY) * oldWidth * 4 + Math.floor(x * ratioX) * 4;
      newPixelIndex = y * newWidth * 4 + x * 4;

      newImageData.data[newPixelIndex + 0] =
        oldImageData.data[oldPixelIndex + 0];
      newImageData.data[newPixelIndex + 1] =
        oldImageData.data[oldPixelIndex + 1];
      newImageData.data[newPixelIndex + 2] =
        oldImageData.data[oldPixelIndex + 2];
      newImageData.data[newPixelIndex + 3] =
        oldImageData.data[oldPixelIndex + 3];
    }
  }

  return newImageData;
}

export function resizeBilinearInterpolation(
  oldImageData: ImageData,
  newImageData: ImageData,
  newWidth: number,
  newHeight: number
): ImageData {
  let oldWidth = oldImageData.width,
    oldHeight = oldImageData.height,
    ratioX = oldWidth / newWidth,
    ratioY = oldHeight / newHeight,
    newPixelIndex,
    x,
    y,
    x0,
    y0,
    dx,
    dy,
    x1,
    y1,
    oldPixelIndex00,
    oldPixelIndex01,
    oldPixelIndex10,
    oldPixelIndex11,
    i,
    j;

  for (i = 0; i < newHeight; i += 1) {
    for (j = 0; j < newWidth; j += 1) {
      x = j * ratioX;
      y = i * ratioY;
      x0 = Math.floor(x);
      y0 = Math.floor(y);
      dx = x - x0;
      dy = y - y0;
      x1 = x0 + 1;
      y1 = y0 + 1;

      if (x1 >= oldWidth) {
        x1 = x0;
      }
      if (y1 >= oldHeight) {
        y1 = y0;
      }

      oldPixelIndex00 = (y0 * oldWidth + x0) * 4;
      oldPixelIndex01 = (y0 * oldWidth + x1) * 4;
      oldPixelIndex10 = (y1 * oldWidth + x0) * 4;
      oldPixelIndex11 = (y1 * oldWidth + x1) * 4;
      newPixelIndex = (i * newWidth + j) * 4;

      newImageData.data[newPixelIndex] =
        (1.0 - dy) *
          ((1.0 - dx) * oldImageData.data[oldPixelIndex00] +
            dx * oldImageData.data[oldPixelIndex01]) +
        dy *
          ((1.0 - dx) * oldImageData.data[oldPixelIndex10] +
            dx * oldImageData.data[oldPixelIndex11]);
      newImageData.data[newPixelIndex + 1] =
        (1.0 - dy) *
          ((1.0 - dx) * oldImageData.data[oldPixelIndex00 + 1] +
            dx * oldImageData.data[oldPixelIndex01 + 1]) +
        dy *
          ((1.0 - dx) * oldImageData.data[oldPixelIndex10 + 1] +
            dx * oldImageData.data[oldPixelIndex11 + 1]);
      newImageData.data[newPixelIndex + 2] =
        (1.0 - dy) *
          ((1.0 - dx) * oldImageData.data[oldPixelIndex00 + 2] +
            dx * oldImageData.data[oldPixelIndex01 + 2]) +
        dy *
          ((1.0 - dx) * oldImageData.data[oldPixelIndex10 + 2] +
            dx * oldImageData.data[oldPixelIndex11 + 2]);
      newImageData.data[newPixelIndex + 3] =
        (1.0 - dy) *
          ((1.0 - dx) * oldImageData.data[oldPixelIndex00 + 3] +
            dx * oldImageData.data[oldPixelIndex01 + 3]) +
        dy *
          ((1.0 - dx) * oldImageData.data[oldPixelIndex10 + 3] +
            dx * oldImageData.data[oldPixelIndex11 + 3]);
    }
  }

  return newImageData;
}

export function resizeBiquadraticInterpolation(
  oldImageData: ImageData,
  newImageData: ImageData,
  newWidth: number,
  newHeight: number
): ImageData {
  let interpolate = function interpolate(f1, f2, f3, d) {
      return f2 + (f3 - f1) * d + (f1 - 2 * f2 + f3) * d * d;
    },
    interpolateNormalize = function interpolateNormalize(f1, f2, f3, d) {
      let result = interpolate(f1, f2, f3, d);
      if (result > 255) {
        return 255;
      }
      if (result < 0) {
        return 0;
      }
      return Math.floor(result);
    },
    oldWidth = oldImageData.width,
    oldHeight = oldImageData.height,
    ratioX = oldWidth / newWidth,
    ratioY = oldHeight / newHeight,
    x,
    y,
    x0,
    y0,
    x1,
    y1,
    x2,
    y2,
    dx,
    dy,
    oldPixelIndex00,
    oldPixelIndex01,
    oldPixelIndex02,
    oldPixelIndex10,
    oldPixelIndex11,
    oldPixelIndex12,
    oldPixelIndex20,
    oldPixelIndex21,
    oldPixelIndex22,
    newPixelIndex,
    i,
    j;

  for (i = 0; i < newHeight; i += 1) {
    for (j = 0; j < newWidth; j += 1) {
      x = j * ratioX;
      y = i * ratioY;

      x1 = Math.floor(x);
      y1 = Math.floor(y);
      dx = (x - x1) * 0.5;
      dy = (y - y1) * 0.5;

      if (x1 - 1 >= 0) {
        x0 = x1 - 1;
      } else {
        x0 = x1;
      }

      if (y1 - 1 >= 0) {
        y0 = y1 - 1;
      } else {
        y0 = y1;
      }

      if (x1 + 1 >= oldWidth) {
        x2 = x1;
      } else {
        x2 = x1 + 1;
      }

      if (y1 + 1 >= oldWidth) {
        y2 = y1;
      } else {
        y2 = y1 + 1;
      }

      oldPixelIndex00 = (y0 * oldWidth + x0) * 4;
      oldPixelIndex01 = (y0 * oldWidth + x1) * 4;
      oldPixelIndex02 = (y0 * oldWidth + x2) * 4;
      oldPixelIndex10 = (y1 * oldWidth + x0) * 4;
      oldPixelIndex11 = (y1 * oldWidth + x1) * 4;
      oldPixelIndex12 = (y1 * oldWidth + x2) * 4;
      oldPixelIndex20 = (y2 * oldWidth + x0) * 4;
      oldPixelIndex21 = (y2 * oldWidth + x1) * 4;
      oldPixelIndex22 = (y2 * oldWidth + x2) * 4;

      newPixelIndex = (i * newWidth + j) * 4;

      newImageData.data[newPixelIndex] = interpolateNormalize(
        interpolate(
          oldImageData.data[oldPixelIndex00],
          oldImageData.data[oldPixelIndex01],
          oldImageData.data[oldPixelIndex02],
          dx
        ),
        interpolate(
          oldImageData.data[oldPixelIndex10],
          oldImageData.data[oldPixelIndex11],
          oldImageData.data[oldPixelIndex12],
          dx
        ),
        interpolate(
          oldImageData.data[oldPixelIndex20],
          oldImageData.data[oldPixelIndex21],
          oldImageData.data[oldPixelIndex22],
          dx
        ),
        dy
      );

      newImageData.data[newPixelIndex + 1] = interpolateNormalize(
        interpolate(
          oldImageData.data[oldPixelIndex00 + 1],
          oldImageData.data[oldPixelIndex01 + 1],
          oldImageData.data[oldPixelIndex02 + 1],
          dx
        ),
        interpolate(
          oldImageData.data[oldPixelIndex10 + 1],
          oldImageData.data[oldPixelIndex11 + 1],
          oldImageData.data[oldPixelIndex12 + 1],
          dx
        ),
        interpolate(
          oldImageData.data[oldPixelIndex20 + 1],
          oldImageData.data[oldPixelIndex21 + 1],
          oldImageData.data[oldPixelIndex22 + 1],
          dx
        ),
        dy
      );

      newImageData.data[newPixelIndex + 2] = interpolateNormalize(
        interpolate(
          oldImageData.data[oldPixelIndex00 + 2],
          oldImageData.data[oldPixelIndex01 + 2],
          oldImageData.data[oldPixelIndex02 + 2],
          dx
        ),
        interpolate(
          oldImageData.data[oldPixelIndex10 + 2],
          oldImageData.data[oldPixelIndex11 + 2],
          oldImageData.data[oldPixelIndex12 + 2],
          dx
        ),
        interpolate(
          oldImageData.data[oldPixelIndex20 + 2],
          oldImageData.data[oldPixelIndex21 + 2],
          oldImageData.data[oldPixelIndex22 + 2],
          dx
        ),
        dy
      );

      newImageData.data[newPixelIndex + 3] = interpolateNormalize(
        interpolate(
          oldImageData.data[oldPixelIndex00 + 3],
          oldImageData.data[oldPixelIndex01 + 3],
          oldImageData.data[oldPixelIndex02 + 3],
          dx
        ),
        interpolate(
          oldImageData.data[oldPixelIndex10 + 3],
          oldImageData.data[oldPixelIndex11 + 3],
          oldImageData.data[oldPixelIndex12 + 3],
          dx
        ),
        interpolate(
          oldImageData.data[oldPixelIndex20 + 3],
          oldImageData.data[oldPixelIndex21 + 3],
          oldImageData.data[oldPixelIndex22 + 3],
          dx
        ),
        dy
      );
    }
  }

  return newImageData;
}
