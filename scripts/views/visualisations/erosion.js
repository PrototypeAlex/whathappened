(function() {

  define(['backbone', 'text!../../../templates/erosion.html'], function(Backbone, ErosionTemplate) {
    var ErosionView;
    ErosionView = Backbone.View.extend({
      el: '#js-visualisation-container',
      template: _.template(ErosionTemplate),
      initialize: function(options) {
        return this.parentView = options.parentView;
      },
      render: function() {
        return this.$el.html(this.template);
      }
    });
    return ErosionView;
  });

}).call(this);
