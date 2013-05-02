define ['backbone', 'views/visualisations/clouds', 'views/visualisations/ufo_sightings', 'views/visualisations/rain_fall'], (Backbone, CloudsView, UfoView, RainView) ->
    InfoView = Backbone.View.extend

        events:
            'click .close': 'close'
            'click .bg': 'close'

        id: "info"

        initialize: (@options) ->
            _.bindAll @
            @$el = $(@el)
            @render()
            console.log @
            return

        template: _.template """
            <div class="bg"></div>
            <div class="document">
                <a href="#" class="close"><div class="circular-glare"></div></a>
                <div class="corner"></div>
                <div class="content"></div>
            </div>
            """

        render: ->
            @$el.html @template @

            switch @options.viz_id
                when "clouds" then view = CloudsView
                when "spaceship" then view = UfoView
                when "rain_fall" then view = RainView

            if view?
                v = new view
                    el: @$('.content')
                v.render()




        close: (e) ->
            e.preventDefault()
            @remove()
            return

    InfoView