define ['backbone', 'views/info'], (Backbone, InfoView) ->
  PageView = Backbone.View.extend

    className: 'page'

    events:
      'click .data-marker': 'openData'
      'click .close': 'closeData'

    className: 'page'

    initialize: ->
      _.bindAll @
      @$el = $(@el)

    template: _.template """
      <div class="picture">
        <div class="frame">
          <div class="preloader">
            <div class="spinner">
              <i class="icon-cw-circled animate-spin"></i>
              <span class="circular-glare"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="words">
        <%= content %>
      </div>
      <div id="left">
        <div id="js-visualisation-container" class="hidden">
          <a href="#" class="close">&times;</a>
          <div class="content"><p>vis content...</p></div>
        </div>
      </div>
      <a href="<%= previous_page_url %>" class="pagination arrow left"><span class="icon-left-open"></span></a>
      <a href="<%= next_page_url %>" class="pagination arrow right"><span class="icon-right-open"></span></a>
    """

    render: ->
      @$el.html @template @model.toJSON()
      @$picture = @$('.picture');
      @$frame = @$('.picture .frame');
      $(window).bind 'resize', @onResize

      @img = new Image()
      @img.onload = @imageLoaded
      @img.src = @model.get('images')[0].src
      @$img = $(@img)
      @$img.addClass 'loading'
      @$('.frame').append @img
      @onResize()

    openData: (e) ->
      $marker = $(e.target)
      id = $marker.attr('data-id')
      console.log id
      e.preventDefault()
      iv = new InfoView
        story: @story
        viz_id: id
      $('body').append iv.el
      return
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
      if @$picture.width() > @$picture.height()
        max = @$picture.height()
      else
        max = @$picture.width()
      @$frame.css
        width: "#{max}px"
        height: "#{max}px"
        marginLeft: "#{ 0 - (max / 2)}px"
        marginTop: "#{ 0 - (max / 2)}px"
      return

    imageLoaded: ->
      @$('.picture .preloader').addClass 'hidden'
      @$img.removeClass 'loading'
      return

  PageView