	
let simCount = 0

let noise = (new p5()).noise



	// <simulation type="DustSimulation" mode="gol" :dimensions="[40,30]" :tileSize="10" speed="100"/>

	// What if much bigger?
	// <simulation type="DustSimulation" mode="gol" :dimensions="[50,70]" :tileSize="10" speed="50"/>

	// <simulation type="DustSimulation" mode="gol" :dimensions="[40,30]" :tileSize="10" speed="100"/>
	// type information here
document.addEventListener("DOMContentLoaded", function(){
	new Vue({
		el : "#app",
		template: `<div id="app">
			Genotype is determined by the makeup of alleles, pairs of genes responsible for particular traits. 
			An allele can be made up of two dominant genes, a dominant and a recessive gene, or two recessive genes. 
			The combination of the two, and which one is dominant, determines what trait the allele will express.<br><br>
			We will use emojis to simulate the changes in the genotype of a population! <br>
			❤️ represents individuals with 2 dominant alleles of a particular trait <br>
			💙 represents individuals with 2 recessive alleles of a particular trait<br>
			💜 represents individuals with 1 dominant and 1 recessive alleles of a particular trait<br><br>
			In this simulation, we use the method of punnett squares to determine the genotype of an offspring from 2 individuals (offspring can have ❤️ or 💙 or 💜).
			Click to add a ❤️ on the grid. An individual can only reproduce with a neighbor. <br><br><br>
			
			Simulation 1: At each step, every individual reproduces with a random neighbor. Population is controlled to stay constant (a single offspring is
				produced, who replaces a parent's positio on the grid). The population should converge toward a single genotype as time goes on! (Although I'm not sure if this result
				supposed to happen biologically... sorry I'm not a bio major)
			<br><br>
			<simulation type="GenotypeSimulation1Offspring" mode="gol" :dimensions="[20,15]" :tileSize="26"/>
			<br><br>
			Simulation 2: Same deal as the last simulation, but this time, multiple offsprings are produced! Therefore, the population grows quickly until the carrying capacity (the
				size of the grid). Hmmm the rate at which the population converges toward a single genotype seems to be different than in simulation 1...
			<br><br>
			<simulation type="GenotypeSimulationMultipleOffspring" mode="gol" :dimensions="[20,15]" :tileSize="26"/>
			<br><br>
			Simulation 3: Same deal as simulation 2, but this time we are adding death :(  The death rate is faster than the reproduction rate... bye bye hearts
			<br><br>
			<simulation type="GenotypeSimulationDeath" mode="gol" :dimensions="[20,15]" :tileSize="26"/>
			<br><br><br>
			Creator's note: I'm highly skeptical of the result of the simulations - the recessive gene seems to always come on top, which does not feel right. If anyone has any
			idea why this is happenig (biology-wise and/or code-wise, I would love to hear your suggestions!)
			<br><br><br>
		</div>`,
		
	}) 
})



//==================================
// Grid utilities

// Create a grid of columns
function createGrid(w, h) {
	const grid = Array.from(new Array(w),()=>Array.from(new Array(h),()=>"-"));
	return grid
}

// Set a grid equal to a function
function setGrid(grid, fxn) {
	if (grid === undefined)
		console.warn("no grid!")
	if (fxn === undefined)
		console.warn("no function for setting the grid!")
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			grid[i][j] = fxn(i,j)
		}
	}
}

function setSquare(grid, x, y, val) {
	if (grid === undefined)
		console.warn("no grid!")
	grid[x][y] = val
}

// Copy a grid
function copyGrid(dest, src) {
	for (var i = 0; i < src.length; i++) {
		for (var j = 0; j < src[i].length; j++) {
			dest[i][j] = src[i][j]
		}
	}
}
