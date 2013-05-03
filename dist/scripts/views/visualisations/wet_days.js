(function() {

  define(['backbone', 'text!../../../templates/wet_days.html', "views/visualisations/new_zealand", "views/visualisations/city_line_chart"], function(Backbone, WetDaysTemplate, NewZealandView, CityLineChartView) {
    var WetDaysView;
    WetDaysView = Backbone.View.extend({
      el: $('#js-visualisation-container'),
      render: function() {
        var region, _fn,
          _this = this;
        this.$el.show('slow');
        this.$el.html(_.template(WetDaysTemplate));
        this.new_zealand = new NewZealandView();
        this.new_zealand.render();
        this.city_line_chart_view = new CityLineChartView();
        d3.json('data/wet_days.json', function(data) {
          return _this.city_line_chart_view.render(data, "Wet Days per Month", [3, 18]);
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
    return WetDaysView;
  });

}).call(this);
