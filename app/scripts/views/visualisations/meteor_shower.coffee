define ['backbone', 'text!../../../templates/meteor_shower.html', 'd3', 'topojson'], (Backbone, MeteorShowerTemplate, d3, topojson) ->
  MeteorView = Backbone.View.extend

    events:
      'change #js-range-slider' : 'change_range_slider'

    el: '#js-visualisation-container'
    template: _.template(MeteorShowerTemplate)

    initialize: (options) ->
      @parentView = options.parentView

    render: ->
      @$el.html( @template )
      @render_geo_chart()
      @

    render_geo_chart: ->
      width = 688
      height = 370
      land_feature = null
      boundry_feature = null

      @projection = d3.geo.equirectangular()
        .scale(110)
        .translate([width / 2, height / 2])

      @svg = d3.select("#js-globe-container").append("svg")
        .attr("width", width)
        .attr("height", height)

      @path = d3.geo.path()
        .projection(@projection)

      @svg.append("defs").append("path")
        .datum({type: "Sphere"})
        .attr("id", "sphere")
        .attr("d", @path)

      @svg.append("use")
        .attr("class", "fill")
        .attr("xlink:href", "#sphere")

      graticule = d3.geo.graticule()

      # Graticule lines
      #@svg.append("path")
      #  .datum(graticule)
      #  .attr("class", "graticule")
      #  .attr("d", @path) 

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
        masses = _.map(data, (d) -> d.mass)
        @explosion_scale = d3.scale.linear().domain([d3.min(masses), d3.max(masses)]).range([5, 20])

        @data_grouped_yearly = d3.nest()
          .key((d) -> d.year )
          .entries(data)

        @meteorites = @svg.selectAll('path.point')
          .data(@data_grouped_yearly[0].values)
          
        @meteorites.enter().append("circle")
          .attr("cx", (d) => @projection([d.long, d.lat])[0])
          .attr('cy', (d) => @projection([d.long, d.lat])[1])
          .attr("r", (d) => "#{@explosion_scale(d.mass)}px")


      )

    change_range_slider: (e) ->
      if @data_grouped_yearly.length > 0
        data = @data_grouped_yearly[$(e.target).val()]
        $('#js-current-year').html(data.key)
        
        @meteorites = @svg.selectAll('circle')
          .data(data.values, (d) -> (d.lat + d.long))

        @meteorites.exit()
          .remove()

        @meteorites.enter().append("circle")
          .attr("cx", (d) => @projection([d.long, d.lat])[0])
          .attr('cy', (d) => @projection([d.long, d.lat])[1])
          .attr("r", (d) => "#{@explosion_scale(d.mass)}px")



  MeteorView