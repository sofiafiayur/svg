# SVGs Resize Tool

A small collection of Node.js scripts for batch resizing and optimizing SVG flag files.

## Requirements

- Node.js 20 or later
- npm

## Installation

From the directory containing `package.json` and the scripts, install the dependencies:

```sh
npm install
```

Run all commands below from that same directory. Folder paths are resolved relative to your current working directory.

## Resize SVGs

Place your SVG files in `circle-flags/`, then run:

```sh
node scaledownsvg.js
```

By default, the script:

- Processes only `.svg` files with exactly two letters in their name, such as `it.svg` and `us.svg`.
- Sets the root SVG `width` and `height` to `24`.
- Saves the results in `circle-flags-filtered-24/`, creating the directory if needed.
- Leaves the source files unchanged.

Files such as `gb-eng.svg` are skipped. Only files directly inside the input folder are processed; subfolders are not scanned.

To change the folders or output size, edit these constants in `scaledownsvg.js`:

```js
const INPUT_DIR = "./circle-flags";
const OUTPUT_DIR = "./circle-flags-filtered-24";

const TARGET_SIZE = 24;
```

The script changes the displayed dimensions and preserves the existing `viewBox` and shape coordinates. It does not rescale path data. SVGs need a suitable `viewBox` for their artwork to scale with the dimensions. The declared `ORIGINAL_SIZE` and `SCALE` values are currently unused.

## Adjust a specific circle

```sh
node resizesvg.js
```

This script edits SVGs **in place** inside `circle-flags-24px/`. Change its `folder` constant to use a different directory.

It replaces the first circle matching the expected double-quoted attributes, in this order:

```svg
<circle cx="256" cy="256" r="256" />
```

with:

```svg
<circle cx="12" cy="12" r="12" />
```

The entire matching opening tag is replaced, including any other attributes on it. This is a targeted adjustment for a particular SVG structure; it does not resize the entire SVG or change its root dimensions. Keep a copy of your input files before running it.

## Optimize SVGs

```sh
node optimizesvg.js
```

This script reads `.svg` files from `circle-flags-24px/` and writes results to `flags-optimized/`. Edit `flagsDir` and `outDir` in the script to change those locations.

It applies the same circle replacement described above, removes every closing `</g>` tag, and runs SVGO with multiple passes and numeric precision set to two decimal places. Its plugins remove selected metadata, comments, hidden elements, and unused definitions, among other cleanup steps.

**Check this script against your SVG structure before using it.** Removing closing group tags can produce invalid SVG markup when opening `<g>` tags remain, causing optimization to fail. Removing the namespace can also affect use as a standalone SVG document. Inspect the generated files before using them.

The optimizer defines its SVGO options inline; it does not load `svgo.config.js`.

## Files

| File | Purpose |
| --- | --- |
| `scaledownsvg.js` | Filter two-letter filenames and set SVG display dimensions. |
| `resizesvg.js` | Replace a specific circle in the source files. |
| `optimizesvg.js` | Apply targeted markup changes and optimize copies with SVGO. |
| `svgo.config.js` | Separate SVGO configuration, unused by the scripts above. |
| `package.json` | npm dependencies. |

## Notes

- These scripts are separate utilities. The resize output folder differs from the other scripts' default input folder; edit the paths if you want to use them together.
- Settings are edited in the source files; there are no command-line options or npm scripts.
- Input directories must already exist. Output files with matching names are overwritten.
- Review SVGs visually after processing, especially when changing dimensions or precision.
