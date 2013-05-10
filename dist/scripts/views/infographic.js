(function() {

  define(['backbone'], function(Backbone) {
    var InfographicView;
    InfographicView = Backbone.View.extend({
      events: {
        're-init': 'reInitialize'
      },
      wait: .5,
      initialize: function() {
        var _this = this;
        _.bindAll(this);
        _.each(this.$('.number'), this.setupNumber);
        return _.each(this.$('.gold-star'), function(el) {
          var $el;
          $el = $(el);
          $el.css({
            opacity: 0
          });
          return TweenMax.to($el, .5, {
            opacity: 1,
            delay: .8,
            scale: 1.1,
            ease: Elastic.easeOut
          });
        });
      },
      setupNumber: function(el) {
        var $el, digits, number,
          _this = this;
        $el = $(el);
        number = $el.text();
        digits = number.split("");
        $el.html("");
        return _.each(digits, function(digit, index) {
          var $digit;
          $digit = $("<span class=\"digit\"><span class=\"value\">" + digit + "</span><div class=\"glare\"></div></span>");
          $el.append($digit);
          $digit.find('.value').css({
            opacity: 0,
            top: 20
          });
          TweenMax.to($digit.find('.value'), .7, {
            top: 0,
            opacity: 1,
            ease: Elastic.easeOut,
            delay: _this.wait + index * .2
          });
        });
      },
      reInitialize: function() {
        this.wait = 0;
        _.each(this.$('.number'), this.setupNumber);
      }
    });
    return InfographicView;
  });

}).call(this);
