(function() {

  define(['backbone', 'text!../../../templates/fruit_bats.html'], function(Backbone, FruitBatTemplate) {
    var FruitBatView;
    FruitBatView = Backbone.View.extend({
      el: '#js-visualisation-container',
      template: _.template(FruitBatTemplate),
      initialize: function(options) {
        return this.parentView = options.parentView;
      },
      render: function() {
        return this.$el.html(this.template);
      }
    });
    return FruitBatView;
  });

}).call(this);
