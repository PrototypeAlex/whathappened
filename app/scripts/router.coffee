define ["backbone", "views/base", "views/home"], (Backbone, BaseView, HomeView) ->
  AppRouter = Backbone.Router.extend
    routes:
      "": "renderHome"
      "home": "renderHome"

    initialize: ->
      @initializeBaseView()

    initializeBaseView: ->
      base_view = new BaseView()
      base_view.initialize()

    renderHome: (actions) ->
      home_view = new HomeView()
      home_view.render()

  return AppRouter