(function() {

  define(["backbone", "views/home", "views/page", "views/credits", "data/story"], function(Backbone, HomeView, PageView, CreditsView, Story) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      routes: {
        "": "renderHome",
        "home": "renderHome",
        "page/:page": "renderPage",
        "credits": "renderCredits"
      },
      initialize: function() {
        var _this = this;
        $('body').swipe({
          swipe: function(event, direction, distance, duration, fingerCount) {
            if (direction === 'left') {
              return _this.navigate_right(event);
            } else if (direction === 'right') {
              return _this.navigate_left(event);
            }
          },
          fingers: 2
        });
        return $('body').on('keydown', function(e) {
          return _this.arrowNavigation(e);
        });
      },
      arrowNavigation: function(e) {
        if (e.keyCode === 37) {
          return this.navigate_left(e);
        } else if (e.keyCode === 39) {
          return this.navigate_right(e);
        }
      },
      navigate_left: function(e) {
        if (this.current_page > 0) {
          this.current_page = this.current_page - 1;
          if (this.current_page === 0) {
            return this.navigate("/", {
              trigger: true
            });
          } else {
            return this.navigate("/page/" + this.current_page, {
              trigger: true
            });
          }
        }
      },
      navigate_right: function(e) {
        if (this.current_page < 7) {
          this.current_page = this.current_page + 1;
          if (this.current_page === 7) {
            return this.navigate("/credits", {
              trigger: true
            });
          } else {
            return this.navigate("/page/" + this.current_page, {
              trigger: true
            });
          }
        }
      },
      renderHome: function(actions) {
        var home_view, _ref;
        this.current_page = 0;
        if ((_ref = this.previousPage) != null) {
          _ref.remove();
        }
        home_view = new HomeView();
        home_view.render();
        $('body').append(home_view.el);
        return this.previousPage = home_view;
      },
      renderPage: function(page) {
        var page_model, page_view, _ref;
        this.current_page = parseInt(page);
        if ((_ref = this.previousPage) != null) {
          _ref.remove();
        }
        page = Number(page);
        page_model = new Backbone.Model(Story.get('pages')[page - 1]);
        page_view = new PageView({
          model: page_model
        });
        $('body').append(page_view.el);
        page_view.render();
        return this.previousPage = page_view;
      },
      renderCredits: function() {
        var credits_view, _ref;
        this.current_page = 7;
        if ((_ref = this.previousPage) != null) {
          _ref.remove();
        }
        credits_view = new CreditsView();
        $('body').append(credits_view.el);
        credits_view.render();
        this.previousPage = credits_view;
      }
    });
    return AppRouter;
  });

}).call(this);
