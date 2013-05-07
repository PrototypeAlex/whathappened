define ['backbone', 'text!../../templates/home.html'], (Backbone, homeTemplate) ->
  HomeView = Backbone.View.extend

    render: ->
      this.$el.html( _.template(homeTemplate) )
      @animateIn()

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