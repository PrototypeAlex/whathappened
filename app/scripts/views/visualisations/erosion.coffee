define ['backbone', 'text!../../../templates/erosion.html'], (Backbone, ErosionTemplate) ->
  ErosionView = Backbone.View.extend

    el: '#js-visualisation-container'
    template: _.template(ErosionTemplate)

    initialize: (options) ->
      @parentView = options.parentView

    render: ->
      @$el.html( @template )

  ErosionView