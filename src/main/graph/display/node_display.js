/* 
This code and its output are licensed under the
Creative Commons Attribution-NonCommercial-NoDerivatives 
4.0 International (CC BY-NC-ND 4.0) License.
https://creativecommons.org/licenses/by-nc-nd/4.0/
*/

// Gradient Graphs
// Node Display Class
// Author: Brittni Watkins

class NodeDisplay {
    constructor(positionPercentage, diameter, color) {
        this.positionPercentage = positionPercentage.copy();
        this.diameter = diameter;
        this.color = color;
        this.displayNode = true;
        this.pointPercentages = [];
        this.buildPoints();
    }

    buildPoints() {
        let theta = 0;
        let numPoints = 20;
        let radius = this.diameter / 2.0;

        for (let i = 0; i < numPoints; i++) {
            let baseX = this.positionPercentage.x * width;
            let baseY = this.positionPercentage.y * height;
            let x = baseX + (cos(theta) * radius);
            let y = baseY + (sin(theta) * radius);
            let xPercent = x / width;
            let yPercent = y / height;
            let percentVector = createVector(xPercent, yPercent);
            this.pointPercentages.push(percentVector);
            theta += TWO_PI / numPoints;
        }
    }

    getColor() {
        return this.color;
    }

    toggleDisplayNode() {
        this.displayNode = !this.displayNode;
    }

    display() {
        if (this.displayNode) {
            this.displayShape();
        }
    }

    displayShape() {
        beginShape();
        fill(this.color.getColor());
        noStroke();

        this.pointPercentages.forEach(point => {
            vertex(point.x * width, point.y * height);
        });

        endShape(CLOSE);
    }
}
