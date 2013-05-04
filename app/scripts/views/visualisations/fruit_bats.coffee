define ['backbone', 'text!../../../templates/fruit_bats.html'], (Backbone, FruitBatTemplate) ->
  FruitBatView = Backbone.View.extend

    el: '#js-visualisation-container'
    template: _.template(FruitBatTemplate)

    initialize: (options) ->
      @parentView = options.parentView

    render: ->
      @$el.html( @template )

  FruitBatView