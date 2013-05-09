define ["backbone", "router", "jquery_touch_swipe", "jquery_mobile_config", "jquery_mobile", "tweenmax"], (Backbone, Router) ->
  initialize = ->
    router = new Router()

    Backbone.history.start()

  initialize: initialize