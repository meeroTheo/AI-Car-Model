//1:43

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
                level.weights[i][j] = Math.random() * 2 - 1
            }
        }
        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = Math.random() * 2 - 1;

        }
    }

}