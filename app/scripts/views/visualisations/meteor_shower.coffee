define ['backbone', 'text!../../../templates/meteor_shower.html', 'd3', 'topojson'], (Backbone, MeteorShowerTemplate, d3, topojson) ->
  MeteorView = Backbone.View.extend

    events:
      'change #js-range-slider' : 'change_range_slider'

    el: $('#js-visualisation-container')

    data_grouped_yearly: null
    meteorites: null
    svg: null
    path: null

    render: ->
      $('#js-visualisation-container').html( _.template(MeteorShowerTemplate) )
      #@get_meteor_data()
      @render_geo_chart()
      @

    render_geo_chart: ->
      width = 728
      height = 350
      land_feature = null
      boundry_feature = null
      origin = {x: 0, y: 0}

      projection = d3.geo.equirectangular()
        .scale(115)
        .translate([width / 2, height / 2])
        .precision(.1)

      @svg = d3.select("#js-globe-container").append("svg")
        .attr("width", width)
        .attr("height", height)

      @path = d3.geo.path()
        .projection(projection)

      @svg.append("defs").append("path")
        .datum({type: "Sphere"})
        .attr("id", "sphere")
        .attr("d", @path)

      @svg.append("use")
        .attr("class", "fill")
        .attr("xlink:href", "#sphere")

      graticule = d3.geo.graticule()

      @svg.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", @path)

      #@svg.call(d3.behavior.drag()
      #  .origin( -> origin )
      #  .on("drag", =>
      #    origin.x = d3.event.x
      #    origin.y = d3.event.y
      #    projection.rotate([origin.x, -origin.y])
      #    @svg.selectAll('path').attr("d", @path)
      #  ))


      #@svg.call(
      #  d3.behavior.zoom()
      #    .translate(projection.translate())
      #    .scale(projection.scale())
      #    .scaleExtent([115, height])
      #    .on("zoom", => 
      #      if (d3.event)
      #        projection
      #          .translate(d3.event.translate)
      #          .scale(d3.event.scale)
      #        @svg.selectAll("path").attr("d", @path)
      #    )
      #)        
 

      d3.json('data/worldcountries.geo.json', (world) => 
        land_feature = @svg.append("path")
          .datum(topojson.feature(world, world.objects.land))
          .attr("class", (d) -> "land")
          .attr("d", @path) 

        boundry_feature = @svg.append("path")
          .datum(topojson.mesh(world, world.objects.countries, (a, b) ->  a != b ))
          .attr("class", "boundary")
          .attr("d", @path)
      )

      d3.json('data/meteorites.json', (data) => 
        @data_grouped_yearly = d3.nest()
          .key((d) -> d.year )
          .entries(data)

        @meteorites = @svg.selectAll('path.point')
          .data(@data_grouped_yearly[0].values)
          
        @meteorites.enter().append("path")
          .datum((d) -> return {type: "Point", coordinates: [d.long, d.lat], radius: .1})
          .attr("class", "point")
          .attr('fill', 'red')
          .attr("d", @path)
      )

    change_range_slider: (e) ->
      if @data_grouped_yearly.length > 0
        data = @data_grouped_yearly[$(e.target).val()]
        $('#js-current-year').html(data.key)
        
        @meteorites = @svg.selectAll('path.point')
          .data(data.values)

        @meteorites.exit()
          .transition()
          .remove()

        @meteorites.enter().append("path")
          .datum((d) -> return {type: "Point", coordinates: [d.long, d.lat], radius: 100})
          .attr("class", "point")
          .attr('fill', 'red')
          .attr("d", @path)

  MeteorView