/**
 * RGB to HSB color convert.
 * @param r
 * @param g
 * @param b
 * @returns {{h: number, s: number, b: number}}
 */
export function RGBtoHSB(
  r: number,
  g: number,
  b: number
): {
  h: number;
  s: number;
  b: number;
} {
  let hue,
    saturation,
    brightness,
    cmax = Math.max(r, g, b),
    cmin = Math.min(r, g, b);

  brightness = cmax / 255;
  if (cmax !== 0) {
    saturation = (cmax - cmin) / cmax;
  } else {
    saturation = 0;
  }

  if (saturation === 0) {
    hue = 0;
  } else {
    let redc = (cmax - r) / (cmax - cmin),
      greenc = (cmax - g) / (cmax - cmin),
      bluec = (cmax - b) / (cmax - cmin);

    if (r === cmax) {
      hue = bluec - greenc;
    } else {
      if (g === cmax) {
        hue = 2 + redc - bluec;
      } else {
        hue = 4 + greenc - redc;
      }
    }

    hue /= 6;
    if (hue < 0) {
      hue += 1;
    }
  }

  return {
    h: hue,
    s: saturation,
    b: brightness,
  };
}

/**
 * HSB to RGB color convert.
 * @param hue
 * @param saturation
 * @param brightness
 * @returns {{r: Number, g: Number, b: Number}}
 */
export function HSBtoRGB(
  hue: number,
  saturation: number,
  brightness: number
): {
  r: number;
  g: number;
  b: number;
} {
  let red, green, blue;
  if (saturation === 0) {
    red = brightness * 255 + 0.5;
    green = brightness * 255 + 0.5;
    blue = brightness * 255 + 0.5;
  } else {
    let h = (hue - Math.floor(hue)) * 6,
      f = h - Math.floor(h),
      p = brightness * (1 - saturation),
      q = brightness * (1 - saturation * f),
      t = brightness * (1 - saturation * (1 - f));

    switch (h | 0) {
      case 0:
        red = brightness * 255 + 0.5;
        green = t * 255 + 0.5;
        blue = p * 255 + 0.5;
        break;

      case 1:
        red = q * 255 + 0.5;
        green = brightness * 255 + 0.5;
        blue = p * 255 + 0.5;
        break;

      case 2:
        red = p * 255 + 0.5;
        green = brightness * 255 + 0.5;
        blue = t * 255 + 0.5;
        break;

      case 3:
        red = p * 255 + 0.5;
        green = q * 255 + 0.5;
        blue = brightness * 255 + 0.5;
        break;

      case 4:
        red = t * 255 + 0.5;
        green = p * 255 + 0.5;
        blue = brightness * 255 + 0.5;
        break;

      case 5:
        red = brightness * 255 + 0.5;
        green = p * 255 + 0.5;
        blue = q * 255 + 0.5;
        break;

      default:
        red = 0;
        green = 0;
        blue = 0;
        break;
    }
  }
  return {
    r: parseInt(red),
    g: parseInt(green),
    b: parseInt(blue),
  };
}

export function mixColors(
  t: number,
  rgb1: {
    r: number;
    g: number;
    b: number;
    a: number;
  },
  rgb2: {
    r: number;
    g: number;
    b: number;
    a: number;
  }
): {
  r: number;
  g: number;
  b: number;
  a: number;
} {
  return {
    r: rgb1.r + t * (rgb2.r - rgb1.r),
    g: rgb1.g + t * (rgb2.g - rgb1.g),
    b: rgb1.b + t * (rgb2.b - rgb1.b),
    a: rgb1.a + t * (rgb2.a - rgb1.a),
  };
}

export function hexToRGB(hex: string): {
  r: number;
  g: number;
  b: number;
} {
  const _hex = parseInt(hex.replace("#", ""), 16);
  let r = _hex >> 16;
  let g = (_hex >> 8) & 0xff;
  let b = _hex & 0xff;
  return {
    r: r,
    g: g,
    b: b,
  };
}

export function RGBtoHex(pixel: { r: number; g: number; b: number }) {
  let bin = (pixel.r << 16) | (pixel.g << 8) | pixel.b;
  return (function (h) {
    return new Array(7 - h.length).join("0") + h;
  })(bin.toString(16).toUpperCase());
}

export function RGBtoXYZ(
  r: number,
  g: number,
  b: number
): {
  x: number;
  y: number;
  z: number;
} {
  let let_R = r / 255;
  let let_G = g / 255;
  let let_B = b / 255;

  if (let_R > 0.04045) {
    let_R = Math.pow((let_R + 0.055) / 1.055, 2.4);
  } else {
    let_R = let_R / 12.92;
  }

  if (let_G > 0.04045) {
    let_G = Math.pow((let_G + 0.055) / 1.055, 2.4);
  } else {
    let_G = let_G / 12.92;
  }

  if (let_B > 0.04045) {
    let_B = Math.pow((let_B + 0.055) / 1.055, 2.4);
  } else {
    let_B = let_B / 12.92;
  }

  let_R = let_R * 100;
  let_G = let_G * 100;
  let_B = let_B * 100;

  return {
    x: let_R * 0.4124 + let_G * 0.3576 + let_B * 0.1805,
    y: let_R * 0.2126 + let_G * 0.7152 + let_B * 0.0722,
    z: let_R * 0.0193 + let_G * 0.1192 + let_B * 0.9505,
  };
}

export function RGBtoCIELab(
  r: number,
  g: number,
  b: number
): {
  l: number;
  a: number;
  b: number;
} {
  let xyz = RGBtoXYZ(r, g, b);

  let let_X = xyz.x / 95.047; // ref
  let let_Y = xyz.y / 100; // ref
  let let_Z = xyz.z / 108.883; // ref

  if (let_X > 0.008856) {
    let_X = Math.pow(let_X, 1 / 3);
  } else {
    let_X = 7.787 * let_X + 16 / 116;
  }

  if (let_Y > 0.008856) {
    let_Y = Math.pow(let_Y, 1 / 3);
  } else {
    let_Y = 7.787 * let_Y + 16 / 116;
  }

  if (let_Z > 0.008856) {
    let_Z = Math.pow(let_Z, 1 / 3);
  } else {
    let_Z = 7.787 * let_Z + 16 / 116;
  }

  return {
    l: 116 * let_Y - 16,
    a: 500 * (let_X - let_Y),
    b: 200 * (let_Y - let_Z),
  };
}

export function CIELabToXYZ(
  l: number,
  a: number,
  b: number
): {
  x: number;
  y: number;
  z: number;
} {
  let let_Y = (l + 16) / 116;
  let let_X = a / 500 + let_Y;
  let let_Z = let_Y - b / 200;

  if (Math.pow(let_Y, 3) > 0.008856) {
    let_Y = Math.pow(let_Y, 3);
  } else {
    let_Y = (let_Y - 16 / 116) / 7.787;
  }

  if (Math.pow(let_X, 3) > 0.008856) {
    let_X = Math.pow(let_X, 3);
  } else {
    let_X = (let_X - 16 / 116) / 7.787;
  }

  if (Math.pow(let_Z, 3) > 0.008856) {
    let_Z = Math.pow(let_Z, 3);
  } else {
    let_Z = (let_Z - 16 / 116) / 7.787;
  }

  return {
    x: 95.047 * let_X, // ref
    y: 100 * let_Y, // ref
    z: 108.883 * let_Z, // ref
  };
}

export function CIELabToRGB(
  l: number,
  a: number,
  b: number
): {
  r: number;
  g: number;
  b: number;
} {
  let xyz = CIELabToXYZ(l, a, b);

  let let_X = xyz.x / 100;
  let let_Y = xyz.y / 100;
  let let_Z = xyz.z / 100;

  let let_R = let_X * 3.2406 + let_Y * -1.5372 + let_Z * -0.4986;
  let let_G = let_X * -0.9689 + let_Y * 1.8758 + let_Z * 0.0415;
  let let_B = let_X * 0.0557 + let_Y * -0.204 + let_Z * 1.057;

  if (let_R > 0.0031308) {
    let_R = 1.055 * Math.pow(let_R, 1 / 2.4) - 0.055;
  } else {
    let_R = 12.92 * let_R;
  }

  if (let_G > 0.0031308) {
    let_G = 1.055 * Math.pow(let_G, 1 / 2.4) - 0.055;
  } else {
    let_G = 12.92 * let_G;
  }

  if (let_B > 0.0031308) {
    let_B = 1.055 * Math.pow(let_B, 1 / 2.4) - 0.055;
  } else {
    let_B = 12.92 * let_B;
  }

  return {
    r: let_R * 255,
    g: let_G * 255,
    b: let_B * 255,
  };
}
