define ["backbone", "router", "jquery_mobile_config", "jquery_mobile", "jquery_touch_swipe", "tweenmax", "modernizr"], (Backbone, Router) ->
  initialize = ->
    router = new Router()

    Backbone.history.start()

  initialize: initialize