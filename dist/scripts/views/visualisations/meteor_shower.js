(function() {

  define(['backbone', 'text!../../../templates/meteor_shower.html', 'd3', 'topojson'], function(Backbone, MeteorShowerTemplate, d3, topojson) {
    var MeteorView;
    MeteorView = Backbone.View.extend({
      events: {
        'change #js-range-slider': 'change_range_slider'
      },
      el: '#js-visualisation-container',
      template: _.template(MeteorShowerTemplate),
      initialize: function(options) {
        return this.parentView = options.parentView;
      },
      render: function() {
        this.$el.html(this.template);
        this.render_geo_chart();
        $('#js-range-slider').slider();
        return $('#js-range-slider').focus();
      },
      render_geo_chart: function() {
        var blue_gradient, boundry_feature, gradient, height, land_feature, width,
          _this = this;
        width = 718;
        height = 370;
        land_feature = null;
        boundry_feature = null;
        this.projection = d3.geo.equirectangular().scale(110).translate([width / 2, height / 2]);
        this.svg = d3.select("#js-globe-container").append("svg").attr("width", width).attr("height", height);
        this.path = d3.geo.path().projection(this.projection);
        this.svg.append("use").attr("class", "fill").attr("xlink:href", "#sphere");
        gradient = this.svg.append("svg:defs").append("svg:radialGradient").attr("id", "gradient").attr("cx", "50%").attr("cy", "50%").attr("r", "50%").attr("spreadMethod", "pad");
        gradient.append("svg:stop").attr("offset", "0%").attr("stop-color", "#7e0501").attr("stop-opacity", 1);
        gradient.append("svg:stop").attr("offset", "50%").attr("stop-color", "#f77000").attr("stop-opacity", .6);
        gradient.append("svg:stop").attr("offset", "100%").attr("stop-color", "#ebbe0b").attr("stop-opacity", .4);
        blue_gradient = this.svg.append("svg:defs").append("svg:radialGradient").attr("id", "blue_gradient").attr("cx", "50%").attr("cy", "50%").attr("r", "50%").attr("spreadMethod", "pad");
        blue_gradient.append("svg:stop").attr("offset", "0%").attr("stop-color", "#003a8a").attr("stop-opacity", 1);
        blue_gradient.append("svg:stop").attr("offset", "50%").attr("stop-color", "#2a84ff").attr("stop-opacity", .6);
        blue_gradient.append("svg:stop").attr("offset", "100%").attr("stop-color", "#6caaff").attr("stop-opacity", .4);
        d3.json('data/worldcountries.geo.json', function(world) {
          land_feature = _this.svg.append("path").datum(topojson.feature(world, world.objects.land)).attr("class", function(d) {
            return "land";
          }).attr("d", _this.path);
          return boundry_feature = _this.svg.append("path").datum(topojson.mesh(world, world.objects.countries, function(a, b) {
            return a !== b;
          })).attr("class", "boundary").attr("d", _this.path);
        });
        return d3.json('data/meteorites.json', function(data) {
          var masses;
          masses = _.map(data, function(d) {
            return d.mass;
          });
          _this.explosion_scale = d3.scale.log().domain([d3.min(masses), d3.max(masses)]).range([10, 40]);
          _this.data_grouped_yearly = d3.nest().key(function(d) {
            return d.year;
          }).entries(data);
          _this.meteorites = _this.svg.selectAll('path.point').data(_this.data_grouped_yearly[0].values);
          return _this.meteorites.enter().append("circle").attr("cx", function(d) {
            return _this.projection([d.long, d.lat])[0];
          }).attr('cy', function(d) {
            return _this.projection([d.long, d.lat])[1];
          }).attr("r", function(d) {
            return "" + (_this.explosion_scale(d.mass)) + "px";
          }).attr('fill', 'url(#gradient)').attr('class', 'meteorite-circle').on('click', function(d) {
            return _this.show_details(d);
          }).on('mouseover', function(d) {
            return d3.select(this).attr('fill', "url(#blue_gradient)");
          }).on('mouseout', function(d) {
            return d3.select(this).attr('fill', "url(#gradient)");
          });
        });
      },
      show_details: function(d) {
        var event;
        event = d3.event;
        $('#x-file').show();
        return $('#x-file').html("<h3>Meteorite Record: " + d.place + "</h3>        <h4><i class=\"icon icon-calendar\"></i>" + d.year + "  A.D</h4>        <h4><i class=\"icon icon-help\"></i>" + (d.mass.formatMoney(2, '.', ',')) + " grams of " + d.type + "</h4>        <h4><i class=\"icon icon-pin\"></i><a href='https://maps.google.co.nz/maps?q=" + d.lat + "," + d.long + "' target='_blank'>https://maps.google.co.nz/maps?q=" + d.lat + "," + d.long + "</a></h4>");
      },
      on_hover: function(d) {
        d3.selectAll("path." + (d.city.split(' ').join('_'))).classed("hovering", true);
        return d3.selectAll("circle." + (d.city.split(' ').join('_'))).attr("r", 4);
      },
      off_hover: function(d) {
        d3.selectAll("path." + (d.city.split(' ').join('_'))).classed("hovering", false);
        return d3.selectAll("circle." + (d.city.split(' ').join('_'))).attr("r", 2);
      },
      change_range_slider: function(e) {
        var biggest, circles, data, sorted_data,
          _this = this;
        if (this.data_grouped_yearly.length > 0) {
          data = this.data_grouped_yearly[$(e.target).val()];
          $('#js-current-year').html(data.key);
          this.meteorites = this.svg.selectAll('circle').data(data.values, function(d) {
            return d.lat + d.long;
          });
          this.meteorites.exit().remove();
          circles = this.meteorites.enter().append("circle").attr("cx", function(d) {
            return _this.projection([d.long, d.lat])[0];
          }).attr('cy', function(d) {
            return _this.projection([d.long, d.lat])[1];
          }).attr("r", function(d) {
            return "" + (_this.explosion_scale(d.mass)) + "px";
          }).attr('fill', 'url(#gradient)').attr('class', 'meteorite-circle').on('click', function(d) {
            return _this.show_details(d);
          }).on('mouseover', function(d) {
            return d3.select(this).attr('fill', "url(#blue_gradient)");
          }).on('mouseout', function(d) {
            return d3.select(this).attr('fill', "url(#gradient)");
          });
          sorted_data = _.sortBy(data.values, function(d) {
            return d.mass;
          });
          biggest = sorted_data[sorted_data.length - 1];
          $('#js-place').html(biggest.place);
          $('#js-weight').html("" + (biggest.mass.formatMoney(2, '.', ',')) + " grams of " + biggest.type);
          $('#js-total-hits').html(sorted_data.length);
          if (sorted_data.length === 1) {
            $('#js-meteorites-plural').html("Meteorite");
          } else {
            $('#js-meteorites-plural').html("Meteorites");
          }
          $('#js-meteors-graphic').trigger('re-init');
          return $('#js-place-graphic').trigger('re-init');
        }
      }
    }, Number.prototype.formatMoney = function(c, d, t) {
      var i, j, n, s;
      n = this;
      c = (isNaN(c = Math.abs(c)) ? 2 : c);
      d = (d === undefined ? "." : d);
      t = (t === undefined ? "," : t);
      s = (n < 0 ? "-" : "");
      i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "";
      j = ((j = i.length) > 3 ? j % 3 : 0);
      return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t);
    });
    return MeteorView;
  });

}).call(this);
