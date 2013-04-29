define ['backbone', 'text!../../../templates/meteor_shower.html', 'd3', 'topojson'], (Backbone, MeteorShowerTemplate, d3, topojson) ->
  MeteorView = Backbone.View.extend

    el: $('#js-visualisation-container')

    render: ->
      this.$el.show('slow')
      this.$el.html( _.template(MeteorShowerTemplate) )
      #@get_meteor_data()
      @render_geo_chart()
      @

    render_geo_chart: ->
      width = 728
      height = 500

      projection = d3.geo.orthographic()
        .scale(248)
        .clipAngle(90)

      svg = d3.select("#js-globe-container").append("svg")
        .attr("width", width)
        .attr("height", height)

      path = d3.geo.path()
        .projection(projection)

      svg.append("defs").append("path")
        .datum({type: "Sphere"})
        .attr("id", "sphere")
        .attr("d", path)
        .attr("transform", "translate(-116, 0)")

      svg.append("use")
        .attr("class", "stroke")
        .attr("xlink:href", "#sphere")    

      svg.append("use")
        .attr("class", "fill")
        .attr("xlink:href", "#sphere")

      graticule = d3.geo.graticule()

      svg.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path)
        .attr("transform", "translate(-116, 0)")

      λ = d3.scale.linear()
        .domain([0, width])
        .range([-180, 180]);      

      φ = d3.scale.linear()
        .domain([0, height])
        .range([90, -90])

      mouse_down = null

      svg.on("mousedown", ->
        mouse_down = [d3.event.pageX, d3.event.pageY]
        d3.event.preventDefault()
      )

      svg.on("mousemove", ->
        if mouse_down
          p = d3.mouse(this)
          projection.rotate([λ(p[0]), φ(p[1])])
          svg.selectAll("path").attr("d", path)
      )

      d3.select(window).on("mouseup", ->
        mouse_down = null
      )

      d3.json('data/worldcountries.geo.json', (world) => 
        svg.insert("path", ".graticule")
          .datum(topojson.feature(world, world.objects.land))
          .attr("class", "land")
          .attr("d", path)
          .attr("transform", "translate(-116, 0)") 

        svg.insert("path", ".graticule")
          .datum(topojson.mesh(world, world.objects.countries, (a, b) ->  a != b ))
          .attr("class", "boundary")
          .attr("d", path)
          .attr("transform", "translate(-116, 0)")
      )

      callback = (data) ->
        console.log data
        console.log data.table.rows[0]
      
      queryurl = "https://www.google.com/fusiontables/api/query?sql=select+*+from+1hrTPrwR5piW7e9U-LNGmcRKRDUWCwhAaqiN_yrU"
      querytail = "&jsonCallback=?"
      jqxhr = $.get(queryurl + querytail, callback, "jsonp")





  MeteorView