function lerp(A, B, t) {
    //You have the value of A, and the difference between B and A multiplied by percentage t
    //when t is 0, you get A
    //when t is 1, you get B
    //when t is 0.5, you get the midpoint between A and B
    // 0 and 1 give you the two endpoints
    //lerp essentially gives you a point between two endpoints based on a percentage
    return A + (B - A) * t; //linear interpolation

}
function getIntersection(A,B,C,D){ 
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    
    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }

    return null;
}

function polysIntersect(poly1, poly2){
    for(let i=0;i<poly1.length;i++){
        for(let j=0;j<poly2.length;j++){
            const touch=getIntersection( //check if the two segments intersect
                poly1[i],
                poly1[(i+1)%poly1.length],
                poly2[j],
                poly2[(j+1)%poly2.length]
            );
            if(touch){
                return true; //if there is an intersection, return true
            }
        }
    }
    return false; //if we get to this point, we know that there is no intersection
}