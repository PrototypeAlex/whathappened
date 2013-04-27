define ["backbone", "views/base", "views/home", "views/page", "views/credits", "data/story", "views/visualisations/base"], (Backbone, BaseView, HomeView, PageView, CreditsView, Story, VisualisationView) ->
  AppRouter = Backbone.Router.extend
    routes:
      "": "renderHome"
      "home": "renderHome"
      "page/:page": "renderPage"
      "credits": "renderCredits"

      "ufo_sightings": "renderUfoSightings"
      "sunshine_hours": "renderSunshineHours"
      "wet_days": "renderWetDays"
      "rain_fall": "renderRainFall"
      "meteor_shower": "renderMeteorShower"

    initialize: ->
      @initializeBaseView()
      @visualisations = new VisualisationView()

    initializeBaseView: ->
      base_view = new BaseView()
      base_view.initialize()

    renderHome: (actions) ->
      @previousPage.remove() if @previousPage?
      
      home_view = new HomeView()
      home_view.render()
      $('body').append home_view.el

      @previousPage = home_view

    renderUfoSightings: ->
      @visualisations.render_ufo_sightings()

    renderSunshineHours: ->
      @visualisations.render_sunshine_hours()

    renderWetDays: ->
      @visualisations.render_wet_days()

    renderRainFall: ->
      @visualisations.render_rain_fall()

    renderMeteorShower: ->
      @visualisations.render_meteor_shower()

    renderPage: (page) ->
      @previousPage.remove() if @previousPage?

      page = Number(page)
      page_model = new Backbone.Model(Story.get('pages')[page - 1])
      page_view = new PageView
        model: page_model
      $('body').append page_view.el
      page_view.render()

      @previousPage = page_view

    renderCredits: ->
      @previousPage.remove() if @previousPage?

      credits_view = new CreditsView()
      $('body').append credits_view.el
      credits_view.render()

      @previousPage = credits_view
      return

  return AppRouter