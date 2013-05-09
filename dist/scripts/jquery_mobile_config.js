(function() {

  define(["jquery"], function($) {
    return $(document).on("mobileinit", function() {
      $.mobile.linkBindingEnabled = false;
      return $.mobile.hashListeningEnabled = false;
    });
  });

}).call(this);
