define ['backbone'], (Backbone) ->
  CreditsView = Backbone.View.extend
    el: $('.page')

    initialize: ->
    	_.bindAll @
    	@$el = $(@el)
    	return

    template: _.template """
    <div id="credits">
    <h1>the end.</h1>
    <br />
    <p>
    <span class="thing">Story:</span> Sadaf Loudie<br />
    <span class="thing">Illustration:</span> <a href="http://cargocollective.com/riccardodesign" target="_blank">Riccardo Scott</a><br />
    <span class="thing">Design/Dev:</span> <a href="http://jarredbishop.info" target="_blank">Jarred Bishop</a><br />
    <span class="thing">Data/Dev:</span> <a href="https://twitter.com/PrototypeAlex" target="_blank">Alex Gibson</a>
    </p>
    <a href="#/" class="btn">start again?<span class="glare"></span></a>
    </div>
    <a href="/#/page/6" class="pagination arrow left"><span class="icon-left-open"></span></a>
    """

    render: ->
      @$el.html @template {}

  CreditsView