/* 
This code and its output are licensed under the
Creative Commons Attribution-NonCommercial-NoDerivatives 
4.0 International (CC BY-NC-ND 4.0) License.
https://creativecommons.org/licenses/by-nc-nd/4.0/
*/

// Gradient Graphs
// Edge Display Class
// Author: Brittni Watkins

class EdgeDisplay {
    constructor(aPositionPercentage, bPositionPercentage, aColor, bColor) {
        this.aPositionPercentage = aPositionPercentage.copy();
        this.bPositionPercentage = bPositionPercentage.copy();
        this.aColor = aColor;
        this.bColor = bColor;
        this.aColorWithAlpha = new Color(aColor.getColor());
        this.aColorWithAlpha.setAlpha(100);
        this.bColorWithAlpha = new Color(bColor.getColor());
        this.bColorWithAlpha.setAlpha(100);
        this.displayCircle = true;
        this.displayLine = true;
    }

    getCenterPercentage() {
        let xPercentage = (this.aPositionPercentage.x + this.bPositionPercentage.x) / 2;
        let yPercentage = (this.aPositionPercentage.y + this.bPositionPercentage.y) / 2;
        return createVector(xPercentage, yPercentage);
    }

    getDistance() {
        let distance = dist(this.aPositionPercentage.x * width, this.aPositionPercentage.y * height, this.bPositionPercentage.x * width, this.bPositionPercentage.y * height);
        return distance;
    }

    display() {
        if (this.displayLine) {
            this.displayGradientLine();
        }

        if (this.displayCircle) {
            this.displayGradientCircle();
        }
    }

    toggleDisplayLine() {
        this.displayLine = !this.displayLine;
    }

    toggleDisplayCircle() {
        this.displayCircle = !this.displayCircle;
    }

    displayGradientLine() {
        let numSegments = 10;
        let start = this.aPositionPercentage.copy();
        let end;

        for (let i = 1; i <= numSegments; i++) {
            let colorPercentage = (i - 1) * (1.0 / numSegments);
            let percent = i * (1.0 / numSegments);
            end = p5.Vector.lerp(this.aPositionPercentage, this.bPositionPercentage, percent);
            stroke(lerpColor(this.aColor.getColor(), this.bColor.getColor(), colorPercentage));
            line(start.x * width, start.y * height, end.x * width, end.y * height);
            start.set(end);
        }
    }

    displayGradientCircle() {
        let centerPercentage = this.getCenterPercentage();
        let distance = this.getDistance();
        let radius = distance / 2;
        let theta = 0;
        let numPoints = 50;
        beginShape();
        noStroke();

        for (let i = 0; i < numPoints; i++) {
            let baseX = centerPercentage.x * width;
            let baseY = centerPercentage.y * height;
            let x = baseX + (cos(theta) * radius);
            let y = baseY + (sin(theta) * radius);
            let d = dist(this.aPositionPercentage.x * width, this.aPositionPercentage.y * height, x, y);
            let col = lerpColor(this.aColorWithAlpha.getColor(), this.bColorWithAlpha.getColor(), d / distance);
            fill(col);
            vertex(x, y);
            theta += TWO_PI / numPoints;
        }

        endShape(CLOSE);
    }
}
