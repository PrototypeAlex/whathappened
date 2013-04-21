define ["backbone", "views/base", "views/home", "views/page", "views/credits", "data/story"], (Backbone, BaseView, HomeView, PageView, CreditsView, Story) ->
  AppRouter = Backbone.Router.extend
    routes:
      "": "renderHome"
      "home": "renderHome"
      "page/:page": "renderPage"
      "credits": "renderCredits"

    initialize: ->
      console.log Story
      @initializeBaseView()

    initializeBaseView: ->
      base_view = new BaseView()
      base_view.initialize()

    renderHome: (actions) ->
      home_view = new HomeView()
      home_view.render()

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