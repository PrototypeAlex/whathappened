(function() {

  define(['backbone'], function(Backbone) {
    var InfographicView;
    InfographicView = Backbone.View.extend({
      initialize: function() {
        _.bindAll(this);
        return _.each(this.$('.number'), this.setupNumber);
      },
      setupNumber: function(el) {
        var $el, digits, number,
          _this = this;
        console.log(el);
        $el = $(el);
        number = $el.text();
        digits = number.split("");
        $el.html("");
        _.each(digits, function(digit) {
          return $el.append("<span class=\"digit\">" + digit + "<div class=\"glare\"></div></span>");
        });
      }
    });
    return InfographicView;
  });

}).call(this);
