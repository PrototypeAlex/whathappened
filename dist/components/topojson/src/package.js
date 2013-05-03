require("../topojson");

console.log(JSON.stringify({
  "name": "topojson",
  "version": topojson.version,
  "description": "An extension to GeoJSON that encodes topology.",
  "keywords": [
    "geojson",
    "shapefile"
  ],
  "author": {
    "name": "Mike Bostock",
    "url": "http://bost.ocks.org/mike"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/mbostock/topojson.git"
  },
  "main": "./index.js",
  "dependencies": {
    "dsv": "0.0.x",
    "optimist": "0.3.x",
    "queue-async": "1.0.x",
    "shapefile": "~0.0.7"
  },
  "devDependencies": {
    "vows": "0.7.x",
    "us-atlas": "0.0.x",
    "world-atlas": "0.0.x"
  },
  "bin": {
    "topojson": "./bin/topojson",
    "geojson": "./bin/geojson"
  },
  "scripts": {
    "test": "node_modules/.bin/vows; echo"
  }
}, null, 2));
