export function bfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const queue = [startNode];
    startNode.isVisited = true;

    while (queue.length) {
        const currentNode = queue.shift();
        visitedNodesInOrder.push(currentNode);

        // If we reach the target node, return the visited nodes
        if (currentNode === finishNode) {
            return visitedNodesInOrder;
        }

        updateNeighbors(currentNode, grid, queue);
    }
    return visitedNodesInOrder; // If finishNode is not reached
}

function updateNeighbors(node, grid, queue) {
    const neighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of neighbors) {
        // Ensure neighbor is not a wall and not already visited
        if (!neighbor.isWall) {
            neighbor.isVisited = true;
            neighbor.previousNode = node;
            queue.push(neighbor);
        }
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;

    // Check the four possible directions
    if (row > 0) neighbors.push(grid[row - 1][col]); // Up
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down
    if (col > 0) neighbors.push(grid[row][col - 1]); // Left
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right

    // Filter out already visited nodes
    return neighbors.filter(neighbor => !neighbor.isVisited);
}
