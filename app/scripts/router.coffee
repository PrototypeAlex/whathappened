define ["backbone", "views/home", "views/page", "views/credits", "data/story"], (Backbone, HomeView, PageView, CreditsView, Story) ->
  AppRouter = Backbone.Router.extend
    routes:
      "": "renderHome"
      "home": "renderHome"
      "page/:page": "renderPage"
      "credits": "renderCredits"

    initialize: ->
      if Modernizr.touch
        $('body').swipe({
          swipe: (event, direction, distance, duration, fingerCount) =>
            if direction == 'left' && fingerCount == 2
              @navigate_right(event)
            else if direction == 'right' && fingerCount == 2
              @navigate_left(event)
          ,
          excludedElements: "button, input, select, textarea, a, .noSwipe, .data-marker, svg, .glare, .city-legend, .document",
          fingers:"all",
          allowPageScroll: 'auto'
        })

      $('body').on('keydown', (e) => @arrowNavigation(e))

    arrowNavigation: (e) ->
      if e.keyCode == 37
        @navigate_left(e)
      else if e.keyCode == 39
        @navigate_right(e)

    navigate_left: (e) ->
      if @current_page > 0
        @current_page = (@current_page - 1)
        
        if @current_page == 0
          this.navigate("/", {trigger: true})
        else
          this.navigate(("/page/" + @current_page), {trigger: true})

    navigate_right: (e) ->
      if @current_page < 7
        @current_page = (@current_page + 1)
        if @current_page == 7
          this.navigate("/credits", {trigger: true})
        else
          this.navigate(("/page/" + @current_page), {trigger: true})


    renderHome: (actions) ->
      @current_page = 0

      @previousPage?.remove()
      
      home_view = new HomeView()
      home_view.render()
      $('body').append home_view.el

      @previousPage = home_view

    renderPage: (page) ->

      @current_page = parseInt(page)
      @previousPage?.remove()

      page = Number(page)
      page_model = new Backbone.Model(Story.get('pages')[page - 1])
      page_view = new PageView
        model: page_model
      $('body').append page_view.el
      page_view.render()

      @previousPage = page_view

    renderCredits: ->

      @current_page = 7
      @previousPage?.remove()

      credits_view = new CreditsView()
      $('body').append credits_view.el
      credits_view.render()

      @previousPage = credits_view
      return

  return AppRouter