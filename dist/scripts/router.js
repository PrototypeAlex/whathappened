(function() {

  define(["backbone", "views/base", "views/home", "views/page", "views/credits", "data/story", "views/visualisations/base"], function(Backbone, BaseView, HomeView, PageView, CreditsView, Story, VisualisationView) {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      routes: {
        "": "renderHome",
        "home": "renderHome",
        "page/:page": "renderPage",
        "credits": "renderCredits"
      },
      initialize: function() {
        this.initializeBaseView();
        return this.visualisations = new VisualisationView();
      },
      initializeBaseView: function() {
        var base_view;
        base_view = new BaseView();
        return base_view.initialize();
      },
      renderHome: function(actions) {
        var home_view;
        if (this.previousPage != null) {
          this.previousPage.remove();
        }
        home_view = new HomeView();
        home_view.render();
        $('body').append(home_view.el);
        return this.previousPage = home_view;
      },
      renderPage: function(page) {
        var page_model, page_view;
        if (this.previousPage != null) {
          this.previousPage.remove();
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
        var credits_view;
        if (this.previousPage != null) {
          this.previousPage.remove();
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
