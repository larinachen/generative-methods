
class GenotypeSimulationDeath{
	// Some number of grids
	constructor(mode, dimensions, tileSize) {
		this.idNumber = simCount++
		// Mode can control various factors about the simulation
		this.dimensions = dimensions
		this.mode = mode
		this.tileSize = tileSize
		this.selectedCell = [3, 4]

		
		// Your simulation can have multiple layers, 
		// for example, it might have a 
		//  - a layer of sheep emoji, and a noise field of grass layers and a layer of wind vectors
		//  - a single layer of true/false for Game of Life
		
		this.values = createGrid(...this.dimensions)

		// Set up the grid with its initial values
		this.initialize()
	}


	// intitialize the grid to ❤️,💜,💙, and empty
	initialize() {
		setGrid(this.values, (x, y) => {
			// Given x, y, set this cell to something
			let options = [0,1,2]
			if(Math.random() < 0.01){
				return 3
			}
			return options[floor(Math.random()*4)]
			
		})

	}


	// A useful function for Game of Life
	getLiveNeighborCount(x, y) {
		// How many of my neighbors have a non-zero value?
		let neighbors = this.getEightNeighborPositions(x, y, true)
		let liveCount = 0
		neighbors.forEach((pos) => {
			let nx = pos[0]
			let ny = pos[1]
			if (this.values[nx][ny] > 0)
				liveCount++
		})
		return liveCount
	}


	// When we update the simulation, 
	// we want write our next moves into a temporary "next-step" grid
	// And then once all the updates are done, 
	// copy that back into the original grid 

	step() {
		

		// Create a temporary grid to store the next positions
		let tempGrid = createGrid(...this.dimensions)
		
		setGrid(tempGrid, (x, y) => {
			// my current value
			let val = this.values[x][y]
			
			// my neighbors
			let neighbors = this.getEightNeighborPositions(x, y, true)
			//console.log(neighbors) // array of duples of length 8

			// get a random neighbor to reproduce with (also a chance that do not reproduce)
			let mate = neighbors[floor(Math.random()*9)]
			if (mate==null)
				mate = [x, y]
			let mate_val = this.values[mate[0]][mate[1]]

			// get a random offspring position
			
			let pos = neighbors[floor(Math.random()*9)]
			if (pos==null)
				pos = [x, y]

			console.log(val,mate_val)
			//
		
			// offspring genotype
			if((val == 1 & mate_val == 2)|| (val == 2 & mate_val == 1)){
				if(Math.random()>0.5){
					this.values[mate[0]][mate[1]] = 1
					this.values[pos[0]][pos[1]] = 1
					return 1 // red
				}else{
					this.values[mate[0]][mate[1]] = 2
					this.values[pos[0]][pos[1]] = 2
					return 2 // purple
				}
			}else if((val == 1 & mate_val == 3) || (val == 3 & mate_val == 1)){
				this.values[mate[0]][mate[1]] = 2
				this.values[pos[0]][pos[1]] = 2
				return 2 // all purple
			}else if((val == 2 & mate_val == 3) || (val == 3 & mate_val == 2)){
				if(Math.random()>0.5){
					this.values[mate[0]][mate[1]] = 3
					this.values[pos[0]][pos[1]] = 3
					return 3 // blue
				}else{
					this.values[mate[0]][mate[1]] = 2
					this.values[pos[0]][pos[1]] = 2
					return 2 // purple
				}
			}else if(val == 2 & mate_val == 2){
				if(Math.random()<0.25){
					this.values[mate[0]][mate[1]] = 1
					this.values[pos[0]][pos[1]] = 1
					return 1 // red
				}else if(Math.random() < 0.5){
					this.values[mate[0]][mate[1]] = 3
					this.values[pos[0]][pos[1]] = 3
					return 3 // blue
				}else{
					this.values[mate[0]][mate[1]] = 2
					this.values[pos[0]][pos[1]] = 2
					return 2 // purple
				}
			}else{
				return val
			}
			
			
		})

		console.log("loop")
		// kill off random heart monsters, at a rate faster tha reproduction
		let runtime = 0 // break infinite loop at the end
		for(var i=0; i<10; i++){
			if(i<-5){
				console.log("break")
				break;
			}
			let x = floor(Math.random()*this.dimensions[0])
			let y = floor(Math.random()*this.dimensions[1])
			if(tempGrid[x][y]==0){
				i -= 1
			}
			setSquare(tempGrid,x,y,0)
			runtime += 1
			if(runtime > 20){
				break;
			}
		}
		
		// Swap all the buffers: copy the nextGrid into the current grid
		copyGrid(this.values, tempGrid)
	}



	//=====================================================
	// Drawing

	draw(p) {
		p.background(196, 100, 80)
		// Draw each cell
		let w = this.dimensions[0]
		let h = this.dimensions[1]

		for (var i = 0; i < w; i++) {
			for (var j = 0; j < h; j++) {
				this.drawCell(p, i, j)
			}
		}
		

		// Draw debug information about the currently selected cell
		// A useful place to put debug information!
		if (this.debugMode) {

			p.stroke(100, 100, 50, 1)
			p.strokeWeight(4)
			p.noFill()
			this.drawSquare(p, ...this.selectedCell)
			let neighbors = this.getNearestNeighborPositions(...this.selectedCell, true)
			neighbors.forEach((cell,index) => {
				p.noStroke()
				p.fill(index*20, 100, 50, .4)
				this.drawSquare(p, ...cell)
			})

			neighbors = this.getCornerNeighborPositions(...this.selectedCell, true)
			neighbors.forEach((cell,index) => {
				p.noStroke()
				p.fill(index*20 + 100, 100, 50, .4)
				this.drawSquare(p, ...cell)
			})

			
			let count = this.getLiveNeighborCount(...this.selectedCell)
			p.stroke(100)
			p.fill(0)
			p.text(count, this.selectedCell[0]*this.tileSize,this.selectedCell[1]*this.tileSize)
			
		}
	}

	

	// Draw a cell.  Add emoji or color it
	drawCell(p, x, y) {

		// Alive or dead?
		let value = this.values[x][y]
		let val = key[value]
		
		// Draw the corresponding heart
		p.strokeWeight(1)
		p.stroke(0, 0, 0, .1)
		p.fill(0, 0, 100 - value*100, .7)
		this.drawText(p, x, y,val)

		// Debug the game of life
		if (this.debugMode) {
			let val = this.values[x][y]
			p.stroke(100, 100, 50)
			p.fill(0)
			this.drawText(p, x, y,val)
		}
	}

	//=====================================================
	// Mouse interactions

	select(x, y) {
		// console.log("Select", x, y)
		this.selectedCell = [x, y]
	}

	click(x, y) {
		console.log("Click", x, y)
		
	}

	drag(x, y) {
		this.values[x][y] = 1
	}



	//=====================================================
	// Utility functions

	toggleDebugInfo() {
		this.debugMode = !this.debugMode
	}

	// Handy utility to draw a single grid 
	drawSquare(p, col, row) {
		let w = this.tileSize
		let x = (col + .5)*w
		let y = (row + .5)*w
		p.rect(x - w/2, y - w/2, w, w)
	}


	// Handy utility to draw text 
	drawText(p, col, row, text) {
		let w = this.tileSize
		let x = (col + .5)*w
		let y = (row + .5)*w
		p.text(text, x - w/2, y - w*.1)
	}

	// Is this cell selected?
	isSelected(x, y) {
		return (this.selectedCell && this.selectedCell[0] == x && this.selectedCell[1] === y)
	}

	//------------------------------------------------
	// Neighbor positions
	getEightNeighborPositions(x1, y1, wrap) {
		return [...this.getNearestNeighborPositions(x1, y1, wrap),
		...this.getCornerNeighborPositions(x1, y1, wrap)]
	}

	getNearestNeighborPositions(x1, y1, wrap) {
		let w = this.dimensions[0]
		let h = this.dimensions[1]
		let x0 = x1 - 1
		let x2 = x1 + 1
		let y0 = y1 - 1
		let y2 = y1 + 1
		if (wrap)  {
			x0 = (x0 + w)%w
			x2 = (x2 + w)%w
			y0 = (y0 + h)%h
			y2 = (y2 + h)%h
		}
		
		return [[x1,y0],[x2,y1],[x1,y2],[x0,y1]]
	}
	getCornerNeighborPositions(x1, y1, wrap) {
		let w = this.dimensions[0]
		let h = this.dimensions[1]
		let x0 = x1 - 1
		let x2 = x1 + 1
		let y0 = y1 - 1
		let y2 = y1 + 1
		if (wrap)  {
			x0 = (x0 + w)%w
			x2 = (x2 + w)%w
			y0 = (y0 + h)%h
			y2 = (y2 + h)%h
		}
		
		return [[x0,y0],[x0,y2],[x2,y2],[x2,y0]]
	}

	// ------- gene computation --------------------
	// gene computation
	change_gene(val, mate_val) {
		if((val == 1 & mate_val == 2)|| (val == 2 & mate_val == 1)){
			if(Math.random()>0.5){
				this.values[mate[0]][mate[1]] = 1
				return 1 // red
			}else{
				this.values[mate[0]][mate[1]] = 2
				return 2 // purple
			}
		}else if((val == 1 & mate_val == 3) || (val == 3 & mate_val == 1)){
			this.values[mate[0]][mate[1]] = 2
			return 2 // all purple
		}else if((val == 2 & mate_val == 3) || (val == 3 & mate_val == 2)){
			if(Math.random()>0.5){
				this.values[mate[0]][mate[1]] = 3
				return 3 // blue
			}else{
				this.values[mate[0]][mate[1]] = 2
				return 2 // purple
			}
		}else if(val == 2 & mate_val == 2){
			if(Math.random()<0.25){
				this.values[mate[0]][mate[1]] = 1
				return 1 // red
			}else if(Math.random() < 0.5){
				this.values[mate[0]][mate[1]] = 3
				return 3 // blue
			}else{
				this.values[mate[0]][mate[1]] = 2
				return 2 // purple
			}
		}else{
			return val
		}

	}

}