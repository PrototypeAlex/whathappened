define ['backbone', 'text!../../templates/home.html'], (Backbone, homeTemplate) ->
  HomeView = Backbone.View.extend

    events:
      'click .data-marker': 'openHelp'
      'click .close': 'close'
      'click .bg': 'close'

    render: ->
      this.$el.html( _.template(homeTemplate) )
      @animateIn()

    openHelp: (e) ->
      $('#info').removeClass('hidden')
      @animateInHelp()
      return

    animateInHelp: ->
      $('#info .bg').css
          opacity: 0
      TweenMax.to $('#info .bg'), .2, 
          opacity: 0.94
  
      $('#info .document').css
          top: "140px"
          opacity: 0
      TweenMax.to $('#info .document'), .2
          top: 100
          opacity: 1
          ease: Quint.easeOut
          delay: .3
      return

    close: (e) ->
      # @vizualisation_view.remove()
      # 
      TweenMax.to $('#info .document'), .2,
          top: 140
          opacity: 0
          ease: Quint.easeIn

      TweenMax.to $('#info .bg'), .2,
          opacity: 0
          delay: .3
          onComplete: () =>
              @animationOutComplete()
              return
      return

    animationOutComplete: ->
      $('#info').addClass('hidden')
      return
  
    animateIn: ->
    	elements = [
    		@$('h1')
    		@$('.olive')
    		@$('p')
    		@$('.btn')
    	]

    	_.each elements, ($el, index) =>
    	  $el.css
    	    opacity: 0
    	  TweenMax.to $el, .2, 
    	    opacity: 1
    	    delay: index * .1
    	    ease: Quint.easeOut
    	  return
    	return

  HomeView