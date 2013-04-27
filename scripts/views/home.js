(function() {

  define(['backbone', 'text!../../templates/home.html'], function(Backbone, homeTemplate) {
    var HomeView;
    HomeView = Backbone.View.extend({
      render: function() {
        return this.$el.html(_.template(homeTemplate));
      }
    });
    return HomeView;
  });

}).call(this);
