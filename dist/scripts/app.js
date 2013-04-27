(function() {

  define(["backbone", "router"], function(Backbone, Router) {
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
