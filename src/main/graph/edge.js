/* 
This code and its output are licensed under the
Creative Commons Attribution-NonCommercial-NoDerivatives 
4.0 International (CC BY-NC-ND 4.0) License.
https://creativecommons.org/licenses/by-nc-nd/4.0/
*/

// Gradient Graphs
// Edge Class
// Author: Brittni Watkins

class Edge {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    getA() {
        return this.a;
    }

    getB() {
        return this.b;
    }

    isEqual(node) {
        let equals = false;

        if (node !== null) {
            let haveSameNodes = (this.a === node.getA()) && (this.b === node.getB());
            let haveDifferentNodes = (this.a === node.getB()) && (this.b === node.getA());
            equals = haveSameNodes || haveDifferentNodes;
        }

        return equals;
    }
}
