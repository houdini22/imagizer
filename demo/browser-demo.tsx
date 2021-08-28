import * as Imagizer from '../dist/imagizer.js'

document.addEventListener("DOMContentLoaded", function()
{
  var project = new Imagizer.Project(500, 375);
  var layer1 = project.createLayer();
  var image1 = new Imagizer.Image();
  image1.load("test.png", function()
  {
    layer1.put(image1, 0, 0);
    project.exportTo(".test-0");
    document.querySelector(".test-0 .time").textContent = project.getTime();
  });
}, false);

document.addEventListener("DOMContentLoaded", function()
{
  var project = new Imagizer.Project(500, 375);
  var layer1 = project.createLayer();
  var image1 = new Imagizer.Image();
  image1.load("test.png", function()
  {
    var obj = layer1.put(image1, 0, 0);
    layer1.resize(200, 150);
    layer1.moveXY(100, 75);
    project.exportTo(".test-1");
    document.querySelector(".test-1 .time").textContent = project.getTime();
  });
}, false);

document.addEventListener("DOMContentLoaded", function()
{
  var project = new Imagizer.Project(500, 375);
  var layer1 = project.createLayer();
  var image1 = new Imagizer.Image();
  image1.load("test.png", function()
  {
    var obj = layer1.put(image1, 0, 0);
    layer1.resize(200, 150);
    obj.moveXY(100, 75);
    project.exportTo(".test-8");
    document.querySelector(".test-8 .time").textContent = project.getTime();
  });
}, false);

document.addEventListener("DOMContentLoaded", function()
{
  var project = new Imagizer.Project(500, 375);
  var layer1 = project.createLayer();
  var image1 = new Imagizer.Image();
  image1.load("test.png", function()
  {
    var obj = layer1.put(image1, 0, 0);
    layer1.resize(200, 150);
    project.exportTo(".test-2");
    document.querySelector(".test-2 .time").textContent = project.getTime();
  });
}, false);

document.addEventListener("DOMContentLoaded", function()
{
  var project = new Imagizer.Project(500, 375);
  var layer1 = project.createLayer();
  var image1 = new Imagizer.Image();
  image1.load("test.png", function()
  {
    var obj = layer1.put(image1, 0, 0);
    obj.crop(100, 100, 100, 100);
    project.exportTo(".test-3");
    document.querySelector(".test-3 .time").textContent = project.getTime();
  });
}, false);

document.addEventListener("DOMContentLoaded", function()
{
  var project = new Imagizer.Project(500, 375);
  var layer1 = project.createLayer();
  var image1 = new Imagizer.Image();
  image1.load("test.png", function()
  {
    layer1.put(image1, 0, 0);
    project.resize(200, 150, "biquadratic-interpolation");
    project.resize(800, 600, "biquadratic-interpolation");
    project.exportTo(".test-7");
    document.querySelector(".test-7 .time").textContent = project.getTime();
  });
}, false);

document.addEventListener("DOMContentLoaded", function()
{
  var project = new Imagizer.Project(500, 375);
  var layer1 = project.createLayer();
  var image1 = new Imagizer.Image();
  image1.load("test.png", function()
  {
    var obj = layer1.put(image1, 0, 0);
    obj.crop(100, 100, 100, 100);
    obj.resize(300, 300);
    obj.setXY(0, 0);
    project.exportTo(".test-4");
    document.querySelector(".test-4 .time").textContent = project.getTime();
  });
}, false);

document.addEventListener("DOMContentLoaded", function()
{
  var project = new Imagizer.Project(500, 375);
  var layer1 = project.createLayer();
  var image1 = new Imagizer.Image();
  image1.load("test.png", function()
  {
    var obj = layer1.put(image1, 0, 0);
    obj.crop(100, 100, 100, 100);
    obj.resize(300, 300, "bilinear-interpolation");
    obj.setXY(0, 0);
    project.exportTo(".test-5");
    document.querySelector(".test-5 .time").textContent = project.getTime();
  });
}, false);

document.addEventListener("DOMContentLoaded", function()
{
  var project = new Imagizer.Project(500, 375);
  var layer1 = project.createLayer();
  var image1 = new Imagizer.Image();
  image1.load("test.png", function()
  {
    var obj = layer1.put(image1, 0, 0);
    obj.crop(100, 100, 100, 100);
    obj.resize(300, 300, "biquadratic-interpolation");
    obj.setXY(0, 0);
    project.exportTo(".test-6");
    document.querySelector(".test-6 .time").textContent = project.getTime();
  });
}, false);
