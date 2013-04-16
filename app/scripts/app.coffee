define ["backbone", "router"], (Backbone, Router) ->
  initialize = ->
    router = new Router()
    router.initialize()
    Backbone.history.start()

  initialize: initialize