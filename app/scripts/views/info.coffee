define ['backbone', 'views/visualisations/base', 'views/infographic'], (Backbone, VisualisationView, InfographicView) ->
    InfoView = Backbone.View.extend

        vizualisation_view: null
        current_visualisation: null

        initialize: ->
            @vizualisation_view = new VisualisationView({parentView: @})

        render: (viz_id) ->
            $('#info').removeClass('hidden')
            console.log viz_id
            switch viz_id
                when "clouds"           then @renderSunshineHours()
                when "spaceship"        then @renderUfoSightings()
                when "rain_fall"        then @renderRainFall()
                when "meteor_shower"    then @renderMeteorShower()
                when "wet_days"         then @renderWetDays()
                when "fruit_bat"        then @renderFruitBats()
                when "bugs"             then @renderBugs()
                when "erosion"         then @renderErosion()

            _.each $('#info .infographic'), (el) ->
                v = new InfographicView
                    el: el


        renderUfoSightings: ->
            @current_visualisation = @vizualisation_view.render_ufo_sightings()

        renderSunshineHours: ->
            @current_visualisation = @vizualisation_view.render_sunshine_hours()

        renderWetDays: ->
            @current_visualisation = @vizualisation_view.render_wet_days()

        renderRainFall: ->
            @current_visualisation = @vizualisation_view.render_rain_fall()

        renderMeteorShower: ->
            @current_visualisation = @vizualisation_view.render_meteor_shower()

        renderFruitBats: ->
            @current_visualisation = @vizualisation_view.render_fruit_bats()

        renderBugs: ->
            @current_visualisation = @vizualisation_view.render_bugs()

        renderErosion: ->
            @current_visualisation = @vizualisation_view.render_erosion()


        close: (e) ->
            @vizualisation_view.remove()
            $('#info').addClass('hidden')
            return

    InfoView