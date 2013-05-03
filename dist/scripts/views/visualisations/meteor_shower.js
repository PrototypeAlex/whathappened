(function() {

  define(['backbone', 'text!../../../templates/meteor_shower.html', 'd3', 'topojson'], function(Backbone, MeteorShowerTemplate, d3, topojson) {
    var MeteorView;
    MeteorView = Backbone.View.extend({
      events: {
        'change #js-range-slider': 'change_range_slider'
      },
      el: $('#js-visualisation-container'),
      data_grouped_yearly: null,
      meteorites: null,
      svg: null,
      path: null,
      render: function() {
        this.$el.show('slow');
        this.$el.html(_.template(MeteorShowerTemplate));
        this.render_geo_chart();
        return this;
      },
      render_geo_chart: function() {
        var boundry_feature, graticule, height, land_feature, origin, projection, width,
          _this = this;
        width = 728;
        height = 350;
        land_feature = null;
        boundry_feature = null;
        origin = {
          x: 0,
          y: 0
        };
        projection = d3.geo.equirectangular().scale(115).translate([width / 2, height / 2]).precision(.1);
        this.svg = d3.select("#js-globe-container").append("svg").attr("width", width).attr("height", height);
        this.path = d3.geo.path().projection(projection);
        this.svg.append("defs").append("path").datum({
          type: "Sphere"
        }).attr("id", "sphere").attr("d", this.path);
        this.svg.append("use").attr("class", "fill").attr("xlink:href", "#sphere");
        graticule = d3.geo.graticule();
        this.svg.append("path").datum(graticule).attr("class", "graticule").attr("d", this.path);
        d3.json('data/worldcountries.geo.json', function(world) {
          land_feature = _this.svg.append("path").datum(topojson.feature(world, world.objects.land)).attr("class", function(d) {
            return "land";
          }).attr("d", _this.path);
          return boundry_feature = _this.svg.append("path").datum(topojson.mesh(world, world.objects.countries, function(a, b) {
            return a !== b;
          })).attr("class", "boundary").attr("d", _this.path);
        });
        return d3.json('data/meteorites.json', function(data) {
          _this.data_grouped_yearly = d3.nest().key(function(d) {
            return d.year;
          }).entries(data);
          _this.meteorites = _this.svg.selectAll('path.point').data(_this.data_grouped_yearly[0].values);
          return _this.meteorites.enter().append("path").datum(function(d) {
            return {
              type: "Point",
              coordinates: [d.long, d.lat],
              radius: .1
            };
          }).attr("class", "point").attr('fill', 'red').attr("d", _this.path);
        });
      },
      change_range_slider: function(e) {
        var data;
        if (this.data_grouped_yearly.length > 0) {
          data = this.data_grouped_yearly[$(e.target).val()];
          $('#js-current-year').html(data.key);
          this.meteorites = this.svg.selectAll('path.point').data(data.values);
          this.meteorites.exit().transition().remove();
          return this.meteorites.enter().append("path").datum(function(d) {
            return {
              type: "Point",
              coordinates: [d.long, d.lat],
              radius: 100
            };
          }).attr("class", "point").attr('fill', 'red').attr("d", this.path);
        }
      }
    });
    return MeteorView;
  });

}).call(this);
