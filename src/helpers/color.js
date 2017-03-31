/**
 * RGB to HSB color convert.
 * @param r
 * @param g
 * @param b
 * @returns {{h: number, s: number, b: number}}
 */
export function RGBtoHSB(r, g, b) {
    var hue, saturation, brightness,
        cmax = Math.max(r, g, b),
        cmin = Math.min(r, g, b);

    brightness = cmax / 255;
    if (cmax !== 0) {
        saturation = (cmax - cmin) / cmax;
    }
    else {
        saturation = 0;
    }

    if (saturation === 0) {
        hue = 0;
    }
    else {
        var redc = (cmax - r) / (cmax - cmin),
            greenc = (cmax - g) / (cmax - cmin),
            bluec = (cmax - b) / (cmax - cmin);

        if (r === cmax) {
            hue = bluec - greenc;
        }
        else {
            if (g === cmax) {
                hue = 2 + redc - bluec;
            }
            else {
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
        b: brightness
    };
}

/**
 * HSB to RGB color convert.
 * @param hue
 * @param saturation
 * @param brightness
 * @returns {{r: Number, g: Number, b: Number}}
 */
export function HSBtoRGB(hue, saturation, brightness) {
    var red, green, blue;
    if (saturation === 0) {
        red = brightness * 255 + 0.5;
        green = brightness * 255 + 0.5;
        blue = brightness * 255 + 0.5;
    }
    else {
        var h = (hue - Math.floor(hue)) * 6,
            f = h - Math.floor(h),
            p = brightness * (1 - saturation),
            q = brightness * (1 - saturation * f),
            t = brightness * (1 - (saturation * (1 - f)));

        switch (parseInt(h)) {
            case 0:
                red = (brightness * 255 + 0.5);
                green = (t * 255 + 0.5);
                blue = (p * 255 + 0.5);
                break;

            case 1:
                red = (q * 255 + 0.5);
                green = (brightness * 255 + 0.5);
                blue = (p * 255 + 0.5);
                break;

            case 2:
                red = (p * 255 + 0.5);
                green = (brightness * 255 + 0.5);
                blue = (t * 255 + 0.5);
                break;

            case 3:
                red = (p * 255 + 0.5);
                green = (q * 255 + 0.5);
                blue = (brightness * 255 + 0.5);
                break;

            case 4:
                red = (t * 255 + 0.5);
                green = (p * 255 + 0.5);
                blue = (brightness * 255 + 0.5);
                break;

            case 5:
                red = (brightness * 255 + 0.5);
                green = (p * 255 + 0.5);
                blue = (q * 255 + 0.5);
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
        b: parseInt(blue)
    };
}

export function mixColors(t, rgb1, rgb2) {
    return {
        r: rgb1.r + t * (rgb2.r - rgb1.r),
        g: rgb1.g + t * (rgb2.g - rgb1.g),
        b: rgb1.b + t * (rgb2.b - rgb1.b),
        a: rgb1.a + t * (rgb2.a - rgb1.a)
    }
}

export function hexToRGB(hex) {
    hex = parseInt(hex.replace("#", ""), 16);
    var r = hex >> 16;
    var g = hex >> 8 & 0xFF;
    var b = hex & 0xFF;
    return {
        r: r,
        g: g,
        b: b
    };
}

export function RGBtoHex(pixel) {
    var bin = pixel.r << 16 | pixel.g << 8 | pixel.b;
    return (function (h) {
        return new Array(7 - h.length).join("0") + h
    })(bin.toString(16).toUpperCase())
}

export function RGBtoXYZ(r, g, b) {
    var var_R = ( r / 255 );
    var var_G = ( g / 255 );
    var var_B = ( b / 255 );

    if (var_R > 0.04045) {
        var_R = Math.pow(( var_R + 0.055 ) / 1.055, 2.4);
    }
    else {
        var_R = var_R / 12.92;
    }

    if (var_G > 0.04045) {
        var_G = Math.pow(( var_G + 0.055 ) / 1.055, 2.4);
    }
    else {
        var_G = var_G / 12.92;
    }

    if (var_B > 0.04045) {
        var_B = Math.pow(( var_B + 0.055 ) / 1.055, 2.4);
    }
    else {
        var_B = var_B / 12.92;
    }

    var_R = var_R * 100;
    var_G = var_G * 100;
    var_B = var_B * 100;

    return {
        x: var_R * 0.4124 + var_G * 0.3576 + var_B * 0.1805,
        y: var_R * 0.2126 + var_G * 0.7152 + var_B * 0.0722,
        z: var_R * 0.0193 + var_G * 0.1192 + var_B * 0.9505
    };
}

export function RGBtoCIELab(r, g, b) {
    var xyz = helpers.color.RGBtoXYZ(r, g, b);

    var var_X = xyz.x / 95.047; // ref
    var var_Y = xyz.y / 100; // ref
    var var_Z = xyz.z / 108.883; // ref

    if (var_X > 0.008856) {
        var_X = Math.pow(var_X, ( 1 / 3 ));
    }
    else {
        var_X = ( 7.787 * var_X ) + ( 16 / 116 );
    }

    if (var_Y > 0.008856) {
        var_Y = Math.pow(var_Y, ( 1 / 3 ));
    }
    else {
        var_Y = ( 7.787 * var_Y ) + ( 16 / 116 );
    }

    if (var_Z > 0.008856) {
        var_Z = Math.pow(var_Z, ( 1 / 3 ));
    }
    else {
        var_Z = ( 7.787 * var_Z ) + ( 16 / 116 );
    }

    return {
        l: ( 116 * var_Y ) - 16,
        a: 500 * ( var_X - var_Y ),
        b: 200 * ( var_Y - var_Z )
    };
}

export function CIELabToXYZl(a, b) {
    var var_Y = ( l + 16 ) / 116;
    var var_X = a / 500 + var_Y;
    var var_Z = var_Y - b / 200;

    if (Math.pow(var_Y, 3) > 0.008856) {
        var_Y = Math.pow(var_Y, 3);
    }
    else {
        var_Y = ( var_Y - 16 / 116 ) / 7.787;
    }

    if (Math.pow(var_X, 3) > 0.008856) {
        var_X = Math.pow(var_X, 3);
    }
    else {
        var_X = ( var_X - 16 / 116 ) / 7.787;
    }

    if (Math.pow(var_Z, 3) > 0.008856) {
        var_Z = Math.pow(var_Z, 3);
    }
    else {
        var_Z = ( var_Z - 16 / 116 ) / 7.787;
    }

    return {
        x: 95.047 * var_X, // ref
        y: 100 * var_Y, // ref
        z: 108.883 * var_Z // ref
    };
}

export function CIELabToRGB(l, a, b) {
    var xyz = helpers.color.CIELabToXYZ(l, a, b);

    var var_X = xyz.x / 100;
    var var_Y = xyz.y / 100;
    var var_Z = xyz.z / 100;

    var var_R = var_X * 3.2406 + var_Y * -1.5372 + var_Z * -0.4986;
    var var_G = var_X * -0.9689 + var_Y * 1.8758 + var_Z * 0.0415;
    var var_B = var_X * 0.0557 + var_Y * -0.2040 + var_Z * 1.0570;

    if (var_R > 0.0031308) {
        var_R = 1.055 * ( Math.pow(var_R, ( 1 / 2.4 )) ) - 0.055;
    }
    else {
        var_R = 12.92 * var_R;
    }

    if (var_G > 0.0031308) {
        var_G = 1.055 * ( Math.pow(var_G, ( 1 / 2.4 )) ) - 0.055;
    }
    else {
        var_G = 12.92 * var_G;
    }

    if (var_B > 0.0031308) {
        var_B = 1.055 * ( Math.pow(var_B, ( 1 / 2.4 )) ) - 0.055;
    }
    else {
        var_B = 12.92 * var_B;
    }

    return {
        r: var_R * 255,
        g: var_G * 255,
        b: var_B * 255
    };
}