import BaseCustomEffect from "../BaseCustom";
import { brightness } from "../../../helpers/common";

export interface EmbossParameters {
  azimuth: number;
  elevation: number;
  width45: number;
  emboss: boolean;
}

class EmbossEffect extends BaseCustomEffect {
  static getName(): string {
    return "emboss";
  }

  getDefaultParameters(): EmbossParameters {
    return {
      azimuth: (135 * Math.PI) / 180,
      elevation: (30 * Math.PI) / 180,
      width45: 3,
      emboss: true,
    };
  }

  callback(width: number, height: number, parameters: EmbossParameters) {
    let bumpMapWidth = width,
      bumpPixels = [],
      Nx,
      Ny,
      Nz,
      Lx,
      Ly,
      Lz,
      Nz2,
      NzLz,
      NdotL,
      s1,
      s2,
      s3,
      shade,
      background,
      pixelScale = 255.9,
      bumpIndex = 0,
      index = 0,
      pixel,
      r,
      g,
      b;

    Lx =
      (Math.cos(parameters.azimuth) *
        Math.cos(parameters.elevation) *
        pixelScale) |
      0;
    Ly =
      (Math.sin(parameters.azimuth) *
        Math.cos(parameters.elevation) *
        pixelScale) |
      0;
    Lz = (Math.sin(parameters.elevation) * pixelScale) | 0;

    Nz = ((6 * 255) / parameters.width45) | 0;
    Nz2 = Nz * Nz;
    NzLz = Nz * Lz;

    background = Lz;

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        bumpPixels.push(brightness(this.getOriginalPixel(x, y)) | 0);
      }
    }

    for (let y = 0; y < height; y += 1, bumpIndex += bumpMapWidth) {
      s1 = bumpIndex;
      s2 = s1 + bumpMapWidth;
      s3 = s2 + bumpMapWidth;

      for (let x = 0; x < width; x += 1, s1 += 1, s2 += 1, s3 += 1) {
        if (y != 0 && y < height - 2 && x != 0 && x < width - 2) {
          Nx =
            bumpPixels[s1 - 1] +
            bumpPixels[s2 - 1] +
            bumpPixels[s3 - 1] -
            bumpPixels[s1 + 1] -
            bumpPixels[s2 + 1] -
            bumpPixels[s3 + 1];
          Ny =
            bumpPixels[s3 - 1] +
            bumpPixels[s3] +
            bumpPixels[s3 + 1] -
            bumpPixels[s1 - 1] -
            bumpPixels[s1] -
            bumpPixels[s1 + 1];

          if (Nx == 0 && Ny == 0) {
            shade = background;
          } else {
            if ((NdotL = Nx * Lx + Ny * Ly + NzLz) < 0) {
              shade = 0;
            } else {
              shade = NdotL / Math.sqrt(Nx * Nx + Ny * Ny + Nz2);
            }
          }
        } else {
          shade = background;
        }

        if (parameters.emboss) {
          pixel = this.getOriginalPixelByIndex(index);
          r = (pixel.r * shade) >> 8;
          g = (pixel.g * shade) >> 8;
          b = (pixel.b * shade) >> 8;
          this.setPixelByIndex(index++, {
            r: r,
            g: g,
            b: b,
            a: pixel.a,
          });
        } else {
          this.setPixelByIndex(index++, {
            r: shade,
            g: shade << 8,
            b: shade << 16,
            a: 255,
          });
        }
      }
    }
  }
}

export default EmbossEffect;
