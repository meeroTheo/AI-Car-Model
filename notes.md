How do our Brains work - Artifical Neural Networks

- [ ] 1. What is a Neural Network?
- Computing systems inspired by the biological neural networks in our brain
- The branches on the neurons recieve the signals, when stimulated it fires the signal through its axom
- Our sensors send signals to some neurons that pass it to the brain, 
- The brain then processes the signal and sends it to the muscles to move (some neurons fire, some don't)

- [ ] 2. Our Cars Neural Network

- neurons on the first layer will be connected with the sensors
- they will send signals forward a few times
- The last layer will be connected to the car controls to make it do something

- We have levels, each level has a floor, ceiling and connections in between.
- The ceiling of the first floor is the floor of the second floor


Hyperplane equation
- in a simple network this is the line equation
ws + b = 0, where w is the weight, s is the sensor input, and b is the bias
- the slope of the line is the weight, the bias is the y-intercept
- For each output we have a hyperplane equation ( the neuron will fire if the value of the function is greater than 0)
- With two sensors, we have a plane equation
- neurons are allowed to fire anytime, just at different rates
 - Linearly separable cases vs. non-linearly separable cases
- Linearly separable cases are when the data can be separated by a line
- Non-linearly separable cases are when the data cannot be separated by a line

What is the best car?
fitness function
- we use y value for best car, but we can use any function
- penalize if not in the center of the lane (another fitness function)
- work with going through curves
- some genetic algorithms use crossover (take two networks and combine them)
