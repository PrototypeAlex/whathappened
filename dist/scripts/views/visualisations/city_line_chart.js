(function() {

  define(['backbone', 'd3'], function(Backbone, d3) {
    var CityLineChartView;
    CityLineChartView = Backbone.View.extend({
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: null,
      chart: null,
      line: null,
      color: null,
      x: null,
      y: null,
      title: null,
      y_range: null,
      initialize: function() {
        return this.create_tooltip();
      },
      render: function(data, title, y_range) {
        this.data = data;
        this.title = title;
        this.y_range = y_range;
        this.create_chart();
        return this.create_legend();
      },
      on_hover: function(d) {
        d3.selectAll("path." + (d.city.split(' ').join('_'))).classed("hovering", true);
        return d3.selectAll("circle." + (d.city.split(' ').join('_'))).attr("r", 4);
      },
      off_hover: function(d) {
        d3.selectAll("path." + (d.city.split(' ').join('_'))).classed("hovering", false);
        return d3.selectAll("circle." + (d.city.split(' ').join('_'))).attr("r", 2);
      },
      show_tooltip: function(d) {
        this.tooltip.html("<p>" + d.value + " " + this.title + " (" + d.city + ")</p>");
        return this.tooltip.style("visibility", "visible");
      },
      hide_tooltip: function(d) {
        return this.tooltip.style("visibility", "hidden");
      },
      move_tooltip: function(d) {
        var event;
        event = d3.event;
        return this.tooltip.style("top", "" + (event.pageY - 10) + "px").style("left", "" + (event.pageX + 10) + "px");
      },
      re_render_data: function(region) {
        var circles, cities, city, city_legend, divs,
          _this = this;
        cities = _.filter(this.data, function(d) {
          return d.region === region;
        });
        city = this.chart.selectAll(".city").data(cities, function(d) {
          return d.city;
        });
        city.exit().remove();
        city.enter().append("g").attr("class", "city");
        city.append("path").attr("d", function(d) {
          return _this.line(d.values);
        }).style("stroke", function(d) {
          return _this.color(d.city);
        }).attr("fill", "none").attr("class", function(d) {
          return d.city.split(' ').join('_');
        });
        circles = city.selectAll("circle").data(function(d, i) {
          return _.map(d.values, function(val) {
            return {
              value: val,
              city: d.city
            };
          });
        });
        circles.enter().append("circle").attr("r", 2).attr("cx", function(d, i) {
          return _this.x(i);
        }).attr("cy", function(d) {
          return _this.y(d.value);
        }).attr("fill", function(d) {
          return _this.color(d.city);
        }).on('mouseover', function(d) {
          _this.on_hover(d);
          return _this.show_tooltip(d);
        }).on('mouseout', function(d) {
          _this.off_hover(d);
          return _this.hide_tooltip(d);
        }).on('mousemove', function(d) {
          return _this.move_tooltip(d);
        }).attr('class', function(d) {
          return d.city.split(' ').join('_');
        });
        city_legend = this.legend.selectAll("div.city-legend").data(cities, function(d) {
          return d.city;
        });
        city_legend.exit().remove();
        divs = city_legend.enter().append("div").attr('class', 'city-legend').on('mouseover', function(d) {
          return _this.on_hover(d);
        }).on('mouseout', function(d) {
          return _this.off_hover(d);
        });
        divs.append('div').html(function(d) {
          return "<div class=\"legend-colour\" style=\"background-color: " + (_this.color(d.city)) + "\"></div><span class=\"city-name\">" + d.city + "</span><br /><span class=\"extra\">Total " + _this.title + " - " + d.total + "</span>";
        });
        return divs.append('div').attr('class', 'clearfix');
      },
      create_tooltip: function() {
        return this.tooltip = d3.select("body").append("div").attr('class', 'tool-tip');
      },
      create_legend: function() {
        return this.legend = d3.selectAll('#js-new-zealand-legend');
      },
      create_chart: function() {
        var height, margin, width, xAxis, yAxis,
          _this = this;
        margin = {
          top: 20,
          right: 20,
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
        this.line = d3.svg.line().interpolate("cardinal").x(function(d, i) {
          return this.x(i);
        }).y(function(d) {
          return this.y(d);
        });
        this.chart = d3.select("#js-city-line-chart").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        this.chart.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
        return this.chart.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").attr("class", "vertical-hint").style("text-anchor", "end").text("" + this.title + " per month");
      }
    });
    return CityLineChartView;
  });

}).call(this);
