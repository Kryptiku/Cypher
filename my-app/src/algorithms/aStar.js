export function aStar(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.heuristic = heuristic(startNode, finishNode);
    startNode.fCost = startNode.distance + startNode.heuristic;

    const unvisitedNodes = getAllNodes(grid);

    while (!!unvisitedNodes.length) {
        sortNodesByF(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();

        // If we encounter a wall, skip
        if (closestNode.isWall) continue;

        // If closest node is impossible stop
        if(closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;

        updateUnvisitedNeighbors(closestNode, grid, finishNode);
    }
}

function sortNodesByF(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.fCost - nodeB.fCost);
}

function updateUnvisitedNeighbors(node, grid, finishNode) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        const tentativeGScore = node.distance + 1; // Assuming cost
        if (tentativeGScore < neighbor.distance) {
            neighbor.previousNode = node;
            neighbor.distance = tentativeGScore;
            neighbor.heuristic = heuristic(neighbor, finishNode);
            neighbor.fCost = neighbor.distance + neighbor.heuristic;
        }
    }
}

function heuristic(nodeA, nodeB) {
    const d1 = Math.abs(nodeA.row - nodeB.row);
    const d2 = Math.abs(nodeA.col - nodeB.col);
    return d1 + d2; // Manhattan distance
}

function getAllNodes(grid){
    const nodes = [];
    for (const row of grid){
        for (const node of row){
            nodes.push(node);
        }
    }
    return nodes;
}

function getUnvisitedNeighbors(node, grid){
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    return neighbors.filter(neighbor => !neighbor.isVisited);
}

export function getNodesInShortestPathOrder(finishNode){
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while(currentNode !== null){
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}