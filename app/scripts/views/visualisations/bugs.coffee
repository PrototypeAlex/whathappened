define ['backbone', 'text!../../../templates/bugs.html'], (Backbone, BugTemplate) ->
  BugView = Backbone.View.extend

    el: '#js-visualisation-container'
    template: _.template(BugTemplate)

    initialize: (options) ->
      @parentView = options.parentView

    render: ->
      @$el.html( @template )

  BugView