/* 
This code and its output are licensed under the
Creative Commons Attribution-NonCommercial-NoDerivatives 
4.0 International (CC BY-NC-ND 4.0) License.
https://creativecommons.org/licenses/by-nc-nd/4.0/
*/

// Gradient Graphs
// Graph Class
// Author: Brittni Watkins

class Graph {
    constructor(scale) {
        this.scale = scale;
        this.nodes = [];
        this.adjacencyList = new Map();
        this.compactAdjacencyList = new Map();
        this.edges = [];
    }

    getNodes() {
        return this.nodes;
    }

    getScale() {
        return this.scale;
    }

    getEdges() {
        return this.edges;
    }

    buildRandomNode() {
        let min = this.scale.getMin();
        let max = this.scale.getMax();
        let x = randomFloat(min.x, max.x);
        let y = randomFloat(min.y, max.y);
        let position = createVector(x, y);
        return new Node(position);
    }

    initializeAdjacencyLists() {
        this.nodes.forEach(node => {
            this.adjacencyList.set(node, []);
            this.compactAdjacencyList.set(node, []);
        });
    }

    buildCompactAdjacencyList() {
        this.nodes.forEach(node => {
            let fullAdjacencyList = this.adjacencyList.get(node);
            let compactAdjacencyList = this.compactAdjacencyList.get(node);
            let nodePosition = node.getPosition();

            fullAdjacencyList.forEach(a => {
                let aPosition = a.getPosition();

                if (aPosition.x < nodePosition.x) {
                    compactAdjacencyList.push(a);
                }
            });
        });
    }

    buildEdges() {
        this.nodes.forEach(node => {
            let compactAdjacencyList = this.compactAdjacencyList.get(node);

            compactAdjacencyList.forEach(a => {
                let edge = new Edge(node, a);
                this.edges.push(edge);
            });
        });
    }
}
