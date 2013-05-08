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
      $('#js-range-slider').focus()
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

      gradient = @svg.append("svg:defs")
        .append("svg:radialGradient")
          .attr("id", "gradient")
          .attr("cx", "50%")
          .attr("cy", "50%")
          .attr("r", "50%")
          .attr("spreadMethod", "pad")

      gradient.append("svg:stop")
        .attr("offset", "0%")
        .attr("stop-color", "#7e0501")
        .attr("stop-opacity", 1) 

      gradient.append("svg:stop")
        .attr("offset", "50%")
        .attr("stop-color", "#f77000")
        .attr("stop-opacity", .6) 

      gradient.append("svg:stop")
        .attr("offset", "100%")
        .attr("stop-color", "#ebbe0b")
        .attr("stop-opacity", .4)

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
        @explosion_scale = d3.scale.log().domain([d3.min(masses), d3.max(masses)]).range([10, 40])

        @data_grouped_yearly = d3.nest()
          .key((d) -> d.year )
          .entries(data)

        @meteorites = @svg.selectAll('path.point')
          .data(@data_grouped_yearly[0].values)
          
        @meteorites.enter().append("circle")
          .attr("cx", (d) => @projection([d.long, d.lat])[0])
          .attr('cy', (d) => @projection([d.long, d.lat])[1])
          .attr("r", (d) => "#{@explosion_scale(d.mass)}px")
          .attr('fill', 'url(#gradient)')


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
          .attr('fill', 'url(#gradient)')

        sorted_data = _.sortBy(data.values, (d) -> d.mass)
        biggest = sorted_data[sorted_data.length - 1]
        
        $('#js-place').html(biggest.place)
        $('#js-weight').html("#{biggest.mass.formatMoney(2, '.', ',')} grams of #{biggest.type}")
        $('#js-total-hits').html(sorted_data.length)
        


    Number::formatMoney = (c, d, t) ->
      n = this
      c = (if isNaN(c = Math.abs(c)) then 2 else c)
      d = (if d is `undefined` then "." else d)
      t = (if t is `undefined` then "," else t)
      s = (if n < 0 then "-" else "")
      i = parseInt(n = Math.abs(+n or 0).toFixed(c)) + ""
      j = (if (j = i.length) > 3 then j % 3 else 0)
      s + (if j then i.substr(0, j) + t else "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t)

  MeteorView