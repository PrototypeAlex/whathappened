define ['backbone'], (Backbone) ->
  InfographicView = Backbone.View.extend

  	initialize: ->
  		_.bindAll @
  		_.each @$('.number'), @setupNumber

  	setupNumber: (el) ->
  		console.log el
  		$el = $(el)
  		number = $el.text()
  		digits = number.split("")
  		$el.html ""
  		_.each digits, (digit) =>
  			$el.append "<span class=\"digit\">#{digit}<div class=\"glare\"></div></span>"
  		return

  InfographicView