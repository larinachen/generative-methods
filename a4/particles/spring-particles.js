class Edge {
	constructor(e0, e1, baseLength=100, strength=20, easeAmt=0) {
		this.e0 = e0
		this.e1 = e1
		this.baseLength = baseLength
		this.strength = strength
		this.easeAmt = 0

		this.force = new Vector(0,0)
		this.offset = new Vector(0,0)
		this.stretch = 0
	}

	calculateStretch() {
		this.offset = Vector.difference(this.e1, this.e0)
		this.length = this.offset.magnitude
		this.stretch = this.baseLength - this.length
	}

	update(p, time) {
		// Set the current force on this edge
		// How hard does this pull?
		this.calculateStretch()

		// Ignore 0-length springs, it get too weird
		if (this.length != 0) {
			let total = sliders.springStrength*this.stretch*this.strength
			
			this.force.setToAddMultiples(this.offset, total/this.length)
		}
	}

	extend(p){
		if(this.baseLength<100){
			this.baseLength = sliders.clawExtension*60
		}
		
	}

	// A hack for stiffer springs
	ease(p) {
		this.calculateStretch()
		
		let easePct = -sliders.springEase*.1
		// if (Math.random()>.99)
		// 	console.log(easePct)
		this.e0.addMultiples(this.offset, easePct*this.stretch/this.offset.magnitude)
		this.e1.addMultiples(this.offset, -easePct*this.stretch/this.offset.magnitude)
	}

	applyForces(p, time) {
		// Apply this spring's force to the particles at either end
		this.e0.force.addMultiples(this.force, -1)
		this.e1.force.addMultiples(this.force, 1)
	}

	draw(p) {
		p.stroke(0)
		p.strokeWeight(2)
		p.fill(30,80,50)
		p.line(...this.e0, ...this.e1)
	}

	drawEllipse(p, width=10){
		if(this.baseLength<100){
			p.ellipse(this.e0[0],this.e0[1]-10,width, this.baseLength/2)
		}
	}

	drawDebug(p) {
		p.strokeWeight(Math.sqrt(this.force.magnitude)*.3 + 1)
		p.stroke(100, 100, 50, .3)
		p.line(...this.e0, ...this.e1)

		let multiple = .04
		this.force.drawArrow({p, 
			center: this.e1,
			multiple:-multiple, 
			color: [280, 100, 50]
		})
		this.force.drawArrow({p, 
			center: this.e0,
			multiple:multiple, 
			color: [220, 100, 50]
		})
	}

}

class CatClawSpringParticles {
	constructor(p) {
		// Track particles AND edges

		this.particles = []
		this.edges = []

		// set in place particle
		// let pt1 = new Vector(p.width-10, p.height/2)
		// this.particles.push(pt1)

		// Make a lot of particles
		let count = 5;
		for (var i = 0; i < count; i++) {
			let pt= new Vector(p.width-10, p.height/2)
			if(i!=0){
				// Create a random particle
				pt = new Vector(Math.random()*p.width, Math.random()*p.height)
			}
			// Add to my particles
			this.particles.push(pt)

			// Add a velocity, 10 in ANY direction
			pt.velocity = Vector.polar(30, Math.random()*2*Math.PI)
			pt.force = Vector.polar(50, Math.random()*2*Math.PI)
		}

		// Create edges
		for (var i = 0; i < 4; i++) {
			
			let curr = this.particles[i]
			let end = this.particles[i+1]
			let edge = new Edge(curr, end, 100)
			this.edges.push(edge)
			
			
			this.particles.forEach(pt => {
				// Make an edge
				count = 1
				let end = this.particles[this.particles.length-count]
				if (end != pt) {
					let e = new Edge(pt, end, sliders.clawExtension*60)
					this.edges.push(e)
				}
				count += 2
			})
			
			let palm = new Vector(p.width/2+100, p.height)
			let e = new Edge(this.particles[4],palm, 350)
			this.edges.push(e)
		}

	}

	getClosest(pt, range) {
		// Get the closest particle to this point
		return Vector.getClosest(pt, this.particles, range)
	}


	update(p, time) {
		
		// Move the particles
		this.particles.forEach(pt => {
			pt.force.mult(0)
		})

		this.edges.forEach(e => e.update(p, time))

		this.edges.forEach(e => e.extend(p))

		//this.edges.forEach(e => e.applyForces())

		
		for (var i = 0; i < 3; i++) {
			this.edges.forEach(e => e.ease(p))
		}

		this.particles.forEach((pt, index) => {
			// Same forces as BasicForces!

			
			// Compute a force to attract to the middle
			let center = new Vector(p.width/2 + 50, p.height/2+50)
			let offset = center.getOffsetTo(pt)
			pt.offsetToCenter = offset

			pt.force.addMultiples(pt.offsetToCenter, -4)

			// Wiggle!
			pt.force.addPolar(100, 20*p.noise(index, 1*time.t))

			// Apply each particles force to its velocity
			pt.velocity.addMultiples(pt.force, time.dt)

			// Apply a drag to the velocity
			pt.velocity.mult(.96)

			// Move each particle
			pt.addMultiples(pt.velocity, time.dt)
		})
	}

	draw(p, time) {
		
		// Draw the particles and edges
		p.fill(30,80,80)
		this.edges.forEach(e => e.draw(p))
		//p.noStroke()
		
		p.fill(30,80,50)
		this.particles.forEach(pt => {
			pt.drawEllipse(p,30,30)
		})

		p.stroke(0)
		//p.fill(30,80,40)
		this.edges.forEach(e => e.drawEllipse(p))

	}


	drawDebug(p, time) {
		// Draw the particles
		this.edges.forEach(e => e.drawDebug(p, time))
		
		p.noStroke()
		this.particles.forEach(pt => {
			pt.draw(p, 10)
		})
	}
}