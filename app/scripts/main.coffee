require.config
  paths:
    jquery: "../components/jquery/jquery"
    backbone: "../components/backbone-amd/backbone"
    underscore: "../components/underscore-amd/underscore"
    text: "../components/requirejs-text/text"
    d3: "../components/d3/d3"

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

  include: ["backbone", "app", "d3", "initializer"]

require ["app"], (App) ->
  App.initialize()