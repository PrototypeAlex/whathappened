define ['backbone'], (Backbone) ->
	InfographicView = Backbone.View.extend

		initialize: ->
			_.bindAll @
			_.each @$('.number'), @setupNumber
			# @animateIn()

		setupNumber: (el) ->
			$el = $(el)
			number = $el.text()
			digits = number.split("")
			$el.html ""
			_.each digits, (digit, index) =>
				$digit = $ "<span class=\"digit\"><span class=\"value\">#{digit}</span><div class=\"glare\"></div></span>"
				$el.append $digit
				TweenMax.to($digit.find('.value'), .7, {top: 0, ease: Elastic.easeOut, delay: .5 + index * .2})

	InfographicView