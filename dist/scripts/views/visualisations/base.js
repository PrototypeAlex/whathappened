(function() {

  define(['backbone', 'views/visualisations/clouds', 'views/visualisations/ufo_sightings', 'views/visualisations/wet_days', 'views/visualisations/rain_fall', 'views/visualisations/meteor_shower'], function(Backbone, CloudView, UfoView, WetDaysView, RainFallView, MeteorShowerView) {
    var BaseView;
    return BaseView = Backbone.View.extend({
      render_sunshine_hours: function() {
        var cloud_view;
        cloud_view = new CloudView();
        return cloud_view.render();
      },
      render_ufo_sightings: function() {
        var ufo_view;
        ufo_view = new UfoView();
        return ufo_view.render();
      },
      render_wet_days: function() {
        var wet_days_view;
        wet_days_view = new WetDaysView();
        return wet_days_view.render();
      },
      render_rain_fall: function() {
        var rain_fall_view;
        rain_fall_view = new RainFallView();
        return rain_fall_view.render();
      },
      render_meteor_shower: function() {
        var meteor_shower_view;
        meteor_shower_view = new MeteorShowerView();
        return meteor_shower_view.render();
      }
    });
  });

}).call(this);
