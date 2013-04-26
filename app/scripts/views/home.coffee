define ['backbone', 'text!../../templates/home.html'], (Backbone, homeTemplate) ->
  HomeView = Backbone.View.extend
    el: $('.page')

    render: ->
      this.$el.html( _.template(homeTemplate) )

  HomeView