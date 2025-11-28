const ENV = process.env.REACT_APP_ENV || "development";

const CONFIG = {
  development: {
    lensShell: "http://localhost:3000", //THIS WILL ALWAYS BE 3000
    lensApp: "http://localhost:3001", //KISHORE: xculptor //Priyanshu: 3001
    lensCore: "http://lens-core.xculptor.studio",
    lensCanvas: "http://lens-canvas.xculptor.studio",
    // lensControls: "http://localhost:3004",
    // lensRender: "http://localhost:3005",
    // lensAssets: "http://localhost:3006",
  },

  testing: {
    lensShell: "http://localhost:3000",
    lensApp: "http://lens-app.xculptor.studio",
    lensCore: "http://lens-core.xculptor.studio",
    lensCanvas: "http://lens-canvas.xculptor.studio",
    //lensControls: "https://lensControls.xculptor.studio",
    //lensRender: "https://lensRender.xculptor.studio",
    //lensAssets: "https://lensAssets.xculptor.studio",
  },

  production: {
    lensShell: "lens.atttic.studio",
    lensApp: "https://lens-app.atttic.studio",
    lensCore: "https://lens-core.atttic.studio",
    lensCanvas: "https://lens-canvas.atttic.studio",
    //lensControls: "https://lens-controls.atttic.studio",
    //lensRender: "https://lens-render.atttic.studio",
    //lensAssets: "https://lens-assets.atttic.studio",
  },
};

// export default CONFIG[ENV];
module.exports = CONFIG[ENV];
