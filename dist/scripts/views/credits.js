(function() {

  define(['backbone'], function(Backbone) {
    var CreditsView;
    CreditsView = Backbone.View.extend({
      initialize: function() {
        _.bindAll(this);
        this.$el = $(this.el);
      },
      template: _.template("	<div id=\"credits\">\n	<h1>the end.</h1>\n	<br />\n	<p>\n	<span class=\"line\"><span class=\"thing\">Story:</span> Sadaf Lourie</span>\n	<span class=\"line\"><span class=\"thing\">Illustration:</span> <a href=\"http://cargocollective.com/riccardodesign\" target=\"_blank\">Riccardo Scott</a></span>\n	<span class=\"line\"><span class=\"thing\">Design/Dev:</span> <a href=\"http://jarredbishop.info\" target=\"_blank\">Jarred Bishop</a></span>\n	<span class=\"line\"><span class=\"thing\">Data/Dev:</span> <a href=\"http://prototypealex.com\" target=\"_blank\">Alex Gibson</a></span>\n	</p>\n	<a href=\"/\" class=\"btn\">start again?<span class=\"glare\"></span></a>\n<p class=\"mix-mash\">A Mix&Mash entry.</p>\n\n	<p class=\"cc\">\n		<a rel=\"license\" href=\"http://creativecommons.org/licenses/by-sa/3.0/deed.en_US\"><img alt=\"Creative Commons License\" style=\"border-width:0\" src=\"http://i.creativecommons.org/l/by-sa/3.0/88x31.png\" /></a><br /><span xmlns:dct=\"http://purl.org/dc/terms/\" property=\"dct:title\">What Happened</span> is licensed under a <a rel=\"license\" href=\"http://creativecommons.org/licenses/by-sa/3.0/deed.en_US\">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.\n	</p>\n\n	</div>\n	<a href=\"/#/page/6\" class=\"pagination arrow left\"><span class=\"icon-left-open\"></span></a>"),
      render: function() {
        this.$el.html(this.template({}));
        return this.animateIn();
      },
      animateIn: function() {
        var elements,
          _this = this;
        elements = [this.$('h1')];
        _.each(this.$('.line'), function(el) {
          return elements.push(el);
        });
        elements.push(this.$('.btn'));
        elements.push(this.$('.mix-mash'));
        elements.push(this.$('.arrow'));
        elements.push(this.$('p.cc'));
        _.each(elements, function(el, index) {
          var $el;
          $el = $(el);
          $el.css({
            opacity: 0
          });
          TweenMax.to($el, .4, {
            opacity: 1,
            delay: index * .2,
            ease: Quint.easeOut
          });
        });
      }
    });
    return CreditsView;
  });

}).call(this);
