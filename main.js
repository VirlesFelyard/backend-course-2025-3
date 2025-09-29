const fs = require("fs");
const path = require("path");
const { Command } = require("commander");

const program = new Command();

program.option("-i, --input <path>", "input file (required)");
program.option("-o, --output <path>", "output file (optional)");
program.option("-d, --display", "display result to console (optional)");

program.parse(process.argv);
const opts = program.opts();

if (!opts.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

const inputPath = path.resolve(opts.input);

if (!fs.existsSync(inputPath)) {
  console.error("Cannot find input file");
  process.exit(1);
}

let rawData;
try {
  rawData = fs.readFileSync(inputPath, "utf8");
} catch (error) {
  console.error("Cannot read input file");
  process.exit(1);
}

if (!opts.output && !opts.display) {
  process.exit(0);
}

if (opts.display) {
  console.log(rawData);
}

if (opts.output) {
  try {
    fs.writeFileSync(opts.output, rawData, "utf8");
  } catch (err) {
    console.error("Failed to write to output file");
    process.exit(1);
  }
}
