/* 
This code and its output are licensed under the
Creative Commons Attribution-NonCommercial-NoDerivatives 
4.0 International (CC BY-NC-ND 4.0) License.
https://creativecommons.org/licenses/by-nc-nd/4.0/
*/

// Gradient Graphs
// Sketch Functions
// Author: Brittni Watkins

let graphDisplay;
let graphType;
let nodeDispersalType;
let backgroundType;
let backgroundColor;
let isSaved;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    graphType = getRandomGraphType();
    nodeDispersalType = getRandomNodeDispersalType();
    let graph = buildGraph(graphType, nodeDispersalType);
    let center = createVector(0, 0);
    let colorGenerators = getRandomColorGenerators();
    graphDisplay = new GraphDisplay(graph, center, width - (width / 50), height - (height / 50), colorGenerators);
    backgroundType = getRandomBackgroundType();
    backgroundColor = getBackgroundColor(backgroundType);
    isSaved = false;
    setFeatures();
}

function draw() {
    background(backgroundColor);
    graphDisplay.display();

    if (!isSaved) {
        fxpreview();
        isSaved = true;
    }
}

function keyPressed() {
    if (key === 'a') {
        graphDisplay.toggleDisplayCircle();
    } else if (key === 's') {
        graphDisplay.toggleDisplayLine();
    } else if (key === 'd') {
        graphDisplay.toggleDisplayNode();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function getRandomGraphType() {
    let bool = randomBoolean();
    let graphType = "random";

    if (bool) {
        graphType = "gabriel";
    }

    return graphType;
}

function getRandomBackgroundType() {
    let r = randomFloat(0, 1);
    let chanceOfBlack = 0.7;
    let backgroundType = "black";

    if (r > chanceOfBlack) {
        backgroundType = "white";
    }

    return backgroundType;
}

function buildGraph(graphType, nodeDispersalType) {
    let graph;
    let numNodes;

    if (nodeDispersalType === "low") {
        numNodes = randomInt(5, 200);
    } else if (nodeDispersalType === "medium") {
        numNodes = randomInt(200, 600);
    } else {
        numNodes = randomInt(600, 800);
    }

    if (graphType === "gabriel") {
        graph = new GabrielGraph(numNodes);
    } else {
        let expectedDegree;

        if (nodeDispersalType === "low") {
            expectedDegree = 5;
        } else if (nodeDispersalType === "medium") {
            expectedDegree = 6;
        } else {
            expectedDegree = 7;
        }
        
        graph = new RandomGeometricGraph(numNodes, expectedDegree);
    }

    return graph;
}

function getRandomNodeDispersalType() {
    let r = randomFloat(0, 1);
    let chanceOfLow = 0.5;
    let chanceOfMedium = 0.3;
    let nodeDispersal;

    if (r < chanceOfLow) {
        nodeDispersal = "low";
    } else if (r < chanceOfLow + chanceOfMedium) {
        nodeDispersal = "medium";
    } else {
        nodeDispersal = "high";
    }

    return nodeDispersal;
}

function getRandomColorGenerators() {
    let colorGeneratorFactory = new UniformColorGeneratorFactory();
    let colorGenerators = [];
    let numColorGenerators = randomInt(1, 4);

    for (let i = 0; i < numColorGenerators; i++) {
        let colorGenerator = colorGeneratorFactory.getColorGenerator();
        colorGenerators.push(colorGenerator);
    }

    return colorGenerators;
}

function getBackgroundColor(backgroundType) {
    let col = color(0);

    if (backgroundType === "white") {
        col = color(255);
    }

    return col;
}

function setFeatures() {
    window.$fxhashFeatures = {
        "Background Type": backgroundType,
        "Graph Type": graphType,
        "Node Dispersal": nodeDispersalType
    }
}
