(function() {

  define(["backbone", "router", "jquery_mobile_config", "jquery_mobile", "jquery_touch_swipe", "tweenmax", "modernizr"], function(Backbone, Router) {
    var initialize;
    initialize = function() {
      var router;
      router = new Router();
      return Backbone.history.start();
    };
    return {
      initialize: initialize
    };
  });

}).call(this);
