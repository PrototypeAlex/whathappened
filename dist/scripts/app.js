(function() {

  define(["backbone", "router", "jquery_mobile_config", "jquery_mobile"], function(Backbone, Router) {
    var initialize;
    initialize = function() {
      var router;
      router = new Router();
      router.initialize();
      return Backbone.history.start();
    };
    return {
      initialize: initialize
    };
  });

}).call(this);
