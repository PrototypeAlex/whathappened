define ['backbone'], (Backbone) ->
  PageView = Backbone.View.extend
    el: $('.hero-unit')

    initialize: ->
      _.bindAll @
      @$el = $(@el)
      return

    template: _.template """
      <div id="words">
        <%= content %>
        <% if(last_page){ %>
          <a href="<%= next_page_url %>">credits</a>
        <% }else{ %>
          <a href="<%= next_page_url %>">next page</a>
        <% } %>
      </div>
      <div id="pictures"></div>
    """

    render: ->
      @$el.html @template @model.toJSON()
      _.each @model.get('images'), (img) =>
        @$('#pictures').append "<img src=\"#{img.src}\" />"
        return
      _.each @model.get('data_points'), (point) =>
        $point = $ "<a class=\"data-marker\" href=\"#\" data-id=\"#{point.id}\"></a>"
        $point.css
          left: point.left
          top: point.top
        @$('#pictures').append $point
        return

  PageView