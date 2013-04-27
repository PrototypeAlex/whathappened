define ['backbone', 'text!../../../templates/clouds.html', "views/visualisations/new_zealand", "views/visualisations/city_line_chart"], (Backbone, CloudTemplate, NewZealandView, CityLineChartView) ->
  CloudView = Backbone.View.extend

    el: $('#js-visualisation-container')
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    sunshine_hours: [
      {"region": "northland", "city": "Kaitaia", "values": [223.5, 201.7, 201.1, 160.6, 143.0, 126.8, 138.6, 161.8, 165.3, 190.7, 192.7, 209.9], "total": 2108.1},
      {"region": "auckland", "city": "Auckland", "values": [228.8, 194.9, 189.2, 157.3, 139.8, 110.3, 128.1, 142.9, 148.6, 178.1, 188.1, 197.2], "total": 2007.5},
      {"region": "bayofplenty", "city": "Tauranga", "values": [261.5, 217.3, 214.0, 183.9, 165.3, 135.4, 151.0, 173.4, 174.1, 212.7, 224.2, 232.7], "total": 2345.5},
      {"region": "waikato", "city": "Hamilton", "values": [229.8, 192.9, 193.3, 165.1, 138.3, 112.8, 126.4, 144.1, 147.5, 174.8, 187.1, 207.6], "total": 2018.4},
      {"region": "bayofplenty", "city": "Rotorua", "values": [242.9, 205.9, 199.7, 170.5, 145.1, 119.1, 130.7, 152.1, 155.1, 190.8, 200.1, 215.8], "total": 2132.9},
      {"region": "eastcape", "city": "Gisborne", "values": [249.9, 200.7, 190.7, 164.9, 145.6, 128.6, 124.1, 163.3, 180.7, 219.4, 217.5, 232.4], "total": 2225.7},
      {"region": "waikato", "city": "Taupo", "values": [224.3, 202.6, 179.7, 156.3, 126.3, 96.1, 116.5, 134.6, 140.0, 179.6, 190.4, 204.6], "total": 1947.2},
      {"region": "taranaki", "city": "New Plymouth", "values": [248.4, 225.0, 212.8, 177.8, 143.9, 118.1, 138.0, 162.7, 162.6, 189.6, 206.9, 211.6], "total": 2202.6},
      {"region": "hawkesbay", "city": "Napier", "values": [249.3, 202.6, 201.7, 172.4, 155.6, 130.7, 134.7, 166.8, 181.2, 213.9, 216.2, 233.7], "total": 2251.5},
      {"region": "manawatu", "city": "Wanganui", "values": [250.2, 213.5, 192.1, 159.4, 129.0, 99.2, 120.7, 137.8, 147.5, 180.1, 203.6, 221.9], "total": 2074.6},
      {"region": "manawatu", "city": "Palmerston North", "values": [212.4, 191.0, 173.5, 145.6, 109.3, 79.1, 103.8, 119.9, 124.2, 142.6, 165.3, 176.7], "total": 1732.6},
      {"region": "manawatu", "city": "Masterton", "values": [238.6, 204.4, 169.2, 155.6, 132.0, 99.9, 114.9, 128.6, 148.0, 184.0, 185.6, 221.3], "total": 1964.2},
      {"region": "wellington", "city": "Wellington", "values": [246.9, 210.9, 205.2, 161.3, 132.7, 99.1, 118.9, 147.3, 163.2, 192.8, 209.3, 222.8], "total": 2110.3},
      {"region": "nelson", "city": "Nelson", "values": [267.5, 231.4, 230.4, 196.2, 175.7, 143.3, 159.0, 182.2, 189.3, 221.4, 234.9, 241.1], "total": 2477.3},
      {"region": "marlborough", "city": "Blenheim", "values": [262.2, 223.7, 230.8, 193.7, 172.7, 151.6, 157.1, 183.9, 189.5, 226.7, 234.7, 248.8], "total": 2487.3},
      {"region": "westcoast", "city": "Westport", "values": [213.0, 174.9, 164.2, 151.5, 114.7, 93.4, 120.7, 118.6, 138.9, 158.4, 171.7, 179.4], "total": 1791.0},
      {"region": "canterbury", "city": "Kaikoura", "values": [247.8, 193.8, 183.8, 173.3, 145.8, 118.8, 136.9, 155.7, 175.9, 194.2, 198.7, 212.4], "total": 2142.2},
      {"region": "westcoast", "city": "Hokitika", "values": [219.5, 187.4, 177.3, 146.7, 119.1, 98.7, 126.1, 136.7, 141.0, 167.8, 184.0, 189.4], "total": 1893.8},
      {"region": "canterbury", "city": "Christchurch", "values": [237.9, 195.0, 191.2, 162.6, 140.8, 117.1, 127.1, 153.9, 169.5, 203.8, 223.7, 219.9], "total": 2143.9},
      {"region": "canterbury", "city": "Mt Cook", "values": [184.8, 167.2, 151.1, 125.3, 92.1, 66.1, 74.5, 113.0, 130.3, 149.4, 158.5, 168.7], "total": 1569.5},
      {"region": "canterbury", "city": "Lake Tekapo", "values": [253.8, 220.9, 230.9, 199.4, 145.4, 139.9, 149.7, 170.1, 200.0, 231.7, 241.5, 234.0], "total": 2401.9},
      {"region": "canterbury", "city": "Timaru", "values": [192.7, 170.2, 168.6, 158.0, 130.1, 121.0, 131.0, 151.5, 156.5, 183.4, 189.0, 179.7], "total": 1923.3},
      {"region": "otago", "city": "Queenstown", "values": [230.3, 207.3, 187.0, 145.4, 87.8, 71.8, 88.3, 120.0, 153.6, 197.7, 216.6, 223.5], "total": 1929.7},
      {"region": "otago", "city": "Alexandra", "values": [231.4, 199.8, 193.7, 158.2, 121.2, 87.1, 90.7, 135.9, 164.7, 193.9, 214.1, 215.0], "total": 1977.9},
      {"region": "southland", "city": "Te Anau", "values": [184.2, 178.5, 152.9, 125.3, 84.8, 64.9, 66.0, 115.6, 138.4, 178.6, 192.3, 180.1], "total": 1635.5},
      {"region": "otago", "city": "Dunedin", "values": [179.6, 158.0, 146.1, 125.9, 108.4, 95.3, 110.6, 122.2, 136.8, 165.5, 166.9, 168.3], "total": 1679.5},
      {"region": "southland", "city": "Invercargill", "values": [185.9, 167.2, 142.6, 117.2, 87.5, 78.7, 97.9, 123.0, 139.8, 173.0, 181.3, 188.2], "total": 1689.9},
      {"region": "southland", "city": "Chatham Islands", "values": [191.3, 145.5, 124.2, 106.3, 81.2, 61.8, 74.4, 101.0, 109.1, 129.7, 148.9, 164.0], "total": 1437.1}] 

    render: ->
      this.$el.show('slow')
      this.$el.html( _.template(CloudTemplate) )

      @new_zealand = new NewZealandView()
      @new_zealand.render()

      @city_line_chart_view = new CityLineChartView()
      @city_line_chart_view.render(@sunshine_hours, "Hours of Sunshine per Month", [40,260])

      for region of @new_zealand.nz
        ((path, region, view) =>
          path
            .on("click", -> 
              view.city_line_chart_view.re_render_data(region)
            )
        ) @new_zealand.nz[region], region, @

      @

  CloudView