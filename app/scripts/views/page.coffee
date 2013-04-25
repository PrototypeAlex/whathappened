define ['backbone'], (Backbone) ->
  PageView = Backbone.View.extend
    el: $('.hero-unit')

    events:
      'click .data-marker': 'openData'
      'click .close': 'closeData'

    initialize: ->
      _.bindAll @
      @$el = $(@el)
      return

    template: _.template """
      <div id="left">
        <div id="story" class="content">
          <%= content %>
          <% if(last_page){ %>
            <a class="btn" href="<%= next_page_url %>">credits<span class="glare"></span></a>
          <% }else{ %>
            <a class="btn" href="<%= next_page_url %>">next page<span class="glare"></span></a>
          <% } %>
        </div>
        <div id="js-visualisation-container" class="hidden">
          <a href="#" class="close">&times;</a>
          <div class="content"><p>vis content...</p></div>
        </div>
      </div>
      <div id="pictures"></div>
    """

    render: ->
      @$el.html @template @model.toJSON()
      _.each @model.get('images'), (img) =>
        @$('#pictures').append "<img src=\"#{img.src}\" />"
        
      _.each @model.get('data_points'), (point) =>
        $point = $ "<a class=\"data-marker\" href=\"#\" data-id=\"#{point.id}\"></a>"
        $point.css
          left: point.left
          top: point.top
        @$('#pictures').append $point
      $(window).bind 'resize', @onResize
      @onResize()


    openData: (e) ->
      $marker = $(e.target)
      id = Number $marker.attr('id')
      e.preventDefault()
      @$('#story').addClass 'hidden'
      @$('#js-visualisation-container').removeClass 'hidden'
      $marker.addClass 'open'

      _.each @$('.data-marker'), (el, index) =>
        $el = $(el)
        if !$el.hasClass("open")
          $el.addClass 'not-me-open'
        return
      return

    closeData: (e) ->
      e.preventDefault()
      @$('#story').removeClass 'hidden'
      @$('#js-visualisation-container').addClass 'hidden'
      _.each @$('.data-marker'), (el) =>
        $el = $(el)
        $el.removeClass 'open'
        $el.removeClass 'not-me-open'
      return

    onResize: (e) ->
      h = $(window).height()
      @$("#pictures").css
        width: "#{h}px"
      w = $(window).width()
      @$("#left").css
        width: "#{w - h}px"
      return

  PageView