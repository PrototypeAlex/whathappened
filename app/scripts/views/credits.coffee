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

		<p class="cc">
			<a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/deed.en_US"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">What Happened</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/deed.en_US">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.
		</p>

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
				elements.push @$('p.cc')

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