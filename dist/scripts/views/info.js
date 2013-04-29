(function() {

  define(['backbone'], function(Backbone) {
    var InfoView;
    InfoView = Backbone.View.extend({
      events: {
        'click .close': 'close',
        'click .bg': 'close'
      },
      id: "info",
      initialize: function(options) {
        this.options = options;
        _.bindAll(this);
        this.$el = $(this.el);
        this.render();
        console.log(this);
      },
      template: _.template("<div class=\"bg\"></div>\n<div class=\"document\">\n    <a href=\"#\" class=\"close\"><div class=\"circular-glare\"></div></a>\n    <div class=\"corner\"></div>\n    <div class=\"content\">\n        <p>Hey Alex. Put all your <%= options.viz_id %> stuff up in this view (info.coffee).</p>\n        <p>Nice one.</p>\n    </div>\n\n</div>"),
      render: function() {
        return this.$el.html(this.template(this));
      },
      close: function(e) {
        e.preventDefault();
        this.remove();
      }
    });
    return InfoView;
  });

}).call(this);
