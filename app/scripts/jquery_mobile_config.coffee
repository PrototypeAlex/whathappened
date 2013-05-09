define ["jquery"], ($) ->
  $(document).on "mobileinit", ->
    
    # Prevents all anchor click handling
    $.mobile.linkBindingEnabled = false
    
    # Disabling this will prevent jQuery Mobile from handling hash changes
    $.mobile.hashListeningEnabled = false