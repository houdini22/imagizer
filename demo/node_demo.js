var Imagizer = require("../dist/imagizer.node.dev");

console.log(Imagizer);

var Project = Imagizer.Project;
var Image = Imagizer.Image;

var project = new Project(500, 375);
var layer1 = project.createLayer();
var image1 = new Image();

image1.load("./img/test.png", function()
{
    var obj = layer1.put(image1, 0, 0);
    obj.applyEffect("edge", {});
    obj.applyEffect("gray-scale");
    obj.applyEffect("invert");
    project.exportTo("./node_result.png");
    console.log(project.getTime());
});