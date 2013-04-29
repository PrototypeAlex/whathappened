require.config
  paths:
    jquery: "../components/jquery/jquery"
    backbone: "../components/backbone-amd/backbone"
    underscore: "../components/underscore-amd/underscore"
    text: "../components/requirejs-text/text"
    d3: "../components/d3/d3"
    topojson: "../components/topojson/topojson"

  shim:
    bootstrap:
      deps: ["jquery"]
      exports: "jquery"

    backbone:
      deps: ["underscore", "jquery", "text"]
      exports: "Backbone"

    underscore:
      exports: "_"

    jquery:
      exports: "$"

    d3:
      exports: "d3"

    topojson:
      exports: "topojson"

  include: ["backbone", "app", "d3", "topojson", "initializer"]

require ["app"], (App) ->
  App.initialize()