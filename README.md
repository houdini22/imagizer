# imagizer

Imagizer is a JavaScript library for image manipulation.

To run demo in your browser locally you have to create vhost that points on main repo directory - this is required to avoid cross-domain errors.
Please check demo to get more examples - this documentation is under development.

Imagizer effect algorithms are based on a [Jerry's Java Image Proccesing Library](http://www.jhlabs.com/ip/filters/index.html)

Working demo you can find at [http://imagizer.it/~hud/imagizer/demo/](http://imagizer.baniczek.vipserv.org/)

## npm
Imagizer supports node.js (with node-canvas as requirement) and is available as npm package.
To install type:
```
npm install imagizer
```

Check ./demo/node_demo.js for example of usage.

## Usage
To create a Project just execute following lines:
In browser:
```javascript
var project = new Imagizer.Project(projectWidth, projectHeight);
```
or in node.js:
```javascript
var Imagizer = require("imagizer");
var project = new Imagizer.Project(projectWidth, projectHeight);
```
where projectWidth and projectHeight are dimensions of result image.

To a project you can add a layer:
```javascript
var layer1 = project.createLayer();
```
and to a layer you can add image:
```javascript
var image1 = new Imagizer.Image();
image1.load("my-image.png", function()
{
    var onLayerObject = layer1.put(image1, 0, 0); // put image1 to a layer with position 0, 0
});
```
Then you can add efects to a object (image):
```javascript
image1.load("my-image.png", function()
{
    var obj = layer1.put(image1, 0, 0); // put image1 to a layer with position 0, 0
    // edge detection combo
    obj.applyEffect("edge"/*, {parameter1: "someValue"}*/);
    obj.applyEffect("gray-scale");
    obj.applyEffect("invert");
});
```

Some effects has a parameters, but if you don't pass any then the default parameters will be used.

You can add effect to a whole layer:
```javascript
image1.load("my-image.png", function()
{
    var obj = layer1.put(image1, 0, 0); // put image1 to a layer with position 0, 0
    layer1.applyEffect("invert");
});
```
or whole project:
```javascript
image1.load("my-image.png", function()
{
    var obj = layer1.put(image1, 0, 0); // put image1 to a layer with position 0, 0
    project.applyEffect("sepia");
});
```

Layers support alpha compositing and the blending modes. While alpha compositing is internal process and do not require your attention the blending mode you can set by:

```javascript
var layer2 = project.createLayer({
    blendingMode: "average"
});
```

The following blending modes are supported:
- lighten
- darken
- multiply
- average
- add
- subtract
- difference
- negation
- screen
- exclusion
- overlay
- softLight
- hardLight
- colorDodge
- colorBurn
- linearDodge
- linearBurn
- linearLight
- vividLight
- pinLight
- hardMix
- reflect
- glow
- phoenix

You can also crop added image:
```javascript
image1.load("img/pencils.jpg", function()
{
    var obj = layer1.put(image1, 0, 0);
    obj.crop(100, 100, 100, 100); // startX, startY, width, height
});
```
or resize image, whole layer or project:
```javascript
image1.load("img/pencils.jpg", function()
{
    var obj = layer1.put(image1, 200, 150);
    obj.resize(200, 150 /*, mode */);
    // or
    layer1.resize(200, 150 /*, mode */);
    // or
    project.resize(200, 150);
});
```

Note that 'obj' and 'layer' resize do not modify result image dimensions. To rescale result image you have to change size o a project.

The following resize modes are supported:

- "nearest-neighbour" - default
- "bilinear-interpolation",
- "biquadratic-interpolation".


## Effects
The following effects are supported:
- gray-scale
- sepia
- contrast
- brightness
- diffusion
- dither
- exposure
- gain
- gamma
- gray
- hsb-adjust
- invert-alpha
- invert
- rescale
- solarize
- threshold
- tritone
- levels
- diffuse
- kaleidoscope
- marble
- pinch
- ripple
- shear
- sphere
- swim
- twirl
- water
- dissolve
- edge
- fill-color
- channel-mix
- circle
- rotate
- flip
- offset
- polar
- block
- border
- emboss

### Effect parameters

Some effects support parameters. If none passed - the default value will be used.
To use effect params pass it as a second argument:
```javascript
onLayerObject.applyEffect("edge", {parameter1: "someValue"});
```

#### Effect specific parameters:
##### contrast
defaults:
```
defaults: {
    contrast: 0 // between -1 and 1
}
```
##### brightness
defaults:
```
defaults: {
    brightness: 0 // between -1 and 1
}
```
##### diffusion
```
defaults: {
    matrix: [0, 0, 0, 0, 0, 7, 3, 5, 1],
    levels: 6,
    colorDither: true,
    granulate: true
},
```
##### dither
```
defaults: {
    matrices: {
        ditherMagic4x4Matrix: [
            0, 14, 3, 13,
            11, 5, 8, 6,
            12, 2, 15, 1,
            7, 9, 4, 10
        ],
        ditherOrdered4x4Matrix: [
            0, 8, 2, 10,
            12, 4, 14, 6,
            3, 11, 1, 9,
            15, 7, 13, 5
        ],
        ditherLines4x4Matrix: [
            0, 1, 2, 3,
            4, 5, 6, 7,
            8, 9, 10, 11,
            12, 13, 14, 15
        ],
        dither90Halftone6x6Matrix: [
            29, 18, 12, 19, 30, 34,
            17, 7, 4, 8, 20, 28,
            11, 3, 0, 1, 9, 27,
            16, 6, 2, 5, 13, 26,
            25, 15, 10, 14, 21, 31,
            33, 25, 24, 23, 33, 36
        ],
        ditherOrdered6x6Matrix: [
            1, 59, 15, 55, 2, 56, 12, 52,
            33, 17, 47, 31, 34, 18, 44, 28,
            9, 49, 5, 63, 10, 50, 6, 60,
            41, 25, 37, 21, 42, 26, 38, 22,
            3, 57, 13, 53, 0, 58, 14, 54,
            35, 19, 45, 29, 32, 16, 46, 30,
            11, 51, 7, 61, 8, 48, 4, 62,
            43, 27, 39, 23, 40, 24, 36, 20
        ],
        ditherOrdered8x8Matrix: [
            1, 235, 59, 219, 15, 231, 55, 215, 2, 232, 56, 216, 12, 228, 52, 212,
            129, 65, 187, 123, 143, 79, 183, 119, 130, 66, 184, 120, 140, 76, 180, 116,
            33, 193, 17, 251, 47, 207, 31, 247, 34, 194, 18, 248, 44, 204, 28, 244,
            161, 97, 145, 81, 175, 111, 159, 95, 162, 98, 146, 82, 172, 108, 156, 92,
            9, 225, 49, 209, 5, 239, 63, 223, 10, 226, 50, 210, 6, 236, 60, 220,
            137, 73, 177, 113, 133, 69, 191, 127, 138, 74, 178, 114, 134, 70, 188, 124,
            41, 201, 25, 241, 37, 197, 21, 255, 42, 202, 26, 242, 38, 198, 22, 252,
            169, 105, 153, 89, 165, 101, 149, 85, 170, 106, 154, 90, 166, 102, 150, 86,
            3, 233, 57, 217, 13, 229, 53, 213, 0, 234, 58, 218, 14, 230, 54, 214,
            131, 67, 185, 121, 141, 77, 181, 117, 128, 64, 186, 122, 142, 78, 182, 118,
            35, 195, 19, 249, 45, 205, 29, 245, 32, 192, 16, 250, 46, 206, 30, 246,
            163, 99, 147, 83, 173, 109, 157, 93, 160, 96, 144, 80, 174, 110, 158, 94,
            11, 227, 51, 211, 7, 237, 61, 221, 8, 224, 48, 208, 4, 238, 62, 222,
            139, 75, 179, 115, 135, 71, 189, 125, 136, 72, 176, 112, 132, 68, 190, 126,
            43, 203, 27, 243, 39, 199, 23, 253, 40, 200, 24, 240, 36, 196, 20, 254,
            171, 107, 155, 91, 167, 103, 151, 87, 168, 104, 152, 88, 164, 100, 148, 84
        ],
        ditherCluster3Matrix: [
            9, 11, 10, 8, 6, 7,
            12, 17, 16, 5, 0, 1,
            13, 14, 15, 4, 3, 2,
            8, 6, 7, 9, 11, 10,
            5, 0, 1, 12, 17, 16,
            4, 3, 2, 13, 14, 15
        ],
        ditherCluster4Matrix: [
            18, 20, 19, 16, 13, 11, 12, 15,
            27, 28, 29, 22, 4, 3, 2, 9,
            26, 31, 30, 21, 5, 0, 1, 10,
            23, 25, 24, 17, 8, 6, 7, 14,
            13, 11, 12, 15, 18, 20, 19, 16,
            4, 3, 2, 9, 27, 28, 29, 22,
            5, 0, 1, 10, 26, 31, 30, 21,
            8, 6, 7, 14, 23, 25, 24, 17
        ],
        ditherCluster8Matrix: [
            64, 69, 77, 87, 86, 76, 68, 67, 63, 58, 50, 40, 41, 51, 59, 60,
            70, 94, 100, 109, 108, 99, 93, 75, 57, 33, 27, 18, 19, 28, 34, 52,
            78, 101, 114, 116, 115, 112, 98, 83, 49, 26, 13, 11, 12, 15, 29, 44,
            88, 110, 123, 124, 125, 118, 107, 85, 39, 17, 4, 3, 2, 9, 20, 42,
            89, 111, 122, 127, 126, 117, 106, 84, 38, 16, 5, 0, 1, 10, 21, 43,
            79, 102, 119, 121, 120, 113, 97, 82, 48, 25, 8, 6, 7, 14, 30, 45,
            71, 95, 103, 104, 105, 96, 92, 74, 56, 32, 24, 23, 22, 31, 35, 53,
            65, 72, 80, 90, 91, 81, 73, 66, 62, 55, 47, 37, 36, 46, 54, 61,
            63, 58, 50, 40, 41, 51, 59, 60, 64, 69, 77, 87, 86, 76, 68, 67,
            57, 33, 27, 18, 19, 28, 34, 52, 70, 94, 100, 109, 108, 99, 93, 75,
            49, 26, 13, 11, 12, 15, 29, 44, 78, 101, 114, 116, 115, 112, 98, 83,
            39, 17, 4, 3, 2, 9, 20, 42, 88, 110, 123, 124, 125, 118, 107, 85,
            38, 16, 5, 0, 1, 10, 21, 43, 89, 111, 122, 127, 126, 117, 106, 84,
            48, 25, 8, 6, 7, 14, 30, 45, 79, 102, 119, 121, 120, 113, 97, 82,
            56, 32, 24, 23, 22, 31, 35, 53, 71, 95, 103, 104, 105, 96, 92, 74,
            62, 55, 47, 37, 36, 46, 54, 61, 65, 72, 80, 90, 91, 81, 73, 66
        ]
    },
    levels: 6,
    matrix: "ditherMagic4x4Matrix",
    colorDither: true
}
```

##### exposure
```
defaults: {
    exposure: 1
}
```
##### gain
```
defaults: {
    gammaRed: 1,
    gammaGreen: 1,
    gammaBlue: 1
},
```
##### hsb-adjust
```
defaults: {
    h: 1,
    s: 1,
    b: 1
}
```
##### levels
```
defaults: {
    low: 0,
    high: 1,
    lowOutput: 0,
    highOutput: 1
},
```
##### posterize
```
defaults: {
    levels: 6
},
```
##### quantize
```
defaults: {
    matrix: [
        0, 0, 0,
        0, 0, 7,
        3, 5, 1
    ],
    dither: true,
    numColors: 256,
    serpentine: true
},
```
##### rescale
```
defaults: {
    scale: 1
}
```
##### tritone
```
defaults: {
    shadowColor: {
        r: 0,
        g: 0,
        b: 0,
        a: 255
    },
    midColor: {
        r: 136,
        g: 136,
        b: 136,
        a: 255
    },
    highColor: {
        r: 255,
        g: 255,
        b: 255,
        a: 255
    }
},
```
##### diffuse
```
defaults: {
    scale: 4
},
```
##### dissolve
```
defaults: {
    density: 1,
    softness: 0
},
```
##### kaleidoscope
```
defaults: {
    centreX: 0.5,
    centreY: 0.5,
    angle: 0,
    angle2: 0,
    sides: 3,
    radius: 0
},
```
##### marble
```
defaults: {
    xScale: 4,
    yScale: 4,
    amount: 1,
    turbulence: 1
},
```
##### pinch
```
defaults: {
    angle: 0,
    centreX: 0.5,
    centreY: 0.5,
    radius: 100,
    amount: 0.5
},
```
##### ripple
```
defaults: {
    xAmplitude: 5,
    yAmplitute: 0,
    xWaveLength: 16,
    yWaveLength: 16,
    waveType: "SINE" // SAWTOOTH TRIANGLE NOISE
}
```
##### shear
```
defaults: {
    xAngle: 0,
    yAngle: 0,
    xOffset: 0,
    yOffset: 0
},
```
##### sphere
```
defaults: {
    a: 0,
    b: 0,
    centreX: 0.5,
    centreY: 0.5,
    refractionIndex: 1.5
},
```
##### swim
```
defaults: {
    scale: 32,
    turbulence: 0,
    amount: 1,
    time: 0,
    angle: 0,
    stretch: 1
},
```
##### twirl
```
defaults: {
    angle: 0,
    centreX: 0.5,
    centreY: 0.5,
    radius: 100
},
```
##### water
```
defaults: {
    waveLength: 16,
    amplitude: 10,
    phase: 0,
    centreX: 0.5,
    centreY: 0.5,
    radius: 50
},
```
##### edge
```
defaults: {
    matrixes: {
        robertsV: [
            0, 0, -1,
            0, 1, 0,
            0, 0, 0
        ],
        robertsH: [
            -1, 0, 0,
            0, 1, 0,
            0, 0, 0
        ],
        prewittV: [
            -1, 0, 1,
            -1, 0, 1,
            -1, 0, 1
        ],
        prewittH: [
            -1, -1, -1,
            0, 0, 0,
            1, 1, 1
        ],
        sobelV: [
            -1, 0, 1,
            -2, 0, 2,
            -1, 0, 1
        ],
        sobelH: [
            -1, -2, -1,
            0, 0, 0,
            1, 2, 1
        ],
        freiChenV: [
            -1, 0, 1,
            -Math.sqrt(2), 0, Math.sqrt(2),
            -1, 0, 1
        ],
        freiChenH: [
            -1, -Math.sqrt(2), -1,
            0, 0, 0,
            1, Math.sqrt(2), 1
        ]
    },
    hEdgeMatrix: "sobelV",
    vEdgeMatrix: "sobelH"
},
```
##### fill-color
```
defaults: {
    color: "transparent"
}
```
##### channel-mix-filter
```
defaults: {
    blueGreen: 1,
    redBlue: 1,
    greenRed: 1,
    intoR: 1,
    intoG: 1,
    intoB: 1
}
```
##### circle
```
defaults: {
    radius: 10,
    height: 20,
    angle: 0,
    spreadAngle: Math.PI,
    centreX: 0.5,
    centreY: 0.5
},
```
##### rotate
```
defaults: {
    angle: Math.PI
},
```
##### flip
```
defaults: {
    operation: "FLIP_H" // FLIP_H, FLIP_V, FLIP_HV, FLIP_90CW, FLIP_90CCW, FLIP_180
}
```
##### offset
```
defaults: {
    xOffset: 100,
    yOffset: 100,
    wrap: true
},
```
##### polar
```
defaults: {
    type: "RECT_TO_POLAR" // RECT_TO_POLAR, POLAR_TO_RECT, INVERT_IN_CIRCLE
},
```
##### block
```
defaults: {
    blockSize: 5
}
```
##### border 
```
defaults: {
    leftBorder: 10,
    rightBorder: 10,
    topBorder: 10,
    bottomBorder: 10,
    borderColor: {
        r: 0,
        b: 0,
        g: 0,
        a: 255
    }
},
```
##### emboss
```
defaults: {
    azimuth: 135 * Math.PI / 180,
    elevation: 30 * Math.PI / 180,
    width45: 3,
    emboss: true
},
```

##### perspective
```
defaults: {
    x0: 0,
    y0: 0,
    x1: 1,
    y1: 0,
    x2: 1,
    y2: 1,
    x3: 0,
    y3: 1
},
```

## Exporting result image
To export the Project (result image) you have to call:
In browser:
```javascript
project.exportTo(".test-2");
```
or in node.js:
```javascript
project.exportTo("path/to/file.png");
```
Just pass DOM selector (browser) or path (node.js) to 'exportTo' method and (optionally) valid mime type of the image as a second parameter.

Imagizer is under heavy development, feel free to ask or contribute!

Enjoy!

## Changelog

0.1.7 Splitted adjust-contrast-brightness effect to separate effects contrast and brightness

0.1.6 ---

0.1.5 Updated docs. Added effects: perspective. Changed licence.

0.1.4 Refactoring, resize project, move layer in the project, resize layer fix

0.1.3 Added effects: circle, mix-channels, rotate, flip, offset, polar. Updated node.js demo. Updated docs.

0.1.2 ---

0.1.1 ---

0.1.0 Initial commit