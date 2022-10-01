function lerp(A, B, t) {
    //You have the value of A, and the difference between B and A multiplied by percentage t
    //when t is 0, you get A
    //when t is 1, you get B
    //when t is 0.5, you get the midpoint between A and B
    // 0 and 1 give you the two endpoints
    return A + (B - A) * t; //linear interpolation

}