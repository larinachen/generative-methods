# A6
## Larina Chen

## Inspiration:
There's this YouTube channel called Primer that did this cool simulation of natural selection. It was such a wonder to watch, and that video also inspired me to explore the wonders of biology using computer simulations.

## What layers are in your simulation, and what does each layer contain?
layer 1: grid
layer 2: population of individuals with genotyoes ❤️ or 💙 or 💜

## What are the update rules for each cell?
Genotype is determined by the makeup of alleles, pairs of genes responsible for particular traits. 
An allele can be made up of two dominant genes, a dominant and a recessive gene, or two recessive genes. 
The combination of the two, and which one is dominant, determines what trait the allele will express.
We will use emojis to simulate the changes in the genotype of a population! 
❤️ represents individuals with 2 dominant alleles of a particular trait 
💙 represents individuals with 2 recessive alleles of a particular trait
💜 represents individuals with 1 dominant and 1 recessive alleles of a particular trait
In this simulation, we use the method of punnett squares to determine the genotype of an offspring from 2 individuals (offspring can have ❤️ or 💙 or 💜)
			
*Simulation 1:* At each step, every individual reproduces with a random neighbor. Population is controlled to stay constant (a single offspring is produced, who replaces a parent's positio on the grid). The population should converge toward a single genotype as time goes on! (Although I'm not sure if the convergence is supposed to happen biologically... sorry I'm not a bio major)
			
*Simulation 2:* Same deal as the last simulation, but this time, multiple offsprings are produced! Therefore, the population grows quickly until the carrying capacity (thesize of the grid). Hmmm the rate at which the population converges toward a single genotype seems to be different than in simulation 1...
			
*Simulation 3:* Same deal as simulation 2, but this time we are adding death :(  The death rate is faster than the reproduction rate... bye bye hearts

### My Punnett square calculations:
Probability of an offspring getting ❤️ or 💙 or 💜 
if the 2 parents are:
* red-blue -> all offsprings are purple
* red-purple -> 50% chance of red, 50% chance of purple
* blue-purple -> 50% chance of blue, 50% change of purple
* purple-purple -> 50% purple, 25% red, 25% blue
* red-red -> red
* blue-blue -> blue
Please fact check and correct me if I made a mistake!
 
## What argument are you trying to make?
One genotype will take over as time goes on

## Does the simulation currently support your argument?
Yes... but not the one I thought it would. I'm skeptical of my simulated results, and would love to hear suggestions (code and/or biology or anything else)!
  
### One related thought from the reading:
I really liked how the Emoji Simulator emulated the movement of the forest fire. I think the movement part of the simulation adds a lot of liveliness to the simulation. I don't think it worked as well for my simulation, but it is definitely something I would try more of in the future.

### Citations:
Starter code from Prof. Kate Compton

