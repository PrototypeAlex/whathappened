define ['backbone', 'd3'], (Backbone, d3) ->
  CityLineChartView = Backbone.View.extend

    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    data: null
    chart: null
    line: null
    color: null
    x: null
    y: null
    title: null
    y_range: null

    render: (data, title, y_range) ->
      @data = data
      @title = title
      @y_range = y_range
      @create_chart()
      @create_legend()

    on_hover: (d) ->
      d3.selectAll("path.#{d.city.split(' ').join('_')}")
        .classed("hovering", true)
      d3.selectAll("circle.#{d.city.split(' ').join('_')}")
        .attr("r", 4)

    off_hover: (d) ->
      d3.selectAll("path.#{d.city.split(' ').join('_')}")
        .classed("hovering", false)
      d3.selectAll("circle.#{d.city.split(' ').join('_')}")
        .attr("r", 2)

    re_render_data: (region) ->
      cities = _.filter(@data, (d) => d.region == region)

      city = @chart.selectAll(".city")
        .data(cities, (d) -> d.city)

      city.exit()
        .remove()

      city.enter().append("g")
        .attr("class", "city")

      city.append("path")
        .attr("d", (d) => @line(d.values))
        .style("stroke", (d) => @color(d.city))
        .attr("fill", "none")
        .attr("class", (d) -> d.city.split(' ').join('_'))

      circles = city.selectAll("circle")
        .data((d) -> _.map(d.values, (val) => {value: val, city: d.city} ))

      circles.enter()
        .append("circle")
        .attr("r", 2)
        .attr("cx", (d, i) => @x(i))
        .attr("cy", (d) => @y(d.value))
        .attr("fill", (d) => @color(d.city))
        .on('mouseover', (d) => @on_hover(d))
        .on('mouseout', (d) => @off_hover(d))
        .attr('class', (d) -> d.city.split(' ').join('_'))
        
      city_legend = @legend.selectAll("div.city-legend")
        .data(cities, (d) -> d.city )

      city_legend
        .exit()
        .remove()

      divs = city_legend
        .enter()
        .append("div")
        .attr('class', 'city-legend')
        .on('mouseover', (d) => @on_hover(d))
        .on('mouseout', (d) => @off_hover(d))
     
      divs.append('div')
        .html((d) => "<div class=\"legend-colour\" style=\"background-color: #{@color(d.city)}\"></div><span class=\"city-name\">#{d.city}</span><br /><span class=\"extra\">Total #{@title} - #{d.total}</span>")

      divs.append('div')
        .attr('class', 'clearfix')


    create_legend: ->
      @legend = d3.selectAll('#js-new-zealand-legend')

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
        .interpolate("cardinal")
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
          .text("#{@title} per month")


  CityLineChartView