(function() {

  define(['backbone', 'd3'], function(Backbone, d3) {
    var CityLineChartView;
    CityLineChartView = Backbone.View.extend({
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      data: null,
      chart: null,
      line: null,
      color: null,
      x: null,
      y: null,
      y_axis_title: null,
      y_range: null,
      render: function(data, title, y_range) {
        this.data = data;
        this.y_axis_title = title;
        this.y_range = y_range;
        return this.create_chart();
      },
      re_render_data: function(region) {
        var cities, city,
          _this = this;
        cities = _.filter(this.data, function(d) {
          return d.region === region;
        });
        city = this.chart.selectAll(".city").data(cities, function(d) {
          return d.city;
        });
        city.exit().transition().remove();
        city.enter().append("g").attr("class", "city");
        city.append("path").attr("class", "line").attr("d", function(d) {
          return _this.line(d.values);
        }).style("stroke", function(d) {
          return _this.color(d.city);
        }).attr("fill", "none");
        return city.append("text").datum(function(d) {
          return {
            city: d.city,
            value: d.values[11]
          };
        }).attr("transform", function(d) {
          return "translate(" + _this.x(11) + "," + _this.y(d.value) + ")";
        }).attr("x", 3).attr("dy", ".35em").text(function(d) {
          return d.city;
        });
      },
      create_chart: function() {
        var height, margin, width, xAxis, yAxis,
          _this = this;
        margin = {
          top: 20,
          right: 80,
          bottom: 30,
          left: 50
        };
        width = 728 - margin.left - margin.right;
        height = 400 - margin.top - margin.bottom;
        this.color = d3.scale.category10();
        this.x = d3.scale.linear().domain([0, 11]).range([0, width]);
        this.y = d3.scale.linear().domain(this.y_range).range([height, 0]);
        xAxis = d3.svg.axis().scale(this.x).orient("bottom").tickFormat(function(d) {
          return _this.months[d];
        });
        yAxis = d3.svg.axis().scale(this.y).orient("left");
        this.line = d3.svg.line().interpolate("basis").x(function(d, i) {
          return this.x(i);
        }).y(function(d) {
          return this.y(d);
        });
        this.chart = d3.select("#js-city-line-chart").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        this.chart.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
        return this.chart.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text(this.y_axis_title);
      }
    });
    return CityLineChartView;
  });

}).call(this);
