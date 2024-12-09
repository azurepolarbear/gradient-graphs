/* 
This code and its output are licensed under the
Creative Commons Attribution-NonCommercial-NoDerivatives 
4.0 International (CC BY-NC-ND 4.0) License.
https://creativecommons.org/licenses/by-nc-nd/4.0/
*/

// Graident Graphs
// Graph Display Class
// Author: Brittni Watkins

class GraphDisplay {
    constructor(graph, center, width, height, colorGenerators) {
        this.graph = graph;
        this.center = center.copy();
        this.width = width;
        this.height = height;
        this.nodeDisplays = new Map();
        this.edgeDisplays = [];
        this.colorGenerators = colorGenerators;
        this.buildNodeDisplays();
        this.buildEdgeDisplays();
    }

    buildNodeDisplays() {
        let nodes = this.graph.getNodes();

        nodes.forEach(node => {
            let position = this.getScreenPositionPercentage(node);
            let colorGeneratorIndex = randomInt(0, this.colorGenerators.length);
            let colorGenerator = this.colorGenerators[colorGeneratorIndex];
            let radius = min(width, height) / 100.0;
            let nodeDisplay = new NodeDisplay(position, radius, new Color(colorGenerator.getRandomColor()));
            this.nodeDisplays.set(node, nodeDisplay);
        });
    }

    toggleDisplayLine() {
        this.edgeDisplays.forEach(edgeDisplay => {
            edgeDisplay.toggleDisplayLine();
        });
    }

    toggleDisplayCircle() {
        this.edgeDisplays.forEach(edgeDisplay => {
            edgeDisplay.toggleDisplayCircle();
        });
    }

    toggleDisplayNode() {
        this.nodeDisplays.forEach(nodeDisplay => {
            nodeDisplay.toggleDisplayNode();
        });
    }

    buildEdgeDisplays() {
        let edges = this.graph.getEdges();

        edges.forEach(edge => {
            let a = edge.getA();
            let b = edge.getB();
            let aPositionPercentage = this.getScreenPositionPercentage(a);
            let bPositionPercentage = this.getScreenPositionPercentage(b);
            let aDisplay = this.nodeDisplays.get(a);
            let bDisplay = this.nodeDisplays.get(b);
            let aColor = aDisplay.getColor();
            let bColor = bDisplay.getColor();
            let edgeDisplay = new EdgeDisplay(aPositionPercentage, bPositionPercentage, aColor, bColor);
            this.edgeDisplays.push(edgeDisplay);
        });
    }

    getScreenPositionPercentage(node) {
        let position = node.getPosition();
        let scale = this.graph.getScale();
        let graphMin = scale.getMin();
        let graphMax = scale.getMax();
        let minScreenXPercentage = (this.center.x - (this.width / 2.0)) / width;
        let maxScreenXPercentage = (this.center.x + (this.width / 2.0)) / width;
        let minScreenYPercentage = (this.center.y - (this.height / 2.0)) / height;
        let maxScreenYPercentage = (this.center.y + (this.height / 2.0)) / height;
        let x = map(position.x, graphMin.x, graphMax.x, minScreenXPercentage, maxScreenXPercentage);
        let y = map(position.y, graphMin.y, graphMax.y, minScreenYPercentage, maxScreenYPercentage);
        return createVector(x, y);
    }

    display() {
        this.edgeDisplays.forEach(edgeDisplay => {
            edgeDisplay.display();
        });

        this.nodeDisplays.forEach(nodeDisplay => {
            nodeDisplay.display();
        });
    }
}
