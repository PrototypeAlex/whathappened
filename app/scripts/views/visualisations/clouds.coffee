define ['backbone', 'text!../../../templates/clouds.html', "views/visualisations/new_zealand", "views/visualisations/city_line_chart"], (Backbone, CloudTemplate, NewZealandView, CityLineChartView) ->
  CloudView = Backbone.View.extend

    el: '#js-visualisation-container'
    template: _.template(CloudTemplate)

    initialize: (options) ->
      @parentView = options.parentView

    render: ->
      @$el.html( @template )

      @new_zealand = new NewZealandView()
      @new_zealand.render()

      @city_line_chart_view = new CityLineChartView()

      d3.json('data/sunshine_hours.json', (data) => 
        @city_line_chart_view.render(data, "Hours of Sunshine", [40,260])
      )
      
      for region of @new_zealand.nz
        ((path, region, view) =>
          path
            .on("click", -> 
              $('.map-region-prompt').remove()
              view.city_line_chart_view.re_render_data(region)
              d3.selectAll('path.js-region').classed("selected", false)
              d3.select(this).classed("selected", true)
            )
        ) @new_zealand.nz[region], region, @

      @

  CloudView