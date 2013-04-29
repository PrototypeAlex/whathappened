(function() {

  define(['backbone', 'text!../../../templates/ufo.html', 'd3', "views/visualisations/new_zealand"], function(Backbone, ufoTemplate, d3, newZealandView) {
    var UfoSightingsView;
    UfoSightingsView = Backbone.View.extend({
      el: $('#js-visualisation-container'),
      ufo_data: null,
      render: function() {
        var region, _results,
          _this = this;
        this.$el.show('slow');
        this.$el.html(_.template(ufoTemplate));
        this.new_zealand = new newZealandView();
        this.new_zealand.render();
        d3.json('data/ufo_sightings.json', function(data) {
          return _this.ufo_data = data;
        });
        _results = [];
        for (region in this.new_zealand.nz) {
          _results.push((function(path, region, view) {
            return path.on("click", function() {
              return view.render_ufo_template(region);
            });
          })(this.new_zealand.nz[region], region, this));
        }
        return _results;
      },
      render_ufo_template: function(region) {
        var data, readable_region, tbody, tr, ufo_sightings,
          _this = this;
        ufo_sightings = _.filter(this.ufo_data, function(d) {
          return d.region === region;
        });
        readable_region = region.capitalize();
        if (region === 'Bayofplenty') {
          readable_region = 'Bay of Plenty';
        }
        if (region === 'Eastcape') {
          readable_region = 'East Cape';
        }
        $('#js-ufo-sightings h2.heading').html("Region: " + readable_region);
        if (ufo_sightings.length === 0) {
          $('#js-ufo-sightings table').hide();
          $('#js-ufo-sightings p.description').html('There have been no sightings in this region.');
        } else {
          $('#js-ufo-sightings p.description').html('');
          $('#js-ufo-sightings table').show();
        }
        tbody = d3.select('#js-ufo-sightings table').selectAll("tbody");
        data = tbody.selectAll('tr').data(ufo_sightings, function(d) {
          return d.description;
        });
        data.exit().transition().remove();
        tr = data.enter().append('tr');
        tr.append('td').text(function(d) {
          return d.time;
        });
        tr.append('td').attr('style', 'text-align: center').text(function(d) {
          return d.location;
        });
        tr.append('td').attr('style', 'text-align: center').text(function(d) {
          return d.event;
        });
        return tr.append('td').html("<a>More Information</a>").on("click", function(d) {
          return console.log(d);
        });
      }
    }, String.prototype.capitalize = function() {
      return this.replace(/(?:^|\s)\S/g, function(a) {
        return a.toUpperCase();
      });
    });
    return UfoSightingsView;
  });

}).call(this);
