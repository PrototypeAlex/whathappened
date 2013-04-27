define ['backbone', 'text!../../../templates/rain_fall.html', "views/visualisations/new_zealand", "views/visualisations/city_line_chart"], (Backbone, RailFallTemplate, NewZealandView, CityLineChartView) ->
  RailFallView = Backbone.View.extend

    el: $('#js-visualisation-container')

    rain_fall:[
      {"region": "northland", "city": "Kaitaia", "values": [82.0, 92.5, 82.0, 97.7, 131.9, 149.1, 165.4, 140.0, 126.7, 97.8, 86.2, 99.6], "total": 1349.2},
      {"region": "northland", "city": "Whangarei", "values": [81.2, 95.2, 118.1, 98.9, 111.2, 131.5, 168.6, 128.4, 112.2, 85.3, 77.1, 96.4], "total": 1317.7},
      {"region": "auckland", "city": "Auckland", "values": [73.3, 66.1, 87.3, 99.4, 112.6, 126.4, 145.1, 118.4, 105.1, 100.2, 85.8, 92.8], "total": 1210.7},
      {"region": "bayofplenty", "city": "Tauranga", "values": [76.0, 86.6, 92.7, 120.9, 105.7, 115.7, 127.4, 112.3, 87.6, 90.4, 75.3, 90.3], "total": 1176.5},
      {"region": "waikato", "city": "Hamilton", "values": [76.3, 68.7, 79.4, 80.3, 99.7, 113.2, 118.2, 103.4, 91.5, 91.9, 85.0, 100.7], "total": 1108.4},
      {"region": "bayofplenty", "city": "Rotorua", "values": [92.7, 93.9, 99.2, 107.2, 116.9, 136.1, 134.5, 131.4, 109.3, 112.3, 93.8, 114.2], "total": 1358.9},
      {"region": "eastcape", "city": "Gisborne", "values": [56.2, 71.3, 91.4, 98.2, 101.3, 104.6, 127.7, 76.2, 73.5, 72.5, 67.1, 56.2], "total": 978.7},
      {"region": "waikato", "city": "Taupo", "values": [77.3, 67.9, 66.5, 68.4, 74.9, 92.8, 96.0, 87.4, 81.6, 86.2, 67.9, 93.6], "total": 954.5},
      {"region": "taranaki", "city": "New Plymouth", "values": [114.5, 85.4, 126.5, 125.4, 97.1, 152.6, 131.1, 117.2, 104.8, 117.8, 100.3, 113.1], "total": 1398.0},
      {"region": "hawkesbay", "city": "Napier", "values": [46.8, 54.3, 66.8, 67.9, 74.8, 82.1, 108.3, 60.1, 57.9, 59.9, 52.4, 53.5], "total": 776.0},
      {"region": "manawatu", "city": "Wanganui", "values": [59.2, 75.5, 62.9, 69.2, 79.5, 88.8, 85.3, 74.4, 73.7, 88.0, 75.4, 86.4], "total": 916.7},
      {"region": "manawatu", "city": "Palmerston North", "values": [55.0, 67.8, 51.8, 65.9, 71.5, 95.1, 82.5, 76.9, 86.1, 96.4, 80.9, 87.5], "total": 919.9},
      {"region": "manawatu", "city": "Masterton", "values": [44.4, 68.9, 84.5, 54.0, 93.6, 105.3, 90.9, 86.7, 73.7, 77.2, 77.5, 70.9], "total": 922.9},
      {"region": "wellington", "city": "Wellington", "values": [75.7, 69.8, 87.1, 83.6, 112.9, 132.8, 137.5, 113.7, 97.8, 114.9, 97.0, 84.4], "total": 1215.4},
      {"region": "nelson", "city": "Nelson", "values": [76.5, 63.5, 70.8, 80.9, 82.0, 92.7, 77.6, 81.9, 85.1, 87.2, 78.3, 83.6], "total": 950.7},
      {"region": "marlborough", "city": "Blenheim", "values": [48.9, 49.4, 46.5, 52.7, 60.6, 70.7, 74.3, 62.2, 65.2, 67.4, 55.0, 58.1], "total": 720.1},
      {"region": "westcoast", "city": "Westport", "values": [178.2, 128.9, 158.9, 156.7, 174.2, 212.5, 167.6, 185.0, 187.4, 200.3, 169.0, 203.0], "total": 2154.4},
      {"region": "canterbury", "city": "Kaikoura", "values": [46.0, 46.8, 62.6, 51.8, 56.9, 75.9, 100.6, 56.5, 50.1, 62.7, 55.5, 44.6], "total": 695.9},
      {"region": "westcoast", "city": "Hokitika", "values": [248.3, 189.0, 215.8, 231.5, 236.8, 273.5, 218.0, 230.8, 260.1, 275.1, 225.3, 297.0], "total": 2901.4},
      {"region": "canterbury", "city": "Christchurch", "values": [38.3, 42.3, 44.8, 46.2, 63.7, 60.9, 68.4, 64.4, 41.1, 52.8, 45.8, 49.5], "total": 618.2},
      {"region": "canterbury", "city": "Lake Tekapo", "values": [43.6, 35.9, 48.8, 45.2, 56.5, 60.0, 49.6, 58.4, 50.4, 49.5, 41.3, 52.2], "total": 591.6},
      {"region": "canterbury", "city": "Timaru", "values": [46.5, 51.7, 47.6, 38.7, 46.6, 38.8, 46.2, 43.8, 36.5, 49.5, 49.6, 52.8], "total": 546.8},
      {"region": "otago", "city": "Milford Sound", "values": [722.0, 454.7, 595.1, 533.2, 596.6, 487.1, 423.7, 463.5, 551.4, 640.3, 548.0, 700.1], "total": 6715.4},
      {"region": "otago", "city": "Queenstown", "values": [64.7, 50.3, 53.4, 56.2, 68.5, 71.5, 50.3, 66.2, 62.4, 66.4, 63.6, 75.3], "total": 741.4},
      {"region": "otago", "city": "Alexandra", "values": [50.1, 32.8, 29.0, 22.0, 27.4, 31.6, 24.2, 17.6, 20.9, 28.7, 30.6, 44.5], "total": 335.3},
      {"region": "southland", "city": "Manapouri", "values": [85.4, 84.3, 86.5, 90.0, 100.9, 101.8, 82.0, 93.9, 100.0, 107.7, 91.1, 105.1], "total": 1092.2},
      {"region": "otago", "city": "Dunedin", "values": [72.9, 67.8, 64.0, 50.9, 64.7, 57.9, 57.1, 55.7, 48.3, 61.7, 56.4, 80.2], "total": 726.2},
      {"region": "southland", "city": "Invercargill", "values": [115.0, 87.1, 97.4, 95.9, 114.4, 104.0, 85.2, 75.6, 84.2, 95.0, 90.4, 105.0], "total": 1146.6},
      {"region": "southland", "city": "Chatham Islands", "values": [54.9, 63.9, 84.7, 75.7, 87.9, 107.8, 84.7, 84.4, 71.1, 63.4, 66.7, 66.3], "total": 898.9}
    ]

    render: ->
      this.$el.show('slow')
      this.$el.html( _.template(RailFallTemplate) )

      @new_zealand = new NewZealandView()
      @new_zealand.render()

      @city_line_chart_view = new CityLineChartView()
      @city_line_chart_view.render(@rain_fall, "mm of Rain per Month", [0, 300])

      for region of @new_zealand.nz
        ((path, region, view) =>
          path
            .on("click", -> 
              view.city_line_chart_view.re_render_data(region)
            )
        ) @new_zealand.nz[region], region, @

      @

  RailFallView