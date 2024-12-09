/* 
This code and its output are licensed under the
Creative Commons Attribution-NonCommercial-NoDerivatives 
4.0 International (CC BY-NC-ND 4.0) License.
https://creativecommons.org/licenses/by-nc-nd/4.0/
*/

// Gradient Graphs
// Scale Class
// Author: Brittni Watkins

class Scale {
    constructor(min, max) {
        this.min = min.copy();
        this.max = max.copy();
    }

    getMin() {
        return this.min;
    }

    getMax() {
        return this.max;
    }
}
