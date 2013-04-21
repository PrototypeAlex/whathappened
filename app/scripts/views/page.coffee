define ['backbone'], (Backbone) ->
  PageView = Backbone.View.extend
    el: $('.hero-unit')

    initialize: ->
    	_.bindAll @
    	@$el = $(@el)
    	return

    template: _.template """
    	<%= content %>
    	<% if(last_page){ %>
	    	<a href="<%= next_page_url %>">credits</a>
    	<% }else{ %>
	    	<a href="<%= next_page_url %>">next page</a>
    	<% } %>

    """

    render: ->
      @$el.html @template @model.toJSON()

  PageView