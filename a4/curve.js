class Curve {
	// A class containing points, and optionally their bezier control points
	


	constructor(points) {
		this.points = []
		this.points = points.map(pt => new CurvePoint(pt, Math.random()*30, Math.random()*30, Math.random()*4))

	}	

	draw(p) {
		p.stroke(320, 100, 50)
		p.beginShape(p)
		p.vertex(...this.points[0].point)
		for (var i = 1; i < this.points.length; i++) {
			let cp0 = this.points[i - 1].cp1
			let pt = this.points[i]
			let cp1 = pt.cp0
			
			p.bezierVertex(...cp0, ...cp1, ...pt.point)
				
		}
		p.endShape()
	}

	drawVertices(p) {
		p.vertex(...this.points[0].point)
		for (var i = 1; i < this.points.length; i++) {
			let cp0 = this.points[i - 1].cp1
			let pt = this.points[i]
			let cp1 = pt.cp0
			
			
			p.bezierVertex(...cp0, ...cp1, ...pt.point)
			
		}
		
		
	}
}

class CurvePoint {
	constructor(point, r0, r1, theta0, theta1) {
		if (point instanceof Vector)
			this.point = point
		else 
			this.point = new Vector(point)
		this.smooth = theta1 == undefined
		this.r0 = r0
		this.r1 = r1
		this.theta0 = theta0
		this.theta1 = theta1
	}	

	get cp0() {
		return this.point.clonePolarOffset(this.r0, this.theta0)
	}
	get cp1() {
		return this.point.clonePolarOffset(this.r1, this.smooth?this.theta0 + Math.PI:this.theta1)
	}
}