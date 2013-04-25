define ["backbone", "views/base", "views/home", "views/page", "views/credits", "data/story", "views/ufo", "views/clouds"], (Backbone, BaseView, HomeView, PageView, CreditsView, Story, UfoView, CloudView) ->
  AppRouter = Backbone.Router.extend
    routes:
      "": "renderHome"
      "home": "renderHome"
      "ufo": "renderUfo"
      "cloud": "renderCloud"
      "page/:page": "renderPage"
      "credits": "renderCredits"

    initialize: ->
      @initializeBaseView()

    initializeBaseView: ->
      base_view = new BaseView()
      base_view.initialize()

    renderHome: (actions) ->
      home_view = new HomeView()
      home_view.render()

    renderUfo: (actions) ->
      ufo_view = new UfoView()
      ufo_view.render()

    renderCloud: (actions) ->
      ufo_view = new CloudView()
      ufo_view.render()

    renderPage: (page) ->
      page = Number(page)
      page_model = new Backbone.Model(Story.get('pages')[page - 1])
      page_view = new PageView
        model: page_model
      page_view.render()

    renderCredits: ->
      credits_view = new CreditsView()
      credits_view.render()
      return

  return AppRouter