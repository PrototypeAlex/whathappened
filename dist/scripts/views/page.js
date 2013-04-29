(function() {

  define(['backbone', 'views/info'], function(Backbone, InfoView) {
    var PageView;
    PageView = Backbone.View.extend({
      className: 'page',
      events: {
        'click .data-marker': 'openData',
        'click .close': 'closeData'
      },
      className: 'page',
      initialize: function() {
        _.bindAll(this);
        this.$el = $(this.el);
      },
      template: _.template("<div class=\"picture\" style=\"background-image: url('<%= images[0].src %>');\"></div>\n<div class=\"words\">\n  <%= content %>\n</div>\n<div id=\"left\">\n  <div id=\"js-visualisation-container\" class=\"hidden\">\n    <a href=\"#\" class=\"close\">&times;</a>\n    <div class=\"content\"><p>vis content...</p></div>\n  </div>\n</div>\n<a href=\"<%= previous_page_url %>\" class=\"pagination arrow left\"><span class=\"icon-left-open\"></span></a>\n<a href=\"<%= next_page_url %>\" class=\"pagination arrow right\"><span class=\"icon-right-open\"></span></a>"),
      render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        $(window).bind('resize', this.onResize);
        return this.onResize();
      },
      openData: function(e) {
        var $marker, id, iv,
          _this = this;
        $marker = $(e.target);
        id = $marker.attr('data-id');
        console.log(id);
        e.preventDefault();
        iv = new InfoView({
          story: this.story,
          viz_id: id
        });
        $('body').append(iv.el);
        return;
        this.$('#story').addClass('hidden');
        this.$('#js-visualisation-container').removeClass('hidden');
        $marker.addClass('open');
        _.each(this.$('.data-marker'), function(el, index) {
          var $el;
          $el = $(el);
          if (!$el.hasClass("open")) {
            $el.addClass('not-me-open');
          }
        });
      },
      closeData: function(e) {
        var _this = this;
        e.preventDefault();
        this.$('#story').removeClass('hidden');
        this.$('#js-visualisation-container').addClass('hidden');
        _.each(this.$('.data-marker'), function(el) {
          var $el;
          $el = $(el);
          $el.removeClass('open');
          return $el.removeClass('not-me-open');
        });
      },
      onResize: function(e) {
        var h;
        h = $(window).height();
      }
    });
    return PageView;
  });

}).call(this);
