/* 
This code and its output are licensed under the
Creative Commons Attribution-NonCommercial-NoDerivatives 
4.0 International (CC BY-NC-ND 4.0) License.
https://creativecommons.org/licenses/by-nc-nd/4.0/
*/

// Gradient Graphs
// Random Geometric Graph Class
// Author: Brittni Watkins

class RandomGeometricGraph extends Graph {
    constructor(numNodes, expectedDegree) {
        super(new Scale(createVector(-0.5, -0.5), createVector(0.5, 0.5)));
        this.radius = sqrt(expectedDegree / (numNodes * PI));
        this.buildNodes(numNodes);
        this.initializeAdjacencyLists();
        this.buildAdjacencyLists();
    }

    buildNodes(numNodes) {
        for (let i = 0; i < numNodes; i++) {
            let node = this.buildRandomNode();
            this.nodes.push(node);
        }
    }

    buildAdjacencyLists() {
        for (let i = 0; i < this.nodes.length; i++) {
            let a = this.nodes[i];

            for (let j = i + 1; j < this.nodes.length; j++) {
                let b = this.nodes[j];
                let distance = Node.getDistance(a, b);
                let hasEdge = distance <= this.radius;

                if (hasEdge) {
                    let aAdjacencyList = this.adjacencyList.get(a);
                    let bAdjacencyList = this.adjacencyList.get(b);
                    aAdjacencyList.push(b);
                    bAdjacencyList.push(a);
                }
            }
        }

        this.buildCompactAdjacencyList();
        this.buildEdges();
    }
}
