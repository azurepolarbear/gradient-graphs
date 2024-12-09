/* 
This code and its output are licensed under the
Creative Commons Attribution-NonCommercial-NoDerivatives 
4.0 International (CC BY-NC-ND 4.0) License.
https://creativecommons.org/licenses/by-nc-nd/4.0/
*/

// Gradient Graphs
// Gabriel Graph Class
// Author: Brittni Watkins

class GabrielGraph extends Graph {
    constructor(numNodes) {
        super(new Scale(createVector(-0.5, -0.5), createVector(0.5, 0.5)));
        this.buildNodes(numNodes);
        this.initializeAdjacencyLists();
        this.buildAdjacencyList();
    }

    buildNodes(numNodes) {
        for (let i = 0; i < numNodes; i++) {
            let node = this.buildRandomNode();
            this.nodes.push(node);
        }
    }

    buildAdjacencyList() {
        for (let i = 0; i < this.nodes.length; i++) {
            let a = this.nodes[i];

            for (let j = i + 1; j < this.nodes.length; j++) {
                let b = this.nodes[j];
                let hasIntersectingNode = this.hasIntersectingNode(a, b);

                if (!hasIntersectingNode) {
                    let aAdjacency = this.adjacencyList.get(a);
                    let bAdjacency = this.adjacencyList.get(b);
                    aAdjacency.push(b);
                    bAdjacency.push(a);
                }
            }
        }

        this.buildCompactAdjacencyList();
        this.buildEdges();
    }

    hasIntersectingNode(a, b) {
        let hasIntersect = false;
        let diameter = Node.getDistance(a, b);
        let radius = diameter / 2.0;
        let center = Node.getCenterPoint(a, b);

        for (let i = 0; i < this.nodes.length; i++) {
            let node = this.nodes[i];

            if (node !== a && node !== b) {
                let nodePosition = node.getPosition();
                let distFromCenter = dist(center.x, center.y, nodePosition.x, nodePosition.y);

                if (distFromCenter < radius) {
                    hasIntersect = true;
                    break;
                }
            }
        }

        return hasIntersect;
    }
}
