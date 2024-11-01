export function bfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const queue = []; // Use a queue to manage the nodes to visit
    startNode.distance = 0; // Initialize distance for the start node
    queue.push(startNode); // Start from the starting node
    startNode.isVisited = true; // Mark the start node as visited

    while (queue.length) {
        const currentNode = queue.shift(); // Get the first node in the queue

        // If we encounter a wall, skip
        if (currentNode.isWall) continue;

        visitedNodesInOrder.push(currentNode); // Mark current node as visited
        if (currentNode === finishNode) return visitedNodesInOrder; // Stop if we reach the finish node

        updateNeighbors(currentNode, grid, queue);
    }

    return visitedNodesInOrder; // Return the order of visited nodes
}

function updateNeighbors(node, grid, queue) {
    const neighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of neighbors) {
        if (!neighbor.isVisited && !neighbor.isWall) { // Check for walls
            neighbor.isVisited = true; // Mark neighbor as visited
            neighbor.previousNode = node; // Keep track of the path
            queue.push(neighbor); // Add neighbor to the queue
        }
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;

    // Check all possible neighbors (up, down, left, right)
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
}
