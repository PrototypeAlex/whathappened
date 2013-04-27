define ['backbone', 'text!../../../templates/wet_days.html', "views/visualisations/new_zealand", "views/visualisations/city_line_chart"], (Backbone, WetDaysTemplate, NewZealandView, CityLineChartView) ->
  WetDaysView = Backbone.View.extend

    el: $('#js-visualisation-container')

    wet_days: [
      {'region': 'northland', 'city': 'Kaitaia', 'values': [7.1,6.8,7.5,10.6,13.0,14.7,16.1,15.5,13.2,11.1,9.2,9.6], 'total': 134.4},
      {'region': 'northland', 'city': 'Whangarei', 'values': [7.9,7.9,9.3,9.8,12.5,13.9,14.8,14.8,12.6,10.5,9.4,8.7], 'total': 131.6},
      {'region': 'auckland', 'city': 'Auckland', 'values': [8.0,7.1,8.4,10.6,12.0,14.8,16.0,14.9,12.8,12.0,10.3,9.3], 'total': 135.7},
      {'region': 'bayofplenty', 'city': 'Tauranga', 'values': [6.4,7.0,8.0,8.4,8.6,10.9,11.5,11.8,10.4,10.3,9.1,8.2], 'total': 109.6},
      {'region': 'waikato', 'city': 'Hamilton', 'values': [7.8,6.2,7.7,8.4,11.0,12.6,12.8,13.3,11.7,11.7,10.7,10.5], 'total': 124.8},
      {'region': 'bayofplenty', 'city': 'Rotorua', 'values': [8.2,7.4,8.5,8.2,9.5,11.2,11.0,11.6,11.3,10.9,9.4,10.0], 'total': 118.2},
      {'region': 'eastcape', 'city': ' Gisborne', 'values': [6.4,7.4,9.4,8.8,9.8,10.8,12.4,10.7,9.0,8.1,7.9,7.0], 'total': 106.9},
      {'region': 'waikato', 'city': 'Taupo', 'values': [7.7,6.7,7.3,7.4,8.7,10.9,10.9,11.4,10.7,10.6,8.2,9.2], 'total': 108.5},
      {'region': 'taranaki', 'city': 'New Plymouth', 'values': [8.9,7.7,9.8,9.8,12.3,13.6,12.6,13.4,12.6,14.1,10.5,9.5], 'total': 135.5},
      {'region': 'hawkesbay', 'city': 'Napier', 'values': [6.0,5.9,7.2,7.1,7.9,8.8,9.4,8.2,7.4,7.5,6.0,6.5], 'total': 88.1},
      {'region': 'manawatu', 'city': 'Wanganui', 'values': [7.0,7.1,7.9,8.0,10.3,12.1,11.3,11.7,10.4,10.8,9.1,10.1], 'total': 115.9},
      {'region': 'manawatu', 'city': 'Palmerston North', 'values': [7.1,6.9,7.7,8.2,9.9,12.2,11.6,13.0,11.9,11.8,10.3,11.1], 'total': 120.7},
      {'region': 'manawatu', 'city': 'Masterton', 'values': [7.1,7.6,10.1,9.2,11.0,13.2,14.1,14.1,11.7,12.8,10.0,9.7], 'total': 129.8},
      {'region': 'wellington', 'city': 'Wellington', 'values': [7.2,7.0,8.7,8.7,10.8,13.4,12.6,12.5,10.6,12.1,9.3,8.8], 'total': 122.2},
      {'region': 'nelson', 'city': 'Nelson', 'values': [6.8,5.8,6.6,6.5,7.3,8.2,7.8,8.6,9.9,9.4,7.9,8.6], 'total': 92.9},
      {'region': 'marlborough', 'city': 'Blenheim', 'values': [5.0,5.1,5.5,5.3,6.7,7.9,7.6,8.0,8.5,8.3,6.9,6.7], 'total': 81.8},
      {'region': 'westcoast', 'city': 'Westport', 'values': [12.3,10.2,12.2,12.0,15.1,16.3,14.1,15.4,17.4,17.4,14.6,15.8], 'total': 173.7},
      {'region': 'canterbury', 'city': 'Kaikoura', 'values': [6.9,6.5,6.7,6.8,6.9,7.9,8.5,6.2,6.0,7.8,6.8,6.9], 'total': 83.9},
      {'region': 'westcoast', 'city': 'Hokitika', 'values': [12.4,10.9,12.6,12.9,15.0,14.9,13.3,14.7,17.1,17.1,14.6,16.9], 'total': 172.4},
      {'region': 'canterbury', 'city': 'Christchurch', 'values': [5.8,5.6,6.2,6.7,7.6,8.9,8.2,8.2,6.1,6.9,6.5,7.3], 'total': 83.9},
      {'region': 'canterbury', 'city': 'Mt Cook', 'values': [12.4,10.9,13.4,12.4,13.1,13.8,13.5,13.9,13.7,16.7,13.9,15.7], 'total': 164.2},
      {'region': 'canterbury', 'city': 'Lake Tekapo', 'values': [5.8,5.3,5.5,6.0,6.7,7.5,6.5,7.4,7.3,7.6,6.2,7.1], 'total': 79.2},
      {'region': 'canterbury', 'city': 'Timaru', 'values': [6.8,6.7,6.2,5.7,5.7,5.3,5.8,5.7,5.8,7.1,6.8,8.0], 'total': 75.6},
      {'region': 'otago', 'city': 'Milford Sound', 'values': [15.9,13.1,14.9,14.5,16.0,15.5,14.1,16.1,17.3,18.5,15.4,17.7], 'total': 188.7},
      {'region': 'otago', 'city': 'Queenstown', 'values': [7.2,6.2,7.4,7.4,9.0,9.2,6.9,9.1,8.5,8.8,7.6,9.6], 'total': 96.9},
      {'region': 'southland', 'city': 'Alexandra', 'values': [6.7,5.2,4.9,4.0,6.9,5.8,4.3,4.4,5.4,2.5,4.8,7.7], 'total': 64.7},
      {'region': 'southland', 'city': 'Manapouri', 'values': [9.1,7.9,9.7,10.5,11.6,12.9,10.4,11.8,12.4,12.2,10.3,11.9], 'total': 125.9},
      {'region': 'otago', 'city': 'Dunedin', 'values': [9.7,8.5,8.9,8.3,9.8,9.4,9.3,9.6,8.7,10.1,10.0,12.0], 'total': 113.8},
      {'region': 'southland', 'city': 'Invercargill', 'values': [13.0,10.3,12.3,12.3,15.3,15.6,14.2,12.8,13.1,13.8,13.3,14.3], 'total': 161.0},
      {'region': 'southland', 'city': 'Chatham Islands', 'values': [7.9,7.7,11.3,11.1,14.4,16.0,14.8,14.5,11.9,11.2,9.8,9.4], 'total': 138.5}] 

    render: ->
      this.$el.show('slow')
      this.$el.html( _.template(WetDaysTemplate) )

      @new_zealand = new NewZealandView()
      @new_zealand.render()

      @city_line_chart_view = new CityLineChartView()
      @city_line_chart_view.render(@wet_days, "Wet Days per Month", [3, 18])

      for region of @new_zealand.nz
        ((path, region, view) =>
          path
            .on("click", -> 
              view.city_line_chart_view.re_render_data(region)
            )
        ) @new_zealand.nz[region], region, @

      @

  WetDaysView