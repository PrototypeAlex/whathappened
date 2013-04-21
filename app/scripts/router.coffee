define ["backbone", "views/base", "views/home", "views/ufo"], (Backbone, BaseView, HomeView, UfoView) ->
  AppRouter = Backbone.Router.extend
    routes:
      "": "renderHome"
      "home": "renderHome"
      "ufo": "renderUfo"

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

  return AppRouter