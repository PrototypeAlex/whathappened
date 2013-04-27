define ['backbone', 'text!../../../templates/meteor_shower.html', 'd3'], (Backbone, MeteorShowerTemplate, d3) ->
  MeteorView = Backbone.View.extend

    el: $('#js-visualisation-container')

    render: ->
      this.$el.show('slow')
      this.$el.html( _.template(MeteorShowerTemplate) )
      @get_meteor_data()
      @


    get_meteor_data: ->
      callback = (data) ->
        console.log data
        console.log data.table.rows[0]
      queryurl = "https://www.google.com/fusiontables/api/query?sql=select+*+from+1hrTPrwR5piW7e9U-LNGmcRKRDUWCwhAaqiN_yrU"
      querytail = "&jsonCallback=?"
      jqxhr = $.get(queryurl + querytail, callback, "jsonp")



  MeteorView