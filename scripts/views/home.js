(function() {

  define(['backbone', 'text!../../templates/home.html'], function(Backbone, homeTemplate) {
    var HomeView;
    HomeView = Backbone.View.extend({
      render: function() {
        this.$el.html(_.template(homeTemplate));
        return this.animateIn();
      },
      animateIn: function() {
        var elements,
          _this = this;
        elements = [this.$('h1'), this.$('.olive'), this.$('p'), this.$('.btn')];
        _.each(elements, function($el, index) {
          $el.css({
            opacity: 0
          });
          TweenMax.to($el, .2, {
            opacity: 1,
            delay: index * .1,
            ease: Quint.easeOut
          });
        });
      }
    });
    return HomeView;
  });

}).call(this);
