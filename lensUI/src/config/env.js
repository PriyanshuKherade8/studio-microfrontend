const ENV = process.env.REACT_APP_ENV || "development";

const CONFIG = {
  development: {
    lensShell: "http://localhost:3000",
    lensApp: "http://localhost:3001",
    lensCore: "http://lens-core.xculptor.studio",
    lensCanvas: "http://lens-canvas.xculptor.studio",
    lensUI: "http://localhost:3007",
    //lensControls: "http://localhost:3003",
    // lensRender: "http://localhost:3004",
    // lensAssets: "http://localhost:3005",
  },

  testing: {
    lensShell: "http://localhost:3000",
    lensApp: "http://lens-app.xculptor.studio", //Maintained by Priyanshu
    lensCore: "http://lens-core.xculptor.studio",
    lensCanvas: "http://lens-canvas.xculptor.studio",
    //lensControls: "https://lensControls.xculptor.studio",
    //lensRender: "https://lensRender.xculptor.studio",
    //lensAssets: "https://lensAssets.xculptor.studio",
  },

  production: {
    lens: "https://lens.atttic.studio",
    lensCore: "https://lens-core.atttic.studio",
    lensCanvas: "https://lens-canvas.atttic.studio",
    //lensControls: "https://lensControls.atttic.studio",
    //lensRender: "https://lensRender.atttic.studio",
    //lensAssets: "https://lensAssets.atttic.studio",
  },
};

// export default CONFIG[ENV];
module.exports = CONFIG[ENV];
