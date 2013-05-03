(function() {

  define(['backbone', 'text!../../../templates/rain_fall.html', "views/visualisations/new_zealand", "views/visualisations/city_line_chart"], function(Backbone, RailFallTemplate, NewZealandView, CityLineChartView) {
    var RailFallView;
    RailFallView = Backbone.View.extend({
      render: function() {
        var region, _fn,
          _this = this;
        this.$el.show('slow');
        this.$el.html(_.template(RailFallTemplate));
        this.new_zealand = new NewZealandView();
        this.new_zealand.render();
        this.city_line_chart_view = new CityLineChartView();
        d3.json('data/rain_fall.json', function(data) {
          return _this.city_line_chart_view.render(data, "mm of Rain per Month", [0, 300]);
        });
        _fn = function(path, region, view) {
          return path.on("click", function() {
            return view.city_line_chart_view.re_render_data(region);
          });
        };
        for (region in this.new_zealand.nz) {
          _fn(this.new_zealand.nz[region], region, this);
        }
        return this;
      }
    });
    return RailFallView;
  });

}).call(this);
