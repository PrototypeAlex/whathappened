define ['backbone', 'views/visualisations/clouds', 'views/visualisations/ufo_sightings', 'views/visualisations/wet_days', 'views/visualisations/rain_fall', 'views/visualisations/meteor_shower', 'views/visualisations/erosion', 'views/visualisations/fruit_bats', 'views/visualisations/bugs'], (Backbone, CloudView, UfoView, WetDaysView, RainFallView, MeteorShowerView, ErosionView, FruitBatView, BugView) ->
  BaseView = Backbone.View.extend

    render_sunshine_hours: ->
      @cloud_view = new CloudView({parentView: @})
      @cloud_view.render()
      @cloud_view

    render_ufo_sightings: ->
      @ufo_view = new UfoView({parentView: @})
      @ufo_view.render()
      @ufo_view

    render_wet_days: ->
      @wet_days_view = new WetDaysView({parentView: @})
      @wet_days_view.render()
      @wet_days_view

    render_rain_fall: ->
      @rain_fall_view = new RainFallView({parentView: @})
      @rain_fall_view.render()
      @rain_fall_view

    render_meteor_shower: ->
      @meteor_shower_view = new MeteorShowerView({parentView: @})
      @meteor_shower_view.render()
      @meteor_shower_view

    render_bugs: ->
      @bug_view = new BugView({parentView: @})
      @bug_view.render()
      @bug_view

    render_fruit_bats: ->
      @fruit_bat_view = new FruitBatView({parentView: @})
      @fruit_bat_view.render()
      @fruit_bat_view

    render_erosion: ->
      @render_erosion = new ErosionView({parentView: @})
      @render_erosion.render()
      @render_erosion

    close: ->
      $('#js-visualisation-container').html("")