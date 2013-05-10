(function() {

  define(['backbone', 'views/visualisations/base', 'views/infographic'], function(Backbone, VisualisationView, InfographicView) {
    var InfoView;
    InfoView = Backbone.View.extend({
      vizualisation_view: null,
      current_visualisation: null,
      initialize: function() {
        if (window.WhatHappenedCloseCount === void 0) {
          window.WhatHappenedCloseCount = 0;
        }
        return this.vizualisation_view = new VisualisationView({
          parentView: this
        });
      },
      render: function(viz_id) {
        $('#info').removeClass('hidden');
        this.renderViz(viz_id);
        return this.animateIn();
      },
      renderViz: function(viz_id) {
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
            break;
          case "fruit_bat":
            this.renderFruitBats();
            break;
          case "bugs":
            this.renderBugs();
            break;
          case "erosion":
            this.renderErosion();
        }
        if (window.WhatHappenedCloseCount > 0) {
          $('#info .close-tip').remove();
        }
        return _.each($('#info .infographic'), function(el) {
          var v;
          return v = new InfographicView({
            el: el
          });
        });
      },
      animateIn: function() {
        $('body').addClass('info-open');
        $('#info .bg').css({
          opacity: 0
        });
        TweenMax.to($('#info .bg'), .2, {
          opacity: 0.94
        });
        $('#info .document').css({
          top: "140px",
          opacity: 0
        });
        TweenMax.to($('#info .document'), .5, {
          top: 25,
          opacity: 1,
          ease: Quint.easeOut,
          delay: .3
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
      renderFruitBats: function() {
        return this.current_visualisation = this.vizualisation_view.render_fruit_bats();
      },
      renderBugs: function() {
        return this.current_visualisation = this.vizualisation_view.render_bugs();
      },
      renderErosion: function() {
        return this.current_visualisation = this.vizualisation_view.render_erosion();
      },
      close: function(e) {
        var _this = this;
        window.WhatHappenedCloseCount++;
        $('body').removeClass('info-open');
        TweenMax.to($('#info .document'), .2, {
          top: 140,
          opacity: 0,
          ease: Quint.easeIn
        });
        TweenMax.to($('#info .bg'), .2, {
          opacity: 0,
          delay: .3,
          onComplete: function() {
            _this.animationOutComplete();
          }
        });
      },
      animationOutComplete: function() {
        this.vizualisation_view.remove();
        $('#info').addClass('hidden');
      }
    });
    return InfoView;
  });

}).call(this);
