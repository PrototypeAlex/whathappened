define ['backbone'], (Backbone) ->
	InfographicView = Backbone.View.extend

		events:
			're-init': 'reInitialize'

		wait: .5

		initialize: ->
			_.bindAll @
			_.each @$('.number'), @setupNumber

			_.each @$('.gold-star'), (el) =>
				$el = $(el)
				$el.css
					opacity: 0
				TweenMax.to $el, .5, {opacity: 1, delay: .8, scale: 1.1, ease: Elastic.easeOut}


		setupNumber: (el) ->
			$el = $(el)
			number = $el.text()
			digits = number.split("")
			$el.html ""
			_.each digits, (digit, index) =>
				$digit = $ "<span class=\"digit\"><span class=\"value\">#{digit}</span><div class=\"glare\"></div></span>"
				$el.append $digit
				$digit.find('.value').css
					opacity: 0
					top: 20
				TweenMax.to($digit.find('.value'), .7, {top: 0, opacity:1, ease: Elastic.easeOut, delay: @wait + index * .2})
				return

		reInitialize: ->
			@wait = 0
			_.each @$('.number'), @setupNumber
			return

	InfographicView