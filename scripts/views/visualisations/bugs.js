(function() {

  define(['backbone', 'text!../../../templates/bugs.html'], function(Backbone, BugTemplate) {
    var BugView;
    BugView = Backbone.View.extend({
      el: '#js-visualisation-container',
      template: _.template(BugTemplate),
      initialize: function(options) {
        return this.parentView = options.parentView;
      },
      render: function() {
        return this.$el.html(this.template);
      }
    });
    return BugView;
  });

}).call(this);
