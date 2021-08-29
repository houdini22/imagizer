#!/usr/bin/env node

const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const Imagizer = require('../');

const argv = yargs(hideBin(process.argv))
  .help()
  .alias('help', 'h')
  .argv

if (argv.effect === "EnchanceColors") {
  const image = new Imagizer.Image();
  image.load(argv.input, function () {
    const project = new Imagizer.Project(image.getWidth(), image.getHeight());
    const layer1 = project.createLayer();
    const obj = layer1.put(image, 0, 0);
    obj.applyEffect('component-stretching')
    obj.applyEffect('auto-white-balance')
    obj.applyEffect('auto-contrast')
    project.save(argv.output, argv.imageType);

    console.log(`Saved to ${argv.output}.`);
  });
}
