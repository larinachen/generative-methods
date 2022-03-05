class PresentsBot {
	constructor() {
		this.presents = 0
		this.maxPresents = 12
		this.currPresent = "Folgers Instant"
		this.coffeeDescription = "boring coffee"

		this.grammar = tracery.createGrammar(presentsGrammar)
		this.grammar.addModifiers(baseEngModifiers)
		//console.log("A type of coffee:", this.grammar.flatten("#coffeeType#"))
	}

	respondTo(s) {
		console.log("User said", s)
		// return "<img src='https://media.tenor.com/images/eff22afc2220e9df92a7aa2f53948f9f/tenor.gif'></img>"

		

		if (s.toLowerCase().includes("open")) {
			if (this.presents  == 0)
				return "You've opened all of the presents!"
			
			this.presents -= 1
			console.log(this.presents)
			return "Santa sent you " + (this.presents+1) + this.grammar.flatten(" #present#")
			
		}
		if (s.toLowerCase().includes("thank")) {
			return "🥰🥰"
			
		}



		// Gets more presents
		if (s.toLowerCase().includes("new present")) {

			/*
			// Create new values
			this.coffeeFlavor = this.grammar.flatten("#coffeeName#")
			this.coffeeDescription = this.grammar.flatten("#coffeeDesc#")
			*/

			this.post("Santa says he's sending your presents over right now ...")
			this.post("hmm maybe you'll finally get your " + this.grammar.flatten("#object#") + " ?")
					
			let interval = setInterval(() => {
				this.presents = Math.min(this.presents + 1,  this.maxPresents)
				if (this.presents >= this.maxPresents) {
					this.post("12 presents for you!")
					clearInterval(interval)
				} else {
					// console.log("post to chat")
					this.post("🎁 ")
				}


				
			}, 200)
			

			return ""

		}

		if (s.includes('DO NOT')){
			this.presents = 0
			return 'Turning all of your presents into coal 🪨🪨🪨'
		}
		// return `'${s}' isn't a type of coffee`
		
		return `Putting ${s} on your wish list... but meanwhile you can have a ` + this.grammar.flatten("#emotion# #animal#")
	}
}