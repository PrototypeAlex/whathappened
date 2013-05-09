(function() {

  define(['backbone', 'text!../../templates/home.html'], function(Backbone, homeTemplate) {
    var HomeView;
    HomeView = Backbone.View.extend({
      events: {
        'click .data-marker': 'openHelp',
        'click .close': 'close',
        'click .bg': 'close'
      },
      render: function() {
        this.$el.html(_.template(homeTemplate));
        return this.animateIn();
      },
      openHelp: function(e) {
        $('#info').removeClass('hidden');
        this.animateInHelp();
      },
      animateInHelp: function() {
        $('#info .bg').css({
          opacity: 0
        });
        TweenMax.to($('#info .bg'), .2, {
          opacity: 0.94
        });
        $('#info .document').css({
          top: "140px",
          opacity: 0
        });
        TweenMax.to($('#info .document'), .2, {
          top: 100,
          opacity: 1,
          ease: Quint.easeOut,
          delay: .3
        });
      },
      close: function(e) {
        var _this = this;
        TweenMax.to($('#info .document'), .2, {
          top: 140,
          opacity: 0,
          ease: Quint.easeIn
        });
        TweenMax.to($('#info .bg'), .2, {
          opacity: 0,
          delay: .3,
          onComplete: function() {
            _this.animationOutComplete();
          }
        });
      },
      animationOutComplete: function() {
        $('#info').addClass('hidden');
      },
      animateIn: function() {
        var elements,
          _this = this;
        elements = [this.$('h1'), this.$('.olive'), this.$('p'), this.$('.btn')];
        _.each(elements, function($el, index) {
          $el.css({
            opacity: 0
          });
          TweenMax.to($el, .2, {
            opacity: 1,
            delay: index * .1,
            ease: Quint.easeOut
          });
        });
      }
    });
    return HomeView;
  });

}).call(this);
