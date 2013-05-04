(function() {

  define(['backbone', 'views/visualisations/base', 'views/infographic'], function(Backbone, VisualisationView, InfographicView) {
    var InfoView;
    InfoView = Backbone.View.extend({
      vizualisation_view: null,
      current_visualisation: null,
      initialize: function() {
        return this.vizualisation_view = new VisualisationView({
          parentView: this
        });
      },
      render: function(viz_id) {
        $('#info').removeClass('hidden');
        console.log(viz_id);
        switch (viz_id) {
          case "clouds":
            this.renderSunshineHours();
            break;
          case "spaceship":
            this.renderUfoSightings();
            break;
          case "rain_fall":
            this.renderRainFall();
            break;
          case "meteor_shower":
            this.renderMeteorShower();
            break;
          case "wet_days":
            this.renderWetDays();
        }
        return _.each($('#info .infographic'), function(el) {
          var v;
          return v = new InfographicView({
            el: el
          });
        });
      },
      renderUfoSightings: function() {
        return this.current_visualisation = this.vizualisation_view.render_ufo_sightings();
      },
      renderSunshineHours: function() {
        return this.current_visualisation = this.vizualisation_view.render_sunshine_hours();
      },
      renderWetDays: function() {
        return this.current_visualisation = this.vizualisation_view.render_wet_days();
      },
      renderRainFall: function() {
        return this.current_visualisation = this.vizualisation_view.render_rain_fall();
      },
      renderMeteorShower: function() {
        return this.current_visualisation = this.vizualisation_view.render_meteor_shower();
      },
      close: function(e) {
        this.vizualisation_view.remove();
        $('#info').addClass('hidden');
      }
    });
    return InfoView;
  });

}).call(this);
