define ['backbone', 'views/info'], (Backbone, InfoView) ->
  PageView = Backbone.View.extend

    className: 'page'

    events:
      'click .data-marker': 'openData'
      'click .close': 'closeData'
      'click .bg': 'closeData'

    info_view: null
    debug: true

    initialize: ->
      _.bindAll @
      @$el = $(@el)

    template: _.template """
      <h1 class="what-happened-title">what happened?</h1>
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
      <a href="<%= previous_page_url %>" class="pagination arrow left"><span class="icon-left-open"></span></a>
      <a href="<%= next_page_url %>" class="pagination arrow right"><span class="icon-right-open"></span></a>
      <div id="info" class="hidden">
        <div class="bg"></div>
        <div class="document">
            <a href="#" class="close"><div class="circular-glare"></div></a>
            <div class="corner"></div>
            <div class="content" id="js-visualisation-container"></div>
        </div>
      </div>
    """

    render: ->
      @$el.html @template @model.toJSON()
      @$picture = @$('.picture');
      @$frame = @$('.picture .frame');
      $(window).bind 'resize', @onResize
      @onResize()

      # add image
      @img = new Image()
      @img.onload = @imageLoaded
      @img.src = @model.get('images')[0].src
      @$img = $(@img)
      @$img.addClass 'loading'
      @$('.frame').append @img

      @info_view = new InfoView()

      # add markers

      _.each @model.get('data_points'), (point) =>
        el = "<div class=\"data-marker\" data-id=\"#{point.id}\" style=\"left: #{point.left}; top: #{point.top};\">+<div class=\"glare\"></div></div>"
        @$frame.append el
        console.log el


    openData: (e) ->
      $marker = $(e.target)
      if !$marker.hasClass 'data-marker'
        $marker = $marker.parents('.data-marker')
      id = $marker.attr('data-id')
      @info_view.render(id)

      return

    closeData: (e) ->
      e.preventDefault()
      @info_view.close()
      @$('#story').removeClass 'hidden'

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