define ['backbone'], (Backbone) ->
  CreditsView = Backbone.View.extend
    el: $('.hero-unit')

    initialize: ->
    	_.bindAll @
    	@$el = $(@el)
    	return

    render: ->
      @$el.html "the end... <a href=\"#/\">start again?</a>"

  CreditsView