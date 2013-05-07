(function() {

  define(['backbone', 'views/info'], function(Backbone, InfoView) {
    var PageView;
    PageView = Backbone.View.extend({
      className: 'page',
      events: {
        'click .data-marker': 'openData',
        'click .close': 'closeData',
        'click .bg': 'closeData'
      },
      info_view: null,
      debug: true,
      initialize: function() {
        _.bindAll(this);
        return this.$el = $(this.el);
      },
      template: _.template("<div class=\"picture\">\n  <div class=\"frame\">\n    <div class=\"preloader\">\n      <div class=\"spinner\">\n        <i class=\"icon-cw-circled animate-spin\"></i>\n        <span class=\"circular-glare\"></span>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"words\">\n  <%= content %>\n</div>\n<a href=\"<%= previous_page_url %>\" class=\"pagination arrow left\"><span class=\"icon-left-open\"></span></a>\n<a href=\"<%= next_page_url %>\" class=\"pagination arrow right\"><span class=\"icon-right-open\"></span></a>\n<div id=\"info\" class=\"hidden\">\n  <div class=\"bg\"></div>\n  <div class=\"document\">\n      <a href=\"#\" class=\"close\"><div class=\"circular-glare\"></div></a>\n      <div class=\"corner\"></div>\n      <div class=\"content\" id=\"js-visualisation-container\"></div>\n  </div>\n</div>\n<div class=\"tool-tip\">\n</div>"),
      render: function() {
        var _this = this;
        this.$el.html(this.template(this.model.toJSON()));
        this.$picture = this.$('.picture');
        this.$frame = this.$('.picture .frame');
        $(window).bind('resize', this.onResize);
        this.onResize();
        this.img = new Image();
        this.img.onload = this.imageLoaded;
        this.img.src = this.model.get('images')[0].src;
        this.$img = $(this.img);
        this.$img.addClass('loading');
        this.$('.frame').append(this.img);
        this.info_view = new InfoView({
          parentView: this
        });
        return _.each(this.model.get('data_points'), function(point) {
          var el;
          el = "<div class=\"data-marker\" data-id=\"" + point.id + "\" style=\"left: " + point.left + "; top: " + point.top + ";\">+<div class=\"glare\"></div></div>";
          _this.$frame.append(el);
          return console.log(el);
        });
      },
      openData: function(e) {
        var $marker, id;
        $marker = $(e.target);
        if (!$marker.hasClass('data-marker')) {
          $marker = $marker.parents('.data-marker');
        }
        id = $marker.attr('data-id');
        this.info_view.render(id);
      },
      closeData: function(e) {
        var _this = this;
        e.preventDefault();
        this.info_view.close();
        this.$('#story').removeClass('hidden');
        _.each(this.$('.data-marker'), function(el) {
          var $el;
          $el = $(el);
          $el.removeClass('open');
          return $el.removeClass('not-me-open');
        });
      },
      onResize: function(e) {
        var max;
        if (this.$picture.width() > this.$picture.height()) {
          max = this.$picture.height();
        } else {
          max = this.$picture.width();
        }
        this.$frame.css({
          width: "" + max + "px",
          height: "" + max + "px",
          marginLeft: "" + (0 - (max / 2)) + "px",
          marginTop: "" + (0 - (max / 2)) + "px"
        });
      },
      imageLoaded: function() {
        this.$('.picture .preloader').addClass('hidden');
        this.$img.removeClass('loading');
      }
    });
    return PageView;
  });

}).call(this);
