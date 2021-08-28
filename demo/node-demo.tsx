import * as Imagizer from "../dist/imagizer.js";

const project = new Imagizer.Project(500, 375);
const layer1 = project.createLayer();
const image1 = new Imagizer.Image();

image1.load("../demo/test.png", function () {
  const obj = layer1.put(image1, 0, 0);
  obj.applyEffect("edge");
  obj.applyEffect("gray-scale");
  obj.applyEffect("invert");
  project.save("../demo/node_result.png");
});
