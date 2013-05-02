define ['backbone', 'text!../../../templates/ufo.html', 'd3', "views/visualisations/new_zealand"], (Backbone, ufoTemplate, d3, newZealandView) ->
  UfoSightingsView = Backbone.View.extend
    
    ufo_data: null

    render: ->
      this.$el.show('slow')
      this.$el.html( _.template(ufoTemplate) )

      @new_zealand = new newZealandView()
      @new_zealand.render()

      d3.json('data/ufo_sightings.json', (data) => 
        @ufo_data = data
      )

      for region of @new_zealand.nz
        ((path, region, view) =>
          path
            .on("click", -> 
              view.render_ufo_template(region)
            )
        ) @new_zealand.nz[region], region, @

    render_ufo_template: (region) ->
      ufo_sightings = _.filter(@ufo_data, (d) => d.region == region)

      readable_region = region.capitalize()
      if region == 'Bayofplenty'
        readable_region = 'Bay of Plenty'
      if region == 'Eastcape'
        readable_region = 'East Cape'

      $('#js-ufo-sightings h2.heading').html("Region: #{readable_region}")

      if ufo_sightings.length == 0
        $('#js-ufo-sightings table').hide()
        $('#js-ufo-sightings p.description').html('There have been no sightings in this region.')
      else
        $('#js-ufo-sightings p.description').html('')
        $('#js-ufo-sightings table').show()

      tbody = d3.select('#js-ufo-sightings table')
        .selectAll("tbody")
      
      data = tbody.selectAll('tr')
        .data(ufo_sightings, (d) -> d.description)
        
      data.exit()
        .transition()
        .remove()

      tr = data.enter()
        .append('tr')

      tr.append('td')
        .text((d) => d.time)
     
      tr.append('td')
        .attr('style', 'text-align: center')
        .text((d) => d.location)

      tr.append('td')
        .attr('style', 'text-align: center')
        .text((d) -> d.event)

      tr.append('td')
        .html("<a>More Information</a>")
        .on("click", (d) -> 
          console.log d
        )
      


    String.prototype.capitalize = ->
      this.replace(/(?:^|\s)\S/g, (a) -> a.toUpperCase())


  UfoSightingsView
