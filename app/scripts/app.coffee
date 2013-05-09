define ["backbone", "router", "jquery_mobile_config", "jquery_mobile"], (Backbone, Router) ->
  initialize = ->
    router = new Router()

    Backbone.history.start()

  initialize: initialize