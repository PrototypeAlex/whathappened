define ['backbone', 'text!../../templates/clouds.html', 'd3'], (Backbone, cloudsTemplate, d3) ->
  CloudView = Backbone.View.extend

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
      {'region': 'southland', 'city': 'Alexandra', 'values': [6.7,5.2,4.9,4.0,6.9,5.8,4.3,4.4,5.4,5.5,4.8,7.7], 'total': 64.7},
      {'region': 'southland', 'city': 'Manapouri', 'values': [9.1,7.9,9.7,10.5,11.6,12.9,10.4,11.8,12.4,12.2,10.3,11.9], 'total': 125.9},
      {'region': 'southland', 'city': 'Dunedin', 'values': [9.7,8.5,8.9,8.3,9.8,9.4,9.3,9.6,8.7,10.1,10.0,12.0], 'total': 113.8},
      {'region': 'southland', 'city': 'Invercargill', 'values': [13.0,10.3,12.3,12.3,15.3,15.6,14.2,12.8,13.1,13.8,13.3,14.3], 'total': 161.0},
      {'region': 'southland', 'city': 'Chatham Islands', 'values': [7.9,7.7,11.3,11.1,14.4,16.0,14.8,14.5,11.9,11.2,9.8,9.4], 'total': 138.5}] 

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
      this.$el.html( _.template(ufoTemplate) )

  CloudView