import * as Imagizer from "../dist/imagizer.js";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const project = new Imagizer.Project(500, 375);
    const layer1 = project.createLayer();
    const image1 = new Imagizer.Image();
    image1.load("test.png", function () {
      layer1.put(image1, 0, 0);
      document.querySelector(".test-0 .time").textContent = project.getTime();
      document.querySelector(".test-0").appendChild(project.render());
    });
  },
  false
);

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const project = new Imagizer.Project(500, 375);
    const layer1 = project.createLayer();
    const image1 = new Imagizer.Image();
    image1.load("test.png", function () {
      const obj = layer1.put(image1, 0, 0);
      layer1.resize(200, 150);
      layer1.moveXY(100, 75);
      document.querySelector(".test-1 .time").textContent = project.getTime();
      document.querySelector(".test-1").appendChild(project.render());
    });
  },
  false
);

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const project = new Imagizer.Project(500, 375);
    const layer1 = project.createLayer();
    const image1 = new Imagizer.Image();
    image1.load("test.png", function () {
      const obj = layer1.put(image1, 0, 0);
      layer1.resize(200, 150);
      obj.moveXY(100, 75);
      document.querySelector(".test-8 .time").textContent = project.getTime();
      document.querySelector(".test-8").appendChild(project.render());
    });
  },
  false
);

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const project = new Imagizer.Project(500, 375);
    const layer1 = project.createLayer();
    const image1 = new Imagizer.Image();
    image1.load("test.png", function () {
      const obj = layer1.put(image1, 0, 0);
      layer1.resize(200, 150);
      document.querySelector(".test-2 .time").textContent = project.getTime();
      document.querySelector(".test-2").appendChild(project.render());
    });
  },
  false
);

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const project = new Imagizer.Project(500, 375);
    const layer1 = project.createLayer();
    const image1 = new Imagizer.Image();
    image1.load("test.png", function () {
      const obj = layer1.put(image1, 0, 0);
      obj.crop(100, 100, 100, 100);
      document.querySelector(".test-3 .time").textContent = project.getTime();
      document.querySelector(".test-3").appendChild(project.render());
    });
  },
  false
);

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const project = new Imagizer.Project(500, 375);
    const layer1 = project.createLayer();
    const image1 = new Imagizer.Image();
    image1.load("test.png", function () {
      layer1.put(image1, 0, 0);
      project.resize(200, 150, "biquadratic-interpolation");
      project.resize(800, 600, "biquadratic-interpolation");
      document.querySelector(".test-7 .time").textContent = project.getTime();
      document.querySelector(".test-7").appendChild(project.render());
    });
  },
  false
);

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const project = new Imagizer.Project(500, 375);
    const layer1 = project.createLayer();
    const image1 = new Imagizer.Image();
    image1.load("test.png", function () {
      const obj = layer1.put(image1, 0, 0);
      obj.crop(100, 100, 100, 100);
      obj.resize(300, 300);
      obj.setXY(0, 0);
      document.querySelector(".test-4 .time").textContent = project.getTime();
      document.querySelector(".test-4").appendChild(project.render());
    });
  },
  false
);

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const project = new Imagizer.Project(500, 375);
    const layer1 = project.createLayer();
    const image1 = new Imagizer.Image();
    image1.load("test.png", function () {
      const obj = layer1.put(image1, 0, 0);
      obj.crop(100, 100, 100, 100);
      obj.resize(300, 300, "bilinear-interpolation");
      obj.setXY(0, 0);
      document.querySelector(".test-5 .time").textContent = project.getTime();
      document.querySelector(".test-5").appendChild(project.render());
    });
  },
  false
);

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const project = new Imagizer.Project(500, 375);
    const layer1 = project.createLayer();
    const image1 = new Imagizer.Image();
    image1.load("test.png", function () {
      const obj = layer1.put(image1, 0, 0);
      obj.crop(100, 100, 100, 100);
      obj.resize(300, 300, "biquadratic-interpolation");
      obj.setXY(0, 0);
      document.querySelector(".test-6 .time").textContent = project.getTime();
      document.querySelector(".test-6").appendChild(project.render());
    });
  },
  false
);

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const project = new Imagizer.Project(500, 375);
    const layer1 = project.createLayer();
    const image1 = new Imagizer.Image();
    image1.load("test.png", function () {
      const obj = layer1.put(image1, 0, 0);
      obj.applyEffect("edge");
      obj.applyEffect("gray-scale");
      obj.applyEffect("invert");
      document.querySelector(".test-10 .time").textContent = project.getTime();
      document.querySelector(".test-10").appendChild(project.render());
    });
  },
  false
);

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const project = new Imagizer.Project(500, 375);
    const layer1 = project.createLayer();
    const image1 = new Imagizer.Image();
    image1.load("test.png", function () {
      const obj = layer1.put(image1, 0, 0);
      obj.applyEffect('component-stretching')
      obj.applyEffect('auto-white-balance')
      obj.applyEffect('auto-contrast')
      document.querySelector(".test-11 .time").textContent = project.getTime();
      document.querySelector(".test-11").appendChild(project.render());
    });
  },
  false
);
