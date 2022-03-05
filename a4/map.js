
class MapBuffer {
	constructor({p, mapScale, mapEraseRate, background, blur=false}) {
		this.mapScale = mapScale
		this.mapEraseRate = mapEraseRate
		this.background = background||[0,0,0]
		this.blur = blur

		this.p = new p5(map => {
			map.setup = () => {
				map.colorMode(map.RGB, 1)
				map.createCanvas(p.width/this.mapScale, p.height/this.mapScale);
				map.background(0)
			}
			map.draw = () => {
				// This is done with RGBA
				map.background(0, 0, 0, 255*(this.mapEraseRate))
			}

			map.mouseDragged = () => {
				// Draw something into the buffer
				map.noStroke()
				let mouse = new Vector(map.mouseX, map.mouseY)

				mouse.drawBlurryCircle({p:map, color:[255,0,0, .3], opacityDieoff: 2, radiusDieoff: 2, radius: 100/this.mapScale})
			}
		}, document.getElementById("map-holder"))
	}

	getValueAt(pt) {
		let val = this.p.get(pt[0]/this.mapScale, pt[1]/this.mapScale)
		return val.map(a => a/255)
	}
	update(p, time) {
		p.background(...this.background, this.mapEraseRate)

		
	}

	draw(p, blendMode) {
		p.push()
		p.scale(this.mapScale)
		if (!blendMode)
			p.image(this.p, 0, 0)
		else {
			p.blend(this.p, 0, 0, this.p.width, this.p.height, 0, 0, this.p.width, this.p.height, blendMode)
		}
		p.pop()
	}

	drawIntoBuffer(fxn) {
		this.p.push()
		this.p.scale(1/this.mapScale)
		fxn(this.p)
		this.p.pop()
	}

}