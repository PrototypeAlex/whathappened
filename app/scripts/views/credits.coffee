define ['backbone'], (Backbone) ->
	CreditsView = Backbone.View.extend

		initialize: ->
			_.bindAll @
			@$el = $(@el)
			return

		template: _.template """
		<div id="credits">
		<h1>the end.</h1>
		<br />
		<p>
		<span class="line"><span class="thing">Story:</span> Sadaf Lourie</span>
		<span class="line"><span class="thing">Illustration:</span> <a href="http://cargocollective.com/riccardodesign" target="_blank">Riccardo Scott</a></span>
		<span class="line"><span class="thing">Design/Dev:</span> <a href="http://jarredbishop.info" target="_blank">Jarred Bishop</a></span>
		<span class="line"><span class="thing">Data/Dev:</span> <a href="http://prototypealex.com" target="_blank">Alex Gibson</a></span>
		</p>
		<a href="/" class="btn">start again?<span class="glare"></span></a>
	<p class="mix-mash">A Mix&Mash entry.</p>
		</div>
		<a href="/#/page/6" class="pagination arrow left"><span class="icon-left-open"></span></a>
		"""

		render: ->
			@$el.html @template {}
			@animateIn()

		animateIn: ->
				elements = [
						@$('h1')
				]
				_.each @$('.line'), (el) =>
					elements.push el

				elements.push @$('.btn')
				elements.push @$('.mix-mash')
				elements.push @$('.arrow')

				_.each elements, (el, index) =>
					$el = $(el)
					$el.css
						opacity: 0
					TweenMax.to $el, .4, 
						opacity: 1
						delay: index * .2
						ease: Quint.easeOut
					return
				return


	CreditsView