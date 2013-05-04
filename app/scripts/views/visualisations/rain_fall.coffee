define ['backbone', 'text!../../../templates/rain_fall.html', "views/visualisations/new_zealand", "views/visualisations/city_line_chart"], (Backbone, RailFallTemplate, NewZealandView, CityLineChartView) ->
  RailFallView = Backbone.View.extend

    el: '#js-visualisation-container'
    template: _.template(RailFallTemplate)

    initialize: (options) ->
      @parentView = options.parentView

    render: ->
      @$el.html( @template )

      @new_zealand = new NewZealandView()
      @new_zealand.render()

      @city_line_chart_view = new CityLineChartView()

      d3.json('data/rain_fall.json', (data) => 
        @city_line_chart_view.render(data, "mm of Rain per Month", [0, 300])
      )

      for region of @new_zealand.nz
        ((path, region, view) =>
          path
            .on("click", -> 
              view.city_line_chart_view.re_render_data(region)
            )
        ) @new_zealand.nz[region], region, @

      @

  RailFallView