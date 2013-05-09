define ["backbone", "views/home", "views/page", "views/credits", "data/story"], (Backbone, HomeView, PageView, CreditsView, Story) ->
  AppRouter = Backbone.Router.extend
    routes:
      "": "renderHome"
      "home": "renderHome"
      "page/:page": "renderPage"
      "credits": "renderCredits"

    initialize: ->
      $('body').on('swipeleft', => @navigate_left )
      $('body').on('swiperight', => @navigate_right )
      $('body').on('keydown', (d) => @arrowNavigation(d))

    arrowNavigation: (e) ->
      if e.keyCode == 37
        @navigate_left()
      else if e.keyCode == 39
        @navigate_right()

    navigate_left: ->
      if @current_page > 0
        @current_page = (@current_page - 1)
        
        if @current_page == 0
          this.navigate("/", {trigger: true})
        else
          this.navigate(("/page/" + @current_page), {trigger: true})

    navigate_right: ->
      if @current_page < 7
        @current_page = (@current_page + 1)
        if @current_page == 7
          this.navigate("/credits", {trigger: true})
        else
          this.navigate(("/page/" + @current_page), {trigger: true})

    swipeRight: ->
      console.log 'swipe right'

    renderHome: (actions) ->
      @previousPage.remove() if @previousPage?
      @current_page = 0
      home_view = new HomeView()
      home_view.render()
      $('body').append home_view.el

      @previousPage = home_view

    renderPage: (page) ->
      @previousPage.remove() if @previousPage?
      @current_page = parseInt(page)
      page = Number(page)
      page_model = new Backbone.Model(Story.get('pages')[page - 1])
      page_view = new PageView
        model: page_model
      $('body').append page_view.el
      page_view.render()

      @previousPage = page_view

    renderCredits: ->
      @previousPage.remove() if @previousPage?
      @current_page = 7
      credits_view = new CreditsView()
      $('body').append credits_view.el
      credits_view.render()

      @previousPage = credits_view
      return

  return AppRouter