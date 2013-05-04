define ['backbone', 'd3'], (Backbone, d3) ->
  CityLineChartView = Backbone.View.extend

    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    data: null
    chart: null
    line: null
    color: null
    x: null
    y: null
    y_axis_title: null
    y_range: null

    render: (data, title, y_range) ->
      @data = data
      @y_axis_title = title
      @y_range = y_range
      @create_chart()
      @create_legend()

    re_render_data: (region) ->
      cities = _.filter(@data, (d) => d.region == region)

      city = @chart.selectAll(".city")
        .data(cities, (d) -> d.city)

      city.exit()
        .transition()
        .remove()

      city.enter().append("g")
        .attr("class", "city")

      city.append("path")
        .attr("class", "line")
        .attr("d", (d) => @line(d.values))
        .style("stroke", (d) => @color(d.city))
        .attr("fill", "none")

      city.append("text")
        .datum((d) -> {city: d.city, value: d.values[11]})
        .attr("transform", (d) => "translate(" + @x(11) + "," + @y(d.value) + ")")
        .attr("x", 3)
        .attr("dy", ".35em")
        .text((d) -> d.city)

      city_legend = @legend.selectAll("div.cities")
        .data(cities, (d) -> d.city )

    create_legend: ->
      margin = {top: 10, right: 10, bottom: 10, left: 10}
      @legend = d3.select('#js-new-zealand-svg')

    create_chart: ->
      margin = {top: 20, right: 20, bottom: 30, left: 50}
      width = 728 - margin.left - margin.right
      height = 400 - margin.top - margin.bottom
      @color = d3.scale.category10()

      @x = d3.scale.linear().domain([0, 11]).range([0, width])        
      @y = d3.scale.linear().domain(@y_range).range([height, 0])

      xAxis = d3.svg.axis()
        .scale(@x)
        .orient("bottom")
        .tickFormat((d) => @months[d])

      yAxis = d3.svg.axis()
        .scale(@y)
        .orient("left")

      @line = d3.svg.line()
        .interpolate("basis")
        .x((d, i) -> @x(i))
        .y((d) -> @y(d))

      @chart = d3.select("#js-city-line-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


      @chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)

      @chart.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .attr("class", "vertical-hint")
          .style("text-anchor", "end")
          .text(@y_axis_title)


  CityLineChartView