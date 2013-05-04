define ['backbone', 'views/visualisations/base'], (Backbone, VisualisationView) ->
    InfoView = Backbone.View.extend

        vizualisation_view: null
        el: $('#info')

        initialize: ->
            _.bindAll @
            @$el = $(@el)
            @vizualisation_view = new VisualisationView()
            console.log @
            return

        render: (viz_id) ->
            $('#info').removeClass('hidden')

            switch viz_id
                when "clouds"       then @renderSunshineHours()
                when "spaceship"    then @renderUfoSightings()
                when "rain_fall"    then @renderRainFall()


        renderUfoSightings: ->
            @vizualisation_view.render_ufo_sightings()

        renderSunshineHours: ->
            @vizualisation_view.render_sunshine_hours()

        renderWetDays: ->
            @vizualisation_view.render_wet_days()

        renderRainFall: ->
            console.log 'info.coffee'
            @vizualisation_view.render_rain_fall()

        renderMeteorShower: ->
            @vizualisation_view.render_meteor_shower()


        close: (e) ->
            e.preventDefault()
            console.log 'gello'
            @remove()
            return

    InfoView