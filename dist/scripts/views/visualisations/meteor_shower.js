(function() {

  define(['backbone', 'text!../../../templates/meteor_shower.html', 'd3'], function(Backbone, MeteorShowerTemplate, d3) {
    var MeteorView;
    MeteorView = Backbone.View.extend({
      el: $('#js-visualisation-container'),
      render: function() {
        this.$el.show('slow');
        this.$el.html(_.template(MeteorShowerTemplate));
        this.get_meteor_data();
        return this;
      },
      get_meteor_data: function() {
        var callback, jqxhr, querytail, queryurl;
        callback = function(data) {
          console.log(data);
          return console.log(data.table.rows[0]);
        };
        queryurl = "https://www.google.com/fusiontables/api/query?sql=select+*+from+1hrTPrwR5piW7e9U-LNGmcRKRDUWCwhAaqiN_yrU";
        querytail = "&jsonCallback=?";
        return jqxhr = $.get(queryurl + querytail, callback, "jsonp");
      },
      render_geo_chart: function() {
        var circle, origin, projection, velocity;
        origin = [-71.03, 25.37];
        velocity = [0.0040, 0.0000];
        projection = d3.geo.azimuthal().scale(200).origin(origin).mode("orthographic");
        return circle = d3.geo.circle().origin(projection.origin());
      }
    });
    return MeteorView;
  });

}).call(this);
