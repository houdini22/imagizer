webpackHotUpdate(0,{

/***/ 305:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.mergeImageData = mergeImageData;
	exports.mergePixelCallback = mergePixelCallback;
	exports.cropImageData = cropImageData;
	exports.mod = mod;
	exports.triangle = triangle;
	exports.smoothStep = smoothStep;
	var blendingModes = {
	    lighten: function lighten(bottomPixel, topPixel) {
	        return topPixel > bottomPixel ? topPixel : bottomPixel;
	    },
	    darken: function darken(bottomPixel, topPixel) {
	        return topPixel > bottomPixel ? bottomPixel : topPixel;
	    },
	    multiply: function multiply(bottomPixel, topPixel) {
	        return bottomPixel * topPixel / 255;
	    },
	    average: function average(bottomPixel, topPixel) {
	        return bottomPixel + topPixel / 2;
	    },
	    add: function add(bottomPixel, topPixel) {
	        return Math.min(255, bottomPixel + topPixel);
	    },
	    subtract: function subtract(bottomPixel, topPixel) {
	        return bottomPixel + topPixel < 255 ? 0 : bottomPixel + topPixel - 255;
	    },
	    difference: function difference(bottomPixel, topPixel) {
	        return Math.abs(bottomPixel - topPixel);
	    },
	    negation: function negation(bottomPixel, topPixel) {
	        return 255 - Math.abs(255 - bottomPixel - topPixel);
	    },
	    screen: function screen(bottomPixel, topPixel) {
	        return 255 - ((255 - bottomPixel) * (255 - topPixel) >> 8);
	    },
	    exclusion: function exclusion(bottomPixel, topPixel) {
	        return bottomPixel + topPixel - 2 * bottomPixel * topPixel / 255;
	    },
	    overlay: function overlay(bottomPixel, topPixel) {
	        return topPixel < 128 ? 2 * bottomPixel * topPixel / 255 : 255 - 2 * (255 - bottomPixel) * (255 - topPixel) / 255;
	    },
	    softLight: function softLight(bottomPixel, topPixel) {
	        return topPixel < 128 ? 2 * ((bottomPixel >> 1) + 64) * (topPixel / 255) : 255 - 2 * (255 - ((bottomPixel >> 1) + 64)) * (255 - topPixel) / 255;
	    },
	    hardLight: function hardLight(bottomPixel, topPixel) {
	        return blendingModes.softLight(topPixel, bottomPixel);
	    },
	    colorDodge: function colorDodge(bottomPixel, topPixel) {
	        return topPixel == 255 ? topPixel : Math.min(255, (bottomPixel << 8) / (255 - topPixel));
	    },
	    colorBurn: function colorBurn(bottomPixel, topPixel) {
	        return topPixel == 0 ? topPixel : Math.max(0, 255 - (255 - bottomPixel << 8) / topPixel);
	    },
	    linearDodge: function linearDodge(bottomPixel, topPixel) {
	        return blendingModes.add(bottomPixel, topPixel);
	    },
	    linearBurn: function linearBurn(bottomPixel, topPixel) {
	        return blendingModes.subtract(bottomPixel, topPixel);
	    },
	    linearLight: function linearLight(bottomPixel, topPixel) {
	        return topPixel < 128 ? blendingModes.linearBurn(bottomPixel, 2 * topPixel) : blendingModes.linearDodge(bottomPixel, 2 * (topPixel - 128));
	    },
	    vividLight: function vividLight(bottomPixel, topPixel) {
	        return topPixel < 128 ? blendingModes.colorBurn(bottomPixel, 2 * topPixel) : blendingModes.colorDodge(bottomPixel, 2 * (topPixel - 128));
	    },
	    pinLight: function pinLight(bottomPixel, topPixel) {
	        return topPixel < 128 ? blendingModes.darken(bottomPixel, 2 * topPixel) : blendingModes.lighten(bottomPixel, 2 * (topPixel - 128));
	    },
	    hardMix: function hardMix(bottomPixel, topPixel) {
	        return blendingModes.vividLight(bottomPixel, topPixel) < 128 ? 0 : 255;
	    },
	    reflect: function reflect(bottomPixel, topPixel) {
	        return topPixel == 255 ? topPixel : Math.min(255, bottomPixel * bottomPixel / (255 - topPixel));
	    },
	    glow: function glow(bottomPixel, topPixel) {
	        return blendingModes.reflect(topPixel, bottomPixel);
	    },
	    phoenix: function phoenix(bottomPixel, topPixel) {
	        return Math.min(bottomPixel, topPixel) - Math.max(bottomPixel, topPixel) + 255;
	    }
	};
	
	function mergeImageData(bottom, top, pixelCallback) {
	    var x = void 0,
	        y = void 0,
	        xx = void 0,
	        yy = void 0,
	        firstOldPixelIndex = void 0,
	        firstNewPixelIndex = void 0,
	        pixelResult = void 0;
	
	    for (y = top.y, yy = 0; y < bottom.height && yy < top.height; y += 1, yy += 1) {
	        for (x = top.x, xx = 0; x < bottom.width && xx < top.width; x += 1, xx += 1) {
	            if (xx < top.width && yy < top.height) // overwrite only rect-size of current layer
	                {
	                    firstOldPixelIndex = y * bottom.width * 4 + x * 4;
	                    firstNewPixelIndex = yy * top.width * 4 + xx * 4;
	
	                    pixelResult = pixelCallback({
	                        r: bottom.imageData.data[firstOldPixelIndex + 0],
	                        g: bottom.imageData.data[firstOldPixelIndex + 1],
	                        b: bottom.imageData.data[firstOldPixelIndex + 2],
	                        a: bottom.imageData.data[firstOldPixelIndex + 3]
	                    }, {
	                        r: top.imageData.data[firstNewPixelIndex + 0],
	                        g: top.imageData.data[firstNewPixelIndex + 1],
	                        b: top.imageData.data[firstNewPixelIndex + 2],
	                        a: top.imageData.data[firstNewPixelIndex + 3]
	                    }, x, y, {
	                        blendingMode: top.blendingMode
	                    });
	
	                    if (pixelResult !== false) // if skip change
	                        {
	                            bottom.imageData.data[firstOldPixelIndex + 0] = pixelResult.r;
	                            bottom.imageData.data[firstOldPixelIndex + 1] = pixelResult.g;
	                            bottom.imageData.data[firstOldPixelIndex + 2] = pixelResult.b;
	                            bottom.imageData.data[firstOldPixelIndex + 3] = pixelResult.a;
	                        }
	                }
	        }
	    }
	    return bottom.imageData;
	}
	
	function mergePixelCallback(bottomPixel, topPixel, x, y, parameters) {
	    if (topPixel.a === 0) {
	        return false; // skip change - opacity is full
	    }
	
	    // alpha compositing
	    var mergedR = void 0,
	        mergedG = void 0,
	        mergedB = void 0,
	        mergedA = topPixel.a / 255,
	        rootA = bottomPixel.a / 255 * (1 - mergedA),
	        outA = mergedA + bottomPixel.a * (1 - mergedA) / 255;
	
	    switch (parameters.blendingMode) {
	        case "lighten":
	        case "darken":
	        case "multiply":
	        case "average":
	        case "add":
	        case "subtract":
	        case "difference":
	        case "negation":
	        case "screen":
	        case "exclusion":
	        case "overlay":
	        case "softLight":
	        case "hardLight":
	        case "colorDodge":
	        case "colorBurn":
	        case "linearDodge":
	        case "linearBurn":
	        case "linearLight":
	        case "vividLight":
	        case "pinLight":
	        case "hardMix":
	        case "reflect":
	        case "glow":
	        case "phoenix":
	            topPixel.r = blendingModes[parameters.blendingMode](bottomPixel.r, topPixel.r);
	            topPixel.g = blendingModes[parameters.blendingMode](bottomPixel.g, topPixel.g);
	            topPixel.b = blendingModes[parameters.blendingMode](bottomPixel.b, topPixel.b);
	            break;
	
	        default:
	            break;
	    }
	
	    var rootR = bottomPixel.r;
	    var rootG = bottomPixel.g;
	    var rootB = bottomPixel.b;
	
	    mergedR = topPixel.r * mergedA + rootR * rootA;
	    mergedG = topPixel.g * mergedA + rootG * rootA;
	    mergedB = topPixel.b * mergedA + rootB * rootA;
	
	    mergedR = outA == 0 ? 0 : mergedR / outA;
	    mergedG = outA == 0 ? 0 : mergedG / outA;
	    mergedB = outA == 0 ? 0 : mergedB / outA;
	
	    return {
	        r: Math.min(Math.max(0, mergedR), 255) | 0,
	        g: Math.min(Math.max(0, mergedG), 255) | 0,
	        b: Math.min(Math.max(0, mergedB), 255) | 0,
	        a: 255 * outA | 0
	    };
	}
	
	function cropImageData(oldImageData, newImageData, startX, startY, width, height) {
	    var oldWidth = oldImageData.width,
	        newWidth = newImageData.width,
	        x = void 0,
	        y = void 0,
	        xx = void 0,
	        yy = void 0,
	        firstOldPixelIndex = void 0,
	        firstNewPixelIndex = void 0;
	
	    for (y = startY, yy = 0; y < startY + height && yy < height; y += 1, yy += 1) {
	        for (x = startX, xx = 0; x < startX + width && xx < width; x += 1, xx += 1) {
	            firstOldPixelIndex = y * oldWidth * 4 + x * 4;
	            firstNewPixelIndex = yy * newWidth * 4 + xx * 4;
	
	            newImageData.data[firstNewPixelIndex] = oldImageData.data[firstOldPixelIndex];
	            newImageData.data[firstNewPixelIndex + 1] = oldImageData.data[firstOldPixelIndex + 1];
	            newImageData.data[firstNewPixelIndex + 2] = oldImageData.data[firstOldPixelIndex + 2];
	            newImageData.data[firstNewPixelIndex + 3] = oldImageData.data[firstOldPixelIndex + 3];
	        }
	    }
	
	    return newImageData;
	}
	
	function mod(a, b) {
	    var n = Math.floor(a / b);
	    a -= n * b;
	    if (a < 0) {
	        return a + b;
	    }
	    return a;
	}
	
	function triangle(x) {
	    var r = mod(x, 1);
	    return 2 * (r < 0.5 ? r : 1 - r);
	}
	
	function smoothStep(a, b, x) {
	    if (x < a) {
	        return 0;
	    }
	    if (x >= b) {
	        return 1;
	    }
	    x = (x - a) / (b - a);
	    return x * x * (3 - 2 * x);
	}

/***/ }

})
//# sourceMappingURL=0.0ebeed97f012b224938c.hot-update.js.map