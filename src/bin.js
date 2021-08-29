#!/usr/bin/env node

const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const Imagizer = require('../');

const argv = yargs(hideBin(process.argv))
  .help()
  .alias('help', 'h')
  .argv

if (argv.input && argv.output && argv.outputImageType) {
  if (argv.effect === "EnhanceColors") {
    const image = new Imagizer.Image();
    image.load(argv.input, function () {
      const project = new Imagizer.Project(image.getWidth(), image.getHeight());
      const layer1 = project.createLayer();
      const obj = layer1.put(image, 0, 0);
      obj.applyEffect('component-stretching')
      obj.applyEffect('auto-white-balance')
      obj.applyEffect('auto-contrast')
      project.save(argv.output, argv.outputImageType);

      console.log(`Saved to ${argv.output} as ${argv.outputImageType}.`);
    });
  } else if (argv.effect === 'GrayScale') {
    const image = new Imagizer.Image();
    image.load(argv.input, function () {
      const project = new Imagizer.Project(image.getWidth(), image.getHeight());
      const layer1 = project.createLayer();
      const obj = layer1.put(image, 0, 0);
      obj.applyEffect('gray-scale')
      project.save(argv.output, argv.outputImageType);

      console.log(`Saved to ${argv.output} as ${argv.outputImageType}.`);
    });
  } else if (argv.effect === 'Sepia' && argv.sepiaValue) {
    const image = new Imagizer.Image();
    image.load(argv.input, function () {
      const project = new Imagizer.Project(image.getWidth(), image.getHeight());
      const layer1 = project.createLayer();
      const obj = layer1.put(image, 0, 0);
      obj.applyEffect('sepia', {
        sepiaValue: parseFloat(argv.sepiaValue)
      })
      project.save(argv.output, argv.outputImageType);

      console.log(`Saved to ${argv.output} as ${argv.outputImageType}.`);
    });
  } else if (argv.effect === 'Resize' && argv.width && argv.height) {
    const image = new Imagizer.Image();
    image.load(argv.input, function () {
      const project = new Imagizer.Project(image.getWidth(), image.getHeight());
      const layer1 = project.createLayer();
      const obj = layer1.put(image, 0, 0);
      project.resize(parseInt(argv.width), parseInt(argv.height));
      project.save(argv.output, argv.outputImageType);

      console.log(`Saved to ${argv.output} as ${argv.outputImageType}.`);
    });
  }
}
