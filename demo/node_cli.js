var Imagizer = require("./../src/imagizer.js");

var project = new Imagizer.Project(500, 375);
var layer1 = project.createLayer();
var image1 = new Imagizer.Image();

image1.load("./img/test.png", function()
{
    layer1.put(image1, 0, 0);
    project.applyEffect("edge", {});
    project.applyEffect("gray-scale");
    project.applyEffect("invert");
    project.exportTo("./test_result.png");
    console.log(project.getTime());
});