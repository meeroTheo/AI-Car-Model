class NeuralNetwork {
    constructor(neuronCounts) {
        //neuron counts is an array of the number of neurons in each layer
        this.levels = [];

        for (let i = 0; i < neuronCounts.length - 1; i++) {
            //specify the input and output counts
            this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
        }

    }
    static feedForward(givenInputs, network) {
        //putting in the output of the previous level into the new level as the input
        //the final outputs tell us whether the car should move forward, left, or right
        let outputs = Level.feedForward(givenInputs, network.levels[0]); //calls the first level to produce outputs

        for (let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(outputs, network.levels[i]); //calls the next level to produce outputs
        }

        return outputs;
    }

    static mutate(network, amount = 1) { //genetic algorithm
        //amount is 100%, it randomizes the weights
        //a lower amount would be 10%, it would only randomize 10% of the weights
        //mutate is essentially randomizing the weights for the entire network
        //if the amount is 0, then the biases and weights stay the same
        //if the value is in between, it works away from the original value

        network.levels.forEach(level => {
            for (let i = 0; i < level.biases.length; i++) {
                level.biases[i] = lerp(level.biases[i], Math.random() * 2 - 1, amount);
            }
            for (let i = 0; i < level.weights.length; i++) {
                for (let j = 0; j < level.weights[i].length; j++) {
                    level.weights[i][j] = lerp(level.weights[i][j], Math.random() * 2 - 1, amount);
                }

            }
        });
    }
}
class Level {
    //level has a layer of input and output neurons
    constructor(inputCount, outputCount) {
        //inputs are the values we get from the car sensors
        //we need to compute hte outputs using the weights and biases we defined
        //initially they are biased, but a smart brain has some sort of structure.
        //to define the neurons, we use simple arrays of values
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        //each output neuron has a bias, a value above which it would fire
        this.biases = new Array(outputCount);
        //we connect every input neuron to every output neuron
        //these connections have weights
        this.weights = [];
        for (let i = 0; i < inputCount; i++) { //going through all the inputs
            //prepare an empty array the size of the output count
            //for each input node, there is an output count # of connections
            this.weights[i] = new Array(outputCount)
        }
        //we will ramdomize the initial brain
        Level.#randomize(this);

    }
    static #randomize(level) {
        for (let i = 0; i < level.inputs.length; i++) {
            for (let j = 0; j < level.outputs.length; j++) {
                //for every input output pair, set the weight to a value between -1 and 1
                //negative weights essentially tell us which direction NOT to move
                //Ex. if we see something with the front sensor, we should turn to avoid collision
                //the negative weight connected to the sensor on the right would tell us NOT to turn right(thus left)
                level.weights[i][j] = Math.random() * 2 - 1
            }
        }
        for (let i = 0; i < level.biases.length; i++) { 
            //biases are a constant which is added to the product of the weights and inputs
            //provide every node with a trainable bias
            level.biases[i] = Math.random() * 2 - 1;

        }
    }

    static feedForward(givenInputs, level) {
        //feed forward is the process of computing the output of a network
        for (let i = 0; i < level.inputs.length; i++) {
            //set level inputs to the given inputs (values that come from the car sensors)
            level.inputs[i] = givenInputs[i];
        }

        for (let i = 0; i < level.outputs.length; i++) {
            //calculate the sum between the value of the inputs and the weights

            let sum = 0;
            for (let j = 0; j < level.inputs.length; j++) {
                //add the product of the jth input and its corresponding weight to the sum of 1 particular output
                sum += level.inputs[j] * level.weights[j][i];
            }
            if (sum > level.biases[i]) {
                //if the sum is greater than the bias, the output is 1 because the neuron fires
                level.outputs[i] = 1;
            } else {
                level.outputs[i] = 0;
            }
        }
        return level.outputs;
    }
}