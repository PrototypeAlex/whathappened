(function() {

  define(['backbone'], function(Backbone) {
    var BaseView;
    BaseView = Backbone.View.extend({
      el: $('body'),
      events: {
        '': ''
      },
      initialize: function() {
        return this;
      }
    });
    return BaseView;
  });

}).call(this);
