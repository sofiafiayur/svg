const fs = require("fs");
const path = require("path");
const { optimize } = require("svgo");

const flagsDir = "./circle-flags-24px";
const outDir = "./flags-optimized";
fs.mkdirSync(outDir, { recursive: true });

for (const file of fs.readdirSync(flagsDir)) {
  if (!file.endsWith(".svg")) continue;

  const inputPath = path.join(flagsDir, file);
  let svg = fs.readFileSync(inputPath, "utf8");

  // Replace ONLY the circle with cx="256" cy="256" r="256"
  svg = svg.replace(
    /<circle[^>]*cx="256"[^>]*cy="256"[^>]*r="256"[^>]*>/,
    `<circle cx="12" cy="12" r="12" />`
  );

  svg = svg.replace(/<\/g>/g, "");

  // Optional: Optimize SVG using SVGO
  const optimized = optimize(svg, {
    multipass: true,
    floatPrecision: 2,
    plugins: [
      "removeDoctype",
      "removeComments",
      "removeMetadata",
      "removeXMLNS",
      "removeEditorsNSData",
      "removeEmptyAttrs",
      "removeHiddenElems",
      "removeEmptyText",
      "removeUselessDefs",
      "convertStyleToAttrs",
      {
        name: "cleanupNumericValues",
        params: { floatPrecision: 2 }
      }
    ]
  });

  const outputPath = path.join(outDir, file);
  fs.writeFileSync(outputPath, optimized.data);

  console.log(`Processed: ${file}`);
}

console.log("Done!");
