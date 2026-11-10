// need to use node v20+ to run the script

const fs = require("fs");
const path = require("path");
const { parse, stringify } = require("svgson");
const SVGPath = require("svgpath");

const INPUT_DIR = "./circle-flags";
const OUTPUT_DIR = "./circle-flags-filtered-24";

const ORIGINAL_SIZE = 512;
const TARGET_SIZE = 24;
const SCALE = TARGET_SIZE / ORIGINAL_SIZE;

// Make output dir
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

// Check if filename is exactly "xx.svg"
function isTwoLetterFlag(filename) {
  const name = filename.replace(".svg", "");
  return /^[a-z]{2}$/i.test(name);
}

async function scaleSvg(filePath, fileName) {
  const svgContent = fs.readFileSync(filePath, "utf8");
  const json = await parse(svgContent);

  // Update root attributes
  json.attributes.width = TARGET_SIZE;
  json.attributes.height = TARGET_SIZE;

  const output = stringify(json);
  fs.writeFileSync(path.join(OUTPUT_DIR, fileName), output, "utf8");
  console.log(`Scaled: ${fileName}`);
}

(async () => {
  const files = fs.readdirSync(INPUT_DIR).filter(f => f.endsWith(".svg"));

  for (const file of files) {
    if (!isTwoLetterFlag(file)) {
      console.log(`Skipped (not 2 letters): ${file}`);
      continue;
    }

    await scaleSvg(path.join(INPUT_DIR, file), file);
  }

  console.log("Done! All 2-letter flags scaled and saved in:", OUTPUT_DIR);
})();
