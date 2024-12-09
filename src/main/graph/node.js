/* 
This code and its output are licensed under the
Creative Commons Attribution-NonCommercial-NoDerivatives 
4.0 International (CC BY-NC-ND 4.0) License.
https://creativecommons.org/licenses/by-nc-nd/4.0/
*/

// Gradient Graphs
// Node Class
// Author: Brittni Watkins

class Node {
    constructor(position) {
        this.position = position.copy();
    }

    getPosition() {
        return this.position;
    }

    static getDistance(a, b) {
        let aPosition = a.getPosition();
        let bPosition = b.getPosition();
        return dist(aPosition.x, aPosition.y, bPosition.x, bPosition.y);
    }

    static getCenterPoint(a, b) {
        let aPosition = a.getPosition();
        let bPosition = b.getPosition();
        let centerX = (aPosition.x + bPosition.x) / 2.0;
        let centerY = (aPosition.y + bPosition.y) / 2.0;
        return createVector(centerX, centerY);
    }
}
