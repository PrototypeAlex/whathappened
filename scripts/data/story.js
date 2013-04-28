(function() {

  define(['backbone'], function(Backbone) {
    var Story;
    Story = new Backbone.Model({
      pages: [
        {
          content: "<p>On a cold and sunny morning Olive and her Mother decided to go on a bushwalk.</p>\n<p>In their bag they put lunch, water and a blanket to sit on.</p>\n<p>The trees and the ground smelled nice. Olive held her Mother’s hand as they walked, and she looked all around her as she went.</p>",
          images: [
            {
              "src": "/images/pages/first_spread.jpg"
            }
          ]
        }, {
          content: "<p><span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>Mamma, what happened to that flower?<span class=\"quote-mark right\">&#8221;</span></span><br />\nOlive’s Mother took a good look and said,<br />\n<span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>Maybe it’s thirsty, see how the ground is dry?<span class=\"quote-mark right\">&#8221;</span></span><br />\n<span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>Or maybe four bugs sat on it at once?<span class=\"quote-mark right\">&#8221;</span></span> said Olive<br />\n<span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>That could be<span class=\"quote-mark right\">&#8221;</span></span> said Olive’s Mother, <span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>there is always more than one answer<span class=\"quote-mark right\">&#8221;</span></span></p>",
          images: [
            {
              "src": "/images/pages/bugs_sat_on_flower.jpg"
            }
          ]
        }, {
          content: "<p><span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>Mamma, what happened to the ground?<span class=\"quote-mark right\">&#8221;</span></span><br />\nOlive’s Mother took a good look and said,<br />\n<span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>Maybe a rock was <span class=\"data-marker\">washed away</span>, see that rock nearby?<span class=\"quote-mark right\">&#8221;</span></span><br />\n<span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>Or maybe a <span class=\"data-marker\">star fell</span> from the sky?<span class=\"quote-mark right\">&#8221;</span></span> said Olive<br />\n<span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>That could be<span class=\"quote-mark right\">&#8221;</span></span> said Olive’s Mother, <span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>there is always more than one answer<span class=\"quote-mark right\">&#8221;</span></span></p>",
          images: [
            {
              "src": "/images/pages/ufo.jpg"
            }
          ]
        }, {
          content: "<p><span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>Mamma, what happened to the sunshine?<span class=\"quote-mark right\">&#8221;</span></span><br />\nOlive’s Mother took a good look and sad,<br />\n<span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>Maybe a cloud <span class=\"data-marker\" data-id=\"clouds\">moved over the sun</span>, see all those clouds up there?<span class=\"quote-mark right\">&#8221;</span></span><br />\n<span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>Or maybe a <span class=\"data-marker\" data-id=\"spaceship\">spaceship flew past</span>?<span class=\"quote-mark right\">&#8221;</span></span> said Olive<br />\n<span class=\"spoken><span class=\"quote-mark left\">&#8220;</span>That could be<span class=\"quote-mark right\">&#8221;</span></span>, said Olive’s Mother, <span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>there is always more than one answer<span class=\"quote-mark right\">&#8221;</span></span></p>",
          images: [
            {
              "src": "/images/pages/ufo.jpg"
            }
          ],
          data_points: [
            {
              id: "clouds",
              left: "70%",
              top: "03%"
            }, {
              id: "spaceship",
              left: "49%",
              top: "88%"
            }
          ]
        }, {
          content: "<p><span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>Mamma, what happened to my hand?<span class=\"quote-mark right\">&#8221;</span></span><br />\nOlive’s Mother took a good look and said,<br />\n<span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>Maybe some water dripped down on it, see how the leaves are all wet?<span class=\"quote-mark right\">&#8221;</span></span><br />\n<span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>Or maybe it’s the juice from a fruit bat’s breakfast?<span class=\"quote-mark right\">&#8221;</span></span> said Olive<br />\n<span class=\"spoken><span class=\"quote-mark left\">&#8220;</span>That could be<span class=\"quote-mark right\">&#8221;</span></span>, said Olive’s Mother, <span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>there is always more than one answer<span class=\"quote-mark right\">&#8221;</span></span></p>",
          images: [
            {
              "src": "/images/pages/fruit_bat.jpg"
            }
          ]
        }, {
          content: "<p>They walked until they came to a clearing where Olive’s Mother decided would be a good place for their picnic. </p>\n<p><span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>We saw lots of things, didn’t we Olive?<span class=\"quote-mark right\">&#8221;</span></span> <span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>Yes<span class=\"quote-mark right\">&#8221;</span></span>, she replied, <span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>we saw a flower chair, a fallen star, a spaceship and some juice that fell off a bat’s breakfast plate<span class=\"quote-mark right\">&#8221;</span></span>. </p>\n<p>Olive’s Mamma smiled, <span class=\"spoken\"><span class=\"quote-mark left\">&#8220;</span>I guess what we see depends on whose eyes we use.<span class=\"quote-mark right\">&#8221;</span></span></p>",
          images: [
            {
              "src": "/images/pages/last_spread.jpg"
            }
          ]
        }
      ]
    });
    _.each(Story.get('pages'), function(page, index, pages) {
      if (index + 1 >= pages.length) {
        page.next_page_url = "#/credits";
        page.last_page = true;
      } else {
        page.next_page_url = "#/page/" + (index + 2);
        page.last_page = false;
      }
      if (index === 0) {
        page.previous_page_url = "#/";
      } else {
        page.previous_page_url = "#/page/" + index;
      }
    });
    return Story;
  });

}).call(this);
