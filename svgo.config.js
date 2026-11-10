module.exports = {
  multipass: true,
  plugins: [
    "cleanupAttrs",
    "removeDoctype",
    "removeXMLProcInst",
    "removeComments",
    "removeMetadata",
    "removeTitle",
    "removeDesc",
    "removeUselessDefs",
    "removeEditorsNSData",
    "removeEmptyAttrs",
    "removeHiddenElems",
    "removeEmptyText",
    "removeEmptyContainers",
    "removeViewBox", // we'll set it manually later
    {
      name: "convertPathData",
      params: {
        floatPrecision: 2,
        transformPrecision: 5,
      },
    },
    {
      name: "preset-default",
    }
  ],
};
