// Utility functions
// Given a processing object, a pct around the circle, a radius, and an offset (optional)
function getLoopingNoise({
	p,
	loopPct,
	radius,
	offset = 0
}) {

  // This number should go from 0 to 1 every loopLength seconds
  // And PI*2 radians every loopLength seconds

  let theta = 2 * Math.PI * loopPct

  // Place to sample the noise from
  let x = radius * Math.cos(theta)
  let y = radius * Math.sin(theta)

  let noiseVal = p.noise(x + 100, y + 30, offset)

  return noiseVal
}


let animations = [


	// Each animation is represented an object
	// with a title, setup, and draw function
	// This one draws a circle moving around
	{
		skip:false,
		title: "mobius rings",

		// Both draw and setup have access to the processing object "p"
		draw: function(p) {

			let t = p.millis()*.001

            // draw the ring
            let r = 100
            let theta = t*1.5
			let x = r * Math.sin(theta)
			let y = r * Math.cos(theta)

            // move to center of screen
            p.translate(p.width/2, p.height/2)

            // ring 1
            let hue = (t*50) %360
            p.fill(hue, 100, 50)
            let side = 35
            p.square(x-10, y-10, side, 5)
            // ring 2
            p.fill(220 + 40*Math.sin(theta), 80, 70)
            p.square(x-25, y-25, side, 5)

            // 
            p.circle(100,100)
 
		}
	},

    {
		skip:false,
		title: "rainbow fish scales",

		// Both draw and setup have access to the processing object "p"
		draw: function(p) {

			let t = p.millis()*.001

            // positions
            let r = 120
            let theta = t
			let x = r * Math.sin(theta)
			let y = 0.5* r * Math.cos(theta)
            // move to center of screen
            // p.translate(p.width/2, p.height/2)

            // draw the egg
            w = 20
            h = 10
            for(var j=0; j<w; j++){
                for(var i=0; i<h; i++){
                    hue = ((p.millis()*0.05) + i*5 + j*5) % 360
                    p.fill(hue, 60, 50)
                    p.circle(j*30,15+i*30,40)
                }
            }
        

		}
	},


	// Looping
	// To make a "perfect loop", all the objects need to end up back where they started
	// They can do this by getting back to their position, or getting to the starting position of the next objects
	{
		title: "pool splash!",

		skip: false,
		draw(p) {
            // Move to the center
			p.push()
			p.translate(p.width/2, p.height/2)
            
			let t = p.millis()*.001
			// How many seconds long is our loop?  You can use that to time your gifs
			let loopTime = 2
			let cyclePct = (t/loopTime)%1

			let count = 8

            // draw background
			//p.background(200,10,80,0.01)
            
            let num = 8
            let hue = 200
            p.noStroke()
            for(var i=0; i<num; i++){
                p.fill(hue, 80-i*5, 100-i*10)
                p.square(i*20-p.width/2, i*20-p.height/2, p.width-i*40, 60-i*8)
            }

            p.background(200, 40 ,80, 0.01)

            // drawing particles
			for (var i = 0; i < count; i++) {
				// If we have N particles, each one only has to go
				// dTheta radians to get to the next particles start point
				let dTheta = Math.PI*2/count

				// Start at dTheta*i, end up at dTheta*(1 + i)
				let i2 = i + cyclePct
				let theta = i2*dTheta

				// Start at dTheta*i, end up at dTheta*(1 + i)
				let polarRadius = 10 + 40*Math.cos(Math.PI*i2)

				let circleRadius = 15*(1.5 + Math.sin(Math.PI*i2))

				// Loop all the way around the color wheel
				let hue = 220 + 30 * Math.sin(theta)
				p.fill(hue, 100, 50)
				p.stroke(hue, 100, 20)

				let x = 3*polarRadius*Math.cos(theta)
				let y = 4*polarRadius*Math.sin(theta)
				p.circle(x, y, circleRadius)
			}

			p.pop()
		}

	},


]
