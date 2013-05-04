define ['backbone', 'views/visualisations/clouds', 'views/visualisations/ufo_sightings', 'views/visualisations/wet_days', 'views/visualisations/rain_fall', 'views/visualisations/meteor_shower', 'views/visualisations/erosion', 'views/visualisations/fruit_bats', 'views/visualisations/bugs'], (Backbone, CloudView, UfoView, WetDaysView, RainFallView, MeteorShowerView, ErosionView, FruitBatView, BugView) ->
  BaseView = Backbone.View.extend

    render_infographics: ->
      width = 40
      height = 40
      radius = 20

      $('.pie-graph').each( -> 
        data = [100 - $(this).data('count'), $(this).data('count')]
        vis = d3.selectAll($(this))
          .append('svg')
          .data([data])
          .attr('width', 40)
          .attr('height', 40)
          .append("g")
          .attr("transform", "translate(#{radius}, #{radius})") 

        arc = d3.svg.arc()
          .outerRadius(radius)  

        pie = d3.layout.pie() 
          .sort(d3.ascending)

        arcs = vis.selectAll("g.slice")     
          .data(pie)
          .enter() 
          .append("svg:g")
          .attr("class", "slice")

        arcs.append("svg:path")
          .attr("class", (d, i) -> if i == 0 then 'non-chance' else 'chance' )
          .attr("d", arc)
      )

    render_sunshine_hours: ->
      @cloud_view = new CloudView({parentView: @})
      @cloud_view.render()
      @render_infographics()
      @cloud_view

    render_ufo_sightings: ->
      @ufo_view = new UfoView({parentView: @})
      @ufo_view.render()
      @render_infographics()
      @ufo_view

    render_wet_days: ->
      @wet_days_view = new WetDaysView({parentView: @})
      @wet_days_view.render()
      @render_infographics()
      @wet_days_view

    render_rain_fall: ->
      @rain_fall_view = new RainFallView({parentView: @})
      @rain_fall_view.render()
      @render_infographics()
      @rain_fall_view

    render_meteor_shower: ->
      @meteor_shower_view = new MeteorShowerView({parentView: @})
      @meteor_shower_view.render()
      @render_infographics()
      @meteor_shower_view

    render_bugs: ->
      @bug_view = new BugView({parentView: @})
      @bug_view.render()
      @render_infographics()
      @bug_view

    render_fruit_bats: ->
      @fruit_bat_view = new FruitBatView({parentView: @})
      @fruit_bat_view.render()
      @render_infographics()
      @fruit_bat_view

    render_erosion: ->
      @render_erosion = new ErosionView({parentView: @})
      @render_erosion.render()
      @render_erosion

    close: ->
      $('#js-visualisation-container').html("")