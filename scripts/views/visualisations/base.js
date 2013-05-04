(function() {

  define(['backbone', 'views/visualisations/clouds', 'views/visualisations/ufo_sightings', 'views/visualisations/wet_days', 'views/visualisations/rain_fall', 'views/visualisations/meteor_shower', 'views/visualisations/erosion', 'views/visualisations/fruit_bats', 'views/visualisations/bugs'], function(Backbone, CloudView, UfoView, WetDaysView, RainFallView, MeteorShowerView, ErosionView, FruitBatView, BugView) {
    var BaseView;
    return BaseView = Backbone.View.extend({
      render_infographics: function() {
        var height, radius, width;
        width = 40;
        height = 40;
        radius = 20;
        return $('.pie-graph').each(function() {
          var arc, arcs, data, pie, vis;
          data = [100 - $(this).data('count'), $(this).data('count')];
          vis = d3.selectAll($(this)).append('svg').data([data]).attr('width', 40).attr('height', 40).append("g").attr("transform", "translate(" + radius + ", " + radius + ")");
          arc = d3.svg.arc().outerRadius(radius);
          pie = d3.layout.pie().sort(d3.ascending);
          arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
          return arcs.append("svg:path").attr("class", function(d, i) {
            if (i === 0) {
              return 'non-chance';
            } else {
              return 'chance';
            }
          }).attr("d", arc);
        });
      },
      render_sunshine_hours: function() {
        this.cloud_view = new CloudView({
          parentView: this
        });
        this.cloud_view.render();
        this.render_infographics();
        return this.cloud_view;
      },
      render_ufo_sightings: function() {
        this.ufo_view = new UfoView({
          parentView: this
        });
        this.ufo_view.render();
        this.render_infographics();
        return this.ufo_view;
      },
      render_wet_days: function() {
        this.wet_days_view = new WetDaysView({
          parentView: this
        });
        this.wet_days_view.render();
        this.render_infographics();
        return this.wet_days_view;
      },
      render_rain_fall: function() {
        this.rain_fall_view = new RainFallView({
          parentView: this
        });
        this.rain_fall_view.render();
        this.render_infographics();
        return this.rain_fall_view;
      },
      render_meteor_shower: function() {
        this.meteor_shower_view = new MeteorShowerView({
          parentView: this
        });
        this.meteor_shower_view.render();
        this.render_infographics();
        return this.meteor_shower_view;
      },
      render_bugs: function() {
        this.bug_view = new BugView({
          parentView: this
        });
        this.bug_view.render();
        this.render_infographics();
        return this.bug_view;
      },
      render_fruit_bats: function() {
        this.fruit_bat_view = new FruitBatView({
          parentView: this
        });
        this.fruit_bat_view.render();
        this.render_infographics();
        return this.fruit_bat_view;
      },
      render_erosion: function() {
        this.render_erosion = new ErosionView({
          parentView: this
        });
        this.render_erosion.render();
        return this.render_erosion;
      },
      close: function() {
        return $('#js-visualisation-container').html("");
      }
    });
  });

}).call(this);
