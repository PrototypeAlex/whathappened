define ['backbone', 'views/visualisations/clouds', 'views/visualisations/ufo_sightings', 'views/visualisations/wet_days', 'views/visualisations/rain_fall', 'views/visualisations/meteor_shower'], (Backbone, CloudView, UfoView, WetDaysView, RainFallView, MeteorShowerView) ->
  BaseView = Backbone.View.extend

    render_sunshine_hours: ->
      cloud_view = new CloudView()
      cloud_view.render()

    render_ufo_sightings: ->
      ufo_view = new UfoView()
      ufo_view.render()

    render_wet_days: ->
      wet_days_view = new WetDaysView()
      wet_days_view.render()

    render_rain_fall: ->
      rain_fall_view = new RainFallView()
      rain_fall_view.render()

    render_meteor_shower: ->
      meteor_shower_view = new MeteorShowerView()
      meteor_shower_view.render()

