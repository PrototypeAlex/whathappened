require.config
  paths:
    jquery: "../components/jquery/jquery"
    backbone: "../components/backbone-amd/backbone"
    underscore: "../components/underscore-amd/underscore"
    text: "../components/requirejs-text/text"
    d3: "../components/d3/d3"
    topojson: "../components/topojson/topojson"
    jquery_mobile: "../components/jquery-mobile/jquery.mobile.custom"
    jquery_mobile_config: "./jquery_mobile_config"
    jquery_touch_swipe: "../components/jquery-touch-swipe/jquery.touchSwipe"
    tweenmax: "../components/tweenmax/tweenmax.min"

  shim:
    bootstrap:
      deps: ["jquery"]
      exports: "jquery"

    backbone:
      deps: ["underscore", "jquery", "text"]
      exports: "Backbone"

    underscore:
      exports: "_"

    jquery_mobile_config: ["jquery"]
    jquery_mobile: ["jquery", "jquery_mobile_config"]
    jquery_touch_swipe: ["jquery"]

    d3:
      exports: "d3"

    topojson:
      exports: "topojson"

    tweenmax:
      exports: "TweenMax"


require ["app"], (App) ->
  App.initialize()