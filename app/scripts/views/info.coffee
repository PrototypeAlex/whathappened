define ['backbone'], (Backbone) ->
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
                <div class="content">
                    <p>Hey Alex. Put all your <%= options.viz_id %> stuff up in this view (info.coffee).</p>
                    <p>Nice one.</p>
                </div>

            </div>
            """

        render: ->
            @$el.html @template @

        close: (e) ->
            e.preventDefault()
            @remove()
            return

    InfoView