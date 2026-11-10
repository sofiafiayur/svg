const fs = require("fs");
const path = require("path");

const folder = "./circle-flags-24px"; // change to your actual directory

fs.readdirSync(folder).forEach(file => {
  if (file && file.endsWith(".svg")) {
    const filePath = path.join(folder, file);
    let svg = fs.readFileSync(filePath, "utf8");

    // Replace width and height values
    svg = svg.replace(
    /<circle[^>]*cx="256"[^>]*cy="256"[^>]*r="256"[^>]*>/,
    `<circle cx="12" cy="12" r="12" />`
    );

    fs.writeFileSync(filePath, svg);
    console.log(`Updated ${file}`);
  }
});
