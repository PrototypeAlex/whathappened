(function() {

  define(['backbone'], function(Backbone) {
    var CreditsView;
    CreditsView = Backbone.View.extend({
      initialize: function() {
        _.bindAll(this);
        this.$el = $(this.el);
      },
      template: _.template("    <div id=\"credits\">\n    <h1>the end.</h1>\n    <br />\n    <p>\n    <span class=\"thing\">Story:</span> Sadaf Lourie<br />\n    <span class=\"thing\">Illustration:</span> <a href=\"http://cargocollective.com/riccardodesign\" target=\"_blank\">Riccardo Scott</a><br />\n    <span class=\"thing\">Design/Dev:</span> <a href=\"http://jarredbishop.info\" target=\"_blank\">Jarred Bishop</a><br />\n    <span class=\"thing\">Data/Dev:</span> <a href=\"http://prototypealex.com\" target=\"_blank\">Alex Gibson</a>\n    </p>\n    <a href=\"/\" class=\"btn\">start again?<span class=\"glare\"></span></a>\n<p>A Mix&Mash entry.</p>\n    </div>\n    <a href=\"/#/page/6\" class=\"pagination arrow left\"><span class=\"icon-left-open\"></span></a>"),
      render: function() {
        return this.$el.html(this.template({}));
      }
    });
    return CreditsView;
  });

}).call(this);
