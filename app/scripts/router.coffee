define ["backbone", "views/base", "views/home", "views/page", "views/credits", "data/story", "views/ufo", "views/clouds", "views/wet_days"], (Backbone, BaseView, HomeView, PageView, CreditsView, Story, UfoView, CloudView, WetDaysView) ->
  AppRouter = Backbone.Router.extend
    routes:
      "": "renderHome"
      "home": "renderHome"
      "ufo": "renderUfo"
      "clouds": "renderCloud"
      "wet_days": "renderWetDays"
      "page/:page": "renderPage"
      "credits": "renderCredits"

    initialize: ->
      @initializeBaseView()

    initializeBaseView: ->
      base_view = new BaseView()
      base_view.initialize()

    renderHome: (actions) ->
      @previousPage.remove() if @previousPage?
      
      home_view = new HomeView()
      home_view.render()
      $('body').append home_view.el

      @previousPage = home_view

    renderUfo: (actions) ->
      ufo_view = new UfoView()
      ufo_view.render()

    renderCloud: (actions) ->
      cloud_view = new CloudView()
      cloud_view.render()

    renderWetDays: (actions) ->
      wet_days_view = new WetDaysView()
      wet_days_view.render()

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