define ['backbone', 'text!../../../templates/ufo.html', 'd3', "views/visualisations/new_zealand"], (Backbone, ufoTemplate, d3, newZealandView) ->
  UfoSightingsView = Backbone.View.extend
    
    ufo_data: null
    el: '#js-visualisation-container'
    template: _.template(ufoTemplate)

    initialize: (options) ->
      @parentView = options.parentView

    render: ->
      @$el.html( @template )

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
              d3.selectAll('path.js-region').classed("selected", false)
              d3.select(this).classed("selected", true)
            )
        ) @new_zealand.nz[region], region, @

    render_x_file: (data) ->
      x_file = "
        <h3>\"#{data.event.capitalize()}\"</h3>
        <h4><i class=\"icon icon-calendar\"></i>#{data.time}</h4>
        <h4><i class=\"icon icon-pin\"></i>#{data.location}</h4>
        <p>#{data.description}</p>"
      $('#x-file').html(x_file)
      $('#x-file').show()

      TweenMax.to $('#info'), .3, {scrollTop: $('#x-file').position().top}

    render_ufo_template: (region) ->
      ufo_sightings = _.filter(@ufo_data, (d) => d.region == region)

      readable_region = region.capitalize()
      if region == 'Bayofplenty'
        readable_region = 'Bay of Plenty'
      if region == 'Eastcape'
        readable_region = 'East Cape'

      $('#js-ufo-sightings h2.heading').html("<span class=\"text\">Region: #{readable_region}</span>")

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
        .attr('class', 'time')
        .text((d) => d.time)
     
      tr.append('td')
        .attr('class', 'location')
        .text((d) => d.location)

      tr.append('td')
        .attr('class', 'event')
        .text((d) -> d.event.capitalize())

      tr.append('td')
        .html("<a class=\"more\">More</a>")
        .on("click", (d) =>
          $('.map-region-prompt').remove()
          @render_x_file d
        )
      


    String.prototype.capitalize = ->
      this.replace(/(?:^|\s)\S/g, (a) -> a.toUpperCase())


  UfoSightingsView
