define ['backbone', 'text!../../../templates/clouds.html', "views/visualisations/new_zealand", "views/visualisations/city_line_chart"], (Backbone, CloudTemplate, NewZealandView, CityLineChartView) ->
  CloudView = Backbone.View.extend

    # el: $('#js-visualisation-container')

    render: ->

      this.$el.show('slow')
      this.$el.html( _.template(CloudTemplate) )

      @new_zealand = new NewZealandView()
      @new_zealand.render()

      @city_line_chart_view = new CityLineChartView()

      d3.json('data/sunshine_hours.json', (data) => 
        @city_line_chart_view.render(data, "Hours of Sunshine per Month", [40,260])
      )
      
      for region of @new_zealand.nz
        ((path, region, view) =>
          path
            .on("click", -> 
              view.city_line_chart_view.re_render_data(region)
            )
        ) @new_zealand.nz[region], region, @

      @

  CloudView