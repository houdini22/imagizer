# imagizer

Imagizer is a JavaScript library for image manipulation.

To run demo you have to create vhost that points on main repo directory - this is required to avoid cross-domain errors.
Please check demo to get more examples - this documentation is under development.

Imagizer effect algorithms are based on a [Jerry's Java Image Proccesing Library](http://www.jhlabs.com/ip/filters/index.html)

Working demo you can find at [http://imagizer.baniczek.vipserv.org/](http://imagizer.baniczek.vipserv.org/)

## Usage
To create a Project just execute following lines:
```javascript
var project = new Imagizer.Project(projectWidth, projectHeight);
```
where projectWidth and projectHeight are x and y dimensions of result image.

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

You can also crop added image:
```javascript
image1.load("img/pencils.jpg", function()
{
    var obj = layer1.put(image1, 0, 0);
    obj.crop(100, 100, 100, 100); // startX, startY, width, height
});
```
or resize image or whole layer:
```javascript
image1.load("img/pencils.jpg", function()
{
    var obj = layer1.put(image1, 200, 150);
    obj.resize(200, 150 /*, mode */);
    // or
    layer1.resize(200, 150 /*, mode */);
});
```

The following resize modes are supported:

"nearest-neighbour" - default,

"bilinear-interpolation",

"biquadratic-interpolation".



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

and following effects are supported:
- gray-scale
- sepia
- adjust-contrast-brightness
- diffusion
- dither
- exposure
- gain
- gamma
- gray
- invertAlpha
- invert
- rescale
- solarize
- threshold
- tritone
- levels
- diffuse
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

To export the Project (result image) you have to call:
```javascript
project.exportTo(".test-2");
```
Just pass DOM selector to 'exportTo' method and (optionally) mime type of the image.

Imagizer supports [Node canvas](https://github.com/Automattic/node-canvas). That means when you have installed Node canvas you can render your images on a server side! Just check /demo/node_cli.js file.

Imagizer is under heavy development, feel free to ask or contribute!

Enjoy!
