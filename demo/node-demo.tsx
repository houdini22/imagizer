import * as Imagizer from "../dist/imagizer.js";

const image = new Imagizer.Image();
image.load("../demo/test.png", function () {
  const project = new Imagizer.Project(image.getWidth(), image.getHeight());
  const layer1 = project.createLayer();
  const obj = layer1.put(image, 0, 0);
  obj.applyEffect("edge");
  obj.applyEffect("gray-scale");
  obj.applyEffect("invert");
  project.save("../demo/node_result.png");
});

const image2 = new Imagizer.Image();
image2.load("../demo/test.png", function () {
  const project = new Imagizer.Project(image2.getWidth(), image2.getHeight());
  const layer1 = project.createLayer();
  const obj = layer1.put(image2, 0, 0);
  obj.applyEffect('component-stretching')
  obj.applyEffect('auto-white-balance')
  obj.applyEffect('auto-contrast')
  project.save("../demo/node_result2.png");
});
