(function() {

  define(['backbone', 'text!../../../templates/clouds.html', "views/visualisations/new_zealand", "views/visualisations/city_line_chart"], function(Backbone, CloudTemplate, NewZealandView, CityLineChartView) {
    var CloudView;
    CloudView = Backbone.View.extend({
      el: '#js-visualisation-container',
      template: _.template(CloudTemplate),
      initialize: function(options) {
        return this.parentView = options.parentView;
      },
      render: function() {
        var region, _fn,
          _this = this;
        this.$el.html(this.template);
        this.new_zealand = new NewZealandView();
        this.new_zealand.render();
        this.city_line_chart_view = new CityLineChartView();
        d3.json('data/sunshine_hours.json', function(data) {
          return _this.city_line_chart_view.render(data, "Hours of Sunshine", [40, 260]);
        });
        _fn = function(path, region, view) {
          return path.on("click", function() {
            $('.map-region-prompt').remove();
            view.city_line_chart_view.re_render_data(region);
            d3.selectAll('path.js-region').classed("selected", false);
            return d3.select(this).classed("selected", true);
          });
        };
        for (region in this.new_zealand.nz) {
          _fn(this.new_zealand.nz[region], region, this);
        }
        return this;
      }
    });
    return CloudView;
  });

}).call(this);
