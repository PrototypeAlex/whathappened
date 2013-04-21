define ['backbone'], (Backbone) ->
	Story = new Backbone.Model({
		pages: [{
			content: """
				<p>On a cold and sunny morning Olive and her Mother decided to go on a bushwalk.</p>
				<p>In their bag they put lunch, water and a blanket to sit on.</p>
				<p>The trees and the ground smelled nice. Olive held her Mother’s hand as they walked, and she looked all around her as she went.</p>
				"""
			images: [{
				"src": "/images/pages/temp/base.png"
			},{
				"src": "/images/pages/temp/middle.png"
			},{
				"src": "/images/pages/temp/top.png"
			},]
		},{
			content: """
				<p>“Mamma, what happened to that flower?”<br />
				Olive’s Mother took a good long look and said,<br />
				“Maybe it’s thirsty, see how the ground is dry?”<br />
				“Or maybe four bugs sat on it at once?” said Olive<br />
				“That could be” said Olive’s Mother, “there is always more than one answer”</p>
				"""
			images: [{
				"src": "/images/pages/temp/base.png"
			},{
				"src": "/images/pages/temp/middle.png"
			},{
				"src": "/images/pages/temp/top.png"
			},]
			data_points: [{
				id: "clouds"
				left: "60%"
				top: "10%"
			},{
				id: "spaceship"
				left: "40%"
				top: "80%"
			}]
		},{
			content: """
				<p>“Mamma, what happened to the ground?”<br />
				Olive’s Mother took a good long look and said,<br />
				“Maybe a rock was washed away, see that rock nearby?”<br />
				“Or maybe a star fell from the sky?” said Olive<br />
				“That could be” said Olive’s Mother, “there is always more than one answer”</p>
				"""
			images: [{
				"src": "/images/pages/temp/base.png"
			},{
				"src": "/images/pages/temp/middle.png"
			},{
				"src": "/images/pages/temp/top.png"
			},]
		},{
			content: """
				<p>“Mamma, what happened to the sunshine?”<br />
				Olive’s Mother took a good long look and sad,<br />
				“Maybe a cloud moved over the sun, see all those clouds up there?”<br />
				“Or maybe a spaceship flew past?” said Olive<br />
				“That could be”, said Olive’s Mother, “there is always more than one answer”</p>
				"""
			images: [{
				"src": "/images/pages/temp/base.png"
			},{
				"src": "/images/pages/temp/middle.png"
			},{
				"src": "/images/pages/temp/top.png"
			},]
		}, {
			content: """
				<p>“Mamma, what happened to my hand?”<br />
				Olive’s Mother took a good long look and said,<br />
				“Maybe some water dripped down on it, see how the leaves are all wet?”<br />
				“Or maybe it’s the juice from a fruit bat’s breakfast?” said Olive<br />
				“That could be”, said Olive’s Mother, “there is always more than one answer”</p>
				"""	
			images: [{
				"src": "/images/pages/temp/base.png"
			},{
				"src": "/images/pages/temp/middle.png"
			},{
				"src": "/images/pages/temp/top.png"
			},]
		}, {
			content: """
				<p>They walked until they came to a clearing where Olive’s Mother decided would be a good place for their picnic. </p>
				<p>“We saw lots of things, didn’t we Olive?” “Yes”, she replied, “we saw a flower chair, a fallen star, a spaceship and some juice that fell off a bat’s breakfast plate”. </p>
				<p>Olive’s Mamma smiled, “I guess what we see depends on whose eyes we use.”</p>"""
			images: [{
				"src": "/images/pages/temp/base.png"
			},{
				"src": "/images/pages/temp/middle.png"
			},{
				"src": "/images/pages/temp/top.png"
			},]
		}]
	})

	_.each Story.get('pages'), (page, index, pages) ->
		if index + 1 >= pages.length
			page.next_page_url = "#/credits"
			page.last_page = true
		else
			page.next_page_url = "#/page/#{index + 2}"
			page.last_page = false
		return

	Story