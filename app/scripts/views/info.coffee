define ['backbone', 'views/visualisations/base', 'views/infographic'], (Backbone, VisualisationView, InfographicView) ->
    InfoView = Backbone.View.extend

        vizualisation_view: null
        current_visualisation: null

        initialize: ->
            @vizualisation_view = new VisualisationView({parentView: @})

        render: (viz_id) ->
            $('#info').removeClass('hidden')
            @renderViz(viz_id)
            @animateIn()

        renderViz: (viz_id) ->
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

        animateIn: ->
            $('#info .bg').css
                opacity: 0
            TweenMax.to $('#info .bg'), .2, 
                opacity: 0.94

            $('#info .document').css
                top: "140px"
                opacity: 0
            TweenMax.to $('#info .document'), .2
                top: 100
                opacity: 1
                ease: Quint.easeOut
                delay: .3
            return


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
            # @vizualisation_view.remove()
            # 
            TweenMax.to $('#info .document'), .2,
                top: 140
                opacity: 0
                ease: Quint.easeIn

            TweenMax.to $('#info .bg'), .2,
                opacity: 0
                delay: .3
                onComplete: () =>
                    @animationOutComplete()
                    return
            return

        animationOutComplete: ->
            @vizualisation_view.remove()
            $('#info').addClass('hidden')
            return

    InfoView