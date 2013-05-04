define ['backbone', 'text!../../../templates/wet_days.html', "views/visualisations/new_zealand", "views/visualisations/city_line_chart"], (Backbone, WetDaysTemplate, NewZealandView, CityLineChartView) ->
  WetDaysView = Backbone.View.extend

    el: $('#js-visualisation-container')

    render: ->
      $('#js-visualisation-container').html( _.template(WetDaysTemplate) )

      @new_zealand = new NewZealandView()
      @new_zealand.render()

      @city_line_chart_view = new CityLineChartView()

      d3.json('data/wet_days.json', (data) => 
        @city_line_chart_view.render(data, "Wet Days per Month", [3, 18])
      )

      for region of @new_zealand.nz
        ((path, region, view) =>
          path
            .on("click", -> 
              view.city_line_chart_view.re_render_data(region)
            )
        ) @new_zealand.nz[region], region, @

      @

  WetDaysView