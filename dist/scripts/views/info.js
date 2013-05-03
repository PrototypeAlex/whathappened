(function() {

  define(['backbone', 'views/visualisations/clouds', 'views/visualisations/ufo_sightings', 'views/visualisations/rain_fall'], function(Backbone, CloudsView, UfoView, RainView) {
    var InfoView;
    InfoView = Backbone.View.extend({
      events: {
        'click .close': 'close',
        'click .bg': 'close'
      },
      id: "info",
      initialize: function(options) {
        this.options = options;
        _.bindAll(this);
        this.$el = $(this.el);
        this.render();
        console.log(this);
      },
      template: _.template("<div class=\"bg\"></div>\n<div class=\"document\">\n    <a href=\"#\" class=\"close\"><div class=\"circular-glare\"></div></a>\n    <div class=\"corner\"></div>\n    <div class=\"content\"></div>\n</div>"),
      render: function() {
        var v, view;
        this.$el.html(this.template(this));
        switch (this.options.viz_id) {
          case "clouds":
            view = CloudsView;
            break;
          case "spaceship":
            view = UfoView;
            break;
          case "rain_fall":
            view = RainView;
        }
        if (view != null) {
          v = new view({
            el: this.$('.content')
          });
          return v.render();
        }
      },
      close: function(e) {
        e.preventDefault();
        this.remove();
      }
    });
    return InfoView;
  });

}).call(this);
