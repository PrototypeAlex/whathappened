(function() {

  define(['backbone', 'text!../../../templates/ufo.html', 'd3', "views/visualisations/new_zealand"], function(Backbone, ufoTemplate, d3, newZealandView) {
    var UfoSightingsView;
    UfoSightingsView = Backbone.View.extend({
      el: $('#js-visualisation-container'),
      ufo_data: [
        {
          "time": new Date("December 08, 2012 00:00:00"),
          "region": "auckland",
          "location": "Tindall's Beach, Auckland, North Island",
          "event": "two unusual orange lights ",
          "description": "Clear starlit night. Duration of sightings approximately 10-20 seconds each. The witness was observing the night sky when she saw a large bright orange light at a high altitude tracking east to west at a speed similar to a jet airliner. After a few seconds the light suddenly disappeared. Two to three minutes later, a second similar light subsequently appeared in the same part of the sky, but tracking north to south. This light was twice as big and much brighter that the first light, but traveling at the same speed, and it disappeared in the same manner. There was no noise associated with the lights."
        }, {
          "time": new Date("December 08, 2012 00:00:00"),
          "region": "auckland",
          "location": "Torbay, Auckland, North Island",
          "event": "two groups of reddish/orange lights",
          "description": "Clear starlight night. Duration of sightings approximately 2 minutes. The witness saw an initial group of three bright reddish/yellow lights moving on an arc track high in the sky at a speed faster that a jet airliner. The lights were spaced apart and had no associated noise. They maintained a constant brilliancy until disappearing high in the sky. Then a group of two similar lights having the same characteristics, appeared and followed the same flight path as the previous three, disappearing at the same position. "
        }, {
          "time": new Date("December 08, 2012 00:00:00"),
          "region": "auckland",
          "location": "Torbay, Auckland, North Island",
          "event": "very bright orange light at high altitude",
          "description": "Clear sky with stars visible, just after sunset. Duration of sighting approximately 3 minutes. Four witnesses observed a very bright orange light traveling on a flat flight path west to north, high across the sky. Its speed was constant and similar to that of a jet fighter plane, and but there was no associated noise or blinking lights. The light remained intense until it suddenly disappeared. "
        }, {
          "time": new Date("December 08, 2012 00:00:00"),
          "region": "auckland",
          "location": "Greenhithe, Auckland, North Island",
          "event": "large orange light at low level",
          "description": "Clear sky at sunset. Duration of sighting approximately 30 seconds. Three witnesses observed a large, round, bright orange light at a height of some 1500-2000 feet, and approximately 1-2 km distant. The object was around the size of a tennis ball held at arm's length. It initially descended rapidly, then slowed as it arced down to the ground and disappeared beyond trees on an adjacent hilltop in a residential area. The object left no trail and made no noise. The witnesses were positive that the object was not a flare or lantern. "
        }, {
          "time": new Date("December 07, 2012 00:00:00"),
          "region": "auckland",
          "location": "Blockhouse Bay, Auckland, North Island",
          "event": "translucent pink/white light/object at low level",
          "description": "Clear evening on dusk, no wind. Duration of sighting approximately 30 seconds. Three witnesses sighted a translucent pinkish-white light moving steadily in a northeasterly direction, some 5 metres above an adjacent power-line. The almost oval object was assessed as being some 4 metres wide, 20-30 metres distant from the witnesses, and shaped like the cup of an upside down wine glass – rounded on top with blunt base. It was lost from view as it passed beyond trees. "
        }, {
          "time": new Date("November 13, 2012 00:00:00"),
          "region": "canterbury",
          "location": "Avonside, Christchurch, South Island",
          "event": "single large orange light",
          "description": "Clear weather with minimal scattered cloud. Duration of sighting 3 minutes. The witness observed a large orange ball of light traversing the sky from east to west. When first sighted the witness estimated its distance to be approximately 2 or 3 km. The light made no noise. The light increased in speed and gained altitude at the same time until it began to look like a large orange star in the distance, and the witness eventually lost sight of it. "
        }, {
          "time": new Date("November 09, 2012 00:00:00"),
          "region": "canterbury",
          "location": "Fairlie, South Canterbury, South Island",
          "event": "huge red/orange glowing object/light ",
          "description": "Cloudy night sky. Duration of sighting approximately 20 minutes. The two witnesses initially noticed a huge round, orange coloured light very high in the southern sky. The light had a secondary red burning glow surrounding it, and they watched it moving horizontally in a westerly direction. It then appeared to move vertically upwards into or behind a cloud, but the intensity and size of light did not change and was still observable through the cloud. The light subsequently descended vertically to appear below the cloud, and then tracked rapidly in a southerly direction, disappearing from sight. "
        }, {
          "time": new Date("November 05, 2012 00:00:00"),
          "region": "wellington",
          "location": "Lower Hutt, North Island",
          "event": "hovering orange/red light",
          "description": "Clear sky, turning to overcast drizzle. Duration of sighting approximately 3-5 minutes. Five witnesses noticed a fairly large orange/red light hovering at a 45 degree angle in the sky, and initially thought that it may have been a helicopter. It was the size of a small pea at arm's length, and they are certain that it was not fireworks, as there was no noise associated with their sighting. After some 3-5 minutes the object seemed to diminish as if it was traveling further into the sky, and it faded from view. "
        }, {
          "time": new Date("November 03, 2012 00:00:00"),
          "region": "auckland",
          "location": "Red Beach, Whangaparoa, North Island",
          "event": "bright orange lights",
          "description": "Partly cloudy night, with no wind. Duration of sighting approximately 30-40 seconds. The witnesses observed two bright orange lights to the north of their position moving eastwards at a slow but constant speed. The lights were round in shape with hazy edges, with the second light being at a slightly higher altitude. Using binoculars, the witness was able to see that there were no lights that would indicate an aircraft/helicopter, and there was no noise associated with the lights. The witness had the impression that the lights were approximately 500 metres above sea level and was positive that they were not Chinese lanterns or flares. The lights were lost from view as they passed behind a hill. "
        }, {
          "time": new Date("October 30, 2012 00:00:00"),
          "region": "manawatu",
          "location": "Taumarunui, North Island",
          "event": "bright elongated cylindrical object",
          "description": "Clear sky with a few clouds, and no wind. Duration of sighting approximately 10 minutes. The witness was watching a sunset when she observed a bright, distant stationary yellow/white cloud-like object low on the horizon to the west of her. All other clouds in the sky at that stage were gray. The object had an elongated thin cylindrical shape. She initially thought it was a cloud with the sun reflecting on it, but then the object started to slowly move in a downward and southerly direction across the horizon. The object subsequently went behind a cloud, and when it re-appeared, the two witnesses observed it moving in an upwards direction to the north-east at an increased speed, and it then faded out of sight. "
        }, {
          "time": new Date("October 15, 2012 00:00:00"),
          "region": "auckland",
          "location": "Auckland, North Island",
          "event": "five star-like fast moving lights on different tracks ",
          "description": "Clear night. Duration of sighting approximately 5 minutes. The witness observed a bright reddish/white light the size of a medium star appear from the middle of the sky and track south at high speed. It was only in sight for a few seconds and crossed the sky in a straight line. A few seconds later, another similar light appeared in the centre of the sky, and headed west. It appeared to stop and then suddenly start moving west again. While the witness was watching this light, another similar light appeared heading in the opposite direction. A fourth light subsequently appeared from the middle of the sky moving east at speed. The witness called to her flat mate to see the light, and a few seconds later the fifth light appeared in the same manner moving east at speed. The witness was certain that the lights were not associated with aircraft. "
        }, {
          "time": new Date("October 28, 2012 00:00:00"),
          "region": "auckland",
          "location": "Red Beach, Whangaparoa, North Island",
          "event": "single bright orange light",
          "description": "Partly cloudy night, with no wind. Duration of sighting approximately 20-30 seconds. The witnesses observed a large bright orange light to the north of his position, moving eastwards at a slow but constant speed across the sky. The light was round in shape with hazy edges. The witness stated that there were no lights that would indicate an aircraft/helicopter, and there was no noise associated with the light. The light passed behind adjacent trees some 1500 metres distant, and disappeared over the horizon. The witness had the impression the light was approximately 500 metres above sea level, and was positive that it was not Chinese lanterns or flares. The light was lost from view as it passed behind a hill. "
        }, {
          "time": new Date("October 14, 2012 00:00:00"),
          "region": "auckland",
          "location": "Browns Bay, Auckland, North Island",
          "event": "blue/white light moving at speed ",
          "description": "The witness observed a light blue coloured object moving quickly north over Browns Bay. The brilliance of the light was constant, and the object appeared to have a bright white centre surrounded by a light blue light. The witness was certain the object was not an aircraft and there was no associated noise. "
        }, {
          "time": new Date("October 03, 2012 00:00:00"),
          "region": "tasman",
          "location": "Motueka, South Island",
          "event": "large red/orange orb of light",
          "description": "Calm conditions with low scattered cloud. Duration of sighting 4 minutes. A witness saw a perfect red/orange globe travelling east across Motueka. It was travelling slowly, low and below cloud cover, and was completely silent. The witness fetched his partner to take a look at it to reassure himself he wasn't “seeing things”, and by that time the light had receded into the distance and appeared like a very large orange star. The witnesses continued to watch it as it got smaller and disappeared from view into the distance. "
        }, {
          "time": new Date("October 03, 2012 00:00:00"),
          "region": "auckland",
          "location": "Torbay, Auckland, North Island",
          "event": "large bright orange light",
          "description": "Overcast night with thick clouds. Duration of sighting approximately 1 minute. The witness was driving home when he observed a large orange light with a reddish tinge moving from above Torbay on an easterly curved flight path out to sea. The light appeared to be approximately one kilometre distant, was beneath the cloud base, and moving at helicopter speed. There was no associated sound. The light seemed to flicker or pulse, and as it moved out to sea, its brilliancy got dimmer until it disappeared. "
        }, {
          "time": new Date("September 25, 2012 00:00:00"),
          "region": "auckland",
          "location": "Tuakau/Pukekohe, Frankton, North Island",
          "event": "large white/yellowish light descending rapidly",
          "description": "Calm evening, partly cloudy. Duration of sighting approximately 4 seconds. A witness was looking north-west from Tuakau towards Pukekohe, when he saw a bright white/yellowish ball of light in the distance. The light hovered in one spot low in the sky for around two seconds, before shooting vertically straight up into the sky at tremendous speed, until the witness was no longer able to see it. "
        }, {
          "time": new Date("September 22, 2012 00:00:00"),
          "region": "auckland",
          "location": "Papakura, Auckland, North Island",
          "event": "multiple witnesses sighting of two unusual lights",
          "description": "Clear night with moon visible. Duration of sighting approximately 5 minutes. The witness observed a light appear that was larger than a light aircraft in the sky. The witness described the light as “fire in the sky”, and being bright red in colour. He called out to the other 10 people inside the house and as they all observed the light, a second similar light appeared. Both lights tracked east to west at a slow speed, the first one just disappearing, and the second one appeared to carry on into the far distance. The reporting witness estimated the lights were at an altitude of approximately 1000 feet and was adamant that they were not Chinese lanterns or aircraft. "
        }, {
          "time": new Date("September 22, 2012 00:00:00"),
          "region": "hawkesbay",
          "location": "Onekawa, Napier, North Island",
          "event": "six bright orange lights ",
          "description": "Clear starlight night. Duration of sightings approximately 8-10 minutes. Three witnesses observed an incredibly intense, bright orange light moving slowly towards them from the Taradale hills area. As they watched, the light suddenly veered sharply left, climbed rapidly upwards and disappeared. Then two similar bright orange lights appeared and followed the same flight path, and these were followed by another two similar lights behaving as the previous ones. As the last two lights were in the climb, another single bright orange light appeared and followed them along the same flight path. All lights appeared at low level initially and then moved across the sky on a north to south track, before disappearing to the west. All lights appeared to be round and very large, and the witnesses advised that the sharp turn the lights made when veering left could not be made by an aircraft. The brilliancy of the lights did not change during the observation, and there was no associated noise, even though the lights seemed fairly close to the witnesses. Possibly Chinese lanterns, although the witnesses were adamant they were not. "
        }, {
          "time": new Date("September 19, 2012 00:00:00"),
          "region": "wellington",
          "location": "Paraparaumu, Kapiti Coast, Wellington, North Island",
          "event": "large orange light",
          "description": "Clear conditions, no clouds, no wind. Duration of sighting 5 to 6 minutes. Looking to the north, the witness observed a very large bright orange/red light, horizontally oval in shape. The intensity of the light was consistent, with no variations in colour or brightness. There was no sound associated with the sighting. The light initially travelled slowly across the sky from Northwest to North, becoming stationary for a short time. At this point the witness called her son to come and observe the light. The light was still stationary when he came out to watch it, then it began moving again in a northerly direction before becoming stationary again for a couple of minutes. From that position the light sped away, becoming smaller until it disappeared from view in the distance. "
        }, {
          "time": new Date("September 18, 2012 00:00:00"),
          "region": "waikato",
          "location": "Taupo/Napier Highway, North Island",
          "event": "black disc shaped object",
          "description": "Mainly clear sky with a few scattered clouds. Duration of sighting 5 minutes. The witness was travelling by bus from Taupo to Napier on Highway 5. The bus left Taupo at 2.15 pm. At around 2.45 pm the witness looked out the window and noticed a black disc shaped object stationary in a small gap between clouds, high in the sky. She watched the object for about 1 minute before deciding to stand up to get a better view through another window. The object moved into the clouds and disappeared, while the witness kept her eyes on that spot. It reappeared from the cloud moving at a slow pace across the sky for around 2 minutes. The witness knew it was not playing or helicopter because of its manner of movement. She reached for her phone to see if she could zoom in on the object, but when she looked back out the window, it was gone. "
        }, {
          "time": new Date("September 12, 2012 00:00:00"),
          "region": "waikato",
          "location": "Chartwell, Hamilton, North Island",
          "event": "object hovering at low level",
          "description": "Clear night, stars visible, with no wind. Duration of sighting 10 minutes. The witnesses were driving home northbound on Peachgrove Road toward Five Cross Roads, Hamilton, when they saw a very bright oval star-like object hovering close-by in the sky. They estimated object was around 200-300 metres distant, at a height of approximately 400 metres. The object hovered for a couple seconds then started moving slowly sideways while shining a brilliant white beam of light down onto adjacent tree-tops. The witnesses initially thought it could be a helicopter, but as they got nearer and lowered the car window, there was no sound to be heard. The witnesses could make out a solid disc-shaped object in the centre of the brilliant white light being emitted. The brilliancy of the light did not change during the sighting. The witnesses drove on feeling scared and uncomfortable about watching any further and so lost sight of the object. "
        }, {
          "time": new Date("September 08, 2012 00:00:00"),
          "region": "northland",
          "location": "Whangarei, Northland, North Island",
          "event": "large green light",
          "description": "Clear night sky with stars and moon visible; no wind. Duration of sighting 40-50 seconds. The witness had just arrived home and was checking the night sky, when he noticed a large bright green ball of light as it appeared in his vision high above the horizon, in the vicinity of the Southern Cross. It tracked across the sky to the north-east at a speed at least twice as fast as a jet airliner. There was no deviation in flight path as the object disappeared over the horizon. Just prior to it disappearing, the witness noticed an orange flash on the right hand side of the ball of green light. UFOCUS NZ comment: possibly a meteor, although the witness stated he is a regular sky-watcher and considers it was not a meteor. "
        }, {
          "time": new Date("September 05, 2012 00:00:00"),
          "region": "wellington",
          "location": "Paraparaumu, Kapiti Coast, North Island",
          "event": ": red pulsing light",
          "description": "Clear starry night. Duration of sighting 4 minutes. Two witnesses observed a red pulsing orb of light high in the sky travelling slowly from a north-westerly direction, south east from out at sea well beyond Kapiti Island. The light then changed to a north easterly direction, with occasional irregular changes of direction, disappearing and then reappearing slightly off track. The light then became stationary, tracked north, then North East still continuing to pulse irregularly. Initially the light was seen to pulse at different intervals, at some point is not pulsating at all. The reporting witness described the red light as having a strange intensity to it. This witness is near completion of his commercial pilot's licence and was absolutely sure the light was not an aircraft as no legally required aircraft lighting was visible, and there was no sound. They watched the light until it disappeared from view. The second witness, a skeptic, had no explanation for this anomalous light. "
        }, {
          "time": new Date("August 31, 2012 00:00:00"),
          "region": "bayofplenty",
          "location": "Tauranga, North Island",
          "event": "large bright orange light",
          "description": "Clear conditions. Duration of sighting 1-2 minutes. Four witnesses observed a large bright orange light in the northwestern sky, which at first they thought was an aircraft on fire, however the light was ascending, rather than descending. They watched the light as it climbed higher in the sky until it faded from view. They described the bright light as ‘throbbing’ or ‘pulsing’. "
        }, {
          "time": new Date("August 28, 2012 00:00:00"),
          "region": "bayofplenty",
          "location": "Katikati/Waihi Beach, Bay of Plenty, North Island",
          "event": "hovering object with flashing lights",
          "description": "Clear conditions. Duration of sighting 20 minutes. This sighting occurred north of Katikati, near the Waihi Beach/Athenree turn-off. The witness had just let her cat outside when she noticed something flashing brightly which caught her attention. Approximately 1 km away she observed an object hovering just above treetop level, and above a gap between some trees. The object had bright flashing lights which were changing colour and it stayed very still all the time she observed it. While watching the object the witness rang her neighbour several times so he could observe the object as well, however her telephone line seemed to be blocked at the same time she was trying to make contact with someone. She knew her neighbour had binoculars, but she was too scared to cross the road to his house to get them. The witness stated she was shocked by what she had seen and felt her life may be changed forever because of it. Initially she tried to rationalise the object as a satellite or an optical illusion, while all the time she knew by its appearance and close proximity to the ground that it was not a satellite, and that she was actually seeing something anomalous. Initial report only; awaiting illustration from the witness. "
        }, {
          "time": new Date("August 26, 2012 00:00:00"),
          "region": "auckland",
          "location": "west Auckland, North Island",
          "event": "orange light",
          "description": "Calm clear night, with good visibility. Duration of sighting approximately 1 minute. The witness saw an unusual bright orange light in the sky and initially thought it must be an unusual plane. She pulled over to the side of the road to have a closer and longer look at it and tried to ascertain if there were any flashing/strobing lights, but there were none. She watched it move across the sky until it was out of view from her position. She then proceeded and spotted the light again continuing on its same course. The orange light was moving at about the same speed as an aircraft, however it became stationary a number of times before moving on smoothly. The second sighting of the light was witnessed by a family member. "
        }, {
          "time": new Date("August 20, 2012 00:00:00"),
          "region": "wellington",
          "location": "Naenae, Lower Hutt, Wellington, North Island",
          "event": "bright orange light with bright ‘burning’ appendages",
          "description": "The sighting occurred just prior to a thunder and lightning storm that hit this location from the south-west and continued for an hour. Duration of sighting approximately 5 minutes. Several witnesses were outside their house when they saw a glowing orange “burning” light in the sky travelling due west from the Eastern Ranges. The light moved in a radical fashion, sometimes hovering, sometimes climbing, then moving on a horizontal flight path towards the east before climbing vertically at a rapid rate until out of sight. It resembled a glowing aircraft with 'burning wings' or glowing appendages. Initially the light appeared from close to the horizon, moving at the speed of an aircraft. UFOCUS NZ comment: We have received numerous bright orange light reports over the last few years. More recently, we have been receiving reports of large orange lights with glowing appendages or ‘pods’. "
        }, {
          "time": new Date("August 17, 2012 00:00:00"),
          "region": "wellington",
          "location": "Otaki/Kapiti, North Island",
          "event": "intensely bright orange balls of light",
          "description": "Partly cloudy sky. Duration of sighting 5-10 minutes. Two witnesses observed an intense bright orange ball of light coming into view and moving very quickly from east to west over Otaki. The light rose in an arc but did not diminish in size and seemed to level out as it continued out over the sea towards Kapiti Island. The size, shape and intensity of the light did not alter as it passed. As the light was brilliant orange and there was no noise from the object, both witnesses ruled out helicopter, aircraft and hot air balloon as logical explanations, and commented the speed of light was much faster than any of these. About 30 seconds later after the first had disappeared over the sea, another two orange lights approached following exactly the same flight path and travelling close together. As these lights moved out over the sea, another two orange lights appeared. All travelled the same flight path, at the same speed and height from beginning to end. As the lights passed their position, the witnesses had the impression of a shape within the orange glow and described this as ‘a short tail, like a truncated tadpole’, with a small pulsating light at the end of it. "
        }, {
          "time": new Date("August 17, 2012 00:00:00"),
          "region": "auckland",
          "location": "Beach Haven, Auckland, North Island",
          "event": "large vivid red/orange light",
          "description": "Overcast conditions, thunderclouds to the west. Duration of sighting approximately 1 minute. The witness saw a red/orange single ball of light travelling at speed from west to east. She initially thought it was an aircraft, however there was no noise whatsoever and the colour of the light was sharp, vivid and bright. Radiating out from the orb were red/orange spikes of colour which became hazy around the edges, but still intensely bright, as the light traversed the sky. The witness’s view was clear and unimpeded and she watched the light move from half way across the sky to the horizon, which took approximately 1 minute. The light moved at a constant altitude and speed but with a slight jerking movement. "
        }, {
          "time": new Date("August 04, 2012 00:00:00"),
          "region": "wellington",
          "location": "Trentham, Upper Hutt, North Island",
          "event": "several orange/red lights",
          "description": "Starlit night with a few clouds and no wind. Duration of sightings approximately 3 minutes. The prime witness initially noticed an orange/red light in the sky and initially thought it was an unusually bright view of Venus. However the light was twice the size and brightness of Venus, and was slowly moving up from the horizon, so he thought that it may have been an aircraft. He then noticed a second similar light to the left of the first, and thought the lights were too close to be aircraft. Within a few more seconds, 3 more similar lights came into view over the northern horizon, estimated to be some 30km distant. He called his brother and wife and son outside to look. It became clear to the witnesses that they were not viewing aircraft, as the lights were pulsating orange (not flashing) and made no noise as they moved slowly north. Four of the lights suddenly disappeared or became obscured by cloud, but did not reflect any light on the clouds. Only one visible light was left, and this last light soon disappeared in a similar manner. The witness then telephoned a friend who lived in the same street to describe what he had seen, and while on the phone they both witnessed one more similar object come over the horizon and vanish in the same manner. All lights moved slowly along the same flight path, and maintained the same size and brilliancy throughout the sighting period. They left no tails, and the witness was positive that the lights were not Chinese lanterns as they were too bright and too far distant. "
        }, {
          "time": new Date("August 03, 2012 00:00:00"),
          "region": "northland",
          "location": "Kerikeri, Northland, North Island",
          "event": "several bright white balls of light travelling in unison",
          "description": "Sunny, blue sky with scattered clouds. Duration of sighting 5-8 seconds. The witness stated he lives high on a hill above a river valley with a 180° view of the surrounding area. He was working on his computer when his attention was attracted to several bright white objects moving across the sky in a westerly direction, travelling in unison, one behind the other. The witness guessed there were four or five but they were travelling so fast there could have been more. They were travelling approximately at the height of a skyscraper, and were approximately 600 m away from the observer. The witness assumed they were birds but as he looked closely, he managed to catch a clear view of the last two objects and realised they were not birds. He described them as being brighter than a light bulb. The bright balls of light made no audible sound as an aircraft would. "
        }, {
          "time": new Date("August 01, 2012 00:00:00"),
          "region": "auckland",
          "location": "Takanini/Papakura, Auckland, North Island",
          "event": "triangular object with coloured lights",
          "description": "Clear calm night, no clouds, no wind. Duration of sighting 30 minutes. Two witnesses, located in Mangere, were outside having a cigarette when they saw lights in the sky to the south over Takanini/Papakura. The lights remained stationary for at least 30 minutes, during which time the witnesses saw the object turn, revealing the form of a large triangular shape outlined by red, orange, blue, and white coloured lights. During the time the witnesses observed the lights one witness began to feel nauseated and had to go inside briefly. The second witness, his mother, also felt unwell while watching the lights, to the extent she had to hold onto the wall of the house as she went inside. UFOCUS NZ comment: The reporting witness experienced a close proximity sighting of a UFO in the past which caused shock, nausea, and electrical effects. The nausea experienced during this sighting may well have been triggered by memories of this previous event. However, this does not explain why his mother felt unwell as well. "
        }, {
          "time": new Date("July 28, 2012 00:00:00"),
          "region": "wellington",
          "location": "Raumati Beach, Paraparaumu, North Island",
          "event": "3 formations of red balls of light approaching from the sea",
          "description": "Cloudy conditions, clearing from earlier rain. Duration of sighting 60-70 seconds. The witness was in bed with the flu when she experienced the inexplicable urge to get out of bed and look out the window. Coming in over the sea from a north-westerly direction she observed three separate formations of red lights at medium altitude, moving slowly towards her position in the direction of the Tararua Hills. The separate formations were in a line across the sky and there was no noise associated with the sighting. The three formations of red lights moved away to the southwest, climbing faster than a normal passenger plane, and were enveloped by cloud. The last light to enter the cloud gave off a silver flash. The witness rushed to grab her camera and took two photos as the lights ascended however these are marred by camera movement. "
        }, {
          "time": new Date("July 28, 2012 00:00:00"),
          "region": "canterbury",
          "location": "Allenton, Ashburton, South Island",
          "event": "unusual orange/yellow ball of light",
          "description": "Clear starlit night, no wind. Duration of sighting approximately 3-5 minutes. The prime witness noticed a small slow moving light similar to a star, traveling in a south to north easterly direction. The object initially appeared low on the horizon, and as it ascended to pass over the witness's house, it increased in brilliance, becoming a big ball of orange/yellow light, brighter than any other object in the sky. The witness called her partner to see the object that was now the size of the witness's thumb nail at arm's length. As they watched, the object's speed increased rapidly, and its size decreased as it disappeared on an approximately 45 degree upward flight path. The light left no trail, and maintained the same brilliancy until just prior to disappearing high in the upper atmosphere. There was no noise or flashing lights associated with the passage of the object. "
        }, {
          "time": new Date("July 21, 2012 00:00:00"),
          "region": "hawkesbay",
          "location": "Waipukurau, Hawkes Bay, North Island",
          "event": "bright white round light",
          "description": "A light mist but the Milky Way was visible. Duration of sighting 2-3 seconds. The witness was walking his dog when he observed a round, bright white light that was distinctly well above the street lights and any trees in the vicinity. Its brilliance was piercing the light mist, and the light was remarkable due to its size and diameter. There was no sound associated with the light. "
        }, {
          "time": new Date("July 16, 2012 00:00:00"),
          "region": "auckland",
          "location": "Takapuna Beach, North Shore, Auckland, North Island",
          "event": "large orange orb of light",
          "description": "South easterly breeze 4-5 knots, clearing cloud cover at about 2000 metres, with misty rain. Duration of sighting 4.5 minutes. At 9.33 pm the witness was out on the street with his dog. Looking back towards his house he noticed a large orange orb of light above and beyond tree-line, moving in the direction of his house (from North east to the south east, towards Rangitoto Island). He watched the fast moving light for around 30 seconds and wondered what sort of aircraft it could be. Noticing there were no visible navigation lights, he wondered if it was a flare. However the light moved at varying speeds, up and down and at acute angles, pulsing and executing the changes in direction quickly. The light was an intense orange. The light then moved out over the Gulf at an estimated distance of 4-5 kilometres from Takapuna Beach, whilst gaining altitude at incredible speed. It disappeared into misty rain cloud. Initially the light he observed looked the size of a 20 cent coin held at arm’s length, decreasing to a ‘pin prick’ as it ascended and increased speed. The witness described the light’s speed as being faster than any known aircraft he has seen, and it manoeuvred in angular fashion, changing direction at extreme speed on two occasions during the sighting. Approximately 3 minutes or so into the sighting the witness called his wife to come outside, and she witnessed the last moments before the light disappeared. The witness noticed his dog behaved as if fearful during the event. "
        }, {
          "time": new Date("July 08, 2012 00:00:00"),
          "region": "bayofplenty",
          "location": "Golden Springs, Reporoa, Bay of Plenty, North Island",
          "event": "two large balls of red/orange light",
          "description": "Clear moonless conditions. Duration of sighting approximately 2-4 minutes. The witness was outside his house when he noticed two strange large balls of light coming towards him, moving just above the treetops behind the Golden Springs Motor Camp. The lights became stationary and hovered above the trees for around 30 seconds and then continued slowly in a northeasterly direction. To begin with, the lights were close together, around 50 metres apart and hovered at an altitude of around 100 metres. As the lights moved off they slowly split apart and headed off in different directions, gaining altitude as they progressed. The witness watched them for two minutes or so until they looked star-sized in the sky. The lights made no sound. "
        }, {
          "time": new Date("July 07, 2012 00:00:00"),
          "region": "bayofplenty",
          "location": "adjacent Hunters Creek, Tauranga Harbour, Tauranga, North Island",
          "event": "bright white disc-shaped object with 2 white v-shaped objects",
          "description": "Mainly clear blue sky with isolated cumulous clouds. Duration of sighting 5-10 minutes. The reporting witness, a retired commercial pilot, and friend were sailing on Tauranga Harbour north of Pahoia Point. They observed what they first thought was a plane releasing parachutists, as they could see two objects below and to the left of the main object. However the large disk shaped object was bright white in colour and not moving, and was much higher than a plane releasing parachutists would fly. Continuing to watch, they saw two stationary v-shaped bright white objects to the left, in the eight o'clock position from the main object. These smaller objects moved slightly together in the formation. The reporting witness went down into the cabin to fetch a camera while his friend sailed the yacht. On his return, the two v-shaped objects had gone and the large circular object had climbed and moved further distant and was now close to the base of a large cloud. The objects were airborne in the north east at an elevation of approximately 65° above the horizon, and at an altitude of approximately 10,000 to 20,000 feet. The witness commented that the circular object looked very large at this altitude, and so in reality it would be a very large object. "
        }, {
          "time": new Date("June 25, 2012 00:00:00"),
          "region": "northland",
          "location": "Hikurangi, Northland, North Island",
          "event": "bright white lights with pulsating coloured lights",
          "description": "Clear night, with lots of stars visible. Duration of sighting approximately 3-4 minutes. The witness was driving home from work when she sighted two strange white lights, similar to car headlights on full beam, low in the sky and approximately 700 metres from her. Below the two bright lights, was a pulsating green to amber light running left to right between the white lights. The witness went home to get her husband, but the object had disappeared by the time they returned to the site some two minutes later. The witness has previously seen similar unexplained objects, and advised us that her neighbours had also witnessed unusual objects in the sky in this area. "
        }, {
          "time": new Date("June 22, 2012 00:00:00"),
          "region": "wellington",
          "location": "Otaki, North Island",
          "event": "eight orange lights",
          "description": "Clear night, a few clouds and no wind. Duration of sighting approximately 1 ½ minutes. The witness was observing the night sky when she noticed a very bright, large round orange ball of light about a kilometre to the west of her position. A few seconds later seven more similar but smaller lights appeared behind the first one. The size of the lights gave the witness the impression that the first light was closer than the others. The witness initially thought the lights were helicopters, as they were at an altitude similar to what a helicopter or small aircraft would be at, but there was no sound. The lights all moved southwards in formation, then appeared to stop. From that point, the witness had the impression that the lights may have moved away very fast to the west, giving the impression of the lights “shrinking” in size and disappearing. The local police advised that they had received several reports of the same lights being sighted. UFOCUS NZ comment: Possibly Chinese lanterns, although the witness is adamant they were not. It is difficult to tell height and speed at night. Having said that, we have received many reports from the Kapiti area of orange lights approaching from out at sea, so we remain open on this sighting. "
        }, {
          "time": new Date("June 17, 2012 00:00:00"),
          "region": "northland",
          "location": "Kensington Park, Whangarei, North Island",
          "event": "erratically moving bright white light ",
          "description": "Daylight tending toward dusk, overcast sky, with light breeze. Duration of sighting approximately 60 seconds. The witness noticed a very bright light moving slowly in the sky, and initially thought it was a light plane, as it was moving at a comparable speed. The rapidly blinking light was below a cloud base estimated to be at an altitude of 3000-4000 feet and 5km distant. There was no associated sound, and the object made sharp side-to-side movements as it tracked in an east-west arc. The witness lost sight of the object when it was obscured by a tree. Almost immediately, another similar looking object appeared where the first light was initially seen. It subsequently followed the same flight path and movements, vanishing in a similar position. The witness initially thought that it may have been a model aircraft, but the very bright white light which appeared to be semi-circular in form, its erratic movements, and height and distance from the observer would tend to negate this. There were no other flashing colours or lights associated with the lights, as there would be on aircraft or helicopters. "
        }, {
          "time": new Date("June 09, 2012 00:00:00"),
          "region": "northland",
          "location": "12:00 am",
          "event": "changing coloured lights; orange orb",
          "description": "Cloudy, overcast sky with no wind. Duration of sighting approximately 6 seconds. At about midnight, during a break at a band practice, the witness saw what looked like a light aircraft coming towards land from out to sea. There was a flash of white and red light, and then the object stopped. It moved horizontally to the right, then back to the left and hovered. It then changed colour, becoming an orange glow. The witness called two other people to look at the light before it disappeared. The light was estimated to be at an altitude of 1 km, and the witnesses felt the light was ‘aware’ of them. "
        }, {
          "time": new Date("June 01, 2012 00:00:00"),
          "region": "bayofplenty",
          "location": "Pyes Pa, Tauranga, North Island",
          "event": "airborne white/silver disc observed from an aircraft",
          "description": "Daytime sighting; sunny sky with a few clouds. Duration of sighting approximately 30-60 seconds. The witness was on an Air New Zealand flight inbound to Tauranga from Wellington when he obseved a bright disc-shaped object airborne and beneath the airliner, in the vicinity of Pyes Pa Road, west of Tauranga. The disc was approximately 200 metres below the airliner, above tall pine trees, and estimated to be traveling 4-5 times as fast than the airliner. It was white/silver in colour, and appeared to have a curved top. It maintained a smooth flight path, and was not leaving a trail. Its size was similar to an old 50 cent coin held at arm's length, and gave the witness the impression that it was about 1/3 the size of the airliner. No lights were visible on the disc. It tracked to the southeast, left to right across the airliner's nose, and the witness lost sight of it as it disappeared towards Oropi and Rotorua. "
        }, {
          "time": new Date("May 30, 2012 00:00:00"),
          "region": "bayofplenty",
          "location": "Rotorua, North Island",
          "event": "bright white light at high altitude",
          "description": "Clear night, with moon and stars visible. Duration of sighting approximately 2 minutes. The witness was at a reserve when he noticed a bright white light moving across the eastern sky at a very high altitude. It was the size of a large star and he initially thought it was an aircraft, but there was no noise or associated aircraft lights. The light moved at a steady pace across the sky until it faded from view. The witness stated that the object's track was not that of a standard flight path for aircraft at Rotorua. "
        }, {
          "time": new Date("May 24, 2012 00:00:00"),
          "region": "auckland",
          "location": "Papakura/Manukau Harbour, Auckland, North Island",
          "event": "stationary bright white light. ",
          "description": "Clear night sky. Duration of sighting approximately 5 minutes. Two witnesses sighted a very bright light approximately 10 degrees above the horizon and some 4km distant. It was the size of a 10 cent piece held at arm's length, made no discernible sound, and was as bright as a full moon. During the sighting, the witnesses observed an aircraft transit underneath the object and managed to take a photo of the object before it subsequently ‘blinked out’. The reporting witness has seen such objects several times, and in one instance when viewed through binoculars, the object's shape changed from that of a circular light to a triangular shape, with red, blue and green lights rotating around the outside. "
        }, {
          "time": new Date("May 24, 2012 00:00:00"),
          "region": "auckland",
          "location": "Swanson, Waitakere City, North Island",
          "event": "slow-moving large orange ball of light",
          "description": "Overcast conditions. Duration of sighting 1 minute. The witness was driving to work when he noticed a very bright orange blurry ball of light moving slowly in the sky. He stopped and watched it for a bit and noticed another person nearby watching it also. The light was moving from northwest to south east, before suddenly changing direction and moving towards the east. The witness estimated the light to be around 3 km distant."
        }, {
          "time": new Date("May 23, 2012 00:00:00"),
          "region": "canterbury",
          "location": "Rolleston, Selwyn, South Island",
          "event": "bright rod-shaped object high in the sky",
          "description": "Blue sky with very few clouds and no wind. Duration of sighting approximately 5-6 minutes. Two witnesses sighted a bright rod-shaped object estimated to be approximately 50,000 feet high in the sky. In length, the object was half the length of the witness's little finger held at arm's length, making it very long and large in size, considering its estimated altitude. No noise was discernible as it moved slowly, stopped, and then moved slowly again in a steady line. The object subsequently changed course toward Christchurch city, increasing speed and disappeared from view. UFOCUS NZ comment: See similar report Saturday 28 April. "
        }, {
          "time": new Date("May 21, 2012 00:00:00"),
          "region": "wellington",
          "location": "Upper Hutt, Wellington, North Island",
          "event": "two white lights, one behind the other",
          "description": "Duration of sighting 25-30 seconds. A witness observed to fight lights, one closely followed by another directly behind it, heading in this direction. The lights were about 60° above the horizon, moving from NNE, and after about 20 seconds they made a swift and abrupt turn towards the east. The turn took only about five seconds and there was no noise associated with the sighting. The witness stated the second light was slightly dimmer, and was possibly a light on the same object as the first bright light. There were no visible strobe or wing lights as an aircraft would have. "
        }, {
          "time": new Date("May 21, 2012 00:00:00"),
          "region": "marlborough",
          "location": "North of Kekerengu, South Island",
          "event": "falling bright green light",
          "description": "Clear sky with stars visible. Duration of sighting approximately 3-4 seconds. Two witnesses sighted a large, bright green light falling vertically from high in the sky. It disappeared behind nearby hills and a resultant flare of bright green light lit up the hilltops. No noise was heard. UFOCUS NZ comment: It is possible the light observed was a meteorite falling to earth, as throughout May the Eta Aquarids meteor shower was occurring. "
        }, {
          "time": new Date("May 19, 2012 00:00:00"),
          "region": "canterbury",
          "location": "Timaru, South Island",
          "event": "7 elliptical orange lights",
          "description": "Clear, starry evening. Duration of sighting 8 to 9 minutes. A witness observed seven slightly elliptical, bright reddish-orange lights at an altitude of approximately 1000 to 2000 feet, in the sky to the south, travelling northwards near the South Beach, towards Timaru. The lights were spaced apart, travelling quickly and silently. The lights faded out one by one as they neared Timaru. The witness phoned a friend in another part of town, 1/2 km west of this location, and asked him to look due east for these lights low in the sky over the South Beach. The second witness confirmed the sighting. The reporting witness stated that at one time there were two lights closer together, and one of them delivered what he described as a “large bluish-white ‘pod’, as opposed to a beam of light”, down in a curving direction towards the ocean. This happened in a split-second. UFOCUS NZ comment: We asked the witness if he thought these lights could have been Chinese lanterns. He responded: “This possible explanation in no way fits the bill with the sighting due to the obvious controlled movement that these lights display. The lights ‘turned off’ in total contrast to the fire of a lantern burning out, and all ‘switched off’ upon reaching the same location and coming to a stop. I've never seen the intense colour of those red-orange lights, let alone the shape of them, anywhere. Also please note the blue pod description, with respect to the speed of its descent - nothing falls naturally that fast.” "
        }, {
          "time": new Date("May 19, 2012 00:00:00"),
          "region": "bayofplenty",
          "location": "Tauranga, Bay of Plenty, North Island",
          "event": "white/silver oval object ",
          "description": "Clear, weather conditions, no clouds. Duration of sighting 30 seconds. The witness was driving from Mount Maunganui towards Tauranga when to her right in the sky she observed a perfect white oval (or circular) object over the city of Tauranga, heading out towards the sea in an easterly direction. At first the object was moving slowly, but it began to increase speed, turning in a northerly direction. The witness noticed that as the object turned the colour changed from white to a translucent/silver appearance (perhaps a highly reflective surface). Within a couple of seconds the object vanished from view into the sky. The witness stated the object was high in the sky and when it increased speed, it moved faster than a jet. "
        }, {
          "time": new Date("May 19, 2012 00:00:00"),
          "region": "auckland",
          "location": "Te Atatu South, Auckland, North Island",
          "event": "large oval yellow-orange light",
          "description": "Clear, windless evening. Duration of sighting approximately 1 minute. Two witnesses were driving home approaching an intersection at Braebank Lane and Covil Ave, when they noticed a large rounded (slightly oval) orange-yellow light in the sky, estimated 1 to 2 km away. They pulled the car over to the side of the road to observe it and wound down the window to see if they could hear the sound of a helicopter, however there was no noise associated with the light. They then observed a small green/blue light flash from one part of the large light. Not wishing to hold up traffic the witnesses continued home, but later regretted not watch the light for longer. The reporting witness was surprised she was initially so quick to dismiss the light as a helicopter considering the appearance and colours of the light were not those required by law to be displayed on a helicopter. "
        }, {
          "time": new Date("May 18, 2012 00:00:00"),
          "region": "canterbury",
          "location": "Dallington, Christchurch, South Island",
          "event": "bright off-white light traveling at speed",
          "description": "The witness and his wife saw a bright light approaching from north of their position, traveling at speed and without sound. The witness stated the light would have been at an estimated altitude of 3000-4000 feet. What really caught the witness's attention was the complete absence of flashing wing-tip lights and/or tail lights. The light was bright off-white in colour, about the same brightness as the landing lights of an incoming jet. When the light reached a point approximately north of the Palms Shopping Centre, it turned to the left approximately 45 degrees, and continued toward the Port Hills. The witness estimated the light traveled some 20 nautical miles in 1 minute, which gave it an approximate speed of 1200 knots (2200 kms per hour) – at least 3-4 times the speed of an airliner in a similar position. It maintained a level flight path, and it did not change in shape, intensity or speed throughout the sighting period. The witness holds a private pilot license and is very familiar with aircraft types and flight paths associated with Christchurch airport. "
        }, {
          "time": new Date("May 14, 2012 00:00:00"),
          "region": "northland",
          "location": "Puketona Junction, south of Kerikeri, North Island",
          "event": "silver object with erratic flight path/ green-blue lights",
          "description": "Clear sky with stars and moon visible, and distant lightning storm. Duration of sighting approximately 4 minutes. The witness sighted a very large red light some 300m above the ground and approximately 600m distant from him. The witness then observed the red light change revealing a large slim silver coloured object that had 5 slender green/blue lights underneath it. The object darted south to north toward the lightning several times at very high speed, and then was observed to make some very large circles at a slow speed before disappearing in a big flash. No discernible sound could be heard. UFOCUS NZ comment: See similar sightings: Saturday 28 April and Wednesday 23 May "
        }, {
          "time": new Date("May 12, 2012 00:00:00"),
          "region": "bayofplenty",
          "location": "Whakatane, Eastern Bay of Plenty, North Island",
          "event": "two large oblong orange lights",
          "description": "Clear conditions. Duration of sighting 30 seconds. Three witnesses observed two large orange lights approaching from over the Whakatane Board Mills, heading north past the Whakatane River mouth. They described the lights as oblong (possibly circular) in shape. The witnesses grabbed binoculars to observe one of the lights and were able to see the orange light was on the front of a disc-like object. The lights were relatively close to their position at an estimated distance of 1 km. "
        }, {
          "time": new Date("May 12, 2012 00:00:00"),
          "region": "auckland",
          "location": "Brookby/Whitford/Beachlands, Auckland, North Island",
          "event": "circular object with red, blue and white flashing lights",
          "description": "Light cloudy conditions. Duration of first sighting 1 to 2 minutes, second sighting approximately 20 seconds. The witness was driving home when he observed an object with flashing lights at low altitude, possibly some 1 to 2 kilometres distant. The witness described the object as circular with two or more red flashing lights on one side of it, with two or more blue lights on the other side. He also described a bright white light in the middle of the object, the like of which he had never seen before due to its unusual appearance and glow. No wings or tail were visible, although the witness stated it was hard to see the outline of the object as the lights flashed on and off. At this stage the witness wound down his window to see if he could hear the sound of helicopter rotor blades or an aircraft, however there was no sound associated with the sighting. The object travelled slowly and turned briefly towards the witness’s position before continuing on its course, which made him believe it was not an aircraft. The witness made two sightings of the object as it passed in and out of low cloud. He first sighted the object as it was headed in a south-westerly direction over Whitford towards Brookby and the object was visible for up to 2 minutes. The second sighting occurred 10 minutes later when he again saw the object at an estimated distance of 10 to 15 km north-east of where it was first sighted, now heading in a more southerly direction before disappearing into cloud. The witness was unsettled by the sighting. "
        }, {
          "time": new Date("May 12, 2012 00:00:00"),
          "region": "waikato",
          "location": "Ohaupo, Waikato, North Island",
          "event": "three reddish objects in formation",
          "description": "Clear sky with moon and stars visible. Duration of sighting approximately 5 minutes. Three witnesses sighted 3 reddish coloured lights very high in the sky, moving much slower than an aircraft would, tracking east to west. The lights were in a triangular formation, the size of the formation being as large as a thumb held at arm's length. The 3 lights were the size of individual stars, and not quite as bright as Venus. As the witnesses watched, all three lights moved closer together, then the middle and top lights moved closer together again, as the top light faded away, followed by the other two in succession. The sighting occurred over farmland."
        }, {
          "time": new Date("April 28, 2012 00:00:00"),
          "region": "canterbury",
          "location": "Christchurch, South Island",
          "event": "long rectangular ‘rod-shaped’ object emitting blue-green light",
          "description": "Clear sky with 60-100 km visibility. Duration of sighting up to 10 minutes. The witness is a former air force member and was fully aware he was not observing any known aircraft. The witness was checking the security of a large building in a paddock when he saw an aerial object approaching. He described it as being ‘rod-like’, a grey cylinder approximately 30-40 metres long. It approached very slowly over the paddock from the south heading east, before picking up speed, turning in an arc over the buildings towards the north, before heading west. The witness was close enough to observe the object in some detail as it passed very close to him. He described it as having two stories, the top story appearing to be a dark charcoal colour, while the lower story emitted a bluish-green light. There were red and blue lights moving (flashing in rotation) along the bottom of the object. It did not have wings, tail or windows. The object was large enough to block out a section of stars in the sky. The object disappeared in a westerly direction, picking up speed from approximately 50 km an hour to in excess of 100 km an hour in only 4-5 seconds. The witness commented he could ‘feel’ the noise the object made on his head, shoulders, and down his arms, like a low-level vibration. He felt ill for four days following the sighting. "
        }, {
          "time": new Date("April 22, 2012 00:00:00"),
          "region": "auckland",
          "location": "Manukau, Auckland, North Island",
          "event": "large unusual light",
          "description": "Clear, starry sky. Duration of sighting approximately 20 minutes. Three witnesses observed an enormous bright light which was star-like, with constantly flashing clear lights that had red/blue tinges. The light moved about slowly, becoming stationary and hovering in one place for 10 minutes, before disappearing. "
        }, {
          "time": new Date("April 22, 2012 00:00:00"),
          "region": "manawatu",
          "location": "Taumaranui, King Country, North Island",
          "event": "cylindrical white-yellow light",
          "description": "Cloudy, overcast sky. Duration of sighting approximately 6 seconds. Two witnesses sighted a long bright luminous white-yellow light, cylindrical in shape, which cross the sky from north-west to south-east in a roughly horizontal path. (The witnesses stated if they held their hand at arm's length, with the distance between thumb and forefinger at about 2 inches, this was the size it appeared in the sky.) They made three sightings of the cylindrical light as it passed in and out of clouds at high speed. They could see no evidence of wings or tail, and the light/object was silent. "
        }, {
          "time": new Date("April 21, 2012 00:00:00"),
          "region": "canterbury",
          "location": "Otematata, Waitati Valley, North Otago, South Island",
          "event": "slow moving, bright, magenta/pink light",
          "description": "Clear sky with stars and excellent visibility. Duration of sightings approximately 2-3 minutes each, with a total of 3 such sightings between 8.30 and 10.30 pm. Five witnesses sighted a slow moving, bright, magenta/pink light moving in an arc from east to west of their position, appearing to circle the Benmore Dam. The light slowly arced away from the witnesses and disappeared. It was estimated to be at an altitude of about 1000m and 3-4 km distant from the witnesses, although distance was difficult to judge given the hilly terrain.The light was first seen due north of the viewing position, moving in a westward direction in a slight arc, covering an estimated 2 km in radius. It reappeared about ten minutes later, following the same flight path.  The witnesses considered it might be a glider, except it was nighttime and cool (so no thermals). At this point the witnesses went away from the area for some time and on returning at around 10.30 pm, they observed the light again, following the same flight path.The light was much larger in relative size than any of the stars visible. It was steady in brilliancy, with no blinking/strobes or navigation lights visible and made no discernible sound (eliminating the possibility of it being an aircraft).It maintained a level flight path, moved laterally with no sinking and so was not a flare, and was most unlikely to have been a helicopter or remote controlled aircraft. The light reappeared some 10 minutes later following the same flight path, before gradually fading away, and this same scenario was repeated again about 10:30pm. UFOCUS NZ comment: The reporting witness is a scientist."
        }, {
          "time": new Date("April 21, 2012 00:00:00"),
          "region": "bayofplenty",
          "location": "Te Puna, Bay of Plenty, North Island",
          "event": ": two large orange lights ",
          "description": "Mainly clear sky, some high cloud. Duration of sighting approx one minute. A witness sighted two large orange lights over, or east of Matakana Island, Tauranga Harbour. The witness observed the lights as they were rapidly rising vertically in the air, one slightly behind the other, as they disappeared upwards into high cloud. The witness at first thought they were flares and rang the Tauranga police, who stated they had received a number of calls from people who had sighted these orange lights over Tauranga and the sea. They were not distress flares and police had no explanation for them. A plane landed at Tauranga airport at this time, and the witness believed the lights would have been visible to pilots and passengers. "
        }, {
          "time": new Date("April 21, 2012 00:00:00"),
          "region": "bayofplenty",
          "location": "Waihi, Hauraki, North Island",
          "event": "large flashing light",
          "description": "Weather moderately cloudy. Duration of sighting one minute. For witnesses observed a bright white light literally “appear” in the sky. The light continued in a south-southeast direction, flashing at seven second intervals as it disappeared into the distance. From the position the observer's first saw the light, to where it disappeared from view into the distance, covered a time span of 60 seconds. "
        }, {
          "time": new Date("April 20, 2012 00:00:00"),
          "region": "bayofplenty",
          "location": "Otumoetai, Tauranga, Bay of Plenty, North Island",
          "event": "large orange light ",
          "description": "Clear visibility, light cloud, no wind. Duration of sighting three minutes. Three witnesses observed a large orange light moving from west to east, which he described as “about the size of a helicopter” and travelling approximately at the height the witnesses are accustomed to seeing aircraft in the area. While travelling on its west to east course the light was seen to slow, increase speed, become stationary, before moving towards the witnesses and ascending high into the sky into cloud. "
        }, {
          "time": new Date("April 20, 2012 00:00:00"),
          "region": "canterbury",
          "location": "Hornby, Christchurch, South Island",
          "event": "bright white light moving erratically",
          "description": "Partly cloudy sky. Duration of sighting several seconds. The witness saw what he thought was a bright shooting star, until the light changed direction in a 90° turn from a northerly track, to the east, and then turned back towards the west, disappearing behind cloud. The light was bright white and moving at speed. "
        }, {
          "time": new Date("April 20, 2012 00:00:00"),
          "region": "canterbury",
          "location": "Christchurch, South Island",
          "event": "formation of orange lights at altitude",
          "description": "Clear sky with stars visible. Duration of first sighting 5-6 minutes and second sighting 2-3 minutes. Two witnesses sighted a formation of five bright orange/red lights tracking from north to south at a high altitude. The lights were not flickering, and did not have aircraft navigation/hazard lights. They traveled at a constant speed, similar to that of a jet airliner, in a smooth and level flight path with no associated sound discernible. The first 2 lights were close together, with the following 3 lights in a looser formation. The witness estimated the objects were some 5-6km distant, and were the size of his index fingernail at arm's length. The objects subsequently faded away to the S/SW. The second sighting occurred approximately 10 minutes later when the witness sighted a 6th object of the same brightness and size, traveling in the same manner as the previous five. This object also faded away to the S/SW. The witness checked with Christchurch Air Traffic Control who advised that there had been nothing recorded on radar. He also checked with the Christchurch Police who advised that they had not received any sighting reports. "
        }, {
          "time": new Date("April 20, 2012 00:00:00"),
          "region": "canterbury",
          "location": "Russley, Christchurch, South Island",
          "event": "several very large orange lights",
          "description": "Perfectly clear sky. Duration of sighting approx one minute. The witness noticed a large orange sphere of light appear “out of nowhere”, moving silently across the sky at a relatively low speed. A second light appeared following the same path, followed by further for lights, all moving in a southerly direction. None of the lights fell to the ground or burned up as Chinese lanterns would. The lights continued until they disappeared from the witness’s view. The latter lights were witnessed by a second person. "
        }, {
          "time": new Date("April 19, 2012 00:00:00"),
          "region": "auckland",
          "location": "Stanmore Bay, Auckland, North Island",
          "event": "large orange light",
          "description": "Still night, light cloud. Duration of sighting just over 5 minutes. Two witnesses observed a large orange light moving at speed across the sky from east to west, which at first they thought was a small plane on fire (the light was travelling at a similar speed to a small plane). When viewed through binoculars they saw that the orange light was a similar shape to a balloon (teardrop). As the light headed west it began to fade and after five minutes or so it was no longer visible. "
        }, {
          "time": new Date("April 17, 2012 00:00:00"),
          "region": "auckland",
          "location": "over Waitemata Harbour/Rangitoto Island, Auckland, North Island",
          "event": "two sets of bright orange lights ",
          "description": "Duration of sighting 3 minutes. A witness observed two bright orange egg-shaped lights moving one behind the other, from the south east to the north east, passing from Onehunga towards the Waitemata Harbour and Rangitoto Island. Five minutes later, he sighted another set of two lights passing over in the same direction, moving in unison, but changing position. The intensity of the lights lessened as they moved towards the coast. "
        }, {
          "time": new Date("April 15, 2012 00:00:00"),
          "region": "auckland",
          "location": "Manukau, Auckland, North Island",
          "event": "large circular object high in the sky",
          "description": "Cold clear night sky, with stars visible. Duration of sighting approximately 5 minutes. Two witnesses sighted an object that was larger than an aircraft, and estimated to be 1-5 miles distant, at an altitude a jet airliner would fly. It appeared circular in shape with many lights that were rapidly blinking. The object was moving slowly, and at one stage remained stationery for at least 2 minutes. It was much bigger than an aircraft and this was reinforced by their sighting of an aircraft in the sky during the sighting period, but not near the unidentified object. The object subsequently disappeared from view by slowly moving off and fading away. "
        }, {
          "time": new Date("April 13, 2012 00:00:00"),
          "region": "canterbury",
          "location": "Greta Valley to Christchurch, Canterbury, South Island",
          "event": "large white light moving erratically and hovering",
          "description": "Clear, starry night; some broken cloud approaching Christchurch. Duration of sighting one hour. A witness travelling long distance from Kaikoura south, observed a large white light in the sky as she approached the Greta Valley, North Canterbury. She described it as a white misty light surrounding a ‘solid’ white centre. The light was visible throughout the next hour as the witness travelled further south to Woodend and the start of the Northern motorway into Christchurch, where she lost sight of the light due to strong street lighting. During the hour she observed the light, it ascended and descended, sometimes hovering and then travelling quickly across the sky for1/2 – 1 kilometre before stopping and hovering again. At other times the light would travel further south, before returning and sweeping across in front of the witness, moving over distance between the highway and the coastline. Overall, the witness reported the light was visible moving to her left (east) near the sea for most of the hour, the balance of the sighting time taking place to the west or south of her position. She observed the light become stationary at times for 30 seconds and at other times for up to 2 minutes. Occasionally the light was lost from view beyond pine trees. At one point early on in the sighting the witness began to doubt what she was seeing and wondered if she was seeing a light from her dashboard reflected on her windscreen, so she stopped the car, got out, established the light was in fact in the air and watched it for at least 25 minutes. During this time she saw the light move erratically as described above. "
        }, {
          "time": new Date("April 06, 2012 00:00:00"),
          "region": "auckland",
          "location": "Massey, Waitakere, Auckland, North Island",
          "event": "dark grey triangular object",
          "description": "Slightly overcast weather conditions. Duration of sighting 30 to 40 seconds. The witness was sitting outside on her deck when she heard what she first thought was the sound of the plane, but noted the sound was somewhat different - a low, constant thrum with no variation in sound. She observed an object appear beyond the eaves of her house at an estimated height of 100 250 feet. It was a large grey, almost perfect triangular shape, like a thick wedge. It had large white rectangular lights at the back of it that glowed brightly but did not create an external radiant beam (like a headlight of a car would do). It was moving very slowly (when compared to a commercial airliner) from north east to west in the direction of Muriwai Beach and the witness commented if it had been an aircraft it would have fallen out of the sky. The depth of the object from the bottom to the top edges was the same throughout the length and shape of the object. The witness did not observe any undercarriage was wheels and it did not have the usual coloured lights on its wing tips that an aircraft would have. It had no lights at all except at the rear end. The object moved with a point forward, and a flat side of the triangle at the back. The object was lost from view beyond a high hedge. The witness gauged the size of the object as seen in the sky, as being the size of both hands held together at arm’s length. The sighting was witnessed by a second witness who did not wish to be identified. The reporting witness also saw an orange glowing ball of light moving slowly in the sky on the same evening. "
        }, {
          "time": new Date("March 24, 2012 00:00:00"),
          "region": "auckland",
          "location": "Kaukapakapa, North Island",
          "event": "large orange orb",
          "description": "Cloudy, overcast sky. Duration of sighting approximately 6 seconds. Two witnesses were watching TV when they sighted a massive orange orb fly past their floor-to-ceiling windows. They ran outside and saw that the orb was positioned above adjacent trees and that no sound could be heard. The object was in the northern part of the sky traveling east to west. At one point it stopped, then sped up toward the southwest where it disappeared. One witness belongs to the Auckland Astronomical Society and is familiar with natural atmospheric phenomena, and is positive that the large orange orb seen did not comply with fireball/meteorite criteria. "
        }, {
          "time": new Date("March 23, 2012 00:00:00"),
          "region": "auckland",
          "location": "North Shore, Auckland, North Island",
          "event": "bright orange light",
          "description": "Clear still night. Duration of sighting several seconds. Two witnesses were sitting on their deck with a clear view across the harbour to Rangitoto Island. They observed a bright orange light moving from above the central city area, north towards the North Shore. During this time the light changed direction erratically a couple of times, and then moved quickly upwards and out of sight. There was no noise associated with the sighting. The witnesses initially thought it was a flare from a boat, but after a few seconds realised it wasn't. The light was low, large and bright orange in colour. "
        }, {
          "time": new Date("March 15, 2012 00:00:00"),
          "region": "northland",
          "location": "Western Hills, Whangarei, North Island",
          "event": "object with rotating blue, red, white lights",
          "description": "Dark cloudy night sky. Duration of sighting approximately 20 minutes. Two witnesses observed a white light with red and blue lights around it above a hill near their house. At first they thought it was a star, and then realised it was too bright and so considered it may be a helicopter. One witness went outside and noticed there was no sound of an aircraft, and that the light was very bright now and moving slightly. He looked through binoculars and saw a circle of lights rather like a ring of white LEDs, shining in such a way that they were neither pointing downwards or sideways. The ring of lights had red and blue lights rotating around it. The witness called to family members who also observed the lights through binoculars. All witnesses then noticed a second set of lights above and behind the first, which was now getting bigger and descending towards the observers. They also sighted a cluster of disc-shaped luminous objects positioned several hundred metres above the trees on the hill less than 1 km away from the observers. The rotating lights appeared to descend to low level, or land, behind trees on flat farmland nearby. They illuminated the trees in the distance for a few moments as they descended towards ground level. The second cluster of lights the witnesses had observed now moved away from them and became less distinct, before vanishing altogether. The sighting occurred in a rural area and was witnessed by five adult witnesses who were confused by what they had observed. The reporting witnesses stated, “These could not have been helicopters unless they were electric and silent! No aircraft that I know of have rotating red lights like a pinball machine.”  UFOCUS NZ Comment:  Possibly remote controlled hobby planes with LED lights, although the lights were seen to hover and move slowly."
        }, {
          "time": new Date("March 10, 2012 00:00:00"),
          "region": "auckland",
          "location": "O'Neill's Beach, Waitakere, North Island",
          "event": "bright orange light changing shape",
          "description": "Clear sky with few clouds and very light wind sea to land. Duration of sighting approximately 10 minutes. The two witnesses were on the beach watching the stars, when they sighted a small orange light that appeared to be about 4km out to sea, just above the horizon. They initially thought it was a fishing boat, but as they watched, the orange light increased in brilliance and size, and rapidly changed to a sail-type shape, then into a larger hot orange coloured oblong shape with one rounded end. (The oblong shape was described as being the size of the witness's thumb nail with the hand held at arm's length.) The object gave the appearance of being like plasma. As they watched, another similar oblong shape appeared above the first, and both seemed to be linked by a narrow band. This seemed to be expanding towards the witnesses, and this frightened them. They started running down the beach, and when they looked back the oblong lights had disappeared, to be replaced by a very bright white star-like light rising up from the same position. The witnesses could make out a similar oblong solid shape surrounded by the white glow. As this object moved fast upwards on a curved flight path, its brilliance shone on both the adjacent clouds and the sea/beach. There was no sound associated with the lights, and no “tail” or trail behind it. The light finally disappeared as it moved to higher altitudes. The witnesses have previously observed satellites and shooting stars, and were positive the orange light did not fit those categories. "
        }, {
          "time": new Date("March 08, 2012 00:00:00"),
          "region": "otago",
          "location": "South Dunedin, Dunedin, South Island",
          "event": "object with blue, red, white lights moving erratically ",
          "description": "Clear, starry night with moon. Duration of sighting 20 seconds. Two witnesses were leaving a house in South Dunedin when they spotted a bright star-like object with blue, red, and white lights. They were looking south east towards the ocean and the light was moving from south to north. At first the witnesses thought the light must be a satellite, until it began moving erratically in a zigzag motion. This erratic movement was very fast and following this, the light carried on in a northerly direction in a straight line parallel with the horizon.  As it moved further south it lost its intensity and brightness. The sighting lasted 20 seconds and this was the amount of time it took for the light to move from far south to far north, until out of sight. "
        }, {
          "time": new Date("February 28, 2012 00:00:00"),
          "region": "northland",
          "location": "Onerahi, Whangarei, North Island",
          "event": "white circular object",
          "description": "Clear blue sky. Duration of sighting 1 minute. The witness was approaching Whangarei Airport by vehicle when she sighted a distant object, stationary in the sky. The object was small, white and circular. She pulled over to the side of the road to take a good look at the object, but upon looking back at the sky, the object had disappeared. UFOCUS NZ Comment:  Possibly landing lights of an aircraft, which would disappear as the aircraft executed a turn."
        }, {
          "time": new Date("March 08, 2012 00:00:00"),
          "region": "eastcape",
          "location": "Gisborne, North Island",
          "event": "white light with blue and red flashing lights",
          "description": "Clear starry sky. Duration of sighting 10 minutes. Two witnesses were inside watching TV when they noticed two very bright white lights through the window. They went outside and watched as the lights moved silently around in the sky. One of the lights then descended behind hills and out of sight, while the other moved upwards and changed appearance with blue and red lights now flashing in a triangular configuration. This light ascended higher in the sky very rapidly until it was out of sight. "
        }, {
          "time": new Date("March 05, 2012 00:00:00"),
          "region": "auckland",
          "location": "Auckland City, North Island",
          "event": "white object high in the sky",
          "description": "Clear blue sky. Duration of sighting approximately 2 minutes. The witness sighted a white object very high in the sky that appeared to be carrying out shaky hovering manoeuvres. Distance from the observer was estimated to be 5km, and the object did not appear to be an aircraft. The witness turned away to call over a colleague, but when she turned back the object had disappeared. "
        }, {
          "time": new Date("February 27, 2012 00:00:00"),
          "region": "canterbury",
          "location": "Christchurch, South Island",
          "event": "falling bright light/dark object",
          "description": "Clear night sky, excellent visibility. Duration of sighting 30 seconds. The witness’s attention was drawn to a bright pulse of light near a small plane that was flying over eastern Christchurch/Godley Head/banks Peninsular areas. The witness went outside to investigate and saw a bright white light fall vertically in the sky near the aircraft. At first the witness thought something had fallen off the plane, but realised the plane was actually too far away from the light for that to be the case. Shortly after (some 10 to 20 seconds) he saw a dark object moving across the sky away from the area where the light had “stopped falling”. This dark object was heading east to west towards Christchurch. It then lit up very spectacularly with a bright head and fiery tail, like an old-style rocket with sparks out the back. It moved upwards, initially slowly but gathering speed, and finally accelerated very quickly upwards and away, disappearing into the night sky. The witness observed the speed at which it accelerated was faster than a jet could achieve. The witness estimated the light/object was under 2000 feet altitude, at a distance of approximately 10 km. The small aircraft seen in the sky at the time of the fighting was moving away from the light as the light descended, and also when the object accelerated away, so it is possible the pilot did not witness the event. "
        }, {
          "time": new Date("February 16, 2012 00:00:00"),
          "region": "auckland",
          "location": "Long Bay, Auckland, North Island",
          "event": "silver/white bullet/cylindrical-shaped object",
          "description": "Mostly clear blue sky with a few clouds. Duration of sighting 20 to 30 seconds. The witness was outside when she heard a noise similar in volume to a large aircraft, but distinctly different in sound. While searching the sky for a plane, the witness saw a silver/white bullet-shaped object shoot across the sky, from south to north. The object was oval shaped with rounded ends, with no wings or tail. The witness was astonished when not long after she observed another object the same as the first, following it in the same direction from afar. Both objects were travelling at the speed of a jet aircraft. UFOCUS NZ Comment:  We have received reports of silver bullet shaped objects over recent years.  See 'Articles' page to read about a spate of such sightings around Thames and the Coromandel Peninsula."
        }, {
          "time": new Date("January 21, 2012 00:00:00"),
          "region": "auckland",
          "location": "Kumeu, north of Auckland, North Island",
          "event": "pale orange lights arcing across sky",
          "description": "Clear sky. Duration of sighting approximately 4 seconds. A witness observed a pale orange light travel across the sky at considerable speed and height. The light appeared to ‘bounce around’ as it traversed the sky, and moved away from the observer. The witness had seen a similar light earlier in the evening, and again the following night. He rang Auckland’s Stardome Observatory and was told Whenuapai Airbase may have been involved in night activities. However the witness did not think the light resembled an aircraft’s speed or light configuration, or red flare. UFOCUS NZ comment: The Eta Carinids meteor shower peaked on Saturday 21 January, and the witness may have observed meteors entering the atmosphere. "
        }, {
          "time": new Date("January 20, 2012 00:00:00"),
          "region": "auckland",
          "location": "Snells Beach, Warkworth, Auckland, NI",
          "event": "orange lights in formation ",
          "description": ""
        }, {
          "time": new Date("January 14, 2012 00:00:00"),
          "region": "auckland",
          "location": "Pukekohe, North Island",
          "event": "bright yellow light moving erratically",
          "description": "Fine conditions with mild to moderate cloud cover, westerly wind, starry night, good visibility despite darkness. Duration of sighting 25-30 minutes. No other aircraft in the sky at the time or sounds of aircraft. The witness was standing on his porch after finishing work late. Looking to the west (Pukekohe/Karaka/Patumahoe area) he noticed a bright yellow light, consistent with the size of a bright star, which he gauged to be travelling slowly from west to east towards his position. He estimated the distance to be 10-15 km away. The light became stationary before moving back in the opposite direction to the west at slow speed. The witness could not hear any sound from the light, as commonly heard from aircraft on flight paths to the west with the wind blowing from that direction. The light suddenly increased in brightness and then disappeared “as if someone had turned a light switch off.”The witness continued to watch the sky and shortly after the light reappeared, but not as bright as it was previously. He sat on a chair to stabilise body movement, so as to ascertain if the light was moving in relation to his surroundings. The light moved east, became stationary briefly, then moved west at a slower speed over a period of 5-10 minutes. The intensity of the light remained consistent. The light made another turn and moved slowly south. After observing the light for a total of 25-30 minutes, the witness saw it ‘switch off’ again (or go behind cloud). The witness is familiar with local aircraft flight paths and stated he had never seen an aircraft in that particular direction or area, and had never observed an aircraft move in this manner. The light was moving over distance at a lower altitude than commercial aircraft on flight paths further northwest. UFOCUS NZ comment: Detailed diagram/map provided. "
        }, {
          "time": new Date("January 08, 2012 00:00:00"),
          "region": "waikato",
          "location": "Pukeatua, Waikato, North Island",
          "event": "orange light/craft at low level seen on numerous occasions",
          "description": "The witness reported that over the last 8 years he had seen the same airborne object carrying out the same manoeuvres in the same location on various dates, the last one being on Sunday 8/1/12. The sightings usually occur on clear nights around midnight, when the adjacent landscape is visible, giving the witness good reference points to gauge the size and location of the object. Sightings usually last some 3-5 minutes. The object appears from behind a forested hill 3km to the west (position A on the photos), and maintains a level flight path some 500 feet above ground level. It initially appears as a large bright yellow/orange ball of light, which then decreases in brilliancy. It moves down the valley at a speed similar to that of a helicopter. First appearing as a ball of light, the brilliance then diminishes and it becomes a creamy-grey colour. At this point an object is able to be seen within the glow. Using binoculars the witness is able to see a distinct oblong shape with rounded ends, and there also appears to be a row of windows along the centre, as well as a small flashing orange/red light. The object hovers at the southern-most point of the flight path for about a minute, and at this point is the size of half a thumb with hand held at arm’s length, estimated as the size of a large 4-5 seater helicopter. Often the intensity of the glow around the object increases, giving the appearance of a power increase, and making the object difficult to see. The brilliancy then decreases and the object will reappear and move slowly back up the valley to disappear behind the ridge at the position it initially appeared. The witness stated he can easily hear aircraft and helicopters operating in this area, but this object makes no sound at all. The appearance of this light/object sets all the local dogs barking. On one occasion the witness noticed his bedroom was lit up from outside, and looked out the window to see the light/object. On another occasion, neighbours were working late in their shed when they noticed light blazing outside. They turned to investigate and saw the light/object, which immediately disappeared (went out). The witness reports that on these occasions it was as if the light/object “knew what they were thinking,” or that it was being observed. UFOCUS NZ Comment: The valley the object traverses has a stream running through it.  The witness has felt minor earthquakes in his area. We have received a similar report from a professional hunter living in a remote area near Whanganui. He has observed a similar light/object regularly traversing the valley he lives in over a two year period. "
        }, {
          "time": new Date("January 05, 2012 00:00:00"),
          "region": "auckland",
          "location": "Manukau (near Auckland airport), Auckland, North Island",
          "event": "hovering bright white solid object ",
          "description": "Blue sky with some cumulus clouds. Duration of sighjting approx 5 seconds. The two witnesses were driving along Puhinui Road, Manukau when they first sighted a very bright pure white object which they commented was whiter than the clouds surrounding it. The object was hovering over Manukau, and gave the appearance of a front end facing towards Auckland airport. It was estimated to be at a height of approximately 2000 feet. The object appeared to have an inverted cup shape on the top, with long thin wings much bigger than a 747 aircraft. It had no engines or tail, with no visible windows. The witnesses lost sight of the object beyond tall trees for approximately 5 seconds as they turned a corner. Having negotiated the corner the object should have been clearly in view, but it had disappeared. During the 5 minute period covering the sighting, the witnesses also observed 4 aircraft in the vicinity. One of the witnesses is an aircraft worker at Auckland airport and is familiar with aircraft types. He is adamant the object sighted was not a conventional aircraft. "
        }
      ],
      render: function() {
        var region, _results,
          _this = this;
        this.$el.show('slow');
        this.$el.html(_.template(ufoTemplate));
        this.new_zealand = new newZealandView();
        this.new_zealand.render();
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
        var data, date_format, readable_region, tbody, tr, ufo_sightings,
          _this = this;
        ufo_sightings = _.filter(this.ufo_data, function(d) {
          return d.region === region;
        });
        date_format = d3.time.format("%d/%m/%Y");
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
          return date_format(d.time);
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
